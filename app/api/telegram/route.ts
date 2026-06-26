import type { NextRequest } from "next/server";
import { getVerdict } from "@/lib/verdict";
import { formatVerdictText, TG_HELP, TG_WELCOME } from "@/lib/format";
import { rateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

interface TgMessage {
  text?: string;
  chat?: { id?: number };
}
interface TgUpdate {
  message?: TgMessage;
  edited_message?: TgMessage;
}

async function sendMessage(chatId: number, text: string, markdown = false): Promise<void> {
  const body: Record<string, unknown> = {
    chat_id: chatId,
    text,
    disable_web_page_preview: true,
  };
  if (markdown) body.parse_mode = "Markdown";
  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) console.error(`telegram sendMessage failed: ${res.status} ${await res.text()}`);
  } catch (e) {
    console.error("telegram sendMessage error", e);
  }
}

export async function POST(req: NextRequest) {
  if (!TOKEN) return Response.json({ ok: false, error: "bot not configured" }, { status: 503 });

  // Fail CLOSED: in production a webhook with no secret would let anyone forge updates
  // (burning RPC quota / sending messages). Require the secret in production.
  if (process.env.NODE_ENV === "production" && !WEBHOOK_SECRET) {
    return new Response("forbidden", { status: 403 });
  }
  if (WEBHOOK_SECRET && req.headers.get("x-telegram-bot-api-secret-token") !== WEBHOOK_SECRET) {
    return new Response("forbidden", { status: 403 });
  }

  const update = (await req.json().catch(() => null)) as TgUpdate | null;
  const msg = update?.message ?? update?.edited_message;
  const chatId = msg?.chat?.id;
  const text = (msg?.text ?? "").trim();

  if (typeof chatId !== "number") return Response.json({ ok: true });

  // per-chat debounce
  if (!rateLimit(`tg:${chatId}`, 20, 60_000).ok) {
    await sendMessage(chatId, "Vas muy rápido 🙏. Espera un momento e intenta de nuevo.");
    return Response.json({ ok: true });
  }

  if (!text || /^\/start\b/.test(text)) {
    await sendMessage(chatId, TG_WELCOME, true);
  } else if (/^\//.test(text)) {
    await sendMessage(chatId, TG_HELP, true);
  } else {
    try {
      const verdict = await getVerdict(text);
      await sendMessage(chatId, formatVerdictText(verdict)); // plain text
    } catch {
      await sendMessage(chatId, "No pude procesar eso ahora. Ante una emergencia real llama al 911 o 171.");
    }
  }

  return Response.json({ ok: true });
}
