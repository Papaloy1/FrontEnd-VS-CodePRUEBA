import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {

  // Definición de variables que el HTML necesita
  usuarioNombre: string = 'Juan Pérez González';
  reportesTotales: number = 18;
  perfilForm!: FormGroup; // Aquí está el nombre exacto que pedía el error
  
  isLoading: boolean = false;
  savedSuccess: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // 1. Inicializamos el formulario con los campos del HTML
    this.perfilForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      teléfono: ['', [Validators.pattern('^[0-9]{10}$')]]
    });

    // 2. Cargamos datos de ejemplo
    this.cargarDatosDemo();
  }

  private cargarDatosDemo(): void {
    this.perfilForm.patchValue({
      nombre: 'Juan',
      apellido: 'Pérez González',
      email: 'juan.perez@email.com',
      teléfono: '5512345678'
    });
  }

  // Esta es la función que el HTML llama al hacer submit
  guardarCambios(): void {
    if (this.perfilForm.invalid) return;

    this.isLoading = true;
    this.savedSuccess = false;

    // Simulamos guardado
    setTimeout(() => {
      this.isLoading = false;
      this.savedSuccess = true;
      
      const val = this.perfilForm.value;
      this.usuarioNombre = `${val.nombre} ${val.apellido}`;

      // Ocultar mensaje de éxito después de un rato
      setTimeout(() => this.savedSuccess = false, 3000);
    }, 1500);
  }
}