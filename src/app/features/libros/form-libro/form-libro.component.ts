import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LibroService } from '../../../shared/services/libro.service';
import { AutorService } from '../../../shared/services/autor.service';
import { CategoriaService } from '../../../shared/services/categoria.service';
import { EditorialService } from '../../../shared/services/editorial.service';
import { Libro } from '../../../shared/models/libro.model';
import { Autor } from '../../../shared/models/autor.model';
import { Categoria } from '../../../shared/models/categoria.model';
import { Editorial } from '../../../shared/models/editorial.model';

@Component({
    selector: 'app-form-libro',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './form-libro.component.html',
    styleUrls: ['./form-libro.component.css']
})
export class FormLibroComponent implements OnInit {
    private fb = inject(FormBuilder);
    private libroService = inject(LibroService);
    private autorService = inject(AutorService);
    private categoriaService = inject(CategoriaService);
    private editorialService = inject(EditorialService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    libroForm: FormGroup;
    autores: Autor[] = [];
    categorias: Categoria[] = [];
    editoriales: Editorial[] = [];

    isEditMode: boolean = false;
    libroId?: number;
    isLoading: boolean = false;
    errorMessage: string = '';

    constructor() {
        this.libroForm = this.fb.group({
            titulo: ['', Validators.required],
            codigo: ['', Validators.required],
            precio: [0, [Validators.required, Validators.min(0)]],
            stock: [0, [Validators.required, Validators.min(0)]],
            nPaginas: [0, [Validators.required, Validators.min(1)]],
            autor: [null, Validators.required],
            categoria: [null, Validators.required],
            editorial: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.cargarDatosIniciales();

        // Verificar si es modo edición
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isEditMode = true;
                this.libroId = +params['id'];
                this.cargarLibro(this.libroId);
            }
        });
    }

    cargarDatosIniciales(): void {
        // Cargar autores
        this.autorService.listarAutores().subscribe({
            next: (data) => this.autores = data
        });

        // Cargar categorías
        this.categoriaService.listarCategorias().subscribe({
            next: (data) => this.categorias = data
        });

        // Cargar editoriales
        this.editorialService.listarEditoriales().subscribe({
            next: (data) => this.editoriales = data
        });
    }

    cargarLibro(id: number): void {
        this.libroService.obtenerLibroPorId(id).subscribe({
            next: (libro) => {
                this.libroForm.patchValue({
                    titulo: libro.titulo,
                    codigo: libro.codigo,
                    precio: libro.precio,
                    stock: libro.stock,
                    nPaginas: libro.nPaginas,
                    autor: libro.autor?.idAutor,
                    categoria: libro.categoria?.idCategoria,
                    editorial: libro.editorial?.idEditorial
                });
            },
            error: (error) => {
                this.errorMessage = error.message;
            }
        });
    }

    onSubmit(): void {
        if (this.libroForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';

            const libro: Libro = {
                titulo: this.libroForm.value.titulo,
                codigo: this.libroForm.value.codigo,
                precio: this.libroForm.value.precio,
                stock: this.libroForm.value.stock,
                nPaginas: this.libroForm.value.nPaginas,
                autor: { idAutor: this.libroForm.value.autor },
                categoria: { idCategoria: this.libroForm.value.categoria },
                editorial: { idEditorial: this.libroForm.value.editorial }
            };

            const request = this.isEditMode
                ? this.libroService.actualizarLibro(this.libroId!, libro)
                : this.libroService.crearLibro(libro);

            request.subscribe({
                next: () => {
                    this.router.navigate(['/libros']);
                },
                error: (error) => {
                    this.errorMessage = error.message;
                    this.isLoading = false;
                }
            });
        }
    }

    cancelar(): void {
        this.router.navigate(['/libros']);
    }
}
