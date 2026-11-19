import Image from "next/image";

// Footer background: the CodTK logo, faint and static behind the content (no pointer effects;
// founder, 2026-11-19: light motion only).
export function FooterSpotlight() {
  return (
    <div className="ctk-foot__bg" aria-hidden="true">
      <span className="ctk-foot__logo">
        <Image src="/brand/lockup.png" alt="" width={720} height={486} sizes="(min-width: 1024px) 1000px, 90vw" />
      </span>
    </div>
  );
}
