import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { Usuario } from '../../../shared/models/usuario.model';

@Component({
  selector: 'app-lista-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Usuarios</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Administración de cuentas de acceso</p>
        </div>
        <a routerLink="/usuarios/crear" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Nuevo Usuario
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
      <div *ngIf="!isLoading && !errorMessage && usuarios.length === 0" class="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">No hay usuarios registrados</h3>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Crea usuarios para que los trabajadores puedan acceder al sistema.</p>
      </div>

      <!-- Data Table -->
      <div *ngIf="!isLoading && usuarios.length > 0" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                <th class="px-6 py-4 font-semibold">ID</th>
                <th class="px-6 py-4 font-semibold">Email</th>
                <th class="px-6 py-4 font-semibold">Rol</th>
                <th class="px-6 py-4 font-semibold">Trabajador</th>
                <th class="px-6 py-4 font-semibold">Estado</th>
                <th class="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr *ngFor="let usuario of usuarios" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150 ease-in-out group">
                <td class="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-sm">#{{ usuario.idUsuario }}</td>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ usuario.email }}</div>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    {{ usuario.rol?.nombre }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {{ usuario.trabajador?.persona?.nombre }} {{ usuario.trabajador?.persona?.apellidos }}
                </td>
                <td class="px-6 py-4">
                  <span [class]="usuario.estado === 'ACTIVO' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {{ usuario.estado }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right space-x-2">
                  <a [routerLink]="['/usuarios/editar', usuario.idUsuario]" class="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-md text-sm font-medium transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                  </a>
                  <button (click)="eliminarUsuario(usuario.idUsuario!)" class="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm font-medium transition-colors duration-200">
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
export class ListaUsuarioComponent implements OnInit {
  private usuarioService = inject(UsuarioService);

  private cdr = inject(ChangeDetectorRef);

  usuarios: Usuario[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al listar usuarios:', error);
        this.errorMessage = 'No se pudieron cargar los usuarios. Por favor, inténtelo de nuevo más tarde.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => {
          this.cargarUsuarios();
        },
        error: (error) => {
          alert('Error al eliminar el usuario: ' + error.message);
        }
      });
    }
  }
}
