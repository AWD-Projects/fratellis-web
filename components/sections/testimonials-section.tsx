"use client";

import { TESTIMONIALS } from "@/lib/content";
import { MaskLines, Reveal } from "@/components/ui/motion";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-y bg-brand-blush">
      <div className="wrap">
        <Reveal y={12}>
          <p className="eyebrow text-brand-accent">Testimonios</p>
        </Reveal>
        <MaskLines
          className="display mt-6 max-w-4xl text-[clamp(2.2rem,5vw,4.5rem)] text-graphite-900"
          lines={["Lo que dicen quienes", "nos contrataron."]}
        />

        <ul className="mt-16 border-t border-graphite-900/25 md:mt-24">
          {TESTIMONIALS.map((item, i) => (
            <Reveal
              as="li"
              key={item.name}
              delay={i * 0.06}
              className="grid gap-5 border-b border-graphite-900/25 py-10 md:grid-cols-12 md:gap-10 md:py-14"
            >
              <div className="md:col-span-3">
                <p className="text-lg font-semibold text-graphite-900">{item.name}</p>
                <p className="mt-1 text-sm text-graphite-700">{item.event}</p>
              </div>
              <blockquote className="md:col-span-9">
                <p className="text-[clamp(1.4rem,2.7vw,2.4rem)] font-light leading-[1.25] tracking-tight text-graphite-900">
                  “{item.quote}”
                </p>
              </blockquote>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
