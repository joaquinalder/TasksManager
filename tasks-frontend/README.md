# ⚡ TaskMaster Pro - High Performance Client

Frontend de alto rendimiento construido con **React 18** y **Vite**, diseñado bajo principios de optimización de recursos y gestión de memoria avanzada.

## 🚀 Características Principales
* **Navegación:** Ruteo determinístico con React Router 6.
* **Estilos:** Tailwind CSS con arquitectura de componentes atómicos.
* **Gestión de Estado:** Context API con persistencia controlada.

## 🧠 Optimizaciones de Ingeniería
### 🧹 Gestión de Memoria (Anti-Leak)
Se realizó una auditoría profunda de memoria utilizando Chrome DevTools, logrando un patrón de **"Diente de Sierra" (Sawtooth Pattern)** perfecto.
* **Limpieza de Referencias:** Implementación de `AbortController` en peticiones asincrónicas.
* **Control de Listeners:** Eliminación de fugas de memoria en cambios de ruta y componentes globales.
* **Performance:** Monitoreo constante del JS Heap para mantener el uso de RAM por debajo de los 15MB.

### 🧪 Testing Suite
* **Custom Renders:** Creación de un entorno de test con `MemoryRouter` y `AuthProvider` integrados.
* **Interacción Real:** Tests de componentes basados en comportamiento de usuario con Testing Library.

## 📈 Performance Profile
* **LCP:** < 1.2s
* **FID:** < 100ms
* **Memory Status:** Stable (No Detached Nodes)