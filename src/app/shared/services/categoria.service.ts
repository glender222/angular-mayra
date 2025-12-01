import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Categoria } from '../models/categoria.model';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/categorias`;

    listarCategorias(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${this.apiUrl}/listar`);
    }

    obtenerCategoriaPorId(id: number): Observable<Categoria> {
        return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
    }

    crearCategoria(categoria: Categoria): Observable<Categoria> {
        return this.http.post<Categoria>(`${this.apiUrl}/crear`, categoria);
    }

    actualizarCategoria(id: number, categoria: Partial<Categoria>): Observable<Categoria> {
        return this.http.put<Categoria>(`${this.apiUrl}/update/${id}`, categoria);
    }

    eliminarCategoria(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
    }
}
