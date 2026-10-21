import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { TECH_LOGOS } from "@/lib/tech-stack";

// CodTK design-system primitives (Button, ArrowLink, eyebrow, section header, chips, icons, circuit net).

const ICONS = {
  arrow: <path d="M4 10h12M11 5l5 5-5 5" />,
  ur: <path d="M6 14 14 6M7.5 6H14v6.5" />,
  check: <path d="m4.5 10.5 3.5 3.5 7.5-8" />,
  alert: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6.5v4M10 13.5v.01" />
    </>
  ),
  cal: (
    <>
      <rect x="3.5" y="4.5" width="13" height="12" rx="1.5" />
      <path d="M3.5 8.5h13M7 3v3M13 3v3" />
    </>
  ),
};

export function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg className="ctk-i" viewBox="0 0 20 20" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

// Single-colour tech logo mask from public/tech/ (Simple Icons). Unknown names render nothing.
export function TechIcon({ name }: { name: string }) {
  const logo = TECH_LOGOS.find((t) => t.name === name);
  if (!logo) return null;
  return (
    <i
      className="ctk-ti"
      style={{ "--i": `url(/tech/${logo.file}.svg)`, "--c": logo.color } as CSSProperties}
      aria-hidden="true"
    />
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  icon?: boolean;
  block?: boolean;
  magnetic?: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
};

export function Btn({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = true,
  block,
  magnetic,
  external,
  className = "",
  onClick,
}: BtnProps) {
  const cls = `ctk-btn ctk-btn--${variant}${size === "sm" ? " ctk-btn--sm" : ""}${block ? " ctk-btn--block" : ""} ${className}`;
  const inner = (
    <>
      {children}
      {icon && <Icon name="arrow" />}
    </>
  );
  const btn = external ? (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {inner}
    </a>
  ) : (
    <Link className={cls} href={href} onClick={onClick}>
      {inner}
    </Link>
  );
  return magnetic ? (
    <span className="ctk-mag" data-magnetic>
      {btn}
    </span>
  ) : (
    btn
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="ctk-link" href={href}>
      {children}
      <Icon name="ur" />
    </Link>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="ctk-eyebrow">{children}</p>;
}

// Reveal wrapper delay index: 80ms per step (MotionSpec `stagger`).
export const rv = (d = 0) => ({ className: "rv", "data-d": d });

export function SectionHead({
  eyebrow,
  title,
  intro,
  extra,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  extra?: ReactNode;
}) {
  return (
    <div className={`ctk-head${intro ? " ctk-head--split" : ""}`}>
      <div {...rv(0)}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2 className="ctk-d2 rv" data-d={1}>
        {title}
      </h2>
      {intro && (
        <div className="rv" data-d={2}>
          <p className="ctk-p">{intro}</p>
          {extra}
        </div>
      )}
    </div>
  );
}

// Circuit traces drawn in behind a section (design system net()): `n` seeded polylines that draw on
// reveal, each ending in a node. Same seeded sequence as the system, so layouts match its previews.
export function Net({ seed, n = 4 }: { seed: number; n?: number }) {
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const traces = Array.from({ length: n }, () => {
    let x = Math.round(rnd() * 100);
    let y = Math.round(rnd() * 100);
    let d = `M${x} ${y}`;
    for (let j = 0; j < 3; j++) {
      if (j % 2) y = Math.max(2, Math.min(98, y + Math.round((rnd() - 0.5) * 60)));
      else x = Math.max(2, Math.min(98, x + Math.round((rnd() - 0.5) * 50)));
      d += ` L${x} ${y}`;
    }
    return { d, end: `M${x} ${y}h0` };
  });
  return (
    <svg className="ctk-net rv" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {traces.map((t) => (
        <path key={t.d} d={t.d} pathLength={1} vectorEffect="non-scaling-stroke" />
      ))}
      {traces.map((t, k) => (
        <path key={t.end + k} className={k % 2 ? "node c" : "node"} d={t.end} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

// Inner-page hero (design system pageHero): ~/codtk/<crumb> breadcrumb, the page's one h1, intro.
export function PageHero({
  crumb,
  title,
  intro,
  tone = "hero",
  seed = 3,
}: {
  crumb: string;
  title: ReactNode;
  intro: ReactNode;
  tone?: string;
  seed?: number;
}) {
  return (
    <section className="ctk-phero" data-tone={tone} data-section={crumb.toLowerCase()}>
      <Net seed={seed} n={5} />
      <div className="ctk-wrap">
        <div className="ctk-g">
          <div className="l-7">
            <p className="ctk-crumb rv">
              <Link href="/">~/codtk</Link>
              <span aria-hidden="true">/</span>
              <span>{crumb.toLowerCase()}</span>
            </p>
            <h1 className="ctk-d1 ctk-d1--page rv" data-d={1}>
              {title}
            </h1>
          </div>
          <div className="l-s8 ctk-phero__intro rv" data-d={2}>
            <p className="ctk-lead">{intro}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="ctk-chips">
      {items.map((t) => (
        <li key={t} className="ctk-chip">
          <TechIcon name={t} />
          {t}
        </li>
      ))}
    </ul>
  );
}
