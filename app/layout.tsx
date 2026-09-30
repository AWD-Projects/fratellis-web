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
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fratellishelados.com"),
  title: "Fratelli's Helados | Fuente de sodas gourmet para eventos en CDMX",
  description:
    "Fuente de sodas gourmet en food truck para bodas, eventos de empresa y fiestas privadas en CDMX: helado, café, postres, bebidas y botanas. Más de una década de experiencia. Cotiza tu evento.",
  keywords: [
    "helado artesanal",
    "catering de helados",
    "food truck CDMX",
    "sodas italianas",
    "fuente de sodas gourmet",
    "postres y botanas para eventos",
    "eventos corporativos",
    "Fratelli's Helados",
  ],
  authors: [{ name: "Fratelli's Helados" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fratelli's Helados | Fuente de sodas gourmet para eventos en CDMX",
    description:
      "Helado, café, postres, bebidas y botanas en un food truck negro y dorado, con equipo propio, para tu evento en CDMX.",
    type: "website",
    locale: "es_MX",
    images: ["/images/hero/hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fratelli's Helados | Fuente de sodas gourmet para eventos en CDMX",
    description:
      "Fuente de sodas gourmet en food truck para bodas, empresas y fiestas privadas en CDMX.",
    images: ["/images/hero/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/images/brand/favicon.png" />
      </head>
      <body className={`${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
