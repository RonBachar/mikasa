import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { footerNav } from "@/lib/nav";
import { Logo } from "./logo";
import { PhoneCTA, WhatsAppCTA } from "./cta";
import { PhoneIcon, WhatsAppIcon } from "./icons";

export function SiteFooter() {
  const year = 2026; // build-time constant; update on redeploy

  return (
    <footer className="on-dark mt-0" style={{ background: "var(--color-dark)", color: "var(--color-cream)" }}>
      <div className="hairline" />
      <div className="container-content py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + contact */}
          <div className="lg:col-span-1">
            <Logo onDark />
            <p className="mt-5 text-sm opacity-85 max-w-xs">
              {siteConfig.shortDescription}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <PhoneCTA location="footer" showNumber className="!py-2.5" />
              <WhatsAppCTA location="footer" className="!py-2.5" />
            </div>
          </div>

          {/* Nav primary */}
          <nav aria-label="ניווט תחתון" className="text-sm">
            <h2 className="font-display text-lg mb-4" style={{ color: "var(--color-gold-soft)" }}>
              הצימר
            </h2>
            <ul className="space-y-2.5">
              {footerNav.primary.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="opacity-85 hover:opacity-100 hover:text-[--color-gold-soft] transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Nav secondary */}
          <nav aria-label="עמודים נוספים" className="text-sm">
            <h2 className="font-display text-lg mb-4" style={{ color: "var(--color-gold-soft)" }}>
              עוד במיקאסה
            </h2>
            <ul className="space-y-2.5">
              {footerNav.secondary.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="opacity-85 hover:opacity-100 hover:text-[--color-gold-soft] transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact details */}
          <div className="text-sm">
            <h2 className="font-display text-lg mb-4" style={{ color: "var(--color-gold-soft)" }}>
              פרטים ויצירת קשר
            </h2>
            <address className="not-italic space-y-3 opacity-90">
              <p>{siteConfig.address.full}</p>
              <p className="flex items-center gap-2">
                <PhoneIcon width={16} height={16} />
                <a href={siteConfig.telHref} dir="ltr" className="tabular-nums hover:text-[--color-gold-soft]">
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <WhatsAppIcon width={16} height={16} />
                <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-[--color-gold-soft]">
                  שליחת הודעה בוואטסאפ
                </a>
              </p>
              <p className="opacity-80">{siteConfig.hours}</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-80"
          style={{ borderTop: "1px solid color-mix(in srgb, var(--color-gold) 25%, transparent)" }}
        >
          <p>
            © {year} {siteConfig.legalName}. כל הזכויות שמורות.
          </p>
          <ul className="flex items-center gap-5">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[--color-gold-soft] transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
