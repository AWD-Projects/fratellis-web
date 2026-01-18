"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/content";
import { scrollToSection } from "@/lib/utils";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`rounded-full px-6 py-4 transition-all duration-300 ${
            scrolled ? "lux-surface" : "bg-white/60 backdrop-blur-lg"
          }`}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavClick("hero")}
              className="flex items-center gap-3"
            >
              <div className="relative w-10 h-10">
                <Image
                  src="/images/brand/logo.png"
                  alt="Fratelli's"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-body text-lg text-brand-text hidden sm:block">
                Fratelli&apos;s Helados
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="px-4 py-2 text-sm text-graphite-600 hover:text-brand-primary transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="hidden lg:block">
              <a
                href={SITE_CONFIG.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-brand-primary text-white rounded-full text-sm font-medium transition-all hover:opacity-90"
              >
                Agendar llamada
              </a>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-graphite-600 hover:text-brand-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden mt-4 container mx-auto px-4">
          <div className="lux-surface rounded-3xl p-6 space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="w-full text-left px-4 py-3 text-graphite-700 hover:text-brand-primary font-medium rounded-xl hover:bg-brand-secondary/40 transition-all"
              >
                {item.name}
              </button>
            ))}
            <a
              href={SITE_CONFIG.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-3 bg-brand-primary text-white rounded-xl font-medium mt-4"
            >
              Agendar llamada
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
