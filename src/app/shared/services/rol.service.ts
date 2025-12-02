import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Rol } from '../models/rol.model';

@Injectable({
    providedIn: 'root'
})
export class RolService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/roles`;

    listarRoles(): Observable<Rol[]> {
        return this.http.get<Rol[]>(`${this.apiUrl}/listar`);
    }

    obtenerRolPorId(id: number): Observable<Rol> {
        return this.http.get<Rol>(`${this.apiUrl}/${id}`);
    }

    crearRol(rol: Rol): Observable<Rol> {
        return this.http.post<Rol>(`${this.apiUrl}/crear`, rol);
    }

    actualizarRol(id: number, rol: Partial<Rol>): Observable<Rol> {
        return this.http.put<Rol>(`${this.apiUrl}/update/${id}`, rol);
    }

    eliminarRol(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
    }
}
