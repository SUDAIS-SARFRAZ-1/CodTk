import type { ReactNode } from "react";

// Technology stays out of first view (founder, 2026-11-26: most visitors aren't technical). A button
// opens it in place. Native <details>, so it works without JavaScript and with the keyboard.
export function TechReveal({
  label = "See the technologies we use",
  className = "",
  children,
}: {
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <details className={`ctk-reveal ${className}`}>
      <summary className="ctk-btn ctk-btn--secondary ctk-btn--sm">
        <span className="ctk-reveal__show">{label}</span>
        <span className="ctk-reveal__hide">Hide technologies</span>
        <svg className="ctk-i ctk-reveal__caret" viewBox="0 0 20 20" aria-hidden="true">
          <path d="m5 8 5 5 5-5" />
        </svg>
      </summary>
      <div className="ctk-reveal__body">{children}</div>
    </details>
  );
}
