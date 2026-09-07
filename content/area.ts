// /area pillar content. Distances are APPROXIMATE (owner to confirm).
// Named public landmarks are fine; commercial providers stay generic per brief.
// Attraction imagery is owner-supplied later; components use graceful placeholders.

export type Attraction = {
  /**
   * Latin slug, used as the card's DOM id and as the anchor in the
   * TouristAttraction schema. Hebrew works in a fragment but arrives
   * percent-encoded everywhere it is pasted, which makes an unreadable link
   * out of the one thing here worth linking to.
   */
  id: string;
  name: string;
  driveTime: string; // approximate
  description: string;
  category: string;
  image?: string; // owner-supplied file under /images/area/... (optional)
};

export const areaLead =
  "צימר מיקאסה ממתין לכם במושב שעל שבצפון רמת הגולן, ונהנה ממיקום מושלם במרחק נסיעה קצר מאתר החרמון, ממעיינות ומפלים קסומים, מיקבי בוטיק מקומיים ומאתרי טבע ומורשת מרתקים. כל המרחקים המצוינים כאן הם משוערים, ותמיד מומלץ לאשר אותם בזמן אמת.";

/**
 * The paragraph that answers "where exactly is this?" before the attraction
 * list starts naming places. Written for someone who has never been to the
 * northern Golan and does not know where Sha'al sits relative to the names
 * they have heard of.
 */
export const areaIntro = [
  "מושב שעל יושב בצפון רמת הגולן, על הכביש שמחבר בין קצרין לחרמון, בגובה של כמה מאות מטרים מעל פני הים. זה מה שנותן לאזור את האוויר הצלול והקריר שלו גם באמצע הקיץ, ואת השלג שיורד כאן לפעמים בחורף.",
  "היתרון האמיתי של המיקום הוא שרוב מה שאנשים באים לגולן בשבילו נמצא בטווח של פחות מחצי שעה נסיעה: החרמון, בירכת רם, מפל סער, הכפרים הדרוזיים והיקבים המקומיים. אפשר לצאת אחרי קפה של בוקר ולחזור לג'קוזי לפני הצהריים.",
];

export type Season = {
  name: string;
  months: string;
  note: string;
};

/**
 * "When should we come?" is the question that decides whether someone books
 * now or files the place away for later, and the honest answer is that every
 * season here is good for a different reason. Kept as content rather than
 * prose in the page so the /area FAQ and this block cannot drift.
 */
export const seasons: Season[] = [
  {
    name: "אביב",
    months: "מרץ עד מאי",
    note: "העונה הירוקה ביותר בגולן. הכל פורח סביב המושב, מסלולי המים זורמים והמזג אוויר נוח לטיולים ארוכים.",
  },
  {
    name: "קיץ",
    months: "יוני עד ספטמבר",
    note: "האוויר כאן צלול וקריר בהרבה מהמרכז, במיוחד בערבים. עונה מצוינת למרפסת, למנגל בחצר ולטיולי מים.",
  },
  {
    name: "סתיו",
    months: "אוקטובר עד נובמבר",
    note: "עונת הבציר והקטיף באזור, עם נופים בגוונים חמים ופחות עומס במסלולים ובאתרים.",
  },
  {
    name: "חורף",
    months: "דצמבר עד פברואר",
    note: "העונה הכי שקטה והכי עוטפת. לפעמים יורד שלג, והחרמון נפתח לסקי כשיש מספיק כיסוי. ג'קוזי חם ביום קר הוא בדיוק מה שנשמע.",
  },
];

export const attractions: Attraction[] = [
  {
    id: "hermon",
    name: "אתר החרמון",
    driveTime: "כ-20 עד 25 דקות",
    description:
      "ההר הגבוה בישראל, המציע סקי ושלג חלומי בחורף, ותצפיות נוף מרהיבות ואינסופיות בשאר העונות.",
    category: "חרמון וסקי",
  },
  {
    id: "birkat-ram",
    name: "בירכת רם",
    driveTime: "כ-10 עד 15 דקות",
    description: "אגם געשי קסום ועגול, הטובל בין הכפרים הדרוזיים, ומציע נקודת עצירה שקטה ומרגיעה במיוחד.",
    category: "טבע ומים",
  },
  {
    id: "saar-waterfall",
    name: "מפל ונחל סער",
    driveTime: "כ-10 דקות",
    description: "מסלול ממים זורם ומרענן עם מפל טבעי, הנחשב לאחד היפים באזור, ונמצא קרוב במיוחד למיקאסה.",
    category: "טבע ומסלולים",
  },
  {
    id: "majdal-shams",
    name: "מג'דל שמס",
    driveTime: "כ-15 דקות",
    description: "כפר דרוזי תוסס ומלא חיים, עם שווקים צבעוניים, אוכל מקומי אותנטי ואווירה מיוחדת שחובה לחוות.",
    category: "כפרים ואוכל",
  },
  {
    id: "har-odem-winery",
    name: "יקב הר-אודם",
    driveTime: "כ-10 דקות",
    description: "יקב בוטיק משובח בלב הגולן, המציע ביקור וטעימות יין מענגות (בתיאום מראש מול היקב).",
    category: "יקבים",
  },
  {
    id: "katzrin",
    name: "קצרין",
    driveTime: "כ-30 עד 35 דקות",
    description: "בירת רמת הגולן, בה תמצאו את קצרין העתיקה, מוזיאונים ומרכזי מבקרים מרתקים.",
    category: "מורשת",
  },
  {
    id: "kinneret",
    name: "הכנרת",
    driveTime: "כ-40 עד 45 דקות",
    description: "חופים יפים, אפשרויות לשיט מהנה ואוכל משובח על שפת המים, ליום טיול מלא וקסום בדרום הכנרת.",
    category: "טבע ומים",
  },
  {
    id: "hula-valley",
    name: "עמק החולה",
    driveTime: "כ-35 עד 40 דקות",
    description: "שמורת טבע מרהיבה עם ציפורים נודדות ונופים פתוחים עוצרי נשימה, יפה במיוחד לביקור בעונות המעבר.",
    category: "טבע ומסלולים",
  },
];

// Category cards for the home "אזור ואטרקציות" section.
// `icon` keys map to the area glyph set in components/icons.tsx.
export type AreaCategoryIcon = "trail" | "vine" | "snow" | "spring" | "sport" | "cafe";

export const areaCategories: { title: string; blurb: string; icon: AreaCategoryIcon }[] = [
  { title: "טבע ומסלולים", icon: "trail", blurb: "מפלים מרעננים, נחלים זורמים ומסלולי טיול קסומים, ממש קרוב לצימר." },
  { title: "יקבים", icon: "vine", blurb: "יקבי בוטיק מקומיים ומשובחים, המציעים טעימות יין מענגות." },
  { title: "חרמון וסקי", icon: "snow", blurb: "שלג לבן וקסום בחורף, ותצפיות נוף מרהיבות בכל ימות השנה." },
  { title: "מעיינות ומים", icon: "spring", blurb: "בירכת רם, בריכות טבעיות קרירות ומעיינות צלולים לרענון." },
  { title: "ספורט אתגרי", icon: "sport", blurb: "מגוון פעילויות ספורט: רכיבה על סוסים, טיולי טרקטורונים ואופניים באזור." },
  { title: "מסעדות ובתי קפה", icon: "cafe", blurb: "מסעדות בוטיק ובתי קפה קסומים, עם אוכל מקומי טרי ואווירה כפרית חמימה." },
];
