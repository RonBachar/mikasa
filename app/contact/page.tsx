import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PhoneCTA, WhatsAppCTA } from "@/components/cta";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "הזמנת סוויטה ויצירת קשר | צימר מיקאסה, שעל",
  description:
    "יצירת קשר עם מיקאסה בשעל, רמת הגולן. הזמנה בטלפון או בוואטסאפ, כתובת ושעות. חייגו למיקה 054-586-9818.",
  alternates: { canonical: "/contact" },
};

const mapsQuery = encodeURIComponent(siteConfig.address.full);

export default function ContactPage() {
  return (
    <>
      <Section band="cream-2" className="!pt-28">
        <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "צור קשר", href: "/contact" }]} />
        <div className="mt-6 max-w-3xl">
          <span className="eyebrow">נשמח לשמוע מכם</span>
          <h1 className="text-5xl mt-3">הזמנת סוויטה ויצירת קשר</h1>
          <div className="hairline-short mt-4" />
          <p className="mt-5 text-xl text-[--color-ink-soft] leading-relaxed">
            ההזמנה במיקאסה אישית ופשוטה, בשיחת טלפון או הודעת וואטסאפ ישירה למיקה.
            אין הזמנה אונליין, כי אנחנו אוהבים לתאם ולהכיר אתכם.
          </p>
        </div>
      </Section>

      <Section band="cream">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact details */}
          <div className="space-y-6">
            <div className="card p-7">
              <h2 className="font-display text-2xl text-[--color-ink]">דברו עם מיקה</h2>
              <div className="hairline-short my-4" />
              <div className="space-y-4">
                <p className="flex items-center gap-3 text-lg">
                  <PhoneIcon />
                  <a href={siteConfig.telHref} dir="ltr" className="tabular-nums font-semibold hover:text-[--color-ink-soft]">
                    {siteConfig.phoneDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-3 text-lg">
                  <WhatsAppIcon />
                  <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[--color-ink-soft]">
                    שליחת הודעה בוואטסאפ
                  </a>
                </p>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <PhoneCTA location="contact" showNumber className="w-full" />
                <WhatsAppCTA location="contact" className="w-full" />
              </div>
            </div>

            <div className="card p-7">
              <h2 className="font-display text-2xl text-[--color-ink]">כתובת ושעות</h2>
              <div className="hairline-short my-4" />
              <address className="not-italic space-y-2 text-[--color-ink-soft]">
                <p>{siteConfig.address.full}</p>
                <p>{siteConfig.hours}</p>
              </address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline mt-5"
              >
                פתחו בגוגל מפות
              </a>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="card p-0 overflow-hidden flex flex-col">
            <div
              className="flex-1 flex items-center justify-center text-center p-10 min-h-72"
              style={{ background: "var(--color-cream-2)" }}
            >
              <div>
                <p className="font-display text-2xl text-[--color-ink]">מושב שעל, רמת הגולן</p>
                <p className="mt-3 text-[--color-ink-soft] max-w-xs mx-auto">
                  {/* TODO owner: לאשר מיקום מדויק להטמעת מפה חיה */}
                  אנחנו בצפון הגולן, קרוב לחרמון, לסער ולבירכת רם.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
