// Suite content. Amenities are IDENTICAL for both suites (owner-confirmed).
// Only atmosphere/design differs, so the descriptive copy is distinct.

export type Suite = {
  slug: "forest" | "rain";
  name: string; // סוויטת יער / סוויטת גשם
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  heroImage: string; // manifest file
  teaserImage: string;
  galleryFolder: string;
  // Two prints stacked beside the lead paragraph — [back, front]. Pick the
  // pair that shows what the lead actually claims about this suite, and not
  // the hero photo again.
  leadImages: [string, string];
  // Citational lead (2-3 sentences answering directly) for GEO.
  lead: string;
  // Distinct atmosphere paragraphs.
  atmosphere: string[];
  teaser: string; // short line for home teaser
};

// Shared amenities — do not diverge between suites.
export const sharedAmenities: {
  icon: string;
  label: string;
  blurb: string;
  note?: string;
}[] = [
  {
    icon: "jacuzzi",
    label: "ג'קוזי פרטי",
    blurb: "ג'קוזי זרמים מזמין ומפנק לערב זוגי רגוע.",
  },
  {
    // Owner correction 2026-08-27: the balcony does not overlook a view (it
    // faces a concrete wall), so it is never described as one. "Cool Golan
    // air" is a true, checkable claim; "magical Golan views" was not.
    icon: "balcony",
    label: "מרפסת פרטית",
    blurb:
      "מרפסת פרטית ליהנות בה מהאוויר הצונן של הגולן - עם קפה טוב בבוקר או כוס יין בערב.",
  },
  {
    icon: "kitchen",
    label: "מטבחון מאובזר",
    blurb:
      "מכונת אספרסו עם קפסולות, פינת קפה עשירה ומטבחון מאובזר בכל מה שצריך לארוחה קלה.",
  },
  {
    // Replaced the "ארוחת בוקר" entry (owner's call): breakfast is a paid
    // add-on tied to a price, not something physically in the suite, and it
    // duplicated what /prices and the FAQ already say. The garden is real
    // and free.
    icon: "garden",
    label: "גינה ירוקה",
    blurb: "חצר כפרית מטופחת ומוקפת ירוק, לרגעי מנוחה ולהנות מהשקט.",
  },
  {
    // Replaced "מיזוג בכל עונה" (owner's call).
    icon: "bbq",
    label: "פינת ברבקיו",
    blurb:
      "עמדת מנגל מאובזרת בפינה בחצר, עם תאורה, שולחן וכסאות לארוחת ערב באוויר הפתוח.",
  },
  {
    icon: "parking",
    label: "חניה פרטית",
    blurb: "מקום חניה צמוד שממתין רק לכם, במרחק כמה צעדים קצרים מהדלת.",
  },
];

export const suites: Record<Suite["slug"], Suite> = {
  forest: {
    slug: "forest",
    name: "סוויטת יער",
    h1: "חוויה זוגית עוטפת, כפרית וחמימה.",
    metaTitle: "סוויטת יער במיקאסה | צימר זוגי עם ג'קוזי בגולן, מושב שעל",
    metaDescription:
      "בואו לחוות את סוויטת יער במיקאסה: סוויטה זוגית עם ג'קוזי פרטי, מרפסת ואווירת עץ חמה ואינטימית במושב שעל, רמת הגולן. לפרטים ותיאום, חייגו למיקה: 054-586-9818.",
    primaryKeyword: "צימר עם ג'קוזי בגולן",
    heroImage: "forest-suite/forest-suite-hero.webp",
    teaserImage: "forest-suite/forest-suite-jacuzzi-04.webp",
    galleryFolder: "forest-suite",
    leadImages: [
      "forest-suite/forest-suite-jacuzzi-romantic.webp",
      "forest-suite/forest-suite-balcony-01.webp",
    ],
    lead: "ברוכים הבאים לסוויטת יער, המפלט הכפרי והחמים שלכם במיקאסה. הסוויטה מתאפיינת בטקסטורות עץ עמוקות, עיצוב חם ותחושה של קן אינטימי ומגונן שמנתק אתכם מיד מכל מה שקורה בחוץ.",
    atmosphere: [
      "החלל העוטף והתאורה הרכה יוצרים אווירה קרובה ומחבקת. מחוץ לסוויטה מחכה לכם מרפסת כפרית ושקטה, מושלמת לכוס יין בערב או קפה של בוקר באוויר הצלול. זהו המקום לזוגות שמחפשים להתכרבל יחד, ליהנות מהג'קוזי הפרטי ולשכוח מהעולם.",
    ],
    teaser:
      "קן זוגי אינטימי עם ג'קוזי פרטי ומרפסת כפרית נעימה לשקט מוחלט.",
  },
  rain: {
    slug: "rain",
    name: "סוויטת גשם",
    h1: "חוויה זוגית מרווחת, בהירה ונושמת.",
    metaTitle: "סוויטת גשם במיקאסה | צימר רומנטי לזוג בגולן, מושב שעל",
    metaDescription:
      "בואו לחוות את סוויטת גשם במיקאסה: סוויטה זוגית מרווחת ומוארת עם ג'קוזי פרטי, מרפסת וחיפויי אבן בהירה במושב שעל, רמת הגולן. לפרטים ותיאום, חייגו למיקה: 054-586-9818.",
    primaryKeyword: "צימר רומנטי לזוג בגולן",
    heroImage: "rain-suite/rain-suite-hero.webp",
    teaserImage: "rain-suite/rain-suite-jacuzzi-02.webp",
    galleryFolder: "rain-suite",
    leadImages: [
      "rain-suite/rain-suite-jacuzzi-02.webp",
      "rain-suite/rain-suite-stone-sink.webp",
    ],
    lead: "ברוכים הבאים לסוויטת גשם, חלל מרווח, פתוח ומלא באור במיקאסה. הסוויטה מעוצבת באבן חמה ובהירה, קווים נקיים וסגנון אוורירי שמשרה תחושה מיידית של מרחב, חופש ונשימה עמוקה.",
    atmosphere: [
      "האופי הפתוח של החדר והטקסטורות הבהירות מעניקים לסוויטה מראה יוקרתי, רגוע ונינוח. יחד עם הג'קוזי הפרטי והמרפסת הנעימה, זו הסוויטה המושלמת לזוגות שאוהבים מרחב פתוח, אור טבעי ותחושת ספא מרגיעה.",
    ],
    teaser:
      "סוויטה אוורירית עם חיפויי אבן בהירה, ג'קוזי פרטי ומרפסת פתוחה לאוויר הקריר.",
  },
};

export const suiteList = [suites.forest, suites.rain];
