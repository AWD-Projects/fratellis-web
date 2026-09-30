import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import HeroSection from "@/components/sections/hero-section";
import CateringSection from "@/components/sections/catering-section";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import FlavorsSection from "@/components/sections/flavors-section";
import TruckSection from "@/components/sections/truck-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import GallerySection from "@/components/sections/gallery-section";
import { BarProvider } from "@/components/bar-provider";
import { SITE_CONFIG } from "@/lib/content";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Catering",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    image: "https://fratellishelados.com/images/hero/hero.png",
    logo: "https://fratellishelados.com/images/brand/logo.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ciudad de México",
      addressCountry: "MX",
    },
    areaServed: "Ciudad de México",
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    url: "https://fratellishelados.com",
    sameAs: [SITE_CONFIG.social.facebook, SITE_CONFIG.social.instagram],
  };

  return (
    <BarProvider>
      <header>
        <SiteHeader />
      </header>
      <main className="min-h-screen bg-brand-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <HeroSection />
        <AboutSection />
        <CateringSection />
        <FlavorsSection />
        <TruckSection />
        <TestimonialsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <SiteFooter />
    </BarProvider>
  );
}

export const dynamic = "force-static";
