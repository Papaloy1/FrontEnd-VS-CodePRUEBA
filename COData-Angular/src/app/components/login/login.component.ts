import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  // Agregamos RouterLink para que el botón de "Regístrate aquí" funcione
  imports: [CommonModule, ReactiveFormsModule, RouterLink], 
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoadingLogin = false;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      // Cambiamos 'contraseña' por 'contrasena' (sin la ñ)
      contrasena: ['', [Validators.required, Validators.minLength(6)]], 
    });
  }

 onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoadingLogin = true;
    this.loginError = null;

    // Preparamos los datos tal como los espera tu backend (LoginRequest)
    // Nota: A veces C# mapea "contraseña" diferente por la "ñ", lo enviaremos como "contrasenia" también por si acaso.
   // Preparamos los datos asegurándonos de usar exactamente el nombre del control
    const loginData = {
      email: this.loginForm.get('email')?.value,
      // Usamos 'contrasena' que es como lo llamaste arriba en tu fb.group
      contrasenia: this.loginForm.get('contrasena')?.value, 
    };

    // Llamamos al servicio real en lugar del setTimeout
    this.apiService.login(loginData).subscribe({
      next: (response) => {
        this.isLoadingLogin = false;
        // Guardamos los datos recibidos del backend
        localStorage.setItem('usuarioActual', JSON.stringify(response));
        this.router.navigate(['/mapa']);
      },
      error: (error) => {
        this.isLoadingLogin = false;
        // Mostramos el mensaje de error que venga del backend (ej. "Usuario o contraseña incorrectos")
        this.loginError = error.error?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
        console.error('Login error:', error);
      },
    });
  }
}