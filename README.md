🚀 TaskMaster Pro 2026 - Full Stack Engineering Project
Bienvenido a TaskMaster Pro, una plataforma integral de gestión de tareas diseñada bajo los más altos estándares de Systems Design y Data Management. Este proyecto no solo resuelve una necesidad funcional, sino que sirve como caso de estudio para la optimización de recursos y robustez arquitectónica.

🏗️ Arquitectura del Sistema
El sistema está diseñado como una arquitectura desacoplada de alto rendimiento:

Frontend: Single Page Application (SPA) con React 18 + Vite, optimizada para minimizar el uso de CPU y evitar fugas de memoria.

Backend: API REST con NestJS, siguiendo patrones de inyección de dependencias y validación estricta de datos.

Infraestructura: Orquestación mediante Docker & Docker Compose para un despliegue reproducible en cualquier entorno.

Base de Datos: PostgreSQL con persistencia gestionada mediante Prisma ORM.

⚡ Quick Start (Modo Evaluador)
La forma más rápida de ver el sistema en acción es utilizando Docker. No necesitás instalar Node.js ni bases de datos localmente.

Clonar el repositorio:

Bash:

git clone https://github.com/tu-usuario/taskmaster-pro.git
cd taskmaster-pro
Levantar el sistema completo:

Bash:

docker-compose up --build

Acceso:

Frontend:

 http://localhost:5173


Backend API: 

http://localhost:3000

🛠️ Highlights de Ingeniería
1. Auditoría de Performance (Frontend)
A diferencia de aplicaciones estándar, TaskMaster Pro fue sometido a un análisis de perfiles de memoria (Heap Snapshots).

2. Integridad de Datos (Backend)
Validación Atómica: Uso de ValidationPipe y DTOs con class-validator para asegurar que el sistema rechace datos inconsistentes antes de procesar cualquier lógica.

Relaciones Relacionales: Estructura de datos optimizada en PostgreSQL para manejar tareas vinculadas a usuarios y proyectos con integridad referencial total.

🧪 Suite de Testing
El proyecto cuenta con una cobertura integral en ambos frentes:

Backend (Vitest/Jest)
Unit Tests: Validación de lógica de negocio en servicios.

Functional Tests: Pruebas de endpoints con Supertest, verificando el flujo de guards, pipes y respuesta de la API.

Ejecución: 

cd mi-primer-nest && npm run test

Frontend (Vitest + RTL)
Component Testing: Pruebas de interacción con React Testing Library.

Context Testing: Verificación de persistencia de sesión en el AuthContext.

Ejecución: 

cd tasks-frontend && npm test

📂 Estructura del Proyecto
Plaintext
/taskmaster-pro
├── /mi-primer-nest    # Backend API (NestJS)
├── /tasks-frontend    # Cliente Web (React)
├── docker-compose.yml # Orquestador de servicios
└── README.md          # Guía principal


Desarrollado por: Joaquín - Full Stack Developer 2026