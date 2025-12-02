import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditorialService } from '../../../shared/services/editorial.service';
import { Editorial } from '../../../shared/models/editorial.model';

@Component({
  selector: 'app-lista-editorial',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Editoriales</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Gestiona las casas editoriales de tus libros</p>
        </div>
        <a routerLink="/editoriales/crear" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nueva Editorial
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
      <div *ngIf="!isLoading && !errorMessage && editoriales.length === 0" class="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">No hay editoriales registradas</h3>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Registra las editoriales para asociarlas a los libros.</p>
      </div>

      <!-- Data Table -->
      <div *ngIf="!isLoading && editoriales.length > 0" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                <th class="px-6 py-4 font-semibold">ID</th>
                <th class="px-6 py-4 font-semibold">Nombre</th>
                <th class="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr *ngFor="let editorial of editoriales" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150 ease-in-out group">
                <td class="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-sm">#{{ editorial.idEditorial }}</td>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ editorial.nombre }}</div>
                </td>
                <td class="px-6 py-4 text-right space-x-2">
                  <a [routerLink]="['/editoriales/editar', editorial.idEditorial]" class="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-md text-sm font-medium transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                  </a>
                  <button (click)="eliminarEditorial(editorial.idEditorial!)" class="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm font-medium transition-colors duration-200">
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
export class ListaEditorialComponent implements OnInit {
  private editorialService = inject(EditorialService);

  private cdr = inject(ChangeDetectorRef);

  editoriales: Editorial[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.cargarEditoriales();
  }

  cargarEditoriales(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.editorialService.listarEditoriales().subscribe({
      next: (data) => {
        this.editoriales = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al listar editoriales:', error);
        this.errorMessage = 'No se pudieron cargar las editoriales. Por favor, inténtelo de nuevo más tarde.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  eliminarEditorial(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta editorial?')) {
      this.editorialService.eliminarEditorial(id).subscribe({
        next: () => {
          this.cargarEditoriales();
        },
        error: (error) => {
          alert('Error al eliminar la editorial: ' + error.message);
        }
      });
    }
  }
}
