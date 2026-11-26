"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Btn } from "@/components/codtk/primitives";

// No "Services" here: visitors choose what they need on Home (founder, 2026-11-26); the full list stays
// in the footer.
const NAV = [
  { href: "/portfolio", label: "Our Work" },
  { href: "/process", label: "How We Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Logo() {
  return (
    <span className="ctk-logo">
      <Image src="/brand/mark.png" alt="CodTK logo" width={57} height={30} priority />
      <Image src="/brand/wordmark.png" alt="CodTK" width={84} height={13} priority />
    </span>
  );
}

// Fixed glass pill, always visible; firms up once scrolled. Below 1024px it shows only the centred
// logo, and the bottom tab bar (TabBar.tsx) carries the navigation.
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className={`ctk-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="ctk-nav__pill">
        <div className="ctk-nav__in">
          <Link href="/" className="ctk-nav__brand" aria-label="CodTK home">
            <Logo />
          </Link>
          <nav className="ctk-nav__links" aria-label="Primary">
            {NAV.map((x) => (
              <Link key={x.href} href={x.href} aria-current={isActive(x.href) ? "page" : undefined}>
                {x.label}
              </Link>
            ))}
          </nav>
          <Btn href="/contact" size="sm" className="ctk-nav__cta">
            Get a Quote
          </Btn>
        </div>
      </div>
    </header>
  );
}
