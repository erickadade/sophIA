Renders branded sophIA buttons for all actions and navigation.

```jsx
// Primary CTA — most important action per view
<Button variant="primary" onClick={handleSubmit}>Entregar tarea</Button>

// Secondary — olive, use for "add" / curator actions
<Button variant="secondary">Agregar recurso</Button>

// Ghost — outlined, alongside primary
<Button variant="ghost">Cancelar</Button>

// Text — no border, low emphasis inline action
<Button variant="text" size="sm">Ver más</Button>

// Disabled state
<Button variant="primary" disabled>Guardar</Button>

// Full-width inside a form or panel
<Button variant="primary" fullWidth type="submit">Iniciar sesión</Button>
```

**Variants:** `primary` (terracota), `secondary` (oliva), `ghost` (outlined), `text` (no border).
**Sizes:** `sm` 32px · `md` 40px (default) · `lg` 48px.
Never place two `primary` buttons side by side. For form submit use `type="submit"`.
