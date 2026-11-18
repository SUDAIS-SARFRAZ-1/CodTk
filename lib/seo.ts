import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://codtk.com";

// Founder's brief, 2026-11-19.
export const SITE_TITLE = "CodTK | Building Next Generation Software";
export const SITE_DESCRIPTION =
  "Software and digital growth company in Lahore, Pakistan: web and mobile apps, SaaS, custom ERP, AI automation, cloud, SEO and performance marketing.";
export const EXTENDED_TAGLINE = "Building Next Generation Software: web, mobile, ERP, AI, cloud & digital growth.";

// Title, description, canonical and Open Graph for one page (rules.md §28, §31). A page's openGraph
// replaces the root layout's rather than merging, so it is set in full here,
// including the image app/opengraph-image.tsx would otherwise supply.
export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "CodTK",
      url: path,
      title: `${title} — CodTK`,
      description,
      images: "/opengraph-image",
    },
  };
}
