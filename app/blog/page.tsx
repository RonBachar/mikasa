import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import { Img } from "@/components/manifest-image";
import { JsonLd } from "@/components/json-ld";
import { pageMeta } from "@/lib/seo";
import { blogSchema } from "@/lib/schema";
import { journal, journalDate, journalPosts } from "@/content/journal";

/**
 * The journal index.
 *
 * Deliberately not a feed of everything: three posts, each answering a
 * question people search without knowing the guesthouse exists. Adding a
 * fourth means adding it to content/journal.ts and nothing else — this page,
 * the sitemap, /area's reading list and llms.txt all read from that array.
 */
export const metadata = pageMeta({
  title: `${journal.name} | טיולים ועונות ברמת הגולן מבפנים`,
  description:
    "היומן של מיקאסה: מסלולים, עונות והמלצות מהאזור, כתובים ממושב שעל שבצפון רמת הגולן על ידי מיקה, המארחת של צימר מיקאסה.",
  path: journal.path,
  ogImage: "journal",
});

export default function JournalPage() {
  return (
    <>
      <JsonLd data={blogSchema(journalPosts)} />

      <PageHero
        breadcrumbs={[
          { label: "בית", href: "/" },
          { label: journal.name, href: journal.path },
        ]}
        image="exterior/exterior-garden-path-01.webp"
        eyebrow="קריאה לפני הנסיעה"
        title={journal.name}
        body={journal.tagline}
        angle={1.7}
        cardAlign="end"
      />

      <Section band="cream">
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {journalPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`${journal.path}/${post.slug}`} className="card block h-full">
                <div className="relative aspect-[4/3]">
                  <Img
                    file={post.heroImage}
                    fill
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="eyebrow">{post.tag}</span>
                  <h2 className="font-display text-2xl mt-3 text-[--color-ink]">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[--color-ink-soft]">{post.excerpt}</p>
                  <p className="mt-5 text-sm text-[--color-ink-soft]">
                    <time dateTime={post.date}>{journalDate(post.date)}</time>
                    <span aria-hidden style={{ color: "var(--color-cherry)" }}>
                      {" · "}
                    </span>
                    {post.readMinutes} דקות קריאה
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center text-[--color-ink-soft]">
          מחפשים את התמונה המלאה של האזור?{" "}
          <Link href="/area" className="underline hover:text-[--color-cherry]">
            עמוד האזור
          </Link>{" "}
          מרכז את כל האטרקציות עם זמני הנסיעה מהמושב.
        </p>
      </Section>

      <CtaBand location="journal" />
    </>
  );
}
