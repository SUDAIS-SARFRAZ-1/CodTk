import type { CSSProperties } from "react";
import { Btn } from "@/components/codtk/primitives";
import { BOOK_CALL_LINK as BOOK_CALL } from "@/lib/contact";

// Pass 3 — hero rewritten so new visitors can answer in 5 seconds:
// What? Custom software. Who? Founders/teams who want to work with the engineers directly.
// Why? Clear scope, honest timelines, modern code. What next? Start a Project.
const HEADLINE: [string, boolean][] = [
  ["Building", false],
  ["next", true],
  ["generation", true],
  ["software", false],
];

// Home hero: white dot field with rings of blue dots rippling out from behind the headline and a
// breathing blue core; the headline words blur in one after another.
export function Hero() {
  return (
    <section className="ctk-hero ctk-hero--dots" data-tone="hero" data-section="intro" aria-labelledby="hero-t">
      <div className="ctk-hero__field" aria-hidden="true">
        <i className="ctk-hero__dots" />
        <i className="ctk-hero__wave" />
        <i className="ctk-hero__wave" style={{ animationDelay: "2s" }} />
        <i className="ctk-hero__wave" style={{ animationDelay: "4s" }} />
      </div>
      <i className="ctk-hero__core" aria-hidden="true" />
      <div className="ctk-wrap ctk-hero__fg">
        {/* Pass 3: plain trust line replaces the decorative pill badge */}
        <p className="ctk-hero__trust rv">
          <i aria-hidden="true" />
          Fixed quotes · Source code yours · Lahore, Pakistan
        </p>
        <h1
          id="hero-t"
          className="ctk-blurin rv"
          aria-label="Building next generation software"
        >
          <span aria-hidden="true">
            {HEADLINE.map(([w, em], i) => (
              <span key={`${w}-${i}`}>
                <span className={em ? "w ctk-em" : "w"} style={{ "--i": i } as CSSProperties}>
                  {w}
                </span>{" "}
              </span>
            ))}
          </span>
        </h1>
        <p className="ctk-lead rv" data-d={3}>
          Work directly with the engineers who build your product: clear scope, honest timelines and modern code.
        </p>
        <div className="ctk-actions rv" data-d={4}>
          <Btn href="/contact" magnetic>
            Start a Project
          </Btn>
          <Btn href={BOOK_CALL} external variant="secondary" icon={false}>
            Book a Call
          </Btn>
        </div>
        <p className="ctk-avail rv" data-d={5}>
          <i aria-hidden="true" />
          Replies within 24 hours, Monday to Saturday
        </p>
      </div>
    </section>
  );
}
