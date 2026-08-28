// /area pillar content. Distances are APPROXIMATE (owner to confirm).
// Named public landmarks are fine; commercial providers stay generic per brief.
// Attraction imagery is owner-supplied later; components use graceful placeholders.

export type Attraction = {
  name: string;
  driveTime: string; // approximate
  description: string;
  category: string;
  image?: string; // owner-supplied file under /images/area/... (optional)
};

export const areaLead =
  "צימר מיקאסה ממתין לכם במושב שעל שבצפון רמת הגולן, ונהנה ממיקום מושלם במרחק נסיעה קצר מאתר החרמון, ממעיינות ומפלים קסומים, מיקבי בוטיק מקומיים ומאתרי טבע ומורשת מרתקים. כל המרחקים המצוינים כאן הם משוערים, ותמיד מומלץ לאשר אותם בזמן אמת.";

export const attractions: Attraction[] = [
  {
    name: "אתר החרמון",
    driveTime: "כ-20 עד 25 דקות",
    description:
      "ההר הגבוה בישראל, המציע סקי ושלג חלומי בחורף, ותצפיות נוף מרהיבות ואינסופיות בשאר העונות.",
    category: "חרמון וסקי",
  },
  {
    name: "בירכת רם",
    driveTime: "כ-10 עד 15 דקות",
    description: "אגם געשי קסום ועגול, הטובל בין הכפרים הדרוזיים, ומציע נקודת עצירה שקטה ומרגיעה במיוחד.",
    category: "טבע ומים",
  },
  {
    name: "מפל ונחל סער",
    driveTime: "כ-10 דקות",
    description: "מסלול ממים זורם ומרענן עם מפל טבעי, הנחשב לאחד היפים באזור, ונמצא קרוב במיוחד למיקאסה.",
    category: "טבע ומסלולים",
  },
  {
    name: "מג'דל שמס",
    driveTime: "כ-15 דקות",
    description: "כפר דרוזי תוסס ומלא חיים, עם שווקים צבעוניים, אוכל מקומי אותנטי ואווירה מיוחדת שחובה לחוות.",
    category: "כפרים ואוכל",
  },
  {
    name: "יקב הר-אודם",
    driveTime: "כ-10 דקות",
    description: "יקב בוטיק משובח בלב הגולן, המציע ביקור וטעימות יין מענגות (בתיאום מראש מול היקב).",
    category: "יקבים",
  },
  {
    name: "קצרין",
    driveTime: "כ-30 עד 35 דקות",
    description: "בירת רמת הגולן, בה תמצאו את קצרין העתיקה, מוזיאונים ומרכזי מבקרים מרתקים.",
    category: "מורשת",
  },
  {
    name: "הכנרת",
    driveTime: "כ-40 עד 45 דקות",
    description: "חופים יפים, אפשרויות לשיט מהנה ואוכל משובח על שפת המים, ליום טיול מלא וקסום בדרום הכנרת.",
    category: "טבע ומים",
  },
  {
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
