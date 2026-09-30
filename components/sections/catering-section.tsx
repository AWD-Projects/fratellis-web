"use client";

import Image from "next/image";
import { ArrowUpRight, Plus, Check } from "lucide-react";
import { SERVICES, EVENT_TYPES, SITE_CONFIG } from "@/lib/content";
import { scrollToSection } from "@/lib/utils";
import { MaskLines, Reveal } from "@/components/ui/motion";
import { useBar } from "@/components/bar-provider";

export default function CateringSection() {
  const { eventType, setEventType, services, toggleService } = useBar();

  return (
    <section id="catering" className="section-y bg-brand-muted">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal y={12}>
              <p className="eyebrow text-brand-accent">Fuente de sodas gourmet</p>
            </Reveal>
            <MaskLines
              className="display mt-6 text-[clamp(2.1rem,4.1vw,3.7rem)] text-graphite-900"
              lines={["Tú eliges qué se sirve.", "Nosotros hacemos el resto."]}
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-lg leading-relaxed text-graphite-700">
              Desde una barra de helado hasta una mesa completa de postres, bebidas y botanas:
              armamos el servicio según tu evento y lo ajustamos contigo en la propuesta.
            </p>
          </Reveal>
        </div>

        {/* Servicios + producto */}
        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ul className="border-t border-graphite-900/20">
              {SERVICES.map((service, i) => {
                const active = services.includes(service.title);
                return (
                  <Reveal
                    as="li"
                    key={service.title}
                    delay={i * 0.08}
                    className="border-b border-graphite-900/20"
                  >
                    <div className="grid gap-4 py-8 sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:gap-6">
                      <span className="text-sm font-semibold text-brand-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-2xl font-medium tracking-tight text-graphite-900 md:text-[1.7rem]">
                          {service.title}
                        </h3>
                        <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-graphite-600">
                          {service.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleService(service.title)}
                        className="chip w-fit text-[0.8rem]"
                      >
                        {active ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        {active ? "En tu barra" : "Añadir a mi barra"}
                      </button>
                    </div>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal className="mt-10 flex flex-wrap gap-4">
              <button onClick={() => scrollToSection("contact")} className="btn-gold-on-light">
                Solicitar cotización
              </button>
              <a
                href={SITE_CONFIG.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line-light"
              >
                Agendar llamada
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="relative mx-auto max-w-[460px] lg:max-w-none">
              <div
                aria-hidden
                className="arch absolute inset-0 translate-x-3 translate-y-3 border border-graphite-900/40 sm:translate-x-4 sm:translate-y-4"
                style={{ overflow: "visible" }}
              />
              <div className="arch relative aspect-[4/5] bg-brand-blush">
                <Image
                  src="/images/catering/food-truck.png"
                  alt="Food truck de Fratelli's"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-contain object-bottom px-6 pb-10 pt-16"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Tipos de evento */}
        <div className="mt-24 grid gap-12 md:mt-36 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="relative mx-auto aspect-[4/5] max-w-[300px] lg:mx-0">
                <div className="arch relative h-full w-full bg-brand-blush">
                  <Image
                    src="/images/truck/truck-experience.jpg"
                    alt="Food truck de Fratelli's atendiendo en un evento al aire libre"
                    fill
                    sizes="(max-width: 1024px) 60vw, 25vw"
                    className="object-cover object-[28%_50%]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply" />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal y={12}>
              <p className="eyebrow text-brand-accent">Eventos que atendemos</p>
            </Reveal>
            <ul className="mt-6 border-t border-graphite-900/20">
              {EVENT_TYPES.map((event, i) => {
                const active = eventType === event;
                return (
                  <Reveal as="li" key={event} delay={i * 0.07} className="border-b border-graphite-900/20">
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setEventType(active ? null : event);
                        if (!active) scrollToSection("contact");
                      }}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={`text-[clamp(1.35rem,2.6vw,2.15rem)] font-light tracking-tight transition-all duration-300 group-hover:translate-x-2 ${
                          active ? "text-brand-accent" : "text-graphite-900"
                        }`}
                      >
                        {event}
                      </span>
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors ${
                          active
                            ? "border-graphite-900 bg-graphite-900 text-white"
                            : "border-graphite-900/30 text-graphite-900 group-hover:border-graphite-900"
                        }`}
                        aria-hidden
                      >
                        {active ? <Check className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </ul>
            <p className="mt-5 text-sm text-graphite-500">
              Elige uno y lo llevamos directo a tu cotización.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
