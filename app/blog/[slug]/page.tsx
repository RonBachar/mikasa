import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { posts, getPost } from "@/content/blog";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPost(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Section band="cream-2" className="!pt-28">
        <Breadcrumbs
          items={[
            { label: "בית", href: "/" },
            { label: "בלוג", href: "/blog" },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
        />
        <div className="mt-6 max-w-3xl">
          {post.draft && (
            <span className="inline-block text-xs px-2 py-1 rounded-full mb-3" style={{ background: "#fff7e6", color: "var(--color-ink-soft)" }}>
              טיוטה, לאישור תוכן לפני פרסום
            </span>
          )}
          <h1 className="text-4xl md:text-5xl">{post.title}</h1>
          <div className="hairline-short mt-4" />
        </div>
      </Section>

      <Section band="cream">
        <article className="max-w-2xl text-lg leading-relaxed text-[--color-ink]">
          <p className="text-xl text-[--color-ink-soft]">{post.lead}</p>
          <div className="hairline my-8" />
          <div className="space-y-8">
            {post.sections.map((s) => (
              <div key={s.h2}>
                <h2 className="font-display text-2xl text-[--color-ink]">{s.h2}</h2>
                <p className="mt-3 text-[--color-ink-soft]">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/suites/forest" className="btn btn-outline">סוויטת יער</Link>
            <Link href="/suites/rain" className="btn btn-outline">סוויטת גשם</Link>
            <Link href="/area" className="btn btn-outline">האזור והאטרקציות</Link>
          </div>
        </article>
      </Section>

      <CtaBand
        location={`blog-${post.slug}`}
        title="בא לכם לחופשה זוגית בגולן?"
        subtitle="חייגו למיקה ותאמו סוויטה עם ג'קוזי פרטי בשעל."
      />
    </>
  );
}
