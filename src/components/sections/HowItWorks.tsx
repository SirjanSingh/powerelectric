import Reveal from "@/components/shared/Reveal";

const steps = [
  {
    num: "01",
    title: "Share Your Requirement",
    desc: "Message us on WhatsApp or fill the quote form. Tell us: product category, quantity, city, and timeline.",
  },
  {
    num: "02",
    title: "Quote + Stock Confirmation",
    desc: "We respond within a few hours with pricing, available stock, GST breakdown, and logistics estimate.",
  },
  {
    num: "03",
    title: "Dispatch + GST Invoice",
    desc: "On confirmation, we dispatch with a proper GST tax invoice. Tracking shared. Warranty docs included.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-pad" style={{ background: "var(--color-bg)" }}>
      <div className="container">
        <Reveal>
          <div className="mb-14">
            <p className="section-label mb-2">Process</p>
            <h2 className="section-title">How Bulk Ordering Works</h2>
            <p className="section-sub">
              Simple, transparent, and fast — designed for B2B buyers.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#DDE1E9]">
          {steps.map(({ num, title, desc }, i) => (
            <Reveal key={num} delay={i * 0.12}>
              <div
                className="relative p-8 group"
                style={{
                  borderRight: i < steps.length - 1 ? "1px solid #DDE1E9" : undefined,
                  background: "#fff",
                }}
              >
                {/* blue top accent line on hover */}
                <div
                  className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(37,99,235,0.5)" }}
                  aria-hidden="true"
                />

                {/* watermark number */}
                <div
                  className="absolute top-4 right-4 select-none pointer-events-none"
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-display, 'Barlow Condensed'), sans-serif",
                    fontWeight: 800,
                    fontSize: "5rem",
                    lineHeight: 1,
                    color: "rgba(37,99,235,0.05)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {num}
                </div>

                <div
                  className="mb-5 inline-block px-3 py-1"
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    color: "#2563EB",
                    border: "1px solid rgba(37,99,235,0.25)",
                    background: "rgba(37,99,235,0.05)",
                  }}
                >
                  STEP {num}
                </div>

                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-display, 'Barlow Condensed'), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    color: "#111827",
                    lineHeight: 1.1,
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
