import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/section";
import { AmenityGrid } from "@/components/amenity-grid";
import { Gallery } from "@/components/gallery";
import { CtaBand, FinalCta } from "@/components/cta-band";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { suites, suiteList } from "@/content/suites";
import { imagesIn } from "@/lib/images";

type Params = { slug: string };

export function generateStaticParams() {
  return suiteList.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await props.params;
  const suite = suites[slug as keyof typeof suites];
  if (!suite) return {};
  return {
    title: suite.metaTitle,
    description: suite.metaDescription,
    alternates: { canonical: `/suites/${suite.slug}` },
  };
}

export default async function SuitePage(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const suite = suites[slug as keyof typeof suites];
  if (!suite) notFound();

  const other = slug === "forest" ? suites.rain : suites.forest;
  const gallery = imagesIn(suite.galleryFolder);

  return (
    <>
      <Hero
        image={suite.heroImage}
        eyebrow={suite.name}
        title={suite.h1}
        subtitle={suite.teaser}
        actions="cta"
      />

      <div style={{ background: "var(--color-cream)" }}>
        <div className="container-content pt-6">
          <Breadcrumbs
            items={[
              { label: "בית", href: "/" },
              { label: "הסוויטות", href: "/#suites" },
              { label: suite.name, href: `/suites/${suite.slug}` },
            ]}
          />
        </div>
      </div>

      {/* Lead + atmosphere */}
      <Section band="cream">
        <div className="max-w-3xl">
          <p className="text-xl text-[--color-ink-soft] leading-relaxed">{suite.lead}</p>
          <div className="hairline my-8" />
          <div className="space-y-5 text-lg text-[--color-ink-soft]">
            {suite.atmosphere.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Amenities (identical across suites) */}
      <Section band="cream-2">
        <SectionHeading eyebrow="מה כולל בסוויטה" title="הפינוקים שמחכים לכם" center />
        <AmenityGrid />
        <p className="text-center mt-6 text-sm text-[--color-ink-soft]">
          ארוחת בוקר מוגשת בתיאום מראש ובתשלום.
        </p>
      </Section>

      {/* Gallery */}
      <Section band="cream">
        <SectionHeading eyebrow="גלריה" title={`תמונות מ${suite.name}`} center />
        <Gallery images={gallery} columns={3} />
      </Section>

      <CtaBand
        location={`suite-${suite.slug}`}
        title="אהבתם את מה שראיתם?"
        subtitle="חייגו למיקה לבדיקת תאריכים ותיאום חופשה זוגית."
      />

      {/* Cross links */}
      <Section band="cream-2">
        <div className="grid gap-5 sm:grid-cols-3">
          <Link href={`/suites/${other.slug}`} className="card p-6 block hover:shadow-lg transition">
            <h3 className="font-display text-xl text-[--color-ink]">{other.name}</h3>
            <p className="mt-2 text-[--color-ink-soft]">{other.teaser}</p>
          </Link>
          <Link href="/packages" className="card p-6 block hover:shadow-lg transition">
            <h3 className="font-display text-xl text-[--color-ink]">חבילות פינוק</h3>
            <p className="mt-2 text-[--color-ink-soft]">יום הולדת, יום נישואין וספא, בתיאום מראש.</p>
          </Link>
          <Link href="/area" className="card p-6 block hover:shadow-lg transition">
            <h3 className="font-display text-xl text-[--color-ink]">האזור והאטרקציות</h3>
            <p className="mt-2 text-[--color-ink-soft]">מה יש לעשות סביב מיקאסה בגולן.</p>
          </Link>
        </div>
      </Section>

      <FinalCta location={`suite-${suite.slug}-final`} />
    </>
  );
}
