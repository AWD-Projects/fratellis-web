"use client";

import Image from "next/image";
import { ABOUT_HIGHLIGHTS } from "@/lib/content";
import { MaskLines, Reveal } from "@/components/ui/motion";

export default function AboutSection() {
  return (
    <section id="about" className="section-y bg-brand-background">
      <div className="wrap">
        <Reveal y={12}>
          <p className="eyebrow text-brand-accent">Sobre Fratelli&apos;s</p>
        </Reveal>

        <MaskLines
          className="display mt-6 max-w-5xl text-[clamp(2.2rem,5vw,4.4rem)] text-graphite-900"
          lines={[
            "Nació como heladería.",
            <span key="x" className="font-semibold text-brand-accent">Hoy atiende la mesa completa.</span>,
          ]}
        />

        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-[440px] lg:max-w-none">
              <div
                aria-hidden
                className="arch absolute inset-0 -translate-x-3 translate-y-3 border border-brand-primary/70 sm:-translate-x-4 sm:translate-y-4"
                style={{ overflow: "visible" }}
              />
              <div className="arch relative aspect-[4/5] bg-brand-muted">
                <Image
                  src="/images/about/about-team.jpg"
                  alt="Integrante del equipo de Fratelli's con un cono de helado"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover object-[72%_50%]"
                />
                <div aria-hidden className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply" />
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-graphite-700 md:text-xl">
                Empezamos en CDMX con una idea clara: hacer helado con la
                dedicación con la que un chef arma su menú. Hoy esa misma dedicación se
                extiende al café, los postres, las bebidas y las botanas.
              </p>
            </Reveal>

            <dl className="mt-12 border-t border-graphite-900/15">
              {ABOUT_HIGHLIGHTS.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={i * 0.08}
                  className="grid gap-2 border-b border-graphite-900/15 py-7 sm:grid-cols-[0.42fr_1fr] sm:gap-8"
                >
                  <dt className="flex items-baseline gap-3 text-lg font-semibold text-graphite-900">
                    <span className="text-xs font-semibold text-brand-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.title}
                  </dt>
                  <dd className="text-[0.95rem] leading-relaxed text-graphite-600">
                    {item.description}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
