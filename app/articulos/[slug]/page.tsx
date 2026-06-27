import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticle, SITE_URL, type Article } from "@/lib/articles";
import type { ReactNode } from "react";

type Params = { slug: string };

/** Minimal inline renderer for [text](url) links and **bold** in article prose. */
function renderRich(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      const label = m[1];
      let url = m[2];
      // agents emit bare slugs ("/donar-..."); route them under /articulos
      if (url.startsWith("/") && getArticle(url.slice(1))) url = `/articulos/${url.slice(1)}`;
      nodes.push(
        url.startsWith("/") ? (
          <Link key={key++} href={url} className="text-brand hover:underline">{label}</Link>
        ) : (
          <a key={key++} href={url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">{label}</a>
        ),
      );
    } else if (m[3] !== undefined) {
      nodes.push(<strong key={key++}>{m[3]}</strong>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function generateStaticParams(): Params[] {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const url = `${SITE_URL}/articulos/${a.slug}`;
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    keywords: a.keywords,
    alternates: { canonical: `/articulos/${a.slug}` },
    openGraph: { title: a.metaTitle, description: a.metaDescription, type: "article", url },
    twitter: { card: "summary_large_image", title: a.metaTitle, description: a.metaDescription },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const url = `${SITE_URL}/articulos/${a.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title,
      description: a.metaDescription,
      inLanguage: "es",
      dateModified: a.updatedAt,
      datePublished: a.updatedAt,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "Confía" },
      publisher: { "@type": "Organization", name: "Confía" },
    },
    a.faq.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: a.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Guías", item: `${SITE_URL}/articulos` },
        { "@type": "ListItem", position: 3, name: a.title, item: url },
      ],
    },
  ].filter(Boolean);

  return (
    <div className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        // JSON-LD from our own QA'd content; escape "<" so no string can break out of the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-brand-ink">Confía</span>
            <span aria-hidden className="text-base">🇻🇪</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-brand">🛡️ Verificar</Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <nav className="text-xs text-muted">
          <Link href="/articulos" className="hover:text-brand">Guías</Link> <span aria-hidden>/</span>{" "}
          <span>{a.title}</span>
        </nav>

        <article className="mt-3">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight">{a.title}</h1>
          <p className="mt-2 text-sm text-muted">{a.readingMinutes} min de lectura</p>
          <p className="mt-4 text-[17px] leading-relaxed text-foreground/90">{renderRich(a.excerpt)}</p>

          {a.sections.map((s, i) => (
            <section key={i} className="mt-7">
              <h2 className="text-xl font-bold leading-snug">{s.heading}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j} className="mt-2 text-[15px] leading-relaxed text-foreground/90">{renderRich(p)}</p>
              ))}
            </section>
          ))}

          {/* CTA */}
          <div className="mt-9 rounded-2xl border border-brand/30 bg-brand/5 p-5">
            <p className="text-[15px] font-medium">{renderRich(a.cta)}</p>
            <Link href="/" className="mt-3 inline-flex rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white">
              🛡️ Verificar ahora
            </Link>
          </div>

          {a.faq.length > 0 && (
            <section className="mt-9">
              <h2 className="text-xl font-bold">Preguntas frecuentes</h2>
              <div className="mt-3 space-y-2">
                {a.faq.map((f, i) => (
                  <details key={i} className="rounded-xl border bg-surface p-4">
                    <summary className="cursor-pointer font-semibold">{f.q}</summary>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{renderRich(f.a)}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {a.sources.length > 0 && (
            <section className="mt-9">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Fuentes</h2>
              <ul className="mt-2 space-y-1 text-sm">
                {a.sources.map((src, i) => (
                  <li key={i}>
                    {src.url ? (
                      <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                        {src.name}
                      </a>
                    ) : (
                      src.name
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {(() => {
          const related = (a.related ?? [])
            .map((s) => getArticle(s))
            .filter((x): x is Article => !!x);
          if (!related.length) return null;
          return (
            <section className="mt-9">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Sigue leyendo</h2>
              <ul className="mt-2 space-y-1.5">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/articulos/${r.slug}`} className="text-brand hover:underline">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })()}

        <div className="mt-10 border-t pt-6">
          <Link href="/articulos" className="text-sm text-brand hover:underline">← Todas las guías</Link>
        </div>
      </main>
    </div>
  );
}
