import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Section } from "@/components/section";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Img } from "@/components/manifest-image";

export const metadata: Metadata = pageMeta({
  title: "הסיפור האישי של מיקאסה | אירוח זוגי כפרי בשעל, גולן",
  description:
    "הכירו את מיקאסה: הסיפור האישי של צימר בוטיק לזוגות במושב שעל, רמת הגולן. אירוח חם ומלא השראה ממיקה. לפרטים, חייגו: 054-586-9818.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "בית", href: "/" }, { label: "אודות", href: "/about" }]}
        image="exterior/exterior-building-01.webp"
        eyebrow="נעים להכיר"
        title="הסיפור של מיקאסה"
        body={"שתי סוויטות ותשע-עשרה שנות ניסיון אירוח כפרי. זה הסיפור שלנו, בקצרה."}
        angle={1.4}
        cardAlign="end"
      />

      <Section band="cream">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
          <article className="prose-mikasa max-w-2xl text-lg leading-relaxed text-[--color-ink] space-y-5">
            <p className="text-xl text-[--color-ink-soft]">נעים מאוד, אני מיקה.</p>
            <p>
              משפחת בכר היא משפחת חקלאים הנושמת את האדמה כבר למעלה מ-40 שנה. המטעים והכרמים שלנו - גפנים, דובדבנים, אפרסקים, קיווי ותפוחי עץ הנהנים מהגובה והאקלים המיוחד של צפון הגולן, ומקיפים את הבית שלנו בירוק שמתחלף עם עונות השנה. כחלק משגרת החיים הזו, הטבע והשקט הם חלק בלתי נפרד ממי שאנחנו.
            </p>
            <p>
              לפני 19 שנה, כשהחלטנו להפוך את הפינה הפרטית שלנו במושב שעל למקום אירוח, חלמנו להעניק לזוגות בדיוק את מה שאנחנו אוהבים יותר מכל - פינה שקטה בלב הטבע, הרחק מהרעש, מקום שבו אפשר לצאת מהמרוץ ולנשום עמוק.
            </p>
            <p>
              אני מלווה אתכם באופן אישי משיחת הטלפון הראשונה - מייעצת על מסלולי טיול, יקבים ומסעדות טובות, ודואגת שתגיעו לחופשה שלכם בנחת ובראש שקט.
            </p>
            <p>מחכה לראות אתכם בין אורחינו,</p>
            <p className="font-display text-2xl text-[--color-ink]">באהבה מיקה</p>
          </article>

          {/* A stack of two square-ish prints, not two full-width panels.
              The back one sits high and toward the reading start (right, in
              RTL); the front one overlaps it lower and toward the end,
              carries a slight counter-tilt and the stronger shadow, and reads
              as physically resting on top — the same "photo pinned to a
              crate" language as .hero-card and .suite-card, applied to two
              images instead of one label. Owner-sketched layout, 2026-08-27. */}
          <div className="photo-stack">
            <div className="photo-stack__back">
              <Img
                file="exterior/exterior-sign-mikasa.webp"
                fill
                sizes="(max-width:1024px) 60vw, 24vw"
                className="object-cover"
              />
            </div>
            {/* Was exterior-building-01 (the same photo already used as this
                page's own hero background, right above); a Golan view reads
                better here than a repeat of the building. */}
            <div className="photo-stack__front">
              <Img
                file="views/view-golan-valley.webp"
                fill
                sizes="(max-width:1024px) 60vw, 24vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      <CtaBand location="about" />
    </>
  );
}
