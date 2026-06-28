# sophIA Design System

sophIA is a digital platform for secondary school philosophy education — a curated repository of learning materials (PDFs, text excerpts, videos, TikTok reels) organized by philosopher on a historical timeline and by philosophical theme, with a lightweight assignment submission module.

## Brand meaning

The name combines **sophía** (σοφία — wisdom, the Greek root of *philosophia*) with **IA** (Spanish acronym for *Inteligencia Artificial*), marking the platform as AI-assisted. In the wordmark, **IA** always appears uppercase and in terracotta — a visual wink to both readings.

## Users

- **Profesores/as de filosofía** — secondary school philosophy teachers who curate resources, create assignments, and annotate materials
- **Alumnos/as** — secondary school students who browse resources and submit assignments

---

## Sources

Built from the brand brief provided by the sophIA team, June 2026. The palette, typographic pairing, brand name logic, and logo concept were fully specified in the brief. No external Figma file, codebase, or design system was supplied — the system was built from first principles against the validated palette.

---

## Content Fundamentals

**Language:** Spanish — Argentine register throughout.

**Second person:** Voseo (*vos* form) for all user-facing text. This is warmer and more natural for Argentine secondary school culture.
- ✓ "Explorá los materiales", "Enviá tu tarea antes del viernes"
- ✗ "Explore los materiales", "Envíe su tarea antes del viernes"

**Casing:** Sentence case everywhere. Navigation items, section titles, and CTAs:
- ✓ "Línea de tiempo", "Mis tareas", "Explorar recursos"
- ✗ "Línea De Tiempo", "MIS TAREAS"

**Tone:** Warm, thoughtful, academic without being stiff. Like a good teacher — precise but inviting. Not startup-y, not corporate, not condescending.

**CTAs:** Verb-first imperative: "Explorar recursos", "Entregar tarea", "Ver en contexto".

**Philosopher names:** Always properly accented: *Platón, Aristóteles, Tomás de Aquino, René Descartes*.

**Works:** Italicized in body text: *La República*, *Ética a Nicómaco*, *El contrato social*.

**Historical dates:** Use *a.C.* / *d.C.*: "Platón, 428–348 a.C."

**Emoji:** Never in the UI.

---

## Visual Foundations

### Color palette

| Token | Value | Role |
|-------|-------|------|
| `--bg-base` | `#f6f1e7` | Page background — aged paper |
| `--bg-card` | `#fffdf8` | Card surfaces — warm near-white |
| `--text-primary` | `#2b2620` | Primary text — ink |
| `--text-secondary` | `#6b6256` | Secondary text |
| `--border-default` | `#ddd2bd` | Standard borders |
| `--accent-primary` | `#af4d34` | Terracotta — brand primary |
| `--accent-secondary` | `#5c6b46` | Olive — themes/tags |
| `--accent-tertiary` | `#b8893f` | Gold — periods/dates |

### Typography

**Display/headings:** Fraunces — a variable optical-size serif. Use weight 600–900 at large sizes. Italic is expressive and works for titles of works.

**Body/UI:** Source Sans 3 — a clean, legible variable sans-serif. Used for all interface text, labels, and descriptions. Never use it for headings.

**Rule:** One expressive serif + one neutral sans. Never two serifs or two sans together.

### Surfaces & depth

