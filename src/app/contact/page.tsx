"use client";

import { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  genericEnquiryUrl,
  quoteFormUrl,
  type QuoteFormData,
} from "@/lib/whatsapp";
import Reveal from "@/components/shared/Reveal";

const faqs = [
  {
    q: "What is the minimum order quantity (MOQ)?",
    a: "For electric scooters, the MOQ is 5 units. For batteries and parts, the MOQ starts at 10 units. We can discuss lower quantities for dealer trials — contact us on WhatsApp to check eligibility.",
  },
  {
    q: "Do you provide GST invoices?",
    a: "Yes. All orders include a proper GST tax invoice with HSN codes. We are a GST-registered entity. Invoice is shared along with dispatch details.",
  },
  {
    q: "What are the payment terms?",
    a: "Standard terms are 50% advance with order confirmation and 50% before dispatch. For repeat bulk buyers, we can discuss extended credit terms after initial orders.",
  },
  {
    q: "How long does dispatch take after order confirmation?",
    a: "For in-stock items, dispatch typically happens within 3–5 working days. Custom or high-volume orders may require 7–15 days. We will communicate timelines clearly before you confirm.",
  },
  {
    q: "How is warranty handled?",
    a: "Products carry manufacturer warranty as specified per SKU (typically 6 months to 2 years for batteries, 1 year for scooters). We act as the coordination point between you and the manufacturer for warranty claims.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e7eaf0] last:border-0">
      <button
        className="flex items-center justify-between w-full py-4 text-left gap-4 group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-[#111318] group-hover:text-[#2f6bff] transition-colors">
          {q}
        </span>
        {open ? (
          <ChevronUp size={16} className="text-[#2f6bff] shrink-0" />
        ) : (
          <ChevronDown
            size={16}
            className="text-[#9ca3af] shrink-0 group-hover:text-[#2f6bff] transition-colors"
          />
        )}
      </button>
      {open && (
        <p className="pb-4 text-sm text-[#6b7280] leading-relaxed">{a}</p>
      )}
    </div>
  );
}

const categories = [
  "Electric Scooters",
  "EV Batteries",
  "Chargers & Parts",
  "Other / General",
];

export default function ContactPage() {
  const [form, setForm] = useState<QuoteFormData>({
    name: "",
    phone: "",
    city: "",
    category: categories[0],
    quantity: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = quoteFormUrl(form);
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  const hasMapUrl = siteConfig.googleMapsEmbedUrl.length > 0;

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="section-label">Request a Quote</p>
            <h1 className="section-title">Get a Bulk Quote</h1>
            <p className="text-[#6b7280] max-w-xl mx-auto mt-2">
              Fill in your requirement below and we'll open WhatsApp with a
              pre-filled message for rapid follow-up. No backend, no delays.
            </p>
          </div>
        </Reveal>

        {/* Contact methods row */}
        <Reveal delay={0.05}>
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            <a
              href={genericEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn wa-btn"
            >
              <MessageCircle size={16} /> WhatsApp: {siteConfig.phone}
            </a>
            <a href={`tel:${siteConfig.phoneRaw}`} className="btn btn-outline">
              <Phone size={16} /> {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="btn btn-ghost">
              <Mail size={16} /> {siteConfig.email}
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Quote form */}
          <Reveal delay={0.05}>
            <div className="card p-8">
              <h2 className="text-lg font-semibold text-[#111318] mb-6">
                Bulk Quote Request
              </h2>
              {submitted ? (
                <div className="py-10 text-center">
                  <p className="text-4xl mb-3">✅</p>
                  <p className="font-semibold text-[#111318]">
                    WhatsApp opened!
                  </p>
                  <p className="text-sm text-[#6b7280] mt-1 mb-6">
                    Your message has been pre-filled. Send it to connect with
                    us.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-outline text-sm"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-[#374151] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-3 py-2.5 text-sm border border-[#e7eaf0] rounded-lg focus:outline-none focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/20 transition"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-medium text-[#374151] mb-1.5"
                      >
                        Phone *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2.5 text-sm border border-[#e7eaf0] rounded-lg focus:outline-none focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/20 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-xs font-medium text-[#374151] mb-1.5"
                      >
                        City / Location *
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Delhi, Mumbai…"
                        className="w-full px-3 py-2.5 text-sm border border-[#e7eaf0] rounded-lg focus:outline-none focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/20 transition"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="quantity"
                        className="block text-xs font-medium text-[#374151] mb-1.5"
                      >
                        Quantity *
                      </label>
                      <input
                        id="quantity"
                        name="quantity"
                        type="text"
                        required
                        value={form.quantity}
                        onChange={handleChange}
                        placeholder="e.g. 20 units"
                        className="w-full px-3 py-2.5 text-sm border border-[#e7eaf0] rounded-lg focus:outline-none focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/20 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-xs font-medium text-[#374151] mb-1.5"
                    >
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={form.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-sm border border-[#e7eaf0] rounded-lg focus:outline-none focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/20 transition bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-[#374151] mb-1.5"
                    >
                      Additional Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Specific model preference, delivery timeline, payment terms, etc."
                      className="w-full px-3 py-2.5 text-sm border border-[#e7eaf0] rounded-lg focus:outline-none focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/20 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn wa-btn justify-center mt-1"
                  >
                    <MessageCircle size={16} /> Send via WhatsApp
                  </button>

                  <p className="text-xs text-[#9ca3af] text-center">
                    Submitting opens WhatsApp with a pre-filled message. No data
                    is stored.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* Map + info + FAQ */}
          <div className="flex flex-col gap-6">
            {/* Map */}
            <Reveal delay={0.1}>
              <div
                className="rounded-2xl overflow-hidden border border-[#e7eaf0] h-64"
                style={{ boxShadow: "var(--shadow-md)" }}
              >
                {hasMapUrl ? (
                  <iframe
                    src={siteConfig.googleMapsEmbedUrl}
                    title="PowerElectric location map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#e8f0fe] gap-2">
                    <MapPin size={28} className="text-[#2f6bff] opacity-40" />
                    <p className="text-sm text-[#6b7280]">
                      Update googleMapsEmbedUrl in src/config/site.ts
                    </p>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Address + hours */}
            <Reveal delay={0.12}>
              <div className="card p-6 flex flex-col gap-3 text-sm">
                <div className="flex gap-3">
                  <MapPin
                    size={16}
                    className="text-[#2f6bff] shrink-0 mt-0.5"
                  />
                  <p className="text-[#374151]">
                    {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                    {siteConfig.address.city} — {siteConfig.address.pin}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Clock size={16} className="text-[#2f6bff] shrink-0 mt-0.5" />
                  <p className="text-[#374151]">{siteConfig.hours}</p>
                </div>
              </div>
            </Reveal>

            {/* FAQ */}
            <Reveal delay={0.14}>
              <div className="card p-6">
                <h2 className="text-base font-semibold text-[#111318] mb-4">
                  Common Questions
                </h2>
                {faqs.map((faq) => (
                  <FAQItem key={faq.q} {...faq} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
