Base surface container for all content blocks in sophIA.

```jsx
// Default — static content
<Card padding="md">
  <h3>Alegoría de la caverna</h3>
  <p>Platón · República, Libro VII</p>
</Card>

// Interactive — hover lifts the card
<Card variant="interactive" onClick={() => openResource(id)}>
  <Badge variant="resource">PDF</Badge>
  <h3>Ética a Nicómaco</h3>
  <p>Aristóteles · 350 a.C.</p>
</Card>

// Elevated — for floating panels or featured content
<Card variant="elevated" padding="lg">
  <h2>Filósofa del mes</h2>
  …
</Card>

// Flat — nested inside another card, no shadow
<Card variant="flat" padding="sm">
  <p>Nota del profesor</p>
</Card>
```

**Variants:** `default` (xs shadow), `elevated` (md shadow), `flat` (no shadow), `interactive` (hover lift).
**Padding:** `none` · `sm` 12px · `md` 20px (default) · `lg` 24px · `xl` 32px.
Cards always use `--bg-card` (#fffdf8) — never pure white or paper (#f6f1e7).
