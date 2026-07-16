import { siteConfig } from "@/config/site";

/**
 * Build a WhatsApp click-to-chat URL with an optional prefilled message.
 */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Default greeting for generic enquiry */
export function genericEnquiryUrl(): string {
  return buildWhatsAppUrl(
    "Hi Power Electric India, I'd like to get more information about your EV products and bulk pricing.",
  );
}

/** Product-specific enquiry for the product catalog */
export function productEnquiryUrl(productName: string): string {
  return buildWhatsAppUrl(
    `Hi Power Electric India, I'm interested in bulk pricing for *${productName}*.\n` +
      `Quantity: __\nCity: __\n\nPlease share quote, availability, warranty and GST invoice details.`,
  );
}

/** Structured bulk quote from the contact form */
export interface QuoteFormData {
  name: string;
  phone: string;
  city: string;
  category: string;
  quantity: string;
  message: string;
}

export function quoteFormUrl(data: QuoteFormData): string {
  const text =
    `*Bulk Quote Request — Power Electric India*\n\n` +
    `Name: ${data.name}\n` +
    `Phone: ${data.phone}\n` +
    `City: ${data.city}\n` +
    `Category: ${data.category}\n` +
    `Quantity: ${data.quantity}\n` +
    `Message: ${data.message || "—"}`;
  return buildWhatsAppUrl(text);
}

/** Configured scooter build from the /configure 3D configurator */
export interface ConfiguredQuote {
  model: string;
  color: string;
  battery: "LFP" | "NMC";
  qty: number;
  city?: string;
}

export function configuredQuoteUrl(config: ConfiguredQuote): string {
  const text =
    `*Scooter Quote Request — Power Electric India*\n\n` +
    `Model: ${config.model}\n` +
    `Color: ${config.color}\n` +
    `Battery: ${config.battery}\n` +
    `Quantity: ${config.qty} units\n` +
    (config.city ? `City: ${config.city}\n` : "") +
    `\nPlease share pricing, availability and GST invoice details for this build.`;
  return buildWhatsAppUrl(text);
}
