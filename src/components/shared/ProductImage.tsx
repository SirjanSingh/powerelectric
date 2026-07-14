"use client";

import { useState } from "react";
import Image from "next/image";
import type { Category } from "@/data/products";

export const categoryEmoji: Record<Category, string> = {
  scooters: "🛵",
  batteries: "🔋",
  parts: "🔌",
};

/**
 * Product thumbnail with a real fallback state. A load failure must stay
 * visible: the previous `onError` handler set `display:none`, leaving a blank
 * hole because the emoji placeholder sat behind the image at low opacity.
 */
export default function ProductImage({
  src,
  alt,
  category,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  src: string;
  alt: string;
  category: Category;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-1"
        style={{ background: "var(--color-surface-alt-2)" }}
      >
        <span className="text-3xl" aria-hidden="true">
          {categoryEmoji[category]}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.6rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-subtle)",
          }}
        >
          Image unavailable
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain"
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  );
}
