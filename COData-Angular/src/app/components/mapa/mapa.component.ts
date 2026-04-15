import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { ApiService } from '../../services/api.service';

export interface ReporteMapaUI {
  id: number;
  lat: number;
  lng: number;
  descripcion: string;
  categoria: string;
  marcador?: L.Marker;
}

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  
  mostrarModal = false;
  modoEdicion = false;
  
  reporteActual: ReporteMapaUI = this.generarReporteVacio();
  listaReportes: ReporteMapaUI[] = [];

  constructor(private zone: NgZone, private apiService: ApiService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
    this.cargarMarcadoresDesdeBD();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [27.4828, -109.9304],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.zone.run(() => {
        this.abrirModalCreacion(e.latlng.lat, e.latlng.lng);
      });
    });
  }

  // --- Operaciones a Base de Datos ---

  guardarReporte(): void {
    if (!this.reporteActual.descripcion || !this.reporteActual.categoria) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    const datosUbicacion = {
      latitud: this.reporteActual.lat,
      longitud: this.reporteActual.lng
    };

    // 1. Guardar Ubicación
    this.apiService.crearUbicacion(datosUbicacion).subscribe({
      next: (ubicacionGuardada: any) => {
        
        const categoriasMap: { [key: string]: number } = {
          'Bache': 1,
          'Fuga de Agua': 2,
          'Alumbrado Público': 3,
          'Basura': 4
        };

        const reporteFinal = {
          usuarioId: 1, 
          categoriaId: categoriasMap[this.reporteActual.categoria] || 1,
          ubicacionId: ubicacionGuardada.ubicacionId, 
          titulo: `Incidencia: ${this.reporteActual.categoria}`,
          descripcion: this.reporteActual.descripcion,
          estado: 'Pendiente',
          prioridad: 'Normal'
        };

        // 2. Guardar Reporte vinculado
        this.apiService.crearReporte(reporteFinal).subscribe({
          next: (res: any) => {
            const nuevoItemUI: ReporteMapaUI = {
              id: res.reporteId,
              lat: this.reporteActual.lat,
              lng: this.reporteActual.lng,
              descripcion: this.reporteActual.descripcion,
              categoria: this.reporteActual.categoria
            };
            
            nuevoItemUI.marcador = this.crearMarcador(nuevoItemUI);
            this.listaReportes.push(nuevoItemUI);
            
            this.cerrarModal();
          },
          error: (err: any) => console.error('Error al crear el reporte', err)
        });
      },
      error: (err: any) => console.error('Error al guardar coordenadas', err)
    });
  }

  eliminarReporte(): void {
    if (confirm('¿Estás seguro de eliminar este reporte?')) {
      const index = this.listaReportes.findIndex(r => r.id === this.reporteActual.id);
      if (index !== -1) {
        const marker = this.listaReportes[index].marcador;
        if (marker) this.map.removeLayer(marker);
        this.listaReportes.splice(index, 1);
        
        // TODO: Agregar llamada a this.apiService.eliminarReporte(this.reporteActual.id)
      }
      this.cerrarModal();
    }
  }

  private cargarMarcadoresDesdeBD(): void {
    this.apiService.getReportes().subscribe({
      next: (reportes: any[]) => {
        reportes.forEach((r: any) => {
          const item: ReporteMapaUI = {
            id: r.reporteId,
            lat: r.ubicacion?.latitud || 27.4828, 
            lng: r.ubicacion?.longitud || -109.9304,
            descripcion: r.descripcion,
            categoria: r.categoria?.nombreCategoria || 'General' 
          };
          item.marcador = this.crearMarcador(item);
          this.listaReportes.push(item);
        });
      },
      error: (err: any) => console.error('Error al cargar reportes iniciales', err)
    });
  }

  // --- Lógica del Mapa (Leaflet) ---

  private crearMarcador(reporte: ReporteMapaUI): L.Marker {
    const icon = L.divIcon({
      className: 'custom-div-icon',
      html: "<div style='background-color:#8B1538; width:14px; height:14px; border-radius:50%; border:2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);'></div>",
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });

    const marker = L.marker([reporte.lat, reporte.lng], { icon }).addTo(this.map);
    marker.bindPopup(`<b>${reporte.categoria}</b><br>${reporte.descripcion}`);

    marker.on('click', () => {
      this.zone.run(() => {
        this.abrirModalEdicion(reporte);
      });
    });

    return marker;
  }

  // --- Manejo del Estado de la Interfaz ---

  abrirModalCreacion(lat: number, lng: number): void {
    this.reporteActual = this.generarReporteVacio();
    this.reporteActual.lat = lat;
    this.reporteActual.lng = lng;
    this.modoEdicion = false;
    this.mostrarModal = true;
  }

  abrirModalEdicion(reporte: ReporteMapaUI): void {
    this.reporteActual = { ...reporte };
    this.modoEdicion = true;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  private generarReporteVacio(): ReporteMapaUI {
    return { id: 0, lat: 0, lng: 0, descripcion: '', categoria: '' };
  }
}