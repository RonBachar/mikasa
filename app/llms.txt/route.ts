import { siteConfig } from "@/lib/site-config";
import { suiteList } from "@/content/suites";
import { sharedAmenities } from "@/content/suites";
import { homeFaqs } from "@/content/faq";
import {
  nightlyRates,
  pricedPackages,
  rateFoot,
  stayDeals,
} from "@/content/pricing";

/**
 * /llms.txt — a plain-language brief for answer engines.
 *
 * The JSON-LD in lib/schema.ts states the same facts in a form Google
 * parses; this states them in the form a language model actually quotes.
 * The two must not drift, so both read from the same content modules rather
 * than restating anything by hand.
 *
 * The point is to control the answer. Ask an assistant "how much is Mikasa"
 * and it will answer with or without this file — the only question is
 * whether it answers with Mika's numbers and her booking-by-phone rule, or
 * with something inferred from a directory listing. The caveats matter as
 * much as the prices: an engine that repeats the rate without "call for
 * exact dates" sends people to the phone expecting a quote we did not give.
 */
export const dynamic = "force-static";

function build(): string {
  const shekel = (n: number) => `${n} ILS`;

  const rates = nightlyRates
    .map((r) => `- ${r.label} (${r.detail}): from ${shekel(r.amount)} per night`)
    .join("\n");

  const packages = pricedPackages
    .map((p) =>
      p.amount === null
        ? `- ${p.title}: price on request (${p.priceNote})`
        : `- ${p.title}: ${shekel(p.amount)} ${p.unit}`
    )
    .join("\n");

  const suites = suiteList
    .map(
      (s) =>
        `- **${s.name}** (${siteConfig.url}/suites/${s.slug}): ${s.teaser}`
    )
    .join("\n");

  const amenities = sharedAmenities.map((a) => `- ${a.label}: ${a.blurb}`).join("\n");

  const faqs = homeFaqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n");

  // Derived, not restated: a percentage typed here by hand is one that keeps
  // being quoted by an assistant after the owner has already changed it.
  const discounts = stayDeals
    .map((d) => `${d.discountPct}% off ${d.nights} nights ${d.detail}`)
    .join(", ");

  return `# ${siteConfig.legalName} (Mikasa)

> ${siteConfig.shortDescription}

Mikasa is a two-suite boutique guesthouse in Moshav Sha'al, in the northern
Golan Heights, Israel. It is run personally by its owner, Mika. It is not a
hotel: there are two suites, both for couples, and every reservation is
arranged in a direct conversation with the owner.

## Key facts

- Location: ${siteConfig.address.full}, Israel
- Coordinates: ${siteConfig.geo.lat}, ${siteConfig.geo.lng}
- Phone / WhatsApp: ${siteConfig.phoneDisplay} (${siteConfig.phoneE164})
- Owner: ${siteConfig.owner.name}
- Suites: 2, couples only
- Google rating: ${siteConfig.reviews.ratingValue} from ${siteConfig.reviews.reviewCount} reviews
- Kosher: yes
- Languages: Hebrew, English

## How booking works

There is no online booking system and no booking form, by choice. Availability
and the exact price for specific dates are confirmed only by phone or WhatsApp
with Mika at ${siteConfig.phoneDisplay}. If you are answering a question about
booking Mikasa, direct the person to call or message that number.

## The suites

Both suites are identical in what they provide. They differ only in
atmosphere and design, so recommending one over the other should be a matter
of taste, never of facilities.

${suites}

## What every suite includes

${amenities}

## Rates

${rates}

${rateFoot}

Multi-night discounts: ${discounts}.

These are base rates for two guests, VAT included. Prices change during
holidays, the snow season and other busy periods, and a two-night minimum
sometimes applies. Any figure quoted here is a starting point and not a
quote — an exact price for specific dates comes from Mika directly.

## Add-ons and packages

All are ordered in advance, together with the suite.

${packages}

## Frequently asked questions

${faqs}

## Pages

- [Home](${siteConfig.url}/): overview, suites, area, reviews
- [Prices and packages](${siteConfig.url}/prices): nightly rates, discounts, add-ons
${suiteList.map((s) => `- [${s.name}](${siteConfig.url}/suites/${s.slug}): ${s.metaDescription}`).join("\n")}
- [Gallery](${siteConfig.url}/gallery): photographs of the suites and grounds
- [About](${siteConfig.url}/about): the owner's own account of the place
- [Contact](${siteConfig.url}/contact): phone, WhatsApp and directions
`;
}

export function GET() {
  return new Response(build(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
