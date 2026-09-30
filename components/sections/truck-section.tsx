"use client";

import Image from "next/image";
import { MaskLines, Reveal } from "@/components/ui/motion";

const TRUCK_POINTS = [
  { label: "Acabados", text: "Food truck premium con acabados impecables." },
  { label: "Montaje", text: "Rápido y discreto para cualquier venue." },
  { label: "Ambientación", text: "Iluminación cálida y señalización elegante." },
  { label: "Servicio", text: "Operado por personal capacitado en hospitalidad." },
];

export default function TruckSection() {
  return (
    <section id="truck" className="section-y bg-brand-background">
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <Reveal className="lg:col-span-6">
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 translate-x-3 translate-y-3 border border-brand-primary/70 sm:translate-x-5 sm:translate-y-5"
              />
              <div className="relative aspect-[4/3] bg-graphite-900">
                <Image
                  src="/images/truck/truck-experience.jpg"
                  alt="Food truck de Fratelli's Helados atendiendo en un evento al aire libre"
                  fill
                  sizes="(max-width: 1024px) 92vw, 58vw"
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply" />
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:pl-10">
            <Reveal y={12}>
              <p className="eyebrow text-brand-accent">La experiencia food truck</p>
            </Reveal>
            <MaskLines
              className="display mt-6 text-[clamp(2rem,3.7vw,3.3rem)] text-graphite-900"
              lines={["Un punto focal", "elegante que eleva", "la atmósfera."]}
            />
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-graphite-700">
                Nuestro food truck no solo entrega helado: crea una experiencia visual. Diseñado
                para integrarse con bodas, jardines, rooftops y eventos de marca.
              </p>
            </Reveal>

            <dl className="mt-10 border-t border-graphite-900/15">
              {TRUCK_POINTS.map((point, i) => (
                <Reveal
                  key={point.label}
                  delay={i * 0.06}
                  className="grid gap-1 border-b border-graphite-900/15 py-4 sm:grid-cols-[0.42fr_1fr] sm:gap-6"
                >
                  <dt className="eyebrow pt-0.5 text-brand-accent">{point.label}</dt>
                  <dd className="text-[0.95rem] text-graphite-700">{point.text}</dd>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={0.1}>
              <p className="mt-8 text-sm font-semibold tracking-wide text-graphite-900">
                Experiencia mobile signature <span className="mx-2 text-brand-primary">·</span> Logística flexible en CDMX
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
