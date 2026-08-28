import { CountUp } from "./count-up";

/**
 * Honest trust band. Replaced a testimonials carousel that showed six
 * placeholder reviews as if they were genuine (P0 in the 2026-08-10 critique).
 * Every number here is a fact the owners confirmed, presented as stamped
 * grade seals, the crate-label world's own idiom for "certified true".
 *
 * Numbers confirmed by Ron and Mika on 2026-08-27. The rating is the live
 * Google aggregate, which the reviews band lower down renders from the API;
 * it is repeated here as a static figure and should be kept in step with it.
 *
 * "2 סוויטות בלבד" is doing deliberate work next to 2,500: the small number is
 * what makes the large one mean something. Two suites, one host, 2,500 guests,
 * nineteen years.
 *
 * Accessibility: the badge used to carry aria-hidden with the numeral inside
 * it, so screen readers heard "שנות אירוח" with no number at all. CountUp now
 * exposes the real value and hides only the animating digits.
 */
type Seal = {
  value: number;
  suffix?: string;
  label: string;
  /** Screen-reader phrasing, so the number and its label arrive together. */
  srLabel: string;
};

const SEALS: Seal[] = [
  { value: 19, label: "שנות אירוח", srLabel: "19 שנות אירוח" },
  {
    value: 2500,
    suffix: "+",
    label: "אורחים שהתארחו כאן",
    srLabel: "מעל 2500 אורחים שהתארחו כאן",
  },
  { value: 2, label: "סוויטות בלבד", srLabel: "2 סוויטות בלבד" },
  { value: 4.9, label: "דירוג בגוגל", srLabel: "4.9 כוכבים בגוגל" },
];

/**
 * Local to this file, so components/area-icons.tsx and the shared icon module
 * stay untouched. Filled, because a half-drawn star next to a 4.9 invites the
 * reader to work out which tenth is missing.
 */
function StarMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      style={{ marginInlineStart: "0.15rem", flexShrink: 0 }}
    >
      <path
        d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9L12 2.6z"
        fill="var(--color-cherry)"
      />
    </svg>
  );
}

export function TrustSeals() {
  return (
    <section className="trust-seals" style={{ background: "var(--color-kraft)" }}>
      <div className="container-content">
        <ul className="trust-seals__row">
          {SEALS.map((s) => (
            <li key={s.label} className="trust-seals__item">
              {/* The visual badge and label are both decorative here; the one
                  accessible string below carries number and label together,
                  so a screen reader hears "19 שנות אירוח" once. */}
              <span
                className="trust-seals__badge"
                style={{ color: "var(--color-timber)" }}
                aria-hidden
              >
                <span className="trust-seals__value">
                  {/* 4.9 is not a tally, so it does not count up: watching a
                      rating spin looks like the score is being decided. */}
                  {Number.isInteger(s.value) ? (
                    <CountUp value={s.value} suffix={s.suffix} announce={false} />
                  ) : (
                    <span
                      dir="ltr"
                      style={{
                        unicodeBidi: "isolate",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      {s.value.toLocaleString("he-IL")}
                      <StarMark />
                    </span>
                  )}
                </span>
              </span>
              <p className="trust-seals__label" aria-hidden>
                {s.label}
              </p>
              <span className="sr-only">{s.srLabel}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
