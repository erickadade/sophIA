# Prompt inicial para Claude Code — proyecto sophIA

## Configuración de Firebase — YA HECHA ✓

Ya está todo listo en Firebase Console:
- ✓ Proyecto creado, app web registrada
- ✓ Firestore Database activado (modo producción)
- ✓ Authentication activado (proveedor Email/Password)
- ✓ Firebase Hosting — Site ID: `sophia-filosofia` (URL futura: `sophia-filosofia.web.app`)
- **Storage: NO activado por ahora** — no se usa en esta primera etapa (ver sección más abajo)

El `firebaseConfig` para conectar el proyecto está pegado al final de este documento, en la sección "Configuración real de Firebase".

---

## El prompt para pegar en Claude Code

Copiá todo el bloque de abajo (incluyendo la sección final con el firebaseConfig) y pegalo en el panel de Claude Code, dentro de una carpeta nueva y vacía para el proyecto.

---

Quiero crear un proyecto nuevo llamado **sophIA**: una app web que funciona como repositorio dinámico de material para clases de filosofía de nivel secundario, con un módulo simple de tareas. La usa un profesor (administrador de contenido) y sus alumnos (consumidores de contenido + entrega de tareas).

### Stack técnico
- React + Vite
- Firebase: Firestore (base de datos) y Authentication (email/password). **Storage NO se usa en esta etapa** (ver sección dedicada más abajo).
- Sin TypeScript, JavaScript plano
- Despliegue pensado para Firebase Hosting (Site ID ya reservado: `sophia-filosofia`). No hace falta hacer el deploy todavía, pero tenelo en cuenta en la estructura del proyecto (carpeta `dist` como build output, compatible con Firebase Hosting).

### Modelo de datos (Firestore)

**Colección `autores`**
```
{
  id: string (auto),
  nombre: string,
  periodo: string,        // "Antigüedad" | "Medieval" | "Moderna" | "Contemporánea"
  anioNacimiento: string, // texto libre, ej "470 a.C." o "1844"
  anioMuerte: string,
  bio: string,
  ordenCronologico: number // para ordenar dentro del mismo período
}
```

**Colección `recursos`**
```
{
  id: string (auto),
  tipo: string,           // "pdf" | "tiktok" | "video" | "texto"
  titulo: string,
  autorId: string,        // referencia a autores
  temas: array de string, // ej ["amor", "ética"]
  
  contenidoTexto: string, // usado solo si tipo === "texto"
  urlArchivo: string,     // usado si tipo === "pdf" — es un LINK EXTERNO (Google Drive, Dropbox, etc.), NO un archivo subido a Firebase Storage
  urlEmbed: string,       // usado si tipo === "tiktok" o "video" (link para embeber)
  relacionados: array de string // ids de otros recursos
}
```

**Colección `consignas`**
```
{
  id: string (auto),
  titulo: string,
  descripcion: string,
  curso: string,
  recursoVinculadoId: string, // referencia opcional a recursos
  fechaCreacion: timestamp,
  fechaLimite: timestamp
}
```

**Colección `entregas`**
```
{
  id: string (auto),
  consignaId: string,
  alumnoId: string, // uid de Firebase Auth
  alumnoNombre: string,
  fechaEntrega: timestamp,
  contenido: string, // texto de respuesta, o link a un archivo externo (Google Drive, etc.) si corresponde
  urlArchivo: string // opcional, link externo
}
```

**Colección `usuarios`**
```
{
  uid: string (= Firebase Auth uid),
  nombre: string,
  rol: string, // "docente" | "alumno"
  curso: string // solo aplica a alumnos
}
```

### Firebase Storage — NO SE USA en esta etapa

**No conectes ni configures Firebase Storage en esta versión del proyecto.** Todo lo que parece un "archivo" en este modelo de datos en realidad es un **link externo**:

- Los PDFs (`urlArchivo` en `recursos`): el profesor los aloja en Google Drive, Dropbox, etc., y pega el link. El campo correspondiente en el formulario debe ser un input de texto/URL simple, nunca un selector de archivos.
- Si más adelante se agregan imágenes (retratos de autores, portadas), por ahora también deberían resolverse como un link externo (`urlFoto`, por ejemplo), no como upload a Storage.

No agregues el SDK de Storage, no crees lógica de upload, y no dejes placeholders pensados para subir archivos. Si en algún momento futuro decidimos sumar Storage, te lo voy a pedir explícitamente como una tarea aparte.

### Roles y permisos
- **Docente**: puede crear/editar/borrar autores, recursos y consignas. Puede ver todas las entregas de todos los alumnos.
- **Alumno**: solo lectura sobre autores y recursos. Puede ver sus propias consignas (filtradas por su curso) y subir/editar sus propias entregas. No puede ver entregas de otros alumnos.
- Configurá las Firestore Security Rules acorde a esto desde el principio, no lo dejes para después.

### Vistas / pantallas necesarias

