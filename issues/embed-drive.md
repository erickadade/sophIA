# Embeber previsualización de Google Drive en EmbedViewer.jsx

## Contexto

Actualmente, para los recursos de tipo `pdf` e `imagen`, `EmbedViewer.jsx` solo muestra un ícono, un texto descriptivo y un botón "Abrir PDF" / "Abrir imagen" que abre `urlArchivo` en una pestaña nueva. El archivo nunca se ve dentro de sophIA.

Cuando `urlArchivo` es un link de Google Drive (el caso más común, ya que Carlos sube ahí sus materiales), Google Drive soporta un formato especial de URL que sí se puede embeber en un iframe y mostrar una previsualización navegable sin salir de la app:

```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing   →   no se puede embeber
https://drive.google.com/file/d/FILE_ID/preview            →   SÍ se puede embeber en iframe
```

Esto requiere que el archivo en Drive tenga el permiso "Cualquiera con el enlace puede ver" (si no, el iframe va a mostrar un error de permisos, pero eso es responsabilidad de Carlos al compartir el archivo — no hay nada que la app pueda hacer al respecto).

## Objetivo

Modificar `EmbedViewer.jsx` para que, cuando `tipo === 'pdf'` o `tipo === 'imagen'`:

1. Detecte automáticamente si `urlArchivo` es un link de Google Drive.
2. Si lo es: extraiga el `FILE_ID` y embeba un iframe con la URL en formato `/preview`, mostrando la previsualización inline dentro del recurso.
3. Si NO es un link de Drive (Dropbox, otro hosting, o un formato de Drive no reconocido): mantener el comportamiento actual (ícono + texto + botón "Abrir en pestaña nueva"), como fallback seguro.
4. En ambos casos, seguir mostrando debajo del iframe (o en su lugar, si no hay iframe) el botón para abrir el archivo en una pestaña nueva — algunos usuarios van a preferir eso, y es el fallback si el iframe falla por permisos.

## Archivo a modificar: `src/components/EmbedViewer.jsx`

### 1. Agregar función utilitaria para detectar y transformar links de Drive

En la parte superior del archivo (fuera del componente), agregar:

```js
function getDrivePreviewUrl(url) {
  if (!url) return null;
  const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://drive.google.com/file/d/${match[1]}/preview`;
}
```

### 2. Modificar el bloque `if (tipo === 'pdf' || tipo === 'imagen')`

Dentro de ese bloque, calcular `const previewUrl = getDrivePreviewUrl(urlArchivo);` y bifurcar:

- **Si `previewUrl` existe**: renderizar un iframe con `src={previewUrl}`, manteniendo el mismo wrapper/clase CSS que usan los otros embeds (`tiktok`, `instagram`, etc.) para consistencia visual, con un `title` apropiado ("Vista previa del PDF" o "Vista previa de la imagen" según `tipo`). Debajo del iframe, mantener un link/botón secundario más chico que diga "Abrir en pestaña nueva" apuntando a `urlArchivo` (no a `previewUrl`).
- **Si `previewUrl` es `null`**: mantener exactamente el comportamiento actual (ícono 📄/🖼️, texto descriptivo, botón "Abrir PDF"/"Abrir imagen").

### 3. CSS

Reutilizar el wrapper de iframe que ya existe para los otros tipos embebibles (mismo aspect-ratio / `max-width` que usás para `tiktok`/`instagram`/`facebook`) en lugar de crear una clase nueva, a menos que el aspect ratio de un PDF (más vertical, tipo hoja) lo justifique — en ese caso, agregar una clase `embed-wrapper--documento` con una proporción más alta (sugerencia: `aspect-ratio: 3/4` o una altura fija como `min-height: 500px`, ya que los PDFs varían mucho en cantidad de páginas y no tiene un aspect ratio natural como un video).

## Qué NO tocar

- No cambiar el modelo de datos en Firestore — sigue usando `urlArchivo` tal cual.
- No tocar `TeacherPanel.jsx`, `ResourceCard.jsx` ni los tipos `instagram`/`facebook`/`video`/`tiktok` — esto es exclusivo del manejo de `pdf` e `imagen` en `EmbedViewer.jsx`.
- No agregar validación ni bloqueo si el link no es de Drive — simplemente cae al fallback existente.
- No intentar detectar o manejar links de Dropbox u otros servicios en este cambio — el fallback de "Abrir en pestaña nueva" ya cubre esos casos.
