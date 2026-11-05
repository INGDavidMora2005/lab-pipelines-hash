# DevHub · App 1 (Hash Location)

**DevHub** es un portafolio para desarrolladores construido con **Angular 22** (componentes standalone, pruebas unitarias con **Vitest**), con **tema oscuro y acento azul**. Este repositorio es la **App 1** del _Laboratorio Pipelines_ de la asignatura Arquitectura de Software (UCEVA): una aplicación que usa **Hash Location Strategy** y se despliega automáticamente en **GitHub Pages** mediante un pipeline de CI/CD con GitHub Actions.

La app tiene tres vistas (**Inicio**, **Proyectos** y **Contacto**) y dos componentes compartidos: una barra de navegación y un pie de página.

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
https://ingdavidmora2005.github.io/lab-pipelines-hash/#/proyectos
https://ingdavidmora2005.github.io/lab-pipelines-hash/#/contacto
```

### ¿Por qué no necesita configuración especial en GitHub Pages?

Todo lo que va después del `#` (el _fragmento_) **no se envía al servidor**: el navegador solo pide `/lab-pipelines-hash/`, GitHub Pages siempre responde con el mismo `index.html`, y es Angular quien lee el fragmento (`#/contacto`) y muestra la vista correcta. Por eso:

- Recargar la página o abrir un enlace directo a cualquier ruta nunca produce un 404 del servidor.
- No hace falta copiar `index.html` a `404.html` ni configurar reescrituras en el servidor.

### Rutas

Definidas en [`src/app/app.routes.ts`](src/app/app.routes.ts):

| Ruta        | URL de ejemplo      | Resultado                                   |
| ----------- | ------------------- | ------------------------------------------- |
| `''`        | `/#/`               | Redirige a `inicio`                         |
| `inicio`    | `/#/inicio`         | Componente `Inicio` (título "Inicio")       |
| `proyectos` | `/#/proyectos`      | Componente `Proyectos` (título "Proyectos") |
| `contacto`  | `/#/contacto`       | Componente `Contacto` (título "Contacto")   |
| `**`        | `/#/cualquier-cosa` | Comodín: redirige a `inicio`                |

La navegación entre vistas se hace con `routerLink` y `routerLinkActive` desde el componente `Navbar`.

## URL pública

https://ingdavidmora2005.github.io/lab-pipelines-hash/

## Cómo correrlo en local

Requisitos: Node.js (el pipeline usa la versión 24) y npm.

```bash
npm ci                    # instala dependencias exactas desde package-lock.json
npm start                 # servidor de desarrollo en http://localhost:4200/#/inicio
npm test -- --no-watch    # ejecuta las pruebas unitarias con Vitest una sola vez
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
5. **Ejecutar pruebas** con `npm test -- --no-watch`. Si alguna prueba falla, el job se detiene y no se despliega nada.
6. **Build de Angular**:
   ```bash
   npx ng build --configuration production --base-href "/lab-pipelines-hash/"
   ```
   El `--base-href` es necesario porque GitHub Pages sirve el sitio en el subdirectorio `/lab-pipelines-hash/`, no en la raíz del dominio; sin él, los archivos JS y CSS se buscarían en la ruta equivocada.
7. **Subir artefacto** `dist/lab-pipelines-hash/browser` (`actions/upload-pages-artifact@v3`).

### Job `deploy`

Depende de `build` (`needs: build`) y publica el artefacto en el entorno `github-pages` con `actions/deploy-pages@v4`. La URL resultante queda expuesta como salida del paso de despliegue.

### ¿Se copia `index.html` a `404.html`?

**No.** El workflow no tiene ningún paso que copie `index.html` a `404.html`, y no es necesario: con Hash Location el servidor solo recibe la ruta base del sitio, que siempre existe, así que GitHub Pages nunca tiene que resolver rutas internas de Angular. Ese truco solo hace falta con Path Location Strategy (rutas sin `#`), donde recargar `/contacto` haría que el servidor buscara un archivo que no existe.

