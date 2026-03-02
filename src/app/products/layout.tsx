import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Electric Scooters, Batteries & Chargers",
  description:
    "Browse electric scooters, LFP/NMC battery packs, chargers and EV parts for bulk B2B orders. GST billing available. Fleet and dealer pricing.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
