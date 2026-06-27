// Confía — verified donation addresses (positive-trust signal + safe-channel list).
//
// These are the official, human-verified addresses to RECEIVE donations. They serve
// three purposes:
//   1. Whitelist — pasting one returns ✅ "dirección verificada" (overrides fresh/new danger).
//   2. Safe alternative — shown in the verdict when the pasted address can't be verified
//      or looks suspicious ("dona seguro en estas direcciones").
//   3. Lookalike defense — a near-match of a verified address is flagged as impersonation.
//
// GOVERNANCE: each entry is a TRUST ASSERTION — transcribe addresses EXACTLY and review
// before merge. One EVM address serves all EVM chains (Ethereum/Base/Polygon/Monad/HyperEVM).

import type { Chain, DonationChannel, Source } from "../types";

const EVM_DONATION = "0x89b4cB1a0a29be4122a8E00e766F7F89cdB578Cf";
const SOL_DONATION = "3pUFqvQigz3cutrAGwzeY1qMfYYix57J9PJ2TG6QDhkX";
const BTC_DONATION = "bc1q00xwfq775swknj3zgf7cq8eul6fn0u6qh4u30m";
const SUI_DONATION = "0x0e38adc6ba7f2236e9c72651f3a3ab85af8b0900d14ffa6d7b7202d8132763c0";

const EVM_CHAINS = ["Ethereum", "Base", "Polygon", "Monad", "HyperEVM"];

/** Official donation addresses, one row per chain (display list). */
export const DONATION_CHANNELS: DonationChannel[] = [
  { chain: "Solana", network: "solana", address: SOL_DONATION },
  ...EVM_CHAINS.map((chain): DonationChannel => ({ chain, network: "evm", address: EVM_DONATION })),
  { chain: "Bitcoin", network: "bitcoin", address: BTC_DONATION },
  { chain: "Sui", network: "sui", address: SUI_DONATION },
];

export interface VerifiedWallet {
  chain: Chain;
  address: string;
  owner: string;
  label: string;
  source: Source;
  verifiedAt: string; // YYYY-MM-DD
  /** other chains the same address works on (EVM) */
  alsoOn?: string[];
}

const DONATION_SOURCE: Source = {
  name: "Lista verificada de Confía",
  url: process.env.CONFIA_PUBLIC_URL || "https://confia-rose.vercel.app",
};

export const VERIFIED_WALLETS: VerifiedWallet[] = [
  { chain: "solana", address: SOL_DONATION, owner: "Confía", label: "Donaciones verificadas (Solana)", source: DONATION_SOURCE, verifiedAt: "2026-06-27" },
  { chain: "evm", address: EVM_DONATION, owner: "Confía", label: "Donaciones verificadas (EVM)", alsoOn: EVM_CHAINS, source: DONATION_SOURCE, verifiedAt: "2026-06-27" },
  { chain: "bitcoin", address: BTC_DONATION, owner: "Confía", label: "Donaciones verificadas (Bitcoin)", source: DONATION_SOURCE, verifiedAt: "2026-06-27" },
  { chain: "sui", address: SUI_DONATION, owner: "Confía", label: "Donaciones verificadas (Sui)", source: DONATION_SOURCE, verifiedAt: "2026-06-27" },
  // previously verified third-party relief wallet
  {
    chain: "solana",
    address: "59aQtUWWU2VVU5QZySUxLy3VDsYkoeVZuVU8J4zJmMVq",
    owner: "@soymaikoldev",
    label: "Donaciones para damnificados del terremoto",
    source: { name: "@soymaikoldev (X)", url: "https://x.com/soymaikoldev/status/2070190102421119372" },
    verifiedAt: "2026-06-26",
  },
];

// hex (0x...) and bech32 (bc1...) addresses are case-insensitive; base58 (Solana) is not.
function caseInsensitive(addr: string): boolean {
  return /^(0x|bc1|tb1)/i.test(addr);
}
function norm(addr: string): string {
  return caseInsensitive(addr) ? addr.toLowerCase() : addr;
}

const VERIFIED_INDEX = new Map<string, VerifiedWallet>();
for (const w of VERIFIED_WALLETS) VERIFIED_INDEX.set(norm(w.address), w);

// ops override (no provenance label)
for (const a of (process.env.CONFIA_VERIFIED_LIST || "").split(",").map((s) => s.trim()).filter(Boolean)) {
  const k = norm(a);
  if (!VERIFIED_INDEX.has(k)) {
    VERIFIED_INDEX.set(k, { chain: "desconocida", address: a, owner: "Lista verificada interna", label: "Dirección verificada", source: { name: "Lista verificada de Confía" }, verifiedAt: "" });
  }
}

/** Exact (case-aware) match against the verified allowlist. */
export function findVerified(address: string): VerifiedWallet | null {
  return VERIFIED_INDEX.get(norm(address)) ?? null;
}

/**
 * Address poisoning / lookalike: same first+last chars as a verified address (what users
 * eyeball) but not identical → likely impersonation. Case-insensitive.
 */
export function lookalikeOf(address: string): VerifiedWallet | null {
  const a = norm(address);
  const head = a.slice(0, 5);
  const tail = a.slice(-5);
  for (const w of VERIFIED_INDEX.values()) {
    const wa = norm(w.address);
    if (wa === a) continue;
    if (wa.slice(0, 5) === head && wa.slice(-5) === tail) return w;
  }
  return null;
}
