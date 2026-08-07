import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/section";
import { Gallery } from "@/components/gallery";
import { CtaBand, FinalCta } from "@/components/cta-band";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { imagesIn } from "@/lib/images";

export const metadata: Metadata = {
  title: "גלריית תמונות | צימר מיקאסה, שעל רמת הגולן",
  description:
    "גלריית תמונות של צימר מיקאסה בשעל, סוויטת יער, סוויטת גשם, הגינה והנוף ברמת הגולן. חייגו לתיאום 054-586-9818.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const forest = imagesIn("forest-suite");
  const rain = imagesIn("rain-suite");
  const exterior = imagesIn("exterior");
  const views = imagesIn("views");

  return (
    <>
      <Section band="cream-2" className="!pt-28">
        <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "גלריה", href: "/gallery" }]} />
        <div className="mt-6 max-w-3xl">
          <span className="eyebrow">הצצה למיקאסה</span>
          <h1 className="text-5xl mt-3">גלריית תמונות, מיקאסה</h1>
          <div className="hairline-short mt-4" />
          <p className="mt-5 text-xl text-[--color-ink-soft]">
            הסוויטות, הגינה והנוף. כל התמונות מצולמות במיקאסה שבמושב שעל, רמת הגולן.
          </p>
        </div>
      </Section>

      <Section band="cream">
        <SectionHeading eyebrow="סוויטת יער" title="אווירת יער ירוקה וג'קוזי פרטי" />
        <Gallery images={forest} columns={4} />
      </Section>

      <Section band="cream-2">
        <SectionHeading eyebrow="סוויטת גשם" title="אבן חמה ואינטימיות" />
        <Gallery images={rain} columns={4} />
      </Section>

      <Section band="cream">
        <SectionHeading eyebrow="הגינה והחוץ" title="גינה פורחת ופינות ישיבה" />
        <Gallery images={exterior} columns={4} />
      </Section>

      {views.length > 0 && (
        <Section band="cream-2">
          <SectionHeading eyebrow="נופים" title="הטבע סביב מיקאסה" />
          <Gallery images={views} columns={3} />
        </Section>
      )}

      <CtaBand location="gallery" />
      <FinalCta location="gallery-final" />
    </>
  );
}
