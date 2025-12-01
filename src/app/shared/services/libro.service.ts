import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Libro } from '../models/libro.model';

@Injectable({
    providedIn: 'root'
})
export class LibroService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/libros`;

    /**
     * Listar todos los libros
     */
    listarLibros(): Observable<Libro[]> {
        return this.http.get<Libro[]>(`${this.apiUrl}/listar`);
    }

    /**
     * Obtener libro por ID
     */
    obtenerLibroPorId(id: number): Observable<Libro> {
        return this.http.get<Libro>(`${this.apiUrl}/${id}`);
    }

    /**
     * Buscar libro por título
     */
    buscarPorTitulo(titulo: string): Observable<Libro[]> {
        const params = new HttpParams().set('titulo', titulo);
        return this.http.get<Libro[]>(`${this.apiUrl}/buscarPorTitulo`, { params });
    }

    /**
     * Buscar libro por código
     */
    buscarPorCodigo(codigo: string): Observable<Libro[]> {
        const params = new HttpParams().set('codigo', codigo);
        return this.http.get<Libro[]>(`${this.apiUrl}/buscarPorCodigo`, { params });
    }

    /**
     * Crear nuevo libro
     */
    crearLibro(libro: Libro): Observable<Libro> {
        return this.http.post<Libro>(`${this.apiUrl}/crear`, libro);
    }

    /**
     * Actualizar libro existente
     */
    actualizarLibro(id: number, libro: Partial<Libro>): Observable<Libro> {
        return this.http.put<Libro>(`${this.apiUrl}/update/${id}`, libro);
    }

    /**
     * Eliminar libro
     */
    eliminarLibro(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
    }
}
