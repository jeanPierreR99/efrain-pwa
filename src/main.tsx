import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes, routesLogin } from './routes/Routes';

const App = () => {
  // Verificar autenticación desde localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');
  const isAdmin = isAuthenticated && userRole === 'admin';
  const isUser = isAuthenticated && userRole === 'user';
  
  // Crear routers según el tipo de usuario
  const adminRouter = createBrowserRouter(routes);
  const userRouter = createBrowserRouter(routesLogin);

  // Determinar qué router usar basado en el rol del usuario
  let router;
  if (isAdmin) {
    router = adminRouter; // Administrador: acceso completo
  } else if (isUser) {
    router = userRouter; // Usuario normal: acceso limitado a /map
  } else {
    router = userRouter; // No autenticado: redirigir a login
  }

  return (
    <RouterProvider router={router} />
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);