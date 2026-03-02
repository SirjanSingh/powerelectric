import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import CategoryCards from "@/components/sections/CategoryCards";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import GalleryBand from "@/components/sections/GalleryBand";
import WhyUs from "@/components/sections/WhyUs";
import HowItWorks from "@/components/sections/HowItWorks";
import Industries from "@/components/sections/Industries";
import ContactMap from "@/components/sections/ContactMap";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.businessName} — ${siteConfig.tagline}`,
  description: siteConfig.metaDescription,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryCards />
      <FeaturedProducts />
      <GalleryBand />
      <WhyUs />
      <HowItWorks />
      <Industries />
      <ContactMap />
    </>
  );
}
