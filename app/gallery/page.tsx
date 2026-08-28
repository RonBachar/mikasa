import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/section";
import { Gallery } from "@/components/gallery";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { imagesIn } from "@/lib/images";

export const metadata: Metadata = pageMeta({
  title: "גלריית תמונות מהצימר | מיקאסה, שעל רמת הגולן",
  description:
    "הצצה ויזואלית לצימר מיקאסה בשעל: סוויטת יער, סוויטת גשם, הגינה הפורחת והנוף עוצר הנשימה של רמת הגולן. חייגו לתיאום: 054-586-9818.",
  path: "/gallery",
});

export default function GalleryPage() {
  const forest = imagesIn("forest-suite");
  const rain = imagesIn("rain-suite");
  const exterior = imagesIn("exterior");

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "בית", href: "/" }, { label: "גלריה", href: "/gallery" }]}
        image="exterior/exterior-garden-egg-chair-01.webp"
        eyebrow="הצצה למיקאסה"
        title="גלריית תמונות ממיקאסה"
        body={"מבט פנימה אל הסוויטות המעוצבות, אל הגינה הירוקה ואל הנוף הפנורמי. כל התמונות צולמו כאן אצלנו במושב שעל."}
        angle={0.9}
      />

      <Section band="cream">
        <SectionHeading eyebrow="סוויטת יער" title="סוויטת יער: אווירה ירוקה קסומה וג'קוזי פרטי מפנק" />
        <Gallery images={forest} columns={4} />
      </Section>

      <Section band="cream-2">
        <SectionHeading eyebrow="סוויטת גשם" title="סוויטת גשם: אבן טבעית חמה ואווירה אינטימית במיוחד" />
        <Gallery images={rain} columns={4} />
      </Section>

      <Section band="cream">
        <SectionHeading eyebrow="הגינה והחוץ" title="הגינה של מיקאסה: פריחה עונתית ופינות ישיבה רגועות" />
        <Gallery images={exterior} columns={4} />
      </Section>

      <CtaBand location="gallery" />
    </>
  );
}
