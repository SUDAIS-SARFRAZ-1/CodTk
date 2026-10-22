import Link from "next/link";
import { Btn } from "@/components/codtk/primitives";

// Next.js App Router custom 404: renders whenever notFound() is called or a route isn't matched.
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 var(--gutter-mobile, 24px)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "var(--blue-400)",
          marginBottom: 16,
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(36px, 6cqi, 72px)",
          lineHeight: 1.05,
          letterSpacing: "-.04em",
          color: "var(--ink-100)",
          maxWidth: "14ch",
          margin: "0 auto 24px",
        }}
      >
        This page doesn&apos;t exist.
      </h1>
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.6,
          color: "var(--ink-200)",
          maxWidth: "36em",
          marginBottom: 40,
        }}
      >
        The page you&apos;re looking for may have moved, or the URL may be wrong.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Btn href="/">Go to Home</Btn>
        <Btn href="/contact" variant="secondary">
          Contact Us
        </Btn>
      </div>
      <nav
        aria-label="Main pages"
        style={{
          marginTop: 56,
          display: "flex",
          gap: "12px 32px",
          flexWrap: "wrap",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
        }}
      >
        {[
          { label: "Services", href: "/services" },
          { label: "Work", href: "/portfolio" },
          { label: "About", href: "/about" },
          { label: "Process", href: "/process" },
          { label: "Tech Stack", href: "/tech-stack" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{ color: "var(--ink-300)", transition: "color 150ms" }}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
