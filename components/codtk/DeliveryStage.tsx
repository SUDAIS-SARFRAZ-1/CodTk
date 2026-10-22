import { ArrowLink } from "@/components/codtk/primitives";
import { StageTour } from "@/components/codtk/StageTour";

// "From architecture to production": a black card with the intro on the left and the delivery
// timeline (StageTour, the only client part) on the right. Working terms (NDA, code ownership,
// replies) live in Why, so they aren't repeated here.
export function DeliveryStage() {
  return (
    <section
      className="ctk-sec ctk-tour"
      data-theme="dark"
      data-tone="process"
      data-section="in production"
      aria-labelledby="tour-t"
    >
      <div className="ctk-wrap">
        <div className="ctk-tour__grid rv">
          <div className="ctk-tour__intro">
            <p className="ctk-kicker">From architecture to production</p>
            <h2 id="tour-t" className="ctk-h2">
              One team, from the first diagram to the <span className="ctk-em">last deploy</span>.
            </h2>
            <p className="ctk-p">
              Five clear stages with the same engineers throughout. At every point you know where your project is and
              what you get next.
            </p>
            <ArrowLink href="/process">See the full process</ArrowLink>
          </div>
          <StageTour />
        </div>
      </div>
    </section>
  );
}
