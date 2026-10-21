import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article";
  tone?: "default" | "muted";
  // Hover depth for cards that are (or contain) a primary link.
  interactive?: boolean;
};

const TONES = {
  default: "",
  muted: "bg-muted",
};

export function Card({ as: Tag = "div", tone = "default", interactive = false, className = "", ...props }: CardProps) {
  const hover = interactive
    ? "transition-[border-color,box-shadow] duration-150 ease-brand hover:border-brand/40 hover:shadow-card-hover"
    : "";
  return (
    <Tag
      className={`glass rounded-card text-foreground shadow-card ${TONES[tone]} ${hover} ${className}`}
      {...props}
    />
  );
}
