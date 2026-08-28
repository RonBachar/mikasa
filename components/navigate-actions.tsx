"use client";

import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

/**
 * Waze and Google Maps navigation, one tap from the page to turn-by-turn.
 *
 * Both links are plain https universal links. On a phone the installed app
 * intercepts them and opens straight into navigation; with no app installed
 * the same URL loads the web version. The `waze://` and `comgooglemaps://`
 * app schemes were deliberately not used: they open nothing and show an error
 * for anyone without the app, which is the opposite of the point.
 *
 * The two brand marks carry their real brand colours, following the same
 * reasoning docs/DESIGN.md records for the WhatsApp button: a Waze button that is
 * not Waze-blue reads as broken rather than as on-brand. Everything else
 * about these buttons (sharp corners, tracked type, hairline rule) belongs
 * to the house system, so the brand lives only in the mark itself.
 *
 * Marks are defined here rather than in the shared icon module on purpose:
 * these are third-party logos, not part of Mikasa's own drawn icon set.
 */

/** Waze speech-bubble mark. */
function WazeMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        d="M12 2.7c-4.6 0-8.3 3.2-8.3 7.2 0 1.6.6 3.1 1.6 4.3.3.4.4.9.2 1.4l-.7 1.9a.6.6 0 0 0 .8.8l2.4-1a1.3 1.3 0 0 1 1 0c1 .4 2 .6 3 .6 4.6 0 8.3-3.2 8.3-7.2S16.6 2.7 12 2.7z"
        fill="#33CCFF"
      />
      <circle cx="9.4" cy="9.6" r="1.15" fill="#0B2B3C" />
      <circle cx="14.6" cy="9.6" r="1.15" fill="#0B2B3C" />
      <path
        d="M9.2 13.1c.7.8 1.7 1.2 2.8 1.2s2.1-.4 2.8-1.2"
        stroke="#0B2B3C"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Google Maps pin, in Google's marker red. */
function MapsMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        d="M12 2.2c-3.7 0-6.7 3-6.7 6.7 0 4.9 6 12.3 6.3 12.6a.5.5 0 0 0 .8 0c.3-.3 6.3-7.7 6.3-12.6 0-3.7-3-6.7-6.7-6.7z"
        fill="#EA4335"
      />
      <circle cx="12" cy="8.9" r="2.5" fill="#fff" />
    </svg>
  );
}

/**
 * @param variant "row" sits inline under an address; "stacked" fills the
 *   width on narrow columns such as the footer.
 * @param location GA4 label for where the tap happened.
 */
export function NavigateActions({
  location,
  variant = "row",
  className,
}: {
  location: string;
  variant?: "row" | "stacked";
  className?: string;
}) {
  return (
    <div
      className={`navigate-actions${variant === "stacked" ? " navigate-actions--stacked" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <a
        href={siteConfig.navigation.waze}
        target="_blank"
        rel="noopener noreferrer"
        className="navigate-btn"
        onClick={() => trackEvent("navigate_click", { app: "waze", location })}
        data-cta="waze"
      >
        <WazeMark />
        <span>ניווט ב-Waze</span>
      </a>

      <a
        href={siteConfig.navigation.googleMaps}
        target="_blank"
        rel="noopener noreferrer"
        className="navigate-btn"
        onClick={() => trackEvent("navigate_click", { app: "google_maps", location })}
        data-cta="google-maps"
      >
        <MapsMark />
        <span>ניווט בגוגל מפות</span>
      </a>
    </div>
  );
}
