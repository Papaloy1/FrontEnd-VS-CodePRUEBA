import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { SeguimientoComponent } from './components/seguimiento/seguimiento.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'seguimiento', component: SeguimientoComponent },
  { path: '**', redirectTo: '/login' },
];
