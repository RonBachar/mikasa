import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { FaqList } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { Img } from "@/components/manifest-image";
import { IconStamp } from "@/components/icon-stamp";
import {
  TrailIcon,
  VineIcon,
  SnowPeakIcon,
  SpringIcon,
  HorseshoeIcon,
  CafeIcon,
} from "@/components/area-icons";
import { JsonLd } from "@/components/json-ld";
import { pageMeta } from "@/lib/seo";
import { areaAttractionsSchema } from "@/lib/schema";
import {
  areaCategories,
  areaIntro,
  areaLead,
  attractions,
  seasons,
  type AreaCategoryIcon,
} from "@/content/area";
import { areaFaqs } from "@/content/faq";
import { journalPosts } from "@/content/journal";

/**
 * /area — the location pillar.
 *
 * Search Console, 2026-09: the site sits at position 1 for "מיקאסה שעל" and
 * on page two for every query that does not contain the brand name —
 * "צימרים שעל" (11), "מושב שעל צימרים" (13.7), "אכסניה ברמת הגולן" (53).
 * Those are people who do not know we exist yet, and no amount of booking
 * copy on the home page answers what they actually asked, which is "what is
 * there around here". This page answers it, in one place, with the distances
 * spelled out.
 *
 * Every drive time on this page is approximate and says so, in the lead, in
 * each card and in the FAQ. content/area.ts is the only source for them.
 */
export const metadata = pageMeta({
  title: "מה יש לעשות ברמת הגולן | אטרקציות ליד מושב שעל | מיקאסה",
  description:
    "מדריך האזור של מיקאסה: אתר החרמון, בירכת רם, מפל סער, מג'דל שמס, יקבי בוטיק ועמק החולה, עם זמני נסיעה משוערים ממושב שעל שבצפון רמת הגולן.",
  path: "/area",
  ogImage: "area",
});

const areaIcons: Record<AreaCategoryIcon, typeof TrailIcon> = {
  trail: TrailIcon,
  vine: VineIcon,
  snow: SnowPeakIcon,
  spring: SpringIcon,
  sport: HorseshoeIcon,
  cafe: CafeIcon,
};