## Estructura del proyecto

```
docs/
└── diseno.md                 # guía de diseño común (paleta, tipografías, textos)
src/
├── index.html                # carga las fuentes de Google Fonts
├── main.ts
├── styles.scss               # estilos globales: variables del tema y clases comunes
└── app/
    ├── app.ts / app.html / app.scss   # componente raíz: navbar, <main> con router-outlet y footer
    ├── app.config.ts                  # provideRouter(routes, withHashLocation())
    ├── app.routes.ts                  # definición de rutas
    ├── app.spec.ts, app.config.spec.ts
    ├── components/
    │   ├── navbar/       # barra de navegación (marca DevHub + enlaces Inicio, Proyectos, Contacto)
    │   └── footer/       # pie de página
    └── pages/
        ├── inicio/       # vista Inicio
        ├── proyectos/    # vista Proyectos (tarjetas de proyectos)
        └── contacto/     # vista Contacto (formulario nombre, correo y mensaje)
```

Cada componente tiene sus archivos `.ts`, `.html`, `.scss` y `.spec.ts`, y sigue la convención de Angular 22 sin sufijo (`navbar.ts` con la clase `Navbar`).

## Diseño

La guía completa está en [`docs/diseno.md`](docs/diseno.md). Los colores se definen como variables en `:root` dentro de [`src/styles.scss`](src/styles.scss), y las vistas los usan a través de esas variables en lugar de colores escritos a mano.

### Paleta (tema oscuro)

| Variable     | Valor     | Uso                                  |
| ------------ | --------- | ------------------------------------ |
| `--bg`       | `#0d1117` | Fondo de la página                   |
| `--surface`  | `#161b22` | Fondo de tarjetas y superficies      |
| `--border`   | `#30363d` | Bordes                               |
| `--text`     | `#e6edf3` | Texto principal y títulos            |
| `--muted`    | `#8b949e` | Texto secundario                     |
| `--accent`   | `#58a6ff` | Enlaces, botones, acento principal   |
| `--accent-2` | `#3fb950` | Acento secundario (etiquetas, éxito) |
| `--radius`   | `12px`    | Radio de bordes                      |

### Tipografías

- **Inter** (`--font-sans`): pesos 400, 600 y 700. Texto general y títulos.
- **JetBrains Mono** (`--font-mono`): pesos 400 y 600. Código y etiquetas.

Ambas se cargan desde Google Fonts en `src/index.html`.

## Flujo de trabajo del equipo

- **Ramas**: nadie hace commits directamente sobre `master`. Cada cambio se trabaja en su propia rama con prefijo según el tipo de trabajo y el integrante, por ejemplo `feature/david-inicio`, `feature/juandiego-proyectos`, `feature/juanpablo-diseno-nav-contacto`, `fix/juanpablo-contraste-proyectos` o `chore/david-index-titulo`.
- **Pull Requests**: los cambios llegan a `master` solo mediante Pull Request, revisado y aprobado por **otro integrante** del equipo. Al fusionarse, el push a `master` dispara el pipeline de despliegue.
- **Conventional Commits**: los mensajes siguen el formato `tipo(alcance): descripción`, por ejemplo:
  - `feat(contacto): agregar vista de contacto con formulario`
  - `fix(vistas): corregir contraste de colores en tema oscuro`
  - `test(contacto): agregar pruebas de la vista de contacto`
  - `ci: agregar workflow de despliegue a github pages`
  - `docs: actualizar readme de la app hash`
- **Pruebas unitarias obligatorias**: cada componente nuevo llega con su `.spec.ts` (Vitest), y `npm test -- --no-watch` y `npm run build` deben pasar antes de abrir el Pull Request. El pipeline vuelve a ejecutar las pruebas y no despliega si alguna falla.

## Integrantes

- David Mora Duque
- Juan Pablo Devia
- Juan Diego Rodriguez

**Docente:** Jesus David Mejia Vergara · Arquitectura de Software · UCEVA
