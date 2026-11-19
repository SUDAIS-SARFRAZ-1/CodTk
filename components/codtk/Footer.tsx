import Image from "next/image";
import Link from "next/link";
import { FooterSpotlight } from "@/components/codtk/FooterSpotlight";
import { SocialIcons } from "@/components/codtk/SocialIcons";
import {
  BUSINESS_EMAIL,
  LOCATION,
  ONE_LINER,
  REACH,
  SIGN_OFF,
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

// Site footer (prd.md §6.9): navigation, every contact route once, social and WhatsApp icons,
// legal links. Behind it, the CodTK logo sits faint and static
// (FooterSpotlight).
export function Footer() {
  const contact: FootLink[] = [
    { label: BUSINESS_EMAIL, href: `mailto:${BUSINESS_EMAIL}` },
    { label: WHATSAPP_NUMBER_DISPLAY, href: `tel:+${WHATSAPP_NUMBER_E164}` },
  ];

  return (
    <footer className="ctk-foot" data-theme="dark">
      <FooterSpotlight />
      <div className="ctk-wrap">
        <div className="ctk-foot__top">
          <div>
            <Image className="ctk-foot__mark" src="/brand/mark.png" alt="CodTK" width={720} height={379} sizes="120px" />
            <p className="ctk-sm" style={{ marginTop: 20, maxWidth: "24em" }}>
              {ONE_LINER}
            </p>
            <SocialIcons />
          </div>
          <div className="ctk-foot__cols">
            <Col title="Company" items={COMPANY} />
            <Col
              title="Services"
              items={SERVICE_OFFERINGS.map((s) => ({ label: s.title, href: `/services#${s.id}` }))}
            />
            <div>
              <Col title="Contact" items={contact} />
              <p className="ctk-foot__where">
                {LOCATION} · PKT (UTC+5)
                <br />
                {REACH}
              </p>
            </div>
          </div>
        </div>
        <div className="ctk-foot__legal">
          <p>
            © {new Date().getFullYear()} CodTK · {SIGN_OFF} · {BUSINESS_EMAIL} · {WHATSAPP_NUMBER_DISPLAY}
          </p>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
