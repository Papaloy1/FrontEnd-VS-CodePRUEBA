import { Usuario } from './usuario';

export interface Notificaciones {
  notificacionId: number;
  usuarioId: number;
  titulo: string;
  mensaje: string;
  leida: boolean;
  fechaCreacion: Date;
  usuario?: Usuario;
}