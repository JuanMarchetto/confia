// Confía — verdict orchestrator. classify -> (forensics | knowledge) -> Verdict.

import { classify } from "./classify";
import { analyzeAddress, extractAddresses, RISK_RANK, type ForensicResult } from "./forensics";
import { DONATION_CHANNELS } from "./knowledge/verified-wallets";
import { llmEnabled, llmVerdict } from "./llm";
import { rateLimit } from "./ratelimit";

/** Per-client cap on donated-inference calls (conserve credits + abuse control). */
const AI_MAX_PER_CLIENT = Number(process.env.CONFIA_LLM_MAX_PER_IP || "8");

function aiAllowed(clientId?: string): boolean {
  if (!clientId) return true;
  return rateLimit(`ai:${clientId}`, AI_MAX_PER_CLIENT, 3_600_000).ok; // per hour
}

export interface VerdictOptions {
  /** stable per-user id (IP for web, chat id for Telegram) used to rate-limit AI */
  clientId?: string;
}
import { OFFICIAL_CHANNELS, KNOWLEDGE_REVIEWED_AT } from "./knowledge/official";
import type {
  InfoVerdict,
  RiskLevel,
  Source,
  Verdict,
  WalletVerdict,
} from "./types";

const SITE = process.env.CONFIA_PUBLIC_URL || "https://confia.app";

export async function getVerdict(input: string, opts: VerdictOptions = {}): Promise<Verdict> {
  const text = input.trim();

  // 1) crypto addresses first — analyze ALL detected (a scammer can prepend a decoy),
  // surface the worst verdict. Prioritize Solana (deep inspection), cap the fan-out.
  const addrs = extractAddresses(text);
  if (addrs.length) {
    const sol = addrs.filter((a) => a.chain === "solana");
    const other = addrs.filter((a) => a.chain !== "solana");
    const toScan = [...sol, ...other].slice(0, 5);
    const analyzed = await Promise.all(toScan.map(analyzeAddress));
    analyzed.sort((a, b) => RISK_RANK[b.risk] - RISK_RANK[a.risk]);
    return buildWalletVerdict(text, analyzed[0], addrs.length);
  }

  const c = classify(text);

  if (c.type === "rumor") {
    const e = c.entry;
    return buildInfo({
      query: input.trim(),
      status: e.status,
      category: "rumor",
      title: e.title,
      detail: e.detail,
      advice: e.advice,
      sources: e.sources,
      matchConfidence: c.confidence,
    });
  }

  if (c.type === "resource") {
    const e = c.entry;
    return buildInfo({
      query: input.trim(),
      status: e.status,
      category: "resource",
      title: e.title,
      detail: e.detail,
      advice: e.advice,
      sources: e.sources,
      matchConfidence: c.confidence,
    });
  }

  // general / long tail — try the donated LLM (conservative, no live web), else fall back.
  // Only reached when there's NO wallet in the message (addresses are handled above) and
  // no KB match. AI usage is capped per client to conserve donated inference.
  if (llmEnabled() && aiAllowed(opts.clientId)) {
    const ai = await llmVerdict(text);
    if (ai) {
      return buildInfo({
        query: input.trim(),
        status: ai.status,
        category: "general",
        title: ai.title,
        detail: ai.detail,
        advice: ai.advice,
        sources: [{ name: "Respuesta asistida por IA — sin verificación en vivo" }],
        matchConfidence: 0.4,
      });
    }
  }

  // safe fallback. We never guess on safety-critical questions.
  return buildInfo({
    query: input.trim(),
    status: "sin_confirmar",
    category: "general",
    title: "No podemos confirmar esto",
    detail:
      "No reconocemos este mensaje en nuestra base verificada, así que no podemos confirmarlo ni desmentirlo. No te fíes de mensajes reenviados sin fuente.",
    advice:
      "Verifica directamente con un canal oficial antes de actuar o reenviar. Si es una dirección de cripto, pégala para analizarla en cadena.",
    sources: [],
    matchConfidence: 0,
  });
}

// ---------- wallet ----------

const RISK_HEADLINE: Record<RiskLevel, string> = {
  alto: "🔴 ALTO RIESGO — no envíes fondos",
  medio: "🟡 PRECAUCIÓN — legitimidad no confirmada",
  bajo: "🟢 Sin señales de alarma",
  desconocido: "⚪ No se pudo analizar",
};

function buildWalletVerdict(query: string, f: ForensicResult, addressCount = 1): WalletVerdict {
  const reasons = f.signals.map((s) => s.label);
  const multiNote =
    addressCount > 1
      ? `Se detectaron ${addressCount} direcciones en el mensaje; se muestra la de mayor riesgo. `
      : "";

  const headline = f.verified ? "✅ Dirección verificada (canal conocido)" : RISK_HEADLINE[f.risk];

  const detail = f.verified
    ? `${multiNote}Esta dirección está en la lista verificada de Confía: ${f.verified.owner} — ${f.verified.label}.${chainSummary(f)} Aun así, confirma siempre por el canal oficial antes de enviar fondos.`
    : multiNote + walletDetail(f);

  const advice = walletAdvice(f);
  const sources = f.verified ? [f.verified.source, ...chainExplorer(f)] : chainExplorer(f);
  // when the address isn't trusted, surface the safe official donation addresses
  const donationChannels = f.verified || f.risk === "bajo" ? undefined : DONATION_CHANNELS;

  const shareText = buildShare(`${headline}\nDirección: ${truncate(f.address)}`, advice);

  return {
    kind: "wallet",
    query,
    chain: f.chain,
    address: f.address,
    risk: f.risk,
    signals: f.signals,
    metrics: f.metrics,
    title: headline,
    detail,
    reasons,
    advice,
    sources,
    officialChannels: OFFICIAL_CHANNELS,
    donationChannels,
    updatedAt: new Date().toISOString(), // live on-chain read
    shareText,
  };
}

