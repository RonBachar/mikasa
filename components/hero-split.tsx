import Link from "next/link";
import { Img } from "./manifest-image";

/**
 * Almaris-style split hero: elegant text column (RIGHT in RTL) on clean cream,
 * a single strong image (LEFT) in a soft-radius frame with a warm shadow.
 * No eyebrow, no text-over-image, no overlay. Matches the Almaris reference.
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
    <section style={{ background: "var(--color-cream)" }}>
      <div className="container-content py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-[0.92fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Text column (right in RTL) */}
          <div className="max-w-xl">
            <h1
              style={{ fontSize: "var(--text-hero)", fontWeight: 400, lineHeight: 1.14 }}
            >
              {title}
            </h1>
            <p className="mt-8 text-lg" style={{ color: "var(--color-ink-soft)" }}>
              {body}
            </p>
            <div className="mt-9">
              <Link href={ctaHref} className="btn btn-primary">
                {ctaLabel}
              </Link>
            </div>
          </div>

          {/* Image column (left in RTL): clean rounded frame, soft warm shadow */}
          <div className="relative overflow-hidden rounded-[--radius-card] shadow-[var(--shadow-lift)]">
            <div className="relative aspect-[4/3]">
              <Img
                file={image}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
