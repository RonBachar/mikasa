import type { Faq } from "@/content/faq";
import { JsonLd } from "./json-ld";
import { faqSchema } from "@/lib/schema";

/**
 * FAQ accordion using native <details> for full keyboard + no-JS accessibility.
 *
 * Emits its own FAQPage schema, for the same reason components/breadcrumbs.tsx
 * emits its own BreadcrumbList: the answers Google expands in the results are
 * then by construction the answers on the page. Emitted from the page instead,
 * the schema call and the render sat ninety lines apart over the same array,
 * and only one of them would have been updated.
 *
 * Assumes one instance per page — true today, and a second would emit a
 * duplicate FAQPage.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="max-w-3xl mx-auto divide-y-2 divide-line">
      <JsonLd data={faqSchema(items)} />
      {items.map((f) => (
        <details key={f.q} className="group py-2">
          <summary
            className="flex items-center justify-between gap-4 cursor-pointer list-none py-3 font-display text-xl text-[--color-ink] transition-colors hover:text-[--color-cherry]"
            style={{ fontWeight: 800 }}
          >
            <span>{f.q}</span>
            <span
              aria-hidden
              className="shrink-0 transition-transform group-open:rotate-45"
              style={{ color: "var(--color-cherry)", fontSize: "1.5rem", lineHeight: 1, fontWeight: 900 }}
            >
              +
            </span>
          </summary>
          <p className="pb-4 text-[--color-ink-soft] leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
