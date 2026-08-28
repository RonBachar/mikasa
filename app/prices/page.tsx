import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import {
  nightlyRates,
  stayDeals,
  dealPricing,
  rateFoot,
  pricedPackages,
  pricingNote,
  packagesNote,
} from "@/content/pricing";

export const metadata: Metadata = pageMeta({
  title: "מחירים וחבילות פינוק במיקאסה | צימר זוגי בגולן, שעל",
  description:
    "מחירי הסוויטות במיקאסה, מושב שעל: אמצע שבוע, סוף שבוע, ארוחת בוקר כפרית וחבילות פינוק ליום הולדת, יום נישואין ועיסוי זוגי. למחיר מדויק לתאריכים שלכם, חייגו למיקה: 054-586-9818.",
  path: "/prices",
  ogImage: "prices",
});

/** One place decides how a shekel amount is written across the page. */
function shekels(n: number) {
  return `₪${n.toLocaleString("he-IL")}`;
}

export default function PricesPage() {
  return (
    <>
      {/* The swing tags here carry the two nightly rates. The .variety-tag
          shape is a notched tag with a punched hole, which is already a price
          tag: on the home page it names the suites, here it does the job the
          shape was drawn for. */}
      <PageHero
        breadcrumbs={[
              { label: "בית", href: "/" },
              { label: "מחירים", href: "/prices" },
            ]}
        image="exterior/exterior-garden-hammock-hero.webp"
        eyebrow="מחירים וחבילות"
        title="מחירים וחבילות נוספות"
        body="מחירי הלינה העדכניים שלנו, ארוחות בוקר כפריות וחבילות הפינוק שלנו"
        angle={-0.8}
        marks={
          <>
            {stayDeals.map((deal) => (
              <span
                key={deal.id}
                className="variety-tag"
                style={{
                  color:
                    deal.id === "weekend-2"
                      ? "var(--color-cherry)"
                      : "var(--color-forest)",
                }}
              >
                <span style={{ color: "var(--color-ink)" }}>
                  {deal.discountPct}% הנחה {deal.label}
                </span>
                <span className="variety-tag__hole" aria-hidden />
              </span>
            ))}
            <p className="deal__footnote">* למזמינים 2 לילות ומעלה</p>
          </>
        }
      />

      {/* Nightly rates: the one number people came for, at the top, big.
          Parchment against the kraft page header above it. */}
      <Section band="cream">
        <SectionHeading eyebrow="לינה" title="מחיר ללילה" center />

        <div className="rate-grid mt-10">
          {nightlyRates.map((r) => (
            <div key={r.id} className="rate-stamp">
              <span className="rate-stamp__amount">{shekels(r.amount)}</span>
              <span className="rate-stamp__label">{r.label}</span>
              <span className="rate-stamp__detail">{r.detail}</span>
            </div>
          ))}
        </div>

        <p className="rate-foot">{rateFoot}</p>

        {/* Multi-night discounts. The full total is struck through next to the
            discounted one so the saving is visible rather than asserted. */}
        <div className="deal-grid">
          {stayDeals.map((deal) => {
            const { full, discounted, saving } = dealPricing(deal);
            return (
              <div key={deal.id} className="deal">
                <span className="deal__badge">{deal.discountPct}%- הנחה</span>
                <span className="deal__label">{deal.label}</span>
                <span className="deal__detail">{deal.detail}</span>
                <span className="deal__prices">
                  <s className="deal__was" aria-label={`במקום ${shekels(full)}`}>
                    {shekels(full)}
                  </s>
                  <strong className="deal__now">{shekels(discounted)}</strong>
                </span>
                <span className="deal__saving">חוסכים {shekels(saving)}</span>
              </div>
            );
          })}
        </div>

        {/* Framed rather than set as small print: the caveat is part of the
            price, and it is also the reason to pick up the phone. */}
        <p className="rate-note">{pricingNote}</p>
      </Section>

      {/* Every add-on in one grid — breakfast included. It used to be split
          between a line in the rate table above and this section, which asked
          the visitor to hold two price lists at once. */}
      <Section band="cream" id="packages">
        <SectionHeading
          eyebrow="תוספות ופינוקים"
          title="חבילות פינוק"
          intro="אפשר להוסיף לכל הזמנה. הכל מוזמן מראש, יחד עם הסוויטה."
        />

        {/* Two across, not four. At four the column was narrower than the
            longest package title, so every heading broke onto three or four
            lines and the price stamp was squeezed against it. */}
        <ul className="grid gap-6 sm:grid-cols-2 items-stretch max-w-5xl mx-auto">
          {pricedPackages.map((p) => (
            <li key={p.slug} className="pkg-card">
              <div className="pkg-card__head">
                <div>
                  <h2 className="font-display text-2xl text-[--color-ink]">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-[--color-ink-soft]">{p.tagline}</p>
                </div>
                {/* An unpriced package still has to answer "how much" with
                    something actionable, so the note takes the price slot
                    rather than leaving a hole where a number should be. */}
                <div className="pkg-card__price">
                  {p.amount === null ? (
                    <span className="pkg-card__note">{p.priceNote}</span>
                  ) : (
                    <>
                      <span className="pkg-card__amount">{shekels(p.amount)}</span>
                      <span className="pkg-card__unit">{p.unit}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="hairline-short my-5" />

              <ul className="space-y-3 flex-1">
                {p.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[--color-ink-soft]"
                  >
                    <span className="pkg-bullet" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-[--color-ink-soft] max-w-2xl mx-auto">
          {packagesNote}
        </p>
      </Section>

      <CtaBand location="prices" />
    </>
  );
}
