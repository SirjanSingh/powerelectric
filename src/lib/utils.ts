import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AddressLike = {
  line1: string;
  line2: string;
  city: string;
  state: string;
  pin: string;
};

/**
 * Format a postal address for display, skipping any empty fields so unknown
 * parts (e.g. a not-yet-confirmed PIN) don't leave stray commas or dashes.
 * Returns e.g. "Nangli Industrial Area, Delhi, Delhi" or, with a PIN,
 * "…, Delhi, Delhi — 110041".
 */
export function formatAddress(a: AddressLike): string {
  const locality = [a.line1, a.line2, a.city, a.state]
    .filter(Boolean)
    .join(", ");
  return a.pin ? `${locality} — ${a.pin}` : locality;
}
