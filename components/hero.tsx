import Image from "next/image";
import type { ReactNode } from "react";
import { img } from "@/lib/images";
import { PhoneCTA, WhatsAppCTA } from "./cta";

/**
 * Full-bleed hero with a background image, dark gradient for legibility,
 * and the page H1. `priority` on the image makes it the LCP element.
 */
export function Hero({
  image,
  eyebrow,
  title,
  subtitle,
  actions,
  size = "large",
  h1 = true,
}: {
  image: string; // manifest file
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: "cta" | "none" | ReactNode;
  size?: "large" | "medium";
  h1?: boolean;
}) {
  const m = img(image);
  const Heading = h1 ? "h1" : "h2";
  return (
    <section
      className="on-dark relative isolate flex items-end"
      style={{ minHeight: size === "large" ? "min(82vh, 720px)" : "min(56vh, 460px)" }}
    >
      <Image
        src={m.src}
        alt={m.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(30,27,23,0.85) 0%, rgba(30,27,23,0.45) 45%, rgba(30,27,23,0.22) 100%)",
        }}
      />
      <div className="container-content pb-14 pt-28">
        <div className="max-w-2xl">
          {eyebrow && (
            <span className="eyebrow" style={{ color: "var(--color-gold)" }}>
              {eyebrow}
            </span>
          )}
          <Heading
            className="text-5xl mt-4"
            style={{ color: "var(--color-cream)" }}
          >
            {title}
          </Heading>
          {subtitle && (
            <p className="mt-5 text-xl" style={{ color: "rgba(247,244,237,0.92)" }}>
              {subtitle}
            </p>
          )}
          {actions === "cta" && (
            <div className="mt-8 flex flex-wrap gap-4">
              <PhoneCTA location="hero" showNumber />
              <WhatsAppCTA location="hero" />
            </div>
          )}
          {actions && actions !== "cta" && actions !== "none" && (
            <div className="mt-8 flex flex-wrap gap-4">{actions}</div>
          )}
        </div>
      </div>
    </section>
  );
}
