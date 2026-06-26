# Confía 🇻🇪

**Verifica antes de creer. Verifica antes de donar.**

A zero-onboarding verifier for the Venezuela earthquake. Paste any forwarded message
or crypto donation address and Confía tells you if it's **VERIFICADO**, **FALSO**, or
a **SIN CONFIRMAR** — and runs **live on-chain forensics** on donation wallets to expose
scams before you send a single bolívar.

Built for [Build4Venezuela](https://build4venezuela.com/en).

## The non-obvious angle

At a Solana hackathon, every team builds a rail to **move crypto _to_ victims** (donate
buttons, escrow, payouts). Confía builds the rail that **inspects crypto to protect people
_from_** the donation scams those rails amplify — the single most crypto-shaped harm of a
disaster in a high-USDT-adoption country with a large, scam-targeted diaspora.

It needs no app, no wallet, no login. It works from a browser on a basic phone, and it
spreads the way Venezuelans actually coordinate: by forwarding a link in WhatsApp.

## What it does

One box, paste anything. The engine auto-detects the input:

- **Crypto address / donation link** → live on-chain forensics (account age, history,
  balance, activity) → 🔴 / 🟡 / 🟢 risk verdict with the reasons. Deep inspection for
  **Solana**; honest "can't deep-verify here" caution for ETH/Tron/BTC. We **never** say an
  address is "100% safe" — only whether it shows alarm signals.
- **Forwarded rumor** → matched against a human-curated Spanish knowledge base grounded in
  real institutions (FUNVISIS, Protección Civil, Cruz Roja) and scientific consensus →
  VERIFICADO / FALSO / SIN CONFIRMAR with the source.
- **Resource question** ("¿refugio más cercano?") → routed to verified official channels.
  We **never** invent shelter/medical specifics; when unsure we say "consulta el canal
  oficial."

Every verdict has a one-tap **Compartir por WhatsApp**.

## Three surfaces, one engine

- **Web** (`/`) — the viral, no-install, WhatsApp-shareable hero.
- **API** (`POST /api/verify`) — `{ "input": "..." }` → a typed `Verdict`.
- **Telegram bot** (`POST /api/telegram`) — forward-to-verify, same engine.

## Run locally

```bash
bun install
cp .env.example .env.local   # works out of the box on public Solana RPC
bun run dev
```

Open http://localhost:3000.

### Environment

| Var | Purpose |
|-----|---------|
| `SOLANA_RPC_URL` / `HELIUS_RPC_URL` | RPC for on-chain forensics. Falls back to public mainnet RPC; a Helius key gives richer/faster data. |
| `CONFIA_PUBLIC_URL` | Public URL for share text / social previews. |
| `TELEGRAM_BOT_TOKEN` | Optional — enables the Telegram surface. |
| `TELEGRAM_WEBHOOK_SECRET` | Optional — validates Telegram webhook calls. |
| `CONFIA_SCAM_LIST` | Optional — comma-separated known-scam addresses to hard-flag. |

## Deploy (Vercel)

```bash
bun run build      # verify
vercel             # first deploy (prompts for login/project)
vercel --prod
```

Set `SOLANA_RPC_URL` (and optionally `HELIUS_RPC_URL`, Telegram vars) in the Vercel
project env. To enable Telegram after deploy:

```bash
TELEGRAM_BOT_TOKEN=... CONFIA_PUBLIC_URL=https://your-domain bun run scripts/set-webhook.ts
```

## Architecture

```
lib/
  forensics.ts          on-chain wallet analysis (multi-RPC fallback, multi-chain detect)
  knowledge/
    rumors.ts           curated rumor → verdict matchers (Spanish, sourced)
    resources.ts        resource intents → official channels
    official.ts         canonical official channels
  classify.ts           routes input → wallet | rumor | resource | general
  verdict.ts            orchestrator → typed Verdict
  format.ts             Verdict → text (Telegram / share)
  types.ts              shared contract
app/
  page.tsx              landing + verifier
  api/verify            JSON engine
  api/telegram          Telegram webhook
  api/health            health check
components/
  Verifier.tsx          the paste box + examples
  VerdictCard.tsx       color-coded result + share
```

## Design principles

1. **Conservative by default.** Never assert "safe"; never guess on safety-critical
   questions. A wrong "all clear" is worse than "no puedo confirmar."
2. **Works under crisis conditions.** Spanish-first, mobile-first, no account, degrades
   gracefully when an RPC or source is unavailable.
3. **Transparent.** Every verdict cites its sources and always shows official channels.

> Confía gives risk signals, not a definitive ruling. For a real emergency, call **911 / 171**.
