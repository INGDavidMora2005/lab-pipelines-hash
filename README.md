# DevHub · App 1 (Hash Location)

**DevHub** es un portafolio para desarrolladores construido con **Angular 22** (componentes standalone, pruebas con **Vitest**). Este repositorio es la **App 1** del _Laboratorio Pipelines_ de la asignatura Arquitectura de Software (UCEVA): una aplicación que usa **Hash Location Strategy** y se despliega automáticamente en **GitHub Pages** mediante un pipeline de CI/CD con GitHub Actions.

## Estrategia de enrutamiento: Hash Location

La app usa `withHashLocation()` en [`src/app/app.config.ts`](src/app/app.config.ts):

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation())]
};
```

Con esta estrategia las rutas viven después del símbolo `#`, por ejemplo:

```
https://ingdavidmora2005.github.io/lab-pipelines-hash/#/inicio
```

### ¿Por qué no necesita configuración especial en GitHub Pages?

Todo lo que va después del `#` (el _fragmento_) **no se envía al servidor**: el navegador solo pide `/lab-pipelines-hash/`, GitHub Pages siempre responde con el mismo `index.html`, y es Angular quien lee el fragmento (`#/inicio`) y muestra la vista correcta. Por eso:

- Recargar la página o abrir un enlace directo a una ruta nunca produce un 404.
- No hace falta copiar `index.html` a `404.html` ni configurar reescrituras en el servidor.

### Rutas definidas en esta rama

Según [`src/app/app.routes.ts`](src/app/app.routes.ts):

| Ruta      | Resultado                         |
| --------- | --------------------------------- |
| `''`      | Redirige a `inicio`               |
| `/inicio` | Componente `Inicio` (título "Inicio") |

El archivo deja reservadas, en comentarios, las rutas de `proyectos` y `contacto`, que se agregan desde las ramas de cada integrante.

## URL pública

https://ingdavidmora2005.github.io/lab-pipelines-hash/

## Cómo correrlo en local

Requisitos: Node.js (el pipeline usa la versión 24) y npm.

```bash
npm ci                    # instala dependencias exactas desde package-lock.json
npm start                 # servidor de desarrollo en http://localhost:4200/#/inicio
npm test -- --no-watch    # ejecuta las pruebas con Vitest una sola vez
npm run build             # build de producción en dist/lab-pipelines-hash/browser
```

## Pipeline de CI/CD

El workflow está en [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) ("Deploy Angular a GitHub Pages").

### Disparadores

- `push` a la rama `master` (es decir, cada vez que se fusiona un Pull Request).
- `workflow_dispatch`: ejecución manual desde la pestaña _Actions_.

Permisos: `contents: read`, `pages: write` e `id-token: write`. Usa `concurrency` con el grupo `pages` (sin cancelar despliegues en curso).

### Job `build` (ubuntu-latest)

1. **Checkout** del código (`actions/checkout@v4`).
2. **Configurar Node** 24 con caché de npm (`actions/setup-node@v4`).
3. **Configurar Pages** (`actions/configure-pages@v5`).
4. **Instalar dependencias** con `npm ci`.
5. **Ejecutar pruebas** con `npm test -- --no-watch`. Si alguna prueba falla, el pipeline se detiene y no se despliega.
6. **Build de Angular**:
   ```bash
   npx ng build --configuration production --base-href "/lab-pipelines-hash/"
   ```
   El `--base-href` es necesario porque GitHub Pages sirve el sitio en el subdirectorio `/lab-pipelines-hash/`, no en la raíz del dominio.
7. **Subir artefacto** `dist/lab-pipelines-hash/browser` (`actions/upload-pages-artifact@v3`).

### Job `deploy`

Depende de `build` (`needs: build`) y publica el artefacto en el entorno `github-pages` con `actions/deploy-pages@v4`. La URL resultante queda expuesta como salida del paso de despliegue.

### ¿Se copia `index.html` a `404.html`?

**No.** El workflow no tiene ningún paso que copie `index.html` a `404.html`, y no es necesario: con Hash Location el servidor solo recibe la ruta base del sitio, que siempre existe, así que GitHub Pages nunca necesita resolver rutas internas de Angular. Ese truco solo hace falta con Path Location Strategy (rutas sin `#`).

## Estructura del proyecto

```
src/
├── index.html
├── main.ts
├── styles.scss               # estilos globales
└── app/
    ├── app.ts / app.html / app.scss   # componente raíz (contiene <router-outlet />)
    ├── app.config.ts                  # provideRouter(routes, withHashLocation())
    ├── app.routes.ts                  # definición de rutas
    ├── app.spec.ts, app.config.spec.ts
    └── pages/
        ├── inicio/      # vista Inicio (ts, html, scss, spec)
        └── proyectos/   # vista Proyectos (ts, html, scss, spec)
```

Los componentes siguen la convención de Angular 22 sin sufijo (`inicio.ts` con la clase `Inicio`).

## Flujo de trabajo del equipo

- **Ramas `feature/*`**: cada integrante trabaja en su propia rama (por ejemplo `feature/david-inicio`, `feature/juandiego-proyectos`, `feature/juanpablo-diseno-nav-contacto`). Nadie hace commits directamente sobre `master`.
- **Pull Requests**: los cambios llegan a `master` solo mediante Pull Request, revisado y aprobado por **otro integrante** del equipo. Al fusionarse, el push a `master` dispara el pipeline de despliegue.
- **Conventional Commits**: los mensajes siguen el formato `tipo(alcance): descripción`, por ejemplo:
  - `feat(inicio): agregar vista de inicio`
  - `test(proyectos): agregar pruebas de la vista de proyectos`
  - `ci: agregar workflow de despliegue a github pages`
  - `docs: agregar readme de la app hash`

## Integrantes

- David Mora Duque
- Juan Pablo Devia
- Juan Diego Rodriguez

**Docente:** Jesus David Mejia Vergara · Arquitectura de Software · UCEVA
