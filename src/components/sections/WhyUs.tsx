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
    title: "After-Sales Coordination",
    desc: "Warranty claim routing, spare part supply, and service partner introductions as needed.",
  },
];

export default function WhyUs() {
  return (
    <section className="section-pad" style={{ background: "#fff" }}>
      <div className="container">
        <Reveal>
          <div className="mb-14">
            <p className="section-label mb-2">Why PowerElectric</p>
            <h2 className="section-title">Built for Serious Buyers.</h2>
            <p className="section-sub">
              We don't sell to hobbyists. We supply fleets, dealers and
              institutions who need volume, documentation, and reliable
              post-order support.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-[#DDE1E9]">
          {reasons.map(({ num, icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div
                className="p-8 group relative"
                style={{
                  borderRight: i % 2 === 0 ? "1px solid #DDE1E9" : undefined,
                  borderBottom: i < 2 ? "1px solid #DDE1E9" : undefined,
                  background: "#fff",
                  transition: "background 0.2s",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "rgba(37,99,235,0.02)" }}
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between mb-6">
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
                  <Icon size={18} aria-hidden="true" style={{ color: "#2563EB" }} />
                </div>

                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-display, 'Barlow Condensed'), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    color: "#111827",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                    fontSize: "0.875rem",
                    color: "#64748B",
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
