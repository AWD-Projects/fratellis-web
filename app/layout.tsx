import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fratellishelados.com"),
  title: "Fratelli's Helados | Catering premium en food truck",
  description:
    "Helados artesanales y sodas italianas desde nuestro food truck premium. Catering para bodas, eventos corporativos y celebraciones en CDMX con más de una década de experiencia.",
  keywords: [
    "helado artesanal",
    "catering premium",
    "food truck CDMX",
    "sodas italianas",
    "eventos corporativos",
    "Fratelli's Helados",
  ],
  authors: [{ name: "Fratelli's Helados" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fratelli's Helados | Catering premium en food truck",
    description:
      "Experiencias de helado artesanal y sodas italianas para eventos inolvidables. Food truck elegante y servicio experto.",
    type: "website",
    locale: "es_MX",
    images: ["/images/hero/hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fratelli's Helados | Catering premium en food truck",
    description:
      "Helado artesanal, sodas italianas y un food truck elegante para eventos en CDMX.",
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
