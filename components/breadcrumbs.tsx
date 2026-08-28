import Link from "next/link";
import { JsonLd } from "./json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export type Crumb = { label: string; href: string };

/**
 * Visual breadcrumbs, and the BreadcrumbList that describes them.
 *
 * Both come from the same `items`, so the trail Google is shown is by
 * construction the trail on the page. Emitting the schema from the pages
 * instead would let the two drift the first time someone edited one and not
 * the other.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="פירורי לחם" className="text-sm">
      <JsonLd data={breadcrumbSchema(items)} />
      <ol className="flex flex-wrap items-center gap-2 text-[--color-ink-soft]">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-[--color-ink-soft]">{c.label}</span>
              ) : (
                <Link href={c.href} className="hover:text-[--color-ink]">{c.label}</Link>
              )}
              {!last && <span aria-hidden style={{ color: "var(--color-gold)" }}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
