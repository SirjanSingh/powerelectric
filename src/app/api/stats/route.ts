import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { eventStore, aggregate } from "@/lib/analytics-store";

/** Constant-time string compare that also tolerates length mismatch. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Owner-only. Gated by a shared key in ADMIN_KEY (set it in .env.local).
 * This is a stopgap: the roadmap replaces it with Cognito auth when the AWS
 * backend lands. Until then, if ADMIN_KEY is unset the endpoint stays closed
 * rather than defaulting open.
 */
export async function GET(req: Request) {
  const expected = process.env.ADMIN_KEY;
  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_KEY is not configured on the server." },
      { status: 503 },
    );
  }

  // Header only — never accept the key in the query string, where it would
  // leak into access logs, Referer headers, and browser history.
  const key = req.headers.get("x-admin-key") ?? "";

  if (!safeEqual(key, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = aggregate(await eventStore.readAll());
  return NextResponse.json(stats);
}
