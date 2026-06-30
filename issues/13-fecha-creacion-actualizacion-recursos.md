# 13 - Fecha de creación/actualización en Recursos

## Problema
Los recursos no registran cuándo fueron creados ni cuándo fue su última actualización. La colección `consignas` ya tiene este patrón (`fechaCreacion` con `serverTimestamp()`), pero `recursos` no lo tiene, y la tabla de Recursos en el Panel Docente (`TeacherPanel.jsx`) no muestra esta información en ninguna columna.

## Objetivo
Que cada recurso registre su fecha de creación y su fecha de última actualización, y que la tabla de Recursos del Panel Docente muestre esta información.

## Fuera de alcance
- Backfill de fechas para recursos ya existentes en producción que no tengan estos campos (van a quedar sin fecha o con fecha de la primera edición posterior a este cambio — definir el comportamiento de visualización para esos casos en "Notas para la IA", no migrar datos históricos).
- Mostrar un historial de cambios o versiones del recurso — solo la última fecha de actualización, no un log.
- Aplicar este mismo patrón a otras colecciones (`autores`, `usuarios`) — este issue es solo para `recursos`.

## Requisitos

### P0 (bloqueante)
- Antes de tocar código, correr y reportar:
  ```bash
  grep -rn "recursos'" src/ --include="*.jsx" --include="*.js"
  ```
  Confirmar que los únicos puntos de creación/actualización de un recurso son los que ya se identificaron en `TeacherPanel.jsx` (`addDoc`/`updateDoc` dentro del `handleSubmit` del modal de recurso). Si aparece algún otro punto de escritura sobre `recursos` no anticipado, reportarlo antes de continuar.
- Al crear un recurso (`addDoc` en `recursos`), agregar el campo `fechaCreacion: serverTimestamp()`.
- Al crear o actualizar un recurso, agregar/actualizar el campo `fechaActualizacion: serverTimestamp()` (en creación, `fechaCreacion` y `fechaActualizacion` quedan iguales; en cada edición posterior, solo se actualiza `fechaActualizacion`).
- Agregar una columna a la tabla de Recursos en el Panel Docente que muestre la fecha de última actualización (`fechaActualizacion`), formateada de forma legible (ej. `dd/mm/aaaa`).
- Para recursos existentes que no tengan estos campos (creados antes de este cambio), la columna debe mostrar algo como "—" o "Sin datos", sin romper el renderizado de la tabla.

### P1 (deseable)
- Mostrar la fecha de creación también, por ejemplo como tooltip al pasar el mouse sobre la fecha de actualización, para no agregar una columna extra si el espacio en la tabla ya está ajustado.

## Criterios de aceptación
- [ ] Al crear un recurso nuevo desde el Panel Docente, queda guardado con `fechaCreacion` y `fechaActualizacion`.
- [ ] Al editar un recurso existente, `fechaActualizacion` se actualiza y `fechaCreacion` no cambia.
- [ ] La tabla de Recursos muestra una columna con la fecha de última actualización, legible (no timestamp crudo de Firestore).
- [ ] Recursos antiguos sin estos campos se muestran sin errores en la tabla (con un placeholder tipo "—").
- [ ] La carga de datos de ejemplo (`seedData.js` / botón "Cargar datos de ejemplo") sigue funcionando sin romperse por el campo nuevo.

## Notas para la IA
- Archivo principal a tocar: `src/views/TeacherPanel.jsx` — el `handleSubmit` del formulario de recurso (alrededor de la lógica `if (item?.id) { updateDoc(...) } else { addDoc(...) }`) y la tabla de Recursos (`tab === 'Recursos'`).
- Seguir el mismo patrón ya usado en `consignas` con `serverTimestamp()` (importado desde `firebase/firestore`, ya está importado en este archivo).
- No modificar `src/lib/seedData.js` para agregar fechas manuales a los datos de ejemplo — si seedData no setea estos campos, deben tratarse igual que un recurso "antiguo" (placeholder en la tabla), salvo que sea trivial agregar `serverTimestamp()` también ahí sin romper el resto del seed.
- No usar Firebase Storage ni cambiar `urlArchivo`/`urlEmbed` — este issue no toca esos campos.
- Sin TypeScript.
- Si se está implementando junto con el issue #12 (ordenamiento por columna), considerar que la nueva columna de fecha también pueda ser ordenable con el mismo mecanismo — pero esto no es bloqueante para cerrar este issue si #12 todavía no está implementado.
