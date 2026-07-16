"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { MessageCircle, ChevronRight } from "lucide-react";
import { genericEnquiryUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import { SceneErrorBoundary } from "@/components/three/SceneErrorBoundary";
import { canRender3D } from "@/components/three/capabilities";
import { trackWhatsAppClick } from "@/lib/analytics";

// Load the R3F hero scene (particles + interactive scooter) client-side
// only — it touches WebGL/window and must never run during SSR.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

// useSyncExternalStore needs a subscribe fn; capability never changes at
// runtime, so this is an inert no-op subscription.
const emptySubscribe = () => () => {};

const specs = [
  { label: "Min. Order", value: "5 UNITS" },
  { label: "Battery",    value: "LFP / NMC" },
  { label: "Billing",    value: "GST READY" },
  { label: "Dispatch",   value: "PAN INDIA" },
];

export default function Hero() {
  // Flipped true once the scooter GLB has actually rendered a frame (via
  // HeroScene's onReady), at which point the loader is removed to reveal the
  // live canvas behind it.
  const [sceneReady, setSceneReady] = useState(false);

  // Read 3D capability without a hydration mismatch or a setState-in-effect:
  // the server and first hydration paint both report "loading" (→ neutral
  // loader); the client then resolves to "yes" (loader stays until the scene
  // is ready) or "no" (static-photo fallback for reduced-motion / no WebGL).
  // Capable visitors therefore never see the photo — no photo→3D flash.
  const renderMode = useSyncExternalStore(
    emptySubscribe,
    () => (canRender3D() ? "yes" : "no"),
    () => "loading",
  );
  const showStaticFallback = renderMode === "no";
  const showLoader = renderMode !== "no" && !sceneReady;

  return (
    <section
      className="hero-root relative overflow-hidden"
      style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center" }}
      aria-label="Hero"
    >
      {/* ── R3F particle field + interactive scooter ── */}
      <div className="hero-canvas-wrap" aria-hidden="true">
        {/* onError un-fades the static image: a scene can crash AFTER its
            first frame (e.g. an in-scene asset fails to load once the
            canvas is already live), and the photo must come back rather
            than leave a blank hole where the canvas was. */}
        <SceneErrorBoundary onError={() => setSceneReady(false)}>
          <HeroScene onReady={() => setSceneReady(true)} />
        </SceneErrorBoundary>
      </div>

      {/* ── Gradient vignette: left side for readability ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 52% 100% at 20% 50%, color-mix(in srgb, var(--color-surface-alt) 94%, transparent) 0%, color-mix(in srgb, var(--color-surface-alt) 78%, transparent) 45%, color-mix(in srgb, var(--color-surface-alt) 24%, transparent) 72%, transparent 92%)",
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
          <div className="max-w-[620px] hero-fade-in">

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
            <p className="hero-body hero-fade-in" style={{ animationDelay: "0.15s" }}>
              {siteConfig.businessName} supplies electric scooters, LFP/NMC
              battery packs, chargers &amp; parts for high-volume buyers —
              from single-fleet lots to full-container bulk orders, with GST
              invoicing, verified stock, and rapid pan-India dispatch.
            </p>

            {/* Spec rail */}
            <div
              className="hero-specs hero-fade-in"
              role="list"
              style={{ animationDelay: "0.22s" }}
            >
              {specs.map(({ label, value }) => (
                <div key={label} className="hero-spec-item" role="listitem">
                  <span className="hero-spec-label">{label}</span>
                  <span className="hero-spec-value">{value}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-ctas hero-fade-in" style={{ animationDelay: "0.3s" }}>
              <a
                href={genericEnquiryUrl()}
                onClick={() => trackWhatsAppClick("hero")}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-primary"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp for Quote
              </a>
              <Link href="/configure" className="hero-btn-ghost">
                Configure &amp; Get Quote
                <ChevronRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* ════ RIGHT VISUAL: static image fallback + live 3D scooter ════ */}
          <div
            className="hero-image-wrap hero-fade-in"
            style={{ animationDelay: "0.18s" }}
          >
            <div className="hero-vline" aria-hidden="true" />
            <div className="hero-image-inner">
              {/* Corner markers — kept as an overlay frame around the 3D
                  visual so the industrial identity survives the switch
                  from static photo to canvas. */}
              <span className="hero-corner hero-corner-tl" aria-hidden="true" />
              <span className="hero-corner hero-corner-tr" aria-hidden="true" />
              <span className="hero-corner hero-corner-bl" aria-hidden="true" />
              <span className="hero-corner hero-corner-br" aria-hidden="true" />

              {/* Permanent static fallback — ONLY for reduced-motion / no-WebGL,
                  where the 3D canvas never mounts. No longer shown during normal
                  loading (that's the loader below), so there's no photo→3D flash. */}
              {showStaticFallback && (
                <Image
                  src="/assets/scootyimg.png"
                  alt="Electric scooter for bulk fleet orders"
                  width={520}
                  height={390}
                  priority
                  className="hero-img"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              )}

              {/* Neutral loader while the 3D scene loads — replaces the old
                  static-photo flash. Removed once the scooter has drawn its
                  first frame, revealing the live canvas behind it. */}
              {showLoader && (
                <div className="hero-loader" aria-hidden="true">
                  <span className="hero-loader-spinner" />
                  <span className="hero-loader-label">Loading 3D preview…</span>
                </div>
              )}

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
