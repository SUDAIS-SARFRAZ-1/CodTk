import type { ReactNode } from "react";
import { ArrowLink } from "@/components/ui/ArrowLink";

type Tone = "default" | "muted" | "dark";
type Width = "prose" | "content" | "wide";

const TONES: Record<Tone, string> = {
  default: "text-foreground",
  muted: "bg-muted text-foreground",
  dark: "bg-muted text-foreground",
};

const WIDTHS: Record<Width, string> = {
  prose: "max-w-3xl",
  content: "max-w-4xl",
  wide: "max-w-6xl",
};

type SectionProps = {
  children: ReactNode;
  tone?: Tone;
  width?: Width;
  id?: string;
  className?: string;
};

// Consistent vertical rhythm and container for every page section (ui-ux-design.md §4).
export function Section({ children, tone = "default", width = "wide", id, className = "" }: SectionProps) {
  return (
    <section id={id} className={`${TONES[tone]} py-16 sm:py-24 ${className}`}>
      <div className={`mx-auto px-4 sm:px-6 ${WIDTHS[width]}`}>{children}</div>
    </section>
  );
}

type SectionHeaderProps = {
  title: string;
  as?: "h1" | "h2";
  eyebrow?: string;
  description?: ReactNode;
  action?: { href: string; label: string };
  align?: "left" | "center";
};

const TITLE_SIZES = {
  h1: "text-4xl sm:text-5xl",
  h2: "text-3xl sm:text-4xl",
};

export function SectionHeader({
  title,
  as: Heading = "h2",
  eyebrow,
  description,
  action,
  align = "left",
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-4 ${
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={`max-w-2xl ${centered ? "mx-auto" : ""}`}>
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
        )}
        <Heading className={`${eyebrow ? "mt-3" : ""} ${TITLE_SIZES[Heading]} font-bold tracking-tight`}>
          {title}
        </Heading>
        {description && <p className="mt-4 text-lg leading-relaxed text-subtle">{description}</p>}
      </div>
      {action && (
        <ArrowLink href={action.href} className="flex-none">
          {action.label}
        </ArrowLink>
      )}
    </div>
  );
}
