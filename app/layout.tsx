import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1A1A1A",
  width: "device-width",
  initialScale: 1,
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fratellishelados.com";
const TITLE = "Fratelli's Helados | Fuente de sodas para eventos en CDMX";
const DESCRIPTION =
  "Fuente de sodas gourmet para bodas, eventos de empresa y escuelas en CDMX: helado, café, postres y bebidas. Cotiza tu evento en minutos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Fratelli's Helados" },
  description: DESCRIPTION,
  applicationName: "Fratelli's Helados",
  keywords: [
    "fuente de sodas para eventos CDMX",
    "barra de helado para eventos",
    "catering de helados CDMX",
    "helado para bodas CDMX",
    "sodas italianas para eventos",
    "postres y botanas para eventos",
    "catering para eventos corporativos",
    "Fratelli's Helados",
  ],
  authors: [{ name: "Fratelli's Helados", url: SITE_URL }],
  creator: "Amoxtli",
  publisher: "Fratelli's Helados",
  category: "food",
  alternates: {
    canonical: "/",
    languages: { "es-MX": "/" },
  },
  formatDetection: { telephone: true, email: true, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Fratelli's Helados",
    locale: "es_MX",
    title: TITLE,
    description:
      "Helado, café, postres, bebidas y botanas para tu evento en CDMX, con equipo propio y cotización a tu medida.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fratelli's Helados: que a tu evento no le falte nada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Fuente de sodas gourmet para bodas, empresas, escuelas y fiestas privadas en CDMX.",
    images: ["/twitter-image.jpg"],
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  icons: {
    icon: "/images/brand/favicon.png",
    apple: "/images/brand/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className="scroll-smooth">
      <body className={`${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
