// /packages content. No prices anywhere. Everything "בתיאום מראש בהזמנה".
export type Pkg = {
  slug: string;
  title: string;
  tagline: string;
  items: string[];
};

export const packages: Pkg[] = [
  {
    slug: "birthday",
    title: "חבילת יום הולדת",
    tagline: "לחגוג את היום המיוחד בפינוק זוגי",
    items: [
      "יין או פרוסקו מקומי",
      "עוגה או מארז קינוחים",
      "זר פרחי שדה",
      "שלט ובלונים לחדר",
    ],
  },
  {
    slug: "anniversary",
    title: "חבילת יום נישואין ורומנטיקה",
    tagline: "ערב רומנטי בלתי נשכח לשניים",
    items: [
      "יין ושני גביעים",
      "שוקולד פרלינים",
      "עלי ורדים על המיטה ובג'קוזי",
      "נרות LED לאווירה",
      "שדרוג ארוחת בוקר בסוויטה",
    ],
  },
  {
    slug: "spa",
    title: "חבילת פינוקים וספא",
    tagline: "פינוק זוגי מלא ורגוע",
    items: [
      "מארז פינוק זוגי, יין, פירות, גבינות מקומיות ופרלינים",
      "אפשרות לעיסוי זוגי בסוויטה",
    ],
  },
];

export const packagesNote =
  "כל החבילות בתיאום מראש בהזמנה. ספרו למיקה מה אתם מציינים, ונתאים לכם את הפינוק המושלם.";
