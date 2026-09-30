"use client";

import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/content";
import { scrollToSection } from "@/lib/utils";

export default function SiteFooter() {
  return (
    <footer className="grain bg-graphite-900 pb-10 pt-16 text-white sm:pt-24">
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative h-40 w-40 sm:h-52 sm:w-52">
              <Image
                src="/images/brand/logo.png"
                alt="Fratelli's, fuente de sodas y helados"
                fill
                sizes="208px"
                className="object-contain object-left"
              />
            </div>
            <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-white/75">
              Fuente de sodas gourmet para eventos en CDMX: helado, café, postres, bebidas y botanas.
            </p>
          </div>

          <nav aria-label="Pie de página" className="lg:col-span-3 lg:col-start-7">
            <h3 className="eyebrow text-brand-primary">Navegación</h3>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.95rem] lg:grid-cols-1">
              {NAV_ITEMS.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="link-line text-white/80 transition-colors hover:text-white"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="eyebrow text-brand-primary">Contacto</h3>
            <ul className="mt-6 space-y-3 text-[0.95rem] text-white/80">
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="link-line break-all hover:text-white">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>{SITE_CONFIG.phone}</li>
              <li>{SITE_CONFIG.address}</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Fratelli's"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Fratelli's"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Fratelli&apos;s Helados</span>
          <span>Fuente de sodas &amp; helados.</span>
          <a
            href="https://www.amoxtli.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="link-line w-fit hover:text-white"
          >
            Desarrollado por Amoxtli®
          </a>
        </div>
      </div>
    </footer>
  );
}
