"use client";

import Image from "next/image";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/content";
import { scrollToSection } from "@/lib/utils";
import { Facebook, Instagram } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="py-16 bg-brand-background border-t border-brand-secondary/40">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1.1fr_0.9fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image src="/images/brand/logo.png" alt="Fratelli's" width={48} height={48} />
              </div>
              <span className="text-xl font-semibold">Fratelli&apos;s Helados</span>
            </div>
            <p className="text-sm text-graphite-600 leading-relaxed">
              Food truck premium con helados artesanales y sodas italianas para eventos
              memorables en CDMX.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-graphite-500 mb-4">
              Navegación
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {NAV_ITEMS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-graphite-600 hover:text-brand-primary transition-colors text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-graphite-500 mb-4">
              Contacto
            </h3>
            <div className="space-y-3 text-sm text-graphite-600">
              <p>{SITE_CONFIG.email}</p>
              <p>{SITE_CONFIG.phone}</p>
              <p>{SITE_CONFIG.address}</p>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-muted flex items-center justify-center hover:bg-brand-secondary transition-colors"
              >
                <Facebook className="w-5 h-5 text-graphite-600" />
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-muted flex items-center justify-center hover:bg-brand-secondary transition-colors"
              >
                <Instagram className="w-5 h-5 text-graphite-600" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-secondary/40 mt-12 pt-6 text-sm text-graphite-500 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <span>© 2026 Fratelli&apos;s Helados</span>
          <span>Catering premium para eventos con estilo.</span>
          <a
            href="https://www.amoxtli.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-graphite-500 hover:text-brand-primary transition-colors"
          >
            Desarrollado por Amoxtli®
          </a>
        </div>
      </div>
    </footer>
  );
}
