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

## Needs an owner decision (visible copy)

1. **Homepage H1** ("Transform flat layouts into digital sales experiences.") names no search topic. Option: lead with "interactive master plan" or "plot inventory" wording, or use the brand tagline "Every plot, in plain sight."
2. **Brand voice conflicts.** The hero says "AI-powered", "luxury township" and "premium". Brand Guidelines v2.1 (p. 5) says "Grounded, not flashy proptech" and lists "AI-powered revolution" under Don't.
3. **Contact H1** ("Let's build something extraordinary") is generic. Option: "Book a BrickBytes demo".
4. **The same FAQ block appears on `/`, `/how-it-works` and `/contact`.** Give each page questions about its own topic.
5. **"Solutions" is only an anchor (`/#use-cases`).** Separate pages for plotted developments, villa communities and apartment projects would each target their own searches.

## Needs an owner action (off-site)

1. Verify the domain in Google Search Console and Bing Webmaster Tools, then submit `/sitemap.xml`.
2. Confirm that `x.com/brickbytes` and `linkedin.com/company/brickbytes` belong to BrickBytes. They are in the Organization `sameAs`. If they don't, remove them from `src/lib/seo.ts`. If they do, link them in the footer.
3. Create a Google Business Profile for the Jaipur office (C-3, 8-B Shri Ram Nagar, Mansarovar).

## Out of scope / not recommended

- FAQPage schema: Google retired FAQ rich results on 2026-05-07.
- `llms.txt`: Google Search ignores it. Optional later.
- Meta keywords, changefreq/priority tuning: ignored by Google.

## Low priority

- Footer column titles are `h4` right after page `h2`s, which skips a heading level.
- The site orange `#ff5e13` is close to, but not the same as, brand Byte Orange `#FF5A1F`.
