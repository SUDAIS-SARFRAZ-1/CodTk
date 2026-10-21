import type { CSSProperties, ReactNode } from "react";

// Everyday examples drawn beside each home service card. Illustrations only: the names, times and
// screens are generic examples of the kind of thing we build, not client work (rules.md §1).
// Animated in CSS (.ctk-sx-*); reduced motion shows them still.

const d = (s: number) => ({ animationDelay: `${s}s` }) as CSSProperties;

function Svg({ children, size = 16, w = 1.8 }: { children: ReactNode; size?: number; w?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const Check = ({ size = 16 }: { size?: number }) => (
  <Svg size={size} w={2.4}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
);

function Booking() {
  return (
    <>
      <div className="ctk-sx-win">
        <div className="ctk-sx-bar">
          <i />
          <i />
          <i />
          <span>yourclinic.com/book</span>
        </div>
        <div className="ctk-sx-body">
          <div className="ctk-sx-row">
            <b className="ctk-sx-h">Book an appointment</b>
            <span className="ctk-sx-ok">
              <i className="ctk-sx-ping" />
              Open today
            </span>
          </div>
          <div className="ctk-sx-item">
            <span className="ctk-sx-ico ctk-sx-ico--round">
              <Svg size={18}>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
              </Svg>
            </span>
            <div>
              <b>General check-up</b>
              <small>30 minutes · with a dentist</small>
            </div>
          </div>
          <div className="ctk-sx-grid4">
            <span className="ctk-sx-pill">Mon 3</span>
            <span className="ctk-sx-pill">Tue 4</span>
            <span className="ctk-sx-pill on">Wed 5</span>
            <span className="ctk-sx-pill">Thu 6</span>
          </div>
          <div className="ctk-sx-grid4">
            <span className="ctk-sx-pill">10:00</span>
            <span className="ctk-sx-pill ctk-sx-slot">11:30</span>
            <span className="ctk-sx-pill">2:00</span>
            <span className="ctk-sx-pill">4:30</span>
          </div>
          <span className="ctk-sx-btn">Confirm booking</span>
        </div>
      </div>
      <div className="ctk-sx-toast">
        <Check />
        Booked for Wed 11:30, reminder sent
      </div>
    </>
  );
}

function Tracking() {
  return (
    <div className="ctk-sx-phone">
      <div className="ctk-sx-screen">
        <div className="ctk-sx-row">
          <b>Your order</b>
          <span className="ctk-sx-accent">On the way</span>
        </div>
        <div className="ctk-sx-map">
          <svg viewBox="0 0 220 140" preserveAspectRatio="none" aria-hidden="true">
            <path className="ctk-sx-streets" d="M0 30 H220 M0 90 H220 M60 0 V140 M150 0 V140" />
            <path className="ctk-sx-route" d="M24 112 C 70 112, 70 40, 120 52 S 170 100, 196 26" />
            <circle className="ctk-sx-from" cx="24" cy="112" r="6" />
            <circle className="ctk-sx-to" cx="196" cy="26" r="7" />
          </svg>
          <span className="ctk-sx-rider" />
        </div>
        <div className="ctk-sx-eta">
          <small>Arriving in</small>
          <b>12 min</b>
        </div>
        <ol className="ctk-sx-steps">
          <li className="done">Order placed</li>
          <li className="done">Packed and picked up</li>
          <li className="on">On the way to you</li>
          <li>Delivered</li>
        </ol>
      </div>
    </div>
  );
}

function FeePortal() {
  return (
    <div className="ctk-sx-pair">
      <div className="ctk-sx-win ctk-sx-pad">
        <b className="ctk-sx-cap">Who can see what</b>
        <dl className="ctk-sx-roles">
          <div>
            <dt>Admin</dt>
            <dd>Everything</dd>
          </div>
          <div>
            <dt>Teacher</dt>
            <dd>Attendance, marks</dd>
          </div>
          <div>
            <dt>Parent</dt>
            <dd>Fees, results</dd>
          </div>
        </dl>
      </div>
      <div className="ctk-sx-win ctk-sx-pad">
        <b className="ctk-sx-cap">What happens when a parent pays</b>
        <ol className="ctk-sx-feed">
          <li style={d(0)}>Parent pays the term fee online</li>
          <li style={d(0.9)}>The bank confirms the payment</li>
          <li style={d(1.8)}>A receipt is emailed automatically</li>
          <li style={d(2.7)} className="ok">
            The office sees it marked paid, live
          </li>
        </ol>
      </div>
    </div>
  );
}

function SaleDay() {
  const curve = "M0 128 C 40 124, 80 126, 120 118 S 200 112, 250 108 C 268 106, 274 40, 300 34 S 360 48, 400 40";
  return (
    <div className="ctk-sx-win ctk-sx-pad">
      <div className="ctk-sx-row">
        <b className="ctk-sx-cap">Visitors today</b>
        <span className="ctk-sx-badge">
          <i className="ctk-sx-ping" />
          Store online
        </span>
      </div>
      <svg className="ctk-sx-chart" viewBox="0 0 400 150" aria-hidden="true">
        <defs>
          <linearGradient id="sx-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="ctk-sx-area0" />
            <stop offset="1" className="ctk-sx-area1" />
          </linearGradient>
        </defs>
        <path className="ctk-sx-base" d="M0 140 H400" />
        <path className="ctk-sx-mark" d="M260 10 V140" />
        <text x="266" y="22">
          Sale starts
        </text>
        <path d={`${curve} V140 H0Z`} fill="url(#sx-area)" />
        <path className="ctk-sx-curve" d={curve} />
      </svg>
      <div className="ctk-sx-row ctk-sx-foot">
        <small>Servers added automatically</small>
        <span className="ctk-sx-srvs">
          <i className="on" />
          <i className="on" />
          {[0, 0.25, 0.5, 0.75].map((s) => (
            <i key={s} className="ctk-sx-srv" style={d(s)} />
          ))}
        </span>
      </div>
    </div>
  );
}

const FLOW = [
  { t: "A customer places an order", s: "On your website", tone: "solid", icon: <><path d="M6 6h15l-2 9H8z" /><path d="M6 6L5 3H2" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /></> },
  { t: "An invoice PDF is created", s: "With your logo and prices", tone: "blue", icon: <><path d="M7 3h7l4 4v14H7z" /><path d="M10 12h5M10 16h5" /></> },
  { t: "A row is added to your sheet", s: "Sales records stay up to date", tone: "cyan", icon: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 4v16" /></> },
  { t: "The customer gets a WhatsApp update", s: "Order confirmed, invoice attached", tone: "ok", icon: <path d="M4 20l1.5-4.5A8 8 0 1 1 9 19z" /> },
];

function OrderFlow() {
  return (
    <div className="ctk-sx-flow">
      <span className="ctk-sx-rail" aria-hidden="true">
        <i />
      </span>
      {FLOW.map((f, i) => (
        <div key={f.t} className="ctk-sx-node" style={d(i * 2)}>
          <span className={`ctk-sx-ico ctk-sx-ico--${f.tone}`}>
            <Svg>{f.icon}</Svg>
          </span>
          <div>
            <b>{f.t}</b>
            <small>{f.s}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

function Plan() {
  return (
    <div className="ctk-sx-win ctk-sx-plan">
      <div className="ctk-sx-row ctk-sx-rule">
        <b className="ctk-sx-h">Technical plan</b>
        <span className="ctk-sx-mono">FOR REVIEW</span>
      </div>
      <div className="ctk-sx-note">
        <b>Recommendation</b>
        <p>Launch as a web app that installs on phones. Add native apps once buyers and sellers are active.</p>
      </div>
      <ul className="ctk-sx-ticks">
        {["Phase 1: listings, search and accounts", "Phase 2: payments and reviews", "Phase 3: native mobile apps"].map(
          (t, i) => (
            <li key={t}>
              <span style={d(0.2 + i * 0.6)}>
                <Check size={18} />
              </span>
              {t}
            </li>
          ),
        )}
      </ul>
      <div className="ctk-sx-risk">
        <Svg size={18}>
          <path d="M12 3l9 16H3z" />
          <path d="M12 10v4M12 17h.01" />
        </Svg>
        Risk: payment provider approval can take weeks, so apply early.
      </div>
    </div>
  );
}

const EXAMPLES: Record<string, () => ReactNode> = {
  "web-application-development": Booking,
  "mobile-application-development": Tracking,
  "backend-api-development": FeePortal,
  "cloud-devops-solutions": SaleDay,
  "business-process-automation": OrderFlow,
  "custom-software-consulting": Plan,
};

export function ServiceExample({ slug, label }: { slug: string; label: string }) {
  const Example = EXAMPLES[slug];
  return (
    <figure className="ctk-sx" aria-label={`Example: ${label}`}>
      <figcaption className="ctk-sx-tag">
        <b>Example</b> {label}
      </figcaption>
      <div className="ctk-sx-stage" aria-hidden="true">
        {Example && <Example />}
      </div>
    </figure>
  );
}
