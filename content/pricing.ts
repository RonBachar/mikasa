/**
 * Pricing content.
 *
 * NOTE: this file reverses what used to be a hard rule. The site previously
 * published no prices at all and every package said "בתיאום מראש". The owners
 * (Mika and Ron) decided on 2026-08-27 to publish rates. docs/PRODUCT.md was
 * updated in the same change; if the two ever disagree, this file and the
 * owners are right.
 *
 * The rates below are a starting point, not a quote. Real pricing moves with
 * season and demand, so every price on the page is framed as "from" and the
 * page's job is still to get the visitor onto the phone with Mika.
 */

export type Rate = {
  id: string;
  label: string;
  detail: string;
  amount: number;
};

export type PricedPackage = {
  slug: string;
  title: string;
  tagline: string;
  items: string[];
  /**
   * `null` where the price genuinely varies and cannot be published as one
   * number — the card then shows `priceNote` instead. Not a placeholder for
   * "we haven't decided yet": an unpriced card still has to tell the visitor
   * what to do next, which is what the note is for.
   */
  amount: number | null;
  /** Shown under the price, e.g. "לזוג" or "בתוספת להזמנה". */
  unit: string;
  /** Replaces the price when `amount` is null. */
  priceNote?: string;
};

/**
 * Per night, for the suite, two guests.
 *
 * A night is named by its check-in day, which is why Thursday counts as
 * weekend: a Thursday-to-Friday stay is a weekend stay. Owner-confirmed
 * 2026-08-27, and it corrected an earlier version that had Thursday at the
 * midweek rate.
 */
export const nightlyRates: Rate[] = [
  {
    id: "midweek",
    label: "אמצע שבוע",
    detail: "ראשון עד רביעי",
    amount: 700,
  },
  {
    id: "weekend",
    label: "סוף שבוע",
    detail: "חמישי · שישי · שבת",
    amount: 800,
  },
];

export type StayDeal = {
  id: string;
  label: string;
  detail: string;
  nights: number;
  nightly: number;
  /** Whole percent off the full multi-night total. */
  discountPct: number;
};

/** Multi-night discounts. Percentages are owner-set; totals are derived. */
export const stayDeals: StayDeal[] = [
  {
    id: "midweek-2",
    label: "2 לילות באמצע שבוע",
    detail: "ראשון עד רביעי",
    nights: 2,
    nightly: 700,
    discountPct: 10,
  },
  {
    id: "weekend-2",
    label: "2 לילות בסוף שבוע",
    detail: "חמישי · שישי · שבת",
    nights: 2,
    nightly: 800,
    discountPct: 5,
  },
];

/** Full price, discounted price and the saving, all derived from one source. */
export function dealPricing(deal: StayDeal) {
  const full = deal.nights * deal.nightly;
  const discounted = Math.round(full * (1 - deal.discountPct / 100));
  return { full, discounted, saving: full - discounted };
}

/** Printed under the nightly rates. Breakfast is a package, never bundled. */
export const rateFoot = "ללילה, לזוג, כולל מע\"מ. לא כולל ארוחת בוקר.";

/**
 * Everything that can be added to a booking, in one list, priced.
 *
 * Breakfast lives here rather than beside the nightly rates: it is bought the
 * same way as every other add-on (ordered ahead, with the room), and having it
 * sit half in the rate table and half in the packages grid was what made
 * /prices read as two competing answers to "how much".
 *
 * Order is the display order on both /prices and the homepage strip.
 *
 * Prices owner-set 2026-08-28.
 */
export const pricedPackages: PricedPackage[] = [
  {
    slug: "breakfast",
    title: "ארוחת בוקר כפרית",
    tagline:
      "ארוחת בוקר עשירה וטרייה, עם טעמים מקומיים, המוגשת ישר אליכם לסוויטה.",
    items: [
      "חביתת ירק",
      "מבחר גבינות",
      "ירקות טריים",
      "מגוון לחמים",
      "מיץ תפוזים או לימונדה",
    ],
    amount: 120,
    unit: "לזוג",
  },
  {
    slug: "birthday",
    title: "חבילת יום הולדת",
    tagline: "לחגוג את היום המיוחד שלכם עם פינוק זוגי.",
    items: [
      "יין או פרוסקו מקומי לבחירה",
      "עוגה או מארז קינוחים",
      "זר פרחים",
      "שלט ובלונים לסוויטה",
    ],
    amount: 250,
    unit: "לזוג",
  },
  {
    slug: "anniversary",
    title: "חבילת יום נישואין ורומנטיקה",
    tagline: "עיצוב רומנטי של הסוויטה, נרות, יין משובח ופלטת גבינות מפנקת",
    items: [
      "יין לבן או אדום לבחירה",
      "שוקולד פרלינים",
      "ורדים על המיטה ובג'קוזי",
      "מגש פירות וגבינות מקומיות",
    ],
    amount: 350,
    unit: "לזוג",
  },
  {
    // Was "חבילת פינוקים וספא" — there is no spa on site, so the package is
    // named for what it actually is: an in-suite couples massage. Unpriced on
    // purpose: the therapist is external and sets their own rate, so any
    // number here would be one Mika cannot guarantee.
    slug: "spa",
    title: "חבילת עיסוי זוגי",
    tagline: "חווית עיסוי זוגי בצימר, להגברת הרוגע והשלווה בחופשה.",
    items: [
      "עיסוי לשני בני הזוג, בתוך הסוויטה",
      "העיסוי ניתן על ידי מטפל חיצוני, והזמינות נקבעת מולו בנפרד",
    ],
    amount: null,
    unit: "לזוג",
    priceNote: "למחירים ומידע נוסף נא להתקשר",
  },
];

/**
 * The honesty note. Rates move with season and demand, and saying so plainly
 * is both true and the reason to call: a real answer needs a real person.
 */
export const pricingNote =
  "המחירים המוצגים הם מחירי בסיס לזוג ללילה וכוללים מע\"מ. בחגים, בעונת השלג ובתקופות עמוסות המחיר עשוי להשתנות, ולעיתים נדרש מינימום של שתי לילות. כדי לקבל מחיר מדויק לתאריכים שלכם, הכי מהיר להתקשר אליי או לשלוח הודעה.";

/**
 * Every package here depends on something fresh — eggs, cheese, a cake,
 * flowers — so none of it can be kept in stock waiting for a walk-up request.
 * The note has to say "ordered in advance" plainly, or the site is promising
 * something the kitchen cannot deliver on the morning someone asks.
 */
export const packagesNote =
  "כל התוספות והחבילות מוזמנות מראש, יחד עם הזמנת הסוויטה, כדי שנספיק להכין לכם הכל טרי. ספרו לי מה אתם מציינים ואשמח להתאים לכם את הפינוק המושלם.";
