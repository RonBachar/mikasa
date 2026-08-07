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
    text: "מקום קסום ואירוח חם ואישי. הסוויטה הייתה נקייה, רומנטית ומפנקת, וכבר מתכננים לחזור.",
    pending: true,
  },
  {
    author: "אורחים מהצפון",
    rating: 5,
    date: "2025-01-01",
    text: "הנוף, השקט והג'קוזי הפרטי עשו לנו חופשה מושלמת. מיקה דאגה לכל פרט.",
    pending: true,
  },
  {
    author: "חוגגי יום נישואין",
    rating: 5,
    date: "2025-01-01",
    text: "חגגנו יום נישואין וקיבלנו פינוק מרגש. אווירה כפרית ורומנטית בדיוק כמו שרצינו.",
    pending: true,
  },
  {
    author: "זוג צעיר",
    rating: 5,
    date: "2025-01-01",
    text: "בריחה מושלמת מהעיר. שקט, פרטיות ויחס אישי שקשה למצוא. ממליצים בחום.",
    pending: true,
  },
  {
    author: "אורחת מירושלים",
    rating: 5,
    date: "2025-01-01",
    text: "כל מה שחיפשנו לחופשה זוגית בגולן. הגינה מרהיבה וארוחת הבוקר הייתה מעולה.",
    pending: true,
  },
  {
    author: "זוג מהשרון",
    rating: 5,
    date: "2025-01-01",
    text: "התאהבנו במקום. סוויטה חמימה, ג'קוזי מפנק ונוף שקשה להתנתק ממנו.",
    pending: true,
  },
];
