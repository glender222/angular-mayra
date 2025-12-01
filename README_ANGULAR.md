# 🅰️ Librería Backend API - Guía de Integración Angular

> Documentación completa para integrar el backend de la librería con Angular 17+

---

## 📋 Tabla de Contenidos

- [Configuración Inicial](#configuración-inicial)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Modelos/Interfaces TypeScript](#modelosinterfaces-typescript)
- [Servicios de la API](#servicios-de-la-api)
- [Autenticación JWT](#autenticación-jwt)
- [Interceptores HTTP](#interceptores-http)
- [Guards de Rutas](#guards-de-rutas)
- [Componentes de Ejemplo](#componentes-de-ejemplo)
- [Manejo de Errores](#manejo-de-errores)
- [Pruebas y Debugging](#pruebas-y-debugging)

---

## 🚀 Configuración Inicial

### **1. Crear Proyecto Angular**

```bash
# Crear nuevo proyecto
ng new libreria-frontend
# Selecciona: Yes para routing, CSS para estilos

cd libreria-frontend
```

### **2. Instalar Dependencias**

```bash
# HttpClientModule ya viene incluido en Angular 17+
# Solo instala estas si las necesitas:
npm install --save jwt-decode
npm install --save-dev @types/jwt-decode
```

### **3. Configurar Environments**

Edita `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

Edita `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-servidor.com/api'
};
```

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                    # Servicios singleton, guards, interceptores
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   └── error.interceptor.ts
│   │   └── services/
│   │       └── auth.service.ts
│   ├── shared/                  # Componentes, directivas compartidas
│   │   ├── models/              # Interfaces TypeScript
│   │   │   ├── persona.model.ts
│   │   │   ├── usuario.model.ts
│   │   │   ├── libro.model.ts
│   │   │   └── ...
│   │   └── services/            # Servicios de API
│   │       ├── persona.service.ts
│   │       ├── usuario.service.ts
│   │       ├── libro.service.ts
│   │       └── ...
│   ├── features/                # Módulos de funcionalidades
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── auth.module.ts
│   │   ├── libros/
│   │   │   ├── lista-libros/
│   │   │   ├── crear-libro/
│   │   │   └── libros.module.ts
│   │   └── ...
│   └── app.config.ts
└── environments/
    ├── environment.ts
    └── environment.prod.ts
```

---

## 🎯 Modelos/Interfaces TypeScript

### **Crear carpeta de modelos**

```bash
mkdir -p src/app/shared/models
```

### **`src/app/shared/models/persona.model.ts`**

```typescript
export interface Persona {
  idPersona?: number;
  nombre: string;
  apellidos: string;
  dni: string;
  telefono: string;
}
```

### **`src/app/shared/models/rol.model.ts`**

```typescript
export interface Rol {
  idRol?: number;
  nombre: string;
}
```

### **`src/app/shared/models/trabajador.model.ts`**

```typescript
import { Persona } from './persona.model';

export interface Trabajador {
  idTrabajador?: number;
  codigo: string;
  estadoLaboral: boolean;
  estado: string;
  persona?: Persona;
}
```

### **`src/app/shared/models/usuario.model.ts`**

```typescript
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
```

### **`src/app/shared/models/autor.model.ts`**

```typescript
export interface Autor {
  idAutor?: number;
  nombre: string;
}
```

### **`src/app/shared/models/categoria.model.ts`**

```typescript
export interface Categoria {
  idCategoria?: number;
  descripcion: string;
}
```

### **`src/app/shared/models/editorial.model.ts`**

```typescript
export interface Editorial {
  idEditorial?: number;
  nombre: string;
}
```

### **`src/app/shared/models/libro.model.ts`**

```typescript
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
```

### **`src/app/shared/models/cliente.model.ts`**

```typescript
import { Persona } from './persona.model';

export interface Cliente {
  idCliente?: number;
  estado: boolean;
  persona?: Persona;
}
```

### **`src/app/shared/models/venta.model.ts`**

```typescript
import { Usuario } from './usuario.model';
import { Trabajador } from './trabajador.model';
import { Cliente } from './cliente.model';

export interface Venta {
  idVenta?: number;
  numVenta: number;
  cambio: number;
  ruc?: string;
  estado: string;
  moneda: string;
  totalVenta: number;
  metodoPago: string;
  fechaVenta: string;
  usuario?: Usuario;
  trabajador?: Trabajador;
  cliente?: Cliente;
}
```

### **`src/app/shared/models/detalle-venta.model.ts`**

```typescript
import { Venta } from './venta.model';
import { Libro } from './libro.model';

export interface DetalleVenta {
  idDetalleVenta?: number;
  cantidad: number;
  precioUnitario: number;
  venta?: Venta;
  libro?: Libro;
}
```

### **`src/app/shared/models/auth.model.ts`**

```typescript
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  mensaje: string;
}
```

---

## 🔧 Servicios de la API

### **Crear carpeta de servicios**

```bash
mkdir -p src/app/shared/services
```

### **`src/app/core/services/auth.service.ts`**

```typescript
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
```

### **`src/app/shared/services/libro.service.ts`**

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Libro } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/libros`;

  /**
   * Listar todos los libros
   */
  listarLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/listar`);
  }

  /**
   * Obtener libro por ID
   */
  obtenerLibroPorId(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  /**
   * Buscar libro por título
   */
  buscarPorTitulo(titulo: string): Observable<Libro[]> {
    const params = new HttpParams().set('titulo', titulo);
    return this.http.get<Libro[]>(`${this.apiUrl}/buscarPorTitulo`, { params });
  }

  /**
   * Buscar libro por código
   */
  buscarPorCodigo(codigo: string): Observable<Libro[]> {
    const params = new HttpParams().set('codigo', codigo);
    return this.http.get<Libro[]>(`${this.apiUrl}/buscarPorCodigo`, { params });
  }

  /**
   * Crear nuevo libro
   */
  crearLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(`${this.apiUrl}/crear`, libro);
  }

  /**
   * Actualizar libro existente
   */
  actualizarLibro(id: number, libro: Partial<Libro>): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/update/${id}`, libro);
  }

  /**
   * Eliminar libro
   */
  eliminarLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
```

### **`src/app/shared/services/usuario.service.ts`**

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/usuarios`;

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/listar`);
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/crear`, usuario);
  }

  actualizarUsuario(id: number, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/update/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
```

### **`src/app/shared/services/venta.service.ts`**

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Venta } from '../models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/ventas`;

  listarVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.apiUrl}/listar`);
  }

  obtenerVentaPorId(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}/${id}`);
  }

  crearVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(`${this.apiUrl}/crear`, venta);
  }

  actualizarVenta(id: number, venta: Partial<Venta>): Observable<Venta> {
    return this.http.put<Venta>(`${this.apiUrl}/update/${id}`, venta);
  }

  eliminarVenta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
