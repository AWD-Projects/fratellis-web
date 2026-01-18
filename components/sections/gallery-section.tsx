"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/content";

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 md:py-32 bg-brand-muted/40">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="lux-eyebrow">Galería</p>
              <h2 className="text-4xl md:text-5xl font-semibold lux-title mt-4">
                Eventos que inspiran el proximo.
              </h2>
            </div>
            <p className="text-lg text-graphite-600 max-w-md">
              Celebraciones con una atmósfera cálida, montajes cuidados y
              helados que se convierten en conversación.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {GALLERY_IMAGES.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative h-64 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(26,26,26,0.08)]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
