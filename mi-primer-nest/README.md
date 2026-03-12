# 🚀 TaskMaster API - Backend Professional Suite

Backend robusto desarrollado con **NestJS**, enfocado en la integridad de los datos y patrones de diseño escalables.

## 🛠️ Stack Tecnológico
* **Framework:** NestJS (Node.js)
* **ORM:** Prisma
* **Base de Datos:** PostgreSQL
* **Seguridad:** Passport JWT Strategy
* **Validación:** Class-validator & DTOs

## 🏗️ Decisiones de Arquitectura
* **Data Management:** Implementación de DTOs estrictos para garantizar que la base de datos nunca reciba información inconsistente.
* **Seguridad:** Guards de autenticación JWT centralizados para proteger los recursos sensibles.
* **Desacoplamiento:** Uso intensivo de Inyección de Dependencias para facilitar el testing y el mantenimiento.

## 🧪 Estrategia de Testing (Vitest)
Se implementó una suite completa de tests para asegurar la estabilidad:
* **Unit Tests:** Cobertura total de lógica de servicios y controladores usando Mocks.
* **Functional Tests:** Validación de endpoints y ciclos de vida de peticiones (Pipes, Filters) usando Supertest.
* **Mocking:** Aislamiento total de la base de datos para garantizar tests determinísticos y veloces.