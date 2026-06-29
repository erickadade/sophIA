# 7 - Buscador y badge de tipo en "Recursos relacionados"

## Problema

En el modal "Nuevo recurso" del panel docente, la sección "Recursos relacionados" es una lista de checkboxes sin forma de filtrar — a medida que crecen los recursos cargados, encontrar uno específico requiere scrollear toda la lista. Además, cada item solo muestra el título, sin indicar el tipo de recurso (PDF, texto, video, etc.), lo que dificulta distinguir items con títulos similares o elegir el formato correcto al relacionar contenido.

## Objetivo

Agregar un buscador que filtre la lista de "Recursos relacionados" en tiempo real, y mostrar el tipo de cada recurso junto a su título para que sea más fácil identificarlo.

## Fuera de alcance

- No se toca el modelo de datos de autores ni el campo `autorId`/`autorIds` — eso es responsabilidad del issue #6, sin dependencia técnica con este.
- No se toca `urlArchivo`/`urlEmbed` ni Firebase Storage.
- No se modifica qué recursos pueden relacionarse entre sí ni la lógica de guardado de `relacionados[]` — solo la presentación y el filtrado de la lista existente.

## Requisitos

### P0 (bloqueante)

- Agregar un input de búsqueda arriba de la lista de checkboxes de "Recursos relacionados", con placeholder tipo "Buscar recurso...".
- El filtro debe ser instantáneo (on change, sin botón de búsqueda) y case-insensitive sobre el título del recurso.
- Los recursos ya marcados deben seguir contando como seleccionados aunque el filtro los oculte momentáneamente — el buscador filtra qué se muestra, no qué está seleccionado en el estado del formulario.
- Si el buscador no encuentra resultados, mostrar un mensaje simple tipo "Sin resultados" dentro del área de la lista (no un alert ni un modal nuevo).
- Mostrar el tipo del recurso (PDF, TEXTO, VIDEO, TIKTOK, etc.) junto al título de cada item, como un badge pequeño o etiqueta antes o al lado del título.
- Antes de crear un badge nuevo desde cero, correr `grep -rn "tipo" src/components/ --include="*.jsx"` para ver si ya existe una clase CSS o componente de badge de tipo (por ejemplo en `ResourceCard.jsx`) y reutilizarlo.

### P1 (deseable)

- (Ninguno — este issue es chico y autocontenido; ambos cambios son P0.)

## Criterios de aceptación

- [ ] Escribir en el buscador filtra la lista de "Recursos relacionados" sin recargar ni requerir click en un botón.
- [ ] El filtro no distingue mayúsculas/minúsculas.
- [ ] Un recurso tildado que queda fuera del filtro sigue marcado como seleccionado al borrar el texto de búsqueda.
- [ ] Buscar un término sin coincidencias muestra "Sin resultados" sin romper el layout ni el scroll de la lista.
- [ ] El scroll interno (`overflow-y`) de la lista sigue funcionando igual que antes de este cambio.
- [ ] Cada item de la lista muestra su tipo de recurso junto al título (ej: `[PDF] Así habló Zaratustra — Del superhombre y el eterno retorno`).
- [ ] El badge de tipo no rompe el layout compacto de la lista ni le agrega espacio vertical notorio por item.

## Notas para la IA

- Archivo principal a tocar: el componente del modal "Nuevo recurso" en `TeacherPanel.jsx` (o el subcomponente que renderiza la sección "Recursos relacionados", si está separado).
- Antes de crear un badge de tipo nuevo, revisar si `ResourceCard.jsx` o `components.css` ya tienen una clase/estilo para mostrar el tipo de recurso, y reutilizarlo en vez de duplicar estilos.
- No introducir librerías de terceros para el buscador — un input controlado con `useState` y filtrado en JS plano alcanza.
- No usar TypeScript.
- Sin dependencia técnica con el issue #6 (múltiples autores) — pueden implementarse y mergearse en cualquier orden.
