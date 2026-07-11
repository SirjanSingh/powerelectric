"use client";

import { genericEnquiryUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Phone, Mail, MessageCircle, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
      <div className="container py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="flex items-center justify-center w-7 h-7 text-white" style={{ background: "var(--color-accent)", borderRadius: 2 }}>
              <Zap size={14} strokeWidth={2.5} />
            </span>
            <span style={{ fontFamily: "var(--font-display, 'Barlow Condensed'), sans-serif", fontWeight: 700, fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-text)" }}>
              {siteConfig.businessName}
            </span>
          </div>
          <p className="mb-5 leading-relaxed" style={{ fontFamily: "var(--font-body, 'Barlow'), sans-serif", fontSize: "0.875rem", color: "var(--color-muted)" }}>
            {siteConfig.tagline}. GST billing, bulk pricing, and fleet coordination across India.
          </p>
          <a href={genericEnquiryUrl()} target="_blank" rel="noopener noreferrer" className="btn wa-btn text-sm w-fit">
            <MessageCircle size={14} /> WhatsApp for Quote
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-subtle)" }}>
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2.5">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              { href: "/products?tab=batteries", label: "EV Batteries" },
              { href: "/products?tab=parts", label: "Chargers & Parts" },
              { href: "/contact", label: "Get a Quote" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href}
                  style={{ fontFamily: "var(--font-body, 'Barlow'), sans-serif", fontSize: "0.875rem", color: "var(--color-muted)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-accent)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-muted)")}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-subtle)" }}>
            Contact Us
          </h3>
          <div className="flex flex-col gap-3">
            <a href={`tel:${siteConfig.phoneRaw}`} className="flex items-center gap-2"
              style={{ fontFamily: "var(--font-body, 'Barlow'), sans-serif", fontSize: "0.875rem", color: "var(--color-muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-muted)")}
            >
              <Phone size={13} style={{ color: "var(--color-accent)" }} />
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2"
              style={{ fontFamily: "var(--font-body, 'Barlow'), sans-serif", fontSize: "0.875rem", color: "var(--color-muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-muted)")}
            >
              <Mail size={13} style={{ color: "var(--color-accent)" }} />
              {siteConfig.email}
            </a>
            <p style={{ fontFamily: "var(--font-body, 'Barlow'), sans-serif", fontSize: "0.8rem", color: "var(--color-subtle)", lineHeight: 1.6 }}>
              {siteConfig.address.line1},<br />
              {siteConfig.address.line2},<br />
              {siteConfig.address.city}, {siteConfig.address.state} — {siteConfig.address.pin}
            </p>
            <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", letterSpacing: "0.06em", color: "var(--color-subtle)" }}>
              {siteConfig.hours}
            </p>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="container flex flex-col md:flex-row items-center justify-between gap-2 py-5">
          <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.6rem", letterSpacing: "0.08em", color: "var(--color-subtle)" }}>
            © {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
          </span>
          <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.6rem", letterSpacing: "0.08em", color: "var(--color-subtle)" }}>
            Prototype images are for representation only.
          </span>
        </div>
      </div>
    </footer>
  );
}
