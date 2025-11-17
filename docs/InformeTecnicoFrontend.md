# Informe Técnico del Frontend (efrain-pwa)

## Resumen

Aplicación PWA construida con React y Vite para la administración y visualización de datos ambientales. Incluye un panel de administración con módulos de usuarios, monitoreo, comparación, exportación y ajustes. Se integra con un backend Nest que expone rutas de usuarios y sensores.

## Stack y Dependencias Clave

- React 19 y Vite 6 (`package.json`)
- React Router v7 para navegación (`src/routes/Routes.tsx:1`)
- Zustand para estado global (`src/store/UseDataStore.tsx:1`, `src/store/UseMarkerStore.tsx:1`)
- TailwindCSS v4 para estilos (`package.json`)
- Radix UI y componentes compartidos estilo shadcn (`src/shared/ui/*`)
- Recharts para gráficos (`src/features/admin/*/components/Chart*.tsx`)
- Leaflet para mapas (`package.json`)
- date-fns para manejo de fechas (`src/services/compareService.ts:5`)
- sonner para notificaciones (`src/features/admin/users/Users.tsx:9`)

## Estructura del Proyecto

- `src/features/admin/*`: funcionalidades del panel (dashboard, users, monitoring, compare, export, settings)
- `src/features/auth/Login`: autenticación
- `src/shared/Layout/*`: layout general y admin
- `src/shared/ui/*`: componentes UI reutilizables
- `src/services/*`: clientes y servicios de API (`api.ts`, `userService.ts`, `compareService.ts`)
- `src/store/*`: stores globales de Zustand (`UseDataStore`, `UseMarkerStore`)
- `src/routes/Routes.tsx`: definición de rutas y guard de admin

## Arquitectura de Rutas y Layouts

- Rutas públicas montadas en `AppLayout` (`src/routes/Routes.tsx:5`)
- Rutas admin montadas en `AdminLayout`, protegidas por `RequireAdmin` (`src/routes/Routes.tsx:16`)
- Control de acceso mediante `localStorage` (`isAuthenticated` y `userRole`)
- Páginas admin: `dashboard`, `map`, `new-point`, `monitoring`, `compare`, `export`, `users`, `settings` (`src/routes/Routes.tsx:36-73`)

## Estado Global (Zustand)

- `UseDataStore` maneja arreglo `data` con estructura `Data` y utilidades `addData`, `setData`, `getLastData`, `getLastTenData` (`src/store/UseDataStore.tsx:1-41`)
- `UseMarkerStore` maneja lista de puntos de monitoreo (`markers`) (`src/store/UseMarkerStore.tsx:1-41`)
- Los gráficos y vistas consumen `data` desde el store (por ejemplo, `TabsView` en export `src/features/admin/export/components/TabsView.tsx:10`)

## Servicios de API

- `api.ts`: cliente HTTP con `get`, `post`, `put`, `delete` y manejo de errores JSON (`src/services/api.ts:36`, `src/services/api.ts:82`, `src/services/api.ts:51`, `src/services/api.ts:67`)
- `userService.ts`: CRUD de usuarios y login
  - `list()` GET `/users` (`src/services/userService.ts:18-27`)
  - `create()` POST `/users` (`src/services/userService.ts:29-46`)
  - `update(id)` PUT `/users/:id` (`src/services/userService.ts:48-57`)
  - `remove(id)` DELETE `/users/:id` (`src/services/userService.ts:60-62`)
  - `login(email,password)` POST `/users/login` (`src/services/userService.ts:65-67`)
- `compareService.ts`: datos de sensores
  - `getCompareData({dateFirst,dateSecond})` (`src/services/compareService.ts:66-87`)
  - `getDataBySpecificDate({dateFirst,dateSecond})` (`src/services/compareService.ts:118-139`)
  - `getDataByDateRange(startDate,endDate)` (`src/services/compareService.ts:92-113`)
  - Utiliza `formatDateForApi` y `transformSensorData` para adaptar datos a la UI (`src/services/compareService.ts:57-60`, `src/services/compareService.ts:38-52`)

## Funcionalidades Principales

