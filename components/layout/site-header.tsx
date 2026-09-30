"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/content";
import { scrollToSection } from "@/lib/utils";
import { useBar } from "@/components/bar-provider";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { flavors } = useBar();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const go = (href: string) => {
    setIsOpen(false);
    // Espera a que el menú libere el scroll antes de desplazar
    window.setTimeout(() => scrollToSection(href), isOpen ? 60 : 0);
  };

  const cta = (
    <button
      onClick={() => go("contact")}
      className="btn-gold !px-5 !py-2.5 text-[0.8rem]"
    >
      Cotiza tu evento
      {flavors.length > 0 && (
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-graphite-900 px-1 text-[0.68rem] font-bold text-brand-primary">
          {flavors.length}
        </span>
      )}
    </button>
  );

  return (
    <>
      <nav
        aria-label="Principal"
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding,border-color] duration-500 ${
          scrolled || isOpen
            ? "border-b border-white/10 bg-graphite-900 py-3"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="wrap flex items-center justify-between gap-6">
          <button
            onClick={() => go("hero")}
            className="flex items-center gap-3 text-white"
            aria-label="Fratelli's Helados, ir al inicio"
          >
            <span className="relative block h-14 w-14 sm:h-16 sm:w-16">
              <Image
                src="/images/brand/logo.png"
                alt=""
                fill
                sizes="64px"
                className="object-contain"
                priority
              />
            </span>
            <span className="hidden text-[0.95rem] font-medium tracking-tight sm:block">
              Fratelli&apos;s Helados
            </span>
          </button>

          <div className="hidden items-center gap-1 xl:flex">
            {NAV_ITEMS.filter((i) => i.href !== "hero").map((item) => (
              <button
                key={item.name}
                onClick={() => go(item.href)}
                className="px-3.5 py-2 text-[0.8rem] font-medium tracking-wide text-white/80 transition-colors hover:text-brand-primary"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {cta}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-brand-primary hover:text-brand-primary xl:hidden"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
              aria-controls="menu-movil"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grain fixed inset-0 z-40 overflow-y-auto bg-graphite-900 pt-28 text-white xl:hidden"
          >
            <div className="wrap pb-12">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {NAV_ITEMS.map((item, i) => (
                  <li key={item.name}>
                    <button
                      onClick={() => go(item.href)}
                      className="group flex w-full items-baseline gap-5 py-4 text-left"
                    >
                      <span className="w-6 text-xs font-semibold text-brand-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-3xl font-light tracking-tight transition-colors group-hover:text-brand-primary sm:text-4xl">
                        {item.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <a
                href={SITE_CONFIG.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line-dark mt-8 w-full"
              >
                Agendar llamada
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
