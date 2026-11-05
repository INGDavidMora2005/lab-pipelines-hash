import { Routes } from '@angular/router';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
  {
    path: 'proyectos',
    loadComponent: () => import('./pages/proyectos/proyectos').then((m) => m.Proyectos),
    title: 'Proyectos',
  },
  { path: 'contacto', component: Contacto },
  // Rutas de las vistas: agregar cada ruta aquí, ANTES del comodín.
  // Comodín (**): siempre debe ir al final.
];
