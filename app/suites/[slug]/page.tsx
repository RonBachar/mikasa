import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Img } from "@/components/manifest-image";
import { LeafIcon, DropletIcon } from "@/components/icons";
import { Section, SectionHeading } from "@/components/section";
import { AmenityGrid } from "@/components/amenity-grid";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { CtaBand } from "@/components/cta-band";
import { suites, suiteList } from "@/content/suites";
import { imagesIn } from "@/lib/images";
import { JsonLd } from "@/components/json-ld";
import { pageMeta } from "@/lib/seo";
import { suiteSchema } from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams() {
  return suiteList.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await props.params;
  const suite = suites[slug as keyof typeof suites];
  if (!suite) return {};
  return pageMeta({
    title: suite.metaTitle,
    description: suite.metaDescription,
    path: `/suites/${suite.slug}`,
    ogImage: suite.slug,
  });
}

export default async function SuitePage(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const suite = suites[slug as keyof typeof suites];
  if (!suite) notFound();

  const isForest = slug === "forest";
  const gallery = imagesIn(suite.galleryFolder);

  return (
    <>
      {/* BreadcrumbList comes from <Breadcrumbs> inside the hero below. */}
      <JsonLd data={suiteSchema(suite)} />

      {/* Same crate label as every other page. The mark is this suite's own
          variety tag, so the card announces which of the two you are looking
          at before the heading is read. Angles differ per suite so the two
          pages never feel like the same template twice. */}
      <PageHero
        breadcrumbs={[
              { label: "בית", href: "/" },
              { label: "הסוויטות", href: "/#suites" },
              { label: suite.name, href: `/suites/${suite.slug}` },
            ]}
        image={suite.heroImage}
        // Was suite.name, which the h1 now opens with — the card showed the
        // suite's name twice, stacked, and the variety tag beside it made
        // three. The category is the thing the eyebrow can say that the
        // heading does not.
        eyebrow="סוויטה זוגית"
        title={suite.h1}
        body={suite.teaser}
        angle={isForest ? -1.9 : 1.2}
        marks={
          <span
            className="variety-tag"
            style={{
              color:
                isForest ? "var(--color-forest)" : "var(--color-cherry)",
            }}
          >
            <span className="variety-tag__icon">
              {isForest ? (
                <LeafIcon width={13} height={13} />
              ) : (
                <DropletIcon width={13} height={13} />
              )}
            </span>
            <span style={{ color: "var(--color-ink)" }}>{suite.name}</span>
            <span className="variety-tag__hole" aria-hidden />
          </span>
        }
      />

      {/* Lead + atmosphere, with a two-print stack alongside — the same
          layout language as /about. The two suites mirror each other: forest
          keeps the photos on the far side of the text, rain swaps the columns
          and the stack's own diagonal, so reading one page after the other
          does not feel like the same template twice. */}
      <Section band="cream">
        <div
          className={`grid gap-10 items-start ${
            isForest
              ? "lg:grid-cols-[1.35fr_1fr]"
              : "lg:grid-cols-[1fr_1.35fr]"
          }`}
        >
          <div className="max-w-2xl">
            <p className="text-xl text-[--color-ink-soft] leading-relaxed">{suite.lead}</p>
            <div className="hairline my-8" />
            <div className="space-y-5 text-lg text-[--color-ink-soft]">
              {suite.atmosphere.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Text stays first in the DOM so the page still reads lead-then-
              pictures to a screen reader; only the visual column order flips. */}
          <div
            className={`photo-stack ${isForest ? "" : "photo-stack--alt lg:order-first"}`}
          >
            <div className="photo-stack__back">
              <Img
                file={suite.leadImages[0]}
                fill
                sizes="(max-width:1024px) 60vw, 24vw"
                className="object-cover"
              />
            </div>
            <div className="photo-stack__front">
              <Img
                file={suite.leadImages[1]}
                fill
                sizes="(max-width:1024px) 60vw, 24vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Amenities (identical across suites). No eyebrow: it used to read
          "מה מחכה לכם בסוויטה" above the heading "הפינוקים שמחכים לכם", and
          that line is now the heading itself. */}
      <Section band="cream-2">
        <SectionHeading title="מה מחכה לכם בסוויטה" center />
        <AmenityGrid />
        <p className="text-center mt-6 text-sm text-[--color-ink-soft]">
          ארוחת בוקר כפרית עשירה מוגשת בתיאום מראש ובתשלום נוסף.
        </p>
      </Section>

      {/* Gallery — a carousel here rather than the grid used on /gallery: a
          suite has a dozen-plus photos of one room, and a full grid of them
          buries the sections below it. Three at a time, stepped. */}
      <Section band="cream">
        <SectionHeading eyebrow="גלריה" title={`תמונות מ${suite.name}`} center />
        <GalleryCarousel images={gallery} />
      </Section>

      <CtaBand location={`suite-${suite.slug}`} />
    </>
  );
}
