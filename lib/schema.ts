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
import { absoluteUrl as abs, siteConfig } from "./site-config";
import { ogImagePath } from "./seo";
import { img } from "./images";
import type { Attraction } from "@/content/area";
import type { Faq } from "@/content/faq";
import type { Suite } from "@/content/suites";
import type { JournalPost } from "@/content/journal";
import { journal } from "@/content/journal";
import { sharedAmenities, suiteList } from "@/content/suites";
import { nightlyRates } from "@/content/pricing";

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
 * Both the property and each suite advertise the same amenities — the two
 * suites are identical in what they provide, which is the point content/
 * suites.ts makes. Built once here rather than mapped inside each builder.
 */
const amenityFeatures = sharedAmenities.map((a) => ({
  "@type": "LocationFeatureSpecification",
  name: a.label,
  value: true,
}));

/** The default share card, used as the property's lead photo. */
const OG_DEFAULT = abs(ogImagePath("default"));

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
    numberOfRooms: suiteList.length,
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
    // Google's Organization profile applies to LodgingBusiness too (it is a
    // subtype), and wants the logo and sameAs on the business node itself —
    // having them only on the separate Organization node does not satisfy it.
    logo: abs("/og/logo.png"),
    sameAs: [siteConfig.social.googleMaps],
    // Bookings are taken by phone, every day. Stated as a real
    // OpeningHoursSpecification rather than left to the prose in
    // siteConfig.hours, which no crawler can parse.
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
    image: [
      OG_DEFAULT,
      ...suiteList.map((s) => abs(ogImagePath(s.slug))),
    ],
    photo: OG_DEFAULT,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.reviews.ratingValue,
      reviewCount: siteConfig.reviews.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    amenityFeature: amenityFeatures,
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
    // The mark, not a photograph. Google reads this for the knowledge panel
    // and wants the brand's actual logo; a 1200x630 shot of the patio was
    // both the wrong shape and the wrong thing.
    logo: abs("/og/logo.png"),
    telephone: siteConfig.phoneE164,
    sameAs: [siteConfig.social.googleMaps],
    // Recommended by Google's Organization profile: an address is part of how
    // it confirms the entity is a real business rather than a name.
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
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
    image: abs(ogImagePath(suite.slug)),
    occupancy: {
      "@type": "QuantitativeValue",
      // Couples only, with a child under 12 by prior arrangement. maxValue 2
      // matches what the FAQ promises rather than the physical maximum.
      maxValue: 2,
      unitCode: "C62",
    },
    bed: { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "Queen" },
    amenityFeature: amenityFeatures,
    containedInPlace: { "@id": BUSINESS_ID },
  };
}

/**
 * The attractions on /area, as a list of real places with their distance
 * from the property.
 *
 * There is no Google rich result for this and it is not meant to produce
 * one. It is for the answer engines: "how far is Hermon from Sha'al" is the
 * question this business gets asked most, and an assistant that cannot find
 * a structured answer will invent one. The prose on the page says the same
 * thing, but a TouristAttraction with a named containedInPlace is the form a
 * model actually lifts.
 *
 * Every distance is an estimate and the page says so in three places; the
 * `description` carries the hedge into the markup too, so a quote of the
 * data alone still arrives with the caveat attached.
 *
 * `url` is an anchor into this page rather than an outbound link, and it is
 * not optional: Google reads any ItemList as a candidate Carousel and rejects
 * every item that has no url. It will not build a carousel out of
 * TouristAttraction whatever we do — that list is Recipe, Course, Restaurant,
 * Movie — but there is no reason to hand it markup it has to throw away, and
 * the anchors are useful on their own. Each id must exist on the rendered
 * card; app/area/page.tsx sets them from the same field.
 */
export function areaAttractionsSchema(items: Attraction[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "אטרקציות ליד מושב שעל, רמת הגולן",
    numberOfItems: items.length,
    itemListElement: items.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristAttraction",
        name: a.name,
        description: `${a.description} מרחק נסיעה משוער ממיקאסה, מושב שעל: ${a.driveTime}.`,
        url: abs(`/area#${a.id}`),
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: siteConfig.address.region,
        },
      },
    })),
  };
}

/**
 * One journal post.
 *
 * BlogPosting rather than Article: it is what the section is, and it is the
 * type that ties cleanly to the Blog node below. The author is the business
 * rather than a bare person name — Mika writes these, but she is the
 * guesthouse, and an Organization author is what Google's own guidance asks
 * for when the two are the same entity.
 */
export function blogPostingSchema(post: JournalPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    url: abs(`${journal.path}/${post.slug}`),
    image: abs(img(post.heroImage).src),
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: siteConfig.lang,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    // The posts are about the area this business sits in, and saying so is
    // how an answer engine connects "what is there to do near Sha'al" to the
    // property rather than treating the post as free-floating travel copy.
    about: { "@id": BUSINESS_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": abs(`${journal.path}/${post.slug}`),
    },
  };
}

/** The journal as a whole, for the index page. */
export function blogSchema(posts: JournalPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: journal.name,
    description: journal.tagline,
    url: abs(journal.path),
    inLanguage: siteConfig.lang,
    publisher: { "@id": ORG_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: abs(`${journal.path}/${p.slug}`),
      datePublished: p.date,
    })),
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
