import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { FinalCta } from "@/components/cta-band";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { posts } from "@/content/blog";

export const metadata: Metadata = {
  title: "בלוג מיקאסה | חופשה, טיולים ואטרקציות בגולן",
  description:
    "טיפים ומדריכים לחופשה זוגית ברמת הגולן, מסלולים, יקבים ואטרקציות סביב מיקאסה בשעל. חייגו 054-586-9818.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <>
      <Section band="cream-2" className="!pt-28">
        <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "בלוג", href: "/blog" }]} />
        <div className="mt-6 max-w-3xl">
          <span className="eyebrow">מהבלוג</span>
          <h1 className="text-5xl mt-3">בלוג מיקאסה, טיולים וחופשה בגולן</h1>
          <div className="hairline-short mt-4" />
          <p className="mt-5 text-xl text-[--color-ink-soft]">
            מדריכים וטיפים לחופשה זוגית ברמת הגולן, מהאזור שאנחנו הכי אוהבים.
          </p>
        </div>
      </Section>

      <Section band="cream">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug} className="card p-7 flex flex-col">
              {p.draft && (
                <span className="self-start text-xs px-2 py-1 rounded-full mb-3" style={{ background: "#fff7e6", color: "var(--color-ink-soft)" }}>
                  טיוטה, לאישור תוכן
                </span>
              )}
              <h2 className="font-display text-2xl text-[--color-ink]">
                <Link href={`/blog/${p.slug}`} className="hover:text-[--color-ink-soft]">{p.title}</Link>
              </h2>
              <p className="mt-3 text-[--color-ink-soft] flex-1">{p.excerpt}</p>
              <Link href={`/blog/${p.slug}`} className="btn btn-outline mt-6 self-start">קראו עוד</Link>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta location="blog-final" />
    </>
  );
}
