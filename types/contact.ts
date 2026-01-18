export interface ContactFormData {
  nombre: string;
  correo: string;
  telefono: string;
  tipoEvento: string;
  fechaEvento: string;
  invitados: string;
  ubicacion: string;
  mensaje: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}
