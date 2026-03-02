"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
  BadgeDollarSign,
  FileCheck2,
} from "lucide-react";
import { genericEnquiryUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

const trustChips = [
  { icon: FileCheck2, label: "GST Billing" },
  { icon: BadgeDollarSign, label: "Bulk Pricing" },
  { icon: ShieldCheck, label: "Warranty Support" },
];

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    if (mq.matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${dx * 10}px, ${dy * 10}px)`;
      }
      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${dx * 4}px, ${dy * 4}px)`;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center pt-20 pb-10 overflow-hidden bg-white">
      {/* Subtle background gradient */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
        style={{ willChange: "transform" }}
      >
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #2f6bff 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #2f6bff 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <p className="section-label mb-3">
              Bulk EV Supply • Fleet &amp; Dealer Orders
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#111318] leading-[1.08] mb-5">
              Electric Vehicles <br />
              <span className="text-[#2f6bff]">At Scale.</span>
            </h1>
            <p className="text-lg text-[#6b7280] mb-7 max-w-xl">
              {siteConfig.businessName} supplies electric scooters, LFP/NMC
              battery packs, and EV parts for fleets, institutions, and reseller
              dealers — with GST billing, verified supply, and rapid dispatch.
            </p>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {trustChips.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#374151] bg-[#f8f9fc] border border-[#e7eaf0] rounded-full px-3 py-1.5"
                >
                  <Icon size={14} className="text-[#2f6bff]" />
                  {label}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href={genericEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn wa-btn"
              >
                <MessageCircle size={17} />
                WhatsApp for Quote
              </a>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="btn btn-outline"
              >
                <Phone size={17} />
                Call Now
              </a>
            </div>

            <p className="text-xs text-[#9ca3af] flex items-center gap-1">
              <Truck size={12} />
              Bulk supply. Fleet and dealer orders. Minimum 5 units.
            </p>
          </div>

          {/* Right: Hero image with glow */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative w-full max-w-[480px] transition-transform duration-500 ease-out"
              style={{ willChange: "transform" }}
            >
              {/* Glow ring */}
              <div
                className="absolute inset-4 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(47,107,255,0.15) 0%, transparent 70%)",
                  animation: reducedMotion
                    ? "none"
                    : "glowPulse 4s ease-in-out infinite",
                  filter: "blur(20px)",
                }}
              />
              {/* Image container */}
              <div
                className="relative rounded-3xl overflow-hidden border border-[#e7eaf0]"
                style={{
                  boxShadow:
                    "0 24px 64px rgba(47,107,255,0.12), 0 8px 24px rgba(0,0,0,0.08)",
                }}
              >
                <Image
                  src="/assets/scootyimg.png"
                  alt="Premium electric scooter for bulk fleet orders"
                  width={560}
                  height={420}
                  priority
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    // Graceful fallback: hide the img src and show placeholder
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
                {/* Fallback shown when image fails */}
                <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#e8f0fe] min-h-[320px]">
                  <span className="text-6xl mb-3">⚡</span>
                  <p className="text-sm text-[#6b7280]">scootyimg.png</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
