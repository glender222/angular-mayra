import { Venta } from './venta.model';
import { Libro } from './libro.model';

export interface DetalleVenta {
    idDetalleVenta?: number;
    cantidad: number;
    precioUnitario: number;
    venta?: Venta;
    libro?: Libro;
}
