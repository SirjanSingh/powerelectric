"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { products } from "@/data/products";
import { productEnquiryUrl } from "@/lib/whatsapp";
import { categoryLabels } from "@/data/products";
import Reveal from "@/components/shared/Reveal";

// Show first 6 products for featured section
const featured = products.slice(0, 6);

export default function FeaturedProducts() {
  return (
    <section className="section-pad bg-[#f8f9fc]">
      <div className="container">
        <Reveal>
          <div className="text-center mb-12">
            <p className="section-label">Catalog Highlights</p>
            <h2 className="section-title">Featured for Bulk Orders</h2>
            <p className="section-sub mx-auto">
              Popular SKUs across scooters, batteries, and parts. Contact us for
              full catalog and fleet pricing.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.07}>
              <article className="card flex flex-col h-full">
                {/* Product image */}
                <div className="relative h-40 bg-gradient-to-br from-[#f0f4ff] to-[#e8f0fe] flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {/* Fallback */}
                  <span className="text-3xl z-0">
                    {product.category === "scooters"
                      ? "🛵"
                      : product.category === "batteries"
                        ? "🔋"
                        : "🔌"}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* Tags */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="inline-block text-xs font-medium bg-[#dde8ff] text-[#2f6bff] rounded-full px-2 py-0.5">
                      {categoryLabels[product.category]}
                    </span>
                    {product.bestFor.slice(0, 1).map((bf) => (
                      <span
                        key={bf}
                        className="inline-block text-xs text-[#6b7280] bg-[#f8f9fc] border border-[#e7eaf0] rounded-full px-2 py-0.5"
                      >
                        {bf}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-base font-semibold text-[#111318] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#6b7280] mb-3 leading-relaxed line-clamp-2">
                    {product.shortDesc}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-col gap-1 mb-4">
                    {product.specs.slice(0, 2).map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between text-xs"
                      >
                        <span className="text-[#9ca3af]">{spec.label}</span>
                        <span className="font-medium text-[#374151]">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={productEnquiryUrl(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn wa-btn mt-auto text-sm justify-center"
                  >
                    <MessageCircle size={14} /> Ask Price on WhatsApp
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
