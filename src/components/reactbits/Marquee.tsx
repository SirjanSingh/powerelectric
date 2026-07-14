"use client";

// React-Bits-inspired pattern (MIT-style), re-implemented locally for this
// codebase's light "industrial ledger" aesthetic — no code copied verbatim.

import { useState, type ReactNode } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop */
  duration?: number;
  className?: string;
}

/**
 * Seamless auto-scrolling marquee: renders `children` twice back-to-back and
 * animates a translateX loop from 0 to -50%. Pauses on hover/focus. Falls
 * back to a static (non-scrolling) row under prefers-reduced-motion.
 */
export default function Marquee({ children, duration = 28, className }: MarqueeProps) {
  const prefersReducedMotion = useReducedMotionSafe();
  const [paused, setPaused] = useState(false);

  if (prefersReducedMotion) {
    return (
      <div className={className} style={{ display: "flex", overflowX: "auto" }}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="reactbits-marquee-track"
        style={{
          display: "flex",
          width: "max-content",
          animationDuration: `${duration}s`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <div style={{ display: "flex" }} aria-hidden="false">
          {children}
        </div>
        <div style={{ display: "flex" }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
