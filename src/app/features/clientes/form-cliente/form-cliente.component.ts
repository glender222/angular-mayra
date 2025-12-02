import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ClienteService } from '../../../shared/services/cliente.service';
import { PersonaService } from '../../../shared/services/persona.service';
import { Cliente } from '../../../shared/models/cliente.model';
import { Persona } from '../../../shared/models/persona.model';

@Component({
    selector: 'app-form-cliente',
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
              {{ isEditMode ? 'Actualizar Cliente' : 'Registrar Nuevo Cliente' }}
            </h1>

            <form [formGroup]="clienteForm" (ngSubmit)="onSubmit()" class="space-y-6">
              
              <!-- Persona Select -->
              <div>
                <label for="persona" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Persona
                </label>
                <select 
                  id="persona" 
                  formControlName="persona"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option [ngValue]="null">Seleccione una persona</option>
                  <option *ngFor="let persona of personas" [value]="persona.idPersona">
                    {{ persona.nombre }} {{ persona.apellidos }} ({{ persona.dni }})
                  </option>
                </select>
                <div *ngIf="clienteForm.get('persona')?.invalid && clienteForm.get('persona')?.touched" class="mt-1 text-xs text-red-600">
                  <span *ngIf="clienteForm.get('persona')?.errors?.['required']">Requerido.</span>
                </div>
              </div>

              <!-- Estado Select -->
              <div>
                <label for="estado" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Estado
                </label>
                <select 
                  id="estado" 
                  formControlName="estado"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="INACTIVO">INACTIVO</option>
                </select>
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
                  [disabled]="clienteForm.invalid || isLoading"
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
export class FormClienteComponent implements OnInit {
    private fb = inject(FormBuilder);
    private clienteService = inject(ClienteService);
    private personaService = inject(PersonaService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    clienteForm: FormGroup;
    personas: Persona[] = [];
    isEditMode: boolean = false;
    clienteId?: number;
    isLoading: boolean = false;
    errorMessage: string = '';

    constructor() {
        this.clienteForm = this.fb.group({
            persona: [null, Validators.required],
            estado: ['ACTIVO', Validators.required]
        });
    }

    ngOnInit(): void {
        this.cargarPersonas();
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isEditMode = true;
                this.clienteId = +params['id'];
                this.cargarCliente(this.clienteId);
            }
        });
    }

    cargarPersonas(): void {
        this.personaService.listarPersonas().subscribe({
            next: (data) => this.personas = data
        });
    }

    cargarCliente(id: number): void {
        this.isLoading = true;
        this.clienteService.obtenerClientePorId(id).subscribe({
            next: (cliente) => {
                this.clienteForm.patchValue({
                    persona: cliente.persona?.idPersona,
                    estado: cliente.estado
                });
                this.isLoading = false;
            },
            error: (error) => {
                this.errorMessage = 'Error al cargar el cliente: ' + error.message;
                this.isLoading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.clienteForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';

            const cliente: Cliente = {
                persona: { idPersona: this.clienteForm.value.persona } as Persona,
                estado: this.clienteForm.value.estado
            };

            const request = this.isEditMode
                ? this.clienteService.actualizarCliente(this.clienteId!, cliente)
                : this.clienteService.crearCliente(cliente);

            request.subscribe({
                next: () => {
                    this.router.navigate(['/clientes']);
                },
                error: (error) => {
                    this.errorMessage = error.message;
                    this.isLoading = false;
                }
            });
        } else {
            this.clienteForm.markAllAsTouched();
        }
    }

    cancelar(): void {
        this.router.navigate(['/clientes']);
    }
}
