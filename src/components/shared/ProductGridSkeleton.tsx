/**
 * Loading placeholder for the product catalog. Mirrors the real card's shape
 * (image band, tag row, title, spec rows, CTA) so the grid doesn't reflow when
 * the catalog resolves.
 */
export default function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
      style={{ background: "var(--color-border)" }}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col h-full"
          style={{ background: "var(--color-surface)" }}
        >
          <div
            className="h-44 skeleton-shimmer"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          />
          <div className="flex flex-col gap-3 p-5">
            <div className="skeleton-shimmer" style={{ height: 16, width: "40%" }} />
            <div className="skeleton-shimmer" style={{ height: 20, width: "70%" }} />
            <div className="skeleton-shimmer" style={{ height: 12, width: "100%" }} />
            <div className="skeleton-shimmer" style={{ height: 12, width: "85%" }} />
            <div className="skeleton-shimmer" style={{ height: 40, width: "100%", marginTop: 8 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
