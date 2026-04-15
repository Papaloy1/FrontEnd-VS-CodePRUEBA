import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Soluciona NG8103 (*ngFor)
import { ApiService } from '../../services/api.service';
import { Reportes } from '../../models/reportes'; // Verifica que la ruta a tu modelo sea correcta

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule], // <-- Requerido para directivas estructurales
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss' // <-- Cambiado a .scss para solucionar NG2008
})
export class ReportesComponent implements OnInit {
  misReportes: Reportes[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Al entrar, obtenemos los reportes actualizados
    this.apiService.getReportes().subscribe({
      next: (datos: any) => {
        this.misReportes = datos;
      },
      error: (err: any) => console.error('Error al cargar la lista de reportes', err)
    });
  }
}