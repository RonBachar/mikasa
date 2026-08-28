import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMeta({
  title: "הצהרת נגישות | צימר מיקאסה",
  description: "הצהרת הנגישות של אתר צימר מיקאסה, בהתאם לחוק ולתקן הישראלי.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <>
    <Section band="cream" className="!pt-28">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "הצהרת נגישות", href: "/accessibility" }]} />
      <div className="mt-6 max-w-3xl text-[--color-ink] leading-relaxed space-y-5">
        <h1 className="text-4xl">הצהרת נגישות</h1>
        <div className="hairline-short" />
        <p>
          צימר מיקאסה רואה חשיבות רבה במתן שירות שוויוני ונגיש לכלל הגולשים, ופועל
          להנגשת אתר האינטרנט שלו בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות,
          התשנ״ח, ולתקנות שהותקנו מכוחו, וכן לתקן הישראלי (ת״י 5568) המבוסס על
          הנחיות הנגישות לתכני אינטרנט WCAG 2.0 ברמה AA.
        </p>

        <h2 className="font-display text-2xl text-[--color-ink]">מה נגיש באתר</h2>
        <p>
          האתר תוכנן ונבנה כך שיתמוך בניווט מקלדת מלא, בסימון מיקוד ברור, במבנה
          כותרות תקין, בטקסט חלופי לתמונות, בניגודיות צבעים תקינה ובכיבוד העדפת
          המשתמש להפחתת אנימציות. האתר נבנה בגישת עיצוב מגיב ונתמך במגוון מסכים.
        </p>

        <h2 className="font-display text-2xl text-[--color-ink]">מגבלות ידועות</h2>
        <p>
          {/* TODO owner: לעדכן אם ידועות מגבלות נגישות ספציפיות */}
          ייתכן שחלק מהתכנים של צד שלישי (כגון מפות או שירותים חיצוניים) אינם
          בשליטתנו המלאה. אנו פועלים לשפר את הנגישות באופן שוטף.
        </p>

        <h2 className="font-display text-2xl text-[--color-ink]">פנייה בנושא נגישות</h2>
        <p>
          נתקלתם בקושי בגלישה או בבעיית נגישות? נשמח שתעדכנו אותנו כדי שנוכל לתקן.
        </p>
        <ul className="list-disc ps-6 space-y-1">
          <li>
            טלפון:{" "}
            <a href={siteConfig.telHref} dir="ltr" className="tabular-nums underline decoration-[--color-gold] underline-offset-4">
              {siteConfig.phoneDisplay}
            </a>
          </li>
          <li>{/* TODO owner: כתובת אימייל לפניות נגישות */}אימייל: [להשלמה על ידי מיקה]</li>
          <li>רכז/ת נגישות: [שם להשלמה על ידי מיקה]</li>
        </ul>

        <p className="text-sm text-[--color-ink-soft]">
          תאריך עדכון ההצהרה: [להשלמה]. ההצהרה תעודכן מעת לעת עם המשך שיפור הנגישות.
        </p>
      </div>
    </Section>

    <CtaBand location="accessibility" />
    </>
  );
}
