import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configure Your Scooter — Get a Bulk Quote",
  description:
    "Build your electric scooter order — choose model, color, battery and quantity — and send it straight to our sales team on WhatsApp. Minimum order 5 units.",
};

export default function ConfigureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
