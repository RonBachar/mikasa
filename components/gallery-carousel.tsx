"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ImgMeta } from "@/lib/images";
import { Lightbox, useLightbox } from "./lightbox";

/**
 * Suite-page photo carousel: three photos in frame at a time on desktop,
 * stepped one at a time with arrows, and any photo opens the shared lightbox
 * on click.
 *
 * Built on a native scroll container with CSS scroll-snap rather than a
 * transform track. That means the arrows and a trackpad/touch swipe drive the
 * same mechanism, so the two can never disagree about where the carousel is,
 * and it degrades to a normal swipeable strip if JS is slow to arrive.
 *
 * Per-breakpoint visible count is set by the item width in CSS (see
 * .carousel__item in globals.css): 1 on a phone, 2 at sm, 3 at lg.
 */
export function GalleryCarousel({ images }: { images: ImgMeta[] }) {
  const { open, setOpen, close, go } = useLightbox(images.length);
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /**
   * The site is RTL, so scrollLeft runs from 0 at the right edge down to a
   * negative number at the left in every browser that follows the spec.
   * Comparing absolute values keeps this direction-agnostic instead of
   * hard-coding a sign that breaks the moment the container is LTR.
   */
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setAtStart(pos <= 1);
    setAtEnd(pos >= max - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    // The first sync() runs before the images have laid out, when scrollWidth
    // still equals clientWidth — which reads as "already at the end" and
    // disables both arrows. Watching the track re-measures once the real
    // content width arrives, and again on any later reflow.
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      ro.disconnect();
    };
  }, [sync]);

  // Steps by exactly one item, measured from the DOM rather than assumed, so
  // the step stays correct across the breakpoints that change item width.
  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const distance = (first?.offsetWidth ?? el.clientWidth / 3) + gap;
    el.scrollBy({ left: distance * dir, behavior: "smooth" });
  };

  // In RTL, "next" (further into the list) means scrolling toward negative
  // scrollLeft, i.e. left. The arrows are labelled by meaning, not by side.
  const prev = () => step(1);
  const next = () => step(-1);

  return (
    <>
      <div className="carousel">
        <ul
          ref={trackRef}
          className="carousel__track"
          // Not a listbox or a tablist: it is a scrollable region of links to
          // larger images, and a keyboard user can reach every button in it.
          tabIndex={0}
          aria-label="גלריית תמונות, ניתן לגלול"
        >
          {images.map((im, i) => (
            <li key={im.file} className="carousel__item">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="carousel__figure group"
                aria-label={`הגדלת תמונה: ${im.alt}`}
              >
                <span className="img-tint block aspect-[4/3] relative overflow-hidden rounded-[--radius-card]">
                  <Image
                    src={im.src}
                    alt={im.alt}
                    fill
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 46vw, 31vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Arrows sit outside the track so they never cover a photo. Disabled
            rather than hidden at the ends: a control that vanishes moves the
            other one, and the row jumps under the cursor. */}
        <button
          type="button"
          onClick={prev}
          disabled={atStart}
          className="carousel__arrow carousel__arrow--prev"
          aria-label="התמונות הקודמות"
        >
          ›
        </button>
        <button
          type="button"
          onClick={next}
          disabled={atEnd}
          className="carousel__arrow carousel__arrow--next"
          aria-label="התמונות הבאות"
        >
          ‹
        </button>
      </div>

      <Lightbox images={images} open={open} close={close} go={go} />
    </>
  );
}
