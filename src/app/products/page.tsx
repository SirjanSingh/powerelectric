"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Search, ChevronDown } from "lucide-react";
import {
  products,
  categoryLabels,
  type Category,
  type BestFor,
} from "@/data/products";
import { productEnquiryUrl } from "@/lib/whatsapp";
import Reveal from "@/components/shared/Reveal";
import ProductImage from "@/components/shared/ProductImage";
import ProductGridSkeleton from "@/components/shared/ProductGridSkeleton";
import { trackWhatsAppClick } from "@/lib/analytics";

const tabs: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All Products" },
  { key: "scooters", label: "Electric Scooters" },
  { key: "batteries", label: "EV Batteries" },
  { key: "parts", label: "Chargers & Parts" },
];

const bestForOptions: (BestFor | "All")[] = [
  "All",
  "Fleet",
  "Delivery",
  "Commuter",
  "Replacement",
  "Universal",
  "Campus",
  "Industrial",
];

/* shared input style */
const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-body, 'Barlow'), sans-serif",
  fontSize: "0.875rem",
  color: "var(--color-text)",
  background: "var(--color-surface-alt)",
  border: "1px solid var(--color-border)",
  borderRadius: 2,
  outline: "none",
  transition: "border-color 0.2s",
};

function ProductsGrid() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Category) || "all";

  const [activeTab, setActiveTab] = useState<Category | "all">(initialTab);
  const [search, setSearch] = useState("");
  const [bestFor, setBestFor] = useState<BestFor | "All">("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchTab = activeTab === "all" || p.category === activeTab;
      const matchBestFor =
        bestFor === "All" || p.bestFor.includes(bestFor as BestFor);
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.specs.some((s) => s.value.toLowerCase().includes(q));
      return matchTab && matchBestFor && matchSearch;
    });
  }, [activeTab, search, bestFor]);

  return (
    <>
      {/* Tab rail */}
      <div
        className="flex border border-[var(--color-border)] mb-8 w-fit"
        role="tablist"
        aria-label="Product categories"
      >
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            aria-selected={activeTab === key}
            onClick={() => setActiveTab(key)}
            className="px-5 py-2.5 transition-all"
            style={{
              fontFamily: "var(--font-body, 'Barlow'), sans-serif",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: activeTab === key ? "var(--color-surface)" : "var(--color-muted-2)",
              background: activeTab === key ? "var(--color-accent)" : "transparent",
              borderTop: "none",
              borderBottom: "none",
              borderLeft: "none",
              borderRight: key !== "parts" ? "1px solid var(--color-border)" : "none",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="relative flex items-center">
          <Search
            size={13}
            className="absolute left-3 pointer-events-none"
            style={{ color: "var(--color-subtle)" }}
          />
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2"
            style={{ ...inputStyle }}
            aria-label="Search products"
            onFocus={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)")
            }
            onBlur={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)")
            }
          />
        </div>
        <div className="relative flex items-center">
          <select
            value={bestFor}
            onChange={(e) => setBestFor(e.target.value as BestFor | "All")}
            className="appearance-none pl-3 pr-8 py-2"
            style={{ ...inputStyle, cursor: "pointer" }}
            aria-label="Filter by best for"
          >
            {bestForOptions.map((opt) => (
              <option
                key={opt}
                value={opt}
                style={{ background: "var(--color-surface-alt)", color: "var(--color-text)" }}
              >
                {opt === "All" ? "Best For: All" : `Best For: ${opt}`}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className="absolute right-2.5 pointer-events-none"
            style={{ color: "var(--color-subtle)" }}
          />
        </div>
        {(search || bestFor !== "All") && (
          <button
            onClick={() => {
              setSearch("");
              setBestFor("All");
            }}
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      <p
        className="mb-5"
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-subtle)",
        }}
      >
        {filtered.length} SKU{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p
            style={{
              fontFamily: "var(--font-display, 'Barlow Condensed'), sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--color-muted-2)",
              marginBottom: 8,
            }}
          >
            No Products Match
          </p>
          <p
            style={{
              fontFamily: "var(--font-body, 'Barlow'), sans-serif",
              fontSize: "0.875rem",
              color: "var(--color-subtle)",
            }}
          >
            Try clearing filters or contact us directly on WhatsApp.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
          {filtered.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.03}>
              <article
                className="flex flex-col h-full"
                style={{ background: "var(--color-surface)" }}
              >
                {/* image */}
                <div
                  className="relative h-44 flex items-center justify-center overflow-hidden p-4"
                  style={{
                    background: "var(--color-surface-alt-2)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
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
                  {/* best-for tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {product.bestFor.map((bf) => (
                      <span
                        key={bf}
                        className="px-2 py-0.5"
                        style={{
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--color-muted-2)",
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
                    style={{
                      fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                      fontSize: "0.8rem",
                      color: "var(--color-muted-2)",
                    }}
                  >
                    {product.shortDesc}
                  </p>

                  {/* specs */}
                  <div
                    className="mb-4 flex-1"
                    style={{ borderTop: "1px solid var(--color-border)" }}
                  >
                    {product.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between py-1.5"
                        style={{ borderBottom: "1px solid var(--color-border)" }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "0.6rem",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--color-subtle)",
                          }}
                        >
                          {spec.label}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "0.7rem",
                            color: "var(--color-text)",
                            fontWeight: 500,
                          }}
                        >
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={productEnquiryUrl(product.name)}
                    onClick={() =>
                      trackWhatsAppClick("product_card", { product: product.name })
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn wa-btn text-sm justify-center"
                  >
                    <MessageCircle size={14} /> Ask on WhatsApp
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <p
        className="mt-14 text-center mx-auto px-5 py-4"
        style={{
          maxWidth: 560,
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.6rem",
          letterSpacing: "0.07em",
          color: "var(--color-subtle)",
          border: "1px solid var(--color-border)",
          background: "var(--color-surface-alt)",
        }}
      >
        Product images are representative. Specifications are indicative —
        contact us on WhatsApp for the exact datasheet, current stock, warranty
        and GST invoice details before ordering.
      </p>
    </>
  );
}

export default function ProductsPage() {
  return (
    <div
      className="pt-24 pb-20"
      style={{ background: "var(--color-bg)", minHeight: "100vh" }}
    >
      <div className="container">
        <Reveal>
          <div className="mb-10">
            <p className="section-label mb-2">Catalog</p>
            <h1 className="section-title">Products &amp; Parts</h1>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                fontSize: "1rem",
                color: "var(--color-muted-2)",
                maxWidth: 520,
                lineHeight: 1.65,
              }}
            >
              Browse our stock of electric scooters, LFP/NMC battery packs,
              chargers, and parts. All categories available for bulk B2B supply
              with GST billing.
            </p>
          </div>
        </Reveal>

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductsGrid />
        </Suspense>
      </div>
    </div>
  );
}
