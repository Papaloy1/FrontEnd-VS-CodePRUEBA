import { Reportes } from './reportes';

export interface Evidencias {
  evidenciaId: number;
  reporteId: number;
  tipoArchivo: string;
  rutaArchivo: string;
  fechaSubida: Date;
  reporte?: Reportes;
}