import Link from "next/link";
import Image from "next/image";
import {
  BUSINESS_EMAIL,
  LOCATION,
  SOCIAL_LINKS,
  WHATSAPP_LINK,
  WHATSAPP_NUMBER_DISPLAY,
} from "@/lib/contact";
import { SERVICES } from "@/lib/services";

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tech-stack", label: "Tech Stack" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

const linkClass = "text-sm text-background/70 transition-colors duration-150 hover:text-background";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = SOCIAL_LINKS.filter((social) => social.url);

  return (
    <footer className="border-t border-background/10 bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-mark.png" alt="" width={28} height={28} />
              <span className="text-base font-semibold tracking-tight">AptiScript Technologies</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-background/70">
              Building Next Generation Software — a full-service software house for web, mobile,
              backend, and cloud.
            </p>
            {socials.length > 0 && (
              <ul className="mt-5 flex gap-3">
                {socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`AptiScript on ${social.name} (opens in new tab)`}
                      className="group flex h-9 w-9 items-center justify-center rounded-full border border-background/20 transition-colors duration-150 hover:border-background"
                    >
                      <span
                        aria-hidden="true"
                        className="block h-4 w-4 bg-background/70 transition-colors duration-150 group-hover:bg-background"
                        style={{
                          maskImage: `url(/social/${social.name.toLowerCase()}.svg)`,
                          WebkitMaskImage: `url(/social/${social.name.toLowerCase()}.svg)`,
                          maskSize: "contain",
                          WebkitMaskSize: "contain",
                          maskRepeat: "no-repeat",
                          WebkitMaskRepeat: "no-repeat",
                        }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold">Services</h2>
            <ul className="mt-3 space-y-2">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services#${service.slug}`} className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Company</h2>
            <ul className="mt-3 space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Get in Touch</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={`mailto:${BUSINESS_EMAIL}`} className={`${linkClass} break-all`}>
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {WHATSAPP_NUMBER_DISPLAY} (WhatsApp)
                </a>
              </li>
              <li className="text-sm text-background/70">{LOCATION}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-background/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-background/60">
            &copy; {year} AptiScript Technologies. All rights reserved.
          </p>
          <ul className="flex gap-4">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-background/60 hover:text-background">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
