import { Usuario } from './usuario';
import { Categorias } from './categorias';
import { Ubicaciones } from './ubicaciones';

export interface Reportes {
  reporteId: number;
  usuarioId: number;
  categoriaId: number;
  ubicacionId: number;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fecha_Creacion: Date;
  fecha_Cierre?: Date | null;
  usuario?: Usuario;
  categoria?: Categorias;
  ubicacion?: Ubicaciones;
}