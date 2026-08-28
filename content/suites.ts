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
    h1: "סוויטת יער: חוויה זוגית עם ג'קוזי פרטי במיקאסה",
    metaTitle: "סוויטת יער במיקאסה | צימר זוגי עם ג'קוזי בגולן, מושב שעל",
    metaDescription:
      "בואו לחוות את סוויטת יער במיקאסה: סוויטה זוגית עם ג'קוזי פרטי, מרפסת ואווירת יער ירוקה במושב שעל, רמת הגולן. לפרטים ותיאום, חייגו למיקה: 054-586-9818.",
    primaryKeyword: "צימר עם ג'קוזי בגולן",
    heroImage: "forest-suite/forest-suite-hero.webp",
    teaserImage: "forest-suite/forest-suite-jacuzzi-04.webp",
    galleryFolder: "forest-suite",
    leadImages: [
      "forest-suite/forest-suite-jacuzzi-romantic.webp",
      "forest-suite/forest-suite-balcony-01.webp",
    ],
    lead: "ברוכים הבאים לסוויטת יער - המקום המושלם לחופשה זוגית שקטה במיקאסה, מושב שעל, רמת הגולן. כאן מחכה לכם ג'קוזי פרטי, מרפסת ומטבחון, כשמסביב עוטפת אתכם אווירה ירוקה וטבעית, ממש בחיק היער.",
    atmosphere: [
      "בסוויטת יער, כל פרט עוטף אתכם בירוק מרגיע. עץ חם, צמחייה עשירה ואור רך שמסתנן פנימה, יוצרים יחד תחושה עמוקה של טבע, גם כשאתם נחים במיטה. זו הסוויטה המושלמת לזוגות שמחפשים את השקט של היער ואת התחושה שהעולם כולו נשאר בחוץ.",
      "הג'קוזי הפרטי מחכה לכם בפינה אינטימית, והמרפסת מזמינה אתכם אל הירק המרהיב של הגולן. דמיינו: בבוקר תתעוררו לציוץ ציפורים ואוויר צלול, ובערב תירגעו באור חמים. זה המקום המושלם להאט קצב, לנשום עמוק ופשוט להיות רק שניכם.",
    ],
    teaser:
      "עץ, ירוק ושקט של יער. סוויטה זוגית עוטפת, עם ג'קוזי פרטי ומרפסת המשקיפה לנוף הגולן המרגיע.",
  },
  rain: {
    slug: "rain",
    name: "סוויטת גשם",
    h1: "סוויטת גשם: חוויה זוגית מפנקת במיקאסה",
    metaTitle: "סוויטת גשם במיקאסה | צימר רומנטי לזוג בגולן, מושב שעל",
    metaDescription:
      "בואו לחוות את סוויטת גשם במיקאסה: סוויטה זוגית רומנטית עם ג'קוזי פרטי, מרפסת ואווירת אבן חמה במושב שעל, רמת הגולן. לפרטים ותיאום, חייגו למיקה: 054-586-9818.",
    primaryKeyword: "צימר רומנטי לזוג בגולן",
    heroImage: "rain-suite/rain-suite-hero.webp",
    teaserImage: "rain-suite/rain-suite-jacuzzi-02.webp",
    galleryFolder: "rain-suite",
    leadImages: [
      "rain-suite/rain-suite-jacuzzi-02.webp",
      "rain-suite/rain-suite-stone-sink.webp",
    ],
    lead: "ברוכים הבאים לסוויטת גשם - המקום המושלם לחופשה זוגית חמה ואינטימית במיקאסה, מושב שעל, רמת הגולן. כאן מחכה לכם ג'קוזי פרטי, מרפסת ומטבחון, כשמסביב עוטפת אתכם אווירת אבן מיוחדת, שמחבקת ומפנקת.",
    atmosphere: [
      "סוויטת גשם בנויה כולה מחום מזמין. חיפויי אבן טבעית, גוונים עמוקים ותאורה רכה יוצרים חלל אינטימי שמחבק אתכם פנימה, ממש כמו מפלט חמים בערב גשום בגולן. זו הסוויטה המושלמת לזוגות שמחפשים קרבה, פרטיות ותחושה עוטפת ומרגיעה.",
      "הג'קוזי הפרטי והכיור המעוצב מאבן, מעניקים לסוויטה נופך יוקרתי ומפנק. המרפסת נפתחת אל נוף פתוח ומרהיב של הגולן, ויוצרת מקום מושלם להתכרבל בו, לשכוח מהזמן ולהפוך כל ערב לחוויה זוגית בלתי נשכחת.",
    ],
    teaser:
      "אבן חמה, אינטימיות ופינוק. סוויטה זוגית עוטפת, עם ג'קוזי פרטי ומרפסת המשקיפה לנוף הגולן.",
  },
};

export const suiteList = [suites.forest, suites.rain];
