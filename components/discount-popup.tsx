"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { stayDeals } from "@/content/pricing";
import { trackEvent } from "@/lib/analytics";
import { CloseIcon } from "./icons";

const SEEN_KEY = "mikasa_discount_popup_seen";
const SCROLL_TRIGGER_PCT = 50;
const TIME_TRIGGER_MS = 15_000;

/**
 * The multi-night discount, surfaced once per visit as its own moment
 * instead of waiting to be found on /prices.
 *
 * Fires on whichever comes first: 15 seconds on the page, or 50% scroll
 * depth. Either signal means someone is actually reading, not bouncing —
 * showing it immediately on load would just be another thing competing with
 * the hero for attention.
 *
 * Suppressed on /prices itself (the deals already have a full, better
 * presentation there — the popup would be announcing something already on
 * screen) and on /contact (a visitor already mid-booking doesn't need a
 * discount pitch interrupting them).
 *
 * Shown once per browser session via sessionStorage: persistent across
 * pages in one visit, forgotten when the tab closes. A popup that reappears
 * on every page navigation reads as nagging, not helpful.
 */
export function DiscountPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const shownRef = useRef(false);

  const suppressed = pathname === "/prices" || pathname === "/contact";

  useEffect(() => {
    if (suppressed) return;

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Storage blocked (private mode, some in-app browsers): fall back to
      // showing once per page load rather than not at all.
    }
    if (alreadySeen) return;

    const trigger = () => {
      if (shownRef.current) return;
      shownRef.current = true;
      setVisible(true);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Nothing to do if storage is unavailable; it will just show again
        // on the next page in this session, which is a mild inconvenience,
        // not a bug worth handling further.
      }
      trackEvent("cta_click", { location: "discount-popup-shown" });
    };

    const timer = setTimeout(trigger, TIME_TRIGGER_MS);

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return;
      if ((scrolled / scrollable) * 100 >= SCROLL_TRIGGER_PCT) {
        trigger();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
    // Deliberately re-arms on route change (pathname dependency): a visitor
    // who dismissed it is remembered via sessionStorage above regardless.
  }, [pathname, suppressed]);

  if (suppressed || !visible) return null;

  const [midweek, weekend] = stayDeals;

  return (
    <div className="discount-popup__layer">
      <div
        className="discount-popup hero-card kraft-grain"
        role="dialog"
        aria-labelledby="discount-popup-title"
        style={{ "--hero-angle": "-1deg" } as React.CSSProperties}
      >
        <button
          type="button"
          className="discount-popup__close"
          aria-label="סגירה"
          onClick={() => setVisible(false)}
        >
          <CloseIcon width={16} height={16} />
        </button>

        <span className="eyebrow">הטבת ספטמבר</span>
        <h2 id="discount-popup-title" className="hero-card__title font-display">
        יוצאים מהמרוץ לקצת יותר מלילה אחד?
        </h2>
        {/* Nights and percentages stay wired to content/pricing.ts so this can
            never quote a number /prices has moved on from. The discount is off
            the whole stay, which is what dealPricing() actually computes. */}
        <p className="hero-card__body">
          תנו לעצמכם עוד זמן לנשום. למזמינים {midweek.nights} לילות ומעלה תנתן
          הנחה של {midweek.discountPct}% באמצע שבוע (ראשון-רביעי) ו-
          {weekend.discountPct}% הנחה בסוף השבוע.
        </p>

        <div className="hero-card__actions">
          <Link
            href="/prices"
            className="btn btn-primary"
            onClick={() => trackEvent("cta_click", { location: "discount-popup-cta" })}
          >
            לבדיקת מחירים והנחות
          </Link>
        </div>
      </div>
    </div>
  );
}
