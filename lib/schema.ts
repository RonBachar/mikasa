/**
 * JSON-LD structured data.
 *
 * Two audiences read this and neither of them reads the page's prose:
 * Google, which turns it into rich results (star rating, FAQ accordions,
 * the local business panel), and the answer engines — ChatGPT, Perplexity,
 * Gemini, AI Overviews — which quote structured facts far more readily than
 * they quote marketing copy. Every claim here therefore has to be one Mika
 * would stand behind on the phone, because it is the version of the business
 * that gets repeated back to people who never visit the site.
 *
 * Everything derives from lib/site-config.ts and content/, so there is one
 * source of truth per fact and the schema cannot drift from the page.
 */
import { siteConfig } from "./site-config";
import type { Faq } from "@/content/faq";
import type { Suite } from "@/content/suites";
import { sharedAmenities } from "@/content/suites";
import { nightlyRates } from "@/content/pricing";

const abs = (path: string) => `${siteConfig.url}${path}`;

/** Stable node ids, so the graph cross-references instead of duplicating. */
const BUSINESS_ID = `${siteConfig.url}/#lodging`;
const ORG_ID = `${siteConfig.url}/#organization`;

/**
 * The cheapest published nightly rate. Google wants a number it can show as
 * "from ₪X"; deriving it means a rate change in content/pricing.ts updates
 * the SERP too, instead of leaving a stale price in the markup.
 */
const lowestRate = Math.min(...nightlyRates.map((r) => r.amount));

/**
 * The property itself. LodgingBusiness rather than the broader LocalBusiness:
 * it is the type Google maps to accommodation results, and it accepts the
 * amenity, check-in and rating properties that actually render.
 */
export function lodgingBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": BUSINESS_ID,
    name: siteConfig.legalName,
    alternateName: ["מיקאסה", "Mikasa", "Mikasa Guest House"],
    description: siteConfig.shortDescription,
    url: siteConfig.url,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    priceRange: "₪₪",
    currenciesAccepted: "ILS",
    // Deliberately explicit: the FAQ tells guests cards are not accepted, and
    // a schema that implied otherwise would contradict the page.
    paymentAccepted: "Cash, Bit, Paybox, Bank transfer",
    petsAllowed: false,
    smokingAllowed: false,
    numberOfRooms: 2,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    hasMap: siteConfig.social.googleMaps,
    image: [abs("/og/default.jpg"), abs("/og/forest.jpg"), abs("/og/rain.jpg")],
    photo: abs("/og/default.jpg"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.reviews.ratingValue,
      reviewCount: siteConfig.reviews.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    amenityFeature: sharedAmenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.label,
      value: true,
    })),
    makesOffer: {
      "@type": "Offer",
      priceCurrency: "ILS",
      price: lowestRate,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "ILS",
        price: lowestRate,
        unitCode: "DAY",
      },
      availability: "https://schema.org/InStock",
      url: abs("/prices"),
    },
    potentialAction: {
      "@type": "ReserveAction",
      // There is no online booking. The only honest "action" is the phone,
      // so the target is the tel: link rather than a booking URL.
      target: siteConfig.telHref,
      name: "התקשרו לתיאום",
    },
    knowsLanguage: ["he", "en"],
    areaServed: {
      "@type": "AdministrativeArea",
      name: siteConfig.address.region,
    },
    parentOrganization: { "@id": ORG_ID },
  };
}

/** The business as an entity, for the knowledge panel and brand queries. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: abs("/og/default.jpg"),
    telephone: siteConfig.phoneE164,
    sameAs: [siteConfig.social.googleMaps].filter(Boolean),
    founder: { "@type": "Person", name: siteConfig.owner.name },
  };
}

/** Renders as the expandable FAQ block directly in Google's results. */
export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** One suite, tied back to the property it belongs to. */
export function suiteSchema(suite: Suite) {
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: suite.name,
    description: suite.lead,
    url: abs(`/suites/${suite.slug}`),
    image: abs(`/og/${suite.slug}.jpg`),
    occupancy: {
      "@type": "QuantitativeValue",
      // Couples only, with a child under 12 by prior arrangement. maxValue 2
      // matches what the FAQ promises rather than the physical maximum.
      maxValue: 2,
      unitCode: "C62",
    },
    bed: { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "Queen" },
    amenityFeature: sharedAmenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.label,
      value: true,
    })),
    containedInPlace: { "@id": BUSINESS_ID },
  };
}

/**
 * Breadcrumb trail, so Google shows the path instead of a bare URL.
 *
 * Takes the same `Crumb[]` the visual breadcrumbs render, and is emitted by
 * that component rather than by each page: a trail Google is told about but
 * a visitor cannot see is exactly the mismatch structured-data guidelines
 * treat as misleading, and keeping one input for both makes it impossible.
 */
export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: abs(item.href),
    })),
  };
}
