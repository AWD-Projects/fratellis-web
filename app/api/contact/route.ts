import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildQuoteEmail } from "@/lib/email-template";
import type { ContactFormData, ApiResponse } from "@/types/contact";

// Limpia espacios y comillas que suelen colarse al pegar variables en Vercel
const env = (name: string) => (process.env[name] ?? "").trim().replace(/^["']|["']$/g, "");

const DEBUG = env("CONTACT_DEBUG") === "1";
const GENERIC_ERROR = "Error al enviar el mensaje. Por favor intenta de nuevo.";

const fail = (status: number, code: string, detail?: string) =>
  NextResponse.json(
    {
      success: false,
      message: GENERIC_ERROR,
      code,
      ...(DEBUG && detail ? { detail } : {}),
    },
    { status }
  );

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const {
      nombre,
      correo,
      telefono,
      tipoEvento,
      fechaEvento,
      invitados,
      ubicacion,
      mensaje,
    } = body;

    // Validate input
    if (!nombre || !correo || !telefono || !tipoEvento || !mensaje) {
      return NextResponse.json(
        { success: false, message: "Todos los campos son requeridos" } as ApiResponse,
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return NextResponse.json(
        { success: false, message: "Correo electrónico inválido" } as ApiResponse,
        { status: 400 }
      );
    }

    const apiKey = env("RESEND_API_KEY");
    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY no está definida en este entorno");
      return fail(500, "missing_api_key", "RESEND_API_KEY no está definida en este entorno de Vercel");
    }
    const resend = new Resend(apiKey);

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://fratellishelados.com").replace(/\/$/, "");
    const { subject, html, text } = buildQuoteEmail(body, siteUrl);

    const { error } = await resend.emails.send({
      from: env("RESEND_FROM_EMAIL") || "Fratelli's Helados <onboarding@resend.dev>",
      to: [env("CONTACT_EMAIL") || "fratellisheladeria16@gmail.com"],
      replyTo: correo,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend rechazó el envío:", JSON.stringify(error));
      return fail(502, error.name || "resend_error", error.message);
    }

    return NextResponse.json(
      { success: true, message: "¡Gracias! Recibimos tu solicitud y te respondemos en menos de 48 horas hábiles." } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("[contact] Error inesperado:", error);
    return fail(500, "unexpected_error", error instanceof Error ? error.message : String(error));
  }
}
