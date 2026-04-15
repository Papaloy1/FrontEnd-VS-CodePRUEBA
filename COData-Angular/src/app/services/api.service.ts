import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Reportes, 
  Usuario, 
  Categorias, 
  Notificaciones, 
  Evidencias, 
  HistorialReportes, 
  Ubicaciones 
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // 1. VERIFICA ESTE PUERTO: Asegúrate que coincida con el que corre en Visual Studio
  private apiUrl = 'https://localhost:7099/api';

  // 2. CONFIGURACIÓN DE SEGURIDAD: Requerida por .AllowCredentials() en C#
  private httpOptions = {
    withCredentials: true 
  };

  constructor(private http: HttpClient) { }



  // ============ USUARIO ============
  
  // Agrega este nuevo método para el Login
  login(credenciales: { email: string; contraseña?: string; contrasenia?: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Usuario/login`, credenciales);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/Usuario`);
  }
  // ... el resto de tu código se mantiene igual

 crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/Usuario`, usuario, this.httpOptions);
  }

  // ... (Aplica ', this.httpOptions' al final de tus otros métodos POST, PUT y DELETE) ...

  // ============ REPORTES (EJEMPLO ACTUALIZADO) ============
// ============ REPORTES ============
  
  // Obtener todos los reportes para pintar los marcadores
  getReportes(): Observable<Reportes[]> {
    return this.http.get<Reportes[]>(`${this.apiUrl}/Reportes`, this.httpOptions);
  }

  crearReporte(reporte: any): Observable<Reportes> { // Se puede usar 'any' o un DTO específico si el modelo Reportes requiere el ID
    return this.http.post<Reportes>(`${this.apiUrl}/Reportes`, reporte, this.httpOptions);
  }

  actualizarReporte(id: number, reporte: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Reportes/${id}`, reporte, this.httpOptions);
  }

  eliminarReporte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Reportes/${id}`, this.httpOptions);
  }
  crearUbicacion(ubicacion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Ubicaciones`, ubicacion, this.httpOptions);
  }
}