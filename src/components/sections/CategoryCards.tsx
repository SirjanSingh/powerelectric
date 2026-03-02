import Link from "next/link";
import { Zap, BatteryCharging, Wrench, ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

const categories = [
  {
    icon: Zap,
    title: "Electric Scooters",
    desc: "Fleet-ready scooters with LFP/NMC battery options. Bulk pricing available from 5 units. GST invoice provided.",
    href: "/products?tab=scooters",
    color: "#dde8ff",
    iconColor: "#2f6bff",
  },
  {
    icon: BatteryCharging,
    title: "EV Batteries",
    desc: "LFP and NMC packs in 48V–72V configurations. Replacement batteries for existing fleets. High-cycle verified.",
    href: "/products?tab=batteries",
    color: "#d1fae5",
    iconColor: "#059669",
  },
  {
    icon: Wrench,
    title: "Chargers & Parts",
    desc: "Smart chargers, motor controllers, wiring harnesses, converters. OEM-spec parts for multiple EV platforms.",
    href: "/products?tab=parts",
    color: "#fef3c7",
    iconColor: "#d97706",
  },
];

export default function CategoryCards() {
  return (
    <section className="section-pad">
      <div className="container">
        <Reveal>
          <div className="text-center mb-12">
            <p className="section-label">What We Supply</p>
            <h2 className="section-title">
              Three Product Lines. One Reliable Supplier.
            </h2>
            <p className="section-sub mx-auto">
              Everything your fleet or dealership needs — scooters, batteries,
              and parts — under one verified supply chain.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(
            ({ icon: Icon, title, desc, href, color, iconColor }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <Link
                  href={href}
                  className="card group flex flex-col p-7 h-full no-underline"
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-2xl mb-5 shrink-0"
                    style={{ background: color }}
                  >
                    <Icon size={22} style={{ color: iconColor }} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#111318] mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-[#6b7280] flex-1 leading-relaxed">
                    {desc}
                  </p>
                  <div className="flex items-center gap-1 mt-5 text-sm font-semibold text-[#2f6bff] group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={15} />
                  </div>
                </Link>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
