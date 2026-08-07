import Link from "next/link";
import { Img } from "./manifest-image";
import type { Suite } from "@/content/suites";

/**
 * Almaris accommodation card:
 * Front — photo + brown foot gradient + centered title.
 * Hover — soft fade to gold panel with ghost CTA.
 */
export function SuiteCard({ suite }: { suite: Suite }) {
  return (
    <Link
      href={`/suites/${suite.slug}`}
      className="suite-card group"
      aria-label={`${suite.name}, הזמינו עכשיו`}
    >
      <div className="suite-card__media">
        <Img
          file={suite.teaserImage}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <span className="suite-card__scrim" aria-hidden />
        <div className="suite-card__caption">
          <h3
            className="font-display text-[1.65rem] md:text-3xl"
            style={{ color: "#fff", fontWeight: 500, lineHeight: 1.2 }}
          >
            {suite.name}
          </h3>
          <p className="mt-2 text-[0.8125rem] font-light" style={{ color: "rgba(255,255,255,0.9)" }}>
            <span className="inline-block px-2">2 אורחים</span>
            <span className="inline-block px-2">ג&apos;קוזי פרטי</span>
          </p>
        </div>

        {/* Hover overlay — soft fade */}
        <div className="suite-card__overlay" aria-hidden>
          <p className="suite-card__overlay-label">סוויטה זוגית</p>
          <p className="suite-card__overlay-title font-display">{suite.name}</p>
          <span className="suite-card__book">הזמינו עכשיו</span>
        </div>
      </div>
    </Link>
  );
}
