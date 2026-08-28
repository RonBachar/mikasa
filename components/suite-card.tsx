import Link from "next/link";
import { Img } from "./manifest-image";
import type { Suite } from "@/content/suites";

// Each suite is one of two "varieties" — carries its own accent color
// everywhere it appears (hero tags, cards, suite pages).
// The colour follows the ROOM, not the name: סוויטת יער really is green and
// wooden ("עץ, ירוק ושקט של יער"), and סוויטת גשם really is warm stone in
// deep tones ("אבן חמה"). Both are stated in content/suites.ts and in the
// suites' own meta descriptions, so swapping these would put a red tag on a
// green room. Owner-reviewed 2026-08-26; keep as is.
const VARIETY: Record<Suite["slug"], { color: string; label: string }> = {
  forest: { color: "var(--color-forest)", label: "יער" },
  rain: { color: "var(--color-cherry)", label: "גשם" },
};

/**
 * Crate-label variety card: real photo, warm foot gradient + title as
 * before, but now carrying a stamped harvest-seal badge in the suite's own
 * variety color (forest green / cherry red) — so the two suites read as
 * two named crops of the same crate, not interchangeable "rooms."
 * Hover fades to the variety color itself, not a shared neutral accent.
 */
export function SuiteCard({ suite }: { suite: Suite }) {
  const variety = VARIETY[suite.slug];

  return (
    <Link
      href={`/suites/${suite.slug}`}
      className="suite-card group"
      aria-label={`${suite.name}, לפרטים על הסוויטה`}
      style={{ "--variety-color": variety.color } as React.CSSProperties}
    >
      {/* The photo is clean now. It used to carry a heavy brown gradient
          rising from its foot, which existed only so white caption text laid
          over the image stayed readable. Removing the gradient meant moving
          the caption off the photo, which is the better arrangement anyway:
          a plate above, its label below, the way a real crate label works. */}
      <div className="suite-card__media">
        <Img
          file={suite.teaserImage}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />

        {/* Diagonal quality-seal ribbon — not the circular badge shape
            already retired from the hero after it read as a game
            achievement icon. */}
        <span className="corner-ribbon" style={{ background: variety.color }} aria-hidden>
          סוויטת {variety.label}
        </span>
      </div>

      <div className="suite-card__label">
        <h3 className="suite-card__name font-display">{suite.name}</h3>
        {/* The line used to read "2 אורחים · ג'קוזי פרטי". Both suites are
            identically equipped, so it repeated the same two facts twice and
            gave a visitor nothing to choose between. Removed rather than
            replaced; the rule and the link carry the card now. */}
        <span className="suite-card__rule" aria-hidden />
        <span className="suite-card__more">לפרטים על הסוויטה</span>
      </div>
    </Link>
  );
}
