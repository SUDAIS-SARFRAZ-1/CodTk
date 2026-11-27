"use client";

import { Fragment } from "react";

// Home hero heading (founder, 2026-11-26; black since 2026-11-27): each letter squishes and bounces like rubber when
// pointed at or tapped, and the closing full stop is the point the hero dive zooms into (its scale
// comes from --b in the dive CSS). The letters are the heading's only text, so search engines read the
// sentence once; screen readers get it whole from aria-label instead of letter by letter.
export function RubberHeading({ id, text }: { id: string; text: string }) {
  const words = text.split(" ");
  const last = words.length - 1;
  return (
    <h1
      id={id}
      aria-label={`${text}.`}
      onPointerOver={(e) => {
        const el = e.target as HTMLElement;
        if (el.classList.contains("ctk-rub__l")) el.classList.add("is-on");
      }}
      onAnimationEnd={(e) => (e.target as HTMLElement).classList.remove("is-on")}
    >
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="ctk-rub__w">
              {[...w].map((ch, j) => (
                <span key={j} className="ctk-rub__l">
                  {ch}
                </span>
              ))}
              {i === last && <span className="ctk-dive__dot" />}
            </span>
            {i < last && " "}
          </Fragment>
        ))}
      </span>
    </h1>
  );
}
