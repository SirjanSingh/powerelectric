"use client";

import Reveal from "@/components/shared/Reveal";

const steps = [
  {
    num: "01",
    title: "Share Your Requirement",
    desc: "Message us on WhatsApp or fill the quote form. Tell us: product category, quantity, city, and timeline.",
  },
  {
    num: "02",
    title: "Quote + Stock Confirmation",
    desc: "We respond within a few hours with pricing, available stock, GST breakdown, and logistics estimate.",
  },
  {
    num: "03",
    title: "Dispatch + GST Invoice",
    desc: "On confirmation, we dispatch with a proper GST tax invoice. Tracking shared. Warranty docs included.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="section-pad"
      style={{ background: "var(--color-surface)" }}
      aria-labelledby="howitworks-heading"
    >
      <div className="container">
        <Reveal>
          <div className="mb-14">
            <p className="section-label mb-2">Process</p>
            <h2 className="section-title" id="howitworks-heading">
              How Bulk Ordering Works
            </h2>
            <p className="section-sub">
              Simple, transparent, and fast — designed for B2B buyers.
            </p>
          </div>
        </Reveal>

        {/* Step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {/* Connecting line between cards (desktop) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute"
            style={{
              top: 36,
              left: "calc(33.333% - 1px)",
              right: "calc(33.333% - 1px)",
              height: 1,
              background:
                "linear-gradient(to right, color-mix(in srgb, var(--color-accent) 40%, transparent) 0%, color-mix(in srgb, var(--color-accent-bright) 40%, transparent) 50%, color-mix(in srgb, var(--color-accent) 40%, transparent) 100%)",
              zIndex: 1,
            }}
          />

          {steps.map(({ num, title, desc }, i) => (
            <Reveal key={num} delay={i * 0.12}>
              <div
                className="relative p-8 group cursor-default"
                style={{
                  background: i % 2 === 1 ? "var(--color-bg)" : "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderLeft: i > 0 ? "none" : undefined,
                  borderRadius: i === 0 ? "12px 0 0 12px" : i === 2 ? "0 12px 12px 0" : 0,
                  transition: "background 0.22s ease",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "color-mix(in srgb, var(--color-accent) 3%, transparent)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    i % 2 === 1 ? "var(--color-bg)" : "var(--color-surface)")
                }
              >
                {/* Top accent on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, var(--color-accent) 30%, var(--color-accent-bright) 70%, transparent)",
                    transition: "opacity 0.3s ease",
                  }}
                  aria-hidden="true"
                />

                {/* Step number badge */}
                <div
                  className="relative z-10 mb-6 inline-flex items-center justify-center"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    flexShrink: 0,
                    boxShadow: "0 4px 14px color-mix(in srgb, var(--color-accent) 30%, transparent)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display, 'Barlow Condensed'), sans-serif",
                      fontWeight: 800,
                      fontSize: "1rem",
                      color: "var(--color-surface)",
                      letterSpacing: "0.04em",
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </span>
                </div>

                {/* Watermark number */}
                <div
                  className="absolute bottom-3 right-4 select-none pointer-events-none"
                  aria-hidden="true"
                  style={{
                    fontFamily:
                      "var(--font-display, 'Barlow Condensed'), sans-serif",
                    fontWeight: 800,
                    fontSize: "5.5rem",
                    lineHeight: 1,
                    color: "color-mix(in srgb, var(--color-accent) 5%, transparent)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {num}
                </div>

                <h3
                  className="mb-3 card-title"
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                    fontSize: "0.875rem",
                    color: "var(--color-muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
