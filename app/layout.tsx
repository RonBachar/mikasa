import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteActions } from "@/components/site-actions";
import { Analytics } from "@/components/analytics";

// Self-hosted at build time (no runtime CDN), Hebrew + Latin subsets, display: swap.
const display = Frank_Ruhl_Libre({
  variable: "--font-display",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const body = Heebo({
  variable: "--font-body",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "מיקאסה | צימר רומנטי לזוג ברמת הגולן, שעל | ג'קוזי ונוף",
    template: "%s | מיקאסה",
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
        <Analytics />
      </body>
    </html>
  );
}
