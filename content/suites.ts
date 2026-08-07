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
    blurb: "פינת פינוק אינטימית בתוך הסוויטה, מושלמת לערב זוגי רגוע.",
  },
  {
    icon: "balcony",
    label: "מרפסת פרטית",
    blurb: "יציאה פרטית אל האוויר הצח ונופי הגולן, לקפה בבוקר או כוס יין בערב.",
  },
  {
    icon: "kitchen",
    label: "מטבחון מאובזר",
    blurb: "כל מה שצריך לארוחה קלה או קפה טרי, בלי לצאת מהסוויטה.",
  },
  {
    icon: "breakfast",
    label: "ארוחת בוקר",
    blurb: "ארוחת בוקר כפרית בתיאום מראש, בתשלום.",
    note: "בתשלום, בהזמנה מראש",
  },
  {
    icon: "parking",
    label: "חניה פרטית",
    blurb: "חניה צמודה ונוחה ליד הסוויטה, בלי דאגות.",
  },
  {
    icon: "ac",
    label: "מיזוג בכל עונה",
    blurb: "נעים בקיץ וחם בחורף, כדי שתישארו ממוקדים רק בחופשה.",
  },
];

export const suites: Record<Suite["slug"], Suite> = {
  forest: {
    slug: "forest",
    name: "סוויטת יער",
    h1: "סוויטת יער, סוויטה זוגית עם ג'קוזי במיקאסה",
    metaTitle: "סוויטת יער | צימר זוגי עם ג'קוזי בגולן, מיקאסה שעל",
    metaDescription:
      "סוויטת יער במיקאסה, סוויטה זוגית עם ג'קוזי פרטי, מרפסת ואווירת יער ירוקה בשעל שברמת הגולן. חייגו למיקה 054-586-9818 לתיאום.",
    primaryKeyword: "צימר עם ג'קוזי בגולן",
    heroImage: "forest-suite/forest-suite-hero.webp",
    teaserImage: "forest-suite/forest-suite-jacuzzi-01.webp",
    galleryFolder: "forest-suite",
    lead: "סוויטת יער היא סוויטה זוגית בצימר מיקאסה במושב שעל שברמת הגולן, עם ג'קוזי פרטי, מרפסת ומטבחון. האווירה שלה ירוקה וטבעית, לחופשה זוגית שקטה בחיק היער.",
    atmosphere: [
      "בסוויטת יער הכל עוטף אתכם בירוק. עץ חם, צמחייה מסביב ואור רך שמסתנן פנימה יוצרים תחושה של להיות עמוק בתוך הטבע, גם כשאתם פשוט שוכבים במיטה. זו הסוויטה לזוגות שאוהבים את השקט של היער ואת התחושה שהעולם נשאר בחוץ.",
      "הג'קוזי הפרטי ממוקם בפינה אינטימית, והמרפסת נפתחת אל הירק של הגולן. בבוקר תשמעו ציפורים ותנשמו אוויר צלול, ובערב הכל נרגע לאור חמים. זה מקום להאט בו, לנשום, ולהיות רק שניכם.",
    ],
    teaser:
      "עץ, ירוק ושקט של יער. סוויטה זוגית עוטפת עם ג'קוזי פרטי ומרפסת אל נוף הגולן.",
  },
  rain: {
    slug: "rain",
    name: "סוויטת גשם",
    h1: "סוויטת גשם, סוויטה זוגית מפנקת במיקאסה",
    metaTitle: "סוויטת גשם | צימר רומנטי לזוג בגולן, מיקאסה שעל",
    metaDescription:
      "סוויטת גשם במיקאסה, סוויטה זוגית רומנטית עם ג'קוזי פרטי, מרפסת ואווירת אבן חמה בשעל שברמת הגולן. חייגו למיקה 054-586-9818 לתיאום.",
    primaryKeyword: "צימר רומנטי לזוג בגולן",
    heroImage: "rain-suite/rain-suite-hero.webp",
    teaserImage: "rain-suite/rain-suite-jacuzzi-02.webp",
    galleryFolder: "rain-suite",
    lead: "סוויטת גשם היא סוויטה זוגית בצימר מיקאסה במושב שעל שברמת הגולן, עם ג'קוזי פרטי, מרפסת ומטבחון. האווירה שלה חמה ואינטימית, בעיצוב אבן שעוטף ומחבק.",
    atmosphere: [
      "סוויטת גשם בנויה מחום. חיפויי אבן טבעית, גוונים עמוקים ותאורה רכה יוצרים חלל אינטימי שמחבק אתכם פנימה, כמו מפלט חמים בערב גשום של גולן. זו הסוויטה לזוגות שמחפשים קרבה, פרטיות ותחושה עוטפת.",
      "הג'קוזי הפרטי והכיור המעוצב מאבן נותנים לסוויטה נופך של פינוק, והמרפסת נפתחת אל נוף פתוח של הגולן. כאן קל להתכרבל, לשכוח מהזמן, ולהפוך ערב פשוט לחוויה זוגית שנשארת.",
    ],
    teaser:
      "אבן חמה, אינטימיות ופינוק. סוויטה זוגית עוטפת עם ג'קוזי פרטי ומרפסת אל נוף הגולן.",
  },
};

export const suiteList = [suites.forest, suites.rain];
