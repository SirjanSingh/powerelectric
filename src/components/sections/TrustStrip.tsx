"use client";

import { FileCheck2, BadgeDollarSign, Truck, ShieldCheck } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import CountUp from "@/components/reactbits/CountUp";

const items = [
  {
    icon: FileCheck2,
    stat: "GST",
    label: "Billing Included",
    desc: "Proper tax invoicing on every order",
  },
  {
    icon: BadgeDollarSign,
    stat: "5+",
    label: "Units Min Order",
    desc: "Tiered bulk pricing for fleets",
  },
  {
    icon: Truck,
    stat: "PAN",
    label: "India Dispatch",
    desc: "Ready stock. Fast nationwide logistics",
  },
  {
    icon: ShieldCheck,
    stat: "OEM",
    label: "Warranty Support",
    desc: "Manufacturer warranty coordination",
  },
];

export default function TrustStrip() {
  return (
    <section
      style={{
        background: "var(--color-navy, var(--color-text))",
        borderBottom: "1px solid color-mix(in srgb, var(--color-surface) 6%, transparent)",
      }}
      aria-label="Trust indicators"
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {items.map(({ icon: Icon, stat, label, desc }, i) => (
            <Reveal key={label} delay={i * 0.06} className="h-full">
              <div
                className="trust-item flex flex-col gap-3 py-8 px-6 h-full"
                style={{
                  borderRight:
                    i < items.length - 1
                      ? "1px solid color-mix(in srgb, var(--color-surface) 7%, transparent)"
                      : undefined,
                }}
              >
                {/* Icon badge */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "color-mix(in srgb, var(--color-accent-bright) 15%, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon
                    size={16}
                    aria-hidden="true"
                    style={{ color: "var(--color-accent-bright)" }}
                  />
                </div>

                {/* Stat + label */}
                <div>
                  <p
                    style={{
                      fontFamily:
                        "var(--font-display, 'Barlow Condensed'), sans-serif",
                      fontWeight: 800,
                      fontSize: "1.6rem",
                      lineHeight: 1,
                      color: "var(--color-text-inverse)",
                      letterSpacing: "-0.01em",
                      textTransform: "uppercase",
                    }}
                  >
                    <CountUp value={stat} />
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--color-accent-bright)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginTop: 2,
                    }}
                  >
                    {label}
                  </p>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                    fontSize: "0.75rem",
                    color: "color-mix(in srgb, var(--color-subtle) 90%, transparent)",
                    lineHeight: 1.5,
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
