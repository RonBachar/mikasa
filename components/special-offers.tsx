import Link from "next/link";
import { Img } from "./manifest-image";
import { packages } from "@/content/packages";

const offerImages: Record<string, string> = {
  birthday: "forest-suite/forest-suite-jacuzzi-romantic.webp",
  anniversary: "rain-suite/rain-suite-jacuzzi-02.webp",
  spa: "forest-suite/forest-suite-lounge-01.webp",
};

/**
 * Almaris "Special Offers" section:
 * eyebrow + title, then 3 tall image cards with deep brown foot gradient,
 * centered title + description + white ghost CTA → /packages.
 */
export function SpecialOffers() {
  return (
    <section className="offers" style={{ background: "var(--color-cream)" }}>
      <div className="container-content">
        <header className="offers__header">
          <span className="eyebrow">תפסו עכשיו</span>
          <h2 className="offers__title font-display">חבילות מיוחדות</h2>
        </header>

        <ul className="offers__grid">
          {packages.map((pkg) => (
            <li key={pkg.slug} className="offers__card">
              <Img
                file={offerImages[pkg.slug] ?? "exterior/exterior-garden-hero.webp"}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <span className="offers__scrim" aria-hidden />
              <div className="offers__content">
                <h3 className="offers__card-title font-display">{pkg.title}</h3>
                <p className="offers__card-desc">{pkg.tagline}</p>
                <Link href="/packages" className="offers__btn">
                  לפרטים
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
