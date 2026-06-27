import type { NextRequest } from "next/server";
import { getVerdict } from "@/lib/verdict";
import type { VerifyResponse } from "@/lib/types";
import { clientIp, rateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_LEN = 4000;

export async function POST(req: NextRequest) {
  try {
    const { ok: allowed } = rateLimit(`verify:${clientIp(req)}`, 30, 60_000);
    if (!allowed) {
      return Response.json(
        { ok: false, error: "Demasiadas solicitudes. Espera un momento." } satisfies VerifyResponse,
        { status: 429 },
      );
    }

    const body = (await req.json().catch(() => null)) as { input?: unknown } | null;
    const input = typeof body?.input === "string" ? body.input : "";
    if (!input.trim()) {
      return Response.json({ ok: false, error: "Pega un mensaje o dirección." } satisfies VerifyResponse, { status: 400 });
    }
    if (input.length > MAX_LEN) {
      return Response.json({ ok: false, error: "El texto es demasiado largo." } satisfies VerifyResponse, { status: 400 });
    }
    const verdict = await getVerdict(input, { clientId: clientIp(req) });
    return Response.json({ ok: true, verdict } satisfies VerifyResponse);
  } catch {
    return Response.json({ ok: false, error: "No pudimos procesar la verificación. Intenta de nuevo." } satisfies VerifyResponse, { status: 500 });
  }
}
