// Asks IndexNow (Bing and the other engines that share it) to re-crawl every
// page in the live sitemap. Runs after each production deploy from
// .github/workflows/indexnow.yml; run it by hand with `node scripts/indexnow.mjs`.
//
// The key is public by design: IndexNow checks that
// https://brickbytes.in/<key>.txt contains it, to confirm we own the site.
// To rotate it, rename public/<key>.txt and update KEY to match.
const SITE_URL = "https://brickbytes.in";
const KEY = "6d4ee465cb45f51683f3dbe16381ea8f";

const sitemapResponse = await fetch(`${SITE_URL}/sitemap.xml`);
if (!sitemapResponse.ok) {
  throw new Error(`Could not read the sitemap: HTTP ${sitemapResponse.status}`);
}
const sitemap = await sitemapResponse.text();
// Page URLs only: image entries are <image:loc>, which this doesn't match.
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  }),
});
if (!response.ok) {
  throw new Error(`IndexNow rejected the submission: HTTP ${response.status} ${await response.text()}`);
}
console.log(`IndexNow accepted ${urlList.length} URLs (HTTP ${response.status}).`);
