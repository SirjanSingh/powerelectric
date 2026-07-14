import { NextResponse } from "next/server";
import { eventStore, aggregate } from "@/lib/analytics-store";

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

  const key =
    new URL(req.url).searchParams.get("key") ??
    req.headers.get("x-admin-key") ??
    "";

  if (key !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = aggregate(await eventStore.readAll());
  return NextResponse.json(stats);
}
