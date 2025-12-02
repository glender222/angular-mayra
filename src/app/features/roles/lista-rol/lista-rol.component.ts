import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RolService } from '../../../shared/services/rol.service';
import { Rol } from '../../../shared/models/rol.model';

@Component({
  selector: 'app-lista-rol',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Roles</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Gestiona los roles y permisos del sistema</p>
        </div>
        <a routerLink="/roles/crear" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Nuevo Rol
        </a>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Error State -->
      <div *ngIf="errorMessage" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm" role="alert">
        <p class="font-bold">Error</p>
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Empty State -->
      <div *ngIf="!isLoading && !errorMessage && roles.length === 0" class="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">No hay roles registrados</h3>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Define roles para controlar el acceso al sistema.</p>
      </div>

      <!-- Data Table -->
      <div *ngIf="!isLoading && roles.length > 0" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                <th class="px-6 py-4 font-semibold">ID</th>
                <th class="px-6 py-4 font-semibold">Nombre del Rol</th>
                <th class="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr *ngFor="let rol of roles" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150 ease-in-out group">
                <td class="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-sm">#{{ rol.idRol }}</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    {{ rol.nombre }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right space-x-2">
                  <a [routerLink]="['/roles/editar', rol.idRol]" class="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-md text-sm font-medium transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                  </a>
                  <button (click)="eliminarRol(rol.idRol!)" class="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm font-medium transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `
})
export class ListaRolComponent implements OnInit {
  private rolService = inject(RolService);

  private cdr = inject(ChangeDetectorRef);

  roles: Rol[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.rolService.listarRoles().subscribe({
      next: (data) => {
        this.roles = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al listar roles:', error);
        this.errorMessage = 'No se pudieron cargar los roles. Por favor, inténtelo de nuevo más tarde.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  eliminarRol(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este rol?')) {
      this.rolService.eliminarRol(id).subscribe({
        next: () => {
          this.cargarRoles();
        },
        error: (error) => {
          alert('Error al eliminar el rol: ' + error.message);
        }
      });
    }
  }
}
