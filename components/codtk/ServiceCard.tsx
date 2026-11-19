import Link from "next/link";
import { Icon } from "@/components/codtk/primitives";
import { SvIcon } from "@/components/services/icons";
import type { ServiceOffering } from "@/lib/service-offerings";
import { SERVICE_LINES } from "@/lib/services";
import { serviceHref } from "@/lib/service-seo";

// One service as a colour-tinted card (tone from sv-tone--*) linking to its own page. Used by the
// home services section and the "Related services" row on each service page.
export function ServiceCard({ service: s }: { service: Pick<ServiceOffering, "id" | "title"> }) {
  return (
    <Link href={serviceHref(s.id)} className={`ctk-svc__card sv-tone--${s.id}`}>
      <SvIcon name={s.id} />
      <span className="ctk-svc__text">
        <b>{s.title}</b>
        <small>{SERVICE_LINES[s.id]}</small>
      </span>
      <span className="ctk-svc__go" aria-hidden="true">
        <Icon name="ur" />
      </span>
    </Link>
  );
}
