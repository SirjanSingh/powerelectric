import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Get a Bulk Quote",
  description:
    "Request a bulk quote for electric scooters, batteries and EV parts. WhatsApp, Call or Email. Serving fleets, institutions and dealers across India.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
