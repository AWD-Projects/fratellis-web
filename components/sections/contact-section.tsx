"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, ArrowUpRight, CheckCircle, Mail, MapPin, Phone, Send, X } from "lucide-react";
import type { ContactFormData, ApiResponse } from "@/types/contact";
import { EVENT_TYPES, FLAVOR_HIGHLIGHTS, SEASONAL_FLAVORS, SERVICES, SITE_CONFIG } from "@/lib/content";
import { MaskLines, Reveal } from "@/components/ui/motion";
import { useBar } from "@/components/bar-provider";

const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  correo: z.string().email("Correo electrónico inválido"),
  telefono: z.string().min(7, "Ingresa un teléfono válido"),
  fechaEvento: z.string().optional(),
  invitados: z.string().optional(),
  ubicacion: z.string().optional(),
  notas: z.string().optional(),
});
type FormValues = z.infer<typeof contactSchema>;

const ALL_FLAVORS = [...FLAVOR_HIGHLIGHTS.map((f) => f.name), ...SEASONAL_FLAVORS];

const formatDate = (iso?: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : iso;
};

function StepTitle({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <legend className="mb-5 flex items-baseline gap-4 text-xl font-medium tracking-tight text-graphite-900 md:text-2xl">
      <span className="text-sm font-semibold text-brand-accent">{n}</span>
      {children}
    </legend>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-xs font-medium text-red-700">
      {message}
    </p>
  );
}

