"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { MessageCircle, Search, ChevronDown } from "lucide-react";
import {
  products,
  categoryLabels,
  type Category,
  type BestFor,
} from "@/data/products";
import { productEnquiryUrl } from "@/lib/whatsapp";
import Reveal from "@/components/shared/Reveal";

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
      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl bg-[#f8f9fc] border border-[#e7eaf0] w-fit flex-wrap mb-8"
        role="tablist"
        aria-label="Product categories"
      >
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            aria-selected={activeTab === key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === key
                ? "bg-white text-[#2f6bff] shadow-sm border border-[#e7eaf0]"
                : "text-[#6b7280] hover:text-[#111318]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="relative flex items-center">
          <Search size={15} className="absolute left-3 text-[#9ca3af]" />
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-[#e7eaf0] rounded-lg bg-white focus:outline-none focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/20 transition"
            aria-label="Search products"
          />
        </div>
        <div className="relative flex items-center">
          <select
            value={bestFor}
            onChange={(e) => setBestFor(e.target.value as BestFor | "All")}
            className="appearance-none pl-3 pr-8 py-2 text-sm border border-[#e7eaf0] rounded-lg bg-white focus:outline-none focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/20 transition cursor-pointer"
            aria-label="Filter by best for"
          >
            {bestForOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "All" ? "Best For: All" : `Best For: ${opt}`}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2.5 text-[#9ca3af] pointer-events-none"
          />
        </div>
        {(search || bestFor !== "All") && (
          <button
            onClick={() => {
              setSearch("");
              setBestFor("All");
            }}
            className="text-xs text-[#6b7280] hover:text-[#2f6bff] underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-[#9ca3af] mb-5">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#6b7280]">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">No products match your filters.</p>
          <p className="text-sm mt-1">
            Try clearing filters or contact us directly on WhatsApp.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.04}>
              <article className="card flex flex-col h-full">
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
                  <span className="text-3xl z-0">
                    {product.category === "scooters"
                      ? "🛵"
                      : product.category === "batteries"
                        ? "🔋"
                        : "🔌"}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-medium bg-[#dde8ff] text-[#2f6bff] rounded-full px-2 py-0.5">
                      {categoryLabels[product.category]}
                    </span>
                    {product.bestFor.map((bf) => (
                      <span
                        key={bf}
                        className="text-xs text-[#6b7280] bg-[#f8f9fc] border border-[#e7eaf0] rounded-full px-2 py-0.5"
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

                  <div className="flex flex-col gap-1.5 mb-4">
                    {product.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between text-xs border-b border-[#f0f2f7] pb-1"
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
                    <MessageCircle size={14} /> Ask on WhatsApp
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-14 text-xs text-[#9ca3af] text-center max-w-2xl mx-auto border border-[#e7eaf0] rounded-xl p-4 bg-[#f8f9fc]">
        Prototype images are for representation only. Final catalog will use
        authorized product media. Specifications are indicative. Contact us for
        exact datasheet and availability before ordering.
      </p>
    </>
  );
}

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container">
        <Reveal>
          <div className="mb-10">
            <p className="section-label">Catalog</p>
            <h1 className="section-title mt-1">Products &amp; Parts</h1>
            <p className="text-[#6b7280] mt-2 max-w-xl">
              Browse our stock of electric scooters, LFP/NMC battery packs,
              chargers, and parts. All categories available for bulk B2B supply
              with GST billing.
            </p>
          </div>
        </Reveal>

        <Suspense
          fallback={
            <div className="text-[#9ca3af] text-sm">Loading catalog…</div>
          }
        >
          <ProductsGrid />
        </Suspense>
      </div>
    </div>
  );
}
