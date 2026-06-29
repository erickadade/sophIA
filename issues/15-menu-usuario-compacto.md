# 15 - Menú de usuario compacto en el Header

## Problema
En el Header, cuando hay un usuario logueado, se muestra el nombre del usuario y el botón "Salir" lado a lado de forma permanente (`Header.jsx`, bloque `.header-user`). Esto ocupa espacio horizontal innecesario en la barra de navegación, especialmente en pantallas chicas.

## Objetivo
Reemplazar el bloque actual de nombre + botón "Salir" por un ícono de usuario circular (estilo "personita") que, al presionarlo, despliega un menú con el nombre del usuario, una opción "Gestionar cuenta" y la opción "Cerrar sesión".

## Fuera de alcance
- Implementar la pantalla o lógica real de "Gestionar cuenta" — por ahora es solo una opción visible en el menú (puede no hacer nada o mostrar un placeholder simple).
- Cambios en el flujo de login o en `useAuth.jsx`.
- Cambios en la navegación principal (`nav-link`s de Línea de tiempo, Temas, Buscar, Panel docente/Mis tareas).

## Requisitos

### P0 (bloqueante)
- Reemplazar el `<div className="header-user">` (nombre + botón "Salir") por un botón circular con ícono/avatar de persona.
- Al hacer click en el ícono, mostrar un menú desplegable (dropdown) con:
  - Nombre del usuario (`userData?.nombre || user.email`), no clickeable, solo informativo.
  - Opción "Gestionar cuenta" (placeholder, sin funcionalidad real todavía).
  - Opción "Cerrar sesión", que ejecuta el `handleLogout` ya existente.
- El menú debe cerrarse al hacer click afuera, y al navegar (reutilizar el patrón de `useEffect` que ya cierra `menuOpen` en `location.pathname`, aplicado también a este nuevo menú).
- Mantener el comportamiento actual para usuario no logueado (botón "Ingresar" sin cambios).

### P1 (deseable)
- Pequeña animación de apertura/cierre del menú (fade o slide corto), consistente con el resto de la identidad visual.

## Criterios de aceptación
- [ ] Con usuario logueado, el Header muestra solo el ícono circular de persona (no el nombre ni "Salir" visibles por defecto).
- [ ] Al hacer click en el ícono, se abre un menú con nombre, "Gestionar cuenta" y "Cerrar sesión".
- [ ] "Cerrar sesión" desde el nuevo menú funciona igual que el botón "Salir" anterior (llama a `signOut` y navega a `/`).
- [ ] El menú se cierra al hacer click fuera de él.
- [ ] El menú se cierra al navegar a otra ruta.
- [ ] Sin usuario logueado, se sigue mostrando el botón "Ingresar" sin cambios.
- [ ] Responsive: el ícono se ve y funciona correctamente tanto en desktop como en el menú hamburguesa mobile.

## Notas para la IA
- Archivo principal a tocar: `src/components/Header.jsx`.
- Estilos en `src/styles/components.css` — agregar las clases nuevas para el ícono circular y el dropdown ahí, siguiendo la paleta existente (`#af4d34` terracota, `#5c6b46` oliva, `#b8893f` dorado, fondo `#f6f1e7`).
- Reutilizar el `handleLogout` existente, no duplicar lógica de `signOut`.
- No usar selectores de archivo ni Firebase Storage para el ícono de usuario — usar un ícono SVG inline o de alguna librería ya presente en el proyecto si existe; si no hay ninguna, un ícono SVG simple de "persona" hecho a mano alcanza.
- Sin TypeScript.
