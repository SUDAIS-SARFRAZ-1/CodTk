import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondary-inverse";
type Size = "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full text-center text-sm font-semibold transition-colors duration-150 ease-brand disabled:cursor-not-allowed disabled:opacity-60";

// Outline button on a raised surface.
const SECONDARY = "glass text-foreground hover:border-muted-foreground hover:bg-white";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand text-brand-foreground hover:bg-brand-dark",
  secondary: SECONDARY,
  // Same as secondary; kept so existing call sites stay valid.
  "secondary-inverse": SECONDARY,
};

const SIZES: Record<Size, string> = {
  md: "px-5 py-2",
  lg: "px-6 py-3",
};

type StyleProps = { variant?: Variant; size?: Size; className?: string };

function buttonClasses({ variant = "primary", size = "lg", className = "" }: StyleProps) {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
}

export function Button({ variant, size, className, ...props }: ComponentProps<"button"> & StyleProps) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />;
}

type ButtonLinkProps = StyleProps & {
  href: string;
  children: ReactNode;
  // Opens in a new tab with safe rel attributes (WhatsApp, booking, external demos).
  external?: boolean;
  onClick?: () => void;
};

export function ButtonLink({ href, external, variant, size, className, children, onClick }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
