import type { Metadata } from "next";
import { BUSINESS_EMAIL, SOCIAL_LINKS } from "@/lib/contact";
import { SITE_DESCRIPTION } from "@/lib/seo";
import { Hero } from "@/components/codtk/Hero";
import { TechStrip } from "@/components/codtk/TechStrip";
import { Marquee } from "@/components/codtk/Marquee";
import { ServiceStack } from "@/components/codtk/ServiceStack";
import { Why } from "@/components/codtk/Why";
import { CaseShowcase } from "@/components/codtk/CaseShowcase";
import { Faq } from "@/components/codtk/Faq";
import { CtaBanner } from "@/components/codtk/CtaBanner";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Organization entity (founder's brief, 2026-11-19; prd.md FR-16).
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CodTK",
  url: "https://codtk.com",
  email: BUSINESS_EMAIL,
  telephone: "+92-314-6397321",
  foundingDate: "2026",
  description: SITE_DESCRIPTION,
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  sameAs: SOCIAL_LINKS.filter((s) => s.url).map((s) => s.url),
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CodTK",
  url: "https://codtk.com",
};

// Home keeps only what a first-time visitor needs (founder, 2026-11-19): who we are, what we do,
// why us, proof, answers and the next step. Detail lives on the inner pages.
export default function Home() {
  return (
    <>
      {/* Structured data — Organization and WebSite entity */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <Hero />
      <TechStrip />
      <ServiceStack />
      <Marquee />
      <Why />
      <CaseShowcase />
      <Faq />
      <CtaBanner />
    </>
  );
}
