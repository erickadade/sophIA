Text input with label, icon, helper text, and error states for all sophIA forms.

```jsx
// Search bar — most common usage
<Input
  type="search"
  placeholder="Buscá recursos, autores, temas…"
  icon={<SearchIcon size={16} />}
  fullWidth
/>

// Labeled form field with helper text
<Input
  id="titulo"
  label="Título de la tarea"
  placeholder="Ej: Reflexión sobre el mito de la caverna"
  helperText="Máximo 120 caracteres"
  fullWidth
/>

// Error state
<Input
  label="Fecha de entrega"
  value={date}
  error="La fecha debe ser posterior a hoy."
/>

// Disabled
<Input label="Código de clase" value="FIL-2025-B" disabled />
```

**Sizes:** `sm` 32px · `md` 40px (default) · `lg` 48px.
Always pair `id` with `label` for correct accessibility.
`icon` expects a Lucide icon element at 16px (sm) or 20px (md/lg).
`fullWidth` is standard in forms; omit for inline search inputs with fixed width.
