import { TechIcon } from "@/components/codtk/primitives";
import { TECH_LOGOS } from "@/lib/tech-stack";

// Slow marquee of the stack the team actually uses (lib/tech-stack.ts). The row is doubled so the
// loop is seamless; the copy is hidden from assistive tech.
export function TechStrip() {
  const names = TECH_LOGOS.map((t) => t.name);
  return (
    <div className="ctk-wrap" style={{ zIndex: 1 }}>
      <div className="ctk-strip">
        <p className="ctk-sr">{names.join(", ")}</p>
        <div className="ctk-strip__track" aria-hidden="true">
          <div className="ctk-strip__row">
            {[...names, ...names].map((n, i) => (
              <span key={i}>
                <TechIcon name={n} />
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
