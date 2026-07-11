"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MessageCircle, ChevronRight } from "lucide-react";
import { genericEnquiryUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

// Load Three.js canvas client-side only
const HeroCanvas = dynamic(
  () => import("@/components/shared/HeroCanvas"),
  { ssr: false }
);

const specs = [
  { label: "Min. Order", value: "5 UNITS" },
  { label: "Battery",    value: "LFP / NMC" },
  { label: "Billing",    value: "GST READY" },
  { label: "Dispatch",   value: "PAN INDIA" },
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fadeIn = (delay = 0) =>
    reducedMotion
      ? {}
      : {
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(20px)",
          transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
        };

  return (
    <section
      className="hero-root relative overflow-hidden"
      style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center" }}
      aria-label="Hero"
    >
      {/* ── Three.js particle background ── */}
      <HeroCanvas />

      {/* ── Gradient vignette: left side for readability ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 90% at 25% 50%, color-mix(in srgb, var(--color-surface-alt) 94%, transparent) 0%, color-mix(in srgb, var(--color-surface-alt) 70%, transparent) 55%, color-mix(in srgb, var(--color-surface-alt) 20%, transparent) 80%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Decorative grain ── */}
      <div className="hero-grain" aria-hidden="true" style={{ zIndex: 1 }} />

      {/* ── Blue glow behind image ── */}
      <div className="hero-glow" aria-hidden="true" style={{ zIndex: 1 }} />

      {/* ── Content ── */}
      <div
        className="container relative"
        style={{
          zIndex: 2,
          paddingTop: 80,
          paddingBottom: 64,
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] lg:items-center gap-0">

          {/* ════ LEFT COPY ════ */}
          <div className="max-w-[620px]" style={fadeIn(0)}>

            {/* Overline */}
            <div className="hero-overline">
              <span className="hero-overline-dot" aria-hidden="true" />
              <span>Bulk EV Supply &mdash; Fleets · Dealers · Institutions</span>
            </div>

            {/* Headline */}
            <h1 className="hero-h1">
              <span className="hero-h1-line">Electric</span>
              <span className="hero-h1-line hero-h1-accent">Vehicles</span>
              <span className="hero-h1-line hero-h1-sub">At Scale.</span>
            </h1>

            {/* Body */}
            <p className="hero-body" style={fadeIn(0.15)}>
              {siteConfig.businessName} supplies electric scooters, LFP/NMC
              battery packs, chargers &amp; parts for high-volume buyers — with
              GST invoicing, verified stock, and rapid pan-India dispatch.
            </p>

            {/* Spec rail */}
            <div className="hero-specs" role="list" style={fadeIn(0.22)}>
              {specs.map(({ label, value }) => (
                <div key={label} className="hero-spec-item" role="listitem">
                  <span className="hero-spec-label">{label}</span>
                  <span className="hero-spec-value">{value}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-ctas" style={fadeIn(0.3)}>
              <a
                href={genericEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-primary"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp for Quote
              </a>
              <Link href="/products" className="hero-btn-ghost">
                Browse Products
                <ChevronRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* ════ RIGHT IMAGE ════ */}
          <div
            className="hero-image-wrap"
            style={{
              ...fadeIn(0.18),
              transitionProperty: "opacity, transform",
            }}
          >
            <div className="hero-vline" aria-hidden="true" />
            <div className="hero-image-inner">
              {/* Corner markers */}
              <span className="hero-corner hero-corner-tl" aria-hidden="true" />
              <span className="hero-corner hero-corner-tr" aria-hidden="true" />
              <span className="hero-corner hero-corner-bl" aria-hidden="true" />
              <span className="hero-corner hero-corner-br" aria-hidden="true" />

              <Image
                src="/assets/scootyimg.png"
                alt="Premium electric scooter for bulk fleet orders"
                width={520}
                height={390}
                priority
                className="hero-img"
                style={{ height: "auto" }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />

              {/* Fallback */}
              <div className="hero-img-fallback" aria-hidden="true">
                <span style={{ fontSize: "4rem" }}>⚡</span>
                <span className="hero-img-fallback-label">scootyimg.png</span>
              </div>

              {/* Floating tag */}
              <div className="hero-tag" aria-hidden="true">
                <span className="hero-tag-dot" />
                <span className="hero-tag-text">E-Scooter · Fleet Grade</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom rule ── */}
      <div className="hero-bottom-rule" aria-hidden="true" />
    </section>
  );
}
