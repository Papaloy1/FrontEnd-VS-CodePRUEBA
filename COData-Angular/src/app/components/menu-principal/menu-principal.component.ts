import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../models';

interface MenuItemConfig {
  icon: string;
  label: string;
  route: string;
  requiresLogin?: boolean;
}

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.scss',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class MenuPrincipalComponent implements OnInit {
  usuarioActual: Usuario | null = null;
  isMenuOpen = false;
  isUserMenuOpen = false;

  // Main navigation items
  menuItems: MenuItemConfig[] = [
    {
      icon: 'fa-solid fa-house',
      label: 'Principal',
      route: '/principal',
      requiresLogin: true,
    },
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Seguimiento',
      route: '/seguimiento',
      requiresLogin: true,
    },
    {
      icon: 'fa-solid fa-map-location-dot',
      label: 'Mapa',
      route: '/mapa',
      requiresLogin: true,
    },
    {
      icon: 'fa-solid fa-file-alt',
      label: 'Reportes',
      route: '/reportes',
      requiresLogin: true,
    },
    {
      icon: 'fa-solid fa-bell',
      label: 'Notificaciones',
      route: '/notificaciones',
      requiresLogin: true,
    },
    {
      icon: 'fa-solid fa-gear',
      label: 'Configuración',
      route: '/configuracion',
      requiresLogin: true,
    },
  ];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsuarioActual();
  }

  loadUsuarioActual(): void {
    // Get user from localStorage (set after login)
    const usuarioJson = localStorage.getItem('usuarioActual');
    if (usuarioJson) {
      try {
        this.usuarioActual = JSON.parse(usuarioJson);
      } catch (error) {
        console.error('Error parsing usuario data:', error);
        this.usuarioActual = null;
      }
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isUserMenuOpen = false;
    }
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    if (this.isUserMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  closeMenus(): void {
    this.isMenuOpen = false;
    this.isUserMenuOpen = false;
  }

  onNavigation(): void {
    this.closeMenus();
  }

  logout(): void {
    // Clear user data
    localStorage.removeItem('usuarioActual');
    localStorage.removeItem('authToken');
    this.usuarioActual = null;
    
    // Redirect to login
    this.router.navigate(['/login']);
  }

  getInitials(): string {
    if (!this.usuarioActual || !this.usuarioActual.nombre) {
      return '?';
    }
    return this.usuarioActual.nombre
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
