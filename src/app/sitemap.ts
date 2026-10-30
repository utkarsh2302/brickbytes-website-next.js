import { MetadataRoute } from "next";
import { founders } from "@/components/AboutPage";
import { SITE_URL } from "@/lib/seo";

// Listed so image search links the founder photos to /about and its names.
const founderPhotos = founders.flatMap((founder) => (founder.photo ? [`${SITE_URL}${founder.photo}`] : []));

// No lastModified: a build timestamp marks every page as changed on every
// deploy, and Google ignores lastmod values that are not accurate.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/technology", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/how-it-works", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/about", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/3d-plot-viewer", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/plot-booking-software", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/plot-inventory-management-software", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/broker-portal", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/plotted-developments", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/villa-communities", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/apartment-projects", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/jaipur", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/interactive-plot-map-vs-pdf", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/layout-plan-to-interactive-map", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/privacy", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/terms", changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    ...(route.path === "/about" && { images: founderPhotos }),
  }));
}
