"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { MaskLines, Reveal } from "@/components/ui/motion";

export default function HeroSection() {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "9%"]);

  return (
    <section
      id="hero"
      className="grain relative overflow-hidden bg-graphite-900 pb-12 pt-32 text-white md:pb-16 md:pt-36 lg:min-h-[100svh]"
    >
      <div className="wrap">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal y={12}>
              <p className="eyebrow text-brand-primary">Fuente de sodas &amp; helados · CDMX</p>
            </Reveal>

            <MaskLines
              as="h1"
              immediate
              delay={0.15}
              className="display mt-7 text-[clamp(2.7rem,4.7vw,4.2rem)]"
              lines={[
                "Que a tu evento",
                <span key="s" className="font-semibold text-brand-primary">no le falte nada.</span>,
              ]}
            />

            <Reveal delay={0.7} y={18}>
              <p className="mt-9 max-w-xl text-[1.05rem] leading-relaxed text-white/80 md:text-lg">
                Fuente de sodas gourmet para eventos en CDMX. Helado y café de base, con
                postres, bebidas y botanas para completar el menú.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                <button onClick={() => scrollToSection("contact")} className="btn-gold">
                  Cotiza tu evento
                </button>
                <button
                  onClick={() => scrollToSection("catering")}
                  className="link-line inline-flex items-center gap-2 py-1 text-sm font-semibold tracking-wide text-white"
                >
                  Ver servicios
                  <ArrowDownRight className="h-4 w-4 text-brand-primary" />
                </button>
              </div>
            </Reveal>
          </div>

          <div ref={stage} className="relative mx-auto w-full max-w-[460px] lg:col-span-5 lg:max-w-none">
            {/* contorno desplazado: el mismo arco, dibujado con línea fina */}
            <div
              aria-hidden
              className="arch absolute inset-0 translate-x-3 translate-y-3 border border-brand-primary/60 sm:translate-x-4 sm:translate-y-4"
              style={{ overflow: "visible" }}
            />
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={reduce ? { duration: 0 } : { duration: 1.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="arch relative aspect-[4/5] bg-brand-blush"
            >
              <motion.div style={{ y: imgY }} className="absolute inset-[-6%]">
                <Image
                  src="/images/hero/hero.png"
                  alt="Vasos de helado Fratelli's con tapa de sabor chocolate"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="scale-[1.38] object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
