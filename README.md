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
openssl rand -hex 32 | sed 's/^/JWT_SECRET=/' > .env
docker compose up -d --wait postgres_db
```

En PowerShell, creá el archivo de configuración con `"JWT_SECRET=$([guid]::NewGuid().ToString('N'))$([guid]::NewGuid().ToString('N'))" | Set-Content .env` en lugar de la línea con OpenSSL.

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

Registrá un usuario de prueba desde la interfaz. Para probar rutas protegidas en Swagger, iniciá sesión y usá el JWT con **Authorize**. Las credenciales de PostgreSQL del Compose son para desarrollo local.

Para detener el entorno, ejecutá `docker compose down`. Los datos de PostgreSQL quedan en el volumen local.

## Cómo está organizado

- [tasks-frontend/](tasks-frontend/) contiene la interfaz SPA construida con React 19, Vite y Tailwind CSS.
- [tasks-api/](tasks-api/) contiene la API, con módulos de autenticación, tareas y proyectos, validación de DTOs y migraciones de Prisma.
- [docker-compose.yml](docker-compose.yml) define el cliente, la API y PostgreSQL para desarrollo.

## Proyectos y tareas

Cada usuario accede a sus propios proyectos y tareas. Al eliminar un proyecto, sus tareas quedan disponibles en «Sin proyecto». En la API, omitir `projectId` al editar una tarea conserva el proyecto. Enviar `projectId: null` la desvincula.

La migración de propiedad conserva los registros anteriores. Las tareas vinculadas a un proyecto con dueño heredan ese dueño. Los registros sin dueño conocido quedan fuera de las cuentas hasta que un administrador los vincule a la cuenta correcta.

## Pruebas

Con Node.js 22.12 o posterior, podés ejecutar las suites existentes desde sus respectivas carpetas.

```bash
# Desde tasks-api/
npm ci
npx prisma generate
npm test -- --runInBand

# Desde tasks-frontend/
npm ci
npm test -- --run
```

La suite de integración usa un PostgreSQL de pruebas configurado mediante `DATABASE_URL` y un `JWT_SECRET` de al menos 32 bytes. Aplicá las migraciones con `npx prisma migrate deploy` y ejecutá `npm run test:e2e -- --runInBand` desde `tasks-api/`. Ejecutá esta suite contra una base de pruebas vacía y dedicada.
