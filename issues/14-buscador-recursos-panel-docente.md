# 14 - Buscador de recursos en el Panel Docente

## Problema
La tabla de Recursos del Panel Docente (`TeacherPanel.jsx`) no tiene forma de filtrar o buscar — para encontrar un recurso puntual, Carlos tiene que recorrer visualmente toda la tabla. Esto es distinto del buscador público (`Search.jsx`, vista `/buscar`), que ya existe pero es para autores y alumnos navegando el contenido publicado, no para gestionar contenido desde el panel.

## Objetivo
Agregar un campo de búsqueda dentro de la sección Recursos del Panel Docente que filtre la tabla en tiempo real por título, tipo, autor o tema.

## Fuera de alcance
- Cualquier cambio a la vista pública `/buscar` (`Search.jsx`) — son buscadores completamente separados.
- Búsqueda en otras pestañas del panel (Autores, Consignas, Entregas, Alumnos) — este issue es solo para Recursos.
- Búsqueda en backend/Firestore (queries con `where`) — alcanza con filtrar en memoria sobre los recursos ya cargados en el estado `recursos`, igual que hace `Search.jsx` con sus propios datos.

## Requisitos

### P0 (bloqueante)
- Agregar un input de búsqueda en la toolbar de la sección Recursos (`panel-section__toolbar`, junto al título "Recursos (N)" y el botón "+ Nuevo recurso").
- El filtrado debe aplicarse sobre: título del recurso, tipo, nombre(s) de autor (ya resueltos como string, igual que en la columna Autor) y temas.
- El filtrado debe ser case-insensitive y en tiempo real (sin necesidad de apretar Enter ni un botón de "Buscar").
- El contador "Recursos (N)" en el título de la sección debe reflejar la cantidad de resultados filtrados, no el total general, cuando hay un término de búsqueda activo.
- Si no hay resultados para el término ingresado, mostrar un mensaje simple tipo "Sin resultados" en lugar de una tabla vacía sin explicación.

### P1 (deseable)
- Si los issues #12 (ordenar columnas) y/o #13 (fecha) ya están implementados al momento de hacer este, el buscador debe combinarse correctamente con el ordenamiento activo (filtrar y después ordenar, o viceversa, sin que se rompan entre sí).

## Criterios de aceptación
- [ ] Hay un input de búsqueda visible en la sección Recursos del Panel Docente.
- [ ] Escribir un término filtra la tabla en tiempo real, sin recargar la página.
- [ ] El filtro encuentra coincidencias por título, tipo, autor y tema, sin importar mayúsculas/minúsculas.
- [ ] El contador de recursos refleja el total filtrado mientras hay búsqueda activa.
- [ ] Si no hay coincidencias, se muestra un mensaje claro de "sin resultados" en vez de una tabla vacía.
- [ ] Borrar el término de búsqueda vuelve a mostrar todos los recursos.
- [ ] Las acciones de cada fila (Editar, Borrar, Visualizar si ya existe) siguen funcionando igual sobre los resultados filtrados.

## Notas para la IA
- Archivo a tocar: `src/views/TeacherPanel.jsx`, dentro del bloque `tab === 'Recursos'`.
- Esto es un buscador nuevo y separado del que ya existe en `src/views/Search.jsx` — no reutilizar ni importar ese componente, son contextos distintos (uno es público sobre contenido publicado, este es interno sobre gestión).
- Reutilizar la misma lógica de resolución de nombre de autor que ya usa la tabla (`autorNombre` dentro del `.map`) para que el filtro busque sobre el mismo string que se muestra, no sobre IDs crudos.
- Sin TypeScript.
- Si los issues #12 u #13 ya fueron implementados antes que este, revisar que el filtrado no rompa el estado de ordenamiento ni la columna de fecha agregada por esos issues.
