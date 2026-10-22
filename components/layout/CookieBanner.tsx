"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Reads / writes the consent cookie: "1" = accepted, "0" = rejected.
const COOKIE_KEY = "codtk_consent";

function getConsent(): "accepted" | "rejected" | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;\s*)codtk_consent=([^;]*)/);
  if (!m) return null;
  return m[1] === "1" ? "accepted" : "rejected";
}

function setConsent(value: "accepted" | "rejected") {
  const maxAge = 60 * 60 * 24 * 365; // 1 year
  document.cookie = `${COOKIE_KEY}=${value === "accepted" ? "1" : "0"};max-age=${maxAge};path=/;SameSite=Lax`;
}

// Injects the GA4 script. Called only after consent is given.
function loadGA() {
  if (document.querySelector(`script[data-ga]`)) return;
  const s1 = document.createElement("script");
  s1.async = true;
  s1.src = "https://www.googletagmanager.com/gtag/js?id=G-6MJ1YPNKP6";
  s1.setAttribute("data-ga", "1");
  document.head.appendChild(s1);

  const s2 = document.createElement("script");
  s2.setAttribute("data-ga", "2");
  s2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-6MJ1YPNKP6', { anonymize_ip: true });
  `;
  document.head.appendChild(s2);
}

// Cookie consent banner — shown until the visitor accepts or rejects.
// On accept: loads GA4. On reject: does nothing (GA4 never loads).
// Preference is stored in a 1-year first-party cookie.
export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === "accepted") {
      loadGA();
      return;
    }
    if (consent === null) {
      // Delay to avoid layout shift on first paint
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    setConsent("accepted");
    loadGA();
    setShow(false);
  }

  function reject() {
    setConsent("rejected");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        translate: "-50% 0",
        zIndex: 200,
        width: "min(680px, calc(100vw - 32px))",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px 24px",
        padding: "18px 22px",
        background: "var(--bg-100)",
        border: "1px solid var(--line-200)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 20px 60px -20px rgba(0,0,0,.35)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        animation: "ctk-rise 0.4s var(--eo) both",
      }}
    >
      <p style={{ flex: "1 1 320px", fontSize: 14, lineHeight: 1.55, color: "var(--ink-200)", margin: 0 }}>
        We use cookies to measure site visits with Google Analytics. See our{" "}
        <Link href="/privacy" style={{ color: "var(--ink-100)", textDecoration: "underline", textUnderlineOffset: 3 }}>
          Privacy Policy
        </Link>
        .
      </p>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button
          onClick={reject}
          style={{
            height: 40,
            padding: "0 18px",
            border: "1px solid var(--line-300)",
            borderRadius: "var(--radius-pill)",
            background: "transparent",
            color: "var(--ink-200)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          Reject
        </button>
        <button
          onClick={accept}
          style={{
            height: 40,
            padding: "0 18px",
            border: "none",
            borderRadius: "var(--radius-pill)",
            background: "var(--blue-500)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
