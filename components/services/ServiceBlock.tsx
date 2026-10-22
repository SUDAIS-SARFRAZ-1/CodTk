import { Btn, Chips, Icon } from "@/components/codtk/primitives";
import { SvIcon } from "@/components/services/icons";
import { TypedCommand } from "@/components/services/TypedCommand";
import { quoteHref, type ServiceOffering } from "@/lib/service-offerings";

// One service: number, title, description, CLI line and CTA on the left; deliverables and tech on
// the right. Parts reveal in order (number and title, copy, deliverables, then chips).
export function ServiceBlock({ service, index, total }: { service: ServiceOffering; index: number; total: number }) {
  const n = (i: number) => String(i + 1).padStart(2, "0");
  let d = 0;
  const rv = () => ({ className: "rv", "data-d": Math.min(d++, 12) });
  return (
    <article className={`sv-block sv-tone--${service.id}`} id={service.id} aria-labelledby={`${service.id}-h`}>
      <div>
        <div className="sv-block__top rv" data-d={d++}>
          <SvIcon name={service.id} size="lg" />
          <p className="sv-block__n">
            {n(index)} / {String(total).padStart(2, "0")} <span>· {service.tag}</span>
          </p>
        </div>
        <h2 className="sv-h3 rv" data-d={d++} id={`${service.id}-h`}>
          {service.title}
        </h2>
        <p className="sv-body rv" data-d={d++}>
          {service.description}
        </p>
        <div {...rv()}>
          <TypedCommand cmd={service.cmd} />
        </div>
        <div className="sv-block__cta rv" data-d={d++}>
          <Btn href={quoteHref(service.title)} variant="secondary" size="sm">
            Discuss This Service<span className="ctk-sr"> ({service.title})</span>
          </Btn>
        </div>
      </div>
      <div>
        <h3 className="sv-sub rv" data-d={d++}>
          Key deliverables
        </h3>
        <ul className="ctk-ticks ctk-ticks--2 sv-ticks">
          {service.deliverables.map((item) => (
            <li key={item} {...rv()}>
              <Icon name="check" />
              {item}
            </li>
          ))}
        </ul>
        <h3 className="sv-sub sv-sub--tech rv" data-d={d++}>
          Technologies
        </h3>
        <div className="sv-tech rv" data-d={Math.min(d++, 12)}>
          <Chips items={service.tech} brand />
        </div>
      </div>
    </article>
  );
}
