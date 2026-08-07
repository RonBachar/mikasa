// Curated Google reviews (Phase 5).
// PLACEHOLDER content — owner to replace each with a real, verbatim Google review
// (name, text, date). Do NOT publish invented reviews as real; these are marked
// pending so they are easy to swap. Aggregate rating/count live in site-config.
export type Review = {
  author: string;
  rating: number; // 1-5
  date: string; // ISO date
  text: string;
  pending?: boolean;
};

export const reviews: Review[] = [
  {
    author: "זוג מהמרכז",
    rating: 5,
    date: "2025-01-01",
    text: "מקום קסום ואירוח חם ואישי במיוחד. הסוויטה הייתה נקייה, רומנטית ומפנקת, הג'קוזי הפרטי והשקט מסביב עשו לנו חופשה מושלמת באמת, וכבר מתכננים לחזור שוב בקרוב.",
    pending: true,
  },
  {
    author: "אורחים מהצפון",
    rating: 5,
    date: "2025-01-01",
    text: "הנוף, השקט והג'קוזי הפרטי עשו לנו חופשה זוגית מושלמת בגולן. מיקה דאגה לכל פרט קטן, הסוויטה חמימה ומזמינה, וההרגשה היא של בית קטן ומפנק הרחק מהעולם.",
    pending: true,
  },
  {
    author: "חוגגי יום נישואין",
    rating: 5,
    date: "2025-01-01",
    text: "חגגנו יום נישואין וקיבלנו פינוק מרגש ומדויק. האווירה הכפרית והרומנטית הייתה בדיוק כמו שרצינו, הסוויטה מושלמת לזוג, והיחס האישי של מיקה הפך את השהייה לבלתי נשכחת.",
    pending: true,
  },
  {
    author: "זוג צעיר",
    rating: 5,
    date: "2025-01-01",
    text: "בריחה מושלמת מהעיר אל השקט של רמת הגולן. פרטיות מלאה, יחס אישי שקשה למצוא במקומות אחרים, ג'קוזי מפנק ומרפסת נעימה. ממליצים בחום לכל זוג שמחפש חופשה אינטימית.",
    pending: true,
  },
  {
    author: "אורחת מירושלים",
    rating: 5,
    date: "2025-01-01",
    text: "כל מה שחיפשנו לחופשה זוגית בגולן נמצא כאן במקום אחד. הגינה מרהיבה, הסוויטה מטופחת ומזמינה, וארוחת הבוקר הייתה מעולה. הרגשנו רגועים ומפנקים מהרגע הראשון ועד הפרידה.",
    pending: true,
  },
  {
    author: "זוג מהשרון",
    rating: 5,
    date: "2025-01-01",
    text: "התאהבנו במקום כבר ביום הראשון. סוויטה חמימה ומעוצבת בטעם, ג'קוזי מפנק ונוף שקשה להתנתק ממנו. השקט, הפרטיות והאירוח האישי של מיקה יצרו לנו חופשה זוגית מושלמת.",
    pending: true,
  },
];
