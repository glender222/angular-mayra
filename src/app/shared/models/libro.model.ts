import { Autor } from './autor.model';
import { Categoria } from './categoria.model';
import { Editorial } from './editorial.model';

export interface Libro {
    idLibro?: number;
    titulo: string;
    codigo: string;
    precio: number;
    stock: number;
    nPaginas: number;
    autor?: Autor;
    categoria?: Categoria;
    editorial?: Editorial;
}
