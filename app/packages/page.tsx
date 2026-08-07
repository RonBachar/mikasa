import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/section";
import { CtaBand, FinalCta } from "@/components/cta-band";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PhoneCTA, WhatsAppCTA } from "@/components/cta";
import { packages, packagesNote } from "@/content/packages";

export const metadata: Metadata = {
  title: "חבילות פינוק ואירועים במיקאסה | צימר זוגי בגולן",
  description:
    "חבילות פינוק במיקאסה, יום הולדת, יום נישואין ורומנטיקה, וספא זוגי. הכל בתיאום מראש בהזמנה. חייגו למיקה 054-586-9818.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return (
    <>
      <Section band="cream-2" className="!pt-28">
        <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "חבילות", href: "/packages" }]} />
        <div className="mt-6 max-w-3xl">
          <span className="eyebrow">פינוקים ואירועים</span>
          <h1 className="text-5xl mt-3">חבילות פינוק ואירועים במיקאסה</h1>
          <div className="hairline-short mt-4" />
          <p className="mt-5 text-xl text-[--color-ink-soft] leading-relaxed">
            אפשר להוסיף לחופשה הזוגית שלכם פינוק קטן שהופך אותה למיוחדת עוד יותר.
            כל החבילות בתיאום מראש בהזמנה, וללא מחירים באתר, כי אנחנו מתאימים אותן
            אישית לכל זוג.
          </p>
        </div>
      </Section>

      <Section band="cream">
        <ul className="grid gap-6 md:grid-cols-3 items-stretch">
          {packages.map((p) => (
            <li key={p.slug} className="card p-7 flex flex-col">
              <h2 className="font-display text-2xl text-[--color-ink]">{p.title}</h2>
              <p className="mt-2 text-[--color-ink-soft]">{p.tagline}</p>
              <div className="hairline-short my-5" />
              <ul className="space-y-3 flex-1">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[--color-ink-soft]">
                    <span aria-hidden style={{ color: "var(--color-gold)" }}>◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <PhoneCTA location={`package-${p.slug}`} showNumber className="w-full" />
                <WhatsAppCTA location={`package-${p.slug}`} className="w-full" />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-[--color-ink-soft] max-w-2xl mx-auto">{packagesNote}</p>
      </Section>

      <CtaBand
        location="packages"
        title="מציינים משהו מיוחד?"
        subtitle="ספרו למיקה מה החגיגה, ונתאים לכם את הפינוק המושלם."
      />

      <FinalCta location="packages-final" />
    </>
  );
}
