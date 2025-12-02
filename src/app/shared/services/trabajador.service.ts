import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Trabajador } from '../models/trabajador.model';

@Injectable({
    providedIn: 'root'
})
export class TrabajadorService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/trabajadores`;

    listarTrabajadores(): Observable<Trabajador[]> {
        return this.http.get<Trabajador[]>(`${this.apiUrl}/listar`);
    }

    obtenerTrabajadorPorId(id: number): Observable<Trabajador> {
        return this.http.get<Trabajador>(`${this.apiUrl}/${id}`);
    }

    crearTrabajador(trabajador: Trabajador): Observable<Trabajador> {
        return this.http.post<Trabajador>(`${this.apiUrl}/crear`, trabajador);
    }

    actualizarTrabajador(id: number, trabajador: Partial<Trabajador>): Observable<Trabajador> {
        return this.http.put<Trabajador>(`${this.apiUrl}/update/${id}`, trabajador);
    }

    eliminarTrabajador(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
    }
}
