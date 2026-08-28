import Link from "next/link";
import type { Metadata } from "next";
import { HeroSplit } from "@/components/hero-split";
import { Section, SectionHeading } from "@/components/section";
import { SuiteCard } from "@/components/suite-card";
import { AmenityGrid } from "@/components/amenity-grid";
import { TrustSeals } from "@/components/trust-seals";
import { SpecialOffers } from "@/components/special-offers";
import { GalleryStrip } from "@/components/gallery-strip";
import { FaqList } from "@/components/faq";
import { ReviewsBand } from "@/components/reviews-band";
import { CtaBand } from "@/components/cta-band";
import { Img } from "@/components/manifest-image";
import { suites } from "@/content/suites";
import { homeFaqs } from "@/content/faq";
import { areaCategories } from "@/content/area";
import { img, imagesIn } from "@/lib/images";
import {
  TrailIcon,
  VineIcon,
  SnowPeakIcon,
  SpringIcon,
  HorseshoeIcon,
  CafeIcon,
} from "@/components/area-icons";
import { IconStamp } from "@/components/icon-stamp";
import type { AreaCategoryIcon } from "@/content/area";

const areaIcons: Record<AreaCategoryIcon, typeof TrailIcon> = {
  trail: TrailIcon,
  vine: VineIcon,
  snow: SnowPeakIcon,
  spring: SpringIcon,
  sport: HorseshoeIcon,
  cafe: CafeIcon,
};

export const metadata: Metadata = {
  title: "צימר מיקאסה | צימר רומנטי לזוגות ברמת הגולן, שעל | ג'קוזי ונוף",
  description:
    "במיקאסה בשעל, רמת הגולן, מחכות לכם שתי סוויטות זוגיות עם ג'קוזי פרטי ומרפסת. חופשה כפרית רומנטית בלב הגולן, הרחק מהשגרה. לפרטים ותיאום, חייגו למיקה: 054-586-9818.",
};

// 8 strongest, most representative tiles for the pre-footer strip
// (mix of both suites, garden and exterior).
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

// Full image set the lightbox cycles through (all processed photos).
const galleryAll = [
  ...imagesIn("forest-suite"),
  ...imagesIn("rain-suite"),
  ...imagesIn("exterior"),
  ...imagesIn("views"),
];

export default function Home() {
  return (
    <>
      {/* The newline in `title` is deliberate and rendered via
          white-space: pre-line in hero-split.tsx, so the line always breaks
          after the moshav rather than wherever the container runs out. */}
      <HeroSplit
        title={"חווית אירוח כפרי במושב שעל,\nבצפון רמת הגולן."}
        body="בפינה גבוהה ושקטה , מוקפת טבע פראי, שוכנת מיקאסה. שתי סוויטות זוגיות ומוקפדות, כל אחת עם ג'קוזי פרטי ומרפסת משלה, מזמינות אתכם לחופשה אינטימית ומרגיעה, הרחק מההמולה."
        image="exterior/exterior-patio-01.webp"
        ctaLabel="שריינו את השהות שלכם"
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

      {/* Honest trust band — verified facts, not fabricated reviews */}
      <TrustSeals />

      {/* Special Offers — Almaris packages cards */}
      <SpecialOffers />

      {/* Short about. Kraft, not parchment: offers above and amenities below
          are both parchment, and three identical bands in a row turned the
          middle of the page into one undifferentiated block. */}
      <Section band="cream-2">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow">נעים להכיר</span>
            <h2 className="text-3xl mt-3">בית קטן וחם בלב הגולן</h2>
            <div className="hairline-short mt-4" />
            <p className="mt-5 text-lg text-[--color-ink-soft]">
              מיקאסה הוא צימר בוטיק זוגי ואינטימי במושב שעל שברמת הגולן. בחרנו בקפידה להציע רק שתי סוויטות, כדי להבטיח לכל זוג שמגיע תחושה שהמקום כולו שלו. אני, מיקה, אלווה אתכם באופן אישי מהשיחה הראשונה ועד שתצאו מאיתנו.
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

      {/* Amenities */}
      <Section band="cream">
        <SectionHeading eyebrow="מה מחכה לכם בסוויטה" title="הכל כאן מוכן לחופשה זוגית נינוחה." center />
        <AmenityGrid />
      </Section>

      {/* Area & attractions */}
      <Section band="cream-2">
        <SectionHeading eyebrow="האזור שלנו" title="מה תוכלו לעשות סביב מיקאסה"
          intro="המושב שלנו יושב בלב הטבע, בקרבת אטרקציות, מסעדות ומסלולי טיולים." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areaCategories.map((c) => {
            const Glyph = areaIcons[c.icon];
            return (
              <li key={c.title} className="card p-6">
                <div className="flex items-center gap-3">
                  {/* Forest variant here, cherry on the amenities grid above:
                      one treatment, two variety colors, so the sections stay distinct. */}
                  <IconStamp variant="forest" size="2.75rem">
                    <Glyph width={24} height={24} />
                  </IconStamp>
                  <h3 className="font-display text-xl text-[--color-ink]">{c.title}</h3>
                </div>
                <p className="mt-3 text-[--color-ink-soft]">{c.blurb}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Real Google reviews, then the ask. Placed here on purpose: a visitor
          who has seen both suites, the area and the packages is at the point
          of deciding, and this is the last block before the FAQ where an
          unanswered doubt would otherwise send them away. Renders nothing at
          all when Google returns no reviews. */}
      <ReviewsBand />

      {/* FAQ */}
      <Section band="cream">
        <SectionHeading eyebrow="שאלות ותשובות" title="כל מה שרציתם לדעת" center />
        <FaqList items={homeFaqs} />
      </Section>

      {/* Almaris-style gallery strip, full-bleed */}
      <GalleryStrip preview={galleryPreview} all={galleryAll} />

      <CtaBand location="home" />
    </>
  );
}
