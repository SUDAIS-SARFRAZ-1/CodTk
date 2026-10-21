import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://codtk.com";

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
