"use client";

// React-Bits-inspired pattern (MIT-style), re-implemented locally for this
// codebase's light "industrial ledger" aesthetic — no code copied verbatim.

import { useRef, useState, type ReactNode, type CSSProperties } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Radius of the glow in px */
  radius?: number;
}

/**
 * Wraps children in a container that renders a soft radial accent glow
 * following the cursor — a light-theme "spotlight" rather than a dark-mode
 * white glow. No-ops (glow never renders) under prefers-reduced-motion.
 */
export default function SpotlightCard({
  children,
  className,
  style,
  radius = 220,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const prefersReducedMotion = useReducedMotionSafe();

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", ...style }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !prefersReducedMotion && setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity,
            transition: "opacity 0.3s ease",
            background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, color-mix(in srgb, var(--color-accent-bright) 12%, transparent), transparent 70%)`,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>{children}</div>
    </div>
  );
}
