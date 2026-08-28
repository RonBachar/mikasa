import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Serve AVIF first, then WebP. Sizes tuned for the layouts we build.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 828, 1080, 1200, 1920],
    imageSizes: [96, 160, 256, 384],
  },
  async redirects() {
    return [
      {
        // /packages became /prices when the site started publishing rates:
        // one page now answers "how much" for the suite, breakfast and the
        // packages together, instead of splitting that across two.
        source: "/packages",
        destination: "/prices",
        permanent: true,
      },
      {
        // /area's content (attractions, drive times) now lives on the
        // homepage's own "מה תוכלו לעשות סביב מיקאסה" section. The journal
        // it briefly redirected to (/blog/around-mikasa) was deleted
        // entirely (owner's call), so this points at the closest surviving
        // equivalent instead of a page that no longer exists.
        source: "/area",
        destination: "/",
        permanent: true,
      },
      {
        // The WordPress site this replaces had exactly two indexed URLs: the
        // home page and /test/. Measured in Search Console on 2026-08-28,
        // /test/ held 66 impressions and no clicks at position 38.5 — worth
        // nothing, but indexed, so letting it 404 on cutover would hand
        // Google a fresh error on a domain it already trusts.
        source: "/test",
        destination: "/",
        permanent: true,
      },
      {
        // /blog never reached the index, so this is housekeeping rather than
        // equity preservation: the journal was cut before launch and any
        // surviving link should land somewhere real.
        source: "/blog",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
