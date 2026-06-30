# 11 - Opción "Visualizar" en cada recurso del Panel Docente

## Problema
En la tabla de Recursos del Panel Docente (`TeacherPanel.jsx`), cada fila solo tiene las acciones "Editar" y "Borrar". Para ver cómo se ve un recurso publicado (su detalle real, como lo vería un alumno o visitante), Carlos tiene que salir del panel y buscarlo manualmente en la vista pública.

## Objetivo
Agregar una acción "Visualizar" en cada fila de la tabla de Recursos que lleve directamente al detalle público de ese recurso (`ResourceDetail`).

## Fuera de alcance
- Cambios en el componente `ResourceDetail` o en `EmbedViewer`.
- Vista previa embebida dentro del propio panel (modal con el contenido renderizado ahí mismo) — esto es ir directamente a la vista de detalle existente, no crear una nueva.
- Agregar "Visualizar" a otras tablas del panel (Autores, Consignas, etc.) — este issue es solo para Recursos.

## Requisitos

### P0 (bloqueante)
- Agregar un botón "Visualizar" en la columna de acciones (`table-actions`) de cada fila de la tabla de Recursos, antes o junto a "Editar" y "Borrar".
- Al hacer click, debe llevar a la ruta de detalle público del recurso correspondiente (la misma ruta que se usa al hacer click en un `ResourceCard` desde Timeline/Temas/Buscador).
- Debe abrir en una nueva pestaña (para no perder el estado del panel docente al volver).

## Criterios de aceptación
- [ ] Cada fila de la tabla de Recursos en el Panel Docente muestra un botón "Visualizar".
- [ ] Al hacer click, se abre en una nueva pestaña el detalle público del recurso correcto (mismo recurso de esa fila).
- [ ] El panel docente no pierde su estado (pestaña activa, filtros si los hay) al usar "Visualizar".
- [ ] Los botones "Editar" y "Borrar" siguen funcionando igual que antes.

## Notas para la IA
- Archivo a tocar: `src/views/TeacherPanel.jsx`, dentro del bloque `tab === 'Recursos'`, en la fila de la tabla (`<td className="table-actions">`).
- La ruta de detalle público de un recurso es `/recurso/:id` (definida en `App.jsx`, usada en `ResourceCard.jsx`). Reutilizar ese mismo patrón, no inventar una ruta nueva.
- Usar un link (`<a target="_blank">` o el helper de navegación que use el proyecto) en vez de manipular `window.open` con lógica custom, salvo que el proyecto no tenga otra forma simple de abrir en nueva pestaña.
- Sin TypeScript.
