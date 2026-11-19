import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/seo";

// Last real content change per page — update the date when a page changes, so lastmod stays truthful
// (search engines ignore lastmod that changes on every build).
const PAGES: Record<string, string> = {
  "": "2026-11-19",
  "/services": "2026-11-19",
  "/tech-stack": "2026-11-19",
  "/portfolio": "2026-11-19",
  "/about": "2026-11-19",
  "/process": "2026-11-19",
  "/contact": "2026-11-19",
  "/privacy": "2026-11-19",
  "/terms": "2026-11-19",
};
const PROJECTS_UPDATED = "2026-11-19";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = Object.entries(PAGES).map(([path, updated]) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updated,
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1.0 : 0.7,
  }));

  const projectEntries = PROJECTS.map((p) => ({
    url: `${SITE_URL}/portfolio/${p.slug}`,
    lastModified: PROJECTS_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...projectEntries];
}
