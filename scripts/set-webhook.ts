// Register (or update) the Telegram webhook for Confía.
//
// Usage:
//   TELEGRAM_BOT_TOKEN=123:abc \
//   CONFIA_PUBLIC_URL=https://your-domain \
//   [TELEGRAM_WEBHOOK_SECRET=somesecret] \
//   bun run scripts/set-webhook.ts

const token = process.env.TELEGRAM_BOT_TOKEN;
const base = process.env.CONFIA_PUBLIC_URL;
const secret = process.env.TELEGRAM_WEBHOOK_SECRET;

if (!token || !base) {
  console.error("Missing TELEGRAM_BOT_TOKEN and/or CONFIA_PUBLIC_URL");
  process.exit(1);
}

const url = `${base.replace(/\/$/, "")}/api/telegram`;
const body: Record<string, unknown> = {
  url,
  allowed_updates: ["message", "edited_message"],
  drop_pending_updates: true,
};
if (secret) body.secret_token = secret;

const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

const json = await res.json();
console.log(`setWebhook → ${url}`);
console.log(json);
if (!res.ok || !(json as { ok?: boolean }).ok) process.exit(1);

export {};