- Usuarios (CRUD)
  - Lista, creación, edición y eliminación integradas al backend Nest
  - Pantalla: `src/features/admin/users/Users.tsx`
    - Carga inicial `userService.list()` y mapeo de campos (`fullName`→`name`, `isActive`→`status`) (`src/features/admin/users/Users.tsx:21-29`)
    - Crear/Editar usando `userService.create/update` con validaciones y notificaciones (`src/features/admin/users/Users.tsx:61-103`)
    - Eliminar con confirmación y `userService.remove` (`src/features/admin/users/Users.tsx:49-58`)
  - Formulario: `src/features/admin/users/components/UserForm.tsx` con `react-hook-form` y `zod`
    - Campo `password` requerido solo al crear (`src/features/admin/users/components/UserForm.tsx:20-33`, `src/features/admin/users/components/UserForm.tsx:44-56`)
    - Rol restringido a “Administrador” (backend valida `UserRole.ADMIN`) (`src/features/admin/users/components/UserForm.tsx:64`)
  - Lista: `src/features/admin/users/components/UsersList.tsx` (acciones editar/eliminar)

- Login
  - Autenticación contra `/users/login` y guardado en `localStorage` (`src/features/auth/Login/Login.tsx:21-31`)
  - Redirección por rol (`admin` → `/admin`, otros → `/map`) (`src/features/auth/Login/Login.tsx:27-31`)

- Exportación
  - Selección de punto y rango de fechas, consumo de `compareService.getDataBySpecificDate` y almacenamiento en `UseDataStore.setData` (`src/features/admin/export/Export.tsx:28`)
  - Visualización mediante pestañas y `ChartExport` (`src/features/admin/export/components/TabsView.tsx:10`, `src/features/admin/export/components/ViewCharts.tsx:24`)

- Comparación
  - Dos fechas específicas, carga de datos y múltiples gráficos comparativos (`src/features/admin/compare/Compare.tsx:51-63`, `src/features/admin/compare/Compare.tsx:111-162`)

- Monitoreo y Dashboard
  - Tarjetas de resumen y gráficos en tiempo de ejecución a partir de `data` (`src/features/admin/dashboard/Dashboard.tsx`, `src/features/admin/monitoring/*`)
  - Mapa y puntos de monitoreo con Leaflet (`src/features/admin/home/components/ViewMonitoringMap.tsx`)

- Settings
  - UI para configuración general y API (placeholders) (`src/features/admin/settings/Settings.tsx:33-56`, `src/features/admin/settings/Settings.tsx:79-108`)

## Autenticación y Control de Acceso

- `RequireAdmin` verifica `localStorage.isAuthenticated === 'true'` y `localStorage.userRole === 'admin'` (`src/routes/Routes.tsx:16`)
- El login mapea el rol backend `administrador` → `admin` para el guard (`src/features/auth/Login/Login.tsx:23-27`)

## Configuración y Variables de Entorno

- `VITE_API_BASE_URL` para apuntar al backend Nest (`src/services/api.ts:2`)
- Scripts: `npm run dev`, `npm run build`, `npm run preview` (`package.json`)

## Estándares de UI y Formularios

- Componentes compartidos en `src/shared/ui/*` (inputs, forms, cards, tabs)
- Formularios con `react-hook-form` + `zod` y helpers (`src/shared/ui/form.tsx:1-165`)
- Feedback de carga y errores con `Loader2` y `sonner`

## Flujos de Datos Clave

- CRUD Usuarios
  1. Vista carga `list()` y mapea a UI
  2. En crear, valida y envía a `POST /users`, actualiza la lista en memoria
  3. En editar, envía `PUT /users/:id`; `password` opcional
  4. En eliminar, invoca `DELETE /users/:id` y actualiza state

- Exportación y Compare
  1. Convierte fechas de `dd/MM/yy` a `yyyy-MM-dd` en servicio
  2. Invoca endpoints (`/sensor/specificdates` o `/sensor/range`)
  3. Transforma respuesta a `Data[]` y actualiza `UseDataStore`
  4. Gráficos consumen `data` desde el store

## Ejecución y Build

- Desarrollo: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Preview: `npm run preview`

## Consideraciones y Mejoras Futuras

- Roles adicionales: ampliar UI y DTO para admitir `USER`, `TECH`, etc.
- Seguridad: reemplazar `localStorage` por JWT y guards basados en token
- Manejo de errores: unificar notificaciones y estados de carga en servicios
- Tests: añadir unit tests para servicios y stores
- Puntos de monitoreo: conectar `UseMarkerStore` al backend

