# sophIA — Contexto del proyecto para Claude Code

## Qué es

App web de repositorio de material filosófico para clases de nivel secundario. La usa un docente (Carlos) para gestionar contenido y sus alumnos para explorarlo y entregar tareas. **Prioridad: funcionalidad punta a punta antes que pulido visual.**

## Stack

- React + Vite, JavaScript plano (sin TypeScript)
- Firebase: Firestore + Authentication (email/password). **Sin Storage** — los PDFs son siempre links externos (Google Drive, etc.), nunca uploads
- Firebase Hosting: Site ID `sophia-filosofia`, URL `sophia-filosofia.web.app`
- Proyecto Firebase: `sophia-c09b6`
- `.env` tiene las credenciales reales — nunca subir a GitHub

## Modelo de datos (Firestore)

| Colección | Campos clave |
|---|---|
| `autores` | nombre, periodo, anioNacimiento, anioMuerte, bio, ordenCronologico |
| `recursos` | tipo (pdf/video/tiktok/texto), titulo, autorId, temas[], contenidoTexto, urlArchivo, urlEmbed, relacionados[] |
| `consignas` | titulo, descripcion, curso, recursoVinculadoId, fechaCreacion, fechaLimite |
| `entregas` | consignaId, alumnoId, alumnoNombre, fechaEntrega, contenido, urlArchivo |
| `usuarios` | uid (= Firebase Auth uid), nombre, rol (docente/alumno), curso |

## Roles y permisos

- **Docente:** CRUD completo de autores, recursos y consignas. Ve todas las entregas.
- **Alumno:** solo lectura de autores y recursos. Ve consignas de su curso y gestiona solo sus propias entregas.
- Las vistas de exploración (Timeline, Temas, Perfil de autor, Detalle de recurso, Buscador) son **públicas, sin login**.

## Estructura de carpetas

```
src/
  views/         # Timeline, AuthorProfile, TopicExplorer, ResourceDetail, Search, Login, TeacherPanel, StudentPanel
  components/    # Header, Footer, AuthorCard, ResourceCard, TopicTag, Modal, ProtectedRoute, EmbedViewer
  styles/        # tokens.css, global.css, components.css
  lib/           # firebase.js, seedData.js
  hooks/         # useAuth.jsx
design-system/   # tokens y componentes del sistema de diseño
issues/          # prompts y contexto inicial del proyecto
```

## Identidad visual

- **Fuentes:** Fraunces (serif) para nombres de autores y títulos; Source Sans 3 (sans) para cuerpo e interfaz
- **Marca:** sophIA — el sufijo "IA" siempre en color `--terra`
- Tokens en `src/styles/tokens.css` (basados en `design-system/tokens/`)
- Design system disponible en `design-system/` con componentes Button, Card, Input, Badge, Avatar

## Seed data

8 autores (Sócrates, Platón, Aristóteles, Descartes, Kant, Nietzsche, Sartre, Beauvoir) + 24 recursos en `src/lib/seedData.js`. Se cargan desde el botón "Cargar datos de ejemplo" en TeacherPanel.

## Convenciones

- Commits chicos y descriptivos por feature. Preguntar antes de hacer push si no es obvio.
- Al terminar de implementar un issue, siempre sugerir el mensaje de commit al final de la respuesta.
- Los campos `urlArchivo` y `urlEmbed` son siempre inputs de texto/URL, nunca selectores de archivo.
- No agregar Firebase Storage, no crear lógica de upload, no dejar placeholders para subir archivos.
