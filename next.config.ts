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
    // Canonical host + legacy WordPress URL map is added in Phase 9.
    return [];
  },
};

export default nextConfig;
