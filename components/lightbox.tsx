"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { ImgMeta } from "@/lib/images";
import { CloseIcon } from "./icons";

/** Shared lightbox state: current index + navigation, reused by any trigger. */
export function useLightbox(count: number) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + count) % count)),
    [count]
  );
  return { open, setOpen, close, go };
}

/**
 * Fullscreen image lightbox with keyboard + RTL arrow navigation.
 * Presentational: state comes from useLightbox so different triggers
 * (gallery grid, footer strip) share one implementation.
 */
export function Lightbox({
  images,
  open,
  close,
  go,
}: {
  images: ImgMeta[];
  open: number | null;
  close: () => void;
  go: (dir: number) => void;
}) {
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      // In RTL, ArrowRight = previous, ArrowLeft = next.
      if (e.key === "ArrowLeft") go(1);
      if (e.key === "ArrowRight") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, go]);

  if (open === null) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="גלריית תמונות"
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      style={{ background: "rgba(24,24,24,0.94)" }}
      onClick={close}
    >
      <button
        type="button"
        onClick={close}
        aria-label="סגירת הגלריה"
        className="absolute top-4 end-4 p-2 text-cream"
        style={{ color: "var(--color-cream)" }}
      >
        <CloseIcon />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        aria-label="התמונה הקודמת"
        className="absolute end-2 md:end-8 text-4xl px-3 py-2"
        style={{ color: "var(--color-gold)" }}
      >
        ›
      </button>

      <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full" style={{ aspectRatio: "3 / 2" }}>
          <Image
            src={images[open].src}
            alt={images[open].alt}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>
        <figcaption className="mt-3 text-center text-sm" style={{ color: "var(--color-cream)" }}>
          {images[open].alt}
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        aria-label="התמונה הבאה"
        className="absolute start-2 md:start-8 text-4xl px-3 py-2"
        style={{ color: "var(--color-gold)" }}
      >
        ‹
      </button>
    </div>
  );
}