export default function ContactSection() {
  const { eventType, setEventType, services, toggleService, flavors, toggleFlavor, clear } = useBar();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [eventError, setEventError] = useState(false);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(contactSchema) });

  const invitados = watch("invitados");
  const fecha = watch("fechaEvento");
  const ubicacion = watch("ubicacion");

  const onSubmit = async (values: FormValues) => {
    if (!eventType) {
      setEventError(true);
      document.getElementById("paso-evento")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("loading");

    const mensaje = [
      `Servicios de interés: ${services.length ? services.join(", ") : "Por definir"}`,
      `Sabores de interés: ${flavors.length ? flavors.join(", ") : "Por definir"}`,
      values.notas?.trim() ? `Notas: ${values.notas.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const payload: ContactFormData = {
      nombre: values.nombre,
      correo: values.correo,
      telefono: values.telefono,
      tipoEvento: eventType,
      fechaEvento: formatDate(values.fechaEvento),
      invitados: values.invitados ?? "",
      ubicacion: values.ubicacion ?? "",
      mensaje,
      servicios: services,
      sabores: flavors,
      notas: values.notas?.trim() ?? "",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: ApiResponse = await response.json();

      if (result.success) {
        setStatus("success");
        setMessage(result.message);
        reset();
        clear();
        setTimeout(() => setStatus("idle"), 9000);
      } else {
        setStatus("error");
        setMessage(result.message);
        setTimeout(() => setStatus("idle"), 9000);
      }
    } catch {
      setStatus("error");
      setMessage("Error al enviar el mensaje. Por favor intenta de nuevo.");
      setTimeout(() => setStatus("idle"), 9000);
    }
  };

  const chosenCount = (eventType ? 1 : 0) + services.length + flavors.length;

  return (
    <section id="contact" className="section-y bg-brand-background">
      <div className="wrap">
        <Reveal y={12}>
          <p className="eyebrow text-brand-accent">Reserva tu evento</p>
        </Reveal>
        <MaskLines
          className="display mt-6 max-w-6xl text-[clamp(2.2rem,4.6vw,4.25rem)] text-graphite-900"
          lines={[
            "Arma tu barra.",
            <span key="b" className="font-semibold text-brand-accent">Te respondemos con una propuesta.</span>,
          ]}
        />
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-graphite-700">
            Elige el tipo de evento, el servicio y los sabores. Con fecha y lugar ya tenemos lo
            necesario para cotizar.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-12">
          {/* Formulario */}
          <Reveal className="lg:col-span-7" y={36}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-14"
            aria-describedby="estado-envio"
          >
            <fieldset id="paso-evento">
              <StepTitle n="01">¿Qué vas a celebrar?</StepTitle>
              <div role="radiogroup" aria-label="Tipo de evento" className="flex flex-wrap gap-3">
                {EVENT_TYPES.map((event) => (
                  <button
                    key={event}
                    type="button"
                    role="radio"
                    aria-checked={eventType === event}
                    onClick={() => {
                      setEventType(event);
                      setEventError(false);
                    }}
                    className="chip"
                  >
                    {event}
                  </button>
                ))}
              </div>
              {eventError && (
                <p role="alert" className="mt-3 text-xs font-medium text-red-700">
                  Elige el tipo de evento para continuar.
                </p>
              )}
            </fieldset>

            <fieldset>
              <StepTitle n="02">¿Qué servicio te interesa?</StepTitle>
              <div className="flex flex-wrap gap-3">
                {SERVICES.map((service) => (
                  <button
                    key={service.title}
                    type="button"
                    aria-pressed={services.includes(service.title)}
                    onClick={() => toggleService(service.title)}
                    className="chip"
                  >
                    {service.title}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-graphite-500">Puedes elegir más de uno o dejarlo abierto.</p>
            </fieldset>

            <fieldset>
              <StepTitle n="03">¿Con qué sabores?</StepTitle>
              <div className="flex flex-wrap gap-3">
                {ALL_FLAVORS.map((name) => (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={flavors.includes(name)}
                    onClick={() => toggleFlavor(name)}
                    className="chip"
                  >
                    {name}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-graphite-500">
                Es solo una guía: el menú final lo afinamos juntos.
              </p>
            </fieldset>

            <fieldset>
              <StepTitle n="04">Cuéntanos de tu evento y de ti</StepTitle>
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label htmlFor="fechaEvento" className="mb-2 block text-sm font-medium text-graphite-800">
                    Fecha tentativa
                  </label>
                  <input {...register("fechaEvento")} id="fechaEvento" type="date" min={today} className="field" />
                </div>
                <div>
                  <label htmlFor="invitados" className="mb-2 block text-sm font-medium text-graphite-800">
                    Invitados
                  </label>
                  <input
                    {...register("invitados")}
                    id="invitados"
                    type="text"
                    inputMode="numeric"
                    placeholder="Número estimado"
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor="ubicacion" className="mb-2 block text-sm font-medium text-graphite-800">
                    Ubicación
                  </label>
                  <input
                    {...register("ubicacion")}
                    id="ubicacion"
                    type="text"
                    placeholder="Ciudad / venue"
                    className="field"
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-graphite-800">
                    Nombre completo
                  </label>
                  <input
                    {...register("nombre")}
                    id="nombre"
                    type="text"
                    autoComplete="name"
                    placeholder="Tu nombre"
                    aria-invalid={!!errors.nombre}
                    aria-describedby={errors.nombre ? "err-nombre" : undefined}
                    className="field"
                  />
                  <FieldError id="err-nombre" message={errors.nombre?.message} />
                </div>
                <div>
                  <label htmlFor="correo" className="mb-2 block text-sm font-medium text-graphite-800">
                    Correo
                  </label>
                  <input
                    {...register("correo")}
                    id="correo"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@email.com"
                    aria-invalid={!!errors.correo}
                    aria-describedby={errors.correo ? "err-correo" : undefined}
                    className="field"
                  />
                  <FieldError id="err-correo" message={errors.correo?.message} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="telefono" className="mb-2 block text-sm font-medium text-graphite-800">
                    Teléfono
                  </label>
                  <input
                    {...register("telefono")}
                    id="telefono"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+52 55 0000 0000"
                    aria-invalid={!!errors.telefono}
                    aria-describedby={errors.telefono ? "err-telefono" : undefined}
                    className="field"
                  />
                  <FieldError id="err-telefono" message={errors.telefono?.message} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="notas" className="mb-2 block text-sm font-medium text-graphite-800">
                    Algo más que debamos saber <span className="font-normal text-graphite-500">(opcional)</span>
                  </label>
                  <textarea
                    {...register("notas")}
                    id="notas"
                    rows={4}
                    placeholder="Horario, estilo del evento, sabores favoritos..."
                    className="field resize-none"
                  />
                </div>
              </div>
            </fieldset>

            <div>
              <button type="submit" disabled={status === "loading"} className="btn-gold-on-light w-full py-4 sm:w-auto sm:min-w-[260px] disabled:opacity-50">
                {status === "loading" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar solicitud
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              <div id="estado-envio" aria-live="polite" className="mt-5">
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 rounded-xl border border-green-800/30 bg-green-50 p-4 text-green-900"
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
                      <p>{message}</p>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 rounded-xl border border-red-800/30 bg-red-50 p-4 text-red-900"
                    >
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                      <p>{message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </form>
          </Reveal>

          {/* Resumen: "Tu barra" */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal y={36} delay={0.1}>
              <div className="grain relative overflow-hidden bg-graphite-900 p-7 text-white sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow text-brand-primary">Tu barra</p>
                    <p className="mt-3 text-2xl font-light tracking-tight">
                      {chosenCount === 0 ? "Aún está vacía" : `${chosenCount} ${chosenCount === 1 ? "elemento" : "elementos"}`}
                    </p>
                  </div>
                  {chosenCount > 0 && (
                    <button
                      type="button"
                      onClick={clear}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 transition-colors hover:text-brand-primary"
                    >
                      <X className="h-3.5 w-3.5" />
                      Limpiar
                    </button>
                  )}
                </div>

                <dl className="mt-8 divide-y divide-white/15 border-y border-white/15 text-sm">
                  <SummaryRow label="Evento" value={eventType} />
                  <SummaryRow label="Servicios" value={services.length ? services.join(" · ") : null} />
                  <SummaryRow label="Sabores" value={flavors.length ? flavors.join(" · ") : null} />
                  <SummaryRow label="Fecha" value={fecha ? formatDate(fecha) : null} />
                  <SummaryRow label="Invitados" value={invitados || null} />
                  <SummaryRow label="Ubicación" value={ubicacion || null} />
                </dl>

                <p className="mt-6 text-xs leading-relaxed text-white/65">
                  Respondemos en menos de 48 horas hábiles. Aquí no hay precios: se definen según tu evento.
                </p>
              </div>

              <div className="mt-8 space-y-4 text-[0.95rem] text-graphite-700">
                <p className="eyebrow text-brand-accent">Contacto directo</p>
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-brand-accent" />
                  {SITE_CONFIG.phone}
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-brand-accent" />
                  <a href={`mailto:${SITE_CONFIG.email}`} className="link-line break-all">
                    {SITE_CONFIG.email}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-brand-accent" />
                  {SITE_CONFIG.address}
                </p>
                <a
                  href={SITE_CONFIG.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-line-light mt-2 w-full"
                >
                  Prefiero agendar una llamada
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5">
      <dt className="text-white/60">{label}</dt>
      <dd className={value ? "text-white" : "text-white/40"}>{value || "Por definir"}</dd>
    </div>
  );
}
