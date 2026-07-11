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
      style={{ background: "#fff" }}
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
                "linear-gradient(to right, rgba(3,105,161,0.4) 0%, rgba(14,165,233,0.4) 50%, rgba(3,105,161,0.4) 100%)",
              zIndex: 1,
            }}
          />

          {steps.map(({ num, title, desc }, i) => (
            <Reveal key={num} delay={i * 0.12}>
              <div
                className="relative p-8 group cursor-default"
                style={{
                  background: i % 2 === 1 ? "var(--color-bg)" : "#fff",
                  border: "1px solid var(--color-border)",
                  borderLeft: i > 0 ? "none" : undefined,
                  borderRadius: i === 0 ? "12px 0 0 12px" : i === 2 ? "0 12px 12px 0" : 0,
                  transition: "background 0.22s ease",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "rgba(3,105,161,0.03)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    i % 2 === 1 ? "var(--color-bg)" : "#fff")
                }
              >
                {/* Top accent on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #0369A1 30%, #0EA5E9 70%, transparent)",
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
                    background: "#0369A1",
                    flexShrink: 0,
                    boxShadow: "0 4px 14px rgba(3,105,161,0.30)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display, 'Barlow Condensed'), sans-serif",
                      fontWeight: 800,
                      fontSize: "1rem",
                      color: "#fff",
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
                    color: "rgba(3,105,161,0.05)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {num}
                </div>

                <h3
                  className="mb-3"
                  style={{
                    fontFamily:
                      "var(--font-display, 'Barlow Condensed'), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    color: "var(--color-text)",
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
