"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Marks a repeat view before first paint, so the intro plays once per visit. Rendered by the layout.
export const INTRO_SEEN_SCRIPT =
  "try{if(sessionStorage.getItem('ctk-intro'))document.documentElement.dataset.intro='seen';sessionStorage.setItem('ctk-intro','1')}catch(e){}";

// Logo intro (founder, 2026-11-26): about 2.5 seconds, only when a visit starts on Home. Pure CSS,
// so it clears on its own even without JavaScript; later page changes never show it again.
export function Intro() {
  const [firstPath] = useState(usePathname());
  if (firstPath !== "/") return null;
  return (
    <div className="ctk-intro" aria-hidden="true">
      <div className="ctk-intro__logo">
        <Image className="ctk-intro__mark" src="/brand/mark.png" alt="" aria-hidden="true" width={720} height={379} sizes="160px" priority />
        <Image className="ctk-intro__word" src="/brand/wordmark.png" alt="" aria-hidden="true" width={640} height={99} sizes="200px" priority />
        <i className="ctk-intro__line" />
      </div>
    </div>
  );
}
