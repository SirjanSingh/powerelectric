import Link from "next/link";
import { Zap, BatteryCharging, Wrench, ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

const categories = [
  {
    icon: Zap,
    num: "01",
    title: "Electric Scooters",
    desc: "Fleet-ready scooters with LFP/NMC battery options. Bulk pricing from 5 units. GST invoice provided.",
    href: "/products?tab=scooters",
    tag: "MOQ 5 UNITS",
    accent: "var(--color-accent)",
    accentBg: "color-mix(in srgb, var(--color-accent) 7%, transparent)",
    gradientHover:
      "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 6%, transparent) 0%, color-mix(in srgb, var(--color-accent-bright) 4%, transparent) 100%)",
  },
  {
    icon: BatteryCharging,
    num: "02",
    title: "EV Batteries",
    desc: "LFP and NMC packs in 48V–72V. High-cycle replacement batteries for fleets. Swappable options available.",
    href: "/products?tab=batteries",
    tag: "LFP / NMC",
    accent: "var(--color-accent)",
    accentBg: "color-mix(in srgb, var(--color-accent) 7%, transparent)",
    gradientHover:
      "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 6%, transparent) 0%, color-mix(in srgb, var(--color-accent-bright) 4%, transparent) 100%)",
  },
  {
    icon: Wrench,
    num: "03",
    title: "Chargers & Parts",
    desc: "Smart chargers, BLDC controllers, wiring harnesses, converters. OEM-spec parts for major EV platforms.",
    href: "/products?tab=parts",
    tag: "OEM SPEC",
    accent: "var(--color-accent)",
    accentBg: "color-mix(in srgb, var(--color-accent) 7%, transparent)",
    gradientHover:
      "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 6%, transparent) 0%, color-mix(in srgb, var(--color-accent-bright) 4%, transparent) 100%)",
  },
];

export default function CategoryCards() {
  return (
    <section
      className="section-pad"
      style={{ background: "var(--color-bg)" }}
      aria-labelledby="categories-heading"
    >
      <div className="container">
        <Reveal>
          <div className="mb-14">
            <p className="section-label mb-2">What We Supply</p>
            <h2 className="section-title" id="categories-heading">
              Three Lines.
              <br />
              One Supplier.
            </h2>
            <p className="section-sub">
              Scooters, batteries, and parts under one verified supply chain —
              with GST billing and bulk fleet pricing.
            </p>
          </div>
        </Reveal>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-card)",
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {categories.map(
            (
              { icon: Icon, num, title, desc, href, tag, accent, accentBg, gradientHover },
              i
            ) => (
              <Reveal key={title} delay={i * 0.08}>
                <Link
                  href={href}
                  className="group flex flex-col p-8 h-full no-underline relative overflow-hidden cursor-pointer"
                  style={{
                    background: "var(--color-surface)",
                    borderRight:
                      i < 2
                        ? "1px solid var(--color-border)"
                        : undefined,
                  }}
                >
                  {/* Hover gradient wash */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: gradientHover,
                      transition: "opacity 0.3s ease",
                    }}
                    aria-hidden="true"
                  />

                  {/* Top accent line on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: `linear-gradient(to right, transparent, ${accent} 30%, ${accent} 70%, transparent)`,
                      transition: "opacity 0.3s ease",
                    }}
                    aria-hidden="true"
                  />

                  {/* Number + icon row */}
                  <div className="flex items-start justify-between mb-5 relative">
                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        color: "var(--color-subtle)",
                      }}
                    >
                      {num}
                    </span>
                    {/* Icon in circle */}
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: accentBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background 0.25s ease",
                      }}
                      className="group-hover:!bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)]"
                    >
                      <Icon
                        size={20}
                        style={{ color: accent }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Tag */}
                  <span
                    className="inline-block mb-4"
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      color: accent,
                      border: `1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)`,
                      background: accentBg,
                      padding: "3px 8px",
                      borderRadius: 4,
                      width: "fit-content",
                    }}
                  >
                    {tag}
                  </span>

                  {/* Title */}
                  <h3
                    className="mb-3 relative"
                    style={{
                      fontFamily:
                        "var(--font-display, 'Barlow Condensed'), sans-serif",
                      fontWeight: 700,
                      fontSize: "1.35rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      color: "var(--color-text)",
                      lineHeight: 1.1,
                    }}
                  >
                    {title}
                  </h3>

                  {/* Description */}
                  <p
                    className="flex-1 relative"
                    style={{
                      fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                      fontSize: "0.875rem",
                      color: "var(--color-muted)",
                      lineHeight: 1.65,
                    }}
                  >
                    {desc}
                  </p>

                  {/* Explore link */}
                  <div
                    className="flex items-center gap-2 mt-6 relative"
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.08em",
                      color: accent,
                      textTransform: "uppercase",
                      transition: "gap 0.2s ease",
                    }}
                  >
                    <span>Explore</span>
                    <ArrowRight
                      size={13}
                      aria-hidden="true"
                      style={{
                        transition: "transform 0.2s ease",
                      }}
                      className="group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </Reveal>
            )
          )}
        </div>

        <Reveal delay={0.24}>
          <p
            className="mt-6"
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.75rem",
              color: "var(--color-muted-2)",
            }}
          >
            Know what you want?{" "}
            <Link
              href="/configure"
              style={{ color: "var(--color-accent)", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              Configure a scooter in 3D &amp; get a quote →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
