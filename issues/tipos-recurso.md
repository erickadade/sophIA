# Prompt para Claude Code — agregar tipos de recurso 'instagram', 'facebook' e 'imagen'

Copiá y pegá esto en el panel de Claude Code en VS Code, parado en la raíz del repo de sophIA.

---

Quiero agregar tres tipos nuevos de recurso a sophIA, siguiendo exactamente los mismos patrones que ya existen para los tipos actuales (`texto`, `pdf`, `video`, `tiktok`):

- **`instagram`**: link a un reel o publicación de Instagram. Se maneja igual que `video`/`tiktok` — el docente pega el código de embed oficial de Instagram en el campo `urlEmbed`, y se muestra en un iframe.
- **`facebook`**: link a una publicación o video de Facebook. Se maneja igual que `instagram`/`video`/`tiktok` — el docente pega el código de embed oficial de Facebook (Facebook Page Plugin / Video Plugin) en el campo `urlEmbed`, y se muestra en un iframe.
- **`imagen`**: link a una imagen alojada en Drive u otro repositorio externo. Se maneja igual que `pdf` — el docente pega el link en `urlArchivo`, y se muestra un botón para abrir la imagen en una pestaña nueva (no se intenta embeber la imagen inline, porque el link no necesariamente apunta a un archivo de imagen directo, sino a una página de Drive).

No hace falta cambiar el modelo de datos en Firestore: los tres tipos nuevos usan los mismos campos que ya existen (`tipo`, `urlEmbed` para instagram/facebook, `urlArchivo` para imagen).

## Archivos a modificar

### 1. `src/views/TeacherPanel.jsx`
- Agregar `'instagram'`, `'facebook'` e `'imagen'` al array `TIPOS_RECURSO` (línea ~12).
- En el formulario de recurso, donde hoy está la condición `{(form.tipo === 'video' || form.tipo === 'tiktok') && (...)}` para mostrar el input de `urlEmbed`, agregar `'instagram'` y `'facebook'` a esa condición. El texto de ayuda del label puede aclarar el formato esperado según el tipo seleccionado, ej: "ej: https://www.instagram.com/reel/.../embed" para instagram y algo como "ej: código de Facebook Video/Page Plugin" para facebook.
- En el formulario de recurso, donde hoy está la condición `{form.tipo === 'pdf' && (...)}` para mostrar el input de `urlArchivo`, agregar `'imagen'` a esa condición (cambiar a `form.tipo === 'pdf' || form.tipo === 'imagen'`). El placeholder/label puede generalizarse un poco, ej: "URL del archivo (link externo — Google Drive, etc.)" en vez de mencionar solo PDF, ya que ahora ese campo sirve para ambos tipos.

### 2. `src/components/EmbedViewer.jsx`
- Agregar un bloque para `tipo === 'instagram'`, idéntico en estructura al de `tiktok` pero con su propio wrapper CSS (ver punto 4) y `title="Instagram"`.
- Agregar un bloque para `tipo === 'facebook'`, mismo patrón, con su propio wrapper CSS (ver punto 4) y `title="Facebook"`.
- Modificar la condición `if (tipo === 'pdf')` para que también cubra `imagen`: cambiar a `if (tipo === 'pdf' || tipo === 'imagen')`. Dentro, el ícono y el texto deben adaptarse según el tipo (por ejemplo, ícono 🖼️ y texto "Esta es una imagen alojada externamente" cuando `tipo === 'imagen'`, manteniendo el ícono 📄 y el texto actual cuando `tipo === 'pdf'`). El botón sigue diciendo "Abrir PDF" o pasa a decir "Abrir imagen" según corresponda.

### 3. `src/components/ResourceCard.jsx`
- Agregar entradas para `instagram`, `facebook` e `imagen` en `TYPE_ICONS` (sugerencia: `instagram: '📸'`, `facebook: '👍'`, `imagen: '🖼️'`) y en `TYPE_LABELS` (`instagram: 'Instagram'`, `facebook: 'Facebook'`, `imagen: 'Imagen'`).

### 4. `src/styles/components.css`
- Agregar clases `.resource-type-badge.tipo-instagram`, `.resource-type-badge.tipo-facebook` y `.resource-type-badge.tipo-imagen`, siguiendo el mismo patrón de las que ya existen (`tipo-pdf`, `tipo-video`, `tipo-tiktok`, `tipo-texto`), eligiendo colores de los tokens ya definidos en `tokens.css` que no generen confusión visual entre sí ni con los tipos existentes (por ejemplo, reutilizar combinaciones ya existentes de los colores de acento si no querés introducir una paleta nueva).
- Agregar un wrapper `.embed-wrapper--instagram` para el iframe de Instagram. Los embeds de Instagram suelen ser más angostos y verticales que TikTok pero no tan extremos como 9:16 — usar algo como `max-width: 400px` y un aspect ratio razonable (podés usar `padding-bottom: 125%` como punto de partida, ajustable si se ve mal en la prueba visual).
- Agregar un wrapper `.embed-wrapper--facebook` para el iframe de Facebook. Los embeds de Facebook (posts o videos) suelen ser horizontales, más parecidos al formato de `video` (16:9) que al de TikTok — podés reutilizar directamente el `.embed-wrapper` base sin modificador adicional, o crear `.embed-wrapper--facebook` con `max-width: 500px` si el embed de Facebook se ve mejor algo más angosto que el de YouTube. Ajustar según se vea en la prueba visual.

## Qué NO tocar
- No cambiar el modelo de datos de Firestore ni las reglas de seguridad (`firestore.rules`).
- No tocar el flujo de `texto`, `pdf`, `video` ni `tiktok` ya existentes — solo extender las condiciones para sumar los tipos nuevos al lado de los que ya están.
- No es necesario modificar `seedData.js` a menos que quieras agregar un recurso de ejemplo de cada tipo nuevo para probar más fácil (opcional, decisión tuya).

## Workflow
- Probá creando un recurso de cada uno de los tres tipos nuevos desde el panel docente y viendo cómo se renderiza en `ResourceDetail` antes de dar por terminado.
- Hacé commit al terminar (mensaje corto en español, ej: `feat: agregar tipos de recurso instagram, facebook e imagen`).
- No hagas push a remoto sin que yo lo confirme antes.

---
