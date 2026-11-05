import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Contacto } from './pages/contacto/contacto';
import { Proyectos } from './pages/proyectos/proyectos';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio, title: 'Inicio' },
  { path: 'contacto', component: Contacto, title: 'Contacto' },
  { path: 'proyectos', component: Proyectos, title: 'Proyectos' }
];