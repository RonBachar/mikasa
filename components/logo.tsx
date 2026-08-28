"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { MikasaMark } from "./mikasa-mark";

export function Logo({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  const ink = onDark ? "var(--color-parchment)" : "var(--color-ink)";
  const pathname = usePathname();

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name}, ${siteConfig.tagline}, דף הבית`}
      className={`inline-flex items-center gap-3 leading-none ${className ?? ""}`}
      onClick={(e) => {
        // Next.js only scrolls to top on an actual route change. Clicking the
        // logo while already on "/" is a no-op navigation, so without this
        // the page just sits wherever it was scrolled to. The logo is
        // supposed to mean "take me to the top", not "take me home if I'm
        // not already there".
        if (pathname === "/") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      {/* The mark landed 2026-08-28, replacing the text-only lockup this
          component shipped while it was still being drawn. It takes the same
          ink as the wordmark rather than a colour of its own: the crate-label
          system spends its cherry and forest on the two suites, and a third
          coloured element competing with them at the top of every page is
          exactly the noise DESIGN.md sets out to avoid. */}
      <MikasaMark size={38} style={{ color: ink }} className="shrink-0" />

      <span className="inline-flex flex-col">
        <span
          className="font-display"
          style={{
            fontSize: "1.65rem",
            fontWeight: 800,
            letterSpacing: "-0.01em",
            color: ink,
          }}
        >
          {siteConfig.name}
        </span>
        <span
          className="uppercase mt-0.5"
          style={{
            fontSize: "0.58rem",
            fontWeight: 500,
            letterSpacing: "0.28em",
            color: onDark ? "var(--color-kraft)" : "var(--color-timber)",
          }}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  );
}
