# SEO plan: brickbytes.in

Audit date: 2026-10-29. Method: the claude-seo audit checklist (technical, on-page, schema, images, AI search), applied to the codebase and a local production build. No search-data tools were connected, so keyword volumes and rankings were not measured.

## Done (branch `feat/seo-foundation`)

| Area | Change | How to check |
|---|---|---|
| Duplicate host | `www.brickbytes.in` returned 200 with a full copy of the site. It now 308-redirects to `brickbytes.in` (`next.config.ts`). | `curl -I https://www.brickbytes.in/about` returns 308 |
| Titles | Keyword first, brand last, unique, 41–59 characters. They used to be `BrickBytes \| About Us`. | View source on each page |
| Descriptions | Rewritten to match page content and the brand positioning, 157–160 characters. Removed "Luxury" from the homepage description. | View source |
| Social image | A branded 1200×630 card (`src/app/opengraph-image.tsx`, built at build time, 219 KB, under WhatsApp's ~300 KB preview limit). It replaces a 755 KB JPEG that was served as `image/png`. | Paste a URL into WhatsApp or LinkedIn |
| Structured data | Organization (legal name, logo, address, GSTIN, sales contact) and WebSite in one JSON-LD graph, in `src/lib/seo.ts` | Google Rich Results Test |
| Locale | `lang="en-IN"`, `og:locale=en_IN` | View source |
| Sitemap | Removed `lastModified: new Date()`, which marked every page as changed on every deploy | `/sitemap.xml` |
| Headers | `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` | `curl -I https://brickbytes.in` |
| Images | Drone render: 1.2 MB JPEG named `.png` → 295 KB WebP. Deleted the unused villa render. | Hero → Drone View |

Already correct before this work: SSR/static rendering, canonicals, robots.txt, a 404 page with a real 404 status and `noindex`, HTTPS + HSTS, one H1 per page.

## Live-site audit (2026-10-30)

An audit of the deployed site found the technical base sound (Lighthouse mobile: SEO 100, Performance 97–99), but:

- No brickbytes.in page appeared in web search, even for "BrickBytes". An unrelated LEGO extension, "Brick.Bytes", owns that name in results.
- The site had 5 content pages. Its main phrase, "interactive master plan", collides with government city master plans (Jaipur Master Plan, JDA). Competitors target "plot layout software", "plot booking software", "3D plot viewer" and "plot inventory management software".
- The SEO benchmark competitor, Plotex (plotex.in), has 84 indexed URLs: keyword product pages, comparison pages, a Jaipur page and about 45 blog posts.

## Done (branch `feat/seo-fixes`)

| Area | Change | How to check |
|---|---|---|
| Keywords | Home title "Interactive Plot Maps for Real Estate Developers"; `/technology` targets "plot layout software" (title and H1); "interactive plot map" in the site description and hero lead. The home H1 stays the brand statement (brand plan decision). | View source |
| New pages | 10 topic pages in `src/app/(topics)/`, all built on `LandingPage`: `/3d-plot-viewer`, `/plot-booking-software`, `/plot-inventory-management-software`, `/broker-portal`, `/plotted-developments`, `/villa-communities`, `/apartment-projects`, `/jaipur`, `/interactive-plot-map-vs-pdf`, `/layout-plan-to-interactive-map`. Copy only uses product claims already made elsewhere on the site. | `/sitemap.xml` lists 17 URLs |
| Internal links | Footer lists every page; the use-case cards on `/` link to their solution pages; `/technology` sections link to the product pages. | Click through |
| FAQs | `FAQ` takes `items`. `/how-it-works`, `/contact` and each topic page have their own questions; no question repeats across pages. | Compare pages |
| Structured data | `JsonLd` component. BreadcrumbList on every inner page, Service on product and solution pages, Article on the guide, Person for the founders on `/about`. Removed unconfirmed `sameAs` profiles (`www.linkedin.com/company/brickbytes` returned 404). | Google Rich Results Test |
| Home LCP | The decorative hero shapes are an inline SVG instead of an `<img>`, so they are no longer the LCP element (it was 2.6s on mobile, with 1.7s of render delay); the hero text is LCP now. | Lighthouse → LCP element |
| Accessibility | Primary buttons use ink text on Byte Orange (5.6:1; white was 3.1:1). The showcase plots' accessible names start with their visible text. Lighthouse accessibility is 100 on the pages tested. | Lighthouse |
| Markup | The sales comparison renders once (it was duplicated for mobile and desktop). Footer column labels and a demo plot label are no longer headings. | View source |
| Small fixes | `/favicon.ico` (was 404). Fuller descriptions on `/privacy` and `/terms`. | `curl -I /favicon.ico` |
| Founder identity | AI answers showed other people with the founders' common names. Each founder now has a profile page (`/team/<slug>`, ProfilePage schema) whose Person `@id` is shared by `/about`, with `sameAs` to their LinkedIn, descriptive photo alt text and their photo in the sitemap; the Organization names them as `founder`. Founder data lives in `src/lib/founders.ts`. Target searches are name + BrickBytes/Jaipur (the bare name "Utkarsh Sharma" belongs to a film actor). Bios state only company facts until the founders supply personal ones; never mention their university. | Rich Results Test on `/team/utkarsh-sharma` |
| Guides | `/how-to-sell-plots-online`, `/stop-double-booking-plots`, `/choose-plot-booking-software` and `/plotted-development-marketing` (Article schema), chosen where search results had no developer-focused answer. All guides are listed on `/guides` (ItemList schema) and in the footer. | `/sitemap.xml` lists 22 URLs |
| Plot calculator | `/how-many-plots-in-one-acre` targets "how many plots in 1 acre", where results were only unit converters. A live calculator (land, plot size in sq yd, share sold as plots) and a plots-per-acre table, both from `estimatePlotYield` in `src/lib/plot-yield.ts` (tested, `npm test`). It states no regulatory figures: local rules differ, so readers are told to check them. | `/sitemap.xml` lists 25 URLs |
| Positioning | The founders confirmed (2026-10-31) that BrickBytes builds custom real estate software, not only plot maps. New hub `/custom-real-estate-software` (nav, footer, hero link) targets "custom real estate software"; the homepage title is "Real Estate Software & Interactive Plot Maps"; `/jaipur` targets "real estate software company in Jaipur". Site description, share image and listing-kit descriptions updated to match. | `/sitemap.xml` lists 26 URLs |
| IndexNow | `public/<key>.txt` plus `scripts/indexnow.mjs`; `.github/workflows/indexnow.yml` submits the sitemap's URLs after each successful production deploy, so Bing (and the AI answers built on it) re-crawls within hours. | Actions tab → IndexNow run after a deploy |

## Needs an owner action (off-site)

1. ~~Verify the domain in Google Search Console and Bing Webmaster Tools.~~ Done 2026-10-30: Domain property verified (TXT record in Vercel DNS), sitemap submitted as `https://brickbytes.in/sitemap.xml`, Bing imported from Search Console. Remaining: request indexing for the pages not yet requested (about 10 a day).
2. **Social profiles.** LinkedIn company page done (`LINKEDIN_URL` in `src/lib/contact.ts`: Organization `sameAs` and footer link). Add other profiles (e.g. X) the same way once they exist.
3. **Google Business Profile** and the other directory listings: details, descriptions and the order to do them in are in `docs/listing-kit.md`.
4. **Client case studies.** With each client's permission and real numbers (time to launch, bookings, fewer calls), add `/projects/<client>` pages. These need facts we don't have.
5. **Backlinks.** Ask each client to link "Interactive map by BrickBytes" from their project website. List BrickBytes on Capterra India, G2, SourceForge, IndiaMART, Startup India and Product Hunt.
6. **Pricing.** A pricing or "how pricing works" page would match how buyers search, but needs a pricing decision.
7. **Keep publishing** guides like `/layout-plan-to-interactive-map`, about two a month (e.g. selling plots online, broker management, RERA layout requirements).

## Out of scope / not recommended

- FAQPage schema: Google retired FAQ rich results on 2026-05-07.
- `llms.txt`: Google Search ignores it. Optional later.
- Meta keywords, changefreq/priority tuning: ignored by Google.
- Per-page share images: the shared card is on-brand; revisit if link previews matter more.
