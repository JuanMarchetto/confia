import Link from "next/link";
import Verifier from "@/components/Verifier";
import DonationList from "@/components/DonationList";
import { OFFICIAL_CHANNELS } from "@/lib/knowledge/official";
import { DONATION_CHANNELS } from "@/lib/knowledge/verified-wallets";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>
      {/* Emergency strip */}
      <div className="w-full bg-red-600 text-white">
        <div className="mx-auto max-w-3xl px-4 py-2 text-center text-sm font-medium">
          ⚠️ Emergencia real: llama <a href="tel:911" className="font-bold underline">911</a> o{" "}
          <a href="tel:171" className="font-bold underline">171</a>
        </div>
      </div>

      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-brand-ink">Confía</span>
            <span aria-hidden className="text-base">🇻🇪</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/articulos" className="text-sm font-medium text-brand hover:underline">
              Guías
            </Link>
            <span className="rounded-full border px-2.5 py-1 text-xs text-muted">Build4Venezuela</span>
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16">
        {/* Hero */}
        <section className="pt-10 pb-6 text-center sm:pt-14">
          <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Verifica antes de creer.
            <br />
            <span className="text-brand">Verifica antes de donar.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
            Tras el terremoto circulan rumores falsos y estafas de donación. Pega
            cualquier mensaje reenviado o dirección de cripto y Confía te dice si
            es <strong className="text-foreground">real</strong>,{" "}
            <strong className="text-foreground">falso</strong> o una{" "}
            <strong className="text-foreground">estafa</strong>.
          </p>
        </section>

        <Verifier />

        {/* How it works */}
        <section className="mt-14">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted">
            Qué puedes verificar
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Feature
              icon="🚫"
              title="Rumores"
              body="¿“Viene una réplica a las 6pm”? Contrastamos el mensaje con fuentes oficiales y la ciencia."
            />
            <Feature
              icon="🔗"
              title="Wallets de donación"
              body="Pega una dirección de Solana y la analizamos en cadena: antigüedad, historial y señales de estafa."
            />
            <Feature
              icon="🏥"
              title="Recursos"
              body="Refugios, atención médica, cómo donar seguro: siempre por el canal oficial verificado."
            />
          </div>
        </section>

        {/* Why trust */}
        <section className="mt-12 rounded-2xl border bg-surface p-6">
          <h2 className="text-lg font-bold">Cómo funciona y por qué confiar</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/90">
            <li>
              🔍 <strong>Análisis en cadena real.</strong> Para direcciones de Solana
              consultamos la blockchain en vivo (vía Helius) y mostramos las señales
              que sustentan el veredicto. Nunca decimos que una dirección es “100%
              segura”: solo si tiene o no señales de alarma.
            </li>
            <li>
              📚 <strong>Base verificada por humanos.</strong> Los rumores se contrastan
              con instituciones reales (FUNVISIS, Protección Civil, Cruz Roja) y
              consenso científico. Cada respuesta cita su fuente.
            </li>
            <li>
              🤚 <strong>Conservador por diseño.</strong> Si no podemos confirmar algo
              crítico (un refugio, un dato médico), decimos{" "}
              <em>“sin confirmar — consulta el canal oficial”</em> en vez de adivinar.
            </li>
            <li>
              📵 <strong>Sin fricción.</strong> No necesitas app, wallet ni registro.
              Funciona desde el navegador y se comparte por WhatsApp.
            </li>
          </ul>
          <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            Confía da señales de riesgo, no un dictamen definitivo. Ante una
            emergencia real, contacta siempre a las autoridades (911 / 171).
          </p>
        </section>

        {/* Safe donation addresses */}
        <section className="mt-12 rounded-2xl border bg-surface p-6">
          <h2 className="text-lg font-bold">Dona de forma segura 🇻🇪</h2>
          <p className="mt-1 text-sm text-muted">
            Direcciones verificadas para donar al esfuerzo de ayuda. Si te comparten otra
            dirección, pégala arriba y la analizamos en cadena antes de que envíes.
          </p>
          <div className="mt-4">
            <DonationList channels={DONATION_CHANNELS} title="Direcciones verificadas" />
          </div>
        </section>

        {/* Official channels */}
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
            Canales oficiales
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {OFFICIAL_CHANNELS.map((s, i) => (
              <span
                key={i}
                className="rounded-lg border bg-surface px-3 py-1.5 text-sm"
              >
                {s.url ? (
                  <a
                    href={s.url}
                    className="font-medium text-brand"
                    target={s.url.startsWith("tel:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                  >
                    {s.name}
                  </a>
                ) : (
                  <span className="font-medium">{s.name}</span>
                )}
                {s.handle ? <span className="text-muted"> · {s.handle}</span> : null}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-3xl px-4 py-6 text-center text-xs text-muted">
          <p className="mb-2">
            <Link href="/articulos" className="font-medium text-brand hover:underline">
              Guías verificadas
            </Link>{" "}
            · donar seguro, bulos, emergencia
          </p>
          <p>
            Hecho con solidaridad para{" "}
            <a
              href="https://build4venezuela.com/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand"
            >
              Build4Venezuela
            </a>{" "}
            🇻🇪 — la tecnología también es una forma de solidaridad.
          </p>
          <p className="mt-1">
            Confía no almacena lo que verificas. Verifica antes de creer, verifica
            antes de donar.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border bg-surface p-4">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-2 font-bold">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
