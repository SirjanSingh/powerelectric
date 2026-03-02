import {
  CheckCircle2,
  LayoutList,
  BatteryCharging,
  Headphones,
} from "lucide-react";
import Reveal from "@/components/shared/Reveal";

const reasons = [
  {
    icon: CheckCircle2,
    title: "Reliable Supply",
    desc: "Stock updated regularly. No ghost listings. Verified inventory before we confirm your order.",
  },
  {
    icon: LayoutList,
    title: "Transparent Quotes",
    desc: "Line-item pricing: product, GST, logistics. No hidden charges. Bulk tier discounts clearly stated.",
  },
  {
    icon: BatteryCharging,
    title: "Battery Options",
    desc: "Choose between LFP (longer cycle life) and NMC (higher energy density) based on your use-case.",
  },
  {
    icon: Headphones,
    title: "After-Sales Coordination",
    desc: "Warranty claim routing, spare part supply, and service partner introductions as needed.",
  },
];

export default function WhyUs() {
  return (
    <section className="section-pad">
      <div className="container">
        <Reveal>
          <div className="text-center mb-12">
            <p className="section-label">Why PowerElectric</p>
            <h2 className="section-title">Built for Serious Buyers</h2>
            <p className="section-sub mx-auto">
              We don't sell to hobbyists. We supply fleets, dealers and
              institutions who need volume, documentation, and reliable
              post-order support.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="card p-6 h-full flex flex-col">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#dde8ff] mb-4 shrink-0">
                  <Icon size={18} className="text-[#2f6bff]" />
                </div>
                <h3 className="text-base font-semibold text-[#111318] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
