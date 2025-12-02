import { Injectable, computed, signal } from '@angular/core';
import { Libro } from '../models/libro.model';

export interface CartItem {
    libro: Libro;
    cantidad: number;
    subtotal: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cartItems = signal<CartItem[]>([]);

    total = computed(() => {
        return this.cartItems().reduce((acc, item) => acc + item.subtotal, 0);
    });

    itemCount = computed(() => {
        return this.cartItems().reduce((acc, item) => acc + item.cantidad, 0);
    });

    addToCart(libro: Libro) {
        this.cartItems.update(items => {
            const existingItem = items.find(item => item.libro.idLibro === libro.idLibro);
            if (existingItem) {
                return items.map(item =>
                    item.libro.idLibro === libro.idLibro
                        ? { ...item, cantidad: item.cantidad + 1, subtotal: (item.cantidad + 1) * libro.precio }
                        : item
                );
            }
            return [...items, { libro, cantidad: 1, subtotal: libro.precio }];
        });
    }

    removeFromCart(libroId: number) {
        this.cartItems.update(items => items.filter(item => item.libro.idLibro !== libroId));
    }

    updateQuantity(libroId: number, quantity: number) {
        if (quantity <= 0) {
            this.removeFromCart(libroId);
            return;
        }
        this.cartItems.update(items =>
            items.map(item =>
                item.libro.idLibro === libroId
                    ? { ...item, cantidad: quantity, subtotal: quantity * item.libro.precio }
                    : item
            )
        );
    }

    clearCart() {
        this.cartItems.set([]);
    }
}
