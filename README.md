# Zapetrol Backend

Backend del proyecto Zapetrol - API REST construida con NestJS, TypeORM y PostgreSQL.

## 📋 Requisitos previos

- Node.js >= 18
- PostgreSQL >= 14
- npm o pnpm

## 🚀 Instalación

### 1. Clonar el repositorio e instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DATABASE_URL=postgresql://usuario:password@localhost:5432/nombre_bd
JWT_SECRET=tu_clave_secreta_jwt
JWT_EXPIRES=1d
```

### 3. Crear usuario administrador inicial

El proyecto incluye un script para crear el primer usuario administrador:

```bash
npm run seed:admin
```

**Credenciales creadas:**

- **Email:** `admin@test.com`
- **Password:** `Admin123`

> ⚠️ **Importante:** Cambia estas credenciales después del primer login en producción.

### 4. Ejecutar el proyecto

**Modo desarrollo:**

```bash
npm run start:dev
```

**Modo producción:**

```bash
npm run build
npm run start:prod
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Endpoints principales

### Autenticación

- `POST /auth/register` - Registro de nuevos usuarios
- `POST /auth/login` - Inicio de sesión
- `GET /auth/me` - Obtener información del usuario autenticado

### Panel de Administración (requiere rol admin)

- `GET /admin/users` - Listar todos los usuarios
- `GET /admin/users/:id` - Obtener un usuario específico
- `PUT /admin/users/:id` - Actualizar un usuario
- `DELETE /admin/users/:id` - Eliminar un usuario

## 🔐 Autenticación

Todas las rutas protegidas requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

## 🛠️ Scripts disponibles

- `npm run start:dev` - Inicia el servidor en modo desarrollo
- `npm run build` - Compila el proyecto
- `npm run seed:admin` - Crea el usuario administrador inicial
- `npm run lint` - Ejecuta el linter
- `npm test` - Ejecuta los tests

## 📁 Estructura del proyecto

```
src/
├── auth/           # Módulo de autenticación (JWT, guards)
├── users/          # Módulo de usuarios
├── admin/          # Módulo del panel de administración
├── scripts/        # Scripts de seed y utilidades
└── main.ts         # Punto de entrada de la aplicación
```

## 🔒 Seguridad

- Las contraseñas se hashean con bcrypt (10 rounds)
- Validación de datos con class-validator
- Guards de autenticación y autorización por roles
- Por defecto, los nuevos usuarios se crean con rol `user`
- Solo los administradores pueden modificar roles

