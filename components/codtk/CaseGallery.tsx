"use client";

import Image from "next/image";
import { useState } from "react";
import { WindowBar } from "@/components/codtk/primitives";
import type { Project } from "@/lib/projects";

// Screenshot viewer for the featured case study: one large frame, thumbnails to switch screens.
export function CaseGallery({ images }: { images: Project["images"] }) {
  const [active, setActive] = useState(0);
  const img = images[active];

  return (
    <div className="ctk-feat__gallery">
      <div className="ctk-feat__frame" data-theme="dark">
        <WindowBar className="ctk-viz__bar" />
        <Image
          key={img.src}
          className="ctk-feat__shot"
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes="(min-width: 1024px) 720px, 92vw"
        />
      </div>
      {images.length > 1 && (
        <div className="ctk-feat__thumbs">
          {images.map((m, i) => (
            <button
              key={m.src}
              type="button"
              aria-pressed={i === active}
              aria-label={`Show screenshot ${i + 1}: ${m.alt}`}
              onClick={() => setActive(i)}
            >
              <Image src={m.src} alt="" width={m.width} height={m.height} sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
