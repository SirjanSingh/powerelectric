"use client";

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
            linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)
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
              { style: { top: -8, left: -8, borderTop: "2px solid #2563EB", borderLeft: "2px solid #2563EB" } },
              { style: { top: -8, right: -8, borderTop: "2px solid #2563EB", borderRight: "2px solid #2563EB" } },
              { style: { bottom: -8, left: -8, borderBottom: "2px solid #2563EB", borderLeft: "2px solid #2563EB" } },
              { style: { bottom: -8, right: -8, borderBottom: "2px solid #2563EB", borderRight: "2px solid #2563EB" } },
            ].map((c, i) => (
              <span
                key={i}
                className="absolute w-4 h-4 pointer-events-none z-10"
                style={c.style as React.CSSProperties}
                aria-hidden="true"
              />
            ))}

            <div className="overflow-hidden" style={{ border: "1px solid #DDE1E9", boxShadow: "var(--shadow-md)" }}>
              <div
                className="relative h-72 md:h-96 flex items-center justify-center"
                style={{ background: "#EEF2F9" }}
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
                  <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#94A3B8" }}>
                    scooter-lineup.png
                  </p>
                </div>
              </div>

              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ background: "#fff", borderTop: "1px solid #DDE1E9" }}
              >
                <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#94A3B8" }}>
                  Representative models — contact us for OEM sourcing
                </p>
                <span
                  className="flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.6rem", letterSpacing: "0.1em", color: "#2563EB" }}
                >
                  <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "#2563EB" }} aria-hidden="true" />
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
