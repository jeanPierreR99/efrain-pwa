import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SocketProvider } from './shared/providers/SocketProvider'; // 👈 NUEVO IMPORT
import { routes, routesLogin } from './routes/Routes';
import './index.css';

// Determinar qué rutas usar según autenticación
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
const router = createBrowserRouter(isAuthenticated ? routes : routesLogin);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </StrictMode>
);
