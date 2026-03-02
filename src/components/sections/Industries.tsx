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
    <section className="section-pad">
      <div className="container">
        <Reveal>
          <div className="text-center mb-10">
            <p className="section-label">Industries We Serve</p>
            <h2 className="section-title">Who Buys From Us</h2>
            <p className="section-sub mx-auto">
              From last-mile delivery operators to reseller dealers — our supply
              chain is built for diverse B2B buyers.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((name) => (
              <span
                key={name}
                className="text-sm font-medium text-[#374151] border border-[#e7eaf0] rounded-full px-4 py-2 bg-[#f8f9fc] hover:border-[#c9d5f5] hover:bg-[#dde8ff]/50 hover:text-[#2f6bff] transition-all cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
