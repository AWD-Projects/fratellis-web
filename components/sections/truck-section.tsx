"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

const TRUCK_POINTS = [
  "Food truck premium con acabados impecables.",
  "Montaje rápido y discreto para cualquier venue.",
  "Iluminación cálida y señalización elegante.",
  "Operado por personal capacitado en hospitalidad.",
];

export default function TruckSection() {
  return (
    <section id="truck" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="lux-surface rounded-[36px] p-4">
              <div className="relative h-[360px] md:h-[480px] rounded-[28px] overflow-hidden">
                <Image
                  src="/images/truck/truck-experience.jpg"
                  alt="Food truck de Fratelli's Helados en un evento"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <p className="lux-eyebrow">La experiencia food truck</p>
            <h2 className="text-4xl md:text-5xl font-semibold lux-title">
              Un punto focal elegante que eleva la atmosfera.
            </h2>
            <p className="text-lg text-graphite-600">
              Nuestro food truck no solo entrega helado: crea una experiencia visual.
              Diseñado para integrarse con bodas, jardines, rooftops y eventos de marca.
            </p>

            <div className="grid gap-3">
              {TRUCK_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-3 text-graphite-600">
                  <Check className="w-5 h-5 text-brand-primary mt-1" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="px-4 py-3 rounded-2xl bg-brand-secondary/40 text-sm text-graphite-700">
                Experiencia mobile signature
              </div>
              <div className="px-4 py-3 rounded-2xl bg-brand-muted text-sm text-graphite-700">
                Logistica flexible en CDMX
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
