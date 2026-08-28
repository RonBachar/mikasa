import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteActions } from "@/components/site-actions";
import { DiscountPopup } from "@/components/discount-popup";
import { Analytics } from "@/components/analytics";
import { Smartlook } from "@/components/smartlook";

// Self-hosted locally (no runtime CDN, no Google fetch) via next/font/local.
const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../public/fonts/Alef/Alef-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Alef/Alef-Bold.woff2", weight: "700", style: "normal" },
  ],
});

// Only the weights the stylesheet actually asks for. Light (300) and Medium
// (500) were declared here but appear nowhere in the CSS, so Next preloaded
// two font files on every page load that no element ever used. That is what
// the "preloaded using link preload but not used" console warnings were
// reporting, and it was real bandwidth. Check before adding a weight back:
//   grep -rhoE "font-weight:\s*[0-9]+" app components
const body = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "../public/fonts/Heebo/static/Heebo-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Heebo/static/Heebo-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Heebo/static/Heebo-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "צימר מיקאסה | צימר רומנטי לזוגות ברמת הגולן, שעל | ג'קוזי ונוף",
    template: "%s",
  },
  description: siteConfig.shortDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.lang}
      dir={siteConfig.dir}
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        {/*
          THESIS: Mikasa stops being an imported boutique-hotel template and commits to what it is: a two-suite Golan guesthouse Mika hosts personally, told in the region's own fruit-crate branding language, not a hospitality-category default.
          OWN-WORLD: Thick stencil-condensed display type, raw timber/kraft grounds, committed cherry-red (#8B2635) and orchard-green (#5A7247) page-scale accents, stamped ink-seal badges, real photography cut into label-shaped frames.
          STORY: A visitor recognizes two rare "crops," סוויטת יער and סוויטת גשם, proven by real photos and Mika's own voice, then calls or WhatsApps her directly; there is no booking flow.
          FIRST VIEWPORT: A giant stencil "מיקאסה" wordmark reads as a crate stamp; a harvest-seal badge names the two suites as two varieties; full-bleed real jacuzzi/balcony photography fills the frame through the label cut.
          FORM: Golan crate-label direction, assigned index 6 of 7 grounded candidates, concept-seed key 76aa8cf5.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and docs/DESIGN.md.
        */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:start-3 focus:rounded-[--radius-control] focus:bg-[--color-dark] focus:text-[--color-cream] focus:px-4 focus:py-2"
        >
          דילוג לתוכן הראשי
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <SiteActions />
        <DiscountPopup />
        <Analytics />
        <Smartlook />
      </body>
    </html>
  );
}
