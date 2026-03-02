"use client";

import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { genericEnquiryUrl } from "@/lib/whatsapp";
import Reveal from "@/components/shared/Reveal";

export default function ContactMap() {
  const hasMapUrl = siteConfig.googleMapsEmbedUrl.length > 0;

  return (
    <section className="section-pad bg-[#f8f9fc]">
      <div className="container">
        <Reveal>
          <div className="text-center mb-12">
            <p className="section-label">Get In Touch</p>
            <h2 className="section-title">We're Here for Bulk Orders</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact card */}
          <Reveal delay={0.05}>
            <div className="card p-8 h-full">
              <h3 className="text-lg font-semibold text-[#111318] mb-6">
                Contact &amp; Hours
              </h3>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href={genericEnquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn wa-btn flex-1 justify-center"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="btn btn-outline flex-1 justify-center"
                >
                  <Phone size={16} /> Call Now
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="btn btn-ghost flex-1 justify-center"
                >
                  <Mail size={16} /> Email
                </a>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-4 text-sm text-[#374151]">
                <div className="flex gap-3">
                  <Phone size={16} className="text-[#2f6bff] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone / WhatsApp</p>
                    <a
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="text-[#6b7280] hover:text-[#2f6bff]"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail size={16} className="text-[#2f6bff] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-[#6b7280] hover:text-[#2f6bff]"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin
                    size={16}
                    className="text-[#2f6bff] shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-[#6b7280]">
                      {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                      {siteConfig.address.city}, {siteConfig.address.state} —{" "}
                      {siteConfig.address.pin}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock size={16} className="text-[#2f6bff] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-[#6b7280]">{siteConfig.hours}</p>
                    <p className="text-[#9ca3af] text-xs mt-0.5">
                      {siteConfig.hoursNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Service area chips */}
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6b7280] mb-2">
                  Service Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="text-xs px-2.5 py-1 bg-[#dde8ff] text-[#2f6bff] rounded-full font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#e7eaf0]">
                <Link
                  href="/contact"
                  className="btn btn-outline w-full justify-center text-sm"
                >
                  Request Bulk Quote →
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.1}>
            <div
              className="rounded-2xl overflow-hidden border border-[#e7eaf0] h-[440px]"
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
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#e8f0fe] gap-3">
                  <MapPin size={36} className="text-[#2f6bff] opacity-50" />
                  <p className="text-sm text-[#6b7280]">
                    Map embed coming soon
                  </p>
                  <p className="text-xs text-[#9ca3af]">
                    Update googleMapsEmbedUrl in src/config/site.ts
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