export default function AreaPage() {
  return (
    <>
      {/* BreadcrumbList comes from <Breadcrumbs> in the hero, FAQPage from
          <FaqList> below. This is the one this page adds itself. */}
      <JsonLd data={areaAttractionsSchema(attractions)} />

      <PageHero
        breadcrumbs={[
          { label: "בית", href: "/" },
          { label: "האזור שלנו", href: "/area" },
        ]}
        image="views/view-waterfall-saar.webp"
        eyebrow="האזור שלנו"
        title="מה יש לעשות ברמת הגולן, ממש ליד מיקאסה"
        body="החרמון, בירכת רם, מפל סער והכפרים הדרוזיים - כולם בטווח של פחות מחצי שעה נסיעה מהמושב."
        angle={-0.7}
      />

      {/* Lead. The citational paragraph first, atmosphere after: this is the
          block an answer engine quotes when someone asks where Sha'al is. */}
      <Section band="cream">
        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-10 items-start">
          <div className="max-w-2xl">
            <p className="text-xl leading-relaxed text-[--color-ink-soft]">{areaLead}</p>
            <div className="hairline my-8" />
            <div className="space-y-5 text-lg text-[--color-ink-soft]">
              {areaIntro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="photo-stack">
            <div className="photo-stack__back">
              <Img
                file="views/view-golan-valley.webp"
                fill
                sizes="(max-width:1024px) 60vw, 24vw"
                className="object-cover"
              />
            </div>
            <div className="photo-stack__front">
              <Img
                file="exterior/exterior-sign-rural.webp"
                fill
                sizes="(max-width:1024px) 60vw, 24vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* The list itself — names and drive times, which is the only thing on
          this page a visitor came for. Ordered nearest-first in
          content/area.ts terms would fight the categories; the file's own
          order is the owner's, so it stays. */}
      <Section band="cream-2" id="attractions">
        <SectionHeading
          eyebrow="בטווח נסיעה קצר"
          title="מה נמצא סביב מושב שעל"
          intro="זמני הנסיעה משוערים ונכונים לנסיעה רגילה, בלי עומס. בעונת השלג ובחגים הכבישים לכיוון החרמון עמוסים בהרבה."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((a) => (
            // id matches the anchor in areaAttractionsSchema. Google's
            // guidance is explicit that a schema url with a fragment must
            // land on the visible thing it names.
            <li key={a.id} id={a.id} className="card p-6 flex flex-col">
              <span className="eyebrow">{a.category}</span>
              <h3 className="font-display text-2xl mt-3 text-[--color-ink]">{a.name}</h3>
              <p
                className="mt-2 text-sm font-semibold"
                style={{ color: "var(--color-cherry)" }}
              >
                {a.driveTime} נסיעה
              </p>
              <div className="hairline-short mt-4" />
              <p className="mt-4 text-[--color-ink-soft]">{a.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Categories. Same six as the home page teaser, on purpose: the home
          page shows them to say "there is an area", this page shows them as
          the index to the list above. */}
      <Section band="cream">
        <SectionHeading
          eyebrow="לפי סוג חופשה"
          title="מה מתאים לכם"
          intro="לא כל זוג מחפש את אותו הדבר בגולן. אלה ששת הכיוונים שאורחים שלנו הולכים אליהם."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areaCategories.map((c) => {
            const Glyph = areaIcons[c.icon];
            return (
              <li key={c.title} className="card p-6">
                <div className="flex items-center gap-3">
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

      {/* Seasons — the question that decides whether someone books now or
          files the place away for the spring. */}
      <Section band="cream-2">
        <SectionHeading
          eyebrow="מתי להגיע"
          title="הגולן משתנה לגמרי בין העונות"
          intro="אין כאן עונה רעה, יש עונות שונות. זה מה שכל אחת מהן נותנת."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {seasons.map((s) => (
            <li key={s.name} className="card p-6">
              <h3 className="font-display text-2xl text-[--color-ink]">{s.name}</h3>
              <p className="mt-1 text-sm text-[--color-ink-soft]">{s.months}</p>
              <div className="hairline-short mt-4" />
              <p className="mt-4 text-[--color-ink-soft]">{s.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Into the journal. These posts are the long-form version of three
          rows in the list above, so the link belongs here rather than only in
          the navigation. */}
      <Section band="cream">
        <SectionHeading
          eyebrow="לקריאה מורחבת"
          title="מהיומן של מיקאסה"
          intro="מסלולים ועונות, בפירוט שלא נכנס לעמוד הזה."
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {journalPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="card p-6 block h-full">
                <span className="eyebrow">{post.tag}</span>
                <h3 className="font-display text-xl mt-3 text-[--color-ink]">{post.title}</h3>
                <p className="mt-3 text-[--color-ink-soft]">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section band="cream-2">
        <SectionHeading eyebrow="שאלות על האזור" title="מה שואלים אותנו לפני שמגיעים" center />
        <FaqList items={areaFaqs} />

        <p className="text-center mt-10 text-[--color-ink-soft]">
          רוצים לראות איפה תישנו בין הטיולים?{" "}
          <Link href="/suites/forest" className="underline hover:text-[--color-cherry]">
            סוויטת יער
          </Link>{" "}
          ו
          <Link href="/suites/rain" className="underline hover:text-[--color-cherry]">
            סוויטת גשם
          </Link>
          , או{" "}
          <Link href="/prices" className="underline hover:text-[--color-cherry]">
            המחירים והחבילות
          </Link>
          .
        </p>
      </Section>

      <CtaBand
        location="area"
        title="בואו נתכנן לכם את הימים כאן"
        subtitle="ספרו לי מתי אתם מגיעים ומה מעניין אתכם, ואתאים לכם מסלול לפי העונה ומזג האוויר."
      />
    </>
  );
}
