"use client";

import type React from "react";
import Image from "next/image";
import Reveal from "@/components/shared/Reveal";
import Marquee from "@/components/reactbits/Marquee";

const galleryImages = [
  { src: "/assets/scootyimg.webp", alt: "Electric scooter — fleet unit" },
  { src: "/assets/battery-pack.png", alt: "EV battery pack" },
  { src: "/assets/parts-flatlay.png", alt: "Chargers and parts flatlay" },
  { src: "/assets/scooter-lineup.png", alt: "Electric scooter lineup for bulk fleet supply" },
  { src: "/assets/hero-scooter.png", alt: "Hero scooter model" },
];

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
          <div className="relative mx-auto max-w-5xl">
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

            <div style={{ border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)" }}>
              <div
                className="relative py-6 px-6"
                style={{ background: "var(--color-surface-alt-2)" }}
              >
                <Marquee duration={32}>
                  {galleryImages.map((img, i) => (
                    <div
                      key={`${img.src}-${i}`}
                      className="relative shrink-0 h-56 md:h-72 mx-3 overflow-hidden"
                      style={{
                        width: 220,
                        border: "1px solid var(--color-border)",
                        background: "var(--color-surface)",
                        borderRadius: 2,
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="220px"
                      />
                    </div>
                  ))}
                </Marquee>
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
