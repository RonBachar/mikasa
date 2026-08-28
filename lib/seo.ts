import type { Metadata } from "next";
import { siteConfig } from "./site-config";

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
export type PageMetaInput = {
  title: string;
  description: string;
  /** Route path with a leading slash, "/" for the home page. */
  path: string;
  /**
   * Share-card image under /og/, without the directory or extension.
   * These are 1200x630 JPEGs rather than the site's WebP originals on
   * purpose: WhatsApp is the main sharing surface for this audience and it
   * renders JPEG reliably where WebP is hit-or-miss.
   */
  ogImage?: "default" | "forest" | "rain" | "prices";
};

export function pageMeta({
  title,
  description,
  path,
  ogImage = "default",
}: PageMetaInput): Metadata {
  const url = path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
  const image = `/og/${ogImage}.jpg`;

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
