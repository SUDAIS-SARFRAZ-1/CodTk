import { Btn } from "@/components/codtk/primitives";
import { WHATSAPP_LINK } from "@/lib/contact";

// Closing call to action above the footer: a black card with an example of a first enquiry and
// CodTK's reply beside it (static). The example makes
// no promise about reply times; those are stated once, in the hero.
export function CtaBanner() {
  return (
    <section
      className="ctk-cta"
      data-section="start a project"
      aria-labelledby="cta-t"
    >
      <div className="ctk-cta__card" data-theme="dark">
        <span className="ctk-cta__low" aria-hidden="true" />
        <div className="ctk-cta__grid">
          <div className="ctk-cta__copy">
            <div className="ctk-cta__big">
              <h2
                id="cta-t"
              >
                <>Let’s build what’s next.</>
              </h2>
            </div>
            <p className="ctk-lead">
              Tell us what you’re building. We’ll come back with questions, an
              approach and a quote.
            </p>
            <div className="ctk-actions">
              <Btn href="/contact">
                Start a Project
              </Btn>
              <Btn href={WHATSAPP_LINK} variant="secondary" external>
                WhatsApp Us
              </Btn>
            </div>
          </div>

          <div className="ctk-chat" aria-hidden="true">
            <div className="ctk-chat__head">
              <span className="ctk-chat__avatar">CK</span>
              <span>
                <b>CodTK</b>
                <small>New project enquiry</small>
              </span>
            </div>
            <div className="ctk-chat__body">
              <p className="ctk-chat__msg ctk-chat__me">
                Hi CodTK, I have an idea for an online course platform. Students
                sign up, watch lessons and get a certificate. Can you help?
              </p>
              <span className="ctk-chat__msg ctk-chat__sent">Sent</span>
              <div className="ctk-chat__reply">
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
