import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = '';

            if (error.error instanceof ErrorEvent) {
                // Error del cliente
                errorMessage = `Error: ${error.error.message}`;
            } else {
                // Error del servidor
                if (error.status === 401) {
                    // Token inválido o expirado
                    authService.logout();
                    router.navigate(['/login']);
                    errorMessage = 'Sesión expirada. Por favor inicia sesión nuevamente.';
                } else if (error.status === 403) {
                    errorMessage = 'No tienes permisos para realizar esta acción.';
                } else if (error.status === 404) {
                    errorMessage = 'Recurso no encontrado.';
                } else if (error.status === 500) {
                    errorMessage = 'Error del servidor. Inténtalo más tarde.';
                } else {
                    errorMessage = `Error ${error.status}: ${error.message}`;
                }
            }

            console.error(errorMessage);
            return throwError(() => new Error(errorMessage));
        })
    );
};
