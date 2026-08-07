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
  "צימר מיקאסה נמצא במושב שעל שבצפון רמת הגולן, במרחק נסיעה קצר מאתר החרמון, ממעיינות ומפלים, מיקבים ומאתרי טבע ומורשת. כל המרחקים כאן משוערים, ומומלץ לאשר בזמן אמת.";

export const attractions: Attraction[] = [
  {
    name: "אתר החרמון",
    driveTime: "כ-20 עד 25 דקות",
    description:
      "ההר הגבוה בישראל, עם סקי ושלג בחורף ותצפיות מרהיבות בשאר העונות.",
    category: "חרמון וסקי",
  },
  {
    name: "בירכת רם",
    driveTime: "כ-10 עד 15 דקות",
    description: "אגם געשי עגול ויפהפה בין הכפרים הדרוזיים, נקודת עצירה שקטה.",
    category: "טבע ומים",
  },
  {
    name: "מפל ונחל סער",
    driveTime: "כ-10 דקות",
    description: "מסלול מים זורם עם מפל, אחד מהיפים באזור, קרוב במיוחד אלינו.",
    category: "טבע ומסלולים",
  },
  {
    name: "מג'דל שמס",
    driveTime: "כ-15 דקות",
    description: "כפר דרוזי תוסס עם שווקים, אוכל מקומי ואווירה מיוחדת.",
    category: "כפרים ואוכל",
  },
  {
    name: "יקב הר-אודם",
    driveTime: "כ-10 דקות",
    description: "יקב בוטיק מקומי, ביקור וטעימות בלב הגולן (בתיאום מול היקב).",
    category: "יקבים",
  },
  {
    name: "קצרין",
    driveTime: "כ-30 עד 35 דקות",
    description: "בירת הגולן, עם קצרין העתיקה, מוזיאונים ומרכזי מבקרים.",
    category: "מורשת",
  },
  {
    name: "הכנרת",
    driveTime: "כ-40 עד 45 דקות",
    description: "חופים, שיט ואוכל על שפת המים, ליום טיול מלא בדרום.",
    category: "טבע ומים",
  },
  {
    name: "עמק החולה",
    driveTime: "כ-35 עד 40 דקות",
    description: "שמורת ציפורים ונופים פתוחים, מרהיב במיוחד בעונות המעבר.",
    category: "טבע ומסלולים",
  },
];

// Category cards for the home "אזור ואטרקציות" section.
export const areaCategories: { title: string; blurb: string }[] = [
  { title: "טבע ומסלולים", blurb: "מפלים, נחלים ומסלולי טיול קרובים." },
  { title: "יקבים", blurb: "יקבי בוטיק מקומיים וטעימות יין." },
  { title: "חרמון וסקי", blurb: "שלג בחורף ותצפיות בכל השנה." },
  { title: "מעיינות ומים", blurb: "בירכת רם, בריכות טבעיות ומעיינות." },
  { title: "ספורט אתגרי", blurb: "רכיבה, טרקטורונים ואופניים באזור." },
  { title: "עיסוי בסוויטה", blurb: "פינוק זוגי ועיסוי בתיאום מראש." },
];
