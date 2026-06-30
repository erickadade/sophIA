# 10 - Recursos como pestaña inicial del Panel Docente

## Problema
Al entrar al Panel Docente, la pestaña que se muestra por defecto es "Autores" (`useState('Autores')` en `TeacherPanel.jsx`). En el uso real, Recursos es la sección que Carlos consulta y edita con más frecuencia, así que tener que cambiar de pestaña cada vez que entra es un paso innecesario.

## Objetivo
Que al ingresar al Panel Docente, la pestaña "Recursos" sea la que se muestra por defecto.

## Fuera de alcance
- Cambios en el orden de las pestañas en la barra de navegación del panel (`panel-tab`).
- Cambios en el contenido o comportamiento de las otras pestañas (Autores, Consignas, Entregas, Alumnos).
- Recordar la última pestaña visitada entre sesiones (esto sería una mejora distinta, no pedida acá).

## Requisitos

### P0 (bloqueante)
- Cambiar el valor inicial de `tab` de `'Autores'` a `'Recursos'` en `TeacherPanel.jsx`.

## Criterios de aceptación
- [ ] Al entrar al Panel Docente (login como docente y navegación a `/docente`), la pestaña activa por defecto es "Recursos".
- [ ] El resto de las pestañas siguen siendo accesibles y funcionan igual que antes.

## Notas para la IA
- Archivo a tocar: `src/views/TeacherPanel.jsx`, línea donde se declara `const [tab, setTab] = useState('Autores')`.
- Es un cambio de una sola línea — no tocar ninguna otra lógica del componente.
- Sin TypeScript.
