import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Proyecto {
  readonly nombre: string;
  readonly descripcion: string;
  readonly etiquetas: readonly string[];
  readonly enlace?: string;
}

@Component({
  selector: 'app-proyectos',
  imports: [RouterLink],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.scss',
})
export class Proyectos {
  readonly proyectos: readonly Proyecto[] = [
    {
      nombre: 'Nexus API',
      descripcion:
        'API REST para gestionar perfiles de desarrolladores, con autenticación por tokens y documentación interactiva.',
      etiquetas: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
      enlace: 'https://github.com/INGDavidMora2005',
    },
    {
      nombre: 'PulseBoard',
      descripcion:
        'Dashboard en tiempo real para visualizar métricas de repositorios: commits, issues abiertas y despliegues.',
      etiquetas: ['Angular', 'TypeScript', 'RxJS', 'SCSS'],
      enlace: 'https://github.com/INGDavidMora2005',
    },
    {
      nombre: 'DevBot',
      descripcion:
        'Bot de Discord que recuerda revisiones pendientes, resume pull requests y celebra los merges del equipo.',
      etiquetas: ['Python', 'discord.py', 'Redis'],
      enlace: 'https://github.com/INGDavidMora2005',
    },
    {
      nombre: 'CommitQuest',
      descripcion:
        'App móvil que convierte los commits diarios en una aventura: rachas, logros y retos para mantener el ritmo.',
      etiquetas: ['Flutter', 'Dart', 'Firebase'],
    },
    {
      nombre: 'UI Foundry',
      descripcion:
        'Librería de componentes accesibles y reutilizables, documentada con ejemplos vivos y lista para instalar por npm.',
      etiquetas: ['Angular', 'Storybook', 'npm'],
      enlace: 'https://github.com/INGDavidMora2005',
    },
    {
      nombre: 'Forge CLI',
      descripcion:
        'Herramienta de línea de comandos que genera la estructura base de un proyecto con buenas prácticas incluidas.',
      etiquetas: ['TypeScript', 'Node.js', 'CLI'],
    },
  ];
}