1. **Línea de tiempo** (vista principal pública): autores agrupados visualmente por período histórico, ordenados cronológicamente. Click en un autor lleva a su perfil.
2. **Perfil de autor**: bio + grid de todos sus recursos.
3. **Explorador de temas**: nube/lista de temas (derivados dinámicamente de los tags usados en recursos, no hardcodeados). Click en un tema muestra todos los recursos que lo tienen, sin importar autor o tipo.
4. **Detalle de un recurso**: muestra el recurso (embed si es tiktok/video, visor si es pdf, texto si es tipo texto), sus temas, y sus recursos relacionados (clickeables, navegan a ese otro recurso).
5. **Buscador**: input de texto libre que filtra por título de recurso, nombre de autor, o tema, en tiempo real.
6. **Panel del docente** (requiere login): CRUD de autores, recursos y consignas. Pensalo simple y funcional, no necesita ser elaborado visualmente.
7. **Panel del alumno** (requiere login): lista de sus consignas activas (filtradas por su curso), con estado (pendiente/entregada), y poder subir una entrega.
8. **Login**: simple, email + contraseña, redirige según el rol del usuario.

Las vistas 1 a 5 deben ser accesibles SIN login (de lectura pública) — son las que van a usar los alumnos para explorar el contenido día a día. El login solo es necesario para el panel de docente y para entregar tareas.

### Identidad visual

Tipografía: **Fraunces** (serif, vía Google Fonts) para nombres de autores, títulos y el logo/wordmark; **Source Sans 3** (sans, vía Google Fonts) para texto de cuerpo e interfaz.

El nombre de la marca es **sophIA**, con el sufijo "IA" siempre en color `--terra` para marcar el doble sentido (sophía = sabiduría en griego + IA).

Tengo el sistema de diseño completo generado por Claude Design en la carpeta design-system/ de este proyecto. Por favor revisá especialmente design-system/tokens/ (los archivos colors.css, typography.css, fonts.css, spacing.css, effects.css, base.css) y reemplazá el src/styles/tokens.css provisorio que ya armamos por las variables reales de esos archivos, manteniendo los mismos nombres de variable donde sea posible (--bg, --terra, --olive, etc.) o avisame si los nombres no coinciden para que decidamos juntos cómo mapearlos. También revisá design-system/assets/ por si hay ahí el logo de la lechuza para usarlo en el header.

### Datos de ejemplo para probar

Cargá en Firestore (con un script de seed, o manualmente desde el código en el primer arranque) los siguientes autores y recursos de ejemplo, para poder ver la app funcionando con contenido real desde el principio:

**Autores**: Sócrates (470–399 a.C., Antigüedad), Platón (427–347 a.C., Antigüedad), Aristóteles (384–322 a.C., Antigüedad), Descartes (1596–1650, Moderna), Kant (1724–1804, Moderna), Nietzsche (1844–1900, Contemporánea), Sartre (1905–1980, Contemporánea), Simone de Beauvoir (1908–1986, Contemporánea).

**Recursos**: al menos 2-3 por autor, mezclando tipos (pdf, texto, video, tiktok), con temas variados entre "amor", "ética", "libertad", "existencia", "felicidad", "conocimiento", "muerte". Inventá títulos razonables de textos filosóficos reales de cada autor. Conectá algunos recursos entre sí vía el campo `relacionados`.

### Cómo empezar

1. Inicializá el proyecto con Vite + React
2. Configurá Firebase usando el `firebaseConfig` real que está pegado al final de este documento — creá un `.env` con esos valores, asegurándote de que `.env` esté en `.gitignore`. Conectá únicamente Firestore y Authentication; no agregues el SDK de Storage.
3. Armá la estructura de carpetas (`src/components`, `src/views`, `src/styles`, `src/lib/firebase.js`, etc.)
4. Empezá por el modelo de datos y la conexión a Firestore
5. Seguí con las vistas públicas (línea de tiempo, temas, perfil de autor, detalle de recurso, buscador) antes que el panel de docente/alumno
6. Cargá los datos de ejemplo
7. Por último, armá login y los paneles de docente/alumno

Priorizá que ande de punta a punta con algo simple antes de pulir el diseño visual al detalle — quiero poder mostrárselo a Carlos (el profesor, dueño del proyecto) cuanto antes.

---

### Configuración real de Firebase

Mi firebaseConfig es el siguiente, usalo para crear el archivo `.env` (y agregá `.env` a `.gitignore` si todavía no existe):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBY7cKejDVQiH46hz6h4wxpR5q1oOWYAEc",
  authDomain: "sophia-c09b6.firebaseapp.com",
  projectId: "sophia-c09b6",
  storageBucket: "sophia-c09b6.firebasestorage.app",
  messagingSenderId: "1068385245484",
  appId: "1:1068385245484:web:31d3a5edabe53cdfe4b489",
  measurementId: "G-E624R88P68"
};
```

El Site ID de Firebase Hosting ya reservado es: `sophia-filosofia` (URL: `sophia-filosofia.web.app`). No hace falta hacer el deploy ahora, pero tenelo en cuenta para cuando llegue el momento.

---



### Control de versiones

Este proyecto ya está conectado a un repositorio de GitHub vacío (cloné el repo y estoy trabajando dentro de esa carpeta). Por favor:
- Asegurate de que `.env` y `node_modules` estén en `.gitignore` desde el primer commit — nunca deben subirse a GitHub.
- Una vez que el proyecto inicial esté armado y andando (aunque sea básico), hacé un commit inicial con un mensaje claro como "Setup inicial: estructura del proyecto, modelo de datos y vistas públicas básicas".
- A partir de ahí, going forward, proponeme commits chicos y descriptivos a medida que avancemos (por ejemplo, después de cada vista nueva o funcionalidad completa), en vez de un solo commit gigante al final. Preguntame antes de hacer push si en algún momento no es obvio que yo quiera subir los cambios todavía.
