import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://codtk.com";

// Founder's brief, 2026-11-19.
export const SITE_TITLE = "CodTK | Building Next Generation Software";
export const SITE_DESCRIPTION =
  "Software and digital growth company in Lahore, Pakistan: web and mobile apps, SaaS, custom ERP, AI automation, cloud, SEO and performance marketing.";
export const EXTENDED_TAGLINE = "Building Next Generation Software: web, mobile, ERP, AI, cloud & digital growth.";

// BreadcrumbList for an inner page; Home is always the first step. URLs are absolute on SITE_URL.
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.path === "/" ? SITE_URL : `${SITE_URL}${t.path}`,
    })),
  };
}

// Title, description, canonical and Open Graph for one page (rules.md §28, §31). `title` is the full
// search title ("Keyword | CodTK", under 60 characters); the layout's "%s — CodTK" template is bypassed. A page's openGraph
// replaces the root layout's rather than merging, so it is set in full here,
// including the image app/opengraph-image.tsx would otherwise supply.
export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "CodTK",
      url: path,
      title,
      description,
      images: "/opengraph-image",
    },
  };
}
