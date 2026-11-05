import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Proyectos } from './pages/proyectos/proyectos';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio, title: 'Inicio' },
  { path: 'proyectos', component: Proyectos, title: 'Proyectos' },
  { path: 'contacto', component: Contacto, title: 'Contacto' },
  { path: '**', redirectTo: 'inicio' }
];