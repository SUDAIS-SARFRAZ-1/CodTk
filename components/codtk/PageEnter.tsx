"use client";

import { useEffect, useState, type ReactNode } from "react";

// Set once the first page has mounted on the client; every later template remount is a navigation.
const nav = { done: false };

// Wraps each page (app/template.tsx). Plays the enter animation on client navigations only, so the
// first load paints content immediately.
export function PageEnter({ children }: { children: ReactNode }) {
  const [enter] = useState(() => nav.done);
  useEffect(() => {
    nav.done = true;
  }, []);
  return <div className={enter ? "ctk-page ctk-page--enter" : "ctk-page"}>{children}</div>;
}
