"use client";

import { useState } from "react";
import type { DonationChannel } from "@/lib/types";

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
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

function short(a: string): string {
  return a.length > 18 ? `${a.slice(0, 8)}…${a.slice(-6)}` : a;
}

export default function DonationList({
  channels,
  title = "Dona de forma segura",
}: {
  channels: DonationChannel[];
  title?: string;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  async function onCopy(addr: string) {
    if (await copyText(addr)) {
      setCopied(addr);
      setTimeout(() => setCopied(null), 1600);
    }
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</p>
      <ul className="mt-2 space-y-1.5">
        {channels.map((c, i) => (
          <li key={i} className="flex items-center gap-2 rounded-lg border bg-surface px-2.5 py-1.5">
            <span className="w-[4.5rem] shrink-0 text-sm font-semibold">{c.chain}</span>
            <code className="min-w-0 flex-1 truncate font-mono text-xs text-muted" title={c.address}>
              {short(c.address)}
            </code>
            <button
              type="button"
              onClick={() => onCopy(c.address)}
              aria-label={`Copiar dirección de ${c.chain}`}
              className="shrink-0 rounded-md border px-2 py-1 text-xs font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {copied === c.address ? "✓" : "Copiar"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
