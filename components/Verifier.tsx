"use client";

import { useEffect, useRef, useState } from "react";
import type { Verdict, VerifyResponse } from "@/lib/types";
import VerdictCard from "./VerdictCard";

const EXAMPLES: { label: string; value: string }[] = [
  {
    label: "🚨 Un rumor de réplica",
    value:
      "Reenviado: URGENTE ⚠️ viene una réplica de magnitud 8.0 hoy a las 6 PM, ¡evacúen ya!",
  },
  {
    label: "💸 Una wallet de “donación”",
    value:
      "Ayuda a las víctimas del terremoto 🇻🇪 envía tu donación en USDT o SOL a esta dirección: 5tNZjhKDDJvD52ioU3JimVafBmAjpkYyKhv2xUAbtZNZ",
  },
  {
    label: "🏠 Buscar refugio",
    value: "¿Dónde está el refugio más cercano y seguro?",
  },
];

export default function Verifier() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // move focus to the result when it arrives (announces + orients keyboard/SR users)
  useEffect(() => {
    if (verdict) headingRef.current?.focus();
  }, [verdict]);

  async function run(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    setLoading(true);
    setError(null);
    setVerdict(null);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ input: value }),
      });
      const data = (await res.json()) as VerifyResponse;
      if (data.ok && data.verdict) {
        setVerdict(data.verdict);
      } else {
        setError(data.error || "No se pudo verificar.");
        setVerdict(null);
      }
    } catch {
      setError("Sin conexión. Intenta de nuevo.");
      setVerdict(null);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    run(input);
  }

  function useExample(value: string) {
    setInput(value);
    run(value);
  }

  return (
    <div className="w-full">
      <form onSubmit={onSubmit}>
        <div className="rounded-2xl border bg-surface p-3 shadow-sm focus-within:border-brand">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                run(input);
              }
            }}
            rows={4}
            maxLength={4000}
            placeholder="Pega aquí un mensaje reenviado, una dirección de cripto o una pregunta…"
            aria-label="Texto a verificar"
            className="w-full resize-none bg-transparent px-2 py-1.5 text-base leading-relaxed outline-none placeholder:text-muted"
          />
          <div className="flex items-center justify-between gap-3 px-2 pt-1">
            <span className="hidden text-xs text-muted sm:block">
              Ctrl/⌘ + Enter para verificar
            </span>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-busy={loading}
              className="ml-auto inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
            >
              {loading ? (
                <>
                  <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Verificando…
                </>
              ) : (
                <>🛡️ Verificar</>
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="self-center text-xs text-muted">Prueba:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            type="button"
            onClick={() => useExample(ex.value)}
            disabled={loading}
            className="inline-flex min-h-[40px] items-center rounded-full border bg-surface px-3 py-2 text-xs font-medium transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* persistent live region: must exist in the DOM before content is injected */}
      <div aria-live="polite" aria-atomic="true">
        <span className="sr-only">{loading ? "Verificando…" : ""}</span>

        {error && (
          <p
            role="alert"
            className="confia-rise mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </p>
        )}

        {verdict && <VerdictCard verdict={verdict} headingRef={headingRef} />}
      </div>
    </div>
  );
}