```

### **Template para Otros Servicios**

Crea servicios similares para:
- `persona.service.ts`
- `rol.service.ts`
- `trabajador.service.ts`
- `cliente.service.ts`
- `autor.service.ts`
- `categoria.service.ts`
- `editorial.service.ts`
- `detalle-venta.service.ts`

Sigue el mismo patrón del `LibroService`.

---

## 🔐 Autenticación JWT

### **`src/app/core/interceptors/auth.interceptor.ts`**

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Si hay token, lo agregamos al header
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }

  return next(req);
};
```

### **`src/app/core/interceptors/error.interceptor.ts`**

```typescript
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
```

### **Registrar Interceptores en `app.config.ts`**

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    )
  ]
};
```

---

## 🛡️ Guards de Rutas

### **`src/app/core/guards/auth.guard.ts`**

```typescript
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirigir al login si no está autenticado
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};
```

### **Usar el Guard en las Rutas**

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'libros',
    canActivate: [authGuard],
    loadChildren: () => import('./features/libros/libros.routes').then(m => m.LIBROS_ROUTES)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
```

---

## 🎨 Componentes de Ejemplo

### **Componente de Login**

```bash
ng generate component features/auth/login --standalone
```

**`src/app/features/auth/login/login.component.ts`**

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Error al iniciar sesión';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
```

**`src/app/features/auth/login/login.component.html`**

```html
<div class="login-container">
  <div class="login-card">
    <h2>Iniciar Sesión</h2>
    
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <!-- Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          formControlName="email" 
          placeholder="usuario@libreria.com"
          [class.invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
        />
        <div class="error-message" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
          <span *ngIf="loginForm.get('email')?.errors?.['required']">El email es requerido</span>
          <span *ngIf="loginForm.get('email')?.errors?.['email']">Email inválido</span>
        </div>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input 
          type="password" 
          id="password" 
          formControlName="password" 
          placeholder="••••••••"
          [class.invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
        />
        <div class="error-message" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
          <span *ngIf="loginForm.get('password')?.errors?.['required']">La contraseña es requerida</span>
          <span *ngIf="loginForm.get('password')?.errors?.['minLength']">Mínimo 6 caracteres</span>
        </div>
      </div>

      <!-- Error del servidor -->
      <div class="alert alert-error" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <!-- Botón Submit -->
      <button 
        type="submit" 
        class="btn-primary" 
        [disabled]="isLoading"
      >
        <span *ngIf="!isLoading">Iniciar Sesión</span>
        <span *ngIf="isLoading">Cargando...</span>
      </button>
    </form>
  </div>
</div>
```

### **Componente Lista de Libros**

```bash
ng generate component features/libros/lista-libros --standalone
```

**`src/app/features/libros/lista-libros/lista-libros.component.ts`**

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibroService } from '../../../shared/services/libro.service';
import { Libro } from '../../../shared/models/libro.model';

@Component({
  selector: 'app-lista-libros',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent implements OnInit {
  private libroService = inject(LibroService);

  libros: Libro[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.libroService.listarLibros().subscribe({
      next: (data) => {
        this.libros = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  eliminarLibro(id: number): void {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      this.libroService.eliminarLibro(id).subscribe({
        next: () => {
          this.cargarLibros(); // Recargar lista
        },
        error: (error) => {
          alert('Error al eliminar: ' + error.message);
        }
      });
    }
  }
}
```

**`src/app/features/libros/lista-libros/lista-libros.component.html`**

```html
<div class="libros-container">
  <div class="header">
    <h1>Libros</h1>
    <button class="btn-primary" routerLink="/libros/crear">+ Nuevo Libro</button>
  </div>

  <!-- Loading -->
  <div *ngIf="isLoading" class="loading">Cargando libros...</div>

  <!-- Error -->
  <div *ngIf="errorMessage" class="alert alert-error">
    {{ errorMessage }}
  </div>

  <!-- Tabla de libros -->
  <div *ngIf="!isLoading && !errorMessage" class="table-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Código</th>
          <th>Autor</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let libro of libros">
          <td>{{ libro.idLibro }}</td>
          <td>{{ libro.titulo }}</td>
          <td>{{ libro.codigo }}</td>
          <td>{{ libro.autor?.nombre }}</td>
          <td>S/ {{ libro.precio | number:'1.2-2' }}</td>
          <td>{{ libro.stock }}</td>
          <td class="actions">
            <button class="btn-edit" [routerLink]="['/libros/editar', libro.idLibro]">
              Editar
            </button>
            <button class="btn-delete" (click)="eliminarLibro(libro.idLibro!)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div *ngIf="libros.length === 0" class="no-data">
      No hay libros registrados
    </div>
  </div>
</div>
```

### **Componente Crear/Editar Libro**

**`src/app/features/libros/form-libro/form-libro.component.ts`**

```typescript
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
```

---

## ⚠️ Manejo de Errores

### **Servicio de Notificaciones (Opcional)**

```typescript
// src/app/shared/services/notification.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  public notification$ = this.notificationSubject.asObservable();

  success(message: string): void {
    this.notificationSubject.next({ message, type: 'success' });
  }

  error(message: string): void {
    this.notificationSubject.next({ message, type: 'error' });
  }

  info(message: string): void {
    this.notificationSubject.next({ message, type: 'info' });
  }

  warning(message: string): void {
    this.notificationSubject.next({ message, type: 'warning' });
  }
}
```

---

## 🧪 Pruebas y Debugging

### **Probar el Login**

```typescript
// En la consola del navegador
localStorage.getItem('auth_token'); // Ver el token guardado
```

### **Verificar Peticiones HTTP**

1. Abre **DevTools** → Network
2. Filtra por **XHR/Fetch**
3. Verifica que los headers incluyan `Authorization: Bearer ...`

### **Debugging de Errores**

```typescript
// En cualquier componente
console.log('Token actual:', this.authService.getToken());
console.log('Usuario autenticado:', this.authService.isLoggedIn());
```

---

## 📚 Recursos Adicionales

- **Angular Docs:** https://angular.io/docs
- **RxJS Docs:** https://rxjs.dev
- **TypeScript Handbook:** https://www.typescriptlang.org/docs

---

## 🎯 Checklist de Implementación

- [ ] Crear proyecto Angular
- [ ] Configurar environments
- [ ] Crear todas las interfaces/modelos
- [ ] Implementar AuthService
- [ ] Implementar interceptores (auth + error)
- [ ] Configurar guard de autenticación
- [ ] Crear servicios para cada entidad
- [ ] Implementar componente de login
- [ ] Implementar componentes CRUD de libros
- [ ] Probar flujo completo de login
- [ ] Probar CRUD de libros
- [ ] Implementar otros módulos (ventas, usuarios, etc.)

---

**¡Implementación Angular lista para usar! 🚀**
