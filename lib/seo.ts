import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site-config";

/**
 * One builder for every page's metadata.
 *
 * This exists because Next merges metadata *shallowly*: a page that declares
 * its own `openGraph` replaces the root layout's entirely, images and all.
 * Setting OG defaults in app/layout.tsx and then overriding the title on a
 * page would therefore silently drop the image from that page's share card —
 * the failure is invisible in the browser and only shows up when someone
 * pastes the link into WhatsApp. Rather than depend on that, every page calls
 * this and gets a complete, self-contained object.
 *
 * See node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md
 * ("Merging").
 */
/**
 * The share cards that exist in public/og/, as written by
 * scripts/make-og-images.mjs. Keep this list and the script's CARDS in step:
 * a name here with no card behind it ships a 404 to every social preview.
 */
export type OgCard =
  | "default"
  | "forest"
  | "rain"
  | "prices"
  | "area"
  | "journal"
  | "journal-couples-weekend-golan"
  | "journal-hermon-snow-season"
  | "journal-saar-waterfall-water-trails";

/** Path to a share card. The `/og/{name}.jpg` convention lives only here. */
export function ogImagePath(card: OgCard): string {
  return `/og/${card}.jpg`;
}

/**
 * House rule for `title`, set 2026-09-07 after the first Search Console read
 * of the rebuilt site.
 *
 * The numbers that produced it: the home page took all 31 clicks in 28 days
 * while /prices, /about, /gallery, /contact and both suites drew impressions
 * and zero clicks between them. They were being shown and not chosen. Every
 * one of those titles opened with the brand or the page's internal name
 * ("מחירים וחבילות פינוק במיקאסה", "סוויטת גשם במיקאסה") — words nobody
 * searches — and put the phrase people actually type after a pipe, where a
 * truncated result never shows it.
 *
 * So: lead with the phrase, then the brand, then the place.
 *
 *   [what a person searched] | [מיקאסה] , [מושב שעל / רמת הגולן]
 *
 * The home page is the one exception and keeps the brand first, because it
 * already ranks 1.1 for "מיקאסה שעל" and that is a result worth not touching.
 * Aim for roughly 60 characters; past that Google cuts the end off, which is
 * the same as not having written it.
 */
export type PageMetaInput = {
  title: string;
  description: string;
  /** Route path with a leading slash, "/" for the home page. */
  path: string;
  /**
   * Share card for this page. These are 1200x630 JPEGs rather than the
   * site's WebP originals on purpose: WhatsApp is the main sharing surface
   * for this audience and it renders JPEG reliably where WebP is hit-or-miss.
   */
  ogImage?: OgCard;
};

export function pageMeta({
  title,
  description,
  path,
  ogImage = "default",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const image = ogImagePath(ogImage);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.legalName,
      locale: siteConfig.locale,
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
