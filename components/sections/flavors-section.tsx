"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FLAVOR_HIGHLIGHTS, SEASONAL_FLAVORS } from "@/lib/content";

export default function FlavorsSection() {
  return (
    <section id="flavors" className="py-20 md:py-32 bg-brand-muted/40">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="lux-eyebrow">Sabores emblemáticos</p>
            <h2 className="text-4xl md:text-5xl font-semibold lux-title mt-4">
              Helados artesanales creados para sorprender.
            </h2>
            <p className="text-lg text-graphite-600 mt-4 max-w-2xl mx-auto">
              Curamos un menú de sabores clásicos y propuestas de temporada que
              combinan cremosidad, balance y frescura.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLAVOR_HIGHLIGHTS.map((flavor, index) => (
              <motion.div
                key={flavor.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-3xl p-5 shadow-[0_20px_40px_rgba(26,26,26,0.06)]"
              >
                <div className="relative h-40 rounded-2xl overflow-hidden bg-brand-muted">
                  <Image
                    src={flavor.image}
                    alt={`Helado ${flavor.name}`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 80vw, 30vw"
                  />
                </div>
                <h3 className="text-xl font-semibold text-brand-primary mt-5">
                  {flavor.name}
                </h3>
                <p className="text-sm text-graphite-600 mt-2">{flavor.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 lux-surface rounded-3xl p-6">
            <div>
              <p className="text-sm text-graphite-500 uppercase tracking-[0.2em]">Temporada</p>
              <h3 className="text-2xl font-semibold lux-title mt-2">
                Sabores rotativos según la estación
              </h3>
              <p className="text-sm text-graphite-600 mt-2">
                Adaptamos el menú a tu evento y al calendario de la temporada.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {SEASONAL_FLAVORS.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-brand-secondary/40 text-graphite-700 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
