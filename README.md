<div align="center">

# 🔧 Zapetrol Backend

### REST API for real-time fuel price aggregation and geolocation

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Key Features](#-key-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Available Scripts](#%EF%B8%8F-available-scripts)
- [Technologies](#-technologies)

---

## 🎯 About

**Zapetrol Backend** is a robust REST API built with **NestJS**, **TypeORM**, and **PostgreSQL** that powers the Zapetrol fuel price comparison platform. It provides real-time fuel price data aggregation, user authentication, geolocation services, and administrative capabilities.

---

## ✨ Key Features

- 🔐 **JWT Authentication** - Secure token-based authentication system
- 👥 **User Management** - Complete user CRUD operations
- 🔑 **Role-Based Access Control** - Admin and user roles with guards
- 📍 **Geolocation Services** - Location-based fuel station queries
- 📊 **Real-time Data** - Integration with external fuel price APIs
- 🛡️ **Security First** - Bcrypt password hashing and data validation
- 📄 **PostgreSQL Database** - Reliable data persistence with TypeORM
- 📦 **RESTful API** - Clean and well-documented endpoints

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18
- **PostgreSQL** >= 14
- **npm** or **pnpm**

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/IsabellaTobon/zapetrol-backend.git
cd zapetrol-backend
```

### 2. Install dependencies

```bash
npm install
```

---

## ⚙️ Configuration

Create a `.env` file in the project root with the following variables:

```env
# Database connection
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# JWT configuration
JWT_SECRET=your_secret_jwt_key
JWT_EXPIRES=1d
```

---

## 🏼 Running the Application

### 1. Create initial admin user

The project includes a seed script to create the first admin user:

```bash
npm run seed:admin
```

**Default credentials:**
- **Email:** `admin@test.com`
- **Password:** `Admin123`

⚠️ **Important:** Change these credentials immediately after first login!

### 2. Start the server

**Development mode:**

```bash
npm run start:dev
```

**Production mode:**

```bash
npm run build
npm run start:prod
```

The server will be available at `http://localhost:3000`

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register new user | No |
| `POST` | `/auth/login` | User login | No |
| `GET` | `/auth/me` | Get authenticated user info | Yes |

### Admin Panel

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| `GET` | `/admin/users` | List all users | Yes | Admin |
| `GET` | `/admin/users/:id` | Get specific user | Yes | Admin |
| `PUT` | `/admin/users/:id` | Update user | Yes | Admin |
| `DELETE` | `/admin/users/:id` | Delete user | Yes | Admin |

### Example Request

**Register User:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123",
    "name": "John Doe"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123"
  }'
```

---

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

**Token expiration:** Configured via `JWT_EXPIRES` environment variable (default: 1 day)

---

## 📁 Project Structure

```
src/
├── auth/              # Authentication module
│   ├── guards/       # JWT and role guards
│   ├── strategies/  # Passport strategies
│   └── dto/         # Data transfer objects
├── users/            # Users module
│   ├── entities/    # User entity
│   └── dto/         # User DTOs
├── admin/            # Admin panel module
│   └── controllers/ # Admin endpoints
├── scripts/          # Seed scripts and utilities
└── main.ts           # Application entry point
```

---

## 🛡️ Security

The application implements multiple security measures:

- 🔒 **Password Hashing** - Bcrypt with 10 salt rounds
- ✅ **Input Validation** - class-validator for all DTOs
- 🚪 **Authentication Guards** - JWT-based route protection
- 👮 **Role Authorization** - Admin-only endpoints protected
- 🎯 **Default User Role** - New users created as `user` role
- 🚫 **Role Protection** - Only admins can modify user roles

---

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start:dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start:prod` | Start production server |
| `npm run seed:admin` | Create initial admin user |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Generate test coverage report |

---

## 🔧 Technologies

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Static typing for JavaScript
- **TypeORM** - ORM for TypeScript and JavaScript
- **PostgreSQL** - Relational database
- **Passport** - Authentication middleware
- **JWT** - JSON Web Tokens
- **Bcrypt** - Password hashing
- **Class Validator** - Decorator-based validation
- **Class Transformer** - Object transformation

---

## 📝 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|--------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT signing | Yes | - |
| `JWT_EXPIRES` | JWT token expiration time | No | `1d` |
| `PORT` | Server port | No | `3000` |

---

## 💡 Tips

- Change default admin credentials immediately after first deployment
- Use strong JWT secrets in production (minimum 32 characters)
- Enable PostgreSQL SSL in production environments
- Consider implementing rate limiting for public endpoints
- Use environment-specific configuration files
- Enable CORS only for trusted origins

---

## 📄 License

This project is part of a Master's Thesis (TFM - Trabajo Fin de Máster).

---

<div align="center">

**Built with 🔧 for reliable fuel price data**

</div>
