"use client";

import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { productEnquiryUrl } from "@/lib/whatsapp";
import { categoryLabels } from "@/data/products";
import Reveal from "@/components/shared/Reveal";
import ProductImage from "@/components/shared/ProductImage";
import TiltedCard from "@/components/reactbits/TiltedCard";

const featured = products.slice(0, 6);


export default function FeaturedProducts() {
  return (
    <section className="section-pad" style={{ background: "var(--color-bg)" }}>
      <div className="container">
        <Reveal>
          <div className="mb-12">
            <p className="section-label mb-2">Catalog Highlights</p>
            <h2 className="section-title">Featured for Bulk Orders</h2>
            <p className="section-sub">
              Popular SKUs across scooters, batteries, and parts. Contact us for
              full catalog and fleet pricing.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06} className="h-full">
              <TiltedCard className="h-full" style={{ display: "block" }}>
              <article className="flex flex-col h-full" style={{ background: "var(--color-surface)" }}>
                {/* image */}
                <div
                  className="relative h-44 flex items-center justify-center overflow-hidden p-4"
                  style={{ background: "var(--color-surface-alt-2)", borderBottom: "1px solid var(--color-border)" }}
                >
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    category={product.category}
                  />
                  <span
                    className="absolute top-3 left-3 px-2 py-0.5"
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                      background: "color-mix(in srgb, var(--color-surface) 90%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)",
                    }}
                  >
                    {categoryLabels[product.category]}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {product.bestFor.slice(0, 2).map((bf) => (
                      <span
                        key={bf}
                        className="px-2 py-0.5"
                        style={{
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--color-subtle)",
                          border: "1px solid var(--color-border)",
                        }}
                      >
                        {bf}
                      </span>
                    ))}
                  </div>

                  <h3
                    className="mb-1 card-title"
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="mb-4 leading-relaxed line-clamp-2"
                    style={{ fontFamily: "var(--font-body, 'Barlow'), sans-serif", fontSize: "0.8rem", color: "var(--color-muted)" }}
                  >
                    {product.shortDesc}
                  </p>

                  <div className="mb-4" style={{ borderTop: "1px solid var(--color-border)" }}>
                    {product.specs.slice(0, 2).map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between py-1.5"
                        style={{ borderBottom: "1px solid var(--color-border)" }}
                      >
                        <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-subtle)" }}>
                          {spec.label}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", color: "var(--color-text)", fontWeight: 500 }}>
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
                    <MessageCircle size={14} /> Ask Price
                  </a>
                </div>
              </article>
              </TiltedCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div
            className="flex items-center justify-between mt-px px-6 py-4"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderTop: "none" }}
          >
            <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-subtle)" }}>
              {products.length} SKUs in catalog — full list on products page
            </p>
            <Link
              href="/products"
              className="flex items-center gap-1.5"
              style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent)", textDecoration: "none" }}
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
