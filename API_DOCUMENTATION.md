# Documentación API Backend - Sistema de Librería

> **Nota**: Esta documentación está diseñada para el equipo de Frontend. Incluye todos los endpoints disponibles, sus payloads, validaciones y respuestas esperadas.

## Tabla de Contenidos

- [Autenticación](#autenticación)
- [Gestión de Personas](#gestión-de-personas)
- [Gestión de Clientes](#gestión-de-clientes)
- [Gestión de Trabajadores](#gestión-de-trabajadores)
- [Gestión de Usuarios](#gestión-de-usuarios)
- [Gestión de Roles](#gestión-de-roles)
- [Gestión de Privilegios](#gestión-de-privilegios)
- [Gestión de Roles-Privilegios](#gestión-de-roles-privilegios)
- [Gestión de Autores](#gestión-de-autores)
- [Gestión de Categorías](#gestión-de-categorías)
- [Gestión de Editoriales](#gestión-de-editoriales)
- [Gestión de Libros](#gestión-de-libros)
- [Gestión de Ventas](#gestión-de-ventas)
- [Gestión de Detalle de Ventas](#gestión-de-detalle-de-ventas)

---

## Autenticación

### Login

**Ruta:** `POST /api/auth/login`

**Descripción:** Autentica a un usuario mediante email y contraseña, devolviendo un token JWT para las siguientes peticiones.

**Payload (Request Body):**
```json
{
  "email": "string (obligatorio)",
  "password": "string (obligatorio)"
}
```

**Respuesta Exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "usuario@example.com",
  "mensaje": "Login exitoso"
}
```

**Respuestas de Error:**
- `401 Unauthorized`: Credenciales inválidas
- `500 Internal Server Error`: Error en el servidor

---

## Gestión de Personas

### Listar todas las personas

**Ruta:** `GET /api/personas/listar`

**Descripción:** Obtiene la lista completa de personas registradas en el sistema.

**Payload:** Ninguno

**Respuesta (200):**
```json
[
  {
    "idPersona": 1,
    "nombre": "Juan",
    "apellidos": "Pérez García",
    "dni": "12345678",
    "telefono": "987654321"
  }
]
```

---

### Obtener persona por ID

**Ruta:** `GET /api/personas/{id}`

**Descripción:** Obtiene los datos de una persona específica mediante su ID.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la persona

**Respuesta (200):**
```json
{
  "idPersona": 1,
  "nombre": "Juan",
  "apellidos": "Pérez García",
  "dni": "12345678",
  "telefono": "987654321"
}
```

**Respuestas de Error:**
- `404 Not Found`: Persona no encontrada

---

### Crear nueva persona

**Ruta:** `POST /api/personas/crear`

**Descripción:** Registra una nueva persona en el sistema.

**Payload (Request Body):**
```json
{
  "nombre": "string (obligatorio, no puede estar en blanco)",
  "apellidos": "string (obligatorio, no puede estar en blanco)",
  "dni": "string (opcional)",
  "telefono": "string (opcional)"
}
```

**Respuesta (201):**
```json
{
  "idPersona": 2,
  "nombre": "María",
  "apellidos": "López Rodríguez",
  "dni": "87654321",
  "telefono": "912345678"
}
```

---

### Actualizar persona

**Ruta:** `PUT /api/personas/update/{id}`

**Descripción:** Actualiza los datos de una persona existente.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la persona

**Payload (Request Body):**
```json
{
  "nombre": "string (opcional)",
  "apellidos": "string (opcional)",
  "dni": "string (opcional)",
  "telefono": "string (opcional)"
}
```

**Respuesta (200):**
```json
{
  "idPersona": 1,
  "nombre": "Juan Carlos",
  "apellidos": "Pérez García",
  "dni": "12345678",
  "telefono": "987654321"
}
```

**Respuestas de Error:**
- `404 Not Found`: Persona no encontrada

---

### Eliminar persona

**Ruta:** `DELETE /api/personas/eliminar/{id}`

**Descripción:** Elimina una persona del sistema.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la persona

**Respuesta (204):** Sin contenido

---

## Gestión de Clientes

### Listar todos los clientes

**Ruta:** `GET /api/clientes/listar`

**Descripción:** Obtiene la lista completa de clientes con sus datos de persona asociados.

**Payload:** Ninguno

**Respuesta (200):**
```json
[
  {
    "idCliente": 1,
    "estado": true,
    "persona": {
      "idPersona": 1,
      "nombre": "Juan",
      "apellidos": "Pérez García",
      "dni": "12345678",
      "telefono": "987654321"
    }
  }
]
```

---

### Obtener cliente por ID

**Ruta:** `GET /api/clientes/{id}`

**Descripción:** Obtiene los datos de un cliente específico con su información de persona.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del cliente

**Respuesta (200):**
```json
{
  "idCliente": 1,
  "estado": true,
  "persona": {
    "idPersona": 1,
    "nombre": "Juan",
    "apellidos": "Pérez García",
    "dni": "12345678",
    "telefono": "987654321"
  }
}
```

**Respuestas de Error:**
- `404 Not Found`: Cliente no encontrado

---

### Buscar cliente por DNI

**Ruta:** `GET /api/clientes/buscarPorDNI/{dni}`

**Descripción:** Busca clientes por DNI de la persona asociada.

**Parámetros de ruta:**
- `dni` (String, obligatorio): DNI de la persona

**Respuesta (200):**
```json
[
  {
    "idCliente": 1,
    "estado": true,
    "persona": {
      "idPersona": 1,
      "nombre": "Juan",
      "apellidos": "Pérez García",
      "dni": "12345678",
      "telefono": "987654321"
    }
  }
]
```

---

### Crear nuevo cliente

**Ruta:** `POST /api/clientes/crear`

**Descripción:** Registra un nuevo cliente asociado a una persona existente.

**Payload (Request Body):**
```json
{
  "estado": true,
  "persona": {
    "idPersona": 1
  }
}
```

**Validaciones:**
- `persona.idPersona` es obligatorio y debe existir en el sistema

**Respuesta (201):**
```json
{
  "idCliente": 2,
  "estado": true,
  "persona": {
    "idPersona": 1,
    "nombre": "Juan",
    "apellidos": "Pérez García",
    "dni": "12345678",
    "telefono": "987654321"
  }
}
```

**Respuestas de Error:**
- `400 Bad Request`: Persona inválida o ausente
- `500 Internal Server Error`: Error al crear el cliente

---

### Actualizar cliente

**Ruta:** `PUT /api/clientes/update/{id}`

**Descripción:** Actualiza los datos de un cliente existente.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del cliente

**Payload (Request Body):**
```json
{
  "estado": true,
  "persona": {
    "idPersona": 2
  }
}
```

**Respuesta (200):**
```json
{
  "idCliente": 1,
  "estado": false,
  "persona": {
    "idPersona": 2,
    "nombre": "María",
    "apellidos": "López",
    "dni": "87654321",
    "telefono": "912345678"
  }
}
```

**Respuestas de Error:**
- `400 Bad Request`: Persona inválida
- `404 Not Found`: Cliente no encontrado
- `500 Internal Server Error`: Error al actualizar

---

### Eliminar cliente

**Ruta:** `DELETE /api/clientes/eliminar/{id}`

**Descripción:** Elimina un cliente del sistema.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del cliente

**Respuesta (204):** Sin contenido

---

## Gestión de Trabajadores

### Listar todos los trabajadores

**Ruta:** `GET /api/trabajadores/listar`

**Descripción:** Obtiene la lista completa de trabajadores con sus datos de persona asociados.

**Payload:** Ninguno

**Respuesta (200):**
```json
[
  {
    "idTrabajador": 1,
    "codigo": "TRAB001",
    "estadoLaboral": true,
    "estado": "ACTIVO",
    "persona": {
      "idPersona": 3,
      "nombre": "Carlos",
      "apellidos": "Sánchez",
      "dni": "11223344",
      "telefono": "923456789"
    }
  }
]
```

---

### Obtener trabajador por ID

**Ruta:** `GET /api/trabajadores/{id}`

**Descripción:** Obtiene los datos de un trabajador específico.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del trabajador

**Respuesta (200):**
```json
{
  "idTrabajador": 1,
  "codigo": "TRAB001",
  "estadoLaboral": true,
  "estado": "ACTIVO",
  "persona": {
    "idPersona": 3,
    "nombre": "Carlos",
    "apellidos": "Sánchez",
    "dni": "11223344",
    "telefono": "923456789"
  }
}
```

**Respuestas de Error:**
- `404 Not Found`: Trabajador no encontrado

---

### Crear nuevo trabajador

**Ruta:** `POST /api/trabajadores/crear`

**Descripción:** Registra un nuevo trabajador asociado a una persona existente.

**Payload (Request Body):**
```json
{
  "codigo": "string (opcional)",
  "estadoLaboral": true,
  "estado": "ACTIVO",
  "persona": {
    "idPersona": 3
  }
}
```

**Validaciones:**
- `persona.idPersona` es obligatorio y debe existir
- `estado` puede ser: "ACTIVO" o "INACTIVO"

**Respuesta (201):**
```json
{
  "idTrabajador": 2,
  "codigo": "TRAB002",
  "estadoLaboral": true,
  "estado": "ACTIVO",
  "persona": {
    "idPersona": 3,
    "nombre": "Carlos",
    "apellidos": "Sánchez",
    "dni": "11223344",
    "telefono": "923456789"
  }
}
```

**Respuestas de Error:**
- `400 Bad Request`: Persona inválida o ausente
- `500 Internal Server Error`: Error al crear el trabajador

---

### Actualizar trabajador

**Ruta:** `PUT /api/trabajadores/update/{id}`

**Descripción:** Actualiza los datos de un trabajador existente.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del trabajador

**Payload (Request Body):**
```json
{
  "codigo": "TRAB001-UPD",
  "estadoLaboral": false,
  "estado": "INACTIVO",
  "persona": {
    "idPersona": 4
  }
}
```

**Respuesta (200):**
```json
{
  "idTrabajador": 1,
  "codigo": "TRAB001-UPD",
  "estadoLaboral": false,
  "estado": "INACTIVO",
  "persona": {
    "idPersona": 4,
    "nombre": "Ana",
    "apellidos": "Martínez",
    "dni": "55667788",
    "telefono": "934567890"
  }
}
```

**Respuestas de Error:**
- `404 Not Found`: Trabajador no encontrado
- `500 Internal Server Error`: Error al actualizar

---

### Eliminar trabajador

**Ruta:** `DELETE /api/trabajadores/eliminar/{id}`

**Descripción:** Elimina un trabajador del sistema.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del trabajador

**Respuesta (204):** Sin contenido

---

## Gestión de Usuarios

### Listar todos los usuarios

**Ruta:** `GET /api/usuarios/listar`

**Descripción:** Obtiene la lista completa de usuarios del sistema.

**Payload:** Ninguno

**Respuesta (200):**
```json
[
  {
    "idUsuario": 1,
    "email": "admin@libreria.com",
    "password": "123456",
    "estado": "ACTIVO",
    "imgPerfil": "https://example.com/profile.jpg",
    "rol": {
      "idRol": 1,
      "nombre": "Administrador"
    },
    "trabajador": {
      "idTrabajador": 1,
      "codigo": "TRAB001",
      "estadoLaboral": true,
      "estado": "ACTIVO",
      "persona": {
        "idPersona": 3,
        "nombre": "Carlos",
        "apellidos": "Sánchez",
        "dni": "11223344",
        "telefono": "923456789"
      }
    }
  }
]
```

---

### Obtener usuario por ID

**Ruta:** `GET /api/usuarios/{id}`

**Descripción:** Obtiene los datos de un usuario específico.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del usuario

**Respuesta (200):**
```json
{
  "idUsuario": 1,
  "email": "admin@libreria.com",
  "password": "123456",
  "estado": "ACTIVO",
  "imgPerfil": "https://example.com/profile.jpg",
  "rol": {
    "idRol": 1,
    "nombre": "Administrador"
  },
  "trabajador": {
    "idTrabajador": 1,
    "codigo": "TRAB001",
    "estadoLaboral": true,
    "estado": "ACTIVO",
    "persona": {...}
  }
}
```

**Respuestas de Error:**
- `404 Not Found`: Usuario no encontrado

---

### Crear nuevo usuario

**Ruta:** `POST /api/usuarios/crear`

**Descripción:** Registra un nuevo usuario en el sistema.

**Payload (Request Body):**
```json
{
  "email": "string (opcional)",
  "password": "string (opcional)",
  "estado": "ACTIVO",
  "imgPerfil": "string (opcional)",
  "rol": {
    "idRol": 1
  },
  "trabajador": {
    "idTrabajador": 1
  }
}
```

**Validaciones:**
- `rol.idRol` es obligatorio y debe existir
- `trabajador.idTrabajador` es obligatorio y debe existir
- `estado` puede ser: "ACTIVO" o "INACTIVO"

**Respuesta (201):**
```json
{
  "idUsuario": 2,
  "email": "vendedor@libreria.com",
  "password": "password123",
  "estado": "ACTIVO",
  "imgPerfil": null,
  "rol": {
    "idRol": 2,
    "nombre": "Vendedor"
  },
  "trabajador": {...}
}
```

**Respuestas de Error:**
- `400 Bad Request`: Rol o trabajador inválido
- `500 Internal Server Error`: Error al crear el usuario

---

### Actualizar usuario

**Ruta:** `PUT /api/usuarios/update/{id}`

**Descripción:** Actualiza los datos de un usuario existente.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del usuario

**Payload (Request Body):**
```json
{
  "email": "nuevo_email@libreria.com",
  "password": "nuevo_password",
  "estado": "INACTIVO",
  "imgPerfil": "https://example.com/new_profile.jpg",
  "rol": {
    "idRol": 2
  },
  "trabajador": {
    "idTrabajador": 2
  }
}
```

**Respuesta (200):**
```json
{
  "idUsuario": 1,
  "email": "nuevo_email@libreria.com",
  "password": "nuevo_password",
  "estado": "INACTIVO",
  "imgPerfil": "https://example.com/new_profile.jpg",
  "rol": {...},
  "trabajador": {...}
}
```

**Respuestas de Error:**
- `404 Not Found`: Usuario no encontrado
- `500 Internal Server Error`: Error al actualizar

---

### Eliminar usuario

**Ruta:** `DELETE /api/usuarios/eliminar/{id}`

**Descripción:** Elimina un usuario del sistema.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del usuario

**Respuesta (204):** Sin contenido

---

## Gestión de Roles

### Listar todos los roles

**Ruta:** `GET /api/roles/listar`

**Descripción:** Obtiene la lista de todos los roles del sistema.

**Payload:** Ninguno

**Respuesta (200):**
```json
[
  {
    "idRol": 1,
    "nombre": "Administrador"
  },
  {
    "idRol": 2,
    "nombre": "Vendedor"
  }
]
```

---

### Obtener rol por ID

**Ruta:** `GET /api/roles/{id}`

**Descripción:** Obtiene los datos de un rol específico.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del rol

**Respuesta (200):**
```json
{
  "idRol": 1,
  "nombre": "Administrador"
}
```

**Respuestas de Error:**
- `404 Not Found`: Rol no encontrado

---

### Crear nuevo rol

**Ruta:** `POST /api/roles/crear`

**Descripción:** Crea un nuevo rol en el sistema.

**Payload (Request Body):**
```json
{
  "nombre": "string (obligatorio, no puede estar en blanco)"
}
```

**Respuesta (201):**
```json
{
  "idRol": 3,
  "nombre": "Cajero"
}
```

---

### Actualizar rol

**Ruta:** `PUT /api/roles/update/{id}`

**Descripción:** Actualiza los datos de un rol existente.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del rol

**Payload (Request Body):**
```json
{
  "nombre": "Super Administrador"
}
```

**Respuesta (200):**
```json
{
  "idRol": 1,
  "nombre": "Super Administrador"
}
```

**Respuestas de Error:**
- `404 Not Found`: Rol no encontrado

---

### Eliminar rol

**Ruta:** `DELETE /api/roles/eliminar/{id}`

**Descripción:** Elimina un rol del sistema.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del rol

**Respuesta (204):** Sin contenido

---

## Gestión de Privilegios

### Listar todos los privilegios

**Ruta:** `GET /api/privilegios/listar`

**Descripción:** Obtiene la lista de todos los privilegios del sistema.

**Payload:** Ninguno

**Respuesta (200):**
```json
[
  {
    "idPrivilegio": 1,
    "nombre": "CREAR_USUARIO",
    "estado": true
  },
  {
    "idPrivilegio": 2,
    "nombre": "ELIMINAR_USUARIO",
    "estado": true
  }
]
```

---

### Obtener privilegio por ID

**Ruta:** `GET /api/privilegios/{id}`

**Descripción:** Obtiene los datos de un privilegio específico.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del privilegio

**Respuesta (200):**
```json
{
  "idPrivilegio": 1,
  "nombre": "CREAR_USUARIO",
  "estado": true
}
```

**Respuestas de Error:**
- `404 Not Found`: Privilegio no encontrado

---

### Crear nuevo privilegio

**Ruta:** `POST /api/privilegios/crear`

**Descripción:** Crea un nuevo privilegio en el sistema.

**Payload (Request Body):**
```json
{
  "nombre": "string (obligatorio, no puede estar en blanco)",
  "estado": true
}
```

**Respuesta (201):**
```json
{
  "idPrivilegio": 3,
  "nombre": "EDITAR_VENTAS",
  "estado": true
}
```

---

### Actualizar privilegio

**Ruta:** `PUT /api/privilegios/update/{id}`

**Descripción:** Actualiza los datos de un privilegio existente.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del privilegio

**Payload (Request Body):**
```json
{
  "nombre": "CREAR_USUARIOS_ADMIN",
  "estado": false
}
```

**Respuesta (200):**
```json
{
  "idPrivilegio": 1,
  "nombre": "CREAR_USUARIOS_ADMIN",
  "estado": false
}
```

**Respuestas de Error:**
- `404 Not Found`: Privilegio no encontrado

---

### Eliminar privilegio

**Ruta:** `DELETE /api/privilegios/eliminar/{id}`

**Descripción:** Elimina un privilegio del sistema.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del privilegio

**Respuesta (204):** Sin contenido

---

## Gestión de Roles-Privilegios

### Listar todas las asignaciones rol-privilegio

**Ruta:** `GET /api/rol_privilegios/listar`

**Descripción:** Obtiene todas las asignaciones de privilegios a roles.

**Payload:** Ninguno

**Respuesta (200):**
```json
[
  {
    "idRol_privilegio": 1,
    "rol": {
      "idRol": 1,
      "nombre": "Administrador"
    },
    "privilegio": {
      "idPrivilegio": 1,
      "nombre": "CREAR_USUARIO",
      "estado": true
    }
  }
]
```

---

### Obtener asignación por ID

**Ruta:** `GET /api/rol_privilegios/{id}`

**Descripción:** Obtiene una asignación específica de rol-privilegio.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la asignación

**Respuesta (200):**
```json
{
  "idRol_privilegio": 1,
  "rol": {
    "idRol": 1,
    "nombre": "Administrador"
  },
  "privilegio": {
    "idPrivilegio": 1,
    "nombre": "CREAR_USUARIO",
    "estado": true
  }
}
```

**Respuestas de Error:**
- `404 Not Found`: Asignación no encontrada

---

### Crear nueva asignación rol-privilegio

**Ruta:** `POST /api/rol_privilegios/crear`

**Descripción:** Asigna un privilegio a un rol.

**Payload (Request Body):**
```json
{
  "rol": {
    "idRol": 1
  },
  "privilegio": {
    "idPrivilegio": 2
  }
}
```

**Validaciones:**
- `rol.idRol` es obligatorio y debe existir
- `privilegio.idPrivilegio` es obligatorio y debe existir

**Respuesta (201):**
```json
{
  "idRol_privilegio": 2,
  "rol": {
    "idRol": 1,
    "nombre": "Administrador"
  },
  "privilegio": {
    "idPrivilegio": 2,
    "nombre": "ELIMINAR_USUARIO",
    "estado": true
  }
}
```

**Respuestas de Error:**
- `400 Bad Request`: Rol o privilegio inválido
- `500 Internal Server Error`: Error al crear la asignación

---

### Actualizar asignación rol-privilegio

**Ruta:** `PUT /api/rol_privilegios/update/{id}`

**Descripción:** Actualiza una asignación de rol-privilegio existente.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la asignación

**Payload (Request Body):**
```json
{
  "rol": {
    "idRol": 2
  },
  "privilegio": {
    "idPrivilegio": 3
  }
}
```

**Respuesta (200):**
```json
{
  "idRol_privilegio": 1,
  "rol": {
    "idRol": 2,
    "nombre": "Vendedor"
  },
  "privilegio": {
    "idPrivilegio": 3,
    "nombre": "VER_VENTAS",
    "estado": true
  }
}
```

**Respuestas de Error:**
- `400 Bad Request`: Rol o privilegio inválido
- `404 Not Found`: Asignación no encontrada
- `500 Internal Server Error`: Error al actualizar

---

### Eliminar asignación rol-privilegio

**Ruta:** `DELETE /api/rol_privilegios/eliminar/{id}`

**Descripción:** Elimina una asignación de rol-privilegio.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la asignación

**Respuesta (204):** Sin contenido

---

## Gestión de Autores

### Listar todos los autores

**Ruta:** `GET /api/autores/listar`

**Descripción:** Obtiene la lista completa de autores registrados.

**Payload:** Ninguno

**Respuesta (200):**
```json
[
  {
    "idAutor": 1,
    "nombre": "Gabriel García Márquez",
    "estado": true
  },
  {
    "idAutor": 2,
    "nombre": "Isabel Allende",
    "estado": true
  }
]
```

---

### Obtener autor por ID

**Ruta:** `GET /api/autores/{id}`

**Descripción:** Obtiene los datos de un autor específico.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del autor

**Respuesta (200):**
```json
{
  "idAutor": 1,
  "nombre": "Gabriel García Márquez",
  "estado": true
}
```

**Respuestas de Error:**
- `404 Not Found`: Autor no encontrado

---

### Crear nuevo autor

**Ruta:** `POST /api/autores/crear`

**Descripción:** Registra un nuevo autor en el sistema.

**Payload (Request Body):**
```json
{
  "nombre": "string (obligatorio, no puede estar en blanco)",
  "estado": true
}
```

**Respuesta (201):**
```json
{
  "idAutor": 3,
  "nombre": "Mario Vargas Llosa",
  "estado": true
}
```

---

### Actualizar autor

**Ruta:** `PUT /api/autores/update/{id}`

**Descripción:** Actualiza los datos de un autor existente.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del autor

**Payload (Request Body):**
```json
{
  "nombre": "Gabriel García Márquez (Premio Nobel)",
  "estado": false
}
```

**Respuesta (200):**
```json
{
  "idAutor": 1,
  "nombre": "Gabriel García Márquez (Premio Nobel)",
  "estado": false
}
```

**Respuestas de Error:**
- `404 Not Found`: Autor no encontrado

---

### Eliminar autor

**Ruta:** `DELETE /api/autores/eliminar/{id}`

**Descripción:** Elimina un autor del sistema.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del autor

**Respuesta (204):** Sin contenido

---

## Gestión de Categorías

### Listar todas las categorías

**Ruta:** `GET /api/categorias/listar`

**Descripción:** Obtiene la lista completa de categorías de libros.

**Payload:** Ninguno

**Respuesta (200):**
```json
[
  {
    "idCategoria": 1,
    "nombre": "Ficción",
    "estado": true
  },
  {
    "idCategoria": 2,
    "nombre": "Ciencia",
    "estado": true
  }
]
```

---

### Obtener categoría por ID

**Ruta:** `GET /api/categorias/{id}`

**Descripción:** Obtiene los datos de una categoría específica.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la categoría

**Respuesta (200):**
```json
{
  "idCategoria": 1,
  "nombre": "Ficción",
  "estado": true
}
```

**Respuestas de Error:**
- `404 Not Found`: Categoría no encontrada

---

### Crear nueva categoría

**Ruta:** `POST /api/categorias/crear`

**Descripción:** Crea una nueva categoría de libros.

**Payload (Request Body):**
```json
{
  "nombre": "string (obligatorio, no puede estar en blanco)",
  "estado": true
}
```

**Respuesta (201):**
```json
{
  "idCategoria": 3,
  "nombre": "Historia",
  "estado": true
}
```

---

### Actualizar categoría

**Ruta:** `PUT /api/categorias/update/{id}`

**Descripción:** Actualiza los datos de una categoría existente.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la categoría

**Payload (Request Body):**
```json
{
  "nombre": "Ficción Contemporánea",
  "estado": false
}
```

**Respuesta (200):**
```json
{
  "idCategoria": 1,
  "nombre": "Ficción Contemporánea",
  "estado": false
}
```

**Respuestas de Error:**
- `404 Not Found`: Categoría no encontrada

---

### Eliminar categoría

**Ruta:** `DELETE /api/categorias/eliminar/{id}`

**Descripción:** Elimina una categoría del sistema.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la categoría

**Respuesta (204):** Sin contenido

---

## Gestión de Editoriales

### Listar todas las editoriales

**Ruta:** `GET /api/editoriales/listar`

**Descripción:** Obtiene la lista completa de editoriales.

**Payload:** Ninguno

**Respuesta (200):**
```json
[
  {
    "idEditorial": 1,
    "nombre": "Penguin Random House",
    "estado": true
  },
  {
    "idEditorial": 2,
    "nombre": "Planeta",
    "estado": true
  }
]
```

---

### Obtener editorial por ID

**Ruta:** `GET /api/editoriales/{id}`

**Descripción:** Obtiene los datos de una editorial específica.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la editorial

**Respuesta (200):**
```json
{
  "idEditorial": 1,
  "nombre": "Penguin Random House",
  "estado": true
}
```

**Respuestas de Error:**
- `404 Not Found`: Editorial no encontrada

---

### Crear nueva editorial

**Ruta:** `POST /api/editoriales/crear`

**Descripción:** Registra una nueva editorial.

**Payload (Request Body):**
```json
{
  "nombre": "string (obligatorio, no puede estar en blanco)",
  "estado": true
}
```

**Respuesta (201):**
```json
{
  "idEditorial": 3,
  "nombre": "Alfaguara",
  "estado": true
}
```

---

### Actualizar editorial

**Ruta:** `PUT /api/editoriales/update/{id}`

**Descripción:** Actualiza los datos de una editorial existente.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la editorial

**Payload (Request Body):**
```json
{
  "nombre": "Penguin Random House Grupo Editorial",
  "estado": false
}
```

**Respuesta (200):**
```json
{
  "idEditorial": 1,
  "nombre": "Penguin Random House Grupo Editorial",
  "estado": false
}
```

**Respuestas de Error:**
- `404 Not Found`: Editorial no encontrada

---

### Eliminar editorial

**Ruta:** `DELETE /api/editoriales/eliminar/{id}`

**Descripción:** Elimina una editorial del sistema.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la editorial

**Respuesta (204):** Sin contenido

---

## Gestión de Libros

### Listar todos los libros

**Ruta:** `GET /api/libros/listar`

**Descripción:** Obtiene la lista completa de libros con sus relaciones (autor, categoría, editorial).

**Payload:** Ninguno

**Respuesta (200):**
```json
[
  {
    "idLibro": 1,
    "titulo": "Cien Años de Soledad",
    "codigo": "LIB001",
    "nPaginas": 471,
    "precio": 45.50,
    "stock": 25,
    "categoria": {
      "idCategoria": 1,
      "nombre": "Ficción",
      "estado": true
    },
    "editorial": {
      "idEditorial": 1,
      "nombre": "Penguin Random House",
      "estado": true
    },
    "autor": {
      "idAutor": 1,
      "nombre": "Gabriel García Márquez",
      "estado": true
    }
  }
]
```

---

### Obtener libro por ID

**Ruta:** `GET /api/libros/{id}`

**Descripción:** Obtiene los datos de un libro específico con sus relaciones.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del libro

**Respuesta (200):**
```json
{
  "idLibro": 1,
  "titulo": "Cien Años de Soledad",
  "codigo": "LIB001",
  "nPaginas": 471,
  "precio": 45.50,
  "stock": 25,
  "categoria": {...},
  "editorial": {...},
  "autor": {...}
}
```

**Respuestas de Error:**
- `404 Not Found`: Libro no encontrado

---

### Buscar libros por título

**Ruta:** `GET /api/libros/buscarPorTitulo?titulo={titulo}`

**Descripción:** Busca libros que coincidan con el título proporcionado.

**Parámetros de consulta (Query Params):**
- `titulo` (String, obligatorio): Título o parte del título a buscar

**Respuesta (200):**
```json
[
  {
    "idLibro": 1,
    "titulo": "Cien Años de Soledad",
    "codigo": "LIB001",
    "nPaginas": 471,
    "precio": 45.50,
    "stock": 25,
    "categoria": {...},
    "editorial": {...},
    "autor": {...}
  }
]
```

---

### Buscar libros por código

**Ruta:** `GET /api/libros/buscarPorCodigo?codigo={codigo}`

**Descripción:** Busca libros por su código.

**Parámetros de consulta (Query Params):**
- `codigo` (String, obligatorio): Código del libro

**Respuesta (200):**
```json
[
  {
    "idLibro": 1,
    "titulo": "Cien Años de Soledad",
    "codigo": "LIB001",
    "nPaginas": 471,
    "precio": 45.50,
    "stock": 25,
    "categoria": {...},
    "editorial": {...},
    "autor": {...}
  }
]
```

---

### Crear nuevo libro

**Ruta:** `POST /api/libros/crear`

**Descripción:** Registra un nuevo libro en el sistema.

**Payload (Request Body):**
```json
{
  "titulo": "string (obligatorio, no puede estar en blanco)",
  "codigo": "string (obligatorio, no puede estar en blanco)",
  "nPaginas": 0,
  "precio": 0.0,
  "stock": 0,
  "categoria": {
    "idCategoria": 1
  },
  "editorial": {
    "idEditorial": 1
  },
  "autor": {
    "idAutor": 1
  }
}
```

**Validaciones:**
- `titulo` es obligatorio
- `codigo` es obligatorio
- `categoria.idCategoria` es obligatorio y debe existir
- `editorial.idEditorial` puede ser null
- `autor.idAutor` puede ser null

**Respuesta (201):**
```json
{
  "idLibro": 2,
  "titulo": "El Amor en los Tiempos del Cólera",
  "codigo": "LIB002",
  "nPaginas": 368,
  "precio": 39.90,
  "stock": 15,
  "categoria": {...},
  "editorial": {...},
  "autor": {...}
}
```

**Respuestas de Error:**
- `400 Bad Request`: Categoría, editorial o autor inválido
- `500 Internal Server Error`: Error al crear el libro

---

### Actualizar libro

**Ruta:** `PUT /api/libros/update/{id}`

**Descripción:** Actualiza los datos de un libro existente.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del libro

**Payload (Request Body):**
```json
{
  "titulo": "Cien Años de Soledad - Edición Especial",
  "codigo": "LIB001-ESP",
  "nPaginas": 500,
  "precio": 55.00,
  "stock": 30,
  "categoria": {
    "idCategoria": 1
  },
  "editorial": {
    "idEditorial": 2
  },
  "autor": {
    "idAutor": 1
  }
}
```

**Validaciones:**
- `titulo` no puede estar vacío
- Si se proporciona `autor.idAutor`, debe existir
- Si se proporciona `categoria.idCategoria`, debe existir
- Si se proporciona `editorial.idEditorial`, debe existir

**Respuesta (200):**
```json
{
  "idLibro": 1,
  "titulo": "Cien Años de Soledad - Edición Especial",
  "codigo": "LIB001-ESP",
  "nPaginas": 500,
  "precio": 55.00,
  "stock": 30,
  "categoria": {...},
  "editorial": {...},
  "autor": {...}
}
```

**Respuestas de Error:**
- `400 Bad Request`: Título vacío, categoría, editorial o autor inválido
- `404 Not Found`: Libro no encontrado
- `500 Internal Server Error`: Error al actualizar

---

### Eliminar libro

**Ruta:** `DELETE /api/libros/eliminar/{id}`

**Descripción:** Elimina un libro del sistema.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del libro

**Respuesta (204):** Sin contenido

---

## Gestión de Ventas

### Listar todas las ventas

**Ruta:** `GET /api/ventas/listar`

**Descripción:** Obtiene la lista completa de ventas con sus relaciones.

**Payload:** Ninguno

**Respuesta (200):**
```json
[
  {
    "idVenta": 1,
    "numVenta": 1001,
    "cambio": 5.50,
    "ruc": "20123456789",
    "estado": "ACTIVA",
    "moneda": "PEN",
    "totalVenta": 94.50,
    "metodoPago": "EFECTIVO",
    "fechaVenta": "2024-12-01",
    "usuario": {
      "idUsuario": 1,
      "email": "vendedor@libreria.com",
      "estado": "ACTIVO",
      "rol": {...},
      "trabajador": {...}
    },
    "trabajador": {
      "idTrabajador": 1,
      "codigo": "TRAB001",
      "estadoLaboral": true,
      "estado": "ACTIVO",
      "persona": {...}
    },
    "cliente": {
      "idCliente": 1,
      "estado": true,
      "persona": {...}
    }
  }
]
```

---

### Obtener venta por ID

**Ruta:** `GET /api/ventas/{id}`

**Descripción:** Obtiene los datos de una venta específica.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la venta

**Respuesta (200):**
```json
{
  "idVenta": 1,
  "numVenta": 1001,
  "cambio": 5.50,
  "ruc": "20123456789",
  "estado": "ACTIVA",
  "moneda": "PEN",
  "totalVenta": 94.50,
  "metodoPago": "EFECTIVO",
  "fechaVenta": "2024-12-01",
  "usuario": {...},
  "trabajador": {...},
  "cliente": {...}
}
```

**Respuestas de Error:**
- `404 Not Found`: Venta no encontrada

---

### Crear nueva venta

**Ruta:** `POST /api/ventas/crear`

**Descripción:** Registra una nueva venta en el sistema.

**Payload (Request Body):**
```json
{
  "numVenta": 1002,
  "cambio": 10.00,
  "ruc": "20987654321",
  "estado": "ACTIVA",
  "moneda": "PEN",
  "totalVenta": 150.00,
  "metodoPago": "TARJETA",
  "fechaVenta": "2024-12-01",
  "usuario": {
    "idUsuario": 1
  },
  "trabajador": {
    "idTrabajador": 1
  },
  "cliente": {
    "idCliente": 2
  }
}
```

**Validaciones:**
- `usuario.idUsuario` es obligatorio y debe existir
- `trabajador.idTrabajador` es obligatorio y debe existir
- `cliente.idCliente` es obligatorio y debe existir
- `estado` puede ser: "ACTIVA" o "INACTIVA"

**Respuesta (201):**
```json
{
  "idVenta": 2,
  "numVenta": 1002,
  "cambio": 10.00,
  "ruc": "20987654321",
  "estado": "ACTIVA",
  "moneda": "PEN",
  "totalVenta": 150.00,
  "metodoPago": "TARJETA",
  "fechaVenta": "2024-12-01",
  "usuario": {...},
  "trabajador": {...},
  "cliente": {...}
}
```

**Respuestas de Error:**
- `400 Bad Request`: Usuario, trabajador o cliente inválido
- `500 Internal Server Error`: Error al crear la venta

---

### Actualizar venta

**Ruta:** `PUT /api/ventas/update/{id}`

**Descripción:** Actualiza los datos de una venta existente.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la venta

**Payload (Request Body):**
```json
{
  "numVenta": 1001,
  "cambio": 0.00,
  "ruc": "20123456789",
  "estado": "INACTIVA",
  "moneda": "USD",
  "totalVenta": 100.00,
  "metodoPago": "TRANSFERENCIA",
  "fechaVenta": "2024-12-02",
  "usuario": {
    "idUsuario": 2
  },
  "trabajador": {
    "idTrabajador": 2
  },
  "cliente": {
    "idCliente": 3
  }
}
```

**Respuesta (200):**
```json
{
  "idVenta": 1,
  "numVenta": 1001,
  "cambio": 0.00,
  "ruc": "20123456789",
  "estado": "INACTIVA",
  "moneda": "USD",
  "totalVenta": 100.00,
  "metodoPago": "TRANSFERENCIA",
  "fechaVenta": "2024-12-02",
  "usuario": {...},
  "trabajador": {...},
  "cliente": {...}
}
```

**Respuestas de Error:**
- `404 Not Found`: Venta no encontrada
- `500 Internal Server Error`: Error al actualizar

---

### Eliminar venta

**Ruta:** `DELETE /api/ventas/eliminar/{id}`

**Descripción:** Elimina una venta del sistema.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID de la venta

**Respuesta (204):** Sin contenido

---

## Gestión de Detalle de Ventas

### Listar todos los detalles de venta

**Ruta:** `GET /api/detalleventas/listar`

**Descripción:** Obtiene la lista completa de detalles de todas las ventas.

**Payload:** Ninguno

**Respuesta (200):**
```json
[
  {
    "idDetalleVenta": 1,
    "cantidad": 2,
    "precioCompra": 45.50,
    "venta": {
      "idVenta": 1,
      "numVenta": 1001,
      "totalVenta": 94.50,
      "fechaVenta": "2024-12-01",
      "usuario": {...},
      "trabajador": {...},
      "cliente": {...}
    },
    "libro": {
      "idLibro": 1,
      "titulo": "Cien Años de Soledad",
      "codigo": "LIB001",
      "precio": 45.50,
      "stock": 25,
      "categoria": {...},
      "editorial": {...},
      "autor": {...}
    }
  }
]
```

---

### Obtener detalle de venta por ID

**Ruta:** `GET /api/detalleventas/{id}`

**Descripción:** Obtiene los datos de un detalle de venta específico.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del detalle de venta

**Respuesta (200):**
```json
{
  "idDetalleVenta": 1,
  "cantidad": 2,
  "precioCompra": 45.50,
  "venta": {...},
  "libro": {...}
}
```

**Respuestas de Error:**
- `404 Not Found`: Detalle de venta no encontrado

---

### Crear nuevo detalle de venta

**Ruta:** `POST /api/detalleventas/crear`

**Descripción:** Registra un nuevo detalle de venta (item en una venta).

**Payload (Request Body):**
```json
{
  "cantidad": 3,
  "precioCompra": 39.90,
  "venta": {
    "idVenta": 1
  },
  "libro": {
    "idLibro": 2
  }
}
```

**Validaciones:**
- `venta.idVenta` es obligatorio y debe existir
- `libro.idLibro` es obligatorio y debe existir

**Respuesta (201):**
```json
{
  "idDetalleVenta": 2,
  "cantidad": 3,
  "precioCompra": 39.90,
  "venta": {
    "idVenta": 1,
    "numVenta": 1001,
    "totalVenta": 94.50,
    "usuario": {...},
    "trabajador": {...},
    "cliente": {...}
  },
  "libro": {
    "idLibro": 2,
    "titulo": "El Amor en los Tiempos del Cólera",
    "codigo": "LIB002",
    "precio": 39.90,
    "categoria": {...},
    "editorial": {...},
    "autor": {...}
  }
}
```

**Respuestas de Error:**
- `400 Bad Request`: Venta o libro inválido
- `500 Internal Server Error`: Error al crear el detalle

---

### Actualizar detalle de venta

**Ruta:** `PUT /api/detalleventas/update/{id}`

**Descripción:** Actualiza los datos de un detalle de venta existente.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del detalle de venta

**Payload (Request Body):**
```json
{
  "cantidad": 5,
  "precioCompra": 45.00,
  "venta": {
    "idVenta": 2
  },
  "libro": {
    "idLibro": 3
  }
}
```

**Respuesta (200):**
```json
{
  "idDetalleVenta": 1,
  "cantidad": 5,
  "precioCompra": 45.00,
  "venta": {...},
  "libro": {...}
}
```

**Respuestas de Error:**
- `404 Not Found`: Detalle de venta no encontrado
- `500 Internal Server Error`: Error al actualizar

---

### Eliminar detalle de venta

**Ruta:** `DELETE /api/detalleventas/eliminar/{id}`

**Descripción:** Elimina un detalle de venta del sistema.

**Parámetros de ruta:**
- `id` (Long, obligatorio): ID del detalle de venta

**Respuesta (204):** Sin contenido

---

## Notas Importantes para el Frontend

### Autenticación

- Todos los endpoints (excepto `/api/auth/login`) requieren un token JWT válido
- El token debe enviarse en el header `Authorization` con el formato: `Bearer {token}`
- El token se obtiene al hacer login exitosamente

### Códigos de Estado HTTP

- `200 OK`: Petición exitosa
- `201 Created`: Recurso creado exitosamente
- `204 No Content`: Petición exitosa sin contenido de respuesta (típicamente para DELETE)
- `400 Bad Request`: Error en la validación de datos enviados
- `401 Unauthorized`: No autenticado o token inválido
- `403 Forbidden`: No tiene permisos para acceder al recurso
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error en el servidor

### Tipos de Datos Enum

#### EstadoUsuario
- `ACTIVO`
- `INACTIVO`

#### EstadoTrabajador
- `ACTIVO`
- `INACTIVO`

#### EstadoVenta
- `ACTIVA`
- `INACTIVA`

### Validaciones Comunes

- Los campos marcados con `@NotBlank` no pueden estar vacíos ni contener solo espacios
- Los campos marcados con `@NotNull` no pueden ser null
- Las relaciones entre entidades deben existir antes de crear/actualizar
- Los IDs de entidades relacionadas deben ser válidos

### Base URL

La URL base del API es: `http://localhost:8080` (o la URL configurada en tu entorno)

### Formato de Fechas

Las fechas se manejan en formato `yyyy-MM-dd` (ejemplo: `2024-12-01`)

---

## Resumen de Endpoints por Módulo

| Módulo | Listar | Obtener por ID | Crear | Actualizar | Eliminar | Otros |
|--------|--------|----------------|-------|------------|----------|-------|
| **Auth** | - | - | Login | - | - | - |
| **Personas** | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| **Clientes** | ✓ | ✓ | ✓ | ✓ | ✓ | Buscar por DNI |
| **Trabajadores** | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| **Usuarios** | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| **Roles** | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| **Privilegios** | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| **Roles-Privilegios** | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| **Autores** | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| **Categorías** | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| **Editoriales** | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| **Libros** | ✓ | ✓ | ✓ | ✓ | ✓ | Buscar por título, Buscar por código |
| **Ventas** | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| **Detalle Ventas** | ✓ | ✓ | ✓ | ✓ | ✓ | - |

---

**Total de Endpoints Documentados:** 54 endpoints

**Última Actualización:** Diciembre 2024
