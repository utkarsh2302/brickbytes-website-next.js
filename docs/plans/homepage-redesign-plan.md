# Homepage redesign plan

Date: 2026-11-14. Branch: `feat/homepage-3d`.

## Why

The homepage is 16,206 px tall (about 28 screens on a laptop) and has 16 sections. Most of that length repeats itself:

| Message | Said by |
|---|---|
| "Paper and calls → live map" | Problem, Transformation, SalesComparison (the phrase "Scattered information" appears in two of them) |
| "One platform for map, brokers, developers" | ProductEcosystem, FeaturesBento, ProductShowcase |
| "Why us / trust us" | WhyBrickBytes, Trust, About |

The page is also flat: almost nothing responds to the visitor except the live map demo.

## Requirements

1. **Shorter:** 16 sections → 8, about half the current height. No product claim is lost: each removed section's content either merges into a remaining one or already has its own page.
2. **3D hero:** a real 3D plotted township (WebGL, three.js through `@react-three/fiber`). Plots sit on a ground plane with roads, a clubhouse and trees in the brand colours. The camera starts top-down, like a layout plan, and tilts into a perspective view as the page loads and as the visitor scrolls: the product story (paper plan → live 3D map) told in one moment. Hovering or tapping a plot lifts it and shows its size, facing and price; the visitor can drag to orbit.
3. **Fluid motion, used with restraint:** one scroll-linked "before → after" sequence, a sticky product section whose panels change as you scroll, and responses to the visitor's own actions. No fade-up on every section.
4. **Responsive:** works from 360 px phones up; the 3D scene uses touch on phones; no horizontal scroll.
5. **No SEO or speed loss:** these are acceptance criteria, below.

## New page order

| # | Section | Made from |
|---|---|---|
| 1 | Hero: headline, lead, CTAs, the 3D township; client logos as a strip at its foot | BrandHero, ClientLogos |
| 2 | Live map demo (unchanged: it's the product) | LiveMapDemo |
| 3 | "Selling on paper → selling live": one scroll-linked section, the left column's pains turn into the right column's answers as you scroll | Problem, Transformation, SalesComparison |
| 4 | Platform: sticky left column (For buyers / For brokers / For developers, each linking to its feature page), panels on the right switch as you scroll; the plot filter/status demo becomes the developer panel | ProductEcosystem, FeaturesBento, ProductShowcase |
| 5 | How it works (3 steps, kept: it is a real sequence) + use-case cards linking to the plots / villas / apartments pages | HowItWorks, UseCases |
| 6 | Why BrickBytes: four reasons plus the three data-ownership points, with a link to /about | WhyBrickBytes, Trust, About |
| 7 | FAQ (answers stay in the HTML) | FAQ |
| 8 | Final CTA | FinalCTA |

Removed components are deleted, not left unused. `About`'s mission and vision already live on `/about`.

## Technical approach

- **3D loads after the page paints.** The scene is a client component loaded with `next/dynamic` (`ssr: false`) once the browser is idle, so the headline stays the LCP element. Until then, and permanently for `prefers-reduced-motion`, small screens without WebGL, or a failed load, the current product shot shows. Plot data comes from the existing `samplePlots` in `SitePlan.tsx`, not a new copy.
- **The scene renders only while visible** (`frameloop="demand"` + an IntersectionObserver), caps the pixel ratio at 2, and uses simple geometry (boxes and cones, no model files), so it stays light on phones.
- **New dependencies:** `three`, `@react-three/fiber` (about 170 KB gzipped, loaded only on the homepage, after paint). Motion uses the installed `framer-motion` (`useScroll`, `useTransform`). No smooth-scroll library.
- Brand rules hold: Paper/Stone/Sand surfaces, Byte Orange accent, Survey Navy only in the logo.

## Acceptance criteria

- Homepage height ≤ about 8,500 px at 1280 px wide; 8 sections.
- Lighthouse mobile on the production build: Performance ≥ 90, SEO 100, Accessibility 100; LCP < 2.5 s, CLS < 0.1. The LCP element is the headline, not the canvas.
- Title, description, H1 and JSON-LD unchanged. Every internal link the old homepage had to a product, feature or solution page is still there.
- The 3D scene can be used with touch, has an accessible text alternative (the plot list), and is replaced by the static shot with reduced motion.
- No console errors; `npm run lint`, `npx tsc --noEmit`, `npm test` and `npm run build` pass. Checked in a browser at 375, 768 and 1280 px.

## Steps (one commit each)

1. Merge and delete sections (2–8 of the new order), no new motion yet. Measure height.
2. 3D hero scene with the static fallback and lazy loading. Measure LCP.
3. Scroll-linked before/after section and sticky platform section.
4. Responsive and accessibility pass, Lighthouse, browser check at three widths.

## Result (2026-11-15)

| Check | Before | After |
|---|---|---|
| Homepage height at 1440 px | 16,206 px, 16 sections | 10,492 px, 10 sections (hero, logo strip, live map, paper → live, platform, how it works, use cases, why, FAQ, CTA) |
| Words on the page | 2,277 | 1,724 (repeated copy removed) |
| Title, description, H1, JSON-LD, internal links | | Identical to the live site |
| Lighthouse mobile, local production build | Performance 92–93, LCP 3.2–3.4 s, TBT 0 ms | Performance 93–94, LCP 3.1–3.2 s, TBT 20 ms, CLS 0, Accessibility 100, SEO 100 |

Changes from the plan, and why:

- **Height** missed the ~8,500 px target: How it works and Use cases stayed separate (How it works is shared with `/how-it-works`, and the navbar links to `#use-cases`). Use-case cards lost their bullet lists instead; each solution page has them.
- **The interactive plot-status demo (ProductShowcase) was removed**, not merged: with the 3D hero and the live map demo it would have been the third interactive map. Its feature copy is in the platform cards.
- **The 3D model loads on the visitor's first scroll, touch, pointer move or key press**, not when the browser is idle. Loaded during page load it added about 4.5 s of blocked main thread on a throttled phone (Performance 61). It also renders on demand (only while something moves), with no idle animation.
- **LCP is over the 2.5 s budget on both versions**, so it isn't caused by this change (the live site measures 2.7 s on Vercel). The LCP element is the hero paragraph and the delay is render delay; worth its own investigation.
- Best practices scores 79 on both versions, because of the Meta Pixel's third-party cookie.

## Out of scope

- Inner pages (they keep `LandingPage`), the navbar and footer, copy rewrites beyond merging.
- 3D model files (glTF) or photoreal renders.
