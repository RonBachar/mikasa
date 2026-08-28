import type { ReactNode } from "react";
import Link from "next/link";
import { Img } from "./manifest-image";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/**
 * The site's one hero.
 *
 * Every page now opens the same way the home page does: full-bleed owner
 * photography with a kraft label card pinned over it. Before this, the home
 * page had the crate label, the suite pages had a dark-gradient photo hero
 * with white text, and six other pages had no photo at all, just a heading on
 * a flat band. Three different first impressions for one property.
 *
 * What varies per page is the tilt. `angle` sets --hero-angle, so no two
 * labels sit at the same rotation and the card reads as a physical tag rather
 * than a template slot. Pick a value between about -2 and +2 degrees; past
 * that it stops looking pinned and starts looking broken.
 *
 * `marks` is the swing-tag row. On the home page it names the two suites; on
 * /prices it carries the two nightly rates as literal price tags. Give it the
 * page's two or three real things, or leave it out.
 */
export function PageHero({
  image,
  eyebrow,
  title,
  body,
  angle = -1.1,
  marks,
  ctaLabel,
  ctaHref,
  size = "page",
  as: Heading = "h1",
  breadcrumbs,
  cardAlign = "start",
}: {
  image: string;
  eyebrow: string;
  title: string;
  body?: string;
  /** Degrees of tilt. Set a different value on every page. */
  angle?: number;
  marks?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  size?: "page" | "tall";
  /**
   * Which side of the photo the card sits on, logical (RTL-correct): "start"
   * is the right edge (the default, everywhere else), "end" is the left. Set
   * "end" when the photo has something on its left — an AC unit, in
   * app/about's case — that the card should sit over rather than leave
   * exposed on the side the card doesn't cover.
   */
  cardAlign?: "start" | "end";
  as?: "h1" | "h2";
  /**
   * Renders inside the card, above the eyebrow, instead of in a separate
   * strip below the hero. Every page except the home page passes this — the
   * home page IS the root, so it has nothing to trail back to.
   */
  breadcrumbs?: Crumb[];
}) {
  return (
    <section
      className="img-tint relative isolate flex items-center"
      style={
        {
          minHeight: size === "tall" ? "min(88vh, 780px)" : "min(72vh, 640px)",
          "--image-tint-opacity": "0.22",
        } as React.CSSProperties
      }
    >
      <Img file={image} fill priority sizes="100vw" className="object-cover -z-10" />

      {/* Warm floor gradient, so the photo still reads underneath a light
          card without darkening the whole frame. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(20,16,10,0.55) 0%, rgba(20,16,10,0.1) 38%, rgba(20,16,10,0) 62%)",
        }}
      />

      <div className="container-content pb-16 pt-28 lg:py-24">
        <div
          className="hero-card kraft-grain"
          style={
            {
              "--hero-angle": `${angle}deg`,
              ...(cardAlign === "end" ? { marginInlineStart: "auto" } : {}),
            } as React.CSSProperties
          }
        >
          {breadcrumbs && (
            <div className="hero-card__crumbs">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}

          <span className="eyebrow">{eyebrow}</span>

          <Heading className="hero-card__title font-display">{title}</Heading>

          {body && <p className="hero-card__body">{body}</p>}

          {marks && <div className="hero-card__marks">{marks}</div>}

          {ctaLabel && ctaHref && (
            <div className="hero-card__actions">
              <Link href={ctaHref} className="btn btn-primary">
                {ctaLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
