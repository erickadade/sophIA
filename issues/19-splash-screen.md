# 19 - Splash screen al iniciar sophIA

## Problema
Al cargar la app en el navegador, no hay ninguna pantalla de carga intermedia: se ve un flash en blanco o un salto brusco hasta que React monta la interfaz. Esto se nota especialmente si Firebase tarda en autenticar o si la carga inicial de datos demora un poco.

## Objetivo
Mostrar una splash screen con el logo de sophIA mientras la app inicializa, con una animación sutil, y que se mantenga visible un tiempo mínimo fijo aunque la carga sea instantánea, extendiéndose si la carga real tarda más que ese mínimo.

## Fuera de alcance
- Configuración de splash screen para PWA (ícono de inicio en celular) — esto es solo para carga en navegador.
- Service workers o cacheo offline.
- Cambios al logo en sí (`dist/sophia-iso.svg` ya existe y se usa tal cual).

## Requisitos

### P0 (bloqueante)
- Crear un componente `SplashScreen.jsx` en `src/components/` que muestre el logo `dist/sophia-iso.svg` centrado sobre fondo `--paper` (`#f6f1e7`), con el nombre "sophIA" debajo en Fraunces (el sufijo "IA" en color `--terra`).
- Agregar una animación sutil tanto al logo como al texto (fade y/o pulso suave, usando CSS — no librerías externas).
- Implementar la lógica de tiempo mínimo + espera de carga real:
  - Tiempo mínimo fijo: 1.2 segundos (ajustable como constante al inicio del archivo, no hardcodeado en el medio de la lógica).
  - Si la carga real (autenticación de Firebase + cualquier dato inicial necesario para renderizar la primera vista) tarda más que el mínimo, la splash se mantiene hasta que esa carga termine.
  - Si la carga real termina antes del mínimo, la splash espera hasta cumplir el mínimo antes de desaparecer.
- Integrar el componente en el punto de entrada de la app (`App.jsx` o `main.jsx`, el que corresponda según la estructura actual) para que se muestre antes de renderizar las rutas/vistas.
- La transición de salida de la splash hacia el contenido real debe ser un fade simple, no un corte abrupto.

### P1 (deseable)
- Ninguno.

## Criterios de aceptación
- [ ] Al recargar la app, se ve la splash con el logo y "sophIA" (con "IA" en terracota) antes de cualquier otro contenido.
- [ ] El logo y/o el texto tienen una animación sutil visible (fade o pulso), no estática.
- [ ] La splash se muestra como mínimo 1.2 segundos incluso si la app carga instantáneamente.
- [ ] Si se simula una carga más lenta (por ejemplo, throttling de red en devtools), la splash se mantiene visible hasta que termina esa carga, sin cortarse antes.
- [ ] La transición de la splash al contenido de la app es un fade, no un salto brusco.
- [ ] No se introduce ningún flash en blanco antes de que aparezca la splash.

## Notas para la IA
- Archivo de logo a usar: `dist/sophia-iso.svg` — no recrear el ícono, referenciarlo directamente.
- Colores y fuentes desde `src/styles/tokens.css` (no hardcodear hex sueltos si ya existe el token correspondiente).
- Componente nuevo: `src/components/SplashScreen.jsx`.
- Punto de integración: revisar `src/main.jsx` o `App.jsx` para decidir dónde envolver el render condicional sin romper el flujo de `ProtectedRoute` ni de las vistas públicas.
- No agregar Firebase Storage ni lógica de upload — no aplica a este issue, se aclara por convención del proyecto.
- Sin TypeScript.
