"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ABOUT_HIGHLIGHTS } from "@/lib/content";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="lux-eyebrow">Sobre Fratelli&apos;s</p>
              <h2 className="text-4xl md:text-5xl font-semibold lux-title">
                Una heladería artesanal convertida en experiencia de catering.
              </h2>
              <p className="text-lg text-graphite-600">
                Fratelli&apos;s nació en CDMX con una visión clara: crear helados
                artesanales con la misma dedicación que un chef dedica a su menú.
                Hoy llevamos esa pasión a eventos exclusivos con un food truck elegante,
                servicio impecable y sabores que se recuerdan.
              </p>
              <div className="grid gap-5 pt-4">
                {ABOUT_HIGHLIGHTS.map((item) => (
                  <div key={item.title} className="lux-border rounded-2xl p-4 bg-white">
                    <h3 className="text-lg font-semibold text-brand-primary">{item.title}</h3>
                    <p className="text-sm text-graphite-600 mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="lux-surface rounded-[36px] p-4">
                <div className="relative h-[420px] md:h-[520px] rounded-[28px] overflow-hidden">
                  <Image
                    src="/images/about/about-team.jpg"
                    alt="Equipo de Fratelli's preparando helado artesanal"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
