"use client";

import { useEffect } from "react";
import Link from "next/link";
import { genericEnquiryUrl } from "@/lib/whatsapp";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Products page failed to render:", error);
  }, [error]);

  return (
    <div
      className="pt-24 pb-20 flex items-center justify-center"
      style={{ background: "var(--color-bg)", minHeight: "100vh" }}
    >
      <div className="container text-center" style={{ maxWidth: 480, margin: "0 auto" }}>
        <p className="section-label mb-2">Something Went Wrong</p>
        <h1 className="section-title" style={{ fontSize: "2rem" }}>
          Catalog Unavailable
        </h1>
        <p
          className="mt-3 mb-8"
          style={{
            fontFamily: "var(--font-body, 'Barlow'), sans-serif",
            fontSize: "0.95rem",
            color: "var(--color-muted-2)",
            lineHeight: 1.65,
          }}
        >
          We couldn&apos;t load the product catalog. You can try again, or ask us
          for stock and pricing directly on WhatsApp.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try Again
          </button>
          <a
            href={genericEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn wa-btn"
          >
            WhatsApp Us
          </a>
          <Link href="/" className="btn btn-outline">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
