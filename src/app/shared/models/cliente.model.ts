import { Persona } from './persona.model';

export interface Cliente {
    idCliente?: number;
    estado: string;
    persona?: Persona;
}
