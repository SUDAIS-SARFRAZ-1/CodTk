"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const SOCIAL = /(^|\.)(linkedin|instagram|facebook)\.com$/;

// One delegated click listener for the GA4 events in docs/MEASUREMENT.md, so no button has to know
// about analytics. `location` is the nearest section's data-section (or nav/footer). track() is a
// no-op until the visitor accepts cookies, so nothing is sent without consent.
export function ClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const location =
        a.closest<HTMLElement>("[data-section]")?.dataset.section ??
        (a.closest("header") ? "nav" : a.closest("footer") ? "footer" : "page");
      const host = (() => {
        try {
          return new URL(href, window.location.href).hostname;
        } catch {
          return "";
        }
      })();
      if (host === "wa.me" || host.endsWith("whatsapp.com")) track("whatsapp_click", { location });
      else if (href.startsWith("mailto:")) track("email_click", { location });
      else if (href.startsWith("tel:")) track("phone_click", { location });
      else if (SOCIAL.test(host)) track("outbound_social_click", { network: host.split(".").at(-2) ?? host, location });
      else if (href.startsWith("/contact") || a.classList.contains("ctk-btn--primary"))
        track("cta_click", { location, label: (a.textContent ?? "").trim().slice(0, 60), href });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
