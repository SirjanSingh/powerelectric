"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getClientSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * SSR-safe prefers-reduced-motion check.
 *
 * framer-motion's `useReducedMotion()` reads `matchMedia` synchronously on
 * the client during its `useState` initializer, so on a machine with the OS
 * preference set, the very first client render already returns `true` while
 * the server-rendered markup (which cannot know the client's OS setting)
 * assumed `false`. When components branch on that value to render different
 * DOM structure (e.g. `if (prefersReducedMotion) return <div>… else return
 * <motion.div>…`), that mismatch trips a React hydration error.
 *
 * `useSyncExternalStore` is the correct primitive for subscribing to an
 * external source (the media query) — its `getServerSnapshot` guarantees
 * the hydration-time render matches the server (`false`), and React syncs
 * to the real client value right after.
 */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
