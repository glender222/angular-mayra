import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginRequest, AuthResponse } from '../../shared/models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    private apiUrl = `${environment.apiUrl}/auth`;
    private tokenKey = 'auth_token';
    private emailKey = 'user_email';

    // Observable para saber si el usuario está autenticado
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    /**
     * Iniciar sesión
     */
    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                if (response.token) {
                    this.setToken(response.token);
                    this.setEmail(response.email);
                    this.isAuthenticatedSubject.next(true);
                }
            })
        );
    }

    /**
     * Cerrar sesión
     */
    logout(): void {
        this.removeToken();
        this.removeEmail();
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
    }

    /**
     * Guardar token en localStorage
     */
    private setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    /**
     * Obtener token de localStorage
     */
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Eliminar token de localStorage
     */
    private removeToken(): void {
        localStorage.removeItem(this.tokenKey);
    }

    /**
     * Guardar email en localStorage
     */
    private setEmail(email: string): void {
        localStorage.setItem(this.emailKey, email);
    }

    /**
     * Obtener email de localStorage
     */
    getEmail(): string | null {
        return localStorage.getItem(this.emailKey);
    }

    /**
     * Eliminar email de localStorage
     */
    private removeEmail(): void {
        localStorage.removeItem(this.emailKey);
    }

    /**
     * Verificar si tiene token
     */
    private hasToken(): boolean {
        return !!this.getToken();
    }

    /**
     * Verificar si el usuario está autenticado
     */
    isLoggedIn(): boolean {
        return this.hasToken();
    }
}
