"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Entrada suave. Observa el contenedor (no hijos enmascarados) para que
 * el disparo por scroll sea fiable.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  // El servidor siempre renderiza el estado inicial; con reduced-motion se
  // pasa al final de inmediato (duración 0) en vez de ramificar el árbol.
  const show = inView || !!reduce;

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={reduce ? { duration: 0 } : { duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/**
 * Titular por líneas: cada línea sube desde una máscara, como un telón.
 * `lines` es un arreglo de nodos; cada uno ocupa una línea.
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  immediate = false,
  as = "h2",
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  immediate?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const show = immediate || inView || !!reduce;
  const Tag = motion[as] as typeof motion.h2;

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className={cn("block", lineClassName)}
            initial={{ y: "115%" }}
            animate={{ y: show ? "0%" : "115%" }}
            transition={reduce ? { duration: 0 } : { duration: 1.05, delay: delay + i * 0.11, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
