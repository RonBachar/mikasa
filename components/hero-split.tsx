import Link from "next/link";
import { Img } from "./manifest-image";

/**
 * Almaris-style split hero: elegant text column on cream, a single strong
 * image in a 12px-radius frame with a soft warm shadow. Compact slim CTA.
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
      <div className="container-content pt-6 md:pt-8 lg:pt-10 pb-14 md:pb-20 lg:pb-24">
        <div className="grid lg:grid-cols-[0.88fr_1.12fr] gap-10 lg:gap-14 items-center">
          {/* Text column (right in RTL) */}
          <div className="max-w-xl">
            <h1
              className="font-display hero-title-enter"
              style={{
                fontSize: "var(--text-hero)",
                fontWeight: 400,
                lineHeight: 1.18,
              }}
            >
              {title}
            </h1>
            <p
              className="mt-6 text-base md:text-lg font-light leading-relaxed hero-body-enter"
              style={{ color: "var(--color-ink-soft)" }}
            >
              {body}
            </p>
            <div className="mt-8">
              <Link href={ctaHref} className="btn btn-primary">
                {ctaLabel}
              </Link>
            </div>
          </div>

          {/* Image: 595×595 square (scales down on small screens) */}
          <div className="flex justify-center lg:justify-start">
            <div
              className="relative overflow-hidden w-full"
              style={{
                maxWidth: 595,
                aspectRatio: "1 / 1",
                borderRadius: "var(--radius-card)",
                boxShadow: "var(--shadow-lift)",
              }}
            >
              <Img
                file={image}
                fill
                priority
                sizes="595px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
