# Brand refresh plan: BrickBytes v2.1 on brickbytes.in

Status: approved 2026-10-29 (brand-statement hero; re-skin + simplify; copy aligned to brand voice)

## Goal

Bring the whole site onto the BrickBytes v2.1 brand (Brand Guidelines v2.1, Oct 2026) with a clean, Google-like feel: lots of space, plain sentence-case copy, flat surfaces, little decorative motion. The homepage opens on the brand statement, **"Every plot, in plain sight."**

## Constraints from the owner

- **Navy kept to a minimum.** Survey Navy appears only in the logo's name. Where the guidelines show a navy hero or navy cards, use the Paper or Sand version of the same layout.
- **Clean, Google-like.** No glassmorphism, blur, gradient washes or decorative scroll animations. Motion only answers user actions, plus at most one hero entrance.
- **Clean, on-brand, modern, expensive-looking.** Fewer, larger elements and generous section spacing. Big headlines with tight tracking. Hairline borders and soft two-part shadows instead of heavy cards. One orange accent per screen. The brand's 3D glass render (the guidelines' "hero" finish, meant for the website) is the hero artwork.
- **A visitor understands exactly what we do.** Within one screen, a first-time visitor can say what BrickBytes is (a live, interactive map of a plotted project that buyers and brokers use to see and book plots), who it is for (plotted-land developers and their brokers), and what to do next (book a demo). The hero says it in plain words, three plain facts follow, then the working map demo. No jargon ("spatial engine", "sales engine", "HUD").

## Design tokens (from guidelines p. 16–18, 32)

| Token | Value | Use |
|---|---|---|
| `bb-paper` | `#F7F4EF` | Page background (≈50% of every screen) |
| `bb-stone` | `#ECE6DD` | Secondary surfaces, alternating sections |
| `bb-sand` | `#E6D3BC` | The plot shape, highlight fills |
| `bb-orange` | `#FF5A1F` | One primary action per screen, the pin. Never body text (2.8:1 on Paper). |
| `bb-kiln` | `#E2531C` | Only where shapes overlap |
| `ink` | `#1C1A17` | Headings and body text (replaces navy, per owner) |
| `bb-slate` | `#5A6272` | Secondary text (5.6:1 on Paper) |
| status | `#2E7A4E` / `#B7791F` / `#9AA0A8` | Available / On hold / Booked, only in product mock-ups |
| radius | 8px base; 16–24px for large cards | |

Type: **Plus Jakarta Sans** ExtraBold/SemiBold for headlines (tracking −3%), **Inter** Regular 16/26 for body, **DM Mono** only for plot facts (`PLOT C-47 · 1,800 SQ FT · EAST`). This replaces Lora, Geist and Geist Mono.

## Brand elements to build

1. **Glass-system shapes**: the symbol's own parts (plot, pin, circle) as big flat sheets, cropped off the edge. Overlaps are drawn in Kiln, with no gradients or blur. Faint dashed construction circles and the survey grid at 5–25% opacity.
2. **Brand icon set**: Plot, Pin, Home, Layout, Area, Facing (p. 22), replacing the generic Lucide icons where they describe plots.
3. **Plan illustration**: orthographic site plans with 1px lines and double-line roads. One plot is orange and carries the pin. Line colour is charcoal, not navy.
4. **Plot card**: a white card with plot facts in DM Mono, a status chip and one orange action, as on p. 26.

## Phases (each one: typecheck, lint, build, screenshots, commit)

1. **Foundation (site-wide):** fonts, tokens, Paper background, the orange swapped to Byte Orange, and greys swapped to brand neutrals. Serif italic headings become Plus Jakarta Sans. Glass blur and gradient utilities are removed.
2. **Homepage hero:** brand statement, big cropped symbol composition and plot card. The interactive subdivision map moves directly under the hero.
3. **Homepage sections:** simplify into clean blocks, swap in brand icons, cut scroll animations, and drop the off-brand gold, lime and sky accents.
4. **Inner pages:** Technology, How it works, About, Contact, plus the legal pages, 404 and error page, all on the same components.
5. **Copy pass:** remove "AI-powered", "luxury" and "premium" (Don't list, p. 5). Lead with plot facts.

## Acceptance criteria

- No `font-serif`, Lora or Geist left. Raw `#ff5e13` count is 0. No `backdrop-blur` or gradient classes in components.
- Navy (`#1F2B47`) appears only inside the logo SVG files.
- Body text meets 4.5:1 contrast on Paper. Orange is never used for body text.
- Lighthouse accessibility ≥ 95. CLS < 0.1. `prefers-reduced-motion` is respected.
- Every page checked at 390px and 1280px wide, with no console errors.

## Out of scope

The interactive map's logic, the contact form backend, new pages, and dark mode.
