import type { Metadata } from "next";
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

// Section order from the CodTK design system's Home page. Its Delivery Standard, Stats and
// Testimonials sections are left out until the PRD supplies real figures and quotes (rules.md §1).
export default function Home() {
  return (
    <>
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
