import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { FaqList } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { pageMeta } from "@/lib/seo";
import { authorSchema, blogPostingSchema } from "@/lib/schema";
import {
  clusters,
  clusterSiblings,
  journal,
  journalBySlug,
  journalDate,
  journalPosts,
} from "@/content/journal";

type Params = { slug: string };

export function generateStaticParams() {
  // Drafts are included: the page has to exist for Mika to read it. What
  // keeps them out of Google is the noindex in generateMetadata below, plus
  // their absence from the sitemap, the index and llms.txt.
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = journalBySlug[slug];
  if (!post) return {};

  const meta = pageMeta({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `${journal.path}/${post.slug}`,
    ogImage: post.ogCard,
  });

  return post.draft
    ? { ...meta, robots: { index: false, follow: false } }
    : meta;
}

export default async function JournalPostPage(props: {
  params: Promise<Params>;
}) {
  const { slug } = await props.params;
  const post = journalBySlug[slug];
  if (!post) notFound();

  const siblings = clusterSiblings(post);
  const cluster = clusters[post.cluster];

  return (
    <>
      {/* BreadcrumbList comes from <Breadcrumbs> inside the hero, and the
          FAQPage from <FaqList> below. */}
      <JsonLd data={authorSchema()} />
      <JsonLd data={blogPostingSchema(post)} />

      <PageHero
        // The last crumb names the post, not post.tag. The tag reads better
        // in a trail, but the crumb's `item` is the post's own URL, so a
        // category label there tells Google this URL is called "עונות בגולן",
        // which is not its name. The tag still shows, as the eyebrow below.
        breadcrumbs={[
          { label: "בית", href: "/" },
          { label: journal.name, href: journal.path },
          { label: post.title, href: `${journal.path}/${post.slug}` },
        ]}
        image={post.heroImage}
        eyebrow={post.tag}
        title={post.title}
        body={post.excerpt}
        angle={-1.5}
      />

      <Section band="cream">
        <article className="max-w-3xl mx-auto">
          {post.draft && (
            <p
              className="mb-8 p-4 text-sm"
              style={{
                border: "2px solid var(--color-cherry)",
                color: "var(--color-cherry)",
                background: "var(--color-white)",
              }}
            >
              טיוטה לבדיקה. העמוד הזה לא מופיע ביומן, לא במפת האתר ולא בגוגל,
              עד שהוא יאושר.
            </p>
          )}

          <p className="text-sm text-[--color-ink-soft]">
            <time dateTime={post.date}>{journalDate(post.date)}</time>
            {post.updated && (
              <>
                <span aria-hidden style={{ color: "var(--color-cherry)" }}>
                  {" · "}
                </span>
                עודכן {journalDate(post.updated)}
              </>
            )}
            <span aria-hidden style={{ color: "var(--color-cherry)" }}>
              {" · "}
            </span>
            {post.readMinutes} דקות קריאה
            <span aria-hidden style={{ color: "var(--color-cherry)" }}>
              {" · "}
            </span>
            מאת מיקה, מיקאסה
          </p>

          {/* The lead is the paragraph that answers the headline outright.
              Set larger than the body on purpose: a skimmer who reads only
              this one paragraph should still leave with the answer. */}
          <p className="mt-6 text-xl leading-relaxed text-[--color-ink-soft]">
            {post.lead}
          </p>

          <div className="hairline my-10" />

          <div className="space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-3xl">{section.heading}</h2>
                <div className="mt-5 space-y-5 text-lg text-[--color-ink-soft]">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {section.list && (
                  <ul className="mt-6 space-y-3">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-lg text-[--color-ink-soft]"
                      >
                        <span
                          aria-hidden
                          className="shrink-0 font-bold"
                          style={{ color: "var(--color-cherry)" }}
                        >
                          ·
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {post.closing && (
            <>
              <div className="hairline my-10" />
              <p className="text-lg text-[--color-ink-soft]">{post.closing}</p>
              <p className="font-display text-2xl mt-4 text-[--color-ink]">
                באהבה מיקה
              </p>
            </>
          )}

          <p className="mt-10 text-[--color-ink-soft]">
            כל האטרקציות באזור, עם זמני נסיעה משוערים מהמושב, מרוכזות ב
            <Link href="/area" className="underline hover:text-[--color-cherry]">
              עמוד האזור
            </Link>
            . ואם אתם כבר מחפשים איפה לישון, אלה{" "}
            <Link
              href="/suites/forest"
              className="underline hover:text-[--color-cherry]"
            >
              סוויטת יער
            </Link>{" "}
            ו
            <Link
              href="/suites/rain"
              className="underline hover:text-[--color-cherry]"
            >
              סוויטת גשם
            </Link>
            .
          </p>
        </article>
      </Section>

      {/* The FAQ is where an answer engine actually quotes from, so it is a
          section of its own rather than a footnote — and it emits this page's
          FAQPage markup. Every post carries one; content/journal.ts makes the
          field required for exactly that reason. */}
      <Section band="cream-2">
        <SectionHeading eyebrow="שאלות ותשובות" title="מה שואלים אותנו על זה" center />
        <FaqList items={post.faqs} />
      </Section>

      {/* Cluster links, not "related posts". Five posts that reference each
          other rank better than five that stand alone, and the pillar sits
          first because it is the one the others should push. Renders nothing
          while the rest of the cluster is still in draft. */}
      {siblings.length > 0 && (
        <Section band="cream">
          <SectionHeading
            eyebrow={cluster.name}
            title="עוד באשכול הזה"
            intro={cluster.blurb}
            center
          />
          <ul className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
            {siblings.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`${journal.path}/${p.slug}`}
                  className="card p-6 block h-full"
                >
                  <span className="eyebrow">
                    {p.pillar ? "עמוד העוגן" : p.tag}
                  </span>
                  <h3 className="font-display text-xl mt-3 text-[--color-ink]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[--color-ink-soft]">{p.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand location={`journal-${post.slug}`} />
    </>
  );
}
