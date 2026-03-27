import { FileCheck2, BadgeDollarSign, Truck, ShieldCheck } from "lucide-react";

const items = [
  { icon: FileCheck2,      label: "GST Billing",      desc: "Proper tax invoicing for every order" },
  { icon: BadgeDollarSign, label: "Bulk Pricing",      desc: "Tiered pricing for 5+ unit orders" },
  { icon: Truck,           label: "Fast Dispatch",     desc: "Ready stock. Quick turnaround logistics" },
  { icon: ShieldCheck,     label: "Warranty Support",  desc: "Manufacturer warranty coordination" },
];

export default function TrustStrip() {
  return (
    <section style={{ background: "#fff", borderBottom: "1px solid #DDE1E9" }}>
      <div className="container">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(37,99,235,0.3) 30%, rgba(37,99,235,0.3) 70%, transparent)",
          }}
          aria-hidden="true"
        />
        <div className="grid grid-cols-2 md:grid-cols-4">
          {items.map(({ icon: Icon, label, desc }, i) => (
            <div
              key={label}
              className="flex items-start gap-3 py-6 px-5"
              style={{
                borderRight: i < items.length - 1 ? "1px solid #DDE1E9" : undefined,
              }}
            >
              <Icon size={16} className="shrink-0 mt-0.5" style={{ color: "#2563EB" }} />
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                    fontSize: "0.75rem",
                    color: "#64748B",
                    marginTop: 2,
                  }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
