import { ArrowLink } from "@/components/codtk/primitives";
import { ServiceCard } from "@/components/codtk/ServiceCard";
import { SERVICE_GROUPS, SERVICE_OFFERINGS } from "@/lib/service-offerings";

const pad = (n: number) => String(n).padStart(2, "0");

// Home services: the twelve services in their three groups, one plain line each, each card linking
// to its own service page. Each group has a label column (number, name, count) beside its
// cards; each card carries its service colour (sv-tone--*). Hover is CSS only: lift, tinted
// border and shadow, sliding arrow, and an accent line along the bottom.
export function ServiceStack() {
  return (
    <section className="ctk-sec" data-section="services" aria-labelledby="svc-t">
      <div className="ctk-wrap">
        <div className="ctk-head ctk-head--split">
          <p className="ctk-kicker rv">Services</p>
          <h2 id="svc-t" className="ctk-h2 rv" data-d={1}>
            What we can <span className="ctk-em">do for you</span>.
          </h2>
          <div className="rv" data-d={2}>
            <p className="ctk-p">Start with one service or combine several. Tap any service to see what it includes.</p>
            <div style={{ marginTop: 20 }}>
              <ArrowLink href="/services">All services</ArrowLink>
            </div>
          </div>
        </div>
        {SERVICE_GROUPS.map((g, gi) => {
          const items = SERVICE_OFFERINGS.filter((s) => s.group === g);
          return (
            <div key={g} className="ctk-svc-g rv">
              <div className="ctk-svc-g__head">
                <span className="ctk-svc-g__n">{pad(gi + 1)}</span>
                <h3>{g}</h3>
                <span className="ctk-svc-g__count">
                  {items.length} {items.length === 1 ? "service" : "services"}
                </span>
              </div>
              <ul className="ctk-svc">
                {items.map((s) => (
                  <li key={s.id}>
                    <ServiceCard service={s} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
