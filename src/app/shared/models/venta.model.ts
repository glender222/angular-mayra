import { Usuario } from './usuario.model';
import { Trabajador } from './trabajador.model';
import { Cliente } from './cliente.model';

export interface Venta {
    idVenta?: number;
    numVenta: number;
    cambio: number;
    ruc?: string;
    estado: string;
    moneda: string;
    totalVenta: number;
    metodoPago: string;
    fechaVenta: string;
    usuario?: Usuario;
    trabajador?: Trabajador;
    cliente?: Cliente;
}
