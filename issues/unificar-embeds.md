# Unificar urlArchivo para todos los tipos embebibles + autodetección de links normales

## Contexto

Hoy sophIA tiene dos patrones distintos para "contenido externo":

- **`pdf` / `imagen`**: el docente pega un link normal en `urlArchivo`. Desde el cambio anterior, `EmbedViewer.jsx` ya detecta si es un link de Google Drive y lo transforma automáticamente a formato embebible (`/preview`), con fallback a "Abrir en pestaña nueva" si no lo es.
- **`video` / `tiktok` / `instagram` / `facebook`**: el docente tiene que pegar directamente el **código de embed** (URL ya transformada o iframe completo) en `urlEmbed`. Esto es un problema en mobile, porque en la app de cada red social no es fácil/posible conseguir ese código de embed — esa opción suele estar solo disponible en la versión de escritorio del sitio.

## Objetivo

Aplicar a `video`, `tiktok`, `instagram` y `facebook` el mismo patrón que ya usamos para `pdf`/`imagen`: el docente pega el **link normal** del contenido (el que copia desde el botón "Compartir" de la app del celular) en `urlArchivo`, y la app se encarga de transformarlo a la URL embebible internamente. `urlEmbed` deja de usarse para recursos nuevos.

## Cambios por archivo

### 1. `src/components/EmbedViewer.jsx`

Agregar funciones utilitarias (junto a `getDrivePreviewUrl`, que ya existe) para cada plataforma:

```js
function getYoutubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
  if (!match) return null;
  return `https://www.youtube.com/embed/${match[1]}`;
}

function getTiktokEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  if (!match) return null;
  // TikTok no tiene un endpoint /embed/ directo simple via iframe sin su script oficial;
  // usamos su endpoint de oEmbed-style embed player:
  return `https://www.tiktok.com/embed/v2/${match[1]}`;
}

function getInstagramEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://www.instagram.com/p/${match[1]}/embed`;
}

function getFacebookEmbedUrl(url) {
  if (!url) return null;
  // Facebook requiere pasar la URL original codificada como parámetro de su plugin de video/post.
  // No hay forma confiable de distinguir video vs post solo por la URL, así que probamos el plugin de video primero.
  const isLikelyVideo = /\/(videos|watch|reel)\//.test(url);
  const base = isLikelyVideo
    ? 'https://www.facebook.com/plugins/video.php'
    : 'https://www.facebook.com/plugins/post.php';
  return `${base}?href=${encodeURIComponent(url)}&show_text=false`;
}
```

Para cada tipo (`video`, `tiktok`, `instagram`, `facebook`), reemplazar el uso de `urlEmbed` por:

```js
const embedUrl =
  tipo === 'video' ? getYoutubeEmbedUrl(urlArchivo) :
  tipo === 'tiktok' ? getTiktokEmbedUrl(urlArchivo) :
  tipo === 'instagram' ? getInstagramEmbedUrl(urlArchivo) :
  tipo === 'facebook' ? getFacebookEmbedUrl(urlArchivo) :
  null;
```

- **Si `embedUrl` existe**: renderizar el iframe igual que antes (mismo wrapper CSS por tipo que ya existe), pero con `src={embedUrl}` en vez de `src={urlEmbed}`.
- **Si `embedUrl` es `null`** (link no reconocido, formato inesperado, o — en el caso de `video` — no es de YouTube sino de otra plataforma de video): fallback a ícono + texto + botón "Abrir en pestaña nueva" apuntando a `urlArchivo`, igual que el fallback que ya existe para `pdf`/`imagen`.
- En todos los casos donde sí se muestra el iframe, agregar debajo el link secundario "Abrir en pestaña nueva" → `urlArchivo`, igual que se hizo para `pdf`/`imagen` en el cambio anterior.

**Importante**: por compatibilidad con recursos ya creados antes de este cambio (que tienen `urlEmbed` poblado y `urlArchivo` vacío para estos tipos), si `urlArchivo` está vacío pero `urlEmbed` no, usar `urlEmbed` directamente como `embedUrl` sin pasar por las funciones de transformación (ya estaba en formato embed). Es decir: el fallback de compatibilidad hacia atrás es buscar primero en `urlArchivo` y, si no hay nada ahí, caer a `urlEmbed` tal cual.

### 2. `src/views/TeacherPanel.jsx`

- En el formulario de recurso, eliminar la condición que muestra el input de `urlEmbed` para `video`/`tiktok`/`instagram`/`facebook`.
- Esos cuatro tipos ahora deben caer en la misma condición que ya usan `pdf`/`imagen` (el input de `urlArchivo`), generalizando el label/placeholder a algo tipo "URL del contenido (pegá el link que copiás desde la app o el navegador)".
- Si tiene sentido por claridad, el placeholder puede variar levemente según `tipo` (ej. "ej: https://youtube.com/watch?v=..." para `video`, "ej: https://www.tiktok.com/@usuario/video/..." para `tiktok`, etc.), pero esto es opcional — no es necesario si complica el código innecesariamente.

### 3. Modelo de datos (Firestore)

No se requiere migración de datos existentes. Los recursos viejos con `urlEmbed` poblado siguen funcionando gracias al fallback de compatibilidad descrito arriba. Los recursos nuevos que se creen usan solo `urlArchivo`. El campo `urlEmbed` puede quedar sin usarse para creaciones nuevas, no hace falta borrarlo del modelo.

## Qué NO tocar

- No tocar el manejo de `pdf`/`imagen` (ya migrado en el cambio anterior).
- No tocar `texto`.
- No borrar ni migrar datos existentes en Firestore — todo se resuelve en el cliente con el fallback descrito.
- No agregar validación que bloquee guardar el recurso si el link no matchea ningún patrón conocido — simplemente se guarda y, al visualizarlo, cae al fallback de "Abrir en pestaña nueva".

## Nota sobre confiabilidad esperada por plataforma (no requiere cambios de código, es solo contexto)

- **YouTube y TikTok**: la transformación es confiable, debería funcionar en la gran mayoría de los casos.
- **Instagram**: funciona en la mayoría de los casos, pero puede fallar (mostrar error en el iframe en vez de cargar) con contenido de cuentas privadas o ciertos formatos de Reel.
- **Facebook**: es la plataforma menos confiable para embeber vía link directo. Es esperable que el fallback de "Abrir en pestaña nueva" se use con más frecuencia para este tipo. No hay manera de mejorar esto del lado de la app — es una limitación de Facebook.
