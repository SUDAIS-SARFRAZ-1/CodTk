"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Btn, Icon } from "@/components/codtk/primitives";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Logo() {
  return (
    <span className="ctk-logo">
      <Image src="/brand/mark.png" alt="" width={57} height={30} priority />
      <Image src="/brand/wordmark.png" alt="CodTK" width={84} height={13} priority />
    </span>
  );
}

// Fixed glass pill, always visible; firms up once scrolled.
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href);
  const close = () => setOpen(false);
  const cls = `ctk-nav${scrolled || open ? " is-scrolled" : ""}${open ? " is-open" : ""}`;

  return (
    <header className={cls}>
      <div className="ctk-nav__pill">
      <div className="ctk-nav__in">
        <Link href="/" className="ctk-nav__brand" aria-label="CodTK home" onClick={close}>
          <Logo />
        </Link>
        <nav className="ctk-nav__links" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Btn href="/contact" size="sm" className="ctk-nav__cta">
          Get a Quote
        </Btn>
        <button
          className="ctk-nav__menu"
          type="button"
          aria-expanded={open}
          aria-controls="ctk-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="ctk-sr">{open ? "Close menu" : "Menu"}</span>
        </button>
      </div>
      <div className="ctk-nav__panel" id="ctk-menu">
        {NAV.map((n, i) => (
          <Link
            key={n.href}
            className="ctk-nav__big"
            style={{ animationDelay: `${i * 40}ms` }}
            href={n.href}
            aria-current={isActive(n.href) ? "page" : undefined}
            onClick={close}
          >
            {n.label}
            <Icon name="arrow" />
          </Link>
        ))}
        <Btn href="/contact" block onClick={close}>
          Get a Quote
        </Btn>
      </div>
      </div>
    </header>
  );
}
