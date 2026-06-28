# Hacer responsive a sophIA

Quiero que hagas responsive toda la app de sophIA. Hoy no hay ninguna media query en el proyecto (`src/styles/global.css`, `src/styles/components.css`, `src/styles/tokens.css`), así que en pantallas chicas (celular) se ve apretado y desordenado, aunque no está roto del todo gracias a los grids con `auto-fill`/`auto-fit` que ya existen.

## Breakpoints

Agregá dos breakpoints como tokens documentados en `tokens.css` (como comentario, ya que no se pueden usar custom properties dentro de un `@media`):
- **Tablet**: `max-width: 768px`
- **Mobile**: `max-width: 480px`

## Cambios necesarios, por archivo

### 1. `src/components/Header.jsx` + estilos del `site-header` en `components.css`
Este es el más urgente. Hoy `site-nav` es un flex horizontal fijo con `gap-xl` que no entra en una pantalla de 375px (los links "Línea de tiempo", "Temas", "Buscar", "Panel docente"/"Mis tareas", el nombre de usuario y el botón "Salir" se aprietan o desbordan).

Quiero un **menú hamburguesa** en mobile (`max-width: 768px`):
- Mostrar un botón de ☰ que abre/cierra la navegación.
- La navegación colapsada se muestra como un panel desplegable debajo del header (o un drawer lateral, lo que te resulte más simple de implementar bien con el design system existente).
- El estado de abierto/cerrado se maneja con `useState` en el componente.
- Mantené el logo y el botón de auth siempre visibles en la barra superior; lo que colapsa es la navegación (`site-nav`).
- Cerrar el menú automáticamente al navegar a otra ruta (usar el `location` que ya se importa con `useLocation`).

### 2. `src/styles/global.css` — `.page-content`
Reducir el padding lateral en mobile para no perder tanto espacio útil:
```css
@media (max-width: 480px) {
  .page-content {
    padding: var(--space-6) var(--space-4);
  }
}
```

### 3. `src/styles/components.css` — modales
`.modal-header` y `.modal-body` usan `padding: var(--space-6) var(--space-8)` fijo (32px laterales). En mobile eso resta mucho espacio. Agregar:
```css
@media (max-width: 480px) {
  .modal-header,
  .modal-body {
    padding-left: var(--space-4);
    padding-right: var(--space-4);
  }
  .modal-overlay {
    padding: var(--space-3);
  }
}
```

### 4. `src/styles/components.css` — `.form-row`
Se usa en los modales de TeacherPanel.jsx para poner dos campos lado a lado (ej: Período + Fechas, Curso + Fecha límite). Hoy es `display: flex` sin wrap, así que en un modal angosto en mobile los inputs quedan muy apretados. Agregar:
```css
@media (max-width: 480px) {
  .form-row {
    flex-direction: column;
    gap: var(--gap-sm);
  }
}
```

### 5. `src/styles/components.css` — `.author-profile__header` y `.resource-detail__meta`
Estos ponen el avatar (96px) al lado del texto en flex horizontal. En mobile se ve apretado. Agregar:
```css
@media (max-width: 480px) {
  .author-profile__header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
  }
  .author-profile__name {
    font-size: var(--text-3xl);
  }
}
```

### 6. `src/styles/components.css` — `.site-header__inner`
El padding lateral del header (`var(--space-6)`, 24px) puede reducirse un poco en mobile para dar más aire al logo/hamburguesa:
```css
@media (max-width: 480px) {
  .site-header__inner {
    padding: 0 var(--space-4);
  }
}
```

### 7. Tablas del panel docente (`.panel-table-wrapper`)
Ya tienen `overflow-x: auto`, lo cual está bien — no hace falta rehacerlas como cards en mobile a menos que quieras ese nivel de pulido. Si después de los cambios anteriores siguen viéndose mal, lo retomamos en otra pasada, pero no es prioritario ahora.

## Qué NO tocar
- No toques los grids `.resources-grid`, `.authors-grid`, `.timeline-grid` — ya usan `auto-fill`/`auto-fit` con `minmax()`, que ya son responsive por naturaleza y se reacomodan solos. No hace falta agregarles media queries.
- No cambies la paleta de colores, tipografías, ni ningún token visual existente en `tokens.css` — solo se agregan reglas dentro de `@media`, no se modifica nada del sistema de diseño en sí.
- No reescribas componentes desde cero. Son cambios incrementales de CSS + un único cambio funcional (el menú hamburguesa en `Header.jsx`).

## Workflow
- Probá el resultado en el inspector del navegador simulando 375px (iPhone SE) y 768px (tablet) antes de dar por terminado cada archivo.
- Hacé commit después de terminar cada uno de los puntos numerados arriba (mensajes de commit cortos y descriptivos, en español, ej: `fix: navbar responsive con menú hamburguesa`).
- No hagas push a remoto sin que yo lo confirme antes.

---
