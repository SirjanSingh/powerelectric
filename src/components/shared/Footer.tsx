"use client";

import { genericEnquiryUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Phone, Mail, MessageCircle, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fc] border-t border-[#e7eaf0] mt-0">
      <div className="container py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-bold text-lg text-[#111318] mb-3">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#2f6bff] text-white">
              <Zap size={14} strokeWidth={2.5} />
            </span>
            {siteConfig.businessName}
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            {siteConfig.tagline}. GST billing, bulk pricing, and fleet
            coordination across India.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href={genericEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn wa-btn text-sm w-fit"
            >
              <MessageCircle size={15} /> WhatsApp for Quote
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6b7280] mb-4">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-[#374151]">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              { href: "/products?tab=batteries", label: "EV Batteries" },
              { href: "/products?tab=parts", label: "Chargers & Parts" },
              { href: "/contact", label: "Get a Quote" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-[#2f6bff] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6b7280] mb-4">
            Contact Us
          </h3>
          <div className="flex flex-col gap-3 text-sm text-[#374151]">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="flex items-center gap-2 hover:text-[#2f6bff] transition-colors"
            >
              <Phone size={15} className="text-[#2f6bff]" />
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 hover:text-[#2f6bff] transition-colors"
            >
              <Mail size={15} className="text-[#2f6bff]" />
              {siteConfig.email}
            </a>
            <p className="text-[#6b7280]">
              {siteConfig.address.line1},<br />
              {siteConfig.address.line2},<br />
              {siteConfig.address.city}, {siteConfig.address.state} —{" "}
              {siteConfig.address.pin}
            </p>
            <p className="text-[#6b7280] text-xs">{siteConfig.hours}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e7eaf0] py-5">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[#9ca3af]">
          <span>
            © {new Date().getFullYear()} {siteConfig.businessName}. All rights
            reserved.
          </span>
          <span>Prototype images are for representation only.</span>
        </div>
      </div>
    </footer>
  );
}
