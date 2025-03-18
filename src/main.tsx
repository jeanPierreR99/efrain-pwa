import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes, routesLogin } from './routes/Routes';

const App = () => {
  const isActive = true
  const router = createBrowserRouter(routes);
  const routerLogin = createBrowserRouter(routesLogin);

  return (
    <RouterProvider router={isActive ? router : routerLogin} />
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);