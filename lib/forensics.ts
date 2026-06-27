// Confía — on-chain forensics. The unfair-advantage centerpiece.
// Detects crypto addresses in pasted text and runs conservative scam heuristics.
// Solana gets deep on-chain inspection (SOL + USDT/USDC-SPL — the dominant VE donation
// rail) via JSON-RPC with multi-endpoint fallback; other chains get an honest
// "we can't deep-verify this chain here" caution plus universal red-flag guidance.

import bs58 from "bs58";
import type { Chain, RiskLevel, WalletMetrics, WalletSignal } from "./types";
import { findVerified, lookalikeOf, type VerifiedWallet } from "./knowledge/verified-wallets";

const PUBLIC_RPC = "https://api.mainnet-beta.solana.com";

const ENDPOINTS = Array.from(
  new Set(
    [process.env.HELIUS_RPC_URL, process.env.SOLANA_RPC_URL, PUBLIC_RPC]
      .map((s) => (s || "").trim())
      .filter(Boolean),
  ),
);

let preferred = 0; // index of the last endpoint that worked

const SIGNATURE_SAMPLE = 1000; // RPC max per call
const TOKEN_PROGRAM = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const USDT_MINT = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

const KNOWN_SCAM = new Set<string>(
  (process.env.CONFIA_SCAM_LIST || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
);

// ---------- address detection ----------

const SOL_RE = /\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/g;
const SUI_RE = /\b0x[a-fA-F0-9]{64}\b/g; // Sui: 0x + 32 bytes (distinct from EVM's 40 hex)
const ETH_RE = /\b0x[a-fA-F0-9]{40}\b/g;
const TRON_RE = /\bT[1-9A-HJ-NP-Za-km-z]{33}\b/g;
const BTC_RE = /\b(bc1[a-z0-9]{11,71}|[13][1-9A-HJ-NP-Za-km-z]{25,39})\b/g;

export interface DetectedAddress {
  chain: Chain;
  address: string;
}

function isValidSolana(addr: string): boolean {
  try {
    return bs58.decode(addr).length === 32;
  } catch {
    return false;
  }
}

/** Pull ALL crypto addresses out of arbitrary pasted text (deduped). */
export function extractAddresses(text: string): DetectedAddress[] {
  const out: DetectedAddress[] = [];
  const seen = new Set<string>();
  const push = (chain: Chain, address: string) => {
    if (!seen.has(address)) {
      seen.add(address);
      out.push({ chain, address });
    }
  };
  for (const m of text.matchAll(SUI_RE)) push("sui", m[0]);
  for (const m of text.matchAll(ETH_RE)) push("evm", m[0]);
  for (const m of text.matchAll(TRON_RE)) push("tron", m[0]);
  for (const c of text.match(SOL_RE) || []) if (isValidSolana(c)) push("solana", c);
  for (const m of text.matchAll(BTC_RE)) push("bitcoin", m[0]);
  return out;
}

/** First detected address (back-compat helper). */
export function extractAddress(text: string): DetectedAddress | null {
  return extractAddresses(text)[0] ?? null;
}

export function looksLikeAddress(text: string): boolean {
  return extractAddresses(text).length > 0;
}

// ---------- Solana RPC (multi-endpoint fallback) ----------

async function rpcOne<T>(endpoint: string, method: string, params: unknown[]): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`RPC ${method} HTTP ${res.status}`);
    const json = (await res.json()) as { result?: T; error?: { message: string } };
    if (json.error) throw new Error(`RPC ${method}: ${json.error.message}`);
    return json.result as T;
  } finally {
    clearTimeout(timeout);
  }
}

