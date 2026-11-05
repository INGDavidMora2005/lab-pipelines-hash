# Diseño común - DevHub

Guía de diseño compartida por las apps de DevHub (portafolio para desarrolladores). Todas las vistas usan los estilos globales de `src/styles.scss`.

## Paleta (tema oscuro)

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

## Tipografías

- **Inter** (`--font-sans`): pesos 400, 600 y 700. Texto general y títulos.
- **JetBrains Mono** (`--font-mono`): pesos 400 y 600. Código y etiquetas.

Se cargan desde Google Fonts en `src/index.html`.

## Clases globales

- `.container`: ancho máximo de 1040px, centrado.
- `.page`: padding vertical de 48px.
- `.card`: tarjeta con fondo `--surface`, borde y radio.
- `.grid`: rejilla `repeat(auto-fit, minmax(260px, 1fr))`.
- `.btn` / `.btn-outline`: botón relleno y botón con contorno.
- `.tag`: etiqueta en fuente monoespaciada.

## Textos de las vistas

### Inicio

- **Título:** Hola, somos DevHub
- **Subtítulo:** Un hub para mostrar proyectos de desarrollo, desplegados automáticamente con CI/CD.
- **Tarjetas:**
  1. Código limpio
  2. Despliegue continuo
  3. Trabajo en equipo
- **Botón:** Ver proyectos

### Proyectos

Tres tarjetas:

1. lab-pipelines-hash
2. lab-pipelines-path
3. Pipeline CI/CD

### Contacto

- **Formulario:** campos nombre, correo y mensaje.
- **Al enviar:** se muestra el mensaje "Mensaje enviado".
