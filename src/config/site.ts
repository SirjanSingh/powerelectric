export const siteConfig = {
  businessName: "PowerElectric",
  tagline: "Bulk EV Supply for Fleets, Dealers & Institutions",
  shortTagline: "Reliable bulk EV supply, GST billing, fast dispatch.",

  // Contact — update these before going live
  phone: "+91 63999 88690",
  phoneRaw: "916399988690", // used in tel: links
  whatsappNumber: "916399988690", // E.164 digits, no +
  email: "sales@powerelectric.in",

  address: {
    line1: "Plot 42, Industrial Area Phase II",
    line2: "Near EV Cluster, Gurugram",
    city: "Gurugram",
    state: "Haryana",
    pin: "122001",
    country: "India",
  },

  hours: "Mon - Sat: 9 AM – 7 PM IST",
  hoursNote: "Sunday: Closed. WhatsApp available 24 hours.",

  serviceAreas: [
    "Delhi NCR",
    "Haryana",
    "Rajasthan",
    "Uttar Pradesh",
    "Punjab",
    "All India (bulk dispatch)",
  ],

  // Paste your Google Maps embed src URL here
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.081!2d77.026!3d28.459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzMyLjAiTiA3N8KwMDEnMzMuNiJF!5e0!3m2!1sen!2sin!4v1700000000000",

  social: {
    whatsapp: `https://wa.me/916399988690`,
    instagram: "https://instagram.com/powerelectric.in",
    linkedin: "https://linkedin.com/company/powerelectric",
  },

  // SEO
  siteUrl: "https://powerelectric.in",
  metaDescription:
    "PowerElectric — Bulk EV supply for fleets, institutions and dealers. Electric scooters, LFP/NMC batteries, chargers and parts. GST billing. Fast dispatch.",
} as const;

export type SiteConfig = typeof siteConfig;
