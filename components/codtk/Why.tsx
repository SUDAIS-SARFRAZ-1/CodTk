import type { CSSProperties } from "react";
import { Icon } from "@/components/codtk/primitives";

// The home page's one home for CodTK's working terms. Every CodTK claim was confirmed true by the
// founder (rules.md §1, §4); don't add to it without checking. The other two columns describe
// common setups, not named companies, and the note under the table says so.
const ROWS = [
  ["Who you talk to", "The people actually building your product", "One person, who may be juggling other clients", "An account manager who passes messages on"],
  ["What we handle", "Design, building, hosting and launch, all under one roof", "Usually one or two of these", "All of them, split across separate departments"],
  ["Contract and privacy", "Signed before work starts. Your idea and your data stay private.", "Often an informal agreement", "Yes, usually after a longer sales process"],
  ["Who owns the result", "You do. Once it's paid for, everything we built is yours.", "Depends on what was agreed", "Sometimes licensed to you rather than handed over"],
  ["How pricing works", "One fixed price, agreed before we start. No surprise bills.", "Often hourly, so totals can drift", "Fixed quotes, often with high minimum budgets"],
  ["After launch", "One month of free bug fixes, then optional maintenance", "Depends on their availability", "A separate paid support contract"],
];

export function Why() {
  return (
    <section className="ctk-sec" data-section="why codtk" aria-labelledby="why-t">
      <div className="ctk-wrap">
        <div className="ctk-head ctk-head--split">
          <h2 id="why-t" className="ctk-h2">
            The care of a big company, at the speed of a small team.
          </h2>
          <p className="ctk-p ctk-hide-phone">
            How we compare with hiring a freelancer or a big agency.
          </p>
        </div>

        <div className="ctk-cx" role="table" aria-label="CodTK compared with a typical freelancer and a typical large agency">
          <div className="ctk-cx__row ctk-cx__head" role="row">
            <span className="ctk-cx__cell ctk-cx__corner" role="columnheader">
              Compare
            </span>
            <span className="ctk-cx__cell ctk-cx__us" role="columnheader" data-theme="dark">
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
        <p className="ctk-meta ctk-cx__note ctk-hide-phone">The comparison describes common setups. Every freelancer and agency is different.</p>
      </div>
    </section>
  );
}
