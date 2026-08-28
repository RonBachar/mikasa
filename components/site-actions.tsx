"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";
import { PhoneIcon, WhatsAppIcon, GalleryIcon, MailIcon } from "./icons";

const railItem = "rail-item";

/**
 * Almaris-style fixed vertical icon rail (desktop), pinned to the right edge and
 * vertically centered. Slim white card, thin line border, gold icons. Replaces
 * the old floating WhatsApp bubble. Mobile keeps the fixed bottom call/WA bar.
 */
export function SiteActions() {
  return (
    <>
      {/* Desktop side rail */}
      <div
        className="hidden lg:flex fixed top-1/2 -translate-y-1/2 z-40 flex-col overflow-hidden bg-white"
        style={{
          right: "0.75rem",
          border: "1px solid var(--color-line)",
          borderRadius: "10px",
          boxShadow: "0 10px 30px rgba(43,38,32,0.12)",
        }}
        role="group"
        aria-label="פעולות מהירות"
      >
        <a
          href={siteConfig.telHref}
          onClick={() => trackEvent("phone_click", { location: "rail" })}
          className={railItem}
          aria-label={`התקשרו אליי, ${siteConfig.phoneDisplay}`}
          title="התקשרו אליי"
          data-cta="phone"
        >
          <PhoneIcon />
        </a>
        <span aria-hidden style={{ height: 1, background: "var(--color-line)" }} />
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { location: "rail" })}
          className={railItem}
          aria-label="שלחו לי הודעה בוואטסאפ"
          title="שלחו לי הודעה"
          data-cta="whatsapp"
        >
          <WhatsAppIcon width={20} height={20} />
        </a>
        <span aria-hidden style={{ height: 1, background: "var(--color-line)" }} />
        <Link href="/gallery" className={railItem} aria-label="לגלריית התמונות" title="גלריה">
          <GalleryIcon />
        </Link>
        <span aria-hidden style={{ height: 1, background: "var(--color-line)" }} />
        <Link href="/contact" className={railItem} aria-label="ליצירת קשר" title="צור קשר">
          <MailIcon />
        </Link>
      </div>

      {/* Mobile fixed action bar - matched gold + brown pair, palette only */}
      <div
        className="lg:hidden fixed inset-x-0 bottom-0 z-40 grid grid-cols-2"
        style={{ boxShadow: "0 -6px 22px rgba(43,38,32,0.28)" }}
        role="group"
        aria-label="יצירת קשר מהיר"
      >
        <a
          href={siteConfig.telHref}
          onClick={() => trackEvent("phone_click", { location: "mobile-bar" })}
          className="flex items-center justify-center gap-2.5 text-[0.95rem] font-medium tracking-wide transition-[filter] duration-200 active:brightness-95"
          style={{
            background: "var(--color-gold)",
            color: "#fff",
            padding: "1rem 0",
            paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",
          }}
          data-cta="phone"
        >
          <PhoneIcon width={21} height={21} />
          <span className="whitespace-nowrap">להזמנות התקשרו</span>
        </a>
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { location: "mobile-bar" })}
          className="flex items-center justify-center gap-2.5 text-[0.95rem] font-medium tracking-wide transition-[filter] duration-200 active:brightness-110"
          style={{
            /* WhatsApp's own green, not the near-black this used to be.
               docs/DESIGN.md records the green as the single deliberate brand-colour
               exception in the system, because a WhatsApp button that is not
               WhatsApp-green reads as broken rather than as on-brand, and the
               desktop .btn-whatsapp already follows that rule. */
            background: "#25D366",
            color: "#0B2B18",
            padding: "1rem 0",
            paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",
            borderInlineStart: "1px solid rgba(255,255,255,0.22)",
          }}
          data-cta="whatsapp"
        >
          <WhatsAppIcon width={20} height={20} />
          <span className="whitespace-nowrap">וואטסאפ</span>
        </a>
      </div>

      {/* Spacer matching the bar's real height, so the last of the page is not
          hidden underneath it. Reads the same token .hero-shell subtracts, so
          the two cannot disagree about how tall this bar is. */}
      <div
        aria-hidden
        className="lg:hidden"
        style={{ height: "var(--action-bar-h)" }}
      />
    </>
  );
}