/** compact on-chain summary appended to verified-wallet detail */
function chainSummary(f: ForensicResult): string {
  const m = f.metrics;
  if (!m || !m.exists) return "";
  const bits: string[] = [];
  if (m.ageDays != null) bits.push(`${m.ageIsLowerBound ? "≥" : "~"}${m.ageDays} día(s)`);
  bits.push(`${m.txCount}${m.txCountCapped ? "+" : ""} tx`);
  return ` (en cadena: ${bits.join(", ")}).`;
}

function walletDetail(f: ForensicResult): string {
  if (f.chain !== "solana") {
    return "Detectamos una dirección de una red que no podemos inspeccionar en profundidad aquí (el análisis en cadena de Confía cubre Solana). Trátala con cautela, sobre todo si te llegó sin que la pidieras.";
  }
  if (!f.inspected || !f.metrics) {
    return "Detectamos una dirección de Solana pero no pudimos leer la cadena en este momento. Verifica siempre por canales oficiales antes de enviar fondos.";
  }
  const m = f.metrics;
  const parts: string[] = [];
  if (m.exists) {
    if (m.ageDays != null) parts.push(`antigüedad ${m.ageIsLowerBound ? "≥" : "~"}${m.ageDays} día(s)`);
    parts.push(`${m.txCount}${m.txCountCapped ? "+" : ""} transacción(es)`);
    if (m.balanceSol != null) parts.push(`${m.balanceSol.toFixed(3)} SOL`);
    if (m.balanceUsdt != null) parts.push(`${m.balanceUsdt.toFixed(2)} USDT`);
    if (m.balanceUsdc != null) parts.push(`${m.balanceUsdc.toFixed(2)} USDC`);
  } else {
    parts.push("sin actividad en cadena");
  }
  const summary = parts.length ? ` Datos en cadena: ${parts.join(", ")}.` : "";
  switch (f.risk) {
    case "alto":
      return `Esta dirección de Solana muestra señales típicas de estafa.${summary} Un fondo de ayuda real no encaja con este patrón.`;
    case "bajo":
      return `Esta dirección tiene historial sólido y no muestra señales de alarma.${summary} Aun así, confirma que sea el canal oficial correcto antes de donar.`;
    default:
      return `No pudimos confirmar que esta dirección sea un fondo de ayuda legítimo.${summary} Trátala con cautela.`;
  }
}

function walletAdvice(f: ForensicResult): string {
  const base =
    "Dona solo por canales oficiales verificados (Cruz Roja Venezolana, 911/171). Nunca envíes cripto solo porque un mensaje lo pida.";
  if (f.risk === "alto") return "No envíes fondos a esta dirección. " + base;
  return base;
}

function chainExplorer(f: ForensicResult): Source[] {
  if (f.chain === "solana")
    return [{ name: "Ver en Solscan", url: `https://solscan.io/account/${f.address}` }];
  if (f.chain === "evm")
    return [{ name: "Ver en Blockscan", url: `https://blockscan.com/address/${f.address}` }];
  if (f.chain === "sui")
    return [{ name: "Ver en Suiscan", url: `https://suiscan.xyz/mainnet/account/${f.address}` }];
  if (f.chain === "tron")
    return [{ name: "Ver en Tronscan", url: `https://tronscan.org/#/address/${f.address}` }];
  if (f.chain === "bitcoin")
    return [{ name: "Ver en mempool.space", url: `https://mempool.space/address/${f.address}` }];
  return [];
}

// ---------- info ----------

const STATUS_BADGE = {
  verificado: "✅ VERIFICADO",
  falso: "🚫 FALSO",
  sin_confirmar: "⚠️ SIN CONFIRMAR",
} as const;

function buildInfo(args: {
  query: string;
  status: InfoVerdict["status"];
  category: InfoVerdict["category"];
  title: string;
  detail: string;
  advice: string;
  sources: Source[];
  matchConfidence: number;
}): InfoVerdict {
  const shareText = buildShare(`${STATUS_BADGE[args.status]} — ${args.title}`, args.advice);
  return {
    kind: "info",
    query: args.query,
    status: args.status,
    category: args.category,
    title: args.title,
    detail: args.detail,
    reasons: [],
    advice: args.advice,
    sources: args.sources,
    officialChannels: OFFICIAL_CHANNELS,
    updatedAt: KNOWLEDGE_REVIEWED_AT,
    matchConfidence: args.matchConfidence,
    shareText,
  };
}

// ---------- shared ----------

function buildShare(headline: string, advice: string): string {
  return `${headline}\n\n${advice}\n\nVerificado con Confía 🇻🇪 ${SITE}`;
}

function truncate(addr: string): string {
  return addr.length > 14 ? `${addr.slice(0, 6)}…${addr.slice(-6)}` : addr;
}
