import { Rol } from './rol.model';
import { Trabajador } from './trabajador.model';

export interface Usuario {
    idUsuario?: number;
    email: string;
    password?: string;
    estado: string;
    imgPerfil?: string | null;
    rol?: Rol;
    trabajador?: Trabajador;
}
