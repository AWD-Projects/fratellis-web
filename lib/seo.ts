import { EVENT_TYPES, SERVICES, SITE_CONFIG } from "@/lib/content";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fratellishelados.com";

/**
 * Datos estructurados (schema.org) en un solo grafo.
 * Solo información verificable: sin calificaciones, precios ni horarios inventados.
 */
export function buildStructuredData() {
  const orgId = `${SITE_URL}/#organization`;
  const siteId = `${SITE_URL}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "FoodEstablishment"],
        "@id": orgId,
        name: SITE_CONFIG.name,
        alternateName: "Fratelli's",
        description: SITE_CONFIG.description,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/images/brand/logo.png`, width: 2363, height: 2363 },
        image: [`${SITE_URL}/opengraph-image.jpg`, `${SITE_URL}/images/hero/hero.png`],
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ciudad de México",
          addressRegion: "CDMX",
          addressCountry: "MX",
        },
        areaServed: [
          { "@type": "City", name: "Ciudad de México" },
          { "@type": "AdministrativeArea", name: "Área metropolitana del Valle de México" },
        ],
        servesCuisine: ["Helado", "Café", "Postres", "Bebidas", "Botanas"],
        knowsAbout: EVENT_TYPES,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "ventas",
          telephone: SITE_CONFIG.phone,
          email: SITE_CONFIG.email,
          availableLanguage: "es-MX",
          areaServed: "MX",
        },
        sameAs: [SITE_CONFIG.social.facebook, SITE_CONFIG.social.instagram],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios para eventos",
          itemListElement: SERVICES.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              serviceType: "Catering para eventos",
              provider: { "@id": orgId },
              areaServed: "Ciudad de México",
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: SITE_URL,
        name: SITE_CONFIG.name,
        inLanguage: "es-MX",
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Fratelli's Helados | Fuente de sodas para eventos en CDMX",
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        inLanguage: "es-MX",
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/opengraph-image.jpg` },
      },
    ],
  };
}
