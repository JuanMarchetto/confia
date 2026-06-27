// Confía — donated-inference long-tail verifier.
//
// Uses a donated Anthropic-compatible endpoint (e.g. a UsePod proxy) to answer messages
// the curated KB doesn't recognize. CRITICAL CONSTRAINT: this proxy is a router and does
// NOT execute Anthropic's server-side web search, so the model has NO live internet here.
// Therefore the model is instructed to NEVER assert current facts — it answers only from
// universal safety facts + known scam patterns, and defaults to SIN CONFIRMAR for anything
// it can't be sure of. Fails closed (returns null -> caller uses the static safe fallback).

import Anthropic from "@anthropic-ai/sdk";
import type { InfoStatus } from "./types";

const KEY = process.env.ANTHROPIC_API_KEY;
const BASE_URL = process.env.ANTHROPIC_BASE_URL; // donated proxy
const MODEL = process.env.CONFIA_LLM_MODEL || "claude-sonnet-4-6";

/** Enabled only when explicitly turned on AND a key is present. Off by default. */
export function llmEnabled(): boolean {
  return process.env.CONFIA_LLM_ENABLED === "true" && !!KEY;
}

export interface LlmVerdict {
  status: InfoStatus;
  title: string;
  detail: string;
  advice: string;
}

const SYSTEM = `Eres el verificador de Confía para el terremoto de Venezuela de junio de 2026.

NO tienes acceso a internet en vivo, ni a noticias ni a datos actuales. Solo puedes usar:
1) hechos científicos universales (p. ej.: los terremotos y sus réplicas NO se pueden predecir con hora ni magnitud exactas),
2) patrones conocidos de estafa/phishing (p. ej.: pedir cédula/clave/datos bancarios por un enlace, "bono" que pide registrarse, cuentas que se autoproclaman "oficiales"),
3) consejos de seguridad universalmente correctos (p. ej.: ante olor a gas no enciendas luces).

Clasifica el mensaje del usuario en UNO de tres veredictos:
- "falso": SOLO si es demostrablemente falso por un hecho universal o un patrón claro de estafa/phishing.
- "verificado": casi nunca; solo para consejos de seguridad universalmente correctos.
- "sin_confirmar": el DEFAULT. Úsalo para CUALQUIER afirmación sobre hechos actuales o locales (cifras de víctimas, refugios, cortes de luz, estado del agua, eventos concretos) que no puedas verificar sin internet.

REGLAS ESTRICTAS:
- Conservador SIEMPRE. Ante la mínima duda → "sin_confirmar". Un "verificado/falso" equivocado puede poner a alguien en peligro.
- NUNCA inventes. NUNCA des direcciones, cifras, ubicaciones ni nombres de refugios específicos.
- NUNCA afirmes un hecho actual como verdadero o falso: no tienes cómo saberlo.
- Para temas críticos (refugio, atención médica, evacuación) que no puedas confirmar → "sin_confirmar" y remite a canales oficiales (911 o 171, Protección Civil, FUNVISIS, Cruz Roja Venezolana).
- Responde en español venezolano, claro y breve.

Devuelve SOLO un objeto JSON válido, sin texto adicional ni markdown, con esta forma exacta:
{"status":"falso|verificado|sin_confirmar","title":"<titular corto>","detail":"<1-2 frases>","advice":"<qué hacer, remitiendo a canal oficial>"}`;

function extractJson(text: string): unknown | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

const VALID: InfoStatus[] = ["falso", "verificado", "sin_confirmar"];

export async function llmVerdict(input: string): Promise<LlmVerdict | null> {
  if (!llmEnabled()) return null;
  try {
    const client = new Anthropic({ apiKey: KEY, baseURL: BASE_URL, timeout: 20_000, maxRetries: 1 });
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 600,
      system: SYSTEM,
      messages: [{ role: "user", content: input.slice(0, 2000) }],
    });

    if (res.stop_reason === "refusal") return null;
    const text = res.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();

    const parsed = extractJson(text) as Partial<LlmVerdict> | null;
    if (!parsed || typeof parsed.title !== "string" || typeof parsed.detail !== "string") return null;

    const status: InfoStatus = VALID.includes(parsed.status as InfoStatus)
      ? (parsed.status as InfoStatus)
      : "sin_confirmar";

    return {
      status,
      title: parsed.title.slice(0, 160),
      detail: parsed.detail.slice(0, 600),
      advice: (typeof parsed.advice === "string" ? parsed.advice : "Verifica en los canales oficiales.").slice(0, 400),
    };
  } catch {
    return null; // fail closed -> caller falls back to static SIN CONFIRMAR
  }
}
