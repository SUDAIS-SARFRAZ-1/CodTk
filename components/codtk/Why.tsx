import type { CSSProperties } from "react";
import { Icon } from "@/components/codtk/primitives";

// The home page's one home for CodTK's working terms. Every CodTK claim was confirmed true by the
// founder (rules.md §1, §4); don't add to it without checking. The other two columns describe
// common setups, not named companies, and the note under the table says so.
const ROWS = [
  ["Who you talk to", "The engineers who are building your product", "One person, who may be juggling other clients", "An account manager who passes messages on"],
  ["Skills covered", "Design, frontend, backend and DevOps, working together", "Usually one or two of these", "All of them, split across separate departments"],
  ["Contract and NDA", "Signed before any work begins, so your idea stays confidential", "Often an informal agreement", "Yes, usually after a longer sales process"],
  ["Who owns the code", "You do: full source code and IP after payment", "Depends on what was agreed", "Sometimes licensed to you rather than handed over"],
  ["How pricing works", "A fixed quote for clearly scoped work, so no surprise bills", "Often hourly, so totals can drift", "Fixed quotes, often with high minimum budgets"],
  ["After launch", "One month of free bug fixes, then optional maintenance", "Depends on their availability", "A separate paid support contract"],
];

export function Why() {
  return (
    <section className="ctk-sec" data-tone="quiet" data-section="why codtk" aria-labelledby="why-t">
      <div className="ctk-wrap">
        <div className="ctk-head ctk-head--split">
          <p className="ctk-kicker rv">Why CodTK</p>
          <h2 id="why-t" className="ctk-d2 rv" data-d={1}>
            The rigour of a consultancy. The pace of a <span className="ctk-em">studio</span>.
          </h2>
          <p className="ctk-p rv" data-d={2}>
            How working with us compares with the two usual alternatives, point by point.
          </p>
        </div>

        <div className="ctk-cx rv" role="table" aria-label="CodTK compared with a typical freelancer and a typical large agency">
          <div className="ctk-cx__row ctk-cx__head" role="row">
            <span className="ctk-cx__cell ctk-cx__corner" role="columnheader">
              Compare
            </span>
            <span className="ctk-cx__cell ctk-cx__us" role="columnheader" data-theme="dark">
              <i className="ctk-cx__glow" aria-hidden="true" />
              <i className="ctk-cx__ping" aria-hidden="true" />
              <b>CodTK</b>
            </span>
            <span className="ctk-cx__cell ctk-cx__th" role="columnheader">
              A typical freelancer
            </span>
            <span className="ctk-cx__cell ctk-cx__th" role="columnheader">
              A typical large agency
            </span>
          </div>
          {ROWS.map(([label, us, free, agency], i) => (
            <div key={label} className="ctk-cx__row" role="row" style={{ "--i": i } as CSSProperties}>
              <span className="ctk-cx__cell ctk-cx__label" role="rowheader">
                {label}
              </span>
              <span className="ctk-cx__cell ctk-cx__us" role="cell" data-theme="dark">
                <Icon name="check" />
                {us}
              </span>
              <span className="ctk-cx__cell ctk-cx__them" role="cell">
                <span>
                  <span className="ctk-cx__who">Freelancer: </span>
                  {free}
                </span>
              </span>
              <span className="ctk-cx__cell ctk-cx__them" role="cell">
                <span>
                  <span className="ctk-cx__who">Agency: </span>
                  {agency}
                </span>
              </span>
            </div>
          ))}
        </div>
        <p className="ctk-meta ctk-cx__note">The comparison describes common setups. Every freelancer and agency is different.</p>
      </div>
    </section>
  );
}
