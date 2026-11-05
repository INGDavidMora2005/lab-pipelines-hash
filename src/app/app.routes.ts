import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Proyectos } from './pages/proyectos/proyectos';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio, title: 'Inicio' },
  { path: 'proyectos', component: Proyectos, title: 'Proyectos' }
  // Juan Pablo agrega: contacto
];