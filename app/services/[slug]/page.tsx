import { TechReveal } from "@/components/codtk/TechReveal";
import { TypedCommand } from "@/components/services/TypedCommand";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLink, Btn, Chips, Icon, PageHero, SectionHead } from "@/components/codtk/primitives";
import { CtaBanner } from "@/components/codtk/CtaBanner";
import { Faq, type FaqItem } from "@/components/codtk/Faq";
import { JsonLd } from "@/components/codtk/JsonLd";
import { ServiceCard } from "@/components/codtk/ServiceCard";
import { PROCESS_STEPS } from "@/lib/process";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { quoteHref, SERVICE_OFFERINGS } from "@/lib/service-offerings";
import { SERVICE_SEO, serviceHref } from "@/lib/service-seo";

// Shared answers, worded as on the home FAQ and in Why CodTK.
const SHARED_FAQS: FaqItem[] = [
  {
    question: "How much does it cost?",
    answer: "Every project is priced on its scope. Tell us what you need and we'll send you a quote.",
    plainText: "Every project is priced on its scope. Tell us what you need and we'll send you a quote.",
  },
  {
    question: "Do I own the source code?",
    answer: "Yes. Once it's paid for, the code and everything we built are yours.",
    plainText: "Yes. You get the full source code and IP after payment.",
  },
];

type Props = { params: Promise<{ slug: string }> };

const bySlug = (slug: string) => SERVICE_OFFERINGS.find((s) => SERVICE_SEO[s.id].slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_OFFERINGS.map((s) => ({ slug: SERVICE_SEO[s.id].slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = bySlug((await params).slug);
  if (!s) return {};
  const seo = SERVICE_SEO[s.id];
  return pageMetadata(serviceHref(s.id), seo.title, seo.description);
}

// One page per service (the topic cluster under /services): the existing service copy plus who it
// is for, the delivery process, FAQs and related services, with Service, FAQPage and breadcrumb data.
export default async function ServicePage({ params }: Props) {
  const s = bySlug((await params).slug);
  if (!s) notFound();
  const seo = SERVICE_SEO[s.id];
  const path = serviceHref(s.id);
  const related = SERVICE_OFFERINGS.filter((o) => o.group === s.group && o.id !== s.id);
  const faqs: FaqItem[] = [...seo.faqs.map((f) => ({ ...f, plainText: f.answer })), ...SHARED_FAQS];

  return (
    <div className="sv-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          serviceType: seo.keyword,
          description: s.description,
          url: `${SITE_URL}${path}`,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: "Worldwide",
        }}
      />
      <PageHero
        crumb={s.title}
        path={path}
        parent={{ name: "Services", path: "/services" }}
        titleClassName="sv-h1"
        title={<>{seo.h1}</>}
        intro={s.description}
        actions={
          <>
            <Btn href={quoteHref(s.title)}>Discuss This Service</Btn>
            <ArrowLink href="/services">All services</ArrowLink>
          </>
        }
      />

      {/* One line of copy: no bottom padding, so it reads as the lead-in to "What's included". */}
      <section className="ctk-sec sv-sec" data-section="who it's for" aria-labelledby="for-h" style={{ paddingBottom: 0 }}>
        <div className="ctk-wrap">
          <SectionHead id="for-h" titleClassName="sv-h2" title={`${s.title}: who it's for`} intro={seo.audience} />
        </div>
      </section>

      <section className="ctk-sec sv-sec" data-section="what's included" aria-labelledby="inc-h">
        <div className="ctk-wrap">
          <SectionHead id="inc-h" titleClassName="sv-h2" title={`What's included in ${s.title}`} />
          <ul className="ctk-ticks ctk-ticks--2 sv-ticks">
            {s.deliverables.map((d) => (
              <li key={d} >
                <Icon name="check" />
                {d}
              </li>
            ))}
          </ul>
          <div className="sv-sub--tech">
            <TechReveal label="See the technologies">
              <TypedCommand cmd={s.cmd} />
              <div className="sv-tech">
                <Chips items={s.tech} brand />
              </div>
            </TechReveal>
          </div>
        </div>
      </section>

      <section className="ctk-sec sv-sec cf-where" data-section="how we work" aria-labelledby="how-h">
        <div className="ctk-wrap">
          <SectionHead id="how-h" titleClassName="sv-h2" title="How we work" />
          <ol className="cf-list">
            {PROCESS_STEPS.map((p) => (
              <li key={p.title}>
                <b>{p.title}</b>
                {p.description}
              </li>
            ))}
          </ol>
          <div style={{ marginTop: 24 }}>
            <ArrowLink href="/process">The process in detail</ArrowLink>
          </div>
        </div>
      </section>

      <Faq items={faqs} />

      {related.length > 0 && (
        <section className="ctk-sec sv-sec" data-section="related services" aria-labelledby="rel-h">
          <div className="ctk-wrap">
            <SectionHead id="rel-h" titleClassName="sv-h2" title="Related services" />
            <ul className="ctk-svc">
              {related.map((r) => (
                <li key={r.id}>
                  <ServiceCard service={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBanner />
    </div>
  );
}
