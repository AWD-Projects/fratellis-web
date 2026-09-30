import type { ContactFormData } from "@/types/contact";

const GOLD = "#B4945C";
const GOLD_DARK = "#8A6D3B";
const INK = "#1A1A1A";
const CREAM = "#F6F4EF";
const LINE = "#E6E1D3";
const MUTED = "#7B7B7B";
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const row = (label: string, value: string, strong = false) => `
  <tr>
    <td style="padding:14px 0;border-bottom:1px solid ${LINE};width:36%;vertical-align:top;font:600 11px/1.4 ${FONT};letter-spacing:2px;text-transform:uppercase;color:${MUTED};">${label}</td>
    <td style="padding:14px 0;border-bottom:1px solid ${LINE};vertical-align:top;font:${strong ? 600 : 400} 16px/1.5 ${FONT};color:${INK};">${value}</td>
  </tr>`;

const pills = (items: string[]) =>
  items.length
    ? items
        .map(
          (i) =>
            `<span style="display:inline-block;margin:0 6px 8px 0;padding:7px 14px;border:1px solid ${INK};border-radius:999px;font:500 13px/1.2 ${FONT};color:${INK};">${escapeHtml(i)}</span>`
        )
        .join("")
    : `<span style="font:400 14px/1.5 ${FONT};color:${MUTED};">Por definir</span>`;

export function buildQuoteEmail(data: ContactFormData, siteUrl: string) {
  const nombre = escapeHtml(data.nombre);
  const correo = escapeHtml(data.correo);
  const telefono = escapeHtml(data.telefono);
  const telHref = data.telefono.replace(/[^\d+]/g, "");
  const notas = data.notas?.trim() ? escapeHtml(data.notas.trim()).replace(/\n/g, "<br>") : "";
  const servicios = data.servicios ?? [];
  const sabores = data.sabores ?? [];
  const structured = data.servicios !== undefined || data.sabores !== undefined;
  const legacy = !structured ? escapeHtml(data.mensaje).replace(/\n/g, "<br>") : "";

  const subject = `Cotización: ${data.tipoEvento} · ${data.nombre}`;
  const details = [data.fechaEvento, data.invitados ? `${data.invitados} invitados` : "", data.ubicacion].filter(Boolean).join(" · ");
  const preheader = `${data.tipoEvento}${details ? ` · ${details}` : ""}`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${CREAM};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:24px;overflow:hidden;">

        <tr><td style="background:${INK};padding:36px 40px 32px;">
          <img src="${siteUrl}/images/brand/logo.png" alt="Fratelli's" width="72" height="72" style="display:block;border:0;height:72px;width:72px;object-fit:contain;" />
          <div style="margin-top:28px;font:600 11px/1 ${FONT};letter-spacing:4px;text-transform:uppercase;color:${GOLD};">Nueva solicitud de cotización</div>
          <div style="margin-top:14px;font:200 34px/1.1 ${FONT};letter-spacing:-1px;color:#ffffff;">${escapeHtml(data.tipoEvento)}</div>
          <div style="margin-top:12px;font:400 14px/1.5 ${FONT};color:rgba(255,255,255,0.72);">${escapeHtml(details || "Fecha y lugar por confirmar")}</div>
        </td></tr>
        <tr><td style="height:4px;background:${GOLD};font-size:0;line-height:0;">&nbsp;</td></tr>

        <tr><td style="padding:36px 40px 8px;">
          <div style="font:600 11px/1 ${FONT};letter-spacing:3px;text-transform:uppercase;color:${GOLD_DARK};">Quién escribe</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
            ${row("Nombre", nombre, true)}
            ${row("Correo", `<a href="mailto:${correo}" style="color:${INK};text-decoration:underline;">${correo}</a>`)}
            ${row("Teléfono", `<a href="tel:${escapeHtml(telHref)}" style="color:${INK};text-decoration:underline;">${telefono}</a>`)}
          </table>
        </td></tr>

        <tr><td style="padding:28px 40px 8px;">
          <div style="font:600 11px/1 ${FONT};letter-spacing:3px;text-transform:uppercase;color:${GOLD_DARK};">El evento</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
            ${row("Tipo", escapeHtml(data.tipoEvento), true)}
            ${row("Fecha", escapeHtml(data.fechaEvento || "Por confirmar"))}
            ${row("Invitados", escapeHtml(data.invitados || "Por confirmar"))}
            ${row("Lugar", escapeHtml(data.ubicacion || "Por confirmar"))}
          </table>
        </td></tr>

        <tr><td style="padding:28px 40px 8px;">
          <div style="background:${CREAM};border-radius:18px;padding:24px;">
            ${
              structured
                ? `<div style="font:600 11px/1 ${FONT};letter-spacing:3px;text-transform:uppercase;color:${GOLD_DARK};">Servicios</div>
            <div style="margin-top:14px;">${pills(servicios)}</div>
            <div style="margin-top:18px;font:600 11px/1 ${FONT};letter-spacing:3px;text-transform:uppercase;color:${GOLD_DARK};">Sabores</div>
            <div style="margin-top:14px;">${pills(sabores)}</div>`
                : `<div style="font:400 15px/1.7 ${FONT};color:${INK};">${legacy}</div>`
            }
          </div>
        </td></tr>

        ${
          notas
            ? `<tr><td style="padding:20px 40px 0;">
          <div style="font:600 11px/1 ${FONT};letter-spacing:3px;text-transform:uppercase;color:${GOLD_DARK};">Notas del cliente</div>
          <div style="margin-top:12px;padding-left:16px;border-left:3px solid ${GOLD};font:400 15px/1.7 ${FONT};color:${INK};">${notas}</div>
        </td></tr>`
            : ""
        }

        <tr><td style="padding:36px 40px 40px;" align="left">
          <a href="mailto:${correo}?subject=${encodeURIComponent(`Tu cotización en Fratelli's: ${data.tipoEvento}`)}" style="display:inline-block;background:${INK};color:#ffffff;text-decoration:none;padding:15px 28px;border-radius:999px;font:600 14px/1 ${FONT};letter-spacing:0.5px;">Responder a ${nombre}</a>
          <a href="tel:${escapeHtml(telHref)}" style="display:inline-block;margin-left:8px;color:${INK};text-decoration:none;padding:14px 26px;border:1px solid ${INK};border-radius:999px;font:600 14px/1 ${FONT};">Llamar</a>
        </td></tr>

        <tr><td style="background:${INK};padding:22px 40px;font:400 12px/1.6 ${FONT};color:rgba(255,255,255,0.65);">
          Enviado desde el formulario de fratellishelados.com. Puedes responder a este correo y le llegará directo a ${nombre}.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    "NUEVA SOLICITUD DE COTIZACIÓN · Fratelli's Helados",
    "",
    `Nombre: ${data.nombre}`,
    `Correo: ${data.correo}`,
    `Teléfono: ${data.telefono}`,
    "",
    `Evento: ${data.tipoEvento}`,
    `Fecha: ${data.fechaEvento || "Por confirmar"}`,
    `Invitados: ${data.invitados || "Por confirmar"}`,
    `Lugar: ${data.ubicacion || "Por confirmar"}`,
    "",
    structured
      ? `Servicios: ${servicios.length ? servicios.join(", ") : "Por definir"}\nSabores: ${sabores.length ? sabores.join(", ") : "Por definir"}`
      : data.mensaje,
    data.notas?.trim() ? `\nNotas: ${data.notas.trim()}` : "",
  ].join("\n");

  return { subject, html, text };
}
