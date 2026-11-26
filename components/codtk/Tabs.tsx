"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type Tab = { id: string; label: ReactNode; icon?: ReactNode; count?: number; panel: ReactNode };

// Tab buttons that swap content in place, so long pages stay short (founder, 2026-11-27: buttons,
// not open/close panels). Every panel stays in the HTML (hidden, not removed) so search engines and
// a link to an id inside a panel still find it; such a link opens that panel. Arrow keys, Home and
// End move between tabs.
export function Tabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      const i = tabs.findIndex(
        (t) => t.id === id || document.getElementById(`${t.id}-panel`)?.querySelector(`#${CSS.escape(id)}`),
      );
      if (i >= 0) setActive(i);
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, [tabs]);

  const go = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    setActive(n);
    buttons.current[n]?.focus();
  };

  return (
    <div className="ctk-seg">
      <div className="ctk-seg__list" role="tablist" aria-label={label}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${t.id}-tab`}
            aria-controls={`${t.id}-panel`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            className="ctk-seg__tab"
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
              if (to === undefined) return;
              e.preventDefault();
              go(to);
            }}
          >
            {t.icon}
            <span>{t.label}</span>
            {t.count !== undefined && <b>{t.count}</b>}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${t.id}-panel`}
          aria-labelledby={`${t.id}-tab`}
          hidden={i !== active}
          className="ctk-seg__panel"
        >
          {t.panel}
        </div>
      ))}
    </div>
  );
}
