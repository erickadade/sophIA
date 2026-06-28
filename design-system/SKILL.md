---
name: sophia-design
description: Use this skill to generate well-branded interfaces and assets for sophIA, a philosophy education platform for secondary school students and teachers. Contains essential design guidelines, color system, typography, fonts, logo assets, reusable UI components, and an interactive UI kit prototype.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Key resources:
- `readme.md` — brand overview, content tone, visual foundations, iconography, file index
- `styles.css` + `tokens/` — all CSS custom properties (link `styles.css` to consume)
- `assets/logo/` — SVG isotype and favicon
- `components/` — Button, Badge, Avatar, Card, Input (JSX + TypeScript interfaces)
- `ui_kits/sophia-app/index.html` — interactive prototype of the full sophIA app

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and create static HTML files that link `styles.css` for tokens. If working on production code, read the component interfaces and token files to match the exact brand.

If the user invokes this skill without other guidance, ask what they want to build or design, ask focused questions about the surface (student-facing or teacher-facing? mobile or desktop? which section of the app?), and act as an expert designer who outputs HTML artifacts _or_ production code depending on the need.

Design principles to always apply:
- Warm paper background (#f6f1e7), never pure white
- Fraunces serif for all headings and titles
- Source Sans 3 for all body and UI text
- Terracotta (#af4d34) for primary actions and brand wordmark "IA" suffix
- Olive (#5c6b46) for philosophical theme tags
- Gold (#b8893f) for historical period labels
- Argentine informal register (voseo): "Explorá", "Enviá", never "Explore", "Envíe"
- Gentle shadows (warm-tinted), subtle radius (not rounded-2xl), no bouncy animations
