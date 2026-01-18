import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import type { ContactFormData, ApiResponse } from "@/types/contact";

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

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

    if (!process.env.SENDGRID_API_KEY) {
      console.error("SendGrid API key not configured");
      return NextResponse.json(
        { success: false, message: "Error de configuración del servidor" } as ApiResponse,
        { status: 500 }
      );
    }

    const escapeHtml = (value: string) =>
      value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const safeNombre = escapeHtml(nombre);
    const safeCorreo = escapeHtml(correo);
    const safeTelefono = escapeHtml(telefono);
    const safeTipoEvento = escapeHtml(tipoEvento);
    const safeFechaEvento = escapeHtml(fechaEvento || "Por confirmar");
    const safeInvitados = escapeHtml(invitados || "Por confirmar");
    const safeUbicacion = escapeHtml(ubicacion || "Por confirmar");
    const safeMensaje = escapeHtml(mensaje).replace(/\n/g, "<br>");

    const replyToLabel = `Responder a ${safeNombre}`;
    const replyToHref = `mailto:${safeCorreo}`;

    // Send email using SendGrid
    const msg = {
      to: process.env.SENDGRID_TO_EMAIL || "fratellisheladeria16@gmail.com",
      from: process.env.SENDGRID_FROM_EMAIL || "fratellisheladeria16@gmail.com",
      replyTo: correo,
      subject: `Nueva solicitud de catering: ${nombre}`,
      text: [
        "Nueva solicitud de catering - Fratelli's Helados",
        "",
        `Nombre: ${nombre}`,
        `Correo electrónico: ${correo}`,
        `Teléfono: ${telefono}`,
        `Tipo de evento: ${tipoEvento}`,
        `Fecha tentativa: ${fechaEvento || "Por confirmar"}`,
        `Invitados estimados: ${invitados || "Por confirmar"}`,
        `Ubicación: ${ubicacion || "Por confirmar"}`,
        "",
        "Mensaje:",
        mensaje,
      ].join("\n"),
      html: `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Solicitud de Catering</title>
          </head>
          <body style="margin:0;padding:0;background-color:#f6f4ef;color:#333333;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f4ef;padding:32px 12px;font-family:Arial, Helvetica, sans-serif;">
              <tr>
                <td align="center">
                  <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:640px;max-width:100%;background-color:#ffffff;border-radius:28px;overflow:hidden;box-shadow:0 18px 50px rgba(26,26,26,0.08);">
                    <tr>
                      <td style="background-color:#b4945c;padding:28px 32px;color:#ffffff;">
                        <div style="font-size:12px;letter-spacing:4px;text-transform:uppercase;opacity:0.85;">Fratelli's Helados</div>
                        <div style="font-size:26px;line-height:1.2;font-weight:600;margin-top:8px;">Nueva solicitud de catering</div>
                        <div style="margin-top:8px;font-size:14px;opacity:0.9;">Detalles recibidos desde el sitio web.</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:28px 32px 12px 32px;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0 12px;">
                          <tr>
                            <td style="width:30%;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#8b8b8b;">Nombre</td>
                            <td style="font-size:16px;color:#333333;font-weight:600;">${safeNombre}</td>
                          </tr>
                          <tr>
                            <td style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#8b8b8b;">Correo</td>
                            <td style="font-size:16px;color:#333333;">${safeCorreo}</td>
                          </tr>
                          <tr>
                            <td style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#8b8b8b;">Teléfono</td>
                            <td style="font-size:16px;color:#333333;">${safeTelefono}</td>
                          </tr>
                          <tr>
                            <td style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#8b8b8b;">Tipo de evento</td>
                            <td style="font-size:16px;color:#333333;">${safeTipoEvento}</td>
                          </tr>
                          <tr>
                            <td style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#8b8b8b;">Fecha</td>
                            <td style="font-size:16px;color:#333333;">${safeFechaEvento}</td>
                          </tr>
                          <tr>
                            <td style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#8b8b8b;">Invitados</td>
                            <td style="font-size:16px;color:#333333;">${safeInvitados}</td>
                          </tr>
                          <tr>
                            <td style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#8b8b8b;">Ubicación</td>
                            <td style="font-size:16px;color:#333333;">${safeUbicacion}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 32px 24px 32px;">
                        <div style="background-color:#f9f7f1;border:1px solid rgba(180,148,92,0.22);border-radius:18px;padding:18px 20px;">
                          <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#8b8b8b;margin-bottom:10px;">Mensaje</div>
                          <div style="font-size:15px;line-height:1.6;color:#333333;">${safeMensaje}</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 32px 28px 32px;">
                        <a href="${replyToHref}" style="display:inline-block;background-color:#b4945c;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px;letter-spacing:0.5px;">
                          ${replyToLabel}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:18px 32px 28px 32px;background-color:#fbfaf7;color:#8b8b8b;font-size:12px;line-height:1.6;">
                        Responde directamente a este correo para continuar la conversación.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    };

    await sgMail.send(msg);

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
