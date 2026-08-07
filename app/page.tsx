import Link from "next/link";
import type { Metadata } from "next";
import { HeroSplit } from "@/components/hero-split";
import { Section, SectionHeading } from "@/components/section";
import { SuiteCard } from "@/components/suite-card";
import { AmenityGrid } from "@/components/amenity-grid";
import { CtaBand, FinalCta } from "@/components/cta-band";
import { ReviewsGrid } from "@/components/reviews";
import { Gallery } from "@/components/gallery";
import { FaqList } from "@/components/faq";
import { Img } from "@/components/manifest-image";
import { suites } from "@/content/suites";
import { homeFaqs } from "@/content/faq";
import { areaCategories } from "@/content/area";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "מיקאסה | צימר רומנטי לזוג ברמת הגולן, שעל | ג'קוזי ונוף",
  description:
    "צימר מיקאסה בשעל, רמת הגולן. שתי סוויטות זוגיות עם ג'קוזי, מרפסת ואווירה כפרית רומנטית בלב טבע הגולן. חייגו למיקה 054-586-9818",
};

const trust = ["צימר זוגי בוטיק", "ג'קוזי פרטי", "נוף הגולן", "אירוח אישי של מיקה"];

const galleryPreview = [
  "forest-suite/forest-suite-jacuzzi-romantic.webp",
  "rain-suite/rain-suite-jacuzzi-02.webp",
  "exterior/exterior-garden-egg-chair-01.webp",
  "forest-suite/forest-suite-balcony-01.webp",
  "rain-suite/rain-suite-stone-sink.webp",
  "exterior/exterior-garden-hammock-hero.webp",
  "views/view-golan-valley.webp",
  "exterior/exterior-building-01.webp",
].map(img);

export default function Home() {
  return (
    <>
      {/* 2. Hero (Almaris split) */}
      <HeroSplit
        title="צימר מיקאסה, אירוח זוגי כפרי ורומנטי ברמת הגולן"
        body="שתי סוויטות זוגיות בוטיק עם ג'קוזי פרטי, מרפסת ונוף, לחופשה שקטה בחיק טבע הגולן."
        image="forest-suite/forest-suite-jacuzzi-romantic.webp"
        ctaLabel="להזמנת סוויטה"
        ctaHref="/contact"
      />

      {/* 3. Trust bar */}
      <div style={{ background: "var(--color-cream-2)", borderBlock: "1px solid var(--color-line)" }}>
        <div className="container-content py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm" style={{ color: "var(--color-ink-soft)" }}>
          {trust.map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span aria-hidden style={{ color: "var(--color-gold)" }}>◆</span>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Short about */}
      <Section band="cream">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow">נעים להכיר</span>
            <h2 className="text-3xl mt-3">בית קטן וחם בלב הגולן</h2>
            <div className="hairline-short mt-4" />
            <p className="mt-5 text-lg text-[--color-ink-soft]">
              צימר מיקאסה הוא צימר זוגי בוטיק במושב שעל שברמת הגולן. בחרנו להישאר
              קטנים ואישיים, שתי סוויטות בלבד, כדי שכל זוג שמגיע ירגיש שהמקום כולו
              שלו. מיקה מלווה אתכם באופן אישי מהשיחה הראשונה ועד הרגע שאתם עוזבים.
            </p>
            <Link href="/about" className="btn btn-outline mt-6">הסיפור של מיקאסה</Link>
          </div>
          <div className="relative rounded-[--radius-card] overflow-hidden aspect-[4/3]">
            <Img file="exterior/exterior-entrance-01.webp" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </Section>

      {/* 5 + 6. Suites (Almaris accommodation grid) */}
      <Section band="cream-2" id="suites">
        <SectionHeading eyebrow="הסוויטות שלנו" title="שתי סוויטות, אווירה אחת של שקט ורומנטיקה"
          intro="שתי הסוויטות זהות במתקנים, ג'קוזי פרטי, מרפסת ומטבחון. ההבדל הוא באווירה: יער ירוק וטבעי מול אבן חמה ואינטימית." />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          <SuiteCard suite={suites.forest} />
          <SuiteCard suite={suites.rain} />
        </div>
      </Section>

      {/* 7. Mid CTA band */}
      <CtaBand location="home-mid" />

      {/* 8. Amenities */}
      <Section band="cream">
        <SectionHeading eyebrow="מה כולל הצימר" title="הכל מוכן לחופשה זוגית נינוחה" center />
        <AmenityGrid />
      </Section>

      {/* 9. Reviews */}
      <Section band="cream-2">
        <SectionHeading eyebrow="אורחים מספרים" title="מה אומרים עלינו בגוגל" center />
        <ReviewsGrid />
      </Section>

      {/* 10. Gallery preview */}
      <Section band="cream">
        <SectionHeading eyebrow="הצצה למיקאסה" title="גלריית תמונות" center />
        <Gallery images={galleryPreview} columns={4} />
        <div className="text-center mt-8">
          <Link href="/gallery" className="btn btn-outline">לגלריה המלאה</Link>
        </div>
      </Section>

      {/* 11. Area & attractions */}
      <Section band="cream-2">
        <SectionHeading eyebrow="האזור שלנו" title="מה יש לעשות סביב מיקאסה"
          intro="שעל יושב בצפון רמת הגולן, קרוב לטבע, למים, ליקבים ולחרמון." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areaCategories.map((c) => (
            <li key={c.title} className="card p-6">
              <h3 className="font-display text-xl text-[--color-ink]">{c.title}</h3>
              <p className="mt-2 text-[--color-ink-soft]">{c.blurb}</p>
            </li>
          ))}
        </ul>
        <div className="text-center mt-8">
          <Link href="/area" className="btn btn-outline">לכל האטרקציות והמרחקים</Link>
        </div>
      </Section>

      {/* 12. FAQ */}
      <Section band="cream">
        <SectionHeading eyebrow="שאלות ותשובות" title="כל מה שרציתם לדעת" center />
        <FaqList items={homeFaqs} />
      </Section>

      {/* 13. Final CTA */}
      <FinalCta location="home-final" />
    </>
  );
}
