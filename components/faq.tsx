import type { Faq } from "@/content/faq";

/** FAQ accordion using native <details> for full keyboard + no-JS accessibility. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="max-w-3xl mx-auto divide-y-2 divide-line">
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
