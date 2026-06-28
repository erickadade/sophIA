Small categorical labels used throughout sophIA to identify theme, period, and type.

```jsx
// Philosophical theme (most common — olive)
<Badge variant="theme">amor</Badge>
<Badge variant="theme">ética</Badge>
<Badge variant="theme">libertad</Badge>

// Historical period (gold)
<Badge variant="period">Antigua</Badge>
<Badge variant="period">Contemporánea</Badge>

// Resource type (terracotta)
<Badge variant="resource">PDF</Badge>
<Badge variant="resource">Video</Badge>
<Badge variant="resource">Reel</Badge>

// Neutral general metadata
<Badge variant="neutral">428–348 a.C.</Badge>

// Solid for status
<Badge variant="solid">Nuevo</Badge>
```

**Variants:** `theme` (olive), `period` (gold), `resource` (terracotta), `neutral`, `solid`.
**Sizes:** `sm` 20px (default) · `md` 24px · `lg` 28px.
Group multiple badges with `gap: var(--gap-xs)` (4px).
