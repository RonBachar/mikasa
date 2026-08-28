// Primary navigation (RTL order matches the visual right-to-left order).
export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

// "היומן של מיקאסה" (/blog and its children) is deliberately absent from
// both nav objects below. The pages exist and stay noindex (see
// app/robots.ts) — owner's call 2026-08-27 is to also keep them unlinked
// from site navigation until the section has real content. Reachable only
// by direct URL until that changes; remove both this comment and the
// robots/noindex setup together, not one without the other.
export const mainNav: NavItem[] = [
  {
    label: "הסוויטות שלנו",
    href: "/#suites",
    children: [
      { label: "סוויטת יער", href: "/suites/forest" },
      { label: "סוויטת גשם", href: "/suites/rain" },
    ],
  },
  { label: "גלריה", href: "/gallery" },
  { label: "מחירים", href: "/prices" },
  { label: "אודות", href: "/about" },
  { label: "צור קשר", href: "/contact" },
];

export const footerNav = {
  primary: [
    { label: "בית", href: "/" },
    { label: "סוויטת יער", href: "/suites/forest" },
    { label: "סוויטת גשם", href: "/suites/rain" },
    { label: "מחירים וחבילות", href: "/prices" },
  ],
  secondary: [
    { label: "אודות מיקאסה", href: "/about" },
    { label: "גלריית תמונות", href: "/gallery" },
    { label: "צור קשר", href: "/contact" },
  ],
  legal: [
    { label: "הצהרת נגישות", href: "/accessibility" },
    { label: "מדיניות פרטיות", href: "/privacy" },
  ],
};
