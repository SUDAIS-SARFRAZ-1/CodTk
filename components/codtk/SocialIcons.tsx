import type { CSSProperties } from "react";
import { SOCIAL_LINKS, WHATSAPP_LINK } from "@/lib/contact";

// Icon links to every live CodTK profile, then WhatsApp (founder's brief, 2026-11-19). Profiles
// without a URL are skipped. Used in the footer and on the Contact page.
const LINKS = [
  ...SOCIAL_LINKS.filter((s) => s.url),
  { name: "WhatsApp", icon: "whatsapp", url: WHATSAPP_LINK, color: "var(--whatsapp)" },
];

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <ul className={`ctk-social ${className}`}>
      {LINKS.map((s) => (
        <li key={s.name}>
          <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`CodTK on ${s.name}`}>
            <i style={{ "--i": `url(/social/${s.icon}.svg)`, "--c": s.color } as CSSProperties} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
