import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { IconBadge } from "@/components/ui/IconBadge";

export type Service = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
};

// Heroicons (outline) paths, keyed by service slug.
const ICON_PATHS: Record<string, string> = {
  "web-application-development":
    "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25",
  "mobile-application-development":
    "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
  "backend-api-development":
    "M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z",
  "cloud-devops-solutions":
    "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z",
  "business-process-automation":
    "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99",
  "custom-software-consulting":
    "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
};

export function ServiceCard({ service }: { service: Service }) {
  const iconPath = ICON_PATHS[service.slug];

  return (
    <div
      id={service.slug}
      className="flex scroll-mt-24 flex-col rounded-xl border border-border bg-background p-6 transition-colors duration-150 hover:border-brand"
    >
      {iconPath && <IconBadge path={iconPath} />}
      <h3 className="mt-4 text-lg font-semibold text-foreground">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {service.tech.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
      <Link
        href={`/contact?service=${encodeURIComponent(service.title)}`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark"
      >
        Request a Quote<span className="sr-only"> for {service.title}</span> →
      </Link>
    </div>
  );
}
