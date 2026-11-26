// Row styles: "" solid, "o" outline, "s b" blue serif italic.
const ROW_A: [string, string][] = [["Websites", ""], ["Mobile apps", "o"], ["Business software", "s b"], ["Automation", "o"], ["Online growth", ""], ["Support", "o"], ["Websites", "s b"], ["Mobile apps", "o"]];
const ROW_B: [string, string][] = [["Discover", "o"], ["Design", ""], ["Build", "s b"], ["Launch", "o"], ["Support", ""], ["Discover", "o"], ["Design", ""], ["Build", "s b"]];

// Two big type rows looping continuously in opposite directions (CSS transform only, like the tech
// strip; restored by the founder, 2026-11-19). Each row is doubled so the loop is seamless.
export function Marquee() {
  return (
    <section className="ctk-marq" aria-label="Websites, mobile apps, business software, automation, online growth and support">
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
