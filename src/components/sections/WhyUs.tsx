"use client";

import { CheckCircle2, LayoutList, BatteryCharging, Headphones } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

const reasons = [
  {
    num: "01",
    icon: CheckCircle2,
    title: "Reliable Supply",
    desc: "Stock updated regularly. No ghost listings. Verified inventory before we confirm your order.",
  },
  {
    num: "02",
    icon: LayoutList,
    title: "Transparent Quotes",
    desc: "Line-item pricing: product, GST, logistics. No hidden charges. Bulk tier discounts clearly stated.",
  },
  {
    num: "03",
    icon: BatteryCharging,
    title: "Battery Options",
    desc: "Choose between LFP (longer cycle life) and NMC (higher energy density) based on your use-case.",
  },
  {
    num: "04",
    icon: Headphones,
    title: "After-Sales Support",
    desc: "Warranty claim routing, spare part supply, and service partner introductions as needed.",
  },
];

export default function WhyUs() {
  return (
    <section
      className="section-pad"
      style={{ background: "var(--color-bg)" }}
      aria-labelledby="whyus-heading"
    >
      <div className="container">
        <Reveal>
          <div className="mb-14">
            <p className="section-label mb-2">Why PowerElectric</p>
            <h2 className="section-title" id="whyus-heading">
              Built for Serious Buyers.
            </h2>
            <p className="section-sub">
              We don't sell to hobbyists. We supply fleets, dealers and
              institutions who need volume, documentation, and reliable
              post-order support.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reasons.map(({ num, icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div
                className="p-8 group relative overflow-hidden cursor-default"
                style={{
                  background: "#fff",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-card)",
                  boxShadow: "var(--shadow-sm)",
                  transition:
                    "box-shadow var(--transition), transform var(--transition), border-color var(--transition)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "var(--shadow-lg)";
                  el.style.transform = "translateY(-3px)";
                  el.style.borderColor = "rgba(3,105,161,0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "var(--shadow-sm)";
                  el.style.transform = "";
                  el.style.borderColor = "var(--color-border)";
                }}
              >
                {/* Gradient wash on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(3,105,161,0.04) 0%, rgba(14,165,233,0.02) 100%)",
                    transition: "opacity 0.3s ease",
                    borderRadius: "inherit",
                  }}
                  aria-hidden="true"
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #0369A1 30%, #0EA5E9 70%, transparent)",
                    transition: "opacity 0.3s ease",
                  }}
                  aria-hidden="true"
                />

                {/* Header: number + icon */}
                <div className="flex items-start justify-between mb-6 relative">
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      color: "#94A3B8",
                    }}
                  >
                    {num}
                  </span>

                  {/* Icon badge */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(3,105,161,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.25s ease",
                    }}
                    className="group-hover:!bg-[rgba(3,105,161,0.14)]"
                  >
                    <Icon size={18} aria-hidden="true" style={{ color: "#0369A1" }} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="mb-3 relative"
                  style={{
                    fontFamily:
                      "var(--font-display, 'Barlow Condensed'), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    color: "var(--color-text)",
                    lineHeight: 1.15,
                  }}
                >
                  {title}
                </h3>

                {/* Desc */}
                <p
                  className="relative"
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
