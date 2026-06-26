// Confía — canonical official channels, verified via research (June 2026).
// Handles/URLs corrected from first-draft guesses. 911 is the primary national
// emergency line (VEN 9-1-1); 171 is a legacy fallback still active in some regions.

import type { Source } from "../types";

export const OFFICIAL_CHANNELS: Source[] = [
  { name: "Emergencias 911", url: "tel:911" },
  { name: "Emergencias 171 (respaldo regional)", url: "tel:171" },
  {
    name: "FUNVISIS — sismología oficial",
    url: "https://www.funvisis.gob.ve",
    handle: "@SomosFunvisis",
  },
  {
    name: "Protección Civil Venezuela",
    url: "https://www.pcivil.gob.ve",
    handle: "@PCivil_Ve",
  },
  { name: "Cruz Roja Venezolana", url: "https://cruzroja.ve", handle: "@CruzRojaVe" },
  { name: "Bomberos (DGNB)", url: "https://dgnb.gob.ve", handle: "@DGNBEnLinea" },
];

/** Smaller subset for tight UIs / share text. */
export const CORE_CHANNELS: Source[] = OFFICIAL_CHANNELS.slice(0, 3);

/** When this knowledge corpus was last reviewed by a human. */
export const KNOWLEDGE_REVIEWED_AT = "2026-06-26T00:00:00.000Z";