async function rpc<T>(method: string, params: unknown[]): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < ENDPOINTS.length; i++) {
    const idx = (preferred + i) % ENDPOINTS.length;
    try {
      const result = await rpcOne<T>(ENDPOINTS[idx], method, params);
      preferred = idx;
      return result;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr ?? new Error(`RPC ${method}: no endpoint available`);
}

interface SigInfo {
  signature: string;
  blockTime: number | null;
}
interface ParsedTokenAccount {
  pubkey: string;
  account: { data: { parsed: { info: { mint: string; tokenAmount: { uiAmount: number | null } } } } };
}

function settled<T>(r: PromiseSettledResult<T>): T | null {
  return r.status === "fulfilled" ? r.value : null;
}

export async function fetchSolanaMetrics(address: string): Promise<WalletMetrics> {
  const [accRes, balRes, sigRes, tokRes] = await Promise.allSettled([
    rpc<{ value: unknown }>("getAccountInfo", [address, { encoding: "base64" }]),
    rpc<{ value: number }>("getBalance", [address]),
    rpc<SigInfo[]>("getSignaturesForAddress", [address, { limit: SIGNATURE_SAMPLE }]),
    rpc<{ value: ParsedTokenAccount[] }>("getTokenAccountsByOwner", [
      address,
      { programId: TOKEN_PROGRAM },
      { encoding: "jsonParsed" },
    ]),
  ]);

  if ([accRes, balRes, sigRes, tokRes].every((r) => r.status === "rejected")) {
    throw new Error("all RPC calls failed");
  }
  const partial = [accRes, balRes, sigRes, tokRes].some((r) => r.status === "rejected");

  const accountInfo = settled(accRes);
  const balanceLamports = settled(balRes);
  const ownerSigs = settled(sigRes) || [];
  const tokenAccts = settled(tokRes)?.value || [];

  // stablecoin balances + ATA addresses to scan for token-only activity/age
  let balanceUsdt: number | null = null;
  let balanceUsdc: number | null = null;
  const ataPubkeys: string[] = [];
  for (const ta of tokenAccts) {
    const info = ta.account?.data?.parsed?.info;
    const mint = info?.mint;
    const ui = info?.tokenAmount?.uiAmount ?? 0;
    if (mint === USDT_MINT) balanceUsdt = (balanceUsdt ?? 0) + ui;
    if (mint === USDC_MINT) balanceUsdc = (balanceUsdc ?? 0) + ui;
    if (ta.pubkey) ataPubkeys.push(ta.pubkey);
  }

  // scan a bounded number of token accounts so SPL-only wallets aren't seen as "never used"
  const ataScan = await Promise.allSettled(
    ataPubkeys.slice(0, 4).map((pk) => rpc<SigInfo[]>("getSignaturesForAddress", [pk, { limit: SIGNATURE_SAMPLE }])),
  );
  const allSigs: SigInfo[] = [...ownerSigs];
  let anyAtaCapped = false;
  for (const r of ataScan) {
    const v = settled(r);
    if (Array.isArray(v)) {
      allSigs.push(...v);
      if (v.length >= SIGNATURE_SAMPLE) anyAtaCapped = true;
    }
  }

  const times = allSigs.map((s) => s.blockTime).filter((t): t is number => typeof t === "number");
  const firstSeenTs = times.length ? Math.min(...times) : null;
  const lastActiveTs = times.length ? Math.max(...times) : null;
  const txCount = allSigs.length;
  const txCountCapped = ownerSigs.length >= SIGNATURE_SAMPLE || anyAtaCapped;

  const exists = accountInfo?.value != null || tokenAccts.length > 0 || allSigs.length > 0;
  const now = Date.now() / 1000;
  const ageDays = firstSeenTs ? Math.floor((now - firstSeenTs) / 86400) : null;

  return {
    exists,
    ageDays,
    ageIsLowerBound: txCountCapped,
    firstSeen: firstSeenTs ? new Date(firstSeenTs * 1000).toISOString() : null,
    txCount,
    txCountCapped,
    balanceSol: typeof balanceLamports?.value === "number" ? balanceLamports.value / 1e9 : null,
    balanceUsdt,
    balanceUsdc,
    lastActive: lastActiveTs ? new Date(lastActiveTs * 1000).toISOString() : null,
    partial,
  };
}

// ---------- heuristics ----------

export interface ForensicResult {
  chain: Chain;
  address: string;
  risk: RiskLevel;
  signals: WalletSignal[];
  metrics: WalletMetrics | null;
  inspected: boolean;
  /** set when the address is on the verified allowlist */
  verified?: VerifiedWallet;
}

const ESTABLISHED_AGE_DAYS = 180;
const ESTABLISHED_TX = 250;
const FRESH_DANGER_DAYS = 4;
const FRESH_CAUTION_DAYS = 21;
const THIN_HISTORY_TX = 6;

export const RISK_RANK: Record<RiskLevel, number> = {
  alto: 4,
  medio: 3,
  desconocido: 2,
  bajo: 1,
};

export async function analyzeAddress(d: DetectedAddress): Promise<ForensicResult> {
  const { chain, address } = d;

  if (KNOWN_SCAM.has(address)) {
    return {
      chain,
      address,
      risk: "alto",
      inspected: true,
      metrics: null,
      signals: [{ id: "known_scam", severity: "danger", label: "Dirección reportada previamente como estafa." }],
    };
  }

  // positive-trust override: human-verified allowlist clears the fresh/never-used danger
  const verified = findVerified(address);
  if (verified) {
    let metrics: WalletMetrics | null = null;
    if (chain === "solana") {
      try {
        metrics = await fetchSolanaMetrics(address);
      } catch {
        /* verification stands even if the live read fails */
      }
    }
    return {
      chain,
      address,
      risk: "bajo",
      inspected: true,
      metrics,
      verified,
      signals: [
        {
          id: "verified_official",
          severity: "info",
          label: `En la lista verificada de Confía: ${verified.owner} — ${verified.label}.`,
        },
      ],
    };
  }

  // address-poisoning: looks almost identical to a verified address but isn't it
  const look = lookalikeOf(address);
  if (look) {
    return {
      chain,
      address,
      risk: "alto",
      inspected: true,
      metrics: null,
      signals: [
        {
          id: "address_poisoning",
          severity: "danger",
          label: `Casi idéntica a una dirección verificada (${look.owner}) pero NO es la misma. Posible suplantación por copia-pega.`,
        },
      ],
    };
  }

  if (chain !== "solana") {
    return {
      chain,
      address,
      risk: "medio",
      inspected: false,
      metrics: null,
      signals: [
        {
          id: "chain_not_inspected",
          severity: "caution",
          label: `No podemos inspeccionar ${chainName(chain)} en profundidad aquí. Trátala con cautela.`,
        },
        {
          id: "unsolicited_warning",
          severity: "caution",
          label: "Si recibiste esta dirección sin pedirla, es una señal de alarma.",
        },
      ],
    };
  }

  let m: WalletMetrics;
  try {
    m = await fetchSolanaMetrics(address);
  } catch {
    return {
      chain,
      address,
      risk: "desconocido",
      inspected: false,
      metrics: null,
      signals: [
        { id: "rpc_error", severity: "caution", label: "No pudimos consultar la cadena en este momento. Verifica por canales oficiales." },
      ],
    };
  }

  const signals: WalletSignal[] = [];
  const totalStable = (m.balanceUsdt ?? 0) + (m.balanceUsdc ?? 0);
  const hasActivity = m.txCount > 0;

  if (!m.exists || (!hasActivity && (m.balanceSol ?? 0) === 0 && totalStable === 0)) {
    signals.push({
      id: "never_used",
      severity: "danger",
      label: "Esta dirección no tiene actividad ni fondos en Solana. Un fondo de ayuda real tendría movimiento.",
    });
  } else {
    // age
    if (m.ageDays != null) {
      if (m.ageDays < FRESH_DANGER_DAYS) {
        signals.push({
          id: "fresh_account",
          severity: "danger",
          label: `Cuenta creada hace ~${m.ageDays} día(s). Patrón típico de estafa post-desastre.`,
        });
      } else if (m.ageDays < FRESH_CAUTION_DAYS) {
        signals.push({ id: "recent_account", severity: "caution", label: `Cuenta reciente (${m.ageDays} días). Precaución.` });
      }
    }

    // capped volume on a young wallet = anomalous velocity, not "established"
    if (m.txCountCapped && m.ageDays != null && m.ageDays < FRESH_CAUTION_DAYS) {
      signals.push({
        id: "high_velocity",
        severity: "danger",
        label: `Más de ${SIGNATURE_SAMPLE} transacciones en ~${m.ageDays} día(s). Volumen anómalo para una cuenta tan nueva.`,
      });
    }

    // received-and-emptied (sweep) on a recent wallet
    const residualTiny = (m.balanceSol ?? 0) < 0.01 && totalStable < 1;
    if (m.ageDays != null && m.ageDays < FRESH_CAUTION_DAYS && hasActivity && residualTiny) {
      signals.push({
        id: "swept",
        severity: "danger",
        label: "Tuvo movimiento pero está casi vacía: posible patrón de 'recibir y vaciar'.",
      });
    }

    // thin history
    if (!m.txCountCapped && m.txCount < THIN_HISTORY_TX) {
      signals.push({
        id: "thin_history",
        severity: "caution",
        label: `Muy poca actividad (${m.txCount} transacción/es). Poca evidencia de un fondo legítimo.`,
      });
    }

    // established (sustained age AND volume) — informational, never overrides danger
    const established = m.ageDays != null && m.ageDays >= ESTABLISHED_AGE_DAYS && m.txCount > ESTABLISHED_TX;
    if (established) {
      signals.push({ id: "established", severity: "info", label: "Cuenta con historial largo y actividad sostenida." });
    }
  }

  const hasDanger = signals.some((s) => s.severity === "danger");
  const hasCaution = signals.some((s) => s.severity === "caution");
  const hasEstablished = signals.some((s) => s.id === "established");

  let risk: RiskLevel;
  if (hasDanger) risk = "alto";
  else if (hasCaution) risk = "medio";
  else if (hasEstablished) risk = "bajo";
  else risk = "medio"; // unknown legitimacy in a donation context => caution by default

  return { chain, address, risk, signals, metrics: m, inspected: true };
}

function chainName(c: Chain): string {
  switch (c) {
    case "evm":
      return "una red EVM (Ethereum, Base, Polygon, Monad, HyperEVM)";
    case "sui":
      return "Sui";
    case "tron":
      return "Tron (USDT-TRC20)";
    case "bitcoin":
      return "Bitcoin";
    default:
      return "esta red";
  }
}
