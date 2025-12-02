import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'libros',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./features/libros/lista-libros/lista-libros.component').then(m => m.ListaLibrosComponent)
            },
            {
                path: 'crear',
                loadComponent: () => import('./features/libros/form-libro/form-libro.component').then(m => m.FormLibroComponent)
            },
            {
                path: 'editar/:id',
                loadComponent: () => import('./features/libros/form-libro/form-libro.component').then(m => m.FormLibroComponent)
            }
        ]
    },
    {
        path: 'autores',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./features/autores/lista-autor/lista-autor.component').then(m => m.ListaAutorComponent)
            },
            {
                path: 'crear',
                loadComponent: () => import('./features/autores/form-autor/form-autor.component').then(m => m.FormAutorComponent)
            },
            {
                path: 'editar/:id',
                loadComponent: () => import('./features/autores/form-autor/form-autor.component').then(m => m.FormAutorComponent)
            }
        ]
    },
    {
        path: 'categorias',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./features/categorias/lista-categoria/lista-categoria.component').then(m => m.ListaCategoriaComponent)
            },
            {
                path: 'crear',
                loadComponent: () => import('./features/categorias/form-categoria/form-categoria.component').then(m => m.FormCategoriaComponent)
            },
            {
                path: 'editar/:id',
                loadComponent: () => import('./features/categorias/form-categoria/form-categoria.component').then(m => m.FormCategoriaComponent)
            }
        ]
    },
    {
        path: 'editoriales',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./features/editoriales/lista-editorial/lista-editorial.component').then(m => m.ListaEditorialComponent)
            },
            {
                path: 'crear',
                loadComponent: () => import('./features/editoriales/form-editorial/form-editorial.component').then(m => m.FormEditorialComponent)
            },
            {
                path: 'editar/:id',
                loadComponent: () => import('./features/editoriales/form-editorial/form-editorial.component').then(m => m.FormEditorialComponent)
            }
        ]
    },
    {
        path: 'personas',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./features/personas/lista-persona/lista-persona.component').then(m => m.ListaPersonaComponent)
            },
            {
                path: 'crear',
                loadComponent: () => import('./features/personas/form-persona/form-persona.component').then(m => m.FormPersonaComponent)
            },
            {
                path: 'editar/:id',
                loadComponent: () => import('./features/personas/form-persona/form-persona.component').then(m => m.FormPersonaComponent)
            }
        ]
    },
    {
        path: 'roles',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./features/roles/lista-rol/lista-rol.component').then(m => m.ListaRolComponent)
            },
            {
                path: 'crear',
                loadComponent: () => import('./features/roles/form-rol/form-rol.component').then(m => m.FormRolComponent)
            },
            {
                path: 'editar/:id',
                loadComponent: () => import('./features/roles/form-rol/form-rol.component').then(m => m.FormRolComponent)
            }
        ]
    },
    {
        path: 'trabajadores',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./features/trabajadores/lista-trabajador/lista-trabajador.component').then(m => m.ListaTrabajadorComponent)
            },
            {
                path: 'crear',
                loadComponent: () => import('./features/trabajadores/form-trabajador/form-trabajador.component').then(m => m.FormTrabajadorComponent)
            },
            {
                path: 'editar/:id',
                loadComponent: () => import('./features/trabajadores/form-trabajador/form-trabajador.component').then(m => m.FormTrabajadorComponent)
            }
        ]
    },
    {
        path: 'usuarios',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./features/usuarios/lista-usuario/lista-usuario.component').then(m => m.ListaUsuarioComponent)
            },
            {
                path: 'crear',
                loadComponent: () => import('./features/usuarios/form-usuario/form-usuario.component').then(m => m.FormUsuarioComponent)
            },
            {
                path: 'editar/:id',
                loadComponent: () => import('./features/usuarios/form-usuario/form-usuario.component').then(m => m.FormUsuarioComponent)
            }
        ]
    },
    {
        path: 'clientes',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./features/clientes/lista-cliente/lista-cliente.component').then(m => m.ListaClienteComponent)
            },
            {
                path: 'crear',
                loadComponent: () => import('./features/clientes/form-cliente/form-cliente.component').then(m => m.FormClienteComponent)
            },
            {
                path: 'editar/:id',
                loadComponent: () => import('./features/clientes/form-cliente/form-cliente.component').then(m => m.FormClienteComponent)
            }
        ]
    },
    {
        path: 'ventas',
        canActivate: [authGuard],
        children: [
            {
                path: 'catalogo',
                loadComponent: () => import('./features/ventas/catalogo-venta/catalogo-venta.component').then(m => m.CatalogoVentaComponent)
            },
            {
                path: 'carrito',
                loadComponent: () => import('./features/ventas/carrito/carrito.component').then(m => m.CarritoComponent)
            }
        ]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
