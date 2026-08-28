import Link from "next/link";
import { Img } from "./manifest-image";
import { LeafIcon, DropletIcon, PhoneIcon } from "./icons";
import { siteConfig } from "@/lib/site-config";

/**
 * Golan crate-label hero (direction contract: app/layout.tsx).
 * Full-bleed real photography behind a tilted kraft-label card — the
 * wordmark reads as a stamped crate brand, and a harvest-seal badge row
 * names the two suites as two varieties. Not a split hero: the photo owns
 * the whole first viewport, the label sits on top of it like a tag pinned
 * to a crate corner.
 */
export function HeroSplit({
  title,
  body,
  image,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  body: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section
      className="img-tint relative isolate flex items-center"
      style={{ minHeight: "min(94vh, 840px)", "--image-tint-opacity": "0.22" } as React.CSSProperties}
    >
      <Img
        file={image}
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
      />
      {/* Warm floor gradient so the photo reads even under a light label card */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(20,16,10,0.55) 0%, rgba(20,16,10,0.1) 38%, rgba(20,16,10,0) 62%)",
        }}
      />

      <div className="container-content pb-16 pt-28 lg:py-24">
        {/* The label card — pinned like a tag to the crate's corner */}
        {/* Same .hero-card as every other page (see globals.css and
            components/page-hero.tsx). Only the tilt differs per page, and the
            home page keeps the original -1.1deg. */}
        <div
          className="hero-card kraft-grain"
          style={{ "--hero-angle": "-1.1deg" } as React.CSSProperties}
        >
          {/* Default .eyebrow color (cherry) — 5.06:1 on the kraft card,
              passes WCAG AA; the timber accent it used to carry computed to
              only ~4.0:1 here and failed. */}
          {/* Owner's call, 2026-08-27: a warm one-line welcome above the
              wordmark, not the keyword eyebrow. That SEO line still exists —
              it moved to the meta description and the page title, where it
              does the same job for search without being the first thing a
              human reads. */}
          <span className="eyebrow">ברוכים הבאים</span>

          {/* H1 is the wordmark itself, per the direction contract ("a
              giant stencil מיקאסה wordmark reads as a crate stamp") — not
              the full marketing sentence. Putting the sentence at wordmark
              size was pushing the CTA below the fold at 1366x768 and
              clipping it at 1280x900 (measured). The sentence still ships,
              just as a normal-sized subheading. */}
          <h1
            className="stencil-heading mt-3 hero-title-enter"
            style={{ fontSize: "var(--text-hero)" }}
          >
            {siteConfig.name}
          </h1>

          <p
            className="mt-3 text-xl md:text-2xl font-display hero-title-enter"
            style={{
              color: "var(--color-ink)",
              fontWeight: 700,
              lineHeight: 1.25,
              // Honours the newline in the title prop; without it the browser
              // collapses it and breaks the line wherever the box ends.
              whiteSpace: "pre-line",
            }}
          >
            {title}
          </p>

          <p
            className="mt-4 text-base leading-relaxed hero-body-enter"
            style={{ color: "var(--color-ink-soft)" }}
          >
            {body}
          </p>

          {/* Variety tags: real luggage/crate-tag shape (notch + punched
              hole), not a circular badge — reads as a crate mark, not a
              game achievement icon. */}
          <div className="hero-card__marks">
            <Link href="/suites/forest" className="variety-tag" style={{ color: "var(--color-forest)" }}>
              <span className="variety-tag__icon">
                <LeafIcon width={13} height={13} />
              </span>
              <span style={{ color: "var(--color-ink)" }}>לסוויטת יער</span>
              <span className="variety-tag__hole" aria-hidden />
            </Link>
            <Link href="/suites/rain" className="variety-tag" style={{ color: "var(--color-cherry)" }}>
              <span className="variety-tag__icon">
                <DropletIcon width={13} height={13} />
              </span>
              <span style={{ color: "var(--color-ink)" }}>לסוויטת גשם</span>
              <span className="variety-tag__hole" aria-hidden />
            </Link>
          </div>

          {/* Phone glyph on the primary action: the label no longer says the
              word "חייגו", so the icon is what tells you this is the way you
              reach Mika. Same PhoneIcon the PhoneCTA buttons use. */}
          <div className="hero-card__actions">
            <Link href={ctaHref} className="btn btn-primary">
              <PhoneIcon />
              <span>{ctaLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