- **Base** (#f6f1e7) — global page background. Like aged paper; never pure white.
- **Card** (#fffdf8) — slightly lighter, used for all elevated card surfaces.
- **Elevated** (white) — modals, tooltips, dropdowns.

### Borders

1px, warm-tinted. Never stark black.
- Default: `--border-default` (#ddd2bd)
- Subtle: `--border-subtle` (#ede5d5) — inside cards, for dividers
- Strong: `--border-strong` (#9e9080) — focused/hovered emphasis

### Shadows

Warm-tinted using the ink color `rgba(43, 38, 32, …)`. Very subtle — this is not a high-contrast, high-drama UI.
- Default card state: `--shadow-xs`
- Hovered card state: `--shadow-md`
- Modal: `--shadow-xl`

### Border radius

Subtle and academic — not the rounded-2xl startup look.
- Cards: 10px (`--radius-card`)
- Buttons/inputs: 6px (`--radius-btn` / `--radius-input`)
- Tags/badges: 4px (`--radius-tag`)
- Modals: 16px (`--radius-modal`)

### Motion

- **Easing:** `ease` — nothing bouncy or spring-y
- **Fast** (120ms): button color changes, border transitions
- **Normal** (200ms): card hover, shadow growth, transform
- **Slow** (360ms): modals, panels sliding in
- **Card hover:** `translateY(-2px)` + shadow grows from `--shadow-xs` → `--shadow-md` + border darkens
- **Button hover:** background darkens to the 700-weight token
- **Active/press:** `scale(0.97)` on buttons
- **Focus ring:** 3px terracotta ring at 28% opacity

### Imagery (intent)

Warm-toned and scholarly: manuscripts, books, classical artworks, portrait busts, parchment textures. Never bright stock photography. Ideally desaturated or warm-filtered.

---

## Iconography

**System:** [Lucide Icons](https://lucide.dev/) — stroke weight 1.5px, monochrome, consistent line set.

**Usage in HTML:**
```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="book-open"></i>
<script>lucide.createIcons();</script>
```

**Usage in React (inline SVG):** see `ui_kits/sophia-app/index.html` for the inline SVG pattern used in the prototype.

**Key icons:**

| Icon | Usage |
|------|-------|
| `book-open` | Biblioteca (library nav) |
| `clock` | Línea de tiempo |
| `tag` | Temas |
| `clipboard-list` | Tareas |
| `search` | Search bar |
| `file-text` | PDF resource |
| `video` | Video resource |
| `type` | Text/reading resource |
| `play` | TikTok/Reel |
| `upload` | Submit assignment |
| `user` | Profile |
| `external-link` | Open resource |
| `download` | Download |
| `x` | Close/dismiss |
| `plus` | Add action |

**Sizes:** 16px inline in text, 18–20px in navigation, 20–24px in headers.

**Color:** Always `currentColor`. Never decoratively colored except within explicit badge/icon systems.

**Do not:** use emoji as icons, use hand-drawn SVG decorations, or mix icon families in the same interface.

---

## File Index

```
sophIA Design System
│
├── styles.css                          ← Global CSS entry point (imports only)
├── readme.md                           ← This file
├── SKILL.md                            ← Agent skill prompt for Claude Code
│
├── tokens/
│   ├── fonts.css                       ← Google Fonts @import (Fraunces + Source Sans 3)
│   ├── base.css                        ← Minimal reset (box-sizing, body defaults)
│   ├── colors.css                      ← All color tokens — palette + semantic aliases
│   ├── typography.css                  ← Font families, size scale, weights, leading, tracking
│   ├── spacing.css                     ← Spacing scale, border-radius tokens
│   └── effects.css                     ← Shadows, transitions, focus ring, z-index, opacity
│
├── assets/
│   └── logo/
│       ├── sophia-iso.svg              ← Geometric owl isotype (100×100 viewBox)
│       └── sophia-favicon.svg          ← Simplified favicon/app icon (32×32 viewBox)
│
├── guidelines/                         ← Foundation specimen cards (Design System tab)
│   ├── brand-logo.card.html           ← Logo variants, logotype, favicon, on-dark
│   ├── colors-brand.card.html         ← Terracotta · Olive · Gold palettes with tints
│   ├── colors-neutral.card.html       ← Paper, card, ink scale
│   ├── typography-display.card.html   ← Fraunces specimens at all weights and sizes
│   ├── typography-body.card.html      ← Source Sans 3 specimens
│   ├── typography-pairing.card.html   ← Fraunces + Source Sans 3 paired example
│   ├── spacing-scale.card.html        ← Spacing tokens + border radius specimens
│   └── effects.card.html              ← Shadow levels + transition presets
│
├── components/
│   ├── core/
│   │   ├── Button.jsx/.d.ts/.prompt.md    ← Primary/secondary/ghost/text buttons
│   │   ├── Badge.jsx/.d.ts/.prompt.md     ← Theme/period/resource/neutral badges
│   │   ├── Avatar.jsx/.d.ts/.prompt.md    ← Circular avatar with initials fallback
│   │   └── core.card.html                 ← Component showcase card
│   ├── display/
│   │   ├── Card.jsx/.d.ts/.prompt.md      ← Base card container (default/elevated/flat/interactive)
│   │   └── display.card.html
│   └── forms/
│       ├── Input.jsx/.d.ts/.prompt.md     ← Text input with label, icon, error states
│       └── forms.card.html
│
└── ui_kits/
    └── sophia-app/
        └── index.html                     ← Interactive sophIA prototype (Biblioteca, Línea de tiempo,
                                             Temas, Tareas) — click-through with search + filters
```

---

*Font note: Fraunces and Source Sans 3 are served from Google Fonts CDN. For offline/bundled use, download the WOFF2 files and replace the @import in `tokens/fonts.css` with local `@font-face` declarations.*
