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

export const products: Product[] = [
  // ─── Scooters ──────────────────────────────────────────────
  {
    id: "s1",
    name: "Urban Fleet S1",
    category: "scooters",
    bestFor: ["Fleet", "Delivery"],
    shortDesc:
      "Purpose-built for high-mileage delivery fleets. Robust frame, swappable battery support.",
    specs: [
      { label: "Range", value: "120 km / charge" },
      { label: "Top Speed", value: "55 km/h" },
      { label: "Battery", value: "LFP 60V 30Ah" },
    ],
    image: "/assets/scootyimg.png",
    fallbackImage: "/assets/scootyimg.png",
  },
  {
    id: "s2",
    name: "City Pro S2",
    category: "scooters",
    bestFor: ["Commuter", "Fleet"],
    shortDesc:
      "Premium commuter scooter with smart connectivity. Popular for campus and institutional fleets.",
    specs: [
      { label: "Range", value: "100 km / charge" },
      { label: "Top Speed", value: "60 km/h" },
      { label: "Battery", value: "NMC 48V 40Ah" },
    ],
    image: "/assets/scootyimg.png",
    fallbackImage: "/assets/scootyimg.png",
  },
  {
    id: "s3",
    name: "Cargo Hauler X3",
    category: "scooters",
    bestFor: ["Delivery", "Fleet"],
    shortDesc:
      "High-payload electric scooter for last-mile logistics. Wide footboard, reinforced chassis.",
    specs: [
      { label: "Range", value: "90 km / charge" },
      { label: "Payload", value: "Up to 150 kg" },
      { label: "Battery", value: "LFP 72V 35Ah" },
    ],
    image: "/assets/scootyimg.png",
    fallbackImage: "/assets/scootyimg.png",
  },
  {
    id: "s4",
    name: "Campus Glide E4",
    category: "scooters",
    bestFor: ["Campus", "Commuter"],
    shortDesc:
      "Low-speed campus mobility scooter. Ideal for universities, hospitals, gated communities.",
    specs: [
      { label: "Range", value: "80 km / charge" },
      { label: "Top Speed", value: "40 km/h" },
      { label: "Battery", value: "LFP 48V 24Ah" },
    ],
    image: "/assets/hero-scooter.png",
    fallbackImage: "/assets/hero-scooter.png",
  },

  // ─── Batteries ─────────────────────────────────────────────
  {
    id: "b1",
    name: "LFP Pack 72V 30Ah",
    category: "batteries",
    bestFor: ["Replacement", "Fleet"],
    shortDesc:
      "Lithium Iron Phosphate (LFP) pack for high-cycle, long-life fleet applications.",
    specs: [
      { label: "Voltage", value: "72V" },
      { label: "Capacity", value: "30Ah (2.16 kWh)" },
      { label: "Chemistry", value: "LFP" },
    ],
    image: "/assets/battery-pack.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },
  {
    id: "b2",
    name: "NMC Pack 60V 40Ah",
    category: "batteries",
    bestFor: ["Replacement", "Commuter"],
    shortDesc:
      "High energy-density NMC pack. Lighter cell weight for performance-focused scooters.",
    specs: [
      { label: "Voltage", value: "60V" },
      { label: "Capacity", value: "40Ah (2.4 kWh)" },
      { label: "Chemistry", value: "NMC" },
    ],
    image: "/assets/battery-pack.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },
  {
    id: "b3",
    name: "LFP Pack 48V 24Ah",
    category: "batteries",
    bestFor: ["Replacement", "Universal"],
    shortDesc:
      "Entry-level LFP pack compatible with most 48V EV platforms. GST invoice included.",
    specs: [
      { label: "Voltage", value: "48V" },
      { label: "Capacity", value: "24Ah (1.15 kWh)" },
      { label: "Chemistry", value: "LFP" },
    ],
    image: "/assets/battery-pack.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },
  {
    id: "b4",
    name: "Swappable LFP 72V 20Ah",
    category: "batteries",
    bestFor: ["Fleet", "Delivery"],
    shortDesc:
      "Hot-swap compatible battery for high-uptime delivery fleets. Lightweight casing.",
    specs: [
      { label: "Voltage", value: "72V" },
      { label: "Capacity", value: "20Ah (1.44 kWh)" },
      { label: "Chemistry", value: "LFP (Swappable)" },
    ],
    image: "/assets/battery-pack.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },

  // ─── Parts & Chargers ──────────────────────────────────────
  {
    id: "p1",
    name: "Fast Charger 10A",
    category: "parts",
    bestFor: ["Universal", "Fleet"],
    shortDesc:
      "72V / 10A smart charger with auto-cutoff and temperature protection. Fleet-grade.",
    specs: [
      { label: "Input", value: "AC 90–265V" },
      { label: "Output", value: "72V, 10A" },
      { label: "Connector", value: "Anderson SB50" },
    ],
    image: "/assets/parts-flatlay.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },
  {
    id: "p2",
    name: "BLDC Controller 72V 40A",
    category: "parts",
    bestFor: ["Replacement", "Industrial"],
    shortDesc:
      "Brushless DC motor controller. Compatible with most 72V hub-motor scooter platforms.",
    specs: [
      { label: "Voltage", value: "72V" },
      { label: "Current", value: "40A peak" },
      { label: "Phase", value: "3-Phase sine" },
    ],
    image: "/assets/parts-flatlay.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },
  {
    id: "p3",
    name: "Wiring Harness Kit",
    category: "parts",
    bestFor: ["Replacement", "Universal"],
    shortDesc:
      "Pre-crimped main wiring harness for major scooter platforms. OEM-spec connectors.",
    specs: [
      { label: "Compatibility", value: "Universal (major SKUs)" },
      { label: "Wire gauge", value: "16 AWG main, 22 AWG signal" },
      { label: "Connectors", value: "Waterproof IP65" },
    ],
    image: "/assets/parts-flatlay.png",
    fallbackImage: "/assets/parts-flatlay.png",
  },
  {
    id: "p4",
    name: "DC-DC Converter 72V→12V",
    category: "parts",
    bestFor: ["Universal", "Replacement"],
    shortDesc:
      "Step-down converter for 12V accessories (horn, lights, dashboard) on 72V systems.",
    specs: [
      { label: "Input", value: "60–84V DC" },
      { label: "Output", value: "12V, 5A" },
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
