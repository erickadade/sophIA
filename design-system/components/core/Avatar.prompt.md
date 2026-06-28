Circular avatar for philosophers, teachers, and students. Renders initials as fallback.

```jsx
// With portrait image
<Avatar src="/img/platon.jpg" name="Platón" size="lg" />

// Initials fallback — most common usage
<Avatar name="Hannah Arendt" />          // → "HA"
<Avatar name="Marco Aurelio" size="sm" /> // → "MA"
<Avatar name="Simone de Beauvoir" />      // → "SD"

// In a philosopher card header
<div style={{display:'flex', alignItems:'center', gap:12}}>
  <Avatar name="Immanuel Kant" size="lg" />
  <div>
    <h3>Immanuel Kant</h3>
    <p>1724–1804 · Moderna</p>
  </div>
</div>
```

**Sizes:** `sm` 28px · `md` 40px (default) · `lg` 56px · `xl` 80px.
Initials are styled in Fraunces serif for a scholarly appearance.
Terracotta-tint background matches brand accents.
