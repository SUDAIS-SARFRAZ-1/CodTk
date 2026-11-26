import Link from "next/link";
import { ServiceCard } from "@/components/codtk/ServiceCard";
import { SvIcon } from "@/components/services/icons";
import { SERVICE_OFFERINGS } from "@/lib/service-offerings";

// "What do you need?" (founder, 2026-11-26): every service as a rounded card in its own colour, each
// opening its page, and a last card for visitors who aren't sure yet.
export function Needs() {
  return (
    <section className="ctk-sec" data-section="needs" aria-labelledby="need-t">
      <div className="ctk-wrap">
        <h2 id="need-t" className="ctk-h2 ctk-needs__h">
          What do you need?
        </h2>
        <ul className="ctk-needs">
          {SERVICE_OFFERINGS.map((s) => (
            <li key={s.id}>
              <ServiceCard service={s} />
            </li>
          ))}
          <li className="ctk-needs__other">
            <Link href="/contact" className="ctk-svc__card sv-tone--consulting">
              <SvIcon name="consulting" />
              <span className="ctk-svc__text">
                <b>Not sure yet? Talk to us</b>
                <small>Tell us the problem and we&apos;ll suggest the right fix.</small>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
