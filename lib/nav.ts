// Primary navigation (RTL order matches the visual right-to-left order).
export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const mainNav: NavItem[] = [
  { label: "בית", href: "/" },
  {
    label: "הסוויטות",
    href: "/#suites",
    children: [
      { label: "סוויטת יער", href: "/suites/forest" },
      { label: "סוויטת גשם", href: "/suites/rain" },
    ],
  },
  { label: "האזור", href: "/area" },
  { label: "חבילות", href: "/packages" },
  { label: "אודות", href: "/about" },
  { label: "בלוג", href: "/blog" },
  { label: "צור קשר", href: "/contact" },
];

export const footerNav = {
  primary: [
    { label: "בית", href: "/" },
    { label: "סוויטת יער", href: "/suites/forest" },
    { label: "סוויטת גשם", href: "/suites/rain" },
    { label: "האזור והאטרקציות", href: "/area" },
    { label: "חבילות פינוק", href: "/packages" },
  ],
  secondary: [
    { label: "אודות מיקאסה", href: "/about" },
    { label: "גלריית תמונות", href: "/gallery" },
    { label: "בלוג", href: "/blog" },
    { label: "צור קשר", href: "/contact" },
  ],
  legal: [
    { label: "הצהרת נגישות", href: "/accessibility" },
    { label: "מדיניות פרטיות", href: "/privacy" },
  ],
};
