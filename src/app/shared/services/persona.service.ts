import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Persona } from '../models/persona.model';

@Injectable({
    providedIn: 'root'
})
export class PersonaService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/personas`;

    listarPersonas(): Observable<Persona[]> {
        return this.http.get<Persona[]>(`${this.apiUrl}/listar`);
    }

    obtenerPersonaPorId(id: number): Observable<Persona> {
        return this.http.get<Persona>(`${this.apiUrl}/${id}`);
    }

    crearPersona(persona: Persona): Observable<Persona> {
        return this.http.post<Persona>(`${this.apiUrl}/crear`, persona);
    }

    actualizarPersona(id: number, persona: Partial<Persona>): Observable<Persona> {
        return this.http.put<Persona>(`${this.apiUrl}/update/${id}`, persona);
    }

    eliminarPersona(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
    }
}
