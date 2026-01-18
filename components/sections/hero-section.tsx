"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { TRUST_POINTS } from "@/lib/content";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 md:pb-24">
      <div className="absolute inset-0 lux-gradient" />
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-brand-secondary/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold lux-title text-balance">
                Fratelli&apos;s Helados, <span className="text-brand-gradient">catering premium</span> en food truck.
              </h1>
              <p className="text-lg md:text-xl text-graphite-600 max-w-2xl">
                Llevamos helado artesanal, sodas italianas y una estética elegante a bodas,
                eventos corporativos y celebraciones privadas en CDMX.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 bg-brand-primary text-white rounded-full font-medium transition-all hover:opacity-90"
              >
                Reserva tu evento
              </button>
              <button
                onClick={() => scrollToSection("catering")}
                className="px-8 py-4 border border-brand-primary text-brand-primary rounded-full font-medium transition-all hover:bg-brand-primary hover:text-white"
              >
                Ver servicios
              </button>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4 pt-4">
              {TRUST_POINTS.map((item) => (
                <div key={item.title} className="lux-surface rounded-2xl p-4">
                  <p className="text-sm font-semibold text-brand-primary">{item.title}</p>
                  <p className="text-xs text-graphite-500 mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="lux-surface rounded-[40px] p-4">
              <div className="relative h-[420px] md:h-[520px] rounded-[32px] overflow-hidden">
                <Image
                  src="/images/hero/hero.png"
                  alt="Food truck de Fratelli's en un evento elegante"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center pt-10">
          <button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center gap-2 text-graphite-500 hover:text-brand-primary transition-colors"
          >
            <span className="text-xs tracking-[0.2em] uppercase">Descubre la historia</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </button>
        </div>
      </div>
    </section>
  );
}
