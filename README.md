# TasksManager

Aplicación web para organizar tareas y proyectos. El frontend en **React y TypeScript** consume una API REST en **NestJS**. La API persiste datos en **PostgreSQL** mediante **Prisma**.

## Qué podés probar

- Crear una cuenta e iniciar sesión con JWT.
- Crear proyectos y asociarles tareas.
- Crear, editar y eliminar tareas desde la interfaz.
- Explorar la API y sus esquemas en Swagger.

## Ejecutar en local

Necesitás Git y Docker con Compose v2 o posterior. Los puertos locales 5173, 3000 y 5433 deben estar libres.

```bash
git clone https://github.com/joaquinalder/TasksManager.git
cd TasksManager
docker compose up -d postgres_db
docker compose exec postgres_db pg_isready -h localhost -U postgres
```

Cuando PostgreSQL indique que acepta conexiones, aplicá las migraciones y levantá la aplicación.

```bash
docker compose run --rm --build api npx prisma migrate deploy
docker compose up --build
```

| Servicio | Dirección |
| --- | --- |
| Frontend | [localhost:5173](http://localhost:5173) |
| Documentación de la API | [localhost:3000/docs](http://localhost:3000/docs) |
| Base de la API | `http://localhost:3000/api/v1` |

Registrá un usuario de prueba desde la interfaz. Para probar rutas protegidas en Swagger, iniciá sesión y usá el JWT con **Authorize**. Las credenciales y el secreto del Compose son valores para desarrollo local.

Para detener el entorno, ejecutá `docker compose down`. Los datos de PostgreSQL quedan en el volumen local.

## Cómo está organizado

- [tasks-frontend/](tasks-frontend/) contiene la interfaz SPA construida con React 19, Vite y Tailwind CSS.
- [mi-primer-nest/](mi-primer-nest/) contiene la API, con módulos de autenticación, tareas y proyectos, validación de DTOs y migraciones de Prisma.
- [docker-compose.yml](docker-compose.yml) define el cliente, la API y PostgreSQL para desarrollo.

## Pruebas

Con Node.js 20.19 o posterior, podés ejecutar las suites existentes desde sus respectivas carpetas.

```bash
# Desde mi-primer-nest/
npm ci
npx prisma generate
npm test -- --runInBand

# Desde tasks-frontend/
npm ci
npm test -- --run
```
