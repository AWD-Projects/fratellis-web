import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import HeroSection from "@/components/sections/hero-section";
import CateringSection from "@/components/sections/catering-section";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import FlavorsSection from "@/components/sections/flavors-section";
import ClientsSection from "@/components/sections/clients-section";
import GallerySection from "@/components/sections/gallery-section";
import { BarProvider } from "@/components/bar-provider";
import { buildStructuredData } from "@/lib/seo";

export default function Home() {
  const structuredData = buildStructuredData();

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
        <CateringSection />
        <FlavorsSection />
        <ClientsSection />
        <AboutSection />
        <GallerySection />
        <ContactSection />
      </main>
      <SiteFooter />
    </BarProvider>
  );
}

export const dynamic = "force-static";
