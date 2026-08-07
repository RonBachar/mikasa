import Link from "next/link";
import type { Metadata } from "next";
import { HeroSplit } from "@/components/hero-split";
import { Section, SectionHeading } from "@/components/section";
import { SuiteCard } from "@/components/suite-card";
import { AmenityGrid } from "@/components/amenity-grid";
import { CtaBand, FinalCta } from "@/components/cta-band";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { SpecialOffers } from "@/components/special-offers";
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
      {/* Hero (Almaris split) */}
      <HeroSplit
        title="צימר מיקאסה, אירוח זוגי כפרי ורומנטי ברמת הגולן"
        body="גבוה בצפון רמת הגולן, מוקפת בטבע ובשקט, שוכנת מיקאסה. שתי סוויטות זוגיות בלבד, כל אחת עם ג'קוזי פרטי ומרפסת, מזמינות אתכם לחופשה אינטימית ומפנקת הרחק מהשגרה."
        image="exterior/exterior-garden-hero.webp"
        ctaLabel="הזמינו את השהייה שלכם"
        ctaHref="/contact"
      />

      {/* Our Suites — directly after hero, like Almaris Accommodation */}
      <Section band="cream" id="suites">
        <SectionHeading title="הסוויטות שלנו" center />
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          <SuiteCard suite={suites.forest} />
          <SuiteCard suite={suites.rain} />
        </div>
      </Section>

      {/* Testimonials carousel — Almaris style, no eyebrow/title */}
      <TestimonialsCarousel />

      {/* Special Offers — Almaris packages cards */}
      <SpecialOffers />

      {/* Short about */}
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
          <div
            className="relative overflow-hidden aspect-[4/3]"
            style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
          >
            <Img file="exterior/exterior-entrance-01.webp" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </Section>

      {/* Mid CTA band */}
      <CtaBand location="home-mid" />

      {/* Amenities */}
      <Section band="cream">
        <SectionHeading eyebrow="מה כולל הצימר" title="הכל מוכן לחופשה זוגית נינוחה" center />
        <AmenityGrid />
      </Section>

      {/* Gallery preview */}
      <Section band="cream">
        <SectionHeading eyebrow="הצצה למיקאסה" title="גלריית תמונות" center />
        <Gallery images={galleryPreview} columns={4} />
        <div className="text-center mt-8">
          <Link href="/gallery" className="btn btn-outline">לגלריה המלאה</Link>
        </div>
      </Section>

      {/* Area & attractions */}
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

      {/* FAQ */}
      <Section band="cream">
        <SectionHeading eyebrow="שאלות ותשובות" title="כל מה שרציתם לדעת" center />
        <FaqList items={homeFaqs} />
      </Section>

      {/* Final CTA */}
      <FinalCta location="home-final" />
    </>
  );
}
