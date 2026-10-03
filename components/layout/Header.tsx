"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SERVICES } from "@/lib/services";

const NAV_LINKS = [
  { href: "/tech-stack", label: "Tech Stack" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
];

const CTA = { href: "/contact", label: "Let's Talk" };

function navLinkClass(isActive: boolean) {
  return `text-sm font-medium transition-colors duration-150 hover:text-brand ${
    isActive ? "text-brand" : "text-foreground"
  }`;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Image src="/logo-mark.png" alt="AptiScript Technologies" width={32} height={32} priority />
          <span className="text-lg font-semibold tracking-tight">AptiScript</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          <div className="group relative">
            <Link
              href="/services"
              aria-haspopup="true"
              className={`flex items-center gap-1 ${navLinkClass(pathname === "/services")}`}
            >
              Services
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            {/* Opens on hover and on keyboard focus (Tab into it). */}
            <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="w-72 rounded-xl border border-border bg-background p-2 shadow-lg">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services#${service.slug}`}
                      className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted hover:text-brand focus-visible:bg-muted"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass(pathname === link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href={CTA.href}
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground transition-colors duration-150 hover:bg-brand-dark"
          >
            {CTA.label}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav id="mobile-nav" aria-label="Main" className="max-h-screen overflow-y-auto border-t border-border bg-background px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            <Link
              href="/services"
              onClick={closeMenu}
              className={`rounded-md px-2 py-2 text-sm font-medium ${
                pathname === "/services" ? "bg-muted text-brand" : "text-foreground"
              }`}
            >
              Services
            </Link>
            <ul className="mb-1 ml-2 border-l border-border pl-2">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    onClick={closeMenu}
                    className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-brand"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`rounded-md px-2 py-2 text-sm font-medium ${
                  pathname === link.href ? "bg-muted text-brand" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={CTA.href}
              onClick={closeMenu}
              className="mt-2 rounded-full bg-brand px-5 py-2 text-center text-sm font-semibold text-brand-foreground"
            >
              {CTA.label}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
