"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/content";
import { MaskLines, Reveal } from "@/components/ui/motion";

/**
 * Composición por ancho de archivo original: las fotos de mayor resolución
 * ocupan las celdas grandes; las pequeñas, las celdas chicas.
 * Orden de GALLERY_IMAGES: 01 a 06.
 */
const CELLS = [
  "md:col-span-4 md:row-span-1", // 01 (1296px)
  "md:col-span-8 md:row-span-2", // 02 (3694px)
  "md:col-span-4 md:row-span-1", // 03 (768px, celda chica)
  "md:col-span-5 md:row-span-1", // 04 (4020px)
  "md:col-span-7 md:row-span-2", // 05 (4032px)
  "md:col-span-5 md:row-span-1", // 06 (1280px)
].map((c) => `aspect-[4/3] md:aspect-auto ${c}`);

export default function GallerySection() {
  const [open, setOpen] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(null);
    trigger.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  return (
    <section id="gallery" className="grain section-y bg-graphite-900 text-white">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal y={12}>
              <p className="eyebrow text-brand-primary">Galería</p>
            </Reveal>
            <MaskLines
              className="display mt-6 text-[clamp(2.1rem,4.1vw,3.7rem)]"
              lines={["Fratelli's", "en eventos."]}
            />
          </div>
        </div>

        <ul className="mt-16 grid gap-3 md:mt-24 md:auto-rows-[190px] md:grid-cols-12 md:gap-4 lg:auto-rows-[230px]">
          {GALLERY_IMAGES.map((image, i) => (
            <Reveal as="li" key={image.src} delay={(i % 3) * 0.07} y={20} className={`relative ${CELLS[i]}`}>
              <button
                type="button"
                onClick={(e) => {
                  trigger.current = e.currentTarget;
                  setOpen(i);
                }}
                aria-label={`Ampliar: ${image.alt}`}
                className="group absolute inset-0 block overflow-hidden bg-graphite-800"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 42vw"
                  className="object-cover transition-transform duration-[1200ms] ease-curtain group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"
                />
                <span
                  aria-hidden
                  className="absolute bottom-3 left-3 text-xs font-semibold text-white/90 drop-shadow"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {mounted && createPortal(
      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Galería ampliada"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-graphite-900/95 p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <motion.figure
              key={open}
              className="relative h-full max-h-[82vh] w-full max-w-6xl"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES[open].src}
                alt={GALLERY_IMAGES[open].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.figure>

            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-brand-primary hover:text-brand-primary sm:right-8 sm:top-8"
              autoFocus
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Foto anterior"
              className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-brand-primary hover:text-brand-primary sm:bottom-auto sm:left-8 sm:top-1/2 sm:-translate-y-1/2"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Foto siguiente"
              className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-brand-primary hover:text-brand-primary sm:bottom-auto sm:right-8 sm:top-1/2 sm:-translate-y-1/2"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
