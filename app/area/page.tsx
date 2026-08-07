import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/section";
import { CtaBand, FinalCta } from "@/components/cta-band";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq";
import { attractions, areaLead, areaCategories } from "@/content/area";
import { areaFaqs } from "@/content/faq";

export const metadata: Metadata = {
  title: "האזור והאטרקציות סביב מיקאסה בשעל | רמת הגולן",
  description:
    "אטרקציות וטיולים סביב צימר מיקאסה בשעל, החרמון, מפל סער, בירכת רם, יקבים ומסלולים, עם זמני נסיעה משוערים. חייגו 054-586-9818.",
  alternates: { canonical: "/area" },
};

export default function AreaPage() {
  return (
    <>
      <Hero
        image="views/view-golan-valley.webp"
        eyebrow="צפון רמת הגולן"
        title="האזור שלנו, אטרקציות וטיולים סביב מיקאסה בשעל"
        subtitle="הכל קרוב, טבע, מים, יקבים והחרמון, במרחק נסיעה קצר מהצימר."
        actions="none"
      />

      <div style={{ background: "var(--color-cream)" }}>
        <div className="container-content pt-6">
          <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "האזור", href: "/area" }]} />
        </div>
      </div>

      <Section band="cream">
        <p className="max-w-3xl text-xl text-[--color-ink-soft] leading-relaxed">{areaLead}</p>
      </Section>

      {/* Attractions with approximate drive times */}
      <Section band="cream-2">
        <SectionHeading
          eyebrow="מה יש בסביבה"
          title="אטרקציות וזמני נסיעה משוערים משעל"
          intro="כל זמני הנסיעה משוערים בלבד ומומלץ לאשר בזמן אמת."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((a) => (
            <li key={a.name} className="card p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl text-[--color-ink]">{a.name}</h3>
                <span className="text-sm font-semibold shrink-0" style={{ color: "var(--color-ink-soft)" }}>
                  {a.driveTime}
                </span>
              </div>
              <div className="hairline-short my-3" />
              <p className="text-[--color-ink-soft]">{a.description}</p>
              <span className="mt-3 inline-block text-xs px-2 py-1 rounded-full" style={{ background: "var(--color-cream-2)", color: "var(--color-ink-soft)" }}>
                {a.category}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* What kind of experiences */}
      <Section band="cream">
        <SectionHeading eyebrow="לפי סגנון" title="איזו חופשה מתאימה לכם?" center />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areaCategories.map((c) => (
            <li key={c.title} className="card p-6">
              <h3 className="font-display text-xl text-[--color-ink]">{c.title}</h3>
              <p className="mt-2 text-[--color-ink-soft]">{c.blurb}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        location="area"
        title="רוצים שנעזור לתכנן מסלול?"
        subtitle="מיקה תשמח להמליץ על טיולים, יקבים ומסעדות. חייגו ונתכנן יחד."
      />

      {/* Area FAQ */}
      <Section band="cream-2">
        <SectionHeading eyebrow="שאלות נפוצות על האזור" title="על הסביבה והמרחקים" center />
        <FaqList items={areaFaqs} />
      </Section>

      <Section band="cream">
        <div className="text-center">
          <p className="text-lg text-[--color-ink-soft]">רוצים לחזור לסוויטות?</p>
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            <Link href="/suites/forest" className="btn btn-outline">סוויטת יער</Link>
            <Link href="/suites/rain" className="btn btn-outline">סוויטת גשם</Link>
          </div>
        </div>
      </Section>

      <FinalCta location="area-final" />
    </>
  );
}
