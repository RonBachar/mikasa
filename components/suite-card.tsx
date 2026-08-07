import Link from "next/link";
import { Img } from "./manifest-image";
import type { Suite } from "@/content/suites";

/**
 * Almaris "Accomodation" card: image fills the card with a soft radius and warm
 * shadow, a dark gradient foot, and the suite name overlaid in white. No prices;
 * a small elegant tag replaces the Almaris price. Hover lifts + gently zooms.
 */
export function SuiteCard({ suite }: { suite: Suite }) {
  return (
    <Link
      href={`/suites/${suite.slug}`}
      className="suite-card lift group"
      aria-label={`${suite.name}, פרטים והזמנה`}
    >
      <div className="relative aspect-[4/3]">
        <Img
          file={suite.teaserImage}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <span className="suite-card__scrim" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <span
          className="inline-block text-xs px-2.5 py-1 rounded-[3px] mb-3"
          style={{ background: "var(--color-gold)", color: "#fff", letterSpacing: "0.06em" }}
        >
          סוויטה זוגית
        </span>
        <h3 className="font-display text-2xl md:text-3xl" style={{ color: "#fff", fontWeight: 500 }}>
          {suite.name}
        </h3>
        <p className="mt-1 text-sm" style={{ color: "rgba(247,241,232,0.9)" }}>
          ג'קוזי פרטי · מרפסת · מטבחון
        </p>
      </div>
    </Link>
  );
}
