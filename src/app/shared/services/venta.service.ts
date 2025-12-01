import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Venta } from '../models/venta.model';

@Injectable({
    providedIn: 'root'
})
export class VentaService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/ventas`;

    listarVentas(): Observable<Venta[]> {
        return this.http.get<Venta[]>(`${this.apiUrl}/listar`);
    }

    obtenerVentaPorId(id: number): Observable<Venta> {
        return this.http.get<Venta>(`${this.apiUrl}/${id}`);
    }

    crearVenta(venta: Venta): Observable<Venta> {
        return this.http.post<Venta>(`${this.apiUrl}/crear`, venta);
    }

    actualizarVenta(id: number, venta: Partial<Venta>): Observable<Venta> {
        return this.http.put<Venta>(`${this.apiUrl}/update/${id}`, venta);
    }

    eliminarVenta(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
    }
}
