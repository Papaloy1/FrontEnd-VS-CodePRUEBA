import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../models';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  currentStep: string = 'personal'; // Pasos: 'personal', 'contact', 'security', 'confirm'
  submitSuccess: boolean = false;
  submitError: string | null = null;
  isLoading: boolean = false;
  agreeToTerms: boolean = false;
  passwordStrength: number = 0;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Restauramos tu formulario con todos los campos del diseño visual
    this.registroForm = this.fb.group({
     nombre: ['', [Validators.required, Validators.minLength(2)]], 
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      teléfono: ['', [Validators.required, Validators.minLength(10)]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContraseña: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    // Escuchamos la contraseña para tu barra de colores dinámica
    this.registroForm.get('contraseña')?.valueChanges.subscribe(value => {
      this.calculatePasswordStrength(value || '');
    });
  }

  // Validador personalizado para confirmar la contraseña
  passwordMatchValidator(g: FormGroup) {
    return g.get('contraseña')?.value === g.get('confirmarContraseña')?.value
      ? null : { passwordMismatch: true };
  }

  // Controla la barra visual de progreso
  getStepProgress(): number {
    switch (this.currentStep) {
      case 'personal': return 25;
      case 'contact': return 50;
      case 'security': return 75;
      case 'confirm': return 100;
      default: return 25;
    }
  }

  // Navegación entre los pasos
  goToStep(step: string): void {
    this.currentStep = step;
  }

  // Validación para el HTML (Bordes rojos)
  hasError(controlName: string): boolean {
    const control = this.registroForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // Mensajes de error en rojo debajo de los inputs
  getErrorMessage(controlName: string): string {
    const control = this.registroForm.get(controlName);
    if (control?.hasError('required')) return 'Este campo es requerido';
    if (control?.hasError('email')) return 'Correo no válido';
    if (control?.hasError('minlength')) return 'No cumple con la longitud mínima';
    if (this.registroForm.hasError('passwordMismatch') && controlName === 'confirmarContraseña') {
       return 'Las contraseñas no coinciden';
    }
    return '';
  }

  // Lógica de la fuerza de contraseña
  calculatePasswordStrength(password: string): void {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.match(/[a-z]+/)) strength += 25;
    if (password.match(/[A-Z]+/)) strength += 25;
    if (password.match(/[0-9]+/)) strength += 25;
    this.passwordStrength = strength;
  }

  getPasswordStrengthColor(): string {
    if (this.passwordStrength <= 25) return '#ef4444'; // Rojo
    if (this.passwordStrength <= 50) return '#eab308'; // Amarillo
    if (this.passwordStrength <= 75) return '#3b82f6'; // Azul
    return '#22c55e'; // Verde
  }

  getPasswordStrengthLabel(): string {
    if (this.passwordStrength <= 25) return 'Débil';
    if (this.passwordStrength <= 50) return 'Regular';
    if (this.passwordStrength <= 75) return 'Buena';
    return 'Fuerte';
  }

  // === AQUÍ SE CONECTA CON EL BACKEND ===
  submitRegistro(): void {
    // Si el form es inválido o no aceptó términos, no hacemos nada
    if (this.registroForm.invalid || !this.agreeToTerms) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.submitError = null;

    const formValues = this.registroForm.value;
    
    const fullName = `${this.registroForm.get('nombre')?.value} ${this.registroForm.get('apellido')?.value}`;
    
    const newUser: Usuario = {
      usuarioId: 0,
      nombre: fullName, // <-- Asegúrate de que diga 'fullName' y no esté vacío
      email: this.registroForm.get('email')?.value,
      contrasenia: this.registroForm.get('contraseña')?.value,
      fechaRegistro: new Date(),
      teléfono: this.registroForm.get('teléfono')?.value || undefined
    };
    // Mandamos el usuario a tu API Backend (C#)
    this.apiService.crearUsuario(newUser).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.submitSuccess = true; // Mostramos tu div de éxito
        
        // Lo redirigimos al login después de 3 segundos para que lea el mensaje
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        this.isLoading = false;
        this.submitError = error.error?.message || 'Error al conectar con la base de datos.';
        console.error('Error en registro:', error);
      }
    });
  }
}