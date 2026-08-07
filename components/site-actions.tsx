"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";
import { PhoneIcon, WhatsAppIcon } from "./icons";

function GalleryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="1.6" />
      <path d="m21 15-4.5-4.5L7 20" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

const railItem =
  "group/rail flex items-center justify-center w-12 h-12 text-[--color-gold] transition-colors duration-150 hover:bg-[--color-gold] hover:text-white";

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
          aria-label={`חייגו ${siteConfig.phoneDisplay}`}
          title="חייגו עכשיו"
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
          aria-label="שליחת הודעת וואטסאפ"
          title="וואטסאפ"
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

      {/* Mobile fixed action bar */}
      <div
        className="lg:hidden fixed inset-x-0 bottom-0 z-40 grid grid-cols-2"
        style={{
          background: "var(--color-dark)",
          paddingBottom: "env(safe-area-inset-bottom)",
          boxShadow: "0 -4px 20px rgba(43,38,32,0.25)",
        }}
        role="group"
        aria-label="יצירת קשר מהיר"
      >
        <a
          href={siteConfig.telHref}
          onClick={() => trackEvent("phone_click", { location: "mobile-bar" })}
          className="flex items-center justify-center gap-2 py-3.5 font-semibold"
          style={{ color: "var(--color-cream)" }}
          data-cta="phone"
        >
          <PhoneIcon width={22} height={22} />
          חייגו עכשיו
        </a>
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { location: "mobile-bar" })}
          className="flex items-center justify-center gap-2 py-3.5 font-semibold"
          style={{ background: "#25d366", color: "#06231a" }}
          data-cta="whatsapp"
        >
          <WhatsAppIcon width={22} height={22} />
          וואטסאפ
        </a>
      </div>

      <div aria-hidden className="lg:hidden" style={{ height: "calc(3.5rem + env(safe-area-inset-bottom))" }} />
    </>
  );
}
