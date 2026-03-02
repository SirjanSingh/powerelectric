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
    <section className="section-pad bg-[#f8f9fc]">
      <div className="container">
        <Reveal>
          <div className="text-center mb-14">
            <p className="section-label">Process</p>
            <h2 className="section-title">How Bulk Ordering Works</h2>
            <p className="section-sub mx-auto">
              Simple, transparent, and fast — designed for B2B buyers.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line on desktop */}
          <div
            className="hidden md:block absolute top-8 left-[calc(16.66%-12px)] right-[calc(16.66%-12px)] h-px bg-[#e7eaf0] z-0"
            aria-hidden="true"
          />

          {steps.map(({ num, title, desc }, i) => (
            <Reveal key={num} delay={i * 0.15}>
              <div className="relative z-10 flex flex-col items-center text-center p-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2f6bff] text-white font-bold text-lg mb-5 shadow-md">
                  {num}
                </div>
                <h3 className="text-base font-semibold text-[#111318] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[#6b7280] leading-relaxed max-w-xs">
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
