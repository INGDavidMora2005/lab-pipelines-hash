import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio, title: 'Inicio' },
  // Juan Diego agrega: proyectos
  // Juan Pablo agrega: contacto
  { path: '**', redirectTo: 'inicio' }
];