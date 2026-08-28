import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { footerNav } from "@/lib/nav";
import { Logo } from "./logo";
import { PhoneIcon, WhatsAppIcon, MailIcon } from "./icons";
import { NavigateActions } from "./navigate-actions";
import { EmailLink } from "./email-link";

export function SiteFooter() {
  const year = 2026; // build-time constant; update on redeploy

  return (
    <footer className="on-dark mt-0" style={{ background: "var(--color-dark)", color: "#ffffff" }}>
      <div className="hairline" />
      <div className="container-content py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + contact */}
          <div className="lg:col-span-1">
            <Logo onDark />
            {/* No CTA buttons here. The closing CtaBand sits directly above
                the footer on every page, so a second pair of the same two
                buttons a few hundred pixels lower was pure repetition. The
                number and the WhatsApp link are still reachable as plain
                links in the contact column. */}
            <p className="mt-5 text-sm opacity-85 max-w-xs">
              {siteConfig.shortDescription}
            </p>
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
              <p className="flex items-center gap-2">
                <MailIcon width={16} height={16} />
                <EmailLink className="hover:text-[--color-gold-soft]" />
              </p>
              <p className="opacity-80">{siteConfig.hours}</p>
            </address>

            {/* Navigation lives next to the address, where someone who has
                already decided to come looks for it. Universal links, so a
                phone opens the installed app straight into turn-by-turn. */}
            <NavigateActions location="footer" variant="stacked" className="mt-5" />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-80"
          style={{ borderTop: "1px solid color-mix(in srgb, var(--color-gold) 25%, transparent)" }}
        >
          {/* The CC BY 3.0 credit for the area glyphs used to sit here. It now
              lives in a "קרדיטים" section on /privacy, which the legal links
              below point to. The licence asks for credit "in a reasonable
              manner", not for it to be in the footer specifically, so this
              stays compliant while keeping the bottom bar clean.
              See components/area-icons.tsx. */}
          <p className="text-center">
            © {year} {siteConfig.legalName}. כל הזכויות שמורות.
              <br />
              <a
                href="https://www.matara.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[--color-gold-soft] transition"
              >
                מטרה עיצוב ובניית אתרים
              </a>
          
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
