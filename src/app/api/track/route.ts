import { NextResponse } from "next/server";
import { eventStore, type StoredEvent } from "@/lib/analytics-store";

// fs-backed store — must not run on the Edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TYPES = new Set(["page_view", "whatsapp_click"]);

/** Trim free-form strings so a malformed client can't bloat the log. */
const clamp = (v: unknown, max = 120): string | undefined =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!TYPES.has(body?.type)) {
      return NextResponse.json({ ok: false, error: "bad type" }, { status: 400 });
    }

    const now = new Date();
    const event: StoredEvent = {
      day: now.toISOString().slice(0, 10),
      ts: now.getTime(),
      type: body.type,
      cta: clamp(body.cta, 40),
      product: clamp(body.product, 80),
      variant: clamp(body.variant),
      city: clamp(body.city, 60),
      page: clamp(body.page, 120) ?? "/",
      visitorId: clamp(body.visitorId, 64) ?? "anon",
    };

    await eventStore.append(event);

    // sendBeacon ignores the body; 204 keeps it cheap.
    return new NextResponse(null, { status: 204 });
  } catch {
    // Never surface analytics failures to a buyer mid-click.
    return new NextResponse(null, { status: 204 });
  }
}
