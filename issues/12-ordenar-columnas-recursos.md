# 12 - Ordenar por columna en la tabla de Recursos del Panel Docente

## Problema
La tabla de Recursos del Panel Docente (`TeacherPanel.jsx`) muestra las columnas Título, Tipo, Autor y Temas sin ninguna opción de ordenamiento. Con la cantidad de recursos creciendo, encontrar o agrupar visualmente por estos criterios requiere scrollear toda la tabla.

## Objetivo
Permitir ordenar la tabla de Recursos haciendo click en el encabezado de cada columna (Título, Tipo, Autor), alternando entre ascendente y descendente.

## Fuera de alcance
- Ordenar por la columna "Temas" (es un array, no un valor simple — si se quiere en el futuro, sería un issue aparte para definir el criterio).
- Ordenamiento múltiple (por dos columnas a la vez).
- Persistir el orden elegido entre sesiones o recargas de página.
- Cambios en las tablas de otras pestañas (Autores, Consignas, Entregas, Alumnos).

## Requisitos

### P0 (bloqueante)
- Agregar manejo de estado de ordenamiento (columna activa + dirección asc/desc) en la sección de Recursos de `TeacherPanel.jsx`.
- Hacer clickeables los `<th>` de Título, Tipo y Autor. Al hacer click:
  - Si la columna no es la activa, ordenar ascendente por esa columna.
  - Si ya es la columna activa, alternar entre ascendente y descendente.
- Aplicar el ordenamiento sobre el array `recursos` antes de mapearlo a filas (usando una copia ordenada, sin mutar el estado original).
- Mostrar un indicador visual simple en el encabezado de la columna activa (ej. flecha ▲/▼) para que se note el estado actual.

### P1 (deseable)
- Si se agrega la columna de fecha de creación/actualización del issue #13, que también sea ordenable con el mismo mecanismo (coordinar con ese issue si ya está implementado al momento de hacer este).

## Criterios de aceptación
- [ ] Hacer click en "Título" ordena la tabla alfabéticamente por título, ascendente.
- [ ] Volver a hacer click en "Título" invierte el orden a descendente.
- [ ] Hacer click en "Tipo" ordena por tipo de recurso (pdf/video/tiktok/texto/etc.), y "Autor" ordena por nombre de autor (usando el primer autor si hay varios, o el nombre concatenado ya mostrado en la celda).
- [ ] Cambiar de columna activa reinicia esa nueva columna a orden ascendente.
- [ ] El indicador visual (flecha o similar) refleja correctamente la columna y dirección activas en todo momento.
- [ ] El resto de las acciones de la tabla (Editar, Borrar, y "Visualizar" si ya existe) siguen funcionando igual sobre las filas ordenadas.

## Notas para la IA
- Archivo a tocar: `src/views/TeacherPanel.jsx`, dentro del bloque `tab === 'Recursos'`.
- El campo "Autor" en la tabla ya se resuelve como un string concatenado (`autorNombre`, ver `r.autorIds?.map(...).join(', ')`) — ordenar por ese mismo string resuelto, no por `autorIds` crudo.
- No tocar el modelo de datos en Firestore — esto es ordenamiento en memoria sobre los datos ya cargados en el estado `recursos`.
- Sin TypeScript.
