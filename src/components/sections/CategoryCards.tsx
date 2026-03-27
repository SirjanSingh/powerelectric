import Link from "next/link";
import { Zap, BatteryCharging, Wrench, ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

const categories = [
  {
    icon: Zap,
    num: "01",
    title: "Electric Scooters",
    desc: "Fleet-ready scooters with LFP/NMC battery options. Bulk pricing available from 5 units. GST invoice provided.",
    href: "/products?tab=scooters",
    tag: "MOQ 5 UNITS",
  },
  {
    icon: BatteryCharging,
    num: "02",
    title: "EV Batteries",
    desc: "LFP and NMC packs in 48V–72V configurations. Replacement batteries for existing fleets. High-cycle verified.",
    href: "/products?tab=batteries",
    tag: "LFP / NMC",
  },
  {
    icon: Wrench,
    num: "03",
    title: "Chargers & Parts",
    desc: "Smart chargers, motor controllers, wiring harnesses, converters. OEM-spec parts for multiple EV platforms.",
    href: "/products?tab=parts",
    tag: "OEM SPEC",
  },
];

export default function CategoryCards() {
  return (
    <section className="section-pad" style={{ background: "var(--color-bg)" }}>
      <div className="container">
        <Reveal>
          <div className="mb-12">
            <p className="section-label mb-2">What We Supply</p>
            <h2 className="section-title">Three Lines.<br />One Supplier.</h2>
            <p className="section-sub">
              Scooters, batteries, and parts — under one verified supply chain
              with GST billing and bulk fleet pricing.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#DDE1E9]">
          {categories.map(({ icon: Icon, num, title, desc, href, tag }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <Link
                href={href}
                className="group flex flex-col p-8 h-full no-underline relative overflow-hidden"
                style={{
                  background: "#fff",
                  borderRight: i < 2 ? "1px solid #DDE1E9" : undefined,
                  transition: "background 0.2s",
                }}
              >
                {/* hover wash */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "rgba(37,99,235,0.025)" }}
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between mb-6">
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      color: "#94A3B8",
                    }}
                  >
                    {num}
                  </span>
                  <Icon size={20} style={{ color: "#2563EB" }} aria-hidden="true" />
                </div>

                <span
                  className="inline-block mb-4 px-2 py-0.5"
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    color: "#2563EB",
                    border: "1px solid rgba(37,99,235,0.25)",
                    background: "rgba(37,99,235,0.05)",
                    width: "fit-content",
                  }}
                >
                  {tag}
                </span>

                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-display, 'Barlow Condensed'), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.3rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    color: "#111827",
                    lineHeight: 1.1,
                  }}
                >
                  {title}
                </h3>
                <p
                  className="flex-1 leading-relaxed"
                  style={{
                    fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                    fontSize: "0.875rem",
                    color: "#64748B",
                  }}
                >
                  {desc}
                </p>

                <div
                  className="flex items-center gap-1.5 mt-6 group-hover:gap-3 transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.08em",
                    color: "#2563EB",
                    textTransform: "uppercase",
                  }}
                >
                  Explore <ArrowRight size={13} aria-hidden="true" />
                </div>

                {/* bottom blue rule on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(37,99,235,0.4)" }}
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
