"use client";

import { CLIENTS } from "@/lib/content";
import { MaskLines, Reveal } from "@/components/ui/motion";

export default function ClientsSection() {
  return (
    <section id="clients" className="section-y bg-brand-blush">
      <div className="wrap">
        <Reveal y={12}>
          <p className="eyebrow text-brand-accent">Nuestros clientes</p>
        </Reveal>
        <MaskLines
          className="display mt-6 max-w-4xl text-[clamp(2.1rem,4.1vw,3.7rem)] text-graphite-900"
          lines={["Escuelas, universidades", "y marcas que ya nos contrataron."]}
        />

        <ul className="mt-14 grid border-t border-graphite-900/25 md:mt-20 md:grid-cols-2 md:gap-x-12">
          {CLIENTS.map((client, i) => (
            <Reveal
              as="li"
              key={client}
              delay={(i % 2) * 0.06}
              className="flex items-baseline gap-5 border-b border-graphite-900/25 py-6 md:py-8"
            >
              <span className="w-7 shrink-0 text-xs font-semibold text-brand-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[clamp(1.35rem,2.4vw,2.05rem)] font-light leading-tight tracking-tight text-graphite-900">
                {client}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
