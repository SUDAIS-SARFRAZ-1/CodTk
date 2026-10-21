import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/seo";

const PAGES = ["", "/services", "/tech-stack", "/portfolio", "/about", "/process", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...PAGES, ...PROJECTS.map((p) => `/portfolio/${p.slug}`)].map((path) => ({ url: `${SITE_URL}${path}` }));
}
