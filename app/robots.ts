import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// AI search and assistant crawlers are named explicitly so the policy is visible and easy to change.
// All are allowed (founder's brief: we want AI visibility) — TODO(owner): confirm, or move any of them
// to a Disallow rule. Only the form endpoint is blocked; /thank-you stays crawlable so its noindex is seen.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/contact/api" },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: "/contact/api" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
