import Link from "next/link";
import { serviceHref } from "@/lib/service-seo";

// "What do you need?" as large ruled rows (founder, 2026-11-26): visitors pick a goal, not a
// service name, and each row opens the one page that answers it.
const NEEDS: { label: string; line: string; href: string }[] = [
  { label: "A website", line: "Business websites and custom web apps.", href: serviceHref("web") },
  { label: "A mobile app", line: "Apps for Android and iPhone.", href: serviceHref("mobile") },
  { label: "Software to run my business", line: "One system for your stock, sales, staff and accounts.", href: serviceHref("erp") },
  { label: "More customers online", line: "Get found on Google by the clients you want.", href: serviceHref("seo") },
  { label: "Less manual work", line: "Connect your tools and cut repetitive work.", href: serviceHref("ai") },
  { label: "Not sure yet?", line: "Tell us the problem and we'll suggest the right fix.", href: "/contact" },
];

export function NeedRows() {
  return (
    <section className="ctk-sec" data-section="needs" aria-labelledby="need-t">
      <div className="ctk-wrap ctk-split">
        <h2 id="need-t" className="ctk-split__label">
          What do you need?
        </h2>
        <ul className="ctk-needs">
          {NEEDS.map((n) => (
            <li key={n.label}>
              <Link href={n.href}>
                <b>{n.label}</b>
                <span>{n.line}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
