"use client";

import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";
import { PhoneIcon, WhatsAppIcon } from "./icons";

type Variant = "primary" | "outline" | "whatsapp";

function cx(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/**
 * Phone call CTA. Reused everywhere. Fires a GA4 phone_click conversion event.
 */
export function PhoneCTA({
  variant = "primary",
  className,
  location,
  showNumber = false,
  children,
}: {
  variant?: Variant;
  className?: string;
  location?: string; // where on the site the click happened
  showNumber?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={siteConfig.telHref}
      className={cx("btn", variant === "outline" ? "btn-outline" : "btn-primary", className)}
      onClick={() => trackEvent("phone_click", { location: location ?? "unknown" })}
      data-cta="phone"
    >
      <PhoneIcon />
      <span>
        {children ?? "חייגו עכשיו"}
        {showNumber && (
          <span dir="ltr" className="ms-2 font-semibold tabular-nums">
            {siteConfig.phoneDisplay}
          </span>
        )}
      </span>
    </a>
  );
}

/**
 * WhatsApp CTA. Opens wa.me with the pre-filled Hebrew message.
 * Fires a distinct GA4 whatsapp_click conversion event.
 */
export function WhatsAppCTA({
  className,
  location,
  children,
}: {
  className?: string;
  location?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={siteConfig.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cx("btn btn-whatsapp", className)}
      onClick={() => trackEvent("whatsapp_click", { location: location ?? "unknown" })}
      data-cta="whatsapp"
    >
      <WhatsAppIcon />
      <span>{children ?? "שלחו וואטסאפ"}</span>
    </a>
  );
}
