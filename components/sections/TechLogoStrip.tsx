import { TECH_LOGOS } from "@/lib/tech-stack";

// Logos are single-colour SVGs used as CSS masks, so they take our palette
// (grey, cobalt on hover) instead of each brand's own colours.
export function TechLogoStrip() {
  return (
    <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-5 lg:grid-cols-7">
      {TECH_LOGOS.map((logo) => (
        <li key={logo.file} className="group flex flex-col items-center gap-2 text-center">
          <span
            aria-hidden="true"
            className="block h-8 w-8 bg-muted-foreground transition-colors duration-150 group-hover:bg-brand"
            style={{
              maskImage: `url(/tech/${logo.file}.svg)`,
              WebkitMaskImage: `url(/tech/${logo.file}.svg)`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
          <span className="text-xs text-muted-foreground">
            {logo.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
