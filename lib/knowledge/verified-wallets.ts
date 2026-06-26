// Confía — verified-wallet allowlist (positive-trust signal).
//
// A brand-new wallet created right after the quake is ALSO the legit-relief pattern,
// so on-chain freshness alone can't clear it. This curated, human-verified registry
// lets a known-good donation address override the "fresh/never-used" danger.
//
// GOVERNANCE: adding an entry is a TRUST ASSERTION. Each entry MUST cite verifiable
// provenance (an official account/site that published the address) and be reviewed by
// a human before merge. When in doubt, leave it out — a false "verified" is worse than
// a cautious "no podemos confirmar". Ops can also inject addresses at runtime via the
// CONFIA_VERIFIED_LIST env var (comma-separated), but those carry no provenance label.

import type { Chain, Source } from "../types";

export interface VerifiedWallet {
  chain: Chain;
  address: string;
  owner: string; // who controls it
  label: string; // what it is for
  source: Source; // where it was published (provenance)
  verifiedAt: string; // YYYY-MM-DD a human confirmed it
}

export const VERIFIED_WALLETS: VerifiedWallet[] = [
  {
    chain: "solana",
    address: "59aQtUWWU2VVU5QZySUxLy3VDsYkoeVZuVU8J4zJmMVq",
    owner: "@soymaikoldev",
    label: "Donaciones para damnificados del terremoto",
    source: {
      name: "@soymaikoldev (X)",
      url: "https://x.com/soymaikoldev/status/2070190102421119372",
    },
    verifiedAt: "2026-06-26",
  },
];

const ENV_VERIFIED = (process.env.CONFIA_VERIFIED_LIST || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export const VERIFIED_BY_ADDRESS = new Map<string, VerifiedWallet>();
for (const w of VERIFIED_WALLETS) VERIFIED_BY_ADDRESS.set(w.address, w);
for (const a of ENV_VERIFIED) {
  if (!VERIFIED_BY_ADDRESS.has(a)) {
    VERIFIED_BY_ADDRESS.set(a, {
      chain: "solana",
      address: a,
      owner: "Lista verificada interna",
      label: "Dirección verificada",
      source: { name: "Lista verificada de Confía" },
      verifiedAt: "",
    });
  }
}

/**
 * Address-poisoning / lookalike check: a scammer publishes a vanity address that shares
 * the same first/last characters as a verified one (what users eyeball when comparing).
 * If a pasted address matches a verified one's head+tail but is NOT identical, it's a
 * likely impersonation.
 */
export function lookalikeOf(address: string): VerifiedWallet | null {
  const head = address.slice(0, 5);
  const tail = address.slice(-5);
  for (const w of VERIFIED_BY_ADDRESS.values()) {
    if (w.address === address) continue;
    if (w.address.slice(0, 5) === head && w.address.slice(-5) === tail) return w;
  }
  return null;
}
