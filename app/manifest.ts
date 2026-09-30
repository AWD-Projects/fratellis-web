import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fratelli's Helados",
    short_name: "Fratelli's",
    description: "Fuente de sodas gourmet para eventos en CDMX.",
    lang: "es-MX",
    start_url: "/",
    display: "browser",
    background_color: "#1A1A1A",
    theme_color: "#1A1A1A",
    icons: [{ src: "/images/brand/favicon.png", sizes: "360x360", type: "image/png" }],
  };
}
