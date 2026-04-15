import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'; // Importamos Router
import { CommonModule } from '@angular/common'; // Importante para *ngIf y [ngClass]
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component'; // Importamos tu menú

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  // Agregamos los módulos necesarios aquí para que el HTML los reconozca
  imports: [RouterOutlet, CommonModule, MenuPrincipalComponent],
})
export class AppComponent {
  title = 'COData-Angular';

  // Inyectamos el Router para saber en qué página estamos
  constructor(private router: Router) {}

  /**
   * Esta función revisa la URL actual.
   * Si estamos en login o registro, devuelve 'true'.
   */
  esPantallaAuth(): boolean {
    const rutaActual = this.router.url;
    return rutaActual.includes('login') || rutaActual.includes('registro');
  }
}