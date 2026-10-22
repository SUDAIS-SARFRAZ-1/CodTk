import { SectionHead, WindowBar } from "@/components/codtk/primitives";
import { SvIcon } from "@/components/services/icons";
import { ScoreRings } from "@/components/services/ScoreRings";
import { BUILD_CHECKLIST, LIGHTHOUSE_TARGETS } from "@/lib/service-offerings";

const REPO: [string, string?][] = [
  ["your-product/"],
  ["├── apps/"],
  ["│   ├── web/", "front end"],
  ["│   └── api/", "backend and API"],
  ["├── infra/"],
  ["│   └── terraform/", "infra as code"],
  ["├── .github/"],
  ["│   └── workflows/", "test, build, deploy"],
  ["├── tests/"],
  ["└── docs/", "runbooks, handover"],
];

// Delivery standard: Lighthouse targets (targets we build to, not past scores), the checklist every
// build ships with, and the shape of the repository we hand over.
export function DeliveryStandard() {
  return (
    <section className="ctk-sec sv-sec sv-std-sec" id="standard" aria-labelledby="sv-std-h">
      <div className="ctk-wrap">
        <SectionHead
          kicker
          eyebrow="Delivery standard"
          id="sv-std-h"
          titleClassName="sv-h2"
          title={
            <>
              What every build <span className="sv-b">ships with.</span>
            </>
          }
        />
        <div className="sv-std">
          <div className="sv-panel rv">
            <h3 className="sv-sub">Lighthouse targets we build to</h3>
            <ScoreRings targets={LIGHTHOUSE_TARGETS} />
            <p className="ctk-meta">Targets set for every launch, measured on the mobile profile.</p>
          </div>
          <div className="sv-panel rv" data-d={1}>
            <h3 className="sv-sub">Every build ships with</h3>
            <ul className="sv-checks">
              {BUILD_CHECKLIST.map((c) => (
                <li key={c.label}>
                  <SvIcon name={c.icon} />
                  {c.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="sv-repo rv" data-d={2} data-theme="dark">
            <WindowBar className="sv-repo__bar" title="Handover repository" />
            <pre aria-label="Example handover repository structure">
              {REPO.map(([path, note]) => (
                <span key={path}>
                  {note ? path.padEnd(19) : path}
                  {note && <em># {note}</em>}
                  {"\n"}
                </span>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
