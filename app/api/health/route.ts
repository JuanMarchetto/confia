export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    ok: true,
    service: "confia",
    ts: new Date().toISOString(),
    rpcConfigured: !!(process.env.HELIUS_RPC_URL || process.env.SOLANA_RPC_URL),
    telegramConfigured: !!process.env.TELEGRAM_BOT_TOKEN,
  });
}
