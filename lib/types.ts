// Confía — shared verdict types. One engine, three surfaces (web, API, Telegram).

export type Lang = "es" | "en";

/** Risk level for a crypto address / donation channel. We NEVER assert "safe". */
export type RiskLevel = "alto" | "medio" | "bajo" | "desconocido";

/** Truth status for a forwarded message / rumor / resource question. */
export type InfoStatus = "verificado" | "falso" | "sin_confirmar";

export type Chain = "solana" | "ethereum" | "tron" | "bitcoin" | "desconocida";

export interface Source {
  name: string;
  url?: string;
  /** social handle, e.g. @FUNVISIS */
  handle?: string;
}

/** A forensic signal contributing to a wallet verdict. */
export interface WalletSignal {
  /** machine id, e.g. "fresh_account", "no_history", "drain_pattern" */
  id: string;
  /** how it pushes risk */
  severity: "info" | "caution" | "danger";
  /** Spanish, human-readable */
  label: string;
}

export interface WalletMetrics {
  exists: boolean;
  ageDays: number | null;
  /** true when the signature sample was capped, so ageDays is a lower bound */
  ageIsLowerBound: boolean;
  firstSeen: string | null; // ISO (oldest observed; a lower bound when capped)
  txCount: number; // merged owner + token-account sample count
  txCountCapped: boolean; // true if we hit the sample ceiling
  balanceSol: number | null;
  balanceUsdt: number | null; // USDT-SPL balance (the dominant VE donation rail)
  balanceUsdc: number | null; // USDC-SPL balance
  lastActive: string | null; // ISO
  /** true when some RPC calls failed but we still have partial data */
  partial: boolean;
}

interface VerdictBase {
  /** the exact thing we evaluated */
  query: string;
  /** ES headline, e.g. "Esta dirección parece una estafa" */
  title: string;
  /** ES one-paragraph explanation */
  detail: string;
  /** bullet reasons (ES) */
  reasons: string[];
  /** what to do next (ES) */
  advice: string;
  /** sources backing the verdict */
  sources: Source[];
  /** canonical official channels to fall back to, always shown */
  officialChannels: Source[];
  /** ISO timestamp of when this verdict's grounding was last updated */
  updatedAt: string;
  /** pre-formatted text for sharing (WhatsApp/Telegram) */
  shareText: string;
}

export interface WalletVerdict extends VerdictBase {
  kind: "wallet";
  chain: Chain;
  address: string;
  risk: RiskLevel;
  signals: WalletSignal[];
  metrics: WalletMetrics | null; // null for non-Solana chains we can't deep-inspect
}

export interface InfoVerdict extends VerdictBase {
  kind: "info";
  status: InfoStatus;
  category: "rumor" | "resource" | "general";
  /** confidence we matched the right knowledge entry (0-1) */
  matchConfidence: number;
}

export type Verdict = WalletVerdict | InfoVerdict;

export interface VerifyRequest {
  input: string;
  lang?: Lang;
}

export interface VerifyResponse {
  ok: boolean;
  verdict?: Verdict;
  error?: string;
}
