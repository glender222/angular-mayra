import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Autor } from '../models/autor.model';

@Injectable({
    providedIn: 'root'
})
export class AutorService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/autores`;

    listarAutores(): Observable<Autor[]> {
        return this.http.get<Autor[]>(`${this.apiUrl}/listar`);
    }

    obtenerAutorPorId(id: number): Observable<Autor> {
        return this.http.get<Autor>(`${this.apiUrl}/${id}`);
    }

    crearAutor(autor: Autor): Observable<Autor> {
        return this.http.post<Autor>(`${this.apiUrl}/crear`, autor);
    }

    actualizarAutor(id: number, autor: Partial<Autor>): Observable<Autor> {
        return this.http.put<Autor>(`${this.apiUrl}/update/${id}`, autor);
    }

    eliminarAutor(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
    }
}
