"use client";

import Reveal from "@/components/shared/Reveal";

const industries = [
  "Delivery Fleets",
  "Campus / Institutions",
  "Factories & Warehouses",
  "Local EV Dealers",
  "Last-Mile Logistics",
  "Hospitality & Hotels",
  "Municipal Services",
  "Healthcare / Hospitals",
];

export default function Industries() {
  return (
    <section className="section-pad" style={{ background: "#fff" }}>
      <div className="container">
        <Reveal>
          <div className="mb-10">
            <p className="section-label mb-2">Industries We Serve</p>
            <h2 className="section-title">Who Buys From Us</h2>
            <p className="section-sub">
              From last-mile delivery operators to reseller dealers — our supply
              chain is built for diverse B2B buyers.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#DDE1E9]">
            {industries.map((name, i) => (
              <div
                key={name}
                className="relative px-5 py-4 group cursor-default"
                style={{
                  borderRight: (i + 1) % 4 !== 0 ? "1px solid #DDE1E9" : undefined,
                  borderBottom: i < 4 ? "1px solid #DDE1E9" : undefined,
                  background: "#fff",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.03)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#fff")
                }
              >
                <span
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#64748B",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "rgba(37,99,235,0.4)",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
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
