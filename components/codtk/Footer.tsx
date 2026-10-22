import Image from "next/image";
import Link from "next/link";
import { FooterSpotlight } from "@/components/codtk/FooterSpotlight";
import {
  BUSINESS_EMAIL,
  LOCATION,
  SOCIAL_LINKS,
  WHATSAPP_LINK,
  WHATSAPP_NUMBER_DISPLAY,
  WHATSAPP_NUMBER_E164,
} from "@/lib/contact";
import { SERVICE_OFFERINGS } from "@/lib/service-offerings";

type FootLink = { label: string; href: string; external?: boolean };

const COMPANY: FootLink[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Tech Stack", href: "/tech-stack" },
  { label: "Contact", href: "/contact" },
];

function Col({ title, items }: { title: string; items: FootLink[] }) {
  return (
    <div>
      <p className="ctk-foot__h">{title}</p>
      <ul>
        {items.map((x) => (
          <li key={x.label}>
            {x.external ? (
              <a href={x.href} target="_blank" rel="noopener noreferrer">
                {x.label}
              </a>
            ) : (
              <Link href={x.href}>{x.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Site footer (prd.md §6.9): navigation, every contact route once, social links once their URLs
// exist, legal links. Behind it, the CodTK logo sits faint and a spotlight follows the pointer
// (FooterSpotlight, the only client part).
export function Footer() {
  // Social accounts stay hidden until their real URLs are added in lib/contact.ts.
  const contact: FootLink[] = [
    { label: BUSINESS_EMAIL, href: `mailto:${BUSINESS_EMAIL}` },
    { label: "WhatsApp", href: WHATSAPP_LINK, external: true },
    { label: WHATSAPP_NUMBER_DISPLAY, href: `tel:+${WHATSAPP_NUMBER_E164}` },
    ...SOCIAL_LINKS.filter((s) => s.url).map((s) => ({ label: s.name, href: s.url, external: true })),
  ];

  return (
    <footer className="ctk-foot" data-theme="dark">
      <FooterSpotlight />
      <div className="ctk-wrap">
        <div className="ctk-foot__top">
          <div>
            <Image className="ctk-foot__mark" src="/brand/mark.png" alt="CodTK" width={720} height={379} sizes="120px" />
            <p className="ctk-sm" style={{ marginTop: 20, maxWidth: "24em" }}>
              Web, mobile, backend and cloud software, built in Lahore for clients in Pakistan and abroad.
            </p>
          </div>
          <div className="ctk-foot__cols">
            <Col title="Company" items={COMPANY} />
            <Col
              title="Services"
              items={SERVICE_OFFERINGS.map((s) => ({ label: s.title, href: `/services#${s.id}` }))}
            />
            <div>
              <Col title="Contact" items={contact} />
              <p className="ctk-foot__where">{LOCATION} · PKT (UTC+5)</p>
            </div>
          </div>
        </div>
        <div className="ctk-foot__legal">
          <p>© {new Date().getFullYear()} CodTK. All rights reserved.</p>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
