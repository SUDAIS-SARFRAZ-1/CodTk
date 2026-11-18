import type { Metadata } from "next";
import { BUSINESS_EMAIL, SOCIAL_LINKS } from "@/lib/contact";
import { SITE_DESCRIPTION } from "@/lib/seo";
import { Hero } from "@/components/codtk/Hero";
import { Architecture } from "@/components/codtk/Architecture";
import { DeliveryStage } from "@/components/codtk/DeliveryStage";
import { Marquee, Statement } from "@/components/codtk/ScrollType";
import { TechStrip } from "@/components/codtk/TechStrip";
import { ServiceStack } from "@/components/codtk/ServiceStack";
import { StartingPoint } from "@/components/codtk/StartingPoint";
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

// Section order from the CodTK design system's Home page. Its Delivery Standard, Stats and
// Testimonials sections are left out until the PRD supplies real figures and quotes (rules.md §1).
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
      <Architecture />
      <DeliveryStage />
      <Marquee />
      <Statement />
      <ServiceStack />
      <StartingPoint />
      <Why />
      <CaseShowcase />
      <Faq />
      <CtaBanner />
    </>
  );
}
