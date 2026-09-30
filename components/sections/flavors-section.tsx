"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { FLAVOR_HIGHLIGHTS, SEASONAL_FLAVORS } from "@/lib/content";
import { MaskLines, Reveal } from "@/components/ui/motion";
import { useBar } from "@/components/bar-provider";

export default function FlavorsSection() {
  const [index, setIndex] = useState(0);
  const flavor = FLAVOR_HIGHLIGHTS[index];
  const { flavors, toggleFlavor } = useBar();
  const reduce = useReducedMotion();
  const chosen = flavors.includes(flavor.name);

  return (
    <section id="flavors" className="grain section-y bg-graphite-900 text-white">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal y={12}>
              <p className="eyebrow text-brand-primary">Sabores</p>
            </Reveal>
            <MaskLines
              className="display mt-6 text-[clamp(2.1rem,4.1vw,3.7rem)]"
              lines={["Seis clásicos", "y cuatro de temporada."]}
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-lg leading-relaxed text-white/75">
              Recorre la lista para ver cada envase. Añade los que imaginas y llegan directo a
              tu cotización.
            </p>
          </Reveal>
        </div>

        {/* Escenario */}
        <Reveal className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <ul
              role="tablist"
              aria-label="Sabores"
              className="grid grid-cols-2 gap-x-6 border-t border-white/15 lg:grid-cols-1 lg:gap-x-0"
            >
              {FLAVOR_HIGHLIGHTS.map((f, i) => {
                const active = i === index;
                return (
                  <li key={f.name} role="presentation" className="border-b border-white/15">
                    <button
                      role="tab"
                      id={`sabor-${i}`}
                      aria-selected={active}
                      aria-controls="escenario-sabor"
                      onClick={() => setIndex(i)}
                      onMouseEnter={() => setIndex(i)}
                      className="group flex w-full items-baseline gap-4 py-4 text-left lg:py-5"
                    >
                      <span
                        className={`text-xs font-semibold transition-colors ${
                          active ? "text-brand-primary" : "text-white/50"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-lg font-light tracking-tight transition-all duration-300 sm:text-xl lg:text-[1.9rem] ${
                          active ? "text-white lg:translate-x-2" : "text-white/55 group-hover:text-white/85"
                        }`}
                      >
                        {f.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div
              id="escenario-sabor"
              role="tabpanel"
              aria-labelledby={`sabor-${index}`}
              className="relative grid items-center gap-8 sm:grid-cols-[1.15fr_1fr] lg:h-full"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[420px]">
                <motion.div
                  aria-hidden
                  className="absolute inset-[6%] rounded-full"
                  animate={{ backgroundColor: flavor.tint }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
                {FLAVOR_HIGHLIGHTS.map((f, i) => {
                  const on = i === index;
                  return (
                    <motion.div
                      key={f.name}
                      aria-hidden={!on}
                      className="absolute inset-0"
                      initial={false}
                      animate={
                        on
                          ? { opacity: 1, y: 0, rotate: 0, scale: 1 }
                          : reduce
                            ? { opacity: 0 }
                            : { opacity: 0, y: 28, rotate: -5, scale: 0.94 }
                      }
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={f.image}
                        alt={on ? `Envase de helado sabor ${f.name}` : ""}
                        fill
                        sizes="(max-width: 640px) 80vw, 380px"
                        className="object-contain"
                      />
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center sm:text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={flavor.name}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="text-4xl font-light tracking-tight md:text-5xl">{flavor.name}</h3>
                    <p className="mt-4 text-lg text-white/75">{flavor.description}</p>
                  </motion.div>
                </AnimatePresence>
                <button
                  type="button"
                  aria-pressed={chosen}
                  onClick={() => toggleFlavor(flavor.name)}
                  className={`mt-8 ${chosen ? "btn-gold" : "btn-line-dark"}`}
                >
                  {chosen ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  {chosen ? "En tu barra" : "Añadir a mi barra"}
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Temporada */}
        <Reveal className="mt-20 grid gap-8 border-t border-white/15 pt-10 md:mt-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-brand-primary">Temporada</p>
            <h3 className="mt-4 text-2xl font-light tracking-tight md:text-3xl">
              Sabores rotativos según la estación
            </h3>
            <p className="mt-3 max-w-md text-[0.95rem] text-white/70">
              Adaptamos el menú a tu evento y al calendario de la temporada.
            </p>
          </div>
          <ul className="flex flex-wrap content-start gap-3 lg:col-span-7">
            {SEASONAL_FLAVORS.map((item) => {
              const on = flavors.includes(item);
              return (
                <li key={item}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleFlavor(item)}
                    className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors ${
                      on
                        ? "border-brand-primary bg-brand-primary text-graphite-900"
                        : "border-white/30 text-white hover:border-brand-primary hover:text-brand-primary"
                    }`}
                  >
                    {on ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
