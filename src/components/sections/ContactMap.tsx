"use client";

import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { genericEnquiryUrl } from "@/lib/whatsapp";
import Reveal from "@/components/shared/Reveal";

const contactRows = [
  { icon: Phone, label: "Phone / WhatsApp", value: siteConfig.phone, href: `tel:${siteConfig.phoneRaw}` },
  { icon: Mail,  label: "Email",            value: siteConfig.email,  href: `mailto:${siteConfig.email}` },
  { icon: Clock, label: "Hours",            value: siteConfig.hours,  href: null },
];

export default function ContactMap() {
  const hasMapUrl = siteConfig.googleMapsEmbedUrl.length > 0;

  return (
    <section className="section-pad" style={{ background: "var(--color-bg)" }}>
      <div className="container">
        <Reveal>
          <div className="mb-12">
            <p className="section-label mb-2">Get In Touch</p>
            <h2 className="section-title">We&apos;re Here for Bulk Orders</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* contact panel */}
          <Reveal delay={0.04}>
            <div style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-sm)" }}>
              <div className="px-7 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--color-border)" }}>
                <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                  Contact &amp; Hours
                </span>
                <span className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--color-muted)" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-green)", display: "inline-block" }} aria-hidden="true" />
                  AVAILABLE
                </span>
              </div>

              <div className="px-7 py-5 flex flex-col sm:flex-row gap-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
                <a href={genericEnquiryUrl()} target="_blank" rel="noopener noreferrer" className="btn wa-btn flex-1 justify-center">
                  <MessageCircle size={15} /> WhatsApp
                </a>
                <a href={`tel:${siteConfig.phoneRaw}`} className="btn btn-outline flex-1 justify-center">
                  <Phone size={15} /> Call Now
                </a>
                <a href={`mailto:${siteConfig.email}`} className="btn btn-ghost flex-1 justify-center">
                  <Mail size={15} /> Email
                </a>
              </div>

              {contactRows.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4 px-7 py-4" style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <Icon size={14} className="shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }} />
                  <div>
                    <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-subtle)", marginBottom: 3 }}>
                      {label}
                    </p>
                    {href ? (
                      <a href={href} style={{ fontFamily: "var(--font-body, 'Barlow'), sans-serif", fontSize: "0.875rem", color: "var(--color-text)", textDecoration: "none" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-accent)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text)")}
                      >
                        {value}
                      </a>
                    ) : (
                      <p style={{ fontFamily: "var(--font-body, 'Barlow'), sans-serif", fontSize: "0.875rem", color: "var(--color-text)" }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex gap-4 px-7 py-4" style={{ borderBottom: "1px solid var(--color-border)" }}>
                <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }} />
                <p style={{ fontFamily: "var(--font-body, 'Barlow'), sans-serif", fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.6 }}>
                  {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                  {siteConfig.address.city}, {siteConfig.address.state} — {siteConfig.address.pin}
                </p>
              </div>

              <div className="px-7 py-5" style={{ borderBottom: "1px solid var(--color-border)" }}>
                <p className="mb-3" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-subtle)" }}>
                  Service Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.serviceAreas.map((area) => (
                    <span key={area} className="px-2.5 py-1"
                      style={{ fontFamily: "var(--font-body, 'Barlow'), sans-serif", fontSize: "0.75rem", color: "var(--color-accent)", border: "1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)", background: "color-mix(in srgb, var(--color-accent) 5%, transparent)" }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-7 py-5">
                <Link href="/contact" className="btn btn-outline w-full justify-center text-sm">
                  Request Bulk Quote →
                </Link>
              </div>
            </div>
          </Reveal>

          {/* map */}
          <Reveal delay={0.08}>
            <div className="overflow-hidden" style={{ border: "1px solid var(--color-border)", height: 440, boxShadow: "var(--shadow-sm)" }}>
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
                <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: "var(--color-surface-alt)" }}>
                  <MapPin size={32} style={{ color: "var(--color-accent)", opacity: 0.3 }} />
                  <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-subtle)" }}>
                    Map embed coming soon
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
