import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Guías: donar seguro, bulos y emergencia — Confía 🇻🇪",
  description:
    "Guías verificadas para el terremoto en Venezuela: cómo donar sin estafas, detectar bulos y noticias falsas, verificar wallets de cripto y canales oficiales de emergencia.",
  alternates: { canonical: "/articulos" },
  openGraph: {
    title: "Guías verificadas — Confía 🇻🇪",
    description:
      "Donar seguro, detectar bulos, verificar wallets y canales oficiales tras el terremoto en Venezuela.",
    type: "website",
  },
};

export default function ArticlesIndex() {
  const articles = getAllArticles();
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-brand-ink">Confía</span>
            <span aria-hidden className="text-base">🇻🇪</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-brand">
            🛡️ Verificar
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight">Guías verificadas</h1>
        <p className="mt-2 text-pretty text-muted">
          Información confiable para el terremoto en Venezuela: donar sin caer en estafas,
          detectar bulos, verificar direcciones de cripto y encontrar canales oficiales.
        </p>

        {articles.length === 0 ? (
          <p className="mt-8 text-muted">Próximamente.</p>
        ) : (
          <ul className="mt-8 space-y-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articulos/${a.slug}`}
                  className="block rounded-2xl border bg-surface p-5 transition-colors hover:border-brand"
                >
                  <h2 className="text-lg font-bold leading-snug">{a.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{a.excerpt}</p>
                  <span className="mt-2 inline-block text-xs text-muted">{a.readingMinutes} min de lectura</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 rounded-2xl border border-brand/30 bg-brand/5 p-5 text-center">
          <p className="font-semibold">¿Te llegó un mensaje o una dirección de cripto?</p>
          <p className="mt-1 text-sm text-muted">Verifícalo antes de creer o donar.</p>
          <Link
            href="/"
            className="mt-3 inline-flex rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white"
          >
            🛡️ Abrir el verificador
          </Link>
        </div>
      </main>
    </div>
  );
}
