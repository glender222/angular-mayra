import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibroService } from '../../../shared/services/libro.service';
import { CartService } from '../../../shared/services/cart.service';
import { Libro } from '../../../shared/models/libro.model';

@Component({
  selector: 'app-catalogo-venta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Catálogo de Libros</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Explora nuestra colección y añade libros a tu carrito</p>
        </div>
        <a routerLink="/ventas/carrito" class="relative bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Ver Carrito
          <span *ngIf="cartCount() > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white dark:border-gray-800">
            {{ cartCount() }}
          </span>
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

      <!-- Grid de Libros -->
      <div *ngIf="!isLoading && libros.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div *ngFor="let libro of libros" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
          <div class="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{{ libro.titulo }}</h3>
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>{{ libro.autor?.nombre }}</span>
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">{{ libro.categoria?.descripcion }}</span>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">S/ {{ libro.precio | number:'1.2-2' }}</span>
              <button 
                (click)="addToCart(libro)"
                class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
})
export class CatalogoVentaComponent implements OnInit {
  private libroService = inject(LibroService);
  public cartService = inject(CartService);

  libros: Libro[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  // Signal for cart count
  cartCount = this.cartService.itemCount;

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.libroService.listarLibros().subscribe({
      next: (data) => {
        this.libros = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al listar libros:', error);
        this.errorMessage = 'No se pudieron cargar los libros.';
        this.isLoading = false;
      }
    });
  }

  addToCart(libro: Libro): void {
    this.cartService.addToCart(libro);
  }
}
