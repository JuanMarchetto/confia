// Confía — render a Verdict as plain text for Telegram / copy-share.

import type { Source, Verdict } from "./types";

function srcLine(s: Source): string {
  const bits = [s.name];
  if (s.handle) bits.push(s.handle);
  if (s.url && !s.url.startsWith("tel:")) bits.push(s.url);
  return "• " + bits.join(" — ");
}

export function formatVerdictText(v: Verdict): string {
  const lines: string[] = [v.title, "", v.detail];

  if (v.kind === "wallet" && v.reasons.length) {
    lines.push("");
    for (const r of v.reasons) lines.push("• " + r);
  }

  lines.push("", "👉 " + v.advice);

  if (v.sources.length) {
    lines.push("", "Fuentes:");
    v.sources.forEach((s) => lines.push(srcLine(s)));
  }

  lines.push("", "Canales oficiales:");
  v.officialChannels.slice(0, 4).forEach((s) => lines.push(srcLine(s)));

  lines.push("", "— Confía 🇻🇪 Verifica antes de creer. Verifica antes de donar.");
  return lines.join("\n");
}

export const TG_WELCOME = [
  "🇻🇪 *Confía* — verifica antes de creer, verifica antes de donar.",
  "",
  "Reenvíame cualquier mensaje del terremoto y te digo si es VERIFICADO, FALSO o SIN CONFIRMAR.",
  "",
  "💸 ¿Te piden donar en cripto? Pégame la dirección de la wallet (Solana, USDT...) y la reviso en cadena antes de que envíes un solo bolívar.",
  "",
  "Escribe o pega algo para empezar.",
].join("\n");

export const TG_HELP = [
  "Cómo usar Confía:",
  "• Reenvía un rumor o mensaje → te digo si es real.",
  "• Pega una dirección de cripto → la analizo en cadena.",
  "• Pregunta 'refugio', 'médico', 'cómo dono' → te doy el canal oficial.",
  "",
  "Ante una emergencia real: 911 o 171.",
].join("\n");
