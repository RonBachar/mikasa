import Link from "next/link";
import { Img } from "./manifest-image";
import { pricedPackages } from "@/content/pricing";

// Distinct from the hero/suite-card/gallery-strip photos so no single
// jacuzzi shot repeats across one homepage scroll.
// Owner-supplied package photography (2026-08-28), one per package slug.
// These replaced stand-in suite interiors: a jacuzzi corner standing in for
// "birthday package" told the visitor nothing about what they were buying.
const offerImages: Record<string, string> = {
  breakfast: "packages/package-breakfast.webp",
  birthday: "packages/package-birthday.webp",
  anniversary: "packages/package-anniversary.webp",
  spa: "packages/package-massage.webp",
};

type OfferCard = {
  key: string;
  title: string;
  desc: string;
  image: string;
  // Card titles are two short words stacked on their own line ("חבילת" /
  // "יום הולדת"); the anniversary package's title is one long phrase and
  // reads better as a single line, so it opts out.
  breakFirstWord?: boolean;
};

// Straight from the priced list, so this strip and /prices can never drift:
// same four add-ons, same order (breakfast, birthday, anniversary, massage),
// same wording.
const offerCards: OfferCard[] = pricedPackages.map((pkg) => ({
  key: pkg.slug,
  title: pkg.title,
  desc: pkg.tagline,
  image: offerImages[pkg.slug] ?? "exterior/exterior-garden-hero.webp",
  breakFirstWord: pkg.slug !== "anniversary",
}));

function CardTitle({ title, breakFirstWord }: { title: string; breakFirstWord?: boolean }) {
  if (!breakFirstWord) return <>{title}</>;
  const [first, ...rest] = title.split(" ");
  return (
    <>
      {first}
      <br />
      {rest.join(" ")}
    </>
  );
}

/**
 * "תוספות ופינוקים" teaser strip: eyebrow + title, then tall image cards with
 * a deep brown foot gradient and a centered title + description.
 *
 * The cards deliberately carry NO button. Each one used to end in a CTA
 * ("לפרטים" three times, "מה בארוחה?" once) and all four pointed at the same
 * URL, so the second click taught visitors the buttons were decorative. Four
 * choices that are not a choice. One button under the grid says the true
 * thing: everything here is priced on one page.
 */
export function SpecialOffers() {
  return (
    <section className="offers" style={{ background: "var(--color-cream)" }}>
      <div className="container-content">
        <header className="offers__header">
          <span className="eyebrow">פינוקים נוספים</span>
          <h2 className="offers__title font-display">תוספות ופינוקים</h2>
        </header>

        {/* Photo on top, label underneath. The cards used to be one tall
            image with the text laid over a heavy brown foot gradient; the
            gradient existed only to keep white text legible over the photo.
            With the text moved onto parchment it is not needed, and the photo
            gets to be a photo. */}
        <ul className="offers__grid">
          {offerCards.map((card) => (
            <li key={card.key} className="offers__card">
              <div className="offers__media">
                <Img
                  file={card.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="offers__content">
                <h3 className="offers__card-title font-display">
                  <CardTitle title={card.title} breakFirstWord={card.breakFirstWord} />
                </h3>
                <p className="offers__card-desc">{card.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="text-center mt-10">
          <Link href="/prices#packages" className="btn btn-primary">
            למחירי הלינה והחבילות
          </Link>
        </div>
      </div>
    </section>
  );
}
