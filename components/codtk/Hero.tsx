import Image from "next/image";
import { Btn } from "@/components/codtk/primitives";
import { DiveStage } from "@/components/codtk/DiveStage";
import { RubberHeading } from "@/components/codtk/RubberHeading";
import { BOOKING_URL, WHATSAPP_LINK } from "@/lib/contact";

// Home hero (founder, 2026-11-26). Scrolling fades the copy and dives into the heading's blue full
// stop until it fills the screen, then opens on the CodTK logo above a lit horizon. All motion is
// transform and opacity driven by --p from DiveStage.
export function Hero() {
  return (
    <DiveStage labelledBy="hero-t">

      <div className="ctk-wrap ctk-dive__hero">
        <RubberHeading id="hero-t" text="Software that grows your business" />
        <div className="ctk-dive__foot">
          <div>
            <p className="ctk-lead">
              We design and build websites, apps and custom systems for startups and growing businesses. Bring us
              an idea and we&apos;ll turn it into a working first version, or improve the systems you already run.
            </p>
            <p className="ctk-avail">Fixed-price quotes, clear weekly updates and support after launch.</p>
          </div>
          <div className="ctk-actions">
            <Btn href={BOOKING_URL} external>
              Book a free consultation
            </Btn>
            <Btn href={WHATSAPP_LINK} variant="secondary" external>
              Chat on WhatsApp
            </Btn>
          </div>
        </div>
      </div>

      <div className="ctk-dive__fill" aria-hidden="true" />
      <div className="ctk-dive__scene" data-theme="dark" aria-hidden="true">
        <div className="ctk-dive__logo">
          <Image src="/brand/lockup.png" alt="" width={720} height={486} sizes="(min-width: 768px) 520px, 70vw" />
          <Image className="ctk-dive__mirror" src="/brand/lockup.png" alt="" width={720} height={486} sizes="(min-width: 768px) 520px, 70vw" />
          <i className="ctk-dive__horizon" />
        </div>
      </div>
    </DiveStage>
  );
}
