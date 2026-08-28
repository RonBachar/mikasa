"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server. The distinction
 * matters here: the counter must reset to zero BEFORE the browser paints,
 * or hydration shows the final number for one frame and then snaps back.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Counts from zero to `value` the first time the element scrolls into view.
 *
 * Accessibility: the finished number is always what assistive tech reads.
 * The animating digits are aria-hidden and the real value sits beside them in
 * a visually hidden span, so a screen reader gets "2500" once rather than a
 * stream of intermediate numbers. This also fixed a real defect in the trust
 * band, where the whole badge carried aria-hidden and the numerals never
 * reached screen readers at all: "שנות אירוח" with no "19" is not a weaker
 * claim, it is no claim.
 *
 * Honours prefers-reduced-motion by rendering the final value immediately.
 */
export function CountUp({
  value,
  suffix = "",
  durationMs = 2600,
  className,
  announce = true,
}: {
  value: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
  /**
   * Set false when the surrounding component already exposes the number in
   * its own accessible text. Without it a screen reader hears the figure
   * twice, once bare and once in context.
   */
  announce?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Starts at the FINAL value, not zero. The server renders this markup, so a
  // visitor whose JavaScript never runs reads the real figure instead of "0
  // שנות אירוח", which would be worse than showing nothing.
  const [shown, setShown] = useState(value);
  const [done, setDone] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // already showing the final value

    let frame = 0;
    let cancelled = false;

    // Rewind before the first paint so the count is never seen jumping back.
    setShown(0);
    setDone(false);

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / durationMs);
        // Ease-out cubic: fast at first, settling onto the final number,
        // which reads as a tally landing rather than a linear ramp.
        const eased = 1 - Math.pow(1 - t, 3);
        setShown(Math.round(value * eased));
        if (t < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setDone(true);
        }
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            io.disconnect();
            run();
          }
        }
      },
      { threshold: 0.4 },
    );

    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  const display = `${shown.toLocaleString("he-IL")}${done ? suffix : ""}`;

  return (
    <span ref={ref} className={className}>
      {/* Digits are decorative while they move; the real value is beside them. */}
      <span aria-hidden dir="ltr" style={{ unicodeBidi: "isolate" }}>
        {display}
      </span>
      {announce && (
        <span className="sr-only">
          {value.toLocaleString("he-IL")}
          {suffix}
        </span>
      )}
    </span>
  );
}
