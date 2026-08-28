"use client";

import Image from "next/image";
import type { ImgMeta } from "@/lib/images";
import { Lightbox, useLightbox } from "./lightbox";

/** Small camera glyph shown in the circular hover badge. */
function CameraGlyph() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

/**
 * Almaris-style pre-footer gallery strip: a full-bleed, edge-to-edge row of
 * square image tiles (8 on desktop, 4 on mobile) with no gaps. Hovering a tile
 * reveals a subtle dark overlay with a centered circular camera badge. Clicking
 * any tile opens the shared lightbox over the FULL image set, not just these
 * preview tiles. Sits directly above the footer with no surrounding padding.
 */
export function GalleryStrip({
  preview,
  all,
}: {
  preview: ImgMeta[];
  all: ImgMeta[];
}) {
  const { open, setOpen, close, go } = useLightbox(all.length);

  return (
    <>
      <section aria-label="גלריית תמונות" className="gallery-strip">
        <ul className="gallery-strip__row">
          {preview.map((im) => {
            const idx = all.findIndex((a) => a.file === im.file);
            return (
              <li key={im.file}>
                <button
                  type="button"
                  onClick={() => setOpen(idx >= 0 ? idx : 0)}
                  className="gallery-tile group"
                  aria-label={`הגדלת תמונה: ${im.alt}`}
                >
                  <Image
                    src={im.src}
                    alt={im.alt}
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                    className="object-cover"
                  />
                  <span className="gallery-tile__overlay" aria-hidden>
                    <span className="gallery-tile__icon">
                      <CameraGlyph />
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <Lightbox images={all} open={open} close={close} go={go} />
    </>
  );
}
