import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibroService } from '../../../shared/services/libro.service';
import { Libro } from '../../../shared/models/libro.model';

@Component({
    selector: 'app-lista-libros',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './lista-libros.component.html',
    styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent implements OnInit {
    private libroService = inject(LibroService);

    libros: Libro[] = [];
    isLoading: boolean = false;
    errorMessage: string = '';

    ngOnInit(): void {
        this.cargarLibros();
    }

    cargarLibros(): void {
        this.isLoading = true;
        this.errorMessage = '';

        this.libroService.listarLibros().subscribe({
            next: (data) => {
                console.log('Respuesta del backend (listarLibros):', data);
                this.libros = data;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error al listar libros:', error);
                this.errorMessage = error.message;
                this.isLoading = false;
            }
        });
    }

    eliminarLibro(id: number): void {
        if (confirm('¿Estás seguro de eliminar este libro?')) {
            this.libroService.eliminarLibro(id).subscribe({
                next: () => {
                    this.cargarLibros(); // Recargar lista
                },
                error: (error) => {
                    alert('Error al eliminar: ' + error.message);
                }
            });
        }
    }
}
