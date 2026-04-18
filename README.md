# 🛒 Product Catalog API + React Frontend

Solución fullstack desarrollada con .NET + React, siguiendo principios de arquitectura limpia, seguridad con JWT y despliegue con Docker.

---

## Tecnologías

### Backend
- .NET 8 (Clean Architecture)
- Entity Framework Core
- PostgreSQL
- JWT Authentication

### Frontend
- React (Vite)
- Material UI
- Axios (con interceptor JWT)

### DevOps
- Docker & Docker Compose
- GitHub Actions (CI/CD)

---

## Arquitectura

Se implementó una arquitectura basada en capas:

- **Domain** → Entidades
- **Application** → DTOs, lógica
- **Infrastructure** → DB, servicios
- **API** → Controllers

No se exponen entidades directamente (uso de DTOs).

---

## Seguridad

- Autenticación con JWT
- Interceptor en frontend para enviar token automáticamente
- Protección de rutas (AuthGuard)

---

## Funcionalidades

- Login con JWT
- CRUD de productos
- Paginación
- Búsqueda
- Eliminación
- UI moderna con Material UI

---

## 🐳 Ejecución con Docker

### 1. Clonar repositorio

```bash
git clone https://github.com/JeffersonTovar/product-catalog-api
cd product-catalog-api

```

### 2. Levantar todo

```bash
docker-compose up --build
```

## Acceso

* Frontend → http://localhost:3000
* API → http://localhost:5000
* Swagger → http://localhost:5000/swagger

## Escalabilidad

La solución puede escalar horizontalmente mediante:

- Despliegue de múltiples instancias del API detrás de un balanceador (Nginx)
- Separación de servicios (frontend, backend, base de datos)
- Uso de contenedores Docker
- Posible integración con colas (RabbitMQ) para procesamiento masivo
- Implementación de cache (Redis) para consultas frecuentes

## Testing

* Pruebas unitarias
* Prueba de integración con WebApplicationFactory

## CI/CD

Pipeline configurado con GitHub Actions:

* Build
* Test
* Docker build
* Health check
