import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
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
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) =>
    path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;

  return [
    {
      url: url("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...suiteList.map((suite) => ({
      url: url(`/suites/${suite.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: url("/prices"),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: url("/gallery"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: url("/about"),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
    {
      url: url("/contact"),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
    {
      url: url("/accessibility"),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: url("/privacy"),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}
