"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, ArrowUpRight } from "lucide-react";
import { SERVICES, EVENT_TYPES, SITE_CONFIG } from "@/lib/content";
import { scrollToSection } from "@/lib/utils";

export default function CateringSection() {
  return (
    <section id="catering" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <p className="lux-eyebrow">Catering premium</p>
              <h2 className="text-4xl md:text-5xl font-semibold lux-title mt-4">
                Un servicio diseñado para eventos con estilo.
              </h2>
              <p className="text-lg text-graphite-600 mt-4">
                Diseñamos cada servicio como una experiencia: helado artesanal,
                soda fountain y una puesta en escena que se integra con tu evento.
              </p>

              <div className="grid gap-4 mt-8">
                {SERVICES.map((service) => (
                  <div key={service.title} className="lux-surface rounded-2xl p-5">
                    <h3 className="text-lg font-semibold text-brand-primary">
                      {service.title}
                    </h3>
                    <p className="text-sm text-graphite-600 mt-2">{service.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3 bg-brand-primary text-white rounded-full font-medium"
                >
                  Solicitar cotización
                </button>
                <a
                  href={SITE_CONFIG.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-brand-primary text-brand-primary rounded-full font-medium inline-flex items-center gap-2"
                >
                  Agendar llamada
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="lux-surface rounded-[32px] p-4">
                <div className="relative h-[360px] md:h-[460px] rounded-[24px] overflow-hidden">
                  <Image
                    src="/images/catering/food-truck.png"
                    alt="Food truck premium de Fratelli's Helados"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="lux-surface rounded-[32px] p-4">
                <div className="relative h-[320px] md:h-[420px] rounded-[24px] overflow-hidden">
                  <Image
                    src="/images/events/event-private.jpg"
                    alt="Food truck de Fratelli's en celebración privada"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>
            </motion.div>

            <div>
              <h3 className="text-3xl md:text-4xl font-semibold lux-title">
                Perfecto para eventos como:
              </h3>
              <div className="grid gap-3 mt-6">
                {EVENT_TYPES.map((event) => (
                  <div key={event} className="flex items-start gap-3 text-graphite-600">
                    <Check className="w-5 h-5 text-brand-primary mt-1" />
                    <span>{event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
