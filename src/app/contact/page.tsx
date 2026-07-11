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

const fieldStyle: React.CSSProperties = {
  fontFamily: "var(--font-body, 'Barlow'), sans-serif",
  fontSize: "0.875rem",
  color: "var(--color-text)",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 2,
  outline: "none",
  width: "100%",
  padding: "10px 12px",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono, monospace)",
  fontSize: "0.6rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--color-subtle)",
  display: "block",
  marginBottom: 6,
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--color-border)" }}>
      <button
        className="flex items-center justify-between w-full py-4 text-left gap-4 group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <span
          style={{
            fontFamily: "var(--font-body, 'Barlow'), sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: open ? "var(--color-accent)" : "var(--color-text)",
            transition: "color 0.2s",
          }}
        >
          {q}
        </span>
        {open ? (
          <ChevronUp size={15} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
        ) : (
          <ChevronDown size={15} style={{ color: "var(--color-subtle)", flexShrink: 0 }} />
        )}
      </button>
      {open && (
        <p
          className="pb-4"
          style={{
            fontFamily: "var(--font-body, 'Barlow'), sans-serif",
            fontSize: "0.875rem",
            color: "var(--color-muted-2)",
            lineHeight: 1.65,
          }}
        >
          {a}
        </p>
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

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)");
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)");

  return (
    <div
      className="pt-24 pb-20"
      style={{ background: "var(--color-bg)", minHeight: "100vh" }}
    >
      <div className="container">
        <Reveal>
          <div className="mb-12">
            <p className="section-label mb-2">Request a Quote</p>
            <h1 className="section-title">Get a Bulk Quote</h1>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                fontSize: "1rem",
                color: "var(--color-muted-2)",
                maxWidth: 480,
                lineHeight: 1.65,
              }}
            >
              Fill in your requirement below and we&apos;ll open WhatsApp with a
              pre-filled message for rapid follow-up. No backend, no delays.
            </p>
          </div>
        </Reveal>

        {/* Contact method strip */}
        <Reveal delay={0.04}>
          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href={genericEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn wa-btn"
            >
              <MessageCircle size={15} /> WhatsApp: {siteConfig.phone}
            </a>
            <a href={`tel:${siteConfig.phoneRaw}`} className="btn btn-outline">
              <Phone size={15} /> {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="btn btn-ghost">
              <Mail size={15} /> {siteConfig.email}
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Quote form */}
          <Reveal delay={0.04}>
            <div style={{ border: "1px solid var(--color-border)", background: "var(--color-surface-alt)" }}>
              {/* form header */}
              <div
                className="px-7 py-4"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                  }}
                >
                  Bulk Quote Request
                </span>
              </div>

              <div className="px-7 py-6">
                {submitted ? (
                  <div className="py-10 text-center">
                    <p
                      style={{
                        fontFamily:
                          "var(--font-display, 'Barlow Condensed'), sans-serif",
                        fontSize: "2rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: "var(--color-success)",
                        marginBottom: 8,
                      }}
                    >
                      WhatsApp Opened
                    </p>
                    <p
                      className="mb-6"
                      style={{
                        fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                        fontSize: "0.875rem",
                        color: "var(--color-muted-2)",
                      }}
                    >
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
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" style={labelStyle}>
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
                          style={fieldStyle}
                          onFocus={focusBorder}
                          onBlur={blurBorder}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" style={labelStyle}>
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
                          style={fieldStyle}
                          onFocus={focusBorder}
                          onBlur={blurBorder}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="city" style={labelStyle}>
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
                          style={fieldStyle}
                          onFocus={focusBorder}
                          onBlur={blurBorder}
                        />
                      </div>
                      <div>
                        <label htmlFor="quantity" style={labelStyle}>
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
                          style={fieldStyle}
                          onFocus={focusBorder}
                          onBlur={blurBorder}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="category" style={labelStyle}>
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={form.category}
                        onChange={handleChange}
                        style={{ ...fieldStyle, cursor: "pointer" }}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      >
                        {categories.map((c) => (
                          <option
                            key={c}
                            value={c}
                            style={{ background: "var(--color-surface-alt)", color: "var(--color-text)" }}
                          >
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" style={labelStyle}>
                        Additional Details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Specific model preference, delivery timeline, payment terms, etc."
                        style={{ ...fieldStyle, resize: "none" }}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn wa-btn justify-center mt-1"
                    >
                      <MessageCircle size={15} /> Send via WhatsApp
                    </button>

                    <p
                      className="text-center"
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.08em",
                        color: "var(--color-subtle)",
                      }}
                    >
                      Submitting opens WhatsApp with a pre-filled message. No
                      data is stored.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Reveal>

          {/* Right col: map + address + FAQ */}
          <div className="flex flex-col gap-6">
            {/* Map */}
            <Reveal delay={0.08}>
              <div
                className="overflow-hidden"
                style={{ border: "1px solid var(--color-border)", height: 256 }}
              >
                {hasMapUrl ? (
                  <iframe
                    src={siteConfig.googleMapsEmbedUrl}
                    title="PowerElectric location map"
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      filter: "invert(0.9) hue-rotate(180deg)",
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-2"
                    style={{ background: "var(--color-surface-alt)" }}
                  >
                    <MapPin
                      size={24}
                      style={{ color: "var(--color-accent)", opacity: 0.35 }}
                    />
                    <p
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-subtle)",
                      }}
                    >
                      Update googleMapsEmbedUrl in src/config/site.ts
                    </p>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Address + hours */}
            <Reveal delay={0.1}>
              <div
                style={{ border: "1px solid var(--color-border)", background: "var(--color-surface-alt)" }}
              >
                <div
                  className="flex gap-3 px-5 py-4"
                  style={{ borderBottom: "1px solid var(--color-border)" }}
                >
                  <MapPin
                    size={14}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                      fontSize: "0.875rem",
                      color: "var(--color-muted-2)",
                    }}
                  >
                    {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                    {siteConfig.address.city} — {siteConfig.address.pin}
                  </p>
                </div>
                <div className="flex gap-3 px-5 py-4">
                  <Clock
                    size={14}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                      fontSize: "0.875rem",
                      color: "var(--color-muted-2)",
                    }}
                  >
                    {siteConfig.hours}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* FAQ */}
            <Reveal delay={0.12}>
              <div
                style={{ border: "1px solid var(--color-border)", background: "var(--color-surface-alt)" }}
              >
                <div
                  className="px-6 py-4"
                  style={{ borderBottom: "1px solid var(--color-border)" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                    }}
                  >
                    Common Questions
                  </span>
                </div>
                <div className="px-6 pb-2">
                  {faqs.map((faq) => (
                    <FAQItem key={faq.q} {...faq} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
