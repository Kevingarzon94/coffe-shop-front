# Coffee Shop Frontend

Esta es la aplicación frontend para la gestión y venta de una cafetería moderna. Desarrollada con React, TypeScript, Vite y Tailwind CSS.

## 🚀 Ejecución Local

Sigue estos pasos para correr el proyecto en tu máquina:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y añade la URL de tu backend:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:5173`.

---

## 🔐 Credenciales de Acceso (Admin)

Para probar las funcionalidades de administración, puedes usar los siguientes datos:

- **Usuario:** `test_user@example.com`
- **Contraseña:** `Password123!`

---

## 🏗️ Decisiones de Arquitectura

El proyecto utiliza una arquitectura basada en **Módulos por Características (Feature-based Architecture)** para asegurar escalabilidad y mantenibilidad:

- **Estructura Modular:** Cada funcionalidad principal (Admin, Catálogo, Carrito, Checkout) está contenida en `src/features/`. Esto facilita localizar errores y añadir nuevas funciones sin afectar al resto.
- **Gestión de Estado Híbrida:**
  - **TanStack Query (React Query):** Se utiliza para todo el estado del servidor. Maneja automáticamente el caché, estados de carga y reintentos, reduciendo la complejidad de las llamadas API.
  - **Zustand:** Se usa para estados globales ligeros del lado del cliente, como la persistencia del carrito de compras y los tokens de sesión.
- **Capa de Servicios y Hooks:** La lógica de negocio y las llamadas a la API están separadas de la interfaz de usuario mediante servicios personalizados y hooks, siguiendo el principio de responsabilidad única.
- **Diseño con Tailwind CSS:** Permite una UI altamente personalizada y responsiva con un bundle final optimizado.

---

## 📂 Organización de Archivos

- `src/features/`: Lógica y componentes específicos de cada funcionalidad.
- `src/shared/`: Componentes UI reutilizables, hooks globales, tipos y utilidades comunes.
- `src/routes/`: Configuración centralizada de rutas de la aplicación.
- `src/assets/`: Recursos estáticos como imágenes y estilos globales.
