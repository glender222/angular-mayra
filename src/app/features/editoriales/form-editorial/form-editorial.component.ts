import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { EditorialService } from '../../../shared/services/editorial.service';
import { Editorial } from '../../../shared/models/editorial.model';

@Component({
    selector: 'app-form-editorial',
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
              {{ isEditMode ? 'Actualizar Editorial' : 'Registrar Nueva Editorial' }}
            </h1>

            <form [formGroup]="editorialForm" (ngSubmit)="onSubmit()" class="space-y-6">
              
              <!-- Nombre Input -->
              <div>
                <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre de la Editorial
                </label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" />
                      <path fill-rule="evenodd" d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    id="nombre" 
                    formControlName="nombre"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition duration-150 ease-in-out"
                    placeholder="Ej. Editorial Planeta"
                    [class.border-red-300]="editorialForm.get('nombre')?.invalid && editorialForm.get('nombre')?.touched"
                  >
                </div>
                <div *ngIf="editorialForm.get('nombre')?.invalid && editorialForm.get('nombre')?.touched" class="mt-1 text-sm text-red-600">
                  <span *ngIf="editorialForm.get('nombre')?.errors?.['required']">El nombre es obligatorio.</span>
                  <span *ngIf="editorialForm.get('nombre')?.errors?.['minlength']">El nombre debe tener al menos 3 caracteres.</span>
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
                  [disabled]="editorialForm.invalid || isLoading"
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
export class FormEditorialComponent implements OnInit {
    private fb = inject(FormBuilder);
    private editorialService = inject(EditorialService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    editorialForm: FormGroup;
    isEditMode: boolean = false;
    editorialId?: number;
    isLoading: boolean = false;
    errorMessage: string = '';

    constructor() {
        this.editorialForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isEditMode = true;
                this.editorialId = +params['id'];
                this.cargarEditorial(this.editorialId);
            }
        });
    }

    cargarEditorial(id: number): void {
        this.isLoading = true;
        this.editorialService.obtenerEditorialPorId(id).subscribe({
            next: (editorial) => {
                this.editorialForm.patchValue({
                    nombre: editorial.nombre
                });
                this.isLoading = false;
            },
            error: (error) => {
                this.errorMessage = 'Error al cargar la editorial: ' + error.message;
                this.isLoading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.editorialForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';

            const editorial: Editorial = this.editorialForm.value;

            const request = this.isEditMode
                ? this.editorialService.actualizarEditorial(this.editorialId!, editorial)
                : this.editorialService.crearEditorial(editorial);

            request.subscribe({
                next: () => {
                    this.router.navigate(['/editoriales']);
                },
                error: (error) => {
                    this.errorMessage = error.message;
                    this.isLoading = false;
                }
            });
        } else {
            this.editorialForm.markAllAsTouched();
        }
    }

    cancelar(): void {
        this.router.navigate(['/editoriales']);
    }
}
