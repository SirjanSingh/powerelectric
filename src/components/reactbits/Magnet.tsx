"use client";

// React-Bits-inspired pattern (MIT-style), re-implemented locally for this
// codebase's light "industrial ledger" aesthetic — no code copied verbatim.

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

interface MagnetProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** How far the element can be pulled, in px */
  strength?: number;
}

/**
 * Subtly attracts the wrapped element toward the cursor on hover, snapping
 * back with a spring on mouse-leave. No-ops under prefers-reduced-motion.
 */
export default function Magnet({ children, className, style, strength = 10 }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotionSafe();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  if (prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
