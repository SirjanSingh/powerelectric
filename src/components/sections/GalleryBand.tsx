"use client";

import type React from "react";
import Image from "next/image";
import Reveal from "@/components/shared/Reveal";

export default function GalleryBand() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "var(--color-bg)" }}>
      {/* subtle blue grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(color-mix(in srgb, var(--color-accent) 3%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 3%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <Reveal>
          <div className="mb-10">
            <p className="section-label mb-2">Fleet Ready</p>
            <h2 className="section-title">Purpose-Built for Commercial Use</h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mx-auto max-w-4xl">
            {/* corner markers */}
            {[
              { style: { top: -8, left: -8, borderTop: "2px solid var(--color-accent)", borderLeft: "2px solid var(--color-accent)" } },
              { style: { top: -8, right: -8, borderTop: "2px solid var(--color-accent)", borderRight: "2px solid var(--color-accent)" } },
              { style: { bottom: -8, left: -8, borderBottom: "2px solid var(--color-accent)", borderLeft: "2px solid var(--color-accent)" } },
              { style: { bottom: -8, right: -8, borderBottom: "2px solid var(--color-accent)", borderRight: "2px solid var(--color-accent)" } },
            ].map((c, i) => (
              <span
                key={i}
                className="absolute w-4 h-4 pointer-events-none z-10"
                style={c.style as React.CSSProperties}
                aria-hidden="true"
              />
            ))}

            <div className="overflow-hidden" style={{ border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)" }}>
              <div
                className="relative h-72 md:h-96 flex items-center justify-center"
                style={{ background: "var(--color-surface-alt-2)" }}
              >
                <Image
                  src="/assets/scooter-lineup.png"
                  alt="Electric scooter lineup for bulk fleet supply"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="z-0 text-center pointer-events-none">
                  <p className="text-5xl mb-3 opacity-30">🛵🛵🛵</p>
                  <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--color-subtle)" }}>
                    scooter-lineup.png
                  </p>
                </div>
              </div>

              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}
              >
                <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-subtle)" }}>
                  Representative models — contact us for OEM sourcing
                </p>
                <span
                  className="flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--color-accent)" }}
                >
                  <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "var(--color-accent)" }} aria-hidden="true" />
                  FLEET GRADE
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
