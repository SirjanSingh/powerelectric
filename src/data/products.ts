export type Category = "scooters" | "batteries" | "parts";

export type BestFor =
  | "Fleet"
  | "Delivery"
  | "Commuter"
  | "Replacement"
  | "Universal"
  | "Campus"
  | "Industrial";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  bestFor: BestFor[];
  shortDesc: string;
  specs: ProductSpec[];
  image: string;
  fallbackImage: string;
}

// NOTE: This is a representative catalog of the product lines Power Electric
// India supplies in bulk (complete e-scooters, batteries, chargers & parts).
// Names are spec-descriptive rather than fixed model numbers — exact makes,
// current stock and pricing are shared on WhatsApp per enquiry. When the real
// SKU list / photos are available, swap the entries below in place.
export const products: Product[] = [
  // ─── Electric Scooters ─────────────────────────────────────
  {
    id: "s1",
    name: "Fleet Delivery E-Scooter",
    category: "scooters",
    bestFor: ["Fleet", "Delivery"],
    shortDesc:
      "Workhorse e-scooter for high-mileage delivery fleets. Robust frame with removable/swappable battery support.",
    specs: [
      { label: "Range", value: "90–110 km / charge" },
      { label: "Top Speed", value: "55 km/h" },
      { label: "Battery", value: "LFP 60V 30Ah" },
    ],
    image: "/assets/scootyimg.png",
    fallbackImage: "/assets/scootyimg.png",
  },
  {
    id: "s2",
    name: "City Commuter E-Scooter",
    category: "scooters",
    bestFor: ["Commuter", "Fleet"],
    shortDesc:
      "Everyday commuter e-scooter for institutional and dealer orders. Balanced range and comfort.",
    specs: [
      { label: "Range", value: "80–100 km / charge" },
      { label: "Top Speed", value: "60 km/h" },
      { label: "Battery", value: "NMC 48V 40Ah" },
    ],
    image: "/assets/scootyimg.png",
    fallbackImage: "/assets/scootyimg.png",
  },
  {
    id: "s3",
    name: "Cargo / Loader E-Scooter",
    category: "scooters",
    bestFor: ["Delivery", "Fleet"],
    shortDesc:
      "High-payload e-scooter for last-mile logistics. Wide footboard and reinforced chassis.",
    specs: [
      { label: "Range", value: "80–90 km / charge" },
      { label: "Payload", value: "Up to 150 kg" },
      { label: "Battery", value: "LFP 60V / 72V" },
    ],
    image: "/assets/scootyimg.png",
    fallbackImage: "/assets/scootyimg.png",
  },
  {
    id: "s4",
    name: "Low-Speed Campus E-Scooter",
    category: "scooters",
    bestFor: ["Campus", "Commuter"],
    shortDesc:
      "Non-registration low-speed (≤25 km/h) e-scooter for campuses, hospitals and gated communities.",
    specs: [
      { label: "Range", value: "60–80 km / charge" },
      { label: "Top Speed", value: "25 km/h" },
      { label: "Battery", value: "LFP 48V 24Ah" },
    ],
    image: "/assets/hero-scooter.png",
    fallbackImage: "/assets/hero-scooter.png",
  },

  // ─── EV Batteries ──────────────────────────────────────────
  {
    id: "b1",
    name: "LFP Battery Pack 72V 30Ah",
    category: "batteries",
    bestFor: ["Replacement", "Fleet"],
    shortDesc:
      "Lithium Iron Phosphate (LFP) pack for high-cycle, long-life fleet applications. BMS included.",
    specs: [
      { label: "Voltage", value: "72V" },
      { label: "Capacity", value: "30Ah (≈2.16 kWh)" },
      { label: "Chemistry", value: "LFP" },
    ],
    image: "/assets/battery-pack.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },
  {
    id: "b2",
    name: "NMC Battery Pack 60V 40Ah",
    category: "batteries",
    bestFor: ["Replacement", "Commuter"],
    shortDesc:
      "High energy-density NMC pack. Lighter cell weight for performance-focused scooters.",
    specs: [
      { label: "Voltage", value: "60V" },
      { label: "Capacity", value: "40Ah (≈2.4 kWh)" },
      { label: "Chemistry", value: "NMC" },
    ],
    image: "/assets/battery-pack.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },
  {
    id: "b3",
    name: "LFP Battery Pack 48V 24Ah",
    category: "batteries",
    bestFor: ["Replacement", "Universal"],
    shortDesc:
      "Entry-level LFP pack compatible with most 48V EV platforms. GST invoice on every order.",
    specs: [
      { label: "Voltage", value: "48V" },
      { label: "Capacity", value: "24Ah (≈1.15 kWh)" },
      { label: "Chemistry", value: "LFP" },
    ],
    image: "/assets/battery-pack.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },
  {
    id: "b4",
    name: "Lead-Acid Battery Set (4×12V)",
    category: "batteries",
    bestFor: ["Replacement", "Universal"],
    shortDesc:
      "Sealed lead-acid battery set for e-rickshaw and entry e-scooter platforms. Sold as matched sets.",
    specs: [
      { label: "Configuration", value: "4 × 12V (48V set)" },
      { label: "Capacity", value: "28–32Ah / unit" },
      { label: "Type", value: "Sealed lead-acid (SLA)" },
    ],
    image: "/assets/battery-pack.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },

  // ─── Chargers & Parts ──────────────────────────────────────
  {
    id: "p1",
    name: "Smart Fast Charger (48–72V)",
    category: "parts",
    bestFor: ["Universal", "Fleet"],
    shortDesc:
      "Smart charger with auto-cutoff and temperature protection. Available in 3A–8A ratings for 48–72V packs.",
    specs: [
      { label: "Input", value: "AC 90–265V" },
      { label: "Output", value: "48–72V, 3–8A" },
      { label: "Protection", value: "Auto cut-off + thermal" },
    ],
    image: "/assets/parts-flatlay.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },
  {
    id: "p2",
    name: "BLDC Motor Controller (45–85A)",
    category: "parts",
    bestFor: ["Replacement", "Industrial"],
    shortDesc:
      "Brushless DC motor controller for hub-motor e-scooter and e-rickshaw platforms. Multiple current ratings.",
    specs: [
      { label: "Voltage", value: "48V / 60V / 72V" },
      { label: "Current", value: "45–85A" },
      { label: "Phase", value: "3-Phase" },
    ],
    image: "/assets/parts-flatlay.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },
  {
    id: "p3",
    name: "Throttle, Display & Harness Kit",
    category: "parts",
    bestFor: ["Replacement", "Universal"],
    shortDesc:
      "Throttle with switch, digital display/meter and pre-crimped wiring harness for common scooter platforms.",
    specs: [
      { label: "Compatibility", value: "Common 48–72V SKUs" },
      { label: "Display", value: "Digital speed / charge" },
      { label: "Connectors", value: "Weatherproof" },
    ],
    image: "/assets/parts-flatlay.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },
  {
    id: "p4",
    name: "DC-DC Converter (to 12V)",
    category: "parts",
    bestFor: ["Universal", "Replacement"],
    shortDesc:
      "Step-down converter for 12V accessories (horn, lights, dashboard) on 48–72V systems. 15–20A output.",
    specs: [
      { label: "Input", value: "48–72V DC" },
      { label: "Output", value: "12V, 15–20A" },
      { label: "Efficiency", value: ">90%" },
    ],
    image: "/assets/parts-flatlay.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },
];

export const categoryLabels: Record<Category, string> = {
  scooters: "Electric Scooters",
  batteries: "EV Batteries",
  parts: "Chargers & Parts",
};
