import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// No lastModified: a build timestamp marks every page as changed on every
// deploy, and Google ignores lastmod values that are not accurate.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/technology", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/how-it-works", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/about", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/privacy", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/terms", changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
