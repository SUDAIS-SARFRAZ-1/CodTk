import { Btn } from "@/components/codtk/primitives";
import { BOOK_CALL_LINK as BOOK_CALL } from "@/lib/contact";

// Home hero: white dot field with three soft blue light patches drifting slowly behind the headline
// (CSS transform/opacity loops only; founder, 2026-11-19).
export function Hero() {
  return (
    <section className="ctk-hero ctk-hero--dots" data-section="intro" aria-labelledby="hero-t">
      <div className="ctk-hero__field" aria-hidden="true">
        <i className="ctk-hero__dots" />
      </div>
      <div className="ctk-hero__glows" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="ctk-wrap ctk-hero__fg">
        {/* Pass 3: plain trust line replaces the decorative pill badge */}
        <p className="ctk-hero__trust rv">
          <i aria-hidden="true" />
          Fixed quotes · Source code yours · Lahore, Pakistan
        </p>
        <h1
          id="hero-t"
          className="rv"
        >
          <>Building <span className="ctk-em">next generation</span> software</>
        </h1>
        <p className="ctk-lead rv" data-d={3}>
          Web, mobile, ERP, AI, cloud &amp; digital growth. Work directly with the engineers who build your product:
          clear scope, honest timelines and modern code.
        </p>
        <div className="ctk-actions rv" data-d={4}>
          <Btn href="/contact">
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
