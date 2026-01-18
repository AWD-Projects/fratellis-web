"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/content";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-brand-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="lux-eyebrow">Testimonios</p>
            <h2 className="text-4xl md:text-5xl font-semibold lux-title mt-4">
              Historias reales, momentos inolvidables.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="lux-surface rounded-3xl p-6 flex flex-col justify-between"
              >
                <p className="text-sm text-graphite-600 leading-relaxed">
                  “{item.quote}”
                </p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-brand-primary">{item.name}</p>
                  <p className="text-xs text-graphite-500">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
