import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { PersonaService } from '../../../shared/services/persona.service';
import { Persona } from '../../../shared/models/persona.model';

@Component({
    selector: 'app-form-persona',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden md:max-w-2xl">
        <div class="md:flex">
          <div class="w-full p-8">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
              {{ isEditMode ? 'Editar Registro' : 'Nuevo Registro' }}
            </div>
            <h1 class="block mt-1 text-lg leading-tight font-medium text-black dark:text-white text-2xl mb-6">
              {{ isEditMode ? 'Actualizar Persona' : 'Registrar Nueva Persona' }}
            </h1>

            <form [formGroup]="personaForm" (ngSubmit)="onSubmit()" class="space-y-6">
              
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <!-- Nombre Input -->
                <div class="col-span-1">
                  <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre
                  </label>
                  <input 
                    type="text" 
                    id="nombre" 
                    formControlName="nombre"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    [class.border-red-300]="personaForm.get('nombre')?.invalid && personaForm.get('nombre')?.touched"
                  >
                  <div *ngIf="personaForm.get('nombre')?.invalid && personaForm.get('nombre')?.touched" class="mt-1 text-xs text-red-600">
                    <span *ngIf="personaForm.get('nombre')?.errors?.['required']">Requerido.</span>
                  </div>
                </div>

                <!-- Apellidos Input -->
                <div class="col-span-1">
                  <label for="apellidos" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Apellidos
                  </label>
                  <input 
                    type="text" 
                    id="apellidos" 
                    formControlName="apellidos"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    [class.border-red-300]="personaForm.get('apellidos')?.invalid && personaForm.get('apellidos')?.touched"
                  >
                  <div *ngIf="personaForm.get('apellidos')?.invalid && personaForm.get('apellidos')?.touched" class="mt-1 text-xs text-red-600">
                    <span *ngIf="personaForm.get('apellidos')?.errors?.['required']">Requerido.</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <!-- DNI Input -->
                <div class="col-span-1">
                  <label for="dni" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    DNI
                  </label>
                  <input 
                    type="text" 
                    id="dni" 
                    formControlName="dni"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    [class.border-red-300]="personaForm.get('dni')?.invalid && personaForm.get('dni')?.touched"
                  >
                  <div *ngIf="personaForm.get('dni')?.invalid && personaForm.get('dni')?.touched" class="mt-1 text-xs text-red-600">
                    <span *ngIf="personaForm.get('dni')?.errors?.['required']">Requerido.</span>
                    <span *ngIf="personaForm.get('dni')?.errors?.['pattern']">DNI inválido (8 dígitos).</span>
                  </div>
                </div>

                <!-- Teléfono Input -->
                <div class="col-span-1">
                  <label for="telefono" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Teléfono
                  </label>
                  <input 
                    type="text" 
                    id="telefono" 
                    formControlName="telefono"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                </div>
              </div>

              <!-- Error Message -->
              <div *ngIf="errorMessage" class="rounded-md bg-red-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">{{ errorMessage }}</h3>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  type="button" 
                  (click)="cancelar()"
                  class="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  [disabled]="personaForm.invalid || isLoading"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                >
                  <svg *ngIf="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isLoading ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Guardar') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    `
})
export class FormPersonaComponent implements OnInit {
    private fb = inject(FormBuilder);
    private personaService = inject(PersonaService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    personaForm: FormGroup;
    isEditMode: boolean = false;
    personaId?: number;
    isLoading: boolean = false;
    errorMessage: string = '';

    constructor() {
        this.personaForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(2)]],
            apellidos: ['', [Validators.required, Validators.minLength(2)]],
            dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
            telefono: ['']
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isEditMode = true;
                this.personaId = +params['id'];
                this.cargarPersona(this.personaId);
            }
        });
    }

    cargarPersona(id: number): void {
        this.isLoading = true;
        this.personaService.obtenerPersonaPorId(id).subscribe({
            next: (persona) => {
                this.personaForm.patchValue({
                    nombre: persona.nombre,
                    apellidos: persona.apellidos,
                    dni: persona.dni,
                    telefono: persona.telefono
                });
                this.isLoading = false;
            },
            error: (error) => {
                this.errorMessage = 'Error al cargar la persona: ' + error.message;
                this.isLoading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.personaForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';

            const persona: Persona = this.personaForm.value;

            const request = this.isEditMode
                ? this.personaService.actualizarPersona(this.personaId!, persona)
                : this.personaService.crearPersona(persona);

            request.subscribe({
                next: () => {
                    this.router.navigate(['/personas']);
                },
                error: (error) => {
                    this.errorMessage = error.message;
                    this.isLoading = false;
                }
            });
        } else {
            this.personaForm.markAllAsTouched();
        }
    }

    cancelar(): void {
        this.router.navigate(['/personas']);
    }
}
