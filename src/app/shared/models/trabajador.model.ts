import { Persona } from './persona.model';

export interface Trabajador {
    idTrabajador?: number;
    codigo: string;
    estadoLaboral: boolean;
    estado: string;
    persona?: Persona;
}
