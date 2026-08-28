import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Section } from "@/components/section";
import { PageHero } from "@/components/page-hero";
import { PhoneCTA, WhatsAppCTA } from "@/components/cta";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMeta({
  title: "הזמנת סוויטה אישית ויצירת קשר | צימר מיקאסה, שעל",
  description:
    "ליצירת קשר עם מיקאסה בשעל, רמת הגולן, והזמנת סוויטה בטלפון או בוואטסאפ. כתובת, שעות ודרכי הגעה. חייגו למיקה: 054-586-9818.",
  path: "/contact",
});

const mapsQuery = encodeURIComponent(siteConfig.address.full);

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "בית", href: "/" }, { label: "צור קשר", href: "/contact" }]}
        image="exterior/exterior-patio-01.webp"
        eyebrow="נשמח לשמוע מכם"
        title="הזמנת סוויטה ויצירת קשר"
        body={"הזמנה כאן היא תמיד אישית: שיחה או הודעת וואטסאפ ישירה אליי, מיקה. אני מעדיפה להכיר אתכם לפני שאתם מגיעים."}
        angle={-1.3}
      />

      <Section band="cream">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact details */}
          <div className="space-y-6">
            <div className="card p-7">
              <h2 className="font-display text-2xl text-[--color-ink]">להזמנות ומידע נוסף צרו קשר</h2>
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
                <PhoneCTA location="contact" className="w-full">בטלפון</PhoneCTA>
                <WhatsAppCTA location="contact" className="w-full">בוואטסאפ</WhatsAppCTA>
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
                  אנחנו ממוקמים בלב ליבו של צפון הגולן, מרחק קצר מהחרמון, מפל סער ובריכת רם הקסומה.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
