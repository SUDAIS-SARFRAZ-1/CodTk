// Row styles: "" solid, "o" outline, "s b" blue serif italic.
const ROW_A: [string, string][] = [["Web apps", ""], ["Mobile", "o"], ["APIs", "s b"], ["Cloud", "o"], ["DevOps", ""], ["Automation", "o"], ["Web apps", "s b"], ["Mobile", "o"]];
const ROW_B: [string, string][] = [["Discover", "o"], ["Design", ""], ["Build", "s b"], ["Deploy", "o"], ["Support", ""], ["Discover", "o"], ["Design", ""], ["Build", "s b"]];

// Two big type rows looping continuously in opposite directions (CSS transform only, like the tech
// strip; restored by the founder, 2026-11-19). Each row is doubled so the loop is seamless.
export function Marquee() {
  return (
    <section className="ctk-marq" aria-label="Web apps, mobile, APIs, cloud, DevOps, automation">
      {[ROW_A, ROW_B].map((row, r) => (
        <div key={r} className="ctk-marq__row" aria-hidden="true">
          {[...row, ...row].map(([t, c], i) => (
            <span key={i} className={c || undefined}>
              {t}
            </span>
          ))}
        </div>
      ))}
    </section>
  );
}
