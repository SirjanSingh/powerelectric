"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { genericEnquiryUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

const specs = [
  { label: "Min. Order", value: "5 UNITS" },
  { label: "Battery", value: "LFP / NMC" },
  { label: "Billing", value: "GST READY" },
  { label: "Dispatch", value: "PAN INDIA" },
];

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    // stagger entrance
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const onMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      imageRef.current.style.transform = `translate(${dx * 8}px, ${dy * 6}px)`;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [reducedMotion]);

  return (
    <section
      className="hero-root relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* ── Grain texture overlay ── */}
      <div className="hero-grain" aria-hidden="true" />

      {/* ── Amber grid lines (decorative) ── */}
      <div className="hero-grid" aria-hidden="true" />

      {/* ── Accent glow behind image ── */}
      <div className="hero-glow" aria-hidden="true" />

      <div className="container relative z-10 flex flex-col lg:grid lg:grid-cols-[1fr_auto] lg:gap-0 items-start lg:items-center py-12 lg:py-0">

        {/* ════ LEFT: Copy block ════ */}
        <div
          className="hero-copy max-w-[640px]"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(18px)",
            transition: reducedMotion
              ? "none"
              : "opacity 0.55s ease, transform 0.55s ease",
          }}
        >
          {/* Overline — tab-style label */}
          <div className="hero-overline">
            <span className="hero-overline-dot" aria-hidden="true" />
            <span>Bulk EV Supply &mdash; Fleets · Dealers · Institutions</span>
          </div>

          {/* Main headline */}
          <h1 className="hero-h1">
            <span className="hero-h1-line">Electric</span>
            <span className="hero-h1-line hero-h1-accent">Vehicles</span>
            <span className="hero-h1-line hero-h1-sub">At Scale.</span>
          </h1>

          {/* Body */}
          <p className="hero-body">
            {siteConfig.businessName} supplies electric scooters, LFP/NMC
            battery packs, chargers &amp; parts for high-volume buyers — with
            GST invoicing, verified stock, and rapid pan-India dispatch.
          </p>

          {/* Spec rail */}
          <div className="hero-specs" role="list">
            {specs.map(({ label, value }) => (
              <div key={label} className="hero-spec-item" role="listitem">
                <span className="hero-spec-label">{label}</span>
                <span className="hero-spec-value">{value}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero-ctas">
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
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* ════ RIGHT: Image block ════ */}
        <div
          className="hero-image-wrap"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateX(24px)",
            transition: reducedMotion
              ? "none"
              : "opacity 0.65s 0.1s ease, transform 0.65s 0.1s ease",
          }}
        >
          {/* vertical rule — structural divider on desktop */}
          <div className="hero-vline" aria-hidden="true" />

          <div
            ref={imageRef}
            className="hero-image-inner"
            style={{ transition: reducedMotion ? "none" : "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)" }}
          >
            {/* amber corner markers */}
            <span className="hero-corner hero-corner-tl" aria-hidden="true" />
            <span className="hero-corner hero-corner-tr" aria-hidden="true" />
            <span className="hero-corner hero-corner-bl" aria-hidden="true" />
            <span className="hero-corner hero-corner-br" aria-hidden="true" />

            <Image
              src="/assets/scootyimg.png"
              alt="Premium electric scooter — bulk fleet orders"
              width={520}
              height={390}
              priority
              className="hero-img"
              style={{ height: "auto" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            {/* fallback */}
            <div className="hero-img-fallback" aria-hidden="true">
              <span style={{ fontSize: "4rem" }}>⚡</span>
              <span className="hero-img-fallback-label">scootyimg.png</span>
            </div>

            {/* floating tag: model callout */}
            <div className="hero-tag" aria-hidden="true">
              <span className="hero-tag-dot" />
              <span className="hero-tag-text">E-Scooter · Fleet Grade</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom border rule ── */}
      <div className="hero-bottom-rule" aria-hidden="true" />
    </section>
  );
}
