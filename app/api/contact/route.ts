import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildQuoteEmail } from "@/lib/email-template";
import type { ContactFormData, ApiResponse } from "@/types/contact";

const resend = new Resend(process.env.RESEND_API_KEY || "re_missing");

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

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { success: false, message: "Error de configuración del servidor" } as ApiResponse,
        { status: 500 }
      );
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://fratellishelados.com").replace(/\/$/, "");
    const { subject, html, text } = buildQuoteEmail(body, siteUrl);

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Fratelli's Helados <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "fratellisheladeria16@gmail.com"],
      replyTo: correo,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, message: "Error al enviar el mensaje. Por favor intenta de nuevo." } as ApiResponse,
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message: "¡Gracias! Tu mensaje se ha enviado con éxito." } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Error al enviar el mensaje. Por favor intenta de nuevo." } as ApiResponse,
      { status: 500 }
    );
  }
}
