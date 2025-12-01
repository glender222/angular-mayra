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
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
