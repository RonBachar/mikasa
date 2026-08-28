import type { ReactNode } from "react";

/**
 * The standard icon carrier: a filled variety-color square with a hard offset
 * shadow, white glyph centered inside. Two variants, one per suite variety color,
 * so a section can pick its own identity without inventing a new treatment.
 */
export type StampVariant = "cherry" | "forest";

const variantBg: Record<StampVariant, string> = {
  cherry: "var(--color-cherry)",
  forest: "var(--color-forest)",
};

export function IconStamp({
  children,
  variant = "cherry",
  size = "3.25rem",
}: {
  children: ReactNode;
  variant?: StampVariant;
  size?: string;
}) {
  return (
    <span
      className="shrink-0 flex items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-card)",
        background: variantBg[variant],
        boxShadow: "var(--shadow-stamp)",
        color: "#fff",
      }}
    >
      {children}
    </span>
  );
}
