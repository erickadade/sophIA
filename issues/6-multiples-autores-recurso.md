# 6 - Soporte para múltiples autores por recurso

## Problema

Cada recurso en sophIA solo puede asociarse a un autor (`autorId`, string). Muchos recursos cruzan a más de un filósofo — por ejemplo un fragmento comparando a Sócrates y Platón, o un video sobre el diálogo entre Sartre y Beauvoir. Hoy Carlos debe elegir un autor "principal" arbitrariamente al crear el recurso, lo que hace que ese recurso no aparezca en el perfil del segundo autor ni en sus búsquedas asociadas.

## Objetivo

Permitir asociar dos o más autores a un mismo recurso, y que ese recurso aparezca correctamente reflejado en el perfil de cada autor asociado y en las vistas existentes (card, detalle).

## Fuera de alcance

- No se distinguen roles entre autores (ej: "principal" vs "secundario") — todos los autores en `autorIds[]` pesan igual.
- No se toca `urlArchivo`/`urlEmbed` ni Firebase Storage.
- No se incluye el buscador ni el badge de tipo en "Recursos relacionados" — eso es un issue separado, sin dependencia técnica con este.
- No se define el comportamiento de `Timeline.jsx` con múltiples autores si la pregunta abierta correspondiente (ver Notas para la IA) no se resuelve a tiempo — queda como fallback temporal, no bloquea el cierre de este issue.

## Requisitos

### P0 (bloqueante)

- Antes de tocar código, correr y reportar:
  ```bash
  grep -rn "autorId" src/ --include="*.jsx" --include="*.js" -l
  grep -rn "autorId" src/ --include="*.jsx" --include="*.js"
  ```
  Revisar explícitamente: `Timeline.jsx`, `AuthorProfile.jsx`, `ResourceCard.jsx`, `ResourceDetail.jsx`, `TeacherPanel.jsx`, `seedData.js`, `Search.jsx`, `TopicExplorer.jsx`. Si aparecen usos en archivos no listados (ej. `StudentPanel.jsx`), reportarlo como bloqueante antes de continuar — no migrar esos casos sin confirmación.
- Migrar el campo `autorId` (string) a `autorIds` (array de strings) en la colección `recursos`. No mantener compatibilidad con el campo viejo — migración directa en todo el código y en `seedData.js`.
- Reemplazar el `<select>` simple de autor en el formulario "Nuevo recurso" (TeacherPanel) por un multi-select con tags/chips removibles, usando los estilos ya definidos en `components.css`/`tokens.css` — sin librerías de terceros.
- El selector no debe ofrecer como opción a un autor ya agregado, y debe exigir mínimo 1 autor para guardar (igual que el comportamiento actual).
- `ResourceCard.jsx` y `ResourceDetail.jsx` deben mostrar todos los autores del recurso (chips/badges), no solo el primero.
- `AuthorProfile.jsx` debe incluir un recurso en la lista de un autor si ese autor está en cualquier posición de `autorIds[]`, no solo en la primera.

### P1 (deseable)

- Definir y aplicar el criterio de cómo se muestra un recurso con múltiples autores en `Timeline.jsx` (ej: replicado en la posición de cada autor asociado). Si no queda claro el criterio antes de llegar a este punto, dejar el comportamiento actual (asociado solo al primer autor del array) como fallback temporal, marcado con un comentario `// TODO` en el código.

## Criterios de aceptación

- [ ] Un recurso nuevo se puede guardar con 2 o más autores seleccionados.
- [ ] El documento guardado en Firestore tiene `autorIds: ["id1", "id2"]` y no tiene el campo `autorId`.
- [ ] Un recurso existente de `seedData.js`, ya migrado, se edita correctamente y conserva sus autores.
- [ ] El selector del formulario no permite agregar dos veces al mismo autor.
- [ ] No se puede guardar un recurso sin ningún autor seleccionado.
- [ ] `AuthorProfile.jsx` muestra el recurso tanto si el autor está primero como si está en cualquier otra posición de `autorIds[]`.
- [ ] `ResourceCard.jsx` muestra un chip por cada autor; en pantallas chicas los chips wrappean a la siguiente línea, no se truncan ni se ocultan.
- [ ] `ResourceDetail.jsx` muestra todos los autores, cada uno con link a su `AuthorProfile`.
- [ ] `grep -rn "autorId" src/` no devuelve más resultados que los explícitamente aceptados en el mapeo de impacto.

## Notas para la IA

- Archivos a tocar: `TeacherPanel.jsx`, `ResourceCard.jsx`, `ResourceDetail.jsx`, `AuthorProfile.jsx`, `Timeline.jsx` (solo si se resuelve la pregunta abierta de abajo), `seedData.js`, y cualquier archivo que el grep del mapeo de impacto revele.
- No usar TypeScript ni introducir componentes de terceros para el multi-select — construirlo con los estilos ya existentes en `components.css`/`tokens.css`.
- No tocar `urlArchivo`, `urlEmbed`, ni agregar Firebase Storage.
- **Pregunta abierta (no resolver por cuenta propia):** ¿cómo debe comportarse `Timeline.jsx` cuando un recurso tiene más de un autor? ¿Se replica en la posición de cada autor, o se usa otro criterio? Si surge durante la implementación, preguntarle a Dany antes de decidir — no bloquea el resto del issue, solo el ítem P1 de Timeline.
- Commits separados por paso, en este orden: (1) mapeo de impacto, sin commit de código; (2) migración de datos; (3) formulario; (4) visualización en card/detalle/perfil de autor; (5) Timeline, solo si se resuelve la pregunta abierta a tiempo.
- Dependencia de orden de revisión (no técnica) con el issue de "buscador + tipo en Recursos relacionados": Dany prefiere mergear y probar este cambio de modelo de datos antes de sumar más superficie de cambio al mismo módulo, aunque ambos issues no comparten código.
