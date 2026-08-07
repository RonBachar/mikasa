import type { SVGProps } from "react";
import { sharedAmenities } from "@/content/suites";

const iconBase = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#fff",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function Icon({ name, ...p }: { name: string } & SVGProps<SVGSVGElement>) {
  const paths: Record<string, React.ReactNode> = {
    jacuzzi: (
      <>
        <path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
        <path d="M8 12V6a2 2 0 0 1 4 0" />
        <path d="M12 8h4" />
        <path d="M7 20l-1 2M17 20l1 2" />
      </>
    ),
    balcony: (
      <>
        <path d="M3 21h18" />
        <path d="M5 21v-8h14v8" />
        <path d="M5 13V8h14v5" />
        <path d="M9 21v-8M15 21v-8M12 21v-8" />
      </>
    ),
    kitchen: (
      <>
        <path d="M5 3h14v18H5z" />
        <path d="M5 11h14" />
        <path d="M8 6v2M11 6v2" />
        <circle cx="9" cy="16" r="1.5" />
      </>
    ),
    breakfast: (
      <>
        <path d="M18 8h1a3 3 0 0 1 0 6h-1" />
        <path d="M2 8h16v3a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5z" />
        <path d="M6 2c0 1-1 1-1 2M10 2c0 1-1 1-1 2M14 2c0 1-1 1-1 2" />
      </>
    ),
    parking: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
      </>
    ),
    ac: (
      <>
        <rect x="2" y="4" width="20" height="8" rx="2" />
        <path d="M6 8h8" />
        <path d="M7 16c0 1.5 1 1.5 1 3M12 16c0 1.5 1 1.5 1 3M17 16c0 1.5 1 1.5 1 3" />
      </>
    ),
  };
  return (
    <svg {...iconBase} {...p}>
      {paths[name] ?? null}
    </svg>
  );
}

/**
 * Almaris "The Facilities" layout: tan icon square + serif title + soft body.
 */
export function AmenityGrid({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={`grid gap-x-8 gap-y-10 ${
        compact
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {sharedAmenities.map((a) => (
        <li key={a.label} className="flex items-start gap-4">
          <span
            className="shrink-0 flex items-center justify-center"
            style={{
              width: "3.25rem",
              height: "3.25rem",
              borderRadius: "8px",
              background: "var(--color-gold)",
            }}
          >
            <Icon name={a.icon} />
          </span>
          <span className="min-w-0 pt-0.5">
            <span
              className="block font-display text-lg md:text-xl"
              style={{ color: "var(--color-ink)", fontWeight: 500, lineHeight: 1.3 }}
            >
              {a.label}
            </span>
            <span
              className="mt-1.5 block text-sm font-light leading-relaxed"
              style={{ color: "var(--color-ink-soft)" }}
            >
              {a.blurb}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
