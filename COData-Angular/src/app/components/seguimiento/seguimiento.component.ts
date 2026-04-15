import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seguimiento.component.html',
  styleUrl: './seguimiento.component.scss'
})
export class SeguimientoComponent implements OnInit {

  // Datos para las barras de progreso
  estadisticas = [
    { categoria: 'Baches y Pavimento', porcentaje: 75, color: '#8B1538' },
    { categoria: 'Alumbrado Público', porcentaje: 45, color: '#3b82f6' },
    { categoria: 'Seguridad Ciudadana', porcentaje: 90, color: '#10b981' },
    { categoria: 'Limpieza y Basura', porcentaje: 30, color: '#f59e0b' }
  ];

  // Datos para la línea de tiempo
  actividades = [
    { 
      mensaje: 'Reporte finalizado con éxito', 
      id: '#B-4521', 
      tiempo: 'Hoy, 2:30 PM', 
      icon: 'fa-solid fa-check', 
      bgIcon: 'bg-green-500' 
    },
    { 
      mensaje: 'Nueva actualización en', 
      id: '#A-8829', 
      tiempo: 'Ayer', 
      icon: 'fa-solid fa-message', 
      bgIcon: 'bg-blue-500' 
    },
    { 
      mensaje: 'Reporte recibido por el municipio', 
      id: '#S-1022', 
      tiempo: 'Hace 2 días', 
      icon: 'fa-solid fa-file-import', 
      bgIcon: 'bg-orange-500' 
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}