import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent implements OnInit {

  misReportes = [
    {
      folio: 'BC-2024-001',
      titulo: 'Bache profundo en Av. Tecnológico',
      descripcion: 'El bache abarca casi medio carril y ya ha causado daños a dos vehículos en esta semana. Se requiere pavimentación urgente.',
      fecha: '24 Mar 2026',
      ubicacion: 'Col. Centro, Cd. Obregón',
      status: 'Resuelto',
      statusClass: 'bg-green-500',
      comentarios: 3,
      fotoUrl: 'https://images.unsplash.com/photo-1599423300746-b62500d4ba3a?q=80&w=500&auto=format&fit=crop'
    },
    {
      folio: 'AL-2024-015',
      titulo: 'Luminaria fundida frente a parque',
      descripcion: 'La luminaria principal del parque infantil no enciende desde hace 3 días, dejando la zona totalmente oscura y peligrosa.',
      fecha: '22 Mar 2026',
      ubicacion: 'Fracc. Los Olivos',
      status: 'En Proceso',
      statusClass: 'bg-blue-500',
      comentarios: 1,
      fotoUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=500&auto=format&fit=crop'
    },
    {
      folio: 'SB-2024-089',
      titulo: 'Acumulación de basura en baldío',
      descripcion: 'Personas ajenas a la colonia están tirando escombros y basura orgánica en el lote baldío de la calle 400.',
      fecha: '18 Mar 2026',
      ubicacion: 'Calle 400 y Michoacán',
      status: 'Pendiente',
      statusClass: 'bg-orange-500',
      comentarios: 0,
      fotoUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=500&auto=format&fit=crop'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}