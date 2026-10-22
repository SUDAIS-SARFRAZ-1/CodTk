import type { ReactNode } from "react";
import { IconTile } from "@/components/codtk/primitives";
import type { EngagementIcon, ServiceTone, StandardIcon } from "@/lib/service-offerings";

// Colour line icons for the Services page. Each sits on a tinted tile; the colour comes from the
// `sv-tone--*` class (app/codtk.css), never from the component.
type IconName = ServiceTone | EngagementIcon | StandardIcon;

const PATHS: Record<IconName, ReactNode> = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M7 13h6M7 16h10" />
    </>
  ),
  mobile: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3M9.5 7h5M9.5 10h3" />
    </>
  ),
  saas: <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" />,
  ai: (
    <path d="M11 3.5l1.9 5.1L18 10.5l-5.1 1.9L11 17.5l-1.9-5.1L4 10.5l5.1-1.9ZM18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z" />
  ),
  api: <path d="m8 6-5 6 5 6M16 6l5 6-5 6M13.5 4l-3 16" />,
  cloud: <path d="M7 19h10a4.2 4.2 0 0 0 .7-8.35A6 6 0 0 0 6 9.4 4.8 4.8 0 0 0 7 19ZM12 12v4M10 14l2-2 2 2" />,
  consulting: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  fixed: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.3" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="17" cy="9" r="2.6" />
      <path d="M3 19c.6-3.3 3-5 6-5s5.4 1.7 6 5M16.5 14.2c2.4.2 4 1.7 4.5 4.3" />
    </>
  ),
  support: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="m5.6 5.6 3.7 3.7M14.7 14.7l3.7 3.7M18.4 5.6l-3.7 3.7M9.3 14.7l-3.7 3.7" />
    </>
  ),
  tests: <path d="M9 3h6M10 3v6L4.8 18.2A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-2.8L14 9V3M7.5 15h9" />,
  review: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M6 8.5v7M18 15.5V9a3 3 0 0 0-3-3h-4M13 4l-2 2 2 2" />
    </>
  ),
  monitor: <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />,
  docs: <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v16H6.5A1.5 1.5 0 0 0 5 20.5v-16ZM5 20.5A1.5 1.5 0 0 0 6.5 22H19M9 8h6M9 11h4" />,
  shield: <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6L12 3ZM9 12l2.2 2.2L15.5 10" />,
  a11y: (
    <>
      <circle cx="12" cy="4.8" r="1.8" />
      <path d="M5 8.5c2.3.7 4.6 1 7 1s4.7-.3 7-1M12 9.5V14m0 0-3 7m3-7 3 7" />
    </>
  ),
};

// Which tone each non-service icon takes.
const TONE: Partial<Record<IconName, ServiceTone>> = {
  fixed: "web",
  team: "cloud",
  support: "api",
  tests: "api",
  review: "mobile",
  monitor: "cloud",
  docs: "ai",
  shield: "consulting",
  a11y: "web",
};

export function SvIcon({ name, size = "md" }: { name: IconName; size?: "xs" | "md" | "lg" }) {
  const tone = TONE[name] ?? (name as ServiceTone);
  return (
    <IconTile className={`sv-ic sv-ic--${size} sv-tone--${tone}`}>{PATHS[name]}</IconTile>
  );
}
