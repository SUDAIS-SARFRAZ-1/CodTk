import type { CSSProperties } from "react";
import { ArrowLink, Btn } from "@/components/codtk/primitives";
import { ServiceExample } from "@/components/codtk/ServiceExamples";
import { quoteHref, SERVICE_OFFERINGS } from "@/lib/service-offerings";
import { SERVICE_DETAILS } from "@/lib/services";

// Home services (design system ServiceStack): black cards that tilt in, stick, and shrink as the
// next card covers them. Each pairs the service with an everyday example of what it produces.
export function ServiceStack() {
  const total = String(SERVICE_OFFERINGS.length).padStart(2, "0");
  return (
    <section className="ctk-sec" data-tone="services" data-section="services" aria-labelledby="svc-t">
      <div className="ctk-wrap">
        <div className="ctk-head ctk-head--split">
          <p className="ctk-kicker rv">Services</p>
          <h2 id="svc-t" className="ctk-h2 rv" data-d={1}>
            Seven services, shown the way <span className="ctk-em">you would use them</span>.
          </h2>
          <div className="rv" data-d={2}>
            <p className="ctk-p">
              Each card shows an everyday example of what we build. Start with one service or combine several.
            </p>
            <div style={{ marginTop: 20 }}>
              <ArrowLink href="/services">All services</ArrowLink>
            </div>
          </div>
        </div>
        <div className="ctk-stack">
          {SERVICE_OFFERINGS.map((s, i) => {
            const d = SERVICE_DETAILS[s.id];
            return (
              <article
                key={s.id}
                className="ctk-scard"
                style={{ "--i": i } as CSSProperties}
                data-stack
                data-scrub
                data-theme="dark"
              >
                <span className="ctk-scard__low" aria-hidden="true" />
                <div className="ctk-scard__copy">
                  <p className="ctk-scard__num">
                    {String(i + 1).padStart(2, "0")} <i /> {total}
                  </p>
                  <h3>{s.title}</h3>
                  <p className="ctk-p">{d.blurb}</p>
                  <p className="ctk-scard__built">{d.built}</p>
                  <Btn href={quoteHref(s.title)} className="ctk-scard__cta">
                    {d.cta}
                  </Btn>
                </div>
                <ServiceExample id={s.id} label={d.example} />
                <div className="ctk-scard__shade" data-shade />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
