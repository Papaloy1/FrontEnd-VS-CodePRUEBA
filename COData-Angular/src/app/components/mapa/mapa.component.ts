import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent implements OnInit, AfterViewInit {
  private map!: L.Map;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Coordenadas iniciales (puedes ajustarlas a tu ciudad)
    this.map = L.map('map', {
      center: [27.4828, -109.9304], // Ejemplo: Cd. Obregón
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // Agregamos un marcador de prueba elegante
    const icon = L.divIcon({
      className: 'custom-div-icon',
      html: "<div style='background-color:#8B1538; width:12px; height:12px; border-radius:50%; border:2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);'></div>",
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });

    L.marker([27.4828, -109.9304], { icon }).addTo(this.map)
      .bindPopup('<b class="text-[#8B1538]">Bache detectado</b><br>Calle Principal #123')
      .openPopup();
  }
}