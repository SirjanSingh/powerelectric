export const siteConfig = {
  businessName: "Power Electric India",
  tagline: "Bulk EV Supply for Fleets, Dealers & Institutions",
  shortTagline: "Reliable bulk EV supply, GST billing, fast dispatch.",

  // Contact
  phone: "+91 63999 88690",
  phoneRaw: "916399988690", // used in tel: links
  whatsappNumber: "916399988690", // E.164 digits, no +
  email: "sukhjotev@gmail.com",

  address: {
    line1: "Nangli Industrial Area",
    line2: "", // unit/plot no. — add when confirmed
    city: "Delhi",
    state: "Delhi",
    pin: "", // add exact PIN when confirmed
    country: "India",
  },

  hours: "Mon - Sat: 11 AM – 7 PM IST",
  hoursNote: "Sunday: Closed. WhatsApp available 24 hours.",

  serviceAreas: [
    "Delhi NCR",
    "North India",
    "All India (nationwide bulk dispatch)",
    "Full-container / bulk export enquiries",
  ],

  // Real Google Maps embed src pending — left empty so the map section shows a
  // graceful "coming soon" panel instead of the wrong location.
  googleMapsEmbedUrl: "",

  social: {
    whatsapp: `https://wa.me/916399988690`,
  },

  // SEO — siteUrl is a placeholder until the domain is confirmed/registered.
  siteUrl: "https://powerelectric.in",
  metaDescription:
    "Power Electric India — bulk EV supply for fleets, dealers and institutions. Electric scooters, LFP/NMC battery packs, chargers and parts. Full-container bulk orders, GST billing, nationwide dispatch from Delhi.",
} as const;

export type SiteConfig = typeof siteConfig;
