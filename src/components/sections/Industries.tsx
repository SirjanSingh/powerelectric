"use client";

import Reveal from "@/components/shared/Reveal";

const industries = [
  { name: "Delivery Fleets",           icon: "🚚" },
  { name: "Campus / Institutions",     icon: "🏫" },
  { name: "Factories & Warehouses",    icon: "🏭" },
  { name: "Local EV Dealers",          icon: "🏪" },
  { name: "Last-Mile Logistics",       icon: "📦" },
  { name: "Hospitality & Hotels",      icon: "🏨" },
  { name: "Municipal Services",        icon: "🏛️" },
  { name: "Healthcare / Hospitals",    icon: "🏥" },
];

export default function Industries() {
  return (
    <section
      className="section-pad"
      style={{ background: "var(--color-bg)" }}
      aria-labelledby="industries-heading"
    >
      <div className="container">
        <Reveal>
          <div className="mb-10">
            <p className="section-label mb-2">Industries We Serve</p>
            <h2 className="section-title" id="industries-heading">
              Who Buys From Us
            </h2>
            <p className="section-sub">
              From last-mile delivery operators to reseller dealers — our
              supply chain is built for diverse B2B buyers.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {industries.map(({ name, icon }, i) => (
              <div
                key={name}
                className="group cursor-default"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 18px",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 999,
                  boxShadow: "var(--shadow-sm)",
                  transition:
                    "background var(--transition), border-color var(--transition), box-shadow var(--transition), transform var(--transition)",
                  animationDelay: `${i * 0.04}s`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "color-mix(in srgb, var(--color-accent) 6%, transparent)";
                  el.style.borderColor = "color-mix(in srgb, var(--color-accent) 30%, transparent)";
                  el.style.boxShadow = "var(--shadow-md)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--color-surface)";
                  el.style.borderColor = "var(--color-border)";
                  el.style.boxShadow = "var(--shadow-sm)";
                  el.style.transform = "";
                }}
              >
                <span
                  role="img"
                  aria-hidden="true"
                  style={{ fontSize: "0.9rem" }}
                >
                  {icon}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--color-text)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
