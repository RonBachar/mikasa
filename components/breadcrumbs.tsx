import Link from "next/link";

export type Crumb = { label: string; href: string };

/** Visual breadcrumbs. JSON-LD BreadcrumbList is emitted separately (Phase 7). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="פירורי לחם" className="text-sm">
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
