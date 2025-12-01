import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Editorial } from '../models/editorial.model';

@Injectable({
    providedIn: 'root'
})
export class EditorialService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/editoriales`;

    listarEditoriales(): Observable<Editorial[]> {
        return this.http.get<Editorial[]>(`${this.apiUrl}/listar`);
    }

    obtenerEditorialPorId(id: number): Observable<Editorial> {
        return this.http.get<Editorial>(`${this.apiUrl}/${id}`);
    }

    crearEditorial(editorial: Editorial): Observable<Editorial> {
        return this.http.post<Editorial>(`${this.apiUrl}/crear`, editorial);
    }

    actualizarEditorial(id: number, editorial: Partial<Editorial>): Observable<Editorial> {
        return this.http.put<Editorial>(`${this.apiUrl}/update/${id}`, editorial);
    }

    eliminarEditorial(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
    }
}
