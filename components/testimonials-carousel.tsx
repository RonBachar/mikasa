"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reviews } from "@/content/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} מתוך 5 כוכבים`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden
          fill={i < rating ? "var(--color-gold)" : "none"}
          stroke="var(--color-gold)"
          strokeWidth="1.4"
        >
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 21.4l1.4-6.8L2.2 9.9l6.9-.8z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Almaris-style testimonials carousel:
 * stars → quote → name. Drag / swipe to slide. Soft fade + dots.
 */
export function TestimonialsCarousel() {
  const slides = reviews.slice(0, 4);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const drag = useRef<{ startX: number; active: boolean; moved: boolean }>({
    startX: 0,
    active: false,
    moved: false,
  });
  const pauseUntil = useRef(0);

  const goTo = useCallback(
    (next: number) => {
      const target = ((next % slides.length) + slides.length) % slides.length;
      if (target === index) return;
      setFade(false);
      window.setTimeout(() => {
        setIndex(target);
        setFade(true);
      }, 220);
    },
    [index, slides.length]
  );

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntil.current) return;
      goTo(index + 1);
    }, 6000);
    return () => window.clearInterval(id);
  }, [index, slides.length, goTo]);

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { startX: e.clientX, active: true, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    if (Math.abs(e.clientX - drag.current.startX) > 8) {
      drag.current.moved = true;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.active = false;
    if (!drag.current.moved || Math.abs(dx) < 48) return;

    pauseUntil.current = Date.now() + 8000;
    // RTL: drag right (positive dx) → previous; drag left → next
    // In LTR mental model swipe left = next; in RTL mirror feels natural for "next"
    const dir = document.documentElement.dir === "rtl" ? 1 : -1;
    goTo(index + (dx * dir > 0 ? 1 : -1));
  };

  const current = slides[index];
  if (!current) return null;

  return (
    <section
      className="testimonials"
      aria-roledescription="carousel"
      aria-label="חוות דעת אורחים"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="container-content">
        <div
          className="testimonials__slide"
          style={{ opacity: fade ? 1 : 0 }}
          aria-live="polite"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <Stars rating={current.rating} />
          <p className="testimonials__quote font-display">{current.text}</p>
          <p className="testimonials__author">{current.author}</p>
        </div>

        <div className="testimonials__dots" role="tablist" aria-label="בחירת ביקורת">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`ביקורת ${i + 1}`}
              className={`testimonials__dot${i === index ? " is-active" : ""}`}
              onClick={() => {
                pauseUntil.current = Date.now() + 8000;
                goTo(i);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
