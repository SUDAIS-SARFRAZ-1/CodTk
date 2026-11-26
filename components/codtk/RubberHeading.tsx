"use client";

import { Fragment } from "react";

// Home hero heading (founder, 2026-11-26): blue, each letter squishes and bounces like rubber when
// pointed at or tapped, and the closing full stop is the point the hero dive zooms into (its scale
// comes from --b in the dive CSS). Screen readers get the plain sentence once.
export function RubberHeading({ id, text }: { id: string; text: string }) {
  const words = text.split(" ");
  const last = words.length - 1;
  return (
    <h1
      id={id}
      onPointerOver={(e) => {
        const el = e.target as HTMLElement;
        if (el.classList.contains("ctk-rub__l")) el.classList.add("is-on");
      }}
      onAnimationEnd={(e) => (e.target as HTMLElement).classList.remove("is-on")}
    >
      <span className="ctk-sr">{text}.</span>
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
