import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/seo";

const PAGES = ["", "/services", "/tech-stack", "/portfolio", "/about", "/process", "/contact", "/privacy", "/terms"];

const TODAY = new Date().toISOString().split("T")[0];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = PAGES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: TODAY,
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1.0 : 0.7,
  }));

  const projectEntries = PROJECTS.map((p) => ({
    url: `${SITE_URL}/portfolio/${p.slug}`,
    lastModified: TODAY,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...projectEntries];
}
