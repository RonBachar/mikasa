import type { Faq } from "@/content/faq";

/** FAQ accordion using native <details> for full keyboard + no-JS accessibility. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="max-w-3xl mx-auto divide-y" style={{ borderColor: "color-mix(in srgb, var(--color-ink-soft) 15%, transparent)" }}>
      {items.map((f) => (
        <details key={f.q} className="group py-2">
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-3 font-display text-xl text-[--color-ink]">
            <span>{f.q}</span>
            <span
              aria-hidden
              className="shrink-0 transition-transform group-open:rotate-45"
              style={{ color: "var(--color-gold)", fontSize: "1.5rem", lineHeight: 1 }}
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
