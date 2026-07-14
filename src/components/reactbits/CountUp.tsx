"use client";

// React-Bits-inspired pattern (MIT-style), re-implemented locally for this
// codebase's light "industrial ledger" aesthetic — no code copied verbatim.

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

interface CountUpProps {
  /** Full display value, e.g. "5+", "24", "PAN". Non-numeric strings just render as-is. */
  value: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animates the numeric portion of `value` from 0 up to its target once the
 * element scrolls into view. Any non-digit prefix/suffix (e.g. "+", "%") is
 * preserved and only appended once counting completes. Falls back to the
 * final value immediately if there is no number to animate or motion is reduced.
 */
export default function CountUp({ value, duration = 1.4, className, style }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotionSafe();
  const [display, setDisplay] = useState(value);

  const match = value.match(/^(\D*)(\d+)(\D*)$/);

  useEffect(() => {
    if (!match || !inView || prefersReducedMotion) {
      setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr, 10);
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, prefersReducedMotion]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
