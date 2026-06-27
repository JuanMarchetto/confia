"use client";

import { useEffect, useState } from "react";
import type { Source, Verdict, WalletVerdict } from "@/lib/types";
import DonationList from "./DonationList";

type Tone = "danger" | "warn" | "ok" | "neutral";

function toneOf(v: Verdict): Tone {
  if (v.kind === "wallet") {
    if (v.risk === "alto") return "danger";
    if (v.risk === "medio") return "warn";
    if (v.risk === "bajo") return "ok";
    return "neutral";
  }
  if (v.status === "falso") return "danger";
  if (v.status === "verificado") return "ok";
  return "warn";
}

const TONE: Record<Tone, { ring: string; chip: string; bar: string }> = {
  danger: {
    ring: "border-red-300 dark:border-red-900/60",
    chip: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200",
    bar: "bg-red-500",
  },
  warn: {
    ring: "border-amber-300 dark:border-amber-900/60",
    chip: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
    bar: "bg-amber-500",
  },
  ok: {
    ring: "border-emerald-300 dark:border-emerald-900/60",
    chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
    bar: "bg-emerald-500",
  },
  neutral: {
    ring: "border-zinc-300 dark:border-zinc-700",
    chip: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
    bar: "bg-zinc-400",
  },
};

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("es-VE", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function SourceList({ items, label }: { items: Source[]; label: string }) {
  if (!items.length) return null;
  return (
    <div className="mt-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <ul className="mt-1 space-y-1">
        {items.map((s, i) => (
          <li key={i} className="text-sm">
            {s.url ? (
              <a
                href={s.url}
                target={s.url.startsWith("tel:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-brand underline-offset-2 hover:underline"
              >
                {s.name}
              </a>
            ) : (
              <span>{s.name}</span>
            )}
            {s.handle ? <span className="text-muted"> · {s.handle}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WalletMetrics({ v }: { v: WalletVerdict }) {
  const m = v.metrics;
  if (!m) return null;
  const chips: string[] = [];
  if (!m.exists) chips.push("Sin actividad en cadena");
  if (m.ageDays != null) chips.push(`Antigüedad: ${m.ageIsLowerBound ? "≥" : ""}${m.ageDays} día(s)`);
  chips.push(`Transacciones: ${m.txCount}${m.txCountCapped ? "+" : ""}`);
  if (m.balanceSol != null) chips.push(`${m.balanceSol.toFixed(3)} SOL`);
  if (m.balanceUsdt != null) chips.push(`${m.balanceUsdt.toFixed(2)} USDT`);
  if (m.balanceUsdc != null) chips.push(`${m.balanceUsdc.toFixed(2)} USDC`);

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {chips.map((c, i) => (
        <span
          key={i}
          className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  // legacy fallback for older / non-HTTPS Android browsers
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default function VerdictCard({
  verdict,
  headingRef,
}: {
  verdict: Verdict;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
}) {
  const tone = toneOf(verdict);
  const t = TONE[tone];
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const waHref = `https://wa.me/?text=${encodeURIComponent(verdict.shareText)}`;

  async function onCopy() {
    const ok = await copyText(verdict.shareText);
    setCopied(ok);
    setTimeout(() => setCopied(false), 1800);
  }

  async function onShare() {
    try {
      await navigator.share({ text: verdict.shareText });
    } catch {
      /* user cancelled or unsupported */
    }
  }

  return (
    <section
      className={`confia-rise mt-5 overflow-hidden rounded-2xl border bg-surface shadow-sm ${t.ring}`}
      role="region"
      aria-label="Resultado de la verificación"
    >
      <div className={`h-1.5 w-full ${t.bar}`} />
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${t.chip}`}>
            {verdict.kind === "wallet" ? "ANÁLISIS EN CADENA" : verdict.category === "rumor" ? "RUMOR" : verdict.category === "resource" ? "RECURSO" : "MENSAJE"}
          </span>
          {verdict.kind === "wallet" && (
            <span className="font-mono text-xs text-muted">
              {verdict.chain.toUpperCase()} · {verdict.address.slice(0, 6)}…{verdict.address.slice(-6)}
            </span>
          )}
        </div>

        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 text-xl font-bold leading-tight outline-none"
        >
          {verdict.title}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-foreground/90">{verdict.detail}</p>

        {verdict.kind === "wallet" && <WalletMetrics v={verdict} />}

        {verdict.kind === "wallet" && verdict.reasons.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {verdict.reasons.map((r, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span aria-hidden className="mt-0.5 shrink-0">
                  {tone === "danger" ? "🔴" : tone === "warn" ? "🟡" : tone === "ok" ? "🟢" : "•"}
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 rounded-xl bg-zinc-50 p-3 text-sm dark:bg-zinc-900/60">
          <span className="font-semibold">Qué hacer: </span>
          {verdict.advice}
        </div>

        <SourceList items={verdict.sources} label="Fuentes" />
        <SourceList items={verdict.officialChannels} label="Canales oficiales" />

        {verdict.kind === "wallet" &&
          verdict.donationChannels &&
          verdict.donationChannels.length > 0 && (
            <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <DonationList
                channels={verdict.donationChannels}
                title="✅ Dona seguro: direcciones verificadas"
              />
            </div>
          )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            💬 Compartir por WhatsApp
          </a>
          {canShare && (
            <button
              type="button"
              onClick={onShare}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Compartir…
            </button>
          )}
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {copied ? "✓ Copiado" : "Copiar"}
          </button>
          <span className="ml-auto text-xs text-muted">
            Actualizado: {fmtDate(verdict.updatedAt)}
          </span>
        </div>
      </div>
    </section>
  );
}
