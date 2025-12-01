import { Persona } from './persona.model';

export interface Cliente {
    idCliente?: number;
    estado: boolean;
    persona?: Persona;
}
