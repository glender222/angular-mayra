import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart.service';
import { ClienteService } from '../../../shared/services/cliente.service';
import { VentaService } from '../../../shared/services/venta.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { AuthService } from '../../../core/services/auth.service';
import { Cliente } from '../../../shared/models/cliente.model';
import { Venta } from '../../../shared/models/venta.model';
import { DetalleVenta } from '../../../shared/models/detalle-venta.model';

@Component({
    selector: 'app-carrito',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">Carrito de Compras</h1>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Cart Items -->
        <div class="lg:w-2/3">
          <div *ngIf="cartItems().length === 0" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Tu carrito está vacío</h3>
            <p class="text-gray-500 dark:text-gray-400 mt-1 mb-6">Parece que aún no has añadido ningún libro.</p>
            <a routerLink="/ventas/catalogo" class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-200">
              Ir al Catálogo
            </a>
          </div>

          <div *ngIf="cartItems().length > 0" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <ul class="divide-y divide-gray-200 dark:divide-gray-700">
              <li *ngFor="let item of cartItems()" class="p-6 flex items-center">
                <div class="flex-shrink-0 w-16 h-20 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <div class="ml-4 flex-1">
                  <div class="flex justify-between">
                    <h3 class="text-base font-medium text-gray-900 dark:text-white">{{ item.libro.titulo }}</h3>
                    <p class="text-base font-medium text-gray-900 dark:text-white">S/ {{ item.subtotal | number:'1.2-2' }}</p>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.libro.autor?.nombre }}</p>
                  <div class="mt-2 flex items-center justify-between">
                    <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <button (click)="updateQuantity(item.libro.idLibro!, item.cantidad - 1)" class="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-md">-</button>
                      <span class="px-2 py-1 text-gray-900 dark:text-white min-w-[2rem] text-center">{{ item.cantidad }}</span>
                      <button (click)="updateQuantity(item.libro.idLibro!, item.cantidad + 1)" class="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-md">+</button>
                    </div>
                    <button (click)="removeItem(item.libro.idLibro!)" class="text-sm font-medium text-red-600 hover:text-red-500">
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Checkout Summary -->
        <div class="lg:w-1/3" *ngIf="cartItems().length > 0">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sticky top-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Resumen de Compra</h2>
            
            <div class="flow-root">
              <dl class="-my-4 text-sm divide-y divide-gray-200 dark:divide-gray-700">
                <div class="py-4 flex items-center justify-between">
                  <dt class="text-gray-600 dark:text-gray-400">Subtotal</dt>
                  <dd class="font-medium text-gray-900 dark:text-white">S/ {{ total() | number:'1.2-2' }}</dd>
                </div>
                <div class="py-4 flex items-center justify-between">
                  <dt class="text-gray-600 dark:text-gray-400">IGV (18%)</dt>
                  <dd class="font-medium text-gray-900 dark:text-white">S/ {{ total() * 0.18 | number:'1.2-2' }}</dd>
                </div>
                <div class="py-4 flex items-center justify-between">
                  <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd class="text-base font-bold text-indigo-600 dark:text-indigo-400">S/ {{ total() * 1.18 | number:'1.2-2' }}</dd>
                </div>
              </dl>
            </div>

            <div class="mt-6">
              <label for="cliente" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cliente</label>
              <select 
                id="cliente" 
                [(ngModel)]="selectedClienteId" 
                class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
              >
                <option [ngValue]="null">Seleccione un cliente</option>
                <option *ngFor="let cliente of clientes" [value]="cliente.idCliente">
                  {{ cliente.persona?.nombre }} {{ cliente.persona?.apellidos }}
                </option>
              </select>

              <button 
                (click)="procesarVenta()"
                [disabled]="!selectedClienteId || isProcessing"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
              >
                <svg *ngIf="isProcessing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isProcessing ? 'Procesando...' : 'Confirmar Venta' }}
              </button>
              <p *ngIf="!selectedClienteId" class="mt-2 text-xs text-red-500 text-center">Debe seleccionar un cliente para continuar.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
})
export class CarritoComponent implements OnInit {
    public cartService = inject(CartService);
    private clienteService = inject(ClienteService);
    private ventaService = inject(VentaService);
    private usuarioService = inject(UsuarioService); // Injected
    private authService = inject(AuthService);
    private router = inject(Router);

    cartItems = this.cartService.cartItems;
    total = this.cartService.total;

    clientes: Cliente[] = [];
    selectedClienteId: number | null = null;
    isProcessing: boolean = false;

    ngOnInit(): void {
        this.cargarClientes();
    }

    cargarClientes(): void {
        this.clienteService.listarClientes().subscribe({
            next: (data) => this.clientes = data
        });
    }

    updateQuantity(libroId: number, quantity: number): void {
        this.cartService.updateQuantity(libroId, quantity);
    }

    removeItem(libroId: number): void {
        this.cartService.removeFromCart(libroId);
    }

    procesarVenta(): void {
        if (!this.selectedClienteId) return;

        this.isProcessing = true;
        const userEmail = this.authService.getEmail();

        if (!userEmail) {
            alert('Error: No hay sesión activa.');
            this.isProcessing = false;
            return;
        }

        // Primero obtenemos el usuario actual por su email
        this.usuarioService.buscarPorEmail(userEmail).subscribe({
            next: (usuario: any) => {
                const venta: Venta = {
                    cliente: { idCliente: this.selectedClienteId } as Cliente,
                    usuario: { idUsuario: usuario.idUsuario } as any,
                    fechaVenta: new Date().toISOString(),
                    numVenta: 0, // El backend lo genera
                    cambio: 0,
                    estado: 'COMPLETADO',
                    moneda: 'PEN',
                    totalVenta: this.total() * 1.18,
                    metodoPago: 'EFECTIVO',
                    detalleVentas: this.cartItems().map(item => ({
                        libro: { idLibro: item.libro.idLibro } as any,
                        cantidad: item.cantidad,
                        precioUnitario: item.libro.precio,
                        subtotal: item.subtotal,
                        descuento: 0
                    }))
                };

                this.ventaService.crearVenta(venta).subscribe({
                    next: () => {
                        alert('¡Venta realizada con éxito!');
                        this.cartService.clearCart();
                        this.router.navigate(['/ventas/catalogo']);
                    },
                    error: (error: any) => {
                        console.error('Error al procesar venta:', error);
                        alert('Error al procesar la venta. Intente nuevamente.');
                        this.isProcessing = false;
                    }
                });
            },
            error: (error: any) => {
                console.error('Error al obtener usuario:', error);
                alert('Error al identificar al usuario vendedor.');
                this.isProcessing = false;
            }
        });
    }
}
