import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <!-- Sidebar -->
      <aside class="bg-indigo-800 text-white w-64 flex-shrink-0 hidden md:flex flex-col transition-all duration-300">
        <div class="p-6 border-b border-indigo-700 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span class="text-2xl font-bold tracking-wider">Librería</span>
        </div>

        <nav class="flex-1 overflow-y-auto py-4">
          <ul class="space-y-1 px-3">
            <!-- Catálogos -->
            <li>
              <div class="px-3 py-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider">Catálogos</div>
            </li>
            <li>
              <a routerLink="/libros" routerLinkActive="bg-indigo-900 text-white" class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors group">
                <svg class="mr-3 h-5 w-5 text-indigo-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Libros
              </a>
            </li>
            <li>
              <a routerLink="/autores" routerLinkActive="bg-indigo-900 text-white" class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors group">
                <svg class="mr-3 h-5 w-5 text-indigo-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Autores
              </a>
            </li>
            <li>
              <a routerLink="/categorias" routerLinkActive="bg-indigo-900 text-white" class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors group">
                <svg class="mr-3 h-5 w-5 text-indigo-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Categorías
              </a>
            </li>
            <li>
              <a routerLink="/editoriales" routerLinkActive="bg-indigo-900 text-white" class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors group">
                <svg class="mr-3 h-5 w-5 text-indigo-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Editoriales
              </a>
            </li>

            <!-- Administración -->
            <li>
              <div class="px-3 py-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mt-4">Administración</div>
            </li>
            <li>
              <a routerLink="/personas" routerLinkActive="bg-indigo-900 text-white" class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors group">
                <svg class="mr-3 h-5 w-5 text-indigo-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Personas
              </a>
            </li>
            <li>
              <a routerLink="/roles" routerLinkActive="bg-indigo-900 text-white" class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors group">
                <svg class="mr-3 h-5 w-5 text-indigo-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Roles
              </a>
            </li>
            <li>
              <a routerLink="/trabajadores" routerLinkActive="bg-indigo-900 text-white" class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors group">
                <svg class="mr-3 h-5 w-5 text-indigo-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Trabajadores
              </a>
            </li>
            <li>
              <a routerLink="/usuarios" routerLinkActive="bg-indigo-900 text-white" class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors group">
                <svg class="mr-3 h-5 w-5 text-indigo-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Usuarios
              </a>
            </li>

            <!-- Ventas -->
            <li>
              <div class="px-3 py-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mt-4">Ventas</div>
            </li>
            <li>
              <a routerLink="/clientes" routerLinkActive="bg-indigo-900 text-white" class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors group">
                <svg class="mr-3 h-5 w-5 text-indigo-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Clientes
              </a>
            </li>
            <li>
              <a routerLink="/ventas/catalogo" routerLinkActive="bg-indigo-900 text-white" class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors group">
                <svg class="mr-3 h-5 w-5 text-indigo-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Catálogo
              </a>
            </li>
            <li>
              <a routerLink="/ventas/carrito" routerLinkActive="bg-indigo-900 text-white" class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors group">
                <svg class="mr-3 h-5 w-5 text-indigo-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Carrito
              </a>
            </li>
          </ul>
        </nav>

        <div class="p-4 border-t border-indigo-700">
          <button (click)="logout()" class="flex items-center w-full px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white rounded-md transition-colors group">
            <svg class="mr-3 h-5 w-5 text-indigo-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <!-- Mobile Menu Button -->
      <div class="md:hidden fixed top-0 left-0 w-full bg-indigo-800 text-white z-50 p-4 flex justify-between items-center">
        <span class="text-xl font-bold">Librería</span>
        <button (click)="toggleMobileMenu()" class="text-white focus:outline-none">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path *ngIf="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path *ngIf="isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Overlay -->
      <div *ngIf="isMobileMenuOpen" class="md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-40" (click)="toggleMobileMenu()"></div>

      <!-- Mobile Sidebar -->
      <aside [class.translate-x-0]="isMobileMenuOpen" [class.-translate-x-full]="!isMobileMenuOpen" class="fixed inset-y-0 left-0 z-50 w-64 bg-indigo-800 text-white transform transition-transform duration-300 ease-in-out md:hidden flex flex-col">
        <!-- Same content as desktop sidebar -->
         <div class="p-6 border-b border-indigo-700 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span class="text-2xl font-bold tracking-wider">Librería</span>
        </div>
        <nav class="flex-1 overflow-y-auto py-4">
             <!-- ... (Copy of the list items above, simplified for brevity in this prompt response but fully included in file) ... -->
             <ul class="space-y-1 px-3">
                <!-- Catálogos -->
                <li><div class="px-3 py-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider">Catálogos</div></li>
                <li><a routerLink="/libros" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white">Libros</a></li>
                <li><a routerLink="/autores" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white">Autores</a></li>
                <li><a routerLink="/categorias" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white">Categorías</a></li>
                <li><a routerLink="/editoriales" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white">Editoriales</a></li>
                
                <!-- Administración -->
                <li><div class="px-3 py-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mt-4">Administración</div></li>
                <li><a routerLink="/personas" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white">Personas</a></li>
                <li><a routerLink="/roles" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white">Roles</a></li>
                <li><a routerLink="/trabajadores" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white">Trabajadores</a></li>
                <li><a routerLink="/usuarios" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white">Usuarios</a></li>

                <!-- Ventas -->
                <li><div class="px-3 py-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mt-4">Ventas</div></li>
                <li><a routerLink="/clientes" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white">Clientes</a></li>
                <li><a routerLink="/ventas/catalogo" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white">Catálogo</a></li>
                <li><a routerLink="/ventas/carrito" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white">Carrito</a></li>
             </ul>
        </nav>
         <div class="p-4 border-t border-indigo-700">
          <button (click)="logout()" class="flex items-center w-full px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white rounded-md transition-colors group">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto h-screen pt-16 md:pt-0">
        <div class="p-6">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class MainLayoutComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    isMobileMenuOpen = false;

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    logout() {
        this.authService.logout();
    }
}
