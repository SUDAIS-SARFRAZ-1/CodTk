"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Phone and tablet navigation (founder, 2026-11-26): a rounded bar fixed to the bottom of the screen,
// in thumb reach. Hidden from 1024px, where the top navbar shows the links. The logo at the top goes home.
const TABS: { href: string; label: string; icon: ReactNode }[] = [
  {
    href: "/services",
    label: "Services",
    icon: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
      </>
    ),
  },
  {
    href: "/portfolio",
    label: "Work",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2.5" />
        <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18" />
      </>
    ),
  },
  { href: "/process", label: "Process", icon: <path d="M3.5 19h5v-5h5V9h5V4M18.5 4h2v2" /> },
  {
    href: "/about",
    label: "About",
    icon: (
      <>
        <circle cx="9" cy="8.5" r="3.2" />
        <circle cx="17" cy="9.5" r="2.5" />
        <path d="M3 19.5c.6-3.2 3-4.9 6-4.9s5.4 1.7 6 4.9M16 14.6c2.5.1 4.2 1.6 4.8 4.4" />
      </>
    ),
  },
  { href: "/contact", label: "Contact", icon: <path d="M4 5.5h16v11H9.5L5 20v-3.5H4z" /> },
];

export function TabBar() {
  const pathname = usePathname();
  return (
    <nav className="ctk-tabs" aria-label="Primary">
      {TABS.map((t) => {
        const active = pathname.startsWith(t.href);
        return (
          <Link key={t.href} href={t.href} aria-current={active ? "page" : undefined}>
            <svg className="ctk-i" viewBox="0 0 24 24" aria-hidden="true">
              {t.icon}
            </svg>
            <span>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
