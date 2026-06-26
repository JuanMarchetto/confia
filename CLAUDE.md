@AGENTS.md

# Confía — project guide

A zero-onboarding verifier for the Venezuela earthquake (Build4Venezuela hackathon).
Paste a forwarded message or crypto address → VERIFICADO / FALSO / SIN CONFIRMAR, with
**live on-chain forensics** on donation wallets. Next.js 16 + React 19 + Tailwind v4, Bun.

## Architecture (one engine, three surfaces)

- `lib/verdict.ts` is the orchestrator: `classify()` → `forensics` (wallets) or `knowledge`
  (rumors/resources) → a typed `Verdict`.
- Surfaces are thin: `app/page.tsx` (web), `app/api/verify` (JSON), `app/api/telegram` (bot).
  All call `getVerdict()`. Don't duplicate logic in a surface — put it in `lib/`.

## Non-negotiable design rules

1. **Never assert an address is "safe."** Best case is 🟢 "sin señales de alarma" + a caveat.
2. **Never guess on safety-critical questions** (shelter, medical). Default to SIN CONFIRMAR
   + "consulta el canal oficial."
3. **Every verdict cites sources and shows official channels.** Conservatism is the product.
4. Spanish-first, mobile-first, works offline-ish (graceful RPC/source degradation).

## Conventions

- Knowledge lives in `lib/knowledge/*.ts` as data (rumors, resources, official channels).
  Add rumors there, not in code paths. Keep rebuttals factually grounded + sourced.
- Forensics uses raw JSON-RPC with multi-endpoint fallback (no heavy SDK). `HELIUS_RPC_URL`
  preferred, falls back to public mainnet RPC.
- Run: `bun run dev`. Verify: `bun run build`. Deploy: Vercel.
