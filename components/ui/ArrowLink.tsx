import Link from "next/link";
import type { ReactNode } from "react";

// Secondary text link with a trailing arrow ("View all services →"). Uses the
// surface-aware accent token, so it stays legible on light and dark sections.
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1 text-sm font-semibold text-accent underline-offset-4 hover:underline ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-150 ease-brand group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}
