"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from "lucide-react";
import type { ContactFormData, ApiResponse } from "@/types/contact";
import { SITE_CONFIG } from "@/lib/content";

const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  correo: z.string().email("Correo electrónico inválido"),
  telefono: z.string().min(7, "Ingresa un teléfono válido"),
  tipoEvento: z.string().min(2, "Cuéntanos qué tipo de evento es"),
  fechaEvento: z.string().optional(),
  invitados: z.string().optional(),
  ubicacion: z.string().optional(),
  mensaje: z.string().min(12, "El mensaje debe tener al menos 12 caracteres"),
});

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        setStatus("success");
        setMessage(result.message);
        reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setMessage(result.message);
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setMessage("Error al enviar el mensaje. Por favor intenta de nuevo.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="lux-eyebrow">Reserva tu evento</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold lux-title mt-4">
              Hagamos que tu celebración sea inolvidable
            </h2>
            <p className="text-lg text-graphite-500 mt-4 max-w-2xl mx-auto">
              Compártenos los detalles y diseñaremos una propuesta personalizada.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lux-surface rounded-3xl p-8 md:p-10 space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold lux-title">Contacto directo</h3>
                <p className="text-graphite-500 mt-2">
                  Respondemos en menos de 48 horas hábiles.
                </p>
              </div>

              <div className="space-y-5 text-sm text-graphite-600">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-primary" />
                  <span>{SITE_CONFIG.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-primary" />
                  <span>{SITE_CONFIG.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-brand-primary" />
                  <span>{SITE_CONFIG.address}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-secondary/40">
                <p className="text-sm text-graphite-500">
                  También puedes agendar una llamada con nuestro equipo para revisar la
                  logística, el menú y la puesta en escena.
                </p>
                <a
                  href={SITE_CONFIG.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-brand-primary font-medium"
                >
                  Agendar llamada
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lux-surface rounded-3xl p-8 md:p-10"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-graphite-700 mb-2">
                      Nombre completo
                    </label>
                    <input
                      {...register("nombre")}
                      type="text"
                      id="nombre"
                      className="w-full px-4 py-3 rounded-2xl border border-graphite-200 focus:border-brand-primary outline-none transition-all bg-white"
                      placeholder="Tu nombre"
                    />
                    {errors.nombre && (
                      <p className="text-red-500 text-xs mt-2">{errors.nombre.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="correo" className="block text-sm font-medium text-graphite-700 mb-2">
                      Correo
                    </label>
                    <input
                      {...register("correo")}
                      type="email"
                      id="correo"
                      className="w-full px-4 py-3 rounded-2xl border border-graphite-200 focus:border-brand-primary outline-none transition-all bg-white"
                      placeholder="tu@email.com"
                    />
                    {errors.correo && (
                      <p className="text-red-500 text-xs mt-2">{errors.correo.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-graphite-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      {...register("telefono")}
                      type="tel"
                      id="telefono"
                      className="w-full px-4 py-3 rounded-2xl border border-graphite-200 focus:border-brand-primary outline-none transition-all bg-white"
                      placeholder="+52 55 0000 0000"
                    />
                    {errors.telefono && (
                      <p className="text-red-500 text-xs mt-2">{errors.telefono.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="tipoEvento" className="block text-sm font-medium text-graphite-700 mb-2">
                      Tipo de evento
                    </label>
                    <input
                      {...register("tipoEvento")}
                      type="text"
                      id="tipoEvento"
                      className="w-full px-4 py-3 rounded-2xl border border-graphite-200 focus:border-brand-primary outline-none transition-all bg-white"
                      placeholder="Boda, corporativo, cumpleaños..."
                    />
                    {errors.tipoEvento && (
                      <p className="text-red-500 text-xs mt-2">{errors.tipoEvento.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="fechaEvento" className="block text-sm font-medium text-graphite-700 mb-2">
                      Fecha tentativa
                    </label>
                    <input
                      {...register("fechaEvento")}
                      type="text"
                      id="fechaEvento"
                      className="w-full px-4 py-3 rounded-2xl border border-graphite-200 focus:border-brand-primary outline-none transition-all bg-white"
                      placeholder="dd/mm/aaaa"
                    />
                  </div>
                  <div>
                    <label htmlFor="invitados" className="block text-sm font-medium text-graphite-700 mb-2">
                      Invitados
                    </label>
                    <input
                      {...register("invitados")}
                      type="text"
                      id="invitados"
                      className="w-full px-4 py-3 rounded-2xl border border-graphite-200 focus:border-brand-primary outline-none transition-all bg-white"
                      placeholder="Número estimado"
                    />
                  </div>
                  <div>
                    <label htmlFor="ubicacion" className="block text-sm font-medium text-graphite-700 mb-2">
                      Ubicación
                    </label>
                    <input
                      {...register("ubicacion")}
                      type="text"
                      id="ubicacion"
                      className="w-full px-4 py-3 rounded-2xl border border-graphite-200 focus:border-brand-primary outline-none transition-all bg-white"
                      placeholder="Ciudad / venue"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-graphite-700 mb-2">
                    Cuéntanos los detalles
                  </label>
                  <textarea
                    {...register("mensaje")}
                    id="mensaje"
                    rows={5}
                    className="w-full px-4 py-3 rounded-2xl border border-graphite-200 focus:border-brand-primary outline-none transition-all resize-none bg-white"
                    placeholder="Horario, estilo del evento, sabores favoritos..."
                  />
                  {errors.mensaje && (
                    <p className="text-red-500 text-xs mt-2">{errors.mensaje.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full px-6 py-4 bg-brand-primary text-white rounded-full font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar solicitud
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-2xl"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <p>{message}</p>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-2xl"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <p>{message}</p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
