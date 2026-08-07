import { PhoneCTA, WhatsAppCTA } from "./cta";
import { siteConfig } from "@/lib/site-config";

/** Mid-page dark CTA band with the phone number spelled out. */
export function CtaBand({
  title = "מתלבטים? מיקה תשמח לעזור.",
  subtitle,
  location = "cta-band",
}: {
  title?: string;
  subtitle?: string;
  location?: string;
}) {
  return (
    <section className="on-dark" style={{ background: "var(--color-dark)", color: "var(--color-cream)" }}>
      <div className="hairline" />
      <div className="container-content py-20 md:py-24 text-center">
        <span className="eyebrow mx-auto" style={{ color: "var(--color-gold-soft)" }}>
          מיקאסה, שעל
        </span>
        <h2 className="text-4xl mt-5" style={{ color: "var(--color-white)" }}>
          {title}
        </h2>
        <p className="mt-3 text-lg opacity-90">
          {subtitle ?? (
            <>
              חייגו{" "}
              <a href={siteConfig.telHref} dir="ltr" className="tabular-nums font-semibold" style={{ color: "var(--color-gold-soft)" }}>
                {siteConfig.phoneDisplay}
              </a>
            </>
          )}
        </p>
        <div className="mt-7 flex flex-wrap gap-4 justify-center">
          <PhoneCTA location={location} showNumber />
          <WhatsAppCTA location={location} />
        </div>
      </div>
    </section>
  );
}

/** Final CTA block (phone + WhatsApp), used at the bottom of most pages. */
export function FinalCta({ location = "final-cta" }: { location?: string }) {
  return (
    <section style={{ background: "var(--color-cream-2)" }}>
      <div className="container-content py-20 md:py-24 text-center">
        <span className="eyebrow mx-auto">מוכנים לחופשה?</span>
        <h2 className="text-4xl mt-5">שריינו את התאריכים שלכם במיקאסה</h2>
        <p className="mt-6 text-lg text-[--color-ink-soft] max-w-xl mx-auto">
          ההזמנה פשוטה, בשיחה או בהודעה ישירה למיקה. נשמח לבדוק תאריכים ולתאם עבורכם
          חופשה זוגית מושלמת בגולן.
        </p>
        <div className="mt-7 flex flex-wrap gap-4 justify-center">
          <PhoneCTA location={location} showNumber />
          <WhatsAppCTA location={location} />
        </div>
      </div>
    </section>
  );
}
