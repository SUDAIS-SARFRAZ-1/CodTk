import Link from "next/link";
import { Btn, Chips, Icon } from "@/components/codtk/primitives";
import { serviceHref } from "@/lib/service-seo";
import { SvIcon } from "@/components/services/icons";
import { TechReveal } from "@/components/codtk/TechReveal";
import { Included } from "@/components/services/Included";
import { TypedCommand } from "@/components/services/TypedCommand";
import { quoteHref, type ServiceOffering } from "@/lib/service-offerings";

// One service: number, title, description and CTA on the left; deliverables on the right, with the
// command line and tech behind a button. Parts reveal in order.
export function ServiceBlock({ service }: { service: ServiceOffering }) {
  return (
    <article className={`sv-block sv-tone--${service.id}`} id={service.id} aria-labelledby={`${service.id}-h`}>
      <div>
        <div className="sv-block__top">
          <SvIcon name={service.id} size="lg" />
        </div>
        <h2 className="sv-h3" id={`${service.id}-h`}>
          <Link href={serviceHref(service.id)}>{service.title}</Link>
        </h2>
        <p className="sv-body">
          {service.description}
        </p>
        <div className="sv-block__cta">
          <Btn href={quoteHref(service.title)} variant="secondary" size="sm">
            Discuss This Service<span className="ctk-sr"> ({service.title})</span>
          </Btn>
        </div>
      </div>
      <Included>
        <h3 className="sv-sub">
          Key deliverables
        </h3>
        <ul className="ctk-ticks ctk-ticks--2 sv-ticks">
          {service.deliverables.map((item) => (
            <li key={item}>
              <Icon name="check" />
              {item}
            </li>
          ))}
        </ul>
        <div className="sv-sub--tech">
          <TechReveal label="See the technologies">
            <TypedCommand cmd={service.cmd} />
            <div className="sv-tech">
              <Chips items={service.tech} brand />
            </div>
          </TechReveal>
        </div>
      </Included>
    </article>
  );
}
