import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * The sitemap line is the point of this file. Without it a crawler only
 * finds pages by following links, which on a small site means the ones the
 * footer happens to reach.
 *
 * Answer-engine crawlers (GPTBot, PerplexityBot, ClaudeBot and friends) are
 * covered by the `*` rule and deliberately left allowed: being quoted by
 * them is how a two-suite guesthouse gets found now, and there is nothing
 * here worth withholding.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
