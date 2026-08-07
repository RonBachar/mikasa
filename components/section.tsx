import type { ReactNode } from "react";

type Band = "cream" | "cream-2" | "dark";

export function Section({
  children,
  band = "cream",
  className,
  id,
}: {
  children: ReactNode;
  band?: Band;
  className?: string;
  id?: string;
}) {
  const bg =
    band === "dark"
      ? "var(--color-dark)"
      : band === "cream-2"
        ? "var(--color-cream-2)"
        : "var(--color-cream)";
  return (
    <section
      id={id}
      className={`${band === "dark" ? "on-dark" : ""} py-20 md:py-32 ${className ?? ""}`}
      style={{ background: bg, color: band === "dark" ? "var(--color-cream)" : undefined }}
    >
      <div className="container-content">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
  onDark,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
  onDark?: boolean;
}) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-2xl mb-12`}>
      {eyebrow && (
        <span
          className="eyebrow"
          style={onDark ? { color: "var(--color-gold-soft)" } : undefined}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-4xl ${eyebrow ? "mt-5" : ""}`}
        style={onDark ? { color: "var(--color-white)" } : undefined}
      >
        {title}
      </h2>
      {intro && (
        <p
          className="mt-6 text-lg"
          style={{ color: onDark ? "rgba(247,241,232,0.82)" : "var(--color-ink-soft)" }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
