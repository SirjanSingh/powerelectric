"use client";

/**
 * Client-side conversion tracking.
 *
 * The site has exactly one job: move buyers into WhatsApp. This module records
 * page views and every WhatsApp CTA click so the owner can see a real
 * conversion ratio (clicks / visits) per CTA and per product.
 *
 * Privacy: no PII. A visitor is an anonymous random id in a first-party cookie.
 * City is only recorded when the buyer typed it into a quote form themselves.
 */

export type TrackEventType = "page_view" | "whatsapp_click";

/** Where the click happened. Keep these stable — the dashboard groups by them. */
export type CtaSource =
  | "hero"
  | "header"
  | "floating"
  | "featured_product"
  | "product_card"
  | "category_card"
  | "contact_form"
  | "contact_strip"
  | "configurator"
  | "footer"
  | "other";

export interface TrackPayload {
  type: TrackEventType;
  cta?: CtaSource;
  /** Product id or configured model name, when the click is product-specific. */
  product?: string;
  /** e.g. "Fleet Blue · LFP · qty 25" — free-form, for context in the dashboard. */
  variant?: string;
  city?: string;
  page: string;
  visitorId: string;
}

const COOKIE = "pe_vid";
const ONE_YEAR = 60 * 60 * 24 * 365;

function getVisitorId(): string {
  if (typeof document === "undefined") return "ssr";
  const hit = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE}=`));
  if (hit) return hit.slice(COOKIE.length + 1);

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);

  document.cookie = `${COOKIE}=${id}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
  return id;
}

/**
 * Fire-and-forget. Uses sendBeacon because a WhatsApp CTA immediately opens a
 * new tab / navigates away — a normal fetch would be cancelled mid-flight and
 * the click would go unrecorded.
 */
export function trackEvent(
  input: Omit<TrackPayload, "visitorId" | "page"> & { page?: string },
): void {
  if (typeof window === "undefined") return;

  const payload: TrackPayload = {
    ...input,
    page: input.page ?? window.location.pathname,
    visitorId: getVisitorId(),
  };

  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      void fetch("/api/track", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      });
    }
  } catch {
    // Analytics must never break a sale. Swallow.
  }
}

/** Convenience wrapper for the thing we actually care about. */
export function trackWhatsAppClick(
  cta: CtaSource,
  extra?: { product?: string; variant?: string; city?: string },
): void {
  trackEvent({ type: "whatsapp_click", cta, ...extra });
}
