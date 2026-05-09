import type { Metadata } from "next";
import HeroSection from "@/components/sections/home/HeroSection";
import AboutPreview from "@/components/sections/home/AboutPreview";
import ServicesSection from "@/components/sections/home/ServicesSection";
import FeaturedEvents from "@/components/sections/home/FeaturedEvents";
import SponsorsStrip from "@/components/sections/home/SponsorsStrip";
import { getSiteConfig, getPastEvents } from "@/lib/graphql";

export const metadata: Metadata = {
  title: "Home",
};

export const revalidate = 60;

export default async function HomePage() {
  // Fetch data in parallel — never crash if backend is unavailable
  const [siteConfig, pastEvents] = await Promise.all([
    getSiteConfig().catch(() => null),
    getPastEvents().catch(() => []),
  ]);

  return (
    <>
      <HeroSection />
      <AboutPreview description={siteConfig?.about_description} />
      <ServicesSection />
      <FeaturedEvents events={pastEvents.slice(0, 4)} />
      <SponsorsStrip />
    </>
  );
}
