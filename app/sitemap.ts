import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fratellishelados.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
