"use client";

import Image from "next/image";
import Reveal from "@/components/shared/Reveal";

export default function GalleryBand() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Waves background at low opacity */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/waves-bg.png"
          alt=""
          fill
          className="object-cover opacity-[0.04]"
          aria-hidden="true"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0f5ff]/80 to-[#f0f5ff]/60" />
      </div>

      <div className="container relative z-10">
        <Reveal>
          <div className="text-center mb-10">
            <p className="section-label">Fleet Ready</p>
            <h2 className="section-title">Purpose-Built for Commercial Use</h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative rounded-2xl overflow-hidden border border-[#e7eaf0] mx-auto max-w-4xl"
            style={{
              boxShadow:
                "0 16px 48px rgba(47,107,255,0.10), 0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div className="relative h-72 md:h-96 bg-gradient-to-br from-[#e8f0fe] to-[#dde8ff] flex items-center justify-center">
              <Image
                src="/assets/scooter-lineup.png"
                alt="Electric scooter lineup for bulk fleet supply"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              {/* Fallback */}
              <div className="z-0 text-center pointer-events-none">
                <p className="text-5xl mb-3">🛵🛵🛵</p>
                <p className="text-sm text-[#6b7280]">scooter-lineup.png</p>
              </div>
            </div>
            <div className="px-6 py-4 bg-white/90 backdrop-blur-sm border-t border-[#e7eaf0] text-center">
              <p className="text-xs text-[#9ca3af]">
                Representative models. Final catalog can include your exact
                SKUs. Contact us for OEM sourcing.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
