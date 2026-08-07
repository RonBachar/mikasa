"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { ImgMeta } from "@/lib/images";
import { CloseIcon } from "./icons";

export function Gallery({
  images,
  columns = 3,
}: {
  images: ImgMeta[];
  columns?: 2 | 3 | 4;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length]
  );

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

  const colClass =
    columns === 4
      ? "sm:grid-cols-3 lg:grid-cols-4"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <ul className={`grid grid-cols-2 gap-3 md:gap-4 ${colClass}`}>
        {images.map((im, i) => (
          <li key={im.file}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full overflow-hidden rounded-[--radius-card] border"
              style={{ borderColor: "color-mix(in srgb, var(--color-gold) 30%, transparent)" }}
              aria-label={`הגדלת תמונה: ${im.alt}`}
            >
              <span className="block aspect-[4/3] relative">
                <Image
                  src={im.src}
                  alt={im.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="גלריית תמונות"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          style={{ background: "rgba(30,27,23,0.94)" }}
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
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="התמונה הקודמת"
            className="absolute end-2 md:end-8 text-4xl px-3 py-2"
            style={{ color: "var(--color-gold)" }}
          >
            ›
          </button>

          <figure
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
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
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="התמונה הבאה"
            className="absolute start-2 md:start-8 text-4xl px-3 py-2"
            style={{ color: "var(--color-gold)" }}
          >
            ‹
          </button>
        </div>
      )}
    </>
  );
}
