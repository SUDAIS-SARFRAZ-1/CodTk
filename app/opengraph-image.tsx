import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

// Site-wide share image: the founder's logo lockup on the black scope (ui-ux-design.md §2).
export const alt = "CodTK — Building Next Generation Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = await readFile(join(process.cwd(), "public/brand/lockup.png"), "base64");

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#fff",
          gap: 24,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> only */}
        <img src={`data:image/png;base64,${logo}`} width={480} height={324} alt="" />
        <div style={{ fontSize: 40, letterSpacing: -1 }}>Building Next Generation Software</div>
        <div style={{ fontSize: 26, color: "#0067FC" }}>Software company · Lahore, Pakistan</div>
      </div>
    ),
    size,
  );
}
