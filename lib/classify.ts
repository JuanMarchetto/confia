// Confía — input router. Decides whether a pasted string is a crypto address,
// a known rumor, a resource question, or something we can't confidently classify.

import { extractAddress, type DetectedAddress } from "./forensics";
import { RUMORS, type RumorEntry } from "./knowledge/rumors";
import { RESOURCE_INTENTS, type ResourceIntent } from "./knowledge/resources";

export type Classification =
  | { type: "wallet"; detected: DetectedAddress }
  | { type: "rumor"; entry: RumorEntry; confidence: number }
  | { type: "resource"; entry: ResourceIntent; confidence: number }
  | { type: "general" };

function deaccent(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

interface Scorable {
  patterns: RegExp[];
  keywords: string[];
}

/** patterns weigh 3, keywords weigh 1. Returns {score, hadPattern}. */
function scoreEntry(raw: string, flat: string, e: Scorable): { score: number; hadPattern: boolean } {
  let score = 0;
  let hadPattern = false;
  for (const p of e.patterns) {
    if (p.test(raw)) {
      score += 3;
      hadPattern = true;
    }
  }
  for (const k of e.keywords) {
    if (flat.includes(deaccent(k.toLowerCase()))) score += 1;
  }
  return { score, hadPattern };
}

const ACCEPT_THRESHOLD = 2; // >=1 pattern, or >=2 keywords

const MAX_CLASSIFY_LEN = 2000;

export function classify(input: string): Classification {
  const raw = input.trim().slice(0, MAX_CLASSIFY_LEN);

  // 1) crypto address always wins — it's the highest-value, unambiguous check.
  const detected = extractAddress(raw);
  if (detected) return { type: "wallet", detected };

  const flat = deaccent(raw.toLowerCase());

  // 2) best rumor match
  let bestRumor: { entry: RumorEntry; score: number; hadPattern: boolean } | null = null;
  for (const entry of RUMORS) {
    const { score, hadPattern } = scoreEntry(raw, flat, entry);
    if (score > 0 && (!bestRumor || score > bestRumor.score)) bestRumor = { entry, score, hadPattern };
  }

  // 3) best resource match
  let bestResource: { entry: ResourceIntent; score: number; hadPattern: boolean } | null = null;
  for (const entry of RESOURCE_INTENTS) {
    const { score, hadPattern } = scoreEntry(raw, flat, entry);
    if (score > 0 && (!bestResource || score > bestResource.score)) bestResource = { entry, score, hadPattern };
  }

  const rumorScore = bestRumor?.score ?? 0;
  const resourceScore = bestResource?.score ?? 0;

  // SAFETY GUARD: a FALSO verdict may only fire on a specific pattern match, never on
  // stray keywords — so a legit message is never branded false by two coincidental words.
  const rumorUsable = !!bestRumor && !(bestRumor.entry.status === "falso" && !bestRumor.hadPattern);

  const usableRumorScore = rumorUsable ? rumorScore : 0;
  if (Math.max(usableRumorScore, resourceScore) < ACCEPT_THRESHOLD) return { type: "general" };

  // prefer rumor when usable and at least ties the resource score (misinformation first),
  // but only steal a tie if it actually matched a pattern
  if (
    rumorUsable &&
    usableRumorScore >= resourceScore &&
    (bestRumor!.hadPattern || usableRumorScore > resourceScore)
  ) {
    return { type: "rumor", entry: bestRumor!.entry, confidence: confidenceFrom(rumorScore) };
  }
  if (bestResource && resourceScore >= ACCEPT_THRESHOLD) {
    return { type: "resource", entry: bestResource.entry, confidence: confidenceFrom(resourceScore) };
  }
  if (rumorUsable && usableRumorScore >= ACCEPT_THRESHOLD) {
    return { type: "rumor", entry: bestRumor!.entry, confidence: confidenceFrom(rumorScore) };
  }
  return { type: "general" };
}

function confidenceFrom(score: number): number {
  return Math.min(1, Math.round((score / 6) * 100) / 100);
}
