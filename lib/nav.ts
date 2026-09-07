// Primary navigation (RTL order matches the visual right-to-left order).
export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

// /area and "היומן של מיקאסה" (/blog) were held back from both nav objects
// while the section had no content — owner's call 2026-08-27. Both now have
// real pages and are linked here, indexed like every other page. See
// content/journal.ts for why the journal exists at all.
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
  {
    label: "האזור שלנו",
    href: "/area",
    children: [
      { label: "אטרקציות ליד שעל", href: "/area" },
      { label: "היומן של מיקאסה", href: "/blog" },
    ],
  },
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
    { label: "האזור והאטרקציות", href: "/area" },
    { label: "היומן של מיקאסה", href: "/blog" },
    { label: "צור קשר", href: "/contact" },
  ],
  legal: [
    { label: "הצהרת נגישות", href: "/accessibility" },
    { label: "מדיניות פרטיות", href: "/privacy" },
  ],
};
