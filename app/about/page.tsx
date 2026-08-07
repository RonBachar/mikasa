import type { Metadata } from "next";
import { Section } from "@/components/section";
import { CtaBand, FinalCta } from "@/components/cta-band";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Img } from "@/components/manifest-image";

export const metadata: Metadata = {
  title: "הסיפור של מיקאסה | אירוח זוגי כפרי בשעל, גולן",
  description:
    "הסיפור של צימר מיקאסה, אירוח זוגי אישי וחם של מיקה במושב שעל שברמת הגולן. הכירו את המקום ואת האנשים. חייגו 054-586-9818.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section band="cream-2" className="!pt-28">
        <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "אודות", href: "/about" }]} />
        <div className="mt-6 max-w-3xl">
          <span className="eyebrow">נעים להכיר</span>
          <h1 className="text-5xl mt-3">הסיפור של מיקאסה</h1>
          <div className="hairline-short mt-4" />
        </div>
      </Section>

      {/* Owner-pending notice (remove before launch) */}
      <div style={{ background: "#fff7e6", borderBlock: "1px solid var(--color-gold)" }}>
        <div className="container-content py-3 text-sm text-[--color-ink-soft]">
          הערה לצוות: זו טיוטה (גרסה א׳) לאישור מיקה לפני העלייה לאוויר. יש להסיר את
          ההערה הזו לאחר האישור.
        </div>
      </div>

      <Section band="cream">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
          <article className="prose-mikasa max-w-2xl text-lg leading-relaxed text-[--color-ink] space-y-5">
            <p className="text-xl text-[--color-ink-soft]">נעים מאוד, אני מיקה.</p>
            <p>
              לפני [כמה] שנים, כשהחלטנו להפוך את הפינה הזאת שלנו במושב שעל למקום
              אירוח, לא חיפשנו להקים ״עסק״. חיפשנו לתת לזוגות בדיוק את מה שאנחנו הכי
              אוהבים בעצמנו, פינה שקטה בטבע, הרחק מהרעש, שבה אפשר סוף סוף לנשום.
            </p>
            <p>
              שעל יושב בצפון רמת הגולן, בגובה, מוקף מטעים ונוף שנפתח אל עמק החולה,
              החרמון והכינרת. באביב הכל פורח, בקיץ האוויר צלול וקריר, ובחורף לפעמים
              יורד שלג ומכסה הכל בלבן. זה מקום שמרגיש רחוק מהעולם, אבל הוא קרוב לכל
              מה שיפה בגולן.
            </p>
            <p>
              במיקאסה יש שתי סוויטות, סוויטת יער וסוויטת גשם. כל אחת מהן עוצבה
              באהבה, עם ג׳קוזי פרטי, מרפסת ופינה חמה משלכם. אין כאן הרבה יחידות ואין
              המולה, וזה בכוונה. אני אוהבת שכל זוג שמגיע מרגיש שהמקום כולו שלו.
            </p>
            <p>
              אני מלווה כל אורח באופן אישי, מהשיחה הראשונה בטלפון ועד הרגע שאתם
              עוזבים. אשמח לעזור לכם לתכנן את החופשה, להמליץ על מסלול טיול או יקב, או
              פשוט לדאוג שיהיה לכם הכל כדי לנוח.
            </p>
            <p>
              אתם מוזמנים להתקשר אליי. אשמח להכיר אתכם ולעזור לכם למצוא את התאריך
              המושלם.
            </p>
            <p className="font-display text-2xl text-[--color-ink]">
              בחום,
              <br />
              מיקה
            </p>
          </article>

          <div className="space-y-5">
            <div className="relative rounded-[--radius-card] overflow-hidden aspect-[4/5]">
              <Img file="exterior/exterior-sign-mikasa.webp" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="relative rounded-[--radius-card] overflow-hidden aspect-[4/3]">
              <Img file="exterior/exterior-building-01.webp" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover" />
            </div>
          </div>
        </div>
      </Section>

      <CtaBand location="about" title="בואו נכיר." subtitle="חייגו למיקה, ונתכנן יחד את החופשה הזוגית שלכם בגולן." />

      <FinalCta location="about-final" />
    </>
  );
}
