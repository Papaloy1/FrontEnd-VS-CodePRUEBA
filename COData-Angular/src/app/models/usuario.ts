export interface Usuario {
  usuarioId: number;
  nombre: string;
  email: string;
  contrasenia: string; // <-- CAMBIADO: De 'contraseña' a 'contrasenia'
  fechaRegistro: Date;
  teléfono?: string;
  rol?: string;
  avatar?: string;
}