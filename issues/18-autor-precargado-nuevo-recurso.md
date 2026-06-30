# 18 - Bug: autor "Aristóteles" precargado al crear un nuevo recurso

## Problema
Al abrir el modal "Nuevo recurso" desde el panel docente, el campo "Autores" trae precargado a "Aristóteles" como chip seleccionado, sin importar el contexto desde el que se abre el modal. Esto ocurre siempre, no solo en casos puntuales.

## Objetivo
Que el modal "Nuevo recurso" se abra con el campo "Autores" vacío por defecto, salvo que exista un contexto explícito que justifique precargar un autor (por ejemplo, crear un recurso desde el perfil de un autor específico, si esa funcionalidad existe).

## Fuera de alcance
- Cualquier cambio al comportamiento del selector "+ Agregar autor..." más allá de corregir el valor inicial.
- Cambios al modelo de datos de `recursos` o al campo de autores en Firestore.

## Requisitos

### P0 (bloqueante)
- Localizar dónde se inicializa el estado del formulario de "Nuevo recurso" (probablemente en `TeacherPanel.jsx`) y reportar el valor inicial actual del campo de autores antes de modificar nada.
- Corregir la inicialización para que el campo de autores arranque vacío (array vacío `[]`, no con el primer autor de la lista de `autores` por defecto).
- Verificar que el estado se resetea correctamente cada vez que se abre el modal para crear un recurso nuevo (no debe arrastrar el último autor usado en una edición previa, si el modal se reutiliza para editar y crear).

### P1 (deseable)
- Ninguno.

## Criterios de aceptación
- [ ] Al abrir "Nuevo recurso" desde el panel docente, el campo "Autores" aparece vacío, sin ningún chip precargado.
- [ ] Esto se cumple al abrir el modal repetidas veces seguidas, y también después de haber editado un recurso existente previamente.
- [ ] Crear un recurso sin seleccionar ningún autor manualmente no rompe el formulario (se puede seleccionar uno o más autores normalmente con "+ Agregar autor...").
- [ ] El flujo de edición de un recurso existente sigue mostrando correctamente los autores ya asignados a ese recurso (este fix no debe afectar ese caso).

## Notas para la IA
- Archivo principal a revisar: `TeacherPanel.jsx`.
- Si el formulario comparte estado entre "crear" y "editar" recurso, prestar atención a que el reset al modo "crear" limpie explícitamente el array de autores.
- No agregar Firebase Storage ni lógica de upload de archivos — no aplica a este issue, pero se aclara por convención del proyecto.
