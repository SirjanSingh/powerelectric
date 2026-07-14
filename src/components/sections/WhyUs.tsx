"use client";

import { CheckCircle2, LayoutList, BatteryCharging, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/shared/Reveal";
import { useReducedMotionSafe } from "@/components/reactbits/useReducedMotionSafe";

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
  const prefersReducedMotion = useReducedMotionSafe();

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
              Built for <span className="gradient-shine-text">Serious Buyers.</span>
            </h2>
            <p className="section-sub">
              We don&apos;t sell to hobbyists. We supply fleets, dealers and
              institutions who need volume, documentation, and reliable
              post-order support.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reasons.map(({ num, icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <motion.div
                className="p-8 group relative overflow-hidden cursor-default"
                style={{
                  background: "var(--color-surface)",
                  borderRadius: "var(--radius-card)",
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={{
                  rest: {
                    y: 0,
                    boxShadow: "var(--shadow-sm)",
                    borderColor: "var(--color-border)",
                  },
                  hover: {
                    y: prefersReducedMotion ? 0 : -3,
                    boxShadow: "var(--shadow-lg)",
                    borderColor: "color-mix(in srgb, var(--color-accent) 25%, transparent)",
                  },
                }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Gradient wash on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 4%, transparent) 0%, color-mix(in srgb, var(--color-accent-bright) 2%, transparent) 100%)",
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
                      "linear-gradient(to right, transparent, var(--color-accent) 30%, var(--color-accent-bright) 70%, transparent)",
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
                      color: "var(--color-subtle)",
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
                      background: "color-mix(in srgb, var(--color-accent) 8%, transparent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.25s ease",
                    }}
                    className="group-hover:!bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)]"
                  >
                    <Icon size={18} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="mb-3 relative card-title"
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
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
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
