import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";
import { suiteList } from "@/content/suites";

/**
 * Priorities follow the conversion path, not the page count: the home page
 * and the two suites are what people search for, /prices is what they check
 * before calling, and the legal pages exist to be findable rather than
 * ranked. Google treats priority as a hint at best, but a sitemap that
 * flattens everything to 1.0 tells it nothing at all.
 *
 * Routes are listed explicitly rather than crawled off the filesystem so
 * that adding a page is a deliberate act — a stray route cannot leak into
 * the index just by existing.
 */
/**
 * The fixed routes, as a table so the priority ladder is readable at a
 * glance. The suite routes are derived from content/suites.ts separately,
 * since those are the ones that actually vary.
 *
 * Cross-check when adding a page: it should appear here AND in the footer
 * navigation in lib/nav.ts. Neither derives from the other on purpose.
 */
const ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/prices", changeFrequency: "weekly", priority: 0.9 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/accessibility", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...ROUTES.map((r) => ({
      url: absoluteUrl(r.path),
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...suiteList.map((suite) => ({
      url: absoluteUrl(`/suites/${suite.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
