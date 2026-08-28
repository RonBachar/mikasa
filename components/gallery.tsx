"use client";

import Image from "next/image";
import type { ImgMeta } from "@/lib/images";
import { Lightbox, useLightbox } from "./lightbox";

export function Gallery({
  images,
  columns = 3,
}: {
  images: ImgMeta[];
  columns?: 2 | 3 | 4;
}) {
  const { open, setOpen, close, go } = useLightbox(images.length);

  const colClass =
    columns === 4
      ? "sm:grid-cols-3 lg:grid-cols-4"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      {/* Below sm: a swipeable snap carousel, one photo (mostly) in frame at a
          time — a 2-col grid on a narrow phone means every tile is too small
          to actually look at. From sm up: back to a real grid, and the
          carousel classes (flex, overflow, snap, fixed tile width) are
          switched off rather than layered under the grid ones. */}
      <ul
        className={`gallery-scroller flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:overflow-visible sm:gap-4 md:gap-6 ${colClass}`}
      >
        {images.map((im, i) => (
          <li key={im.file} className="gallery-scroller__item shrink-0 sm:shrink sm:w-auto">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full overflow-hidden rounded-[--radius-card]"
              aria-label={`הגדלת תמונה: ${im.alt}`}
            >
              <span className="img-tint block aspect-[4/3] relative">
                <Image
                  src={im.src}
                  alt={im.alt}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox images={images} open={open} close={close} go={go} />
    </>
  );
}
