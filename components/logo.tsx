import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

// Rectangular text logo: "מיקאסה" over a gold rule + "Bed & Breakfast" subline.
export function Logo({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name}, ${siteConfig.tagline}, דף הבית`}
      className={`inline-flex flex-col leading-none ${className ?? ""}`}
    >
      <span
        className="font-display tracking-tight"
        style={{
          fontSize: "1.7rem",
          fontWeight: 500,
          color: onDark ? "var(--color-cream)" : "var(--color-ink)",
        }}
      >
        {siteConfig.name}
      </span>
      <span
        aria-hidden
        className="mt-1 mb-1 h-px w-full"
        style={{ background: "var(--color-gold)" }}
      />
      <span
        className="uppercase"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.28em",
          color: onDark ? "var(--color-gold-soft)" : "var(--color-gold)",
        }}
      >
        {siteConfig.tagline}
      </span>
    </Link>
  );
}
