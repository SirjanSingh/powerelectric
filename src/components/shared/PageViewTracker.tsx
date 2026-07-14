"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

/**
 * Records one page_view per route change. Mounted once in the root layout.
 * Visits are the denominator of the conversion ratio, so this must fire on
 * every page — including client-side navigations, which is why it watches
 * `usePathname()` rather than firing only on first mount.
 */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't count the owner's own dashboard as buyer traffic.
    if (pathname?.startsWith("/admin")) return;
    trackEvent({ type: "page_view", page: pathname });
  }, [pathname]);

  return null;
}
