// Minimal in-memory sliding-window rate limiter.
// NOTE: on serverless this is per-instance (best-effort), not a global guarantee.
// For hard global limits use a shared store (e.g. Upstash). Good enough to blunt abuse.

interface Hit {
  count: number;
  reset: number;
}

const store = new Map<string, Hit>();
let lastSweep = 0;

export interface RateResult {
  ok: boolean;
  remaining: number;
  reset: number;
}

export function rateLimit(key: string, limit = 30, windowMs = 60_000): RateResult {
  const now = Date.now();

  // opportunistic cleanup so the map can't grow unbounded
  if (now - lastSweep > windowMs) {
    for (const [k, h] of store) if (now > h.reset) store.delete(k);
    lastSweep = now;
  }

  const hit = store.get(key);
  if (!hit || now > hit.reset) {
    store.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1, reset: now + windowMs };
  }

  hit.count += 1;
  if (hit.count > limit) return { ok: false, remaining: 0, reset: hit.reset };
  return { ok: true, remaining: limit - hit.count, reset: hit.reset };
}

/** Best-effort client IP from common proxy headers. */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "anon";
}
