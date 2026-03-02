import { FileCheck2, BadgeDollarSign, Truck, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: FileCheck2,
    label: "GST Billing",
    desc: "Proper tax invoicing for every order",
  },
  {
    icon: BadgeDollarSign,
    label: "Bulk Pricing",
    desc: "Tiered pricing for 5+ unit orders",
  },
  {
    icon: Truck,
    label: "Fast Dispatch",
    desc: "Ready stock. Quick turnaround logistics",
  },
  {
    icon: ShieldCheck,
    label: "Warranty Support",
    desc: "Manufacturer warranty coordination",
  },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-[#e7eaf0] bg-[#f8f9fc]">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#dde8ff] shrink-0 mt-0.5">
                <Icon size={17} className="text-[#2f6bff]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111318]">{label}</p>
                <p className="text-xs text-[#6b7280] mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
