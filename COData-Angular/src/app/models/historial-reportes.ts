import { Usuario } from './usuario';
import { Reportes } from './reportes';

export interface HistorialReportes {
  historial_id: number;
  reporte_id: number;
  usuario_id: number;
  campo_modificado: string;
  valor_anterior: string;
  valor_nuevo: string;
  fecha: Date;
  reporte?: Reportes;
  usuario?: Usuario;
}