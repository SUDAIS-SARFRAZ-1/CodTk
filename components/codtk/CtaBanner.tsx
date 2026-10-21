import type { CSSProperties } from "react";
import { Btn } from "@/components/codtk/primitives";
import { WHATSAPP_LINK } from "@/lib/contact";

// Headline words blur in one after another (as the hero's), the em words in blue serif.
const WORDS: [string, boolean][] = [
  ["Let’s", false],
  ["build", false],
  ["what’s", true],
  ["next.", true],
];

// Closing call to action above the footer: a black card whose headline scales up as it scrolls in
// (--p), with a looping example of a first enquiry and CodTK's reply beside it. The example makes
// no promise about reply times; those are stated once, in the hero.
export function CtaBanner() {
  return (
    <section
      className="ctk-cta"
      data-scrub
      data-tone="contact"
      data-section="start a project"
      aria-labelledby="cta-t"
    >
      <div className="ctk-cta__card" data-theme="dark">
        <span className="ctk-cta__glow" aria-hidden="true" />
        <span className="ctk-cta__low" aria-hidden="true" />
        <div className="ctk-cta__grid">
          <div className="ctk-cta__copy">
            <p className="ctk-kicker rv">Start a project</p>
            <div className="ctk-cta__big">
              <h2
                id="cta-t"
                className="ctk-blurin rv"
                data-d={1}
                aria-label="Let’s build what’s next."
              >
                <span aria-hidden="true">
                  {WORDS.map(([w, em], i) => (
                    <span key={w}>
                      <span
                        className={em ? "w ctk-em" : "w"}
                        style={{ "--i": i } as CSSProperties}
                      >
                        {w}
                      </span>{" "}
                    </span>
                  ))}
                </span>
              </h2>
            </div>
            <p className="ctk-lead rv" data-d={3}>
              Tell us what you’re building. We’ll come back with questions, an
              approach and a quote.
            </p>
            <div className="ctk-actions rv" data-d={4}>
              <Btn href="/contact" magnetic>
                Start a Project
              </Btn>
              <Btn href={WHATSAPP_LINK} variant="secondary" external>
                WhatsApp Us
              </Btn>
            </div>
          </div>

          <div className="ctk-chat rv" data-d={3} aria-hidden="true">
            <div className="ctk-chat__head">
              <span className="ctk-chat__avatar">CK</span>
              <span>
                <b>CodTK</b>
                <small>
                  <i />
                  New project enquiry
                </small>
              </span>
            </div>
            <div className="ctk-chat__body">
              <p className="ctk-chat__msg ctk-chat__me">
                Hi CodTK, I have an idea for an online course platform. Students
                sign up, watch lessons and get a certificate. Can you help?
              </p>
              <span className="ctk-chat__msg ctk-chat__sent">Sent</span>
              <div className="ctk-chat__reply">
                <span className="ctk-chat__msg ctk-chat__dots">
                  <i />
                  <i />
                  <i />
                </span>
                <div className="ctk-chat__msg ctk-chat__them">
                  Thanks, sounds great. A few quick questions so we can suggest
                  an approach:
                  <ol>
                    <li>Web only, or a mobile app too?</li>
                    <li>Will courses be free or paid?</li>
                    <li>Do you have designs yet?</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="ctk-chat__foot">
              <span>Describe your project…</span>
              <i>
                <svg viewBox="0 0 24 24">
                  <path d="M4 12l16-8-6 16-2-6z" />
                </svg>
              </i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
