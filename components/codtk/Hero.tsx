import Image from "next/image";
import { Btn } from "@/components/codtk/primitives";
import { DiveStage } from "@/components/codtk/DiveStage";
import { BOOK_CALL_LINK } from "@/lib/contact";

// Home hero (founder's Option A, 2026-11-26). A blue growth line draws in once; scrolling then dives
// into the line until it fills the screen and opens on the CodTK logo above a lit horizon. All
// motion is transform and opacity driven by --p from DiveStage.
export function Hero() {
  return (
    <DiveStage>
      <svg className="ctk-dive__line" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="ctk-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#0052cc" />
            <stop offset=".55" stopColor="#0067fc" />
            <stop offset="1" stopColor="#3ccbff" />
          </linearGradient>
        </defs>
        {/* Passes through the centre (720,450), the point the dive zooms into. */}
        <path
          d="M-60 690 H360 C450 690 470 610 540 570 S650 450 720 450 S830 452 880 400 S980 300 1060 300 H1180 C1260 300 1290 240 1330 200 S1420 150 1520 150"
          pathLength={1}
        />
      </svg>

      <div className="ctk-wrap ctk-dive__hero">
        <h1 id="hero-t">Software that grows your business.</h1>
        <div className="ctk-dive__foot">
          <div>
            <p className="ctk-lead">
              We design and build websites, apps and custom systems for startups and growing businesses. Bring us
              an idea and we&apos;ll turn it into a working first version, or improve the systems you already run.
            </p>
            <p className="ctk-avail">Fixed-price quotes, clear weekly updates and support after launch.</p>
          </div>
          <div className="ctk-actions">
            <Btn href={BOOK_CALL_LINK} external>
              Book a free consultation
            </Btn>
            <Btn href="/services" variant="secondary">
              See our services
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
