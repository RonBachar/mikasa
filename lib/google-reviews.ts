/**
 * Google reviews, normalised.
 *
 * The rest of the site talks to `getReviews()` and the `Review` shape below,
 * never to Google's payload directly. Today that resolves to the Places API
 * (New), which hard-caps at 5 reviews per place. When Business Profile API
 * access is approved, only `fetchFromPlaces` gets swapped for a Business
 * Profile fetcher; the component layer does not change.
 *
 * Honesty rule (docs/PRODUCT.md): if the fetch fails, the key is missing, or the
 * place has no reviews, this returns null and the section does not render.
 * It never falls back to sample or placeholder content.
 */

/** One review, source-agnostic. */
export type Review = {
  id: string;
  authorName: string;
  /** 1-5, as Google reports it. */
  rating: number;
  text: string;
  /** Google's own phrasing, e.g. "לפני חודשיים". Localised by request. */
  relativeTime: string;
  publishedAt: string;
  /** The reviewer's Google contributor page, when Google supplies one. */
  authorUrl?: string;
};

export type ReviewsData = {
  reviews: Review[];
  /** Aggregate score across ALL reviews, not just the ones returned. */
  rating: number | null;
  /** Total review count on the profile, which exceeds `reviews.length`. */
  totalCount: number | null;
  /** Required by the Places API terms: reviews must link back to Google. */
  googleUrl: string;
};

/**
 * Canonical Maps URL for Mikasa, derived from the CID in the owner's own
 * Maps link (0x2409c7eb5cfd6d34). Used as the fallback attribution target
 * when Google does not return `googleMapsUri`.
 */
export const MIKASA_MAPS_URL = "https://maps.google.com/?cid=2596826473847156020";

/** Places API (New) response subset we actually read. */
type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    name?: string;
    rating?: number;
    relativePublishTimeDescription?: string;
    publishTime?: string;
    text?: { text?: string; languageCode?: string };
    originalText?: { text?: string; languageCode?: string };
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }[];
};

/**
 * Initials for the monogram stamp. Hebrew has no case, so this is purely
 * "first character of the first word, plus first character of the second".
 * Skips punctuation and emoji so a name like "מיקה 💚" still yields "מ".
 */
export function initialsOf(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    // Keep only words that start with an actual letter (Hebrew, Latin, or any
    // other script), dropping emoji, punctuation, and stray symbols.
    .filter((w) => /^\p{L}/u.test(w));

  if (words.length === 0) return "★";
  if (words.length === 1) return [...words[0]][0];
  return [...words[0]][0] + [...words[1]][0];
}

/**
 * Google still reports Hebrew with the deprecated ISO code "iw" rather than
 * "he", and which one comes back is not something to rely on, so both count.
 */
function isHebrew(code: string | undefined): boolean {
  return code === "he" || code === "iw";
}

/**
 * Prefer the reviewer's own words. Google returns `text` translated into the
 * requested language and `originalText` as written. When the review was
 * already written in Hebrew, those are the same and `originalText` is the
 * safer pick; when it was written in another language, the translation is
 * what a Hebrew reader can actually use.
 */
function pickText(r: NonNullable<PlacesResponse["reviews"]>[number]): string {
  const original = r.originalText?.text?.trim();
  if (original && isHebrew(r.originalText?.languageCode)) return original;
  return (r.text?.text ?? original ?? "").trim();
}

/**
 * Google's own `relativePublishTimeDescription` is not reliably localised:
 * one request came back with "לפני 7 חודשים" for one review and "2 months
 * ago" for another. Deriving it from the timestamp keeps every card in
 * Hebrew and phrased the same way.
 *
 * Written out by hand rather than via Intl.RelativeTimeFormat, which renders
 * the Hebrew dual as "לפני חודשיים (2)" on some ICU builds (the numeral is
 * redundant, "חודשיים" already means two) and cleanly on others. Whether the
 * parenthetical appears then depends on the runtime's ICU data, which is not
 * something user-facing copy should hinge on.
 */
function hebrewRelativeTime(iso: string): string {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "";

  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days < 1) return "היום";
  if (days === 1) return "אתמול";
  if (days < 7) return `לפני ${days} ימים`;

  const weeks = Math.floor(days / 7);
  if (days < 30) {
    if (weeks === 1) return "לפני שבוע";
    if (weeks === 2) return "לפני שבועיים";
    return `לפני ${weeks} שבועות`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    if (months === 1) return "לפני חודש";
    if (months === 2) return "לפני חודשיים";
    return `לפני ${months} חודשים`;
  }

  const years = Math.floor(days / 365);
  if (years === 1) return "לפני שנה";
  if (years === 2) return "לפני שנתיים";
  return `לפני ${years} שנים`;
}

async function fetchFromPlaces(): Promise<ReviewsData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  const fields = ["rating", "userRatingCount", "googleMapsUri", "reviews"].join(",");

  let res: Response;
  try {
    res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=he&regionCode=IL`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": fields,
        },
        // Places terms forbid caching review content beyond 30 days. A daily
        // revalidate keeps the page static while staying well inside that.
        next: { revalidate: 86_400 },
      },
    );
  } catch (err) {
    console.error("[reviews] Places request failed:", err);
    return null;
  }

  if (!res.ok) {
    console.error(`[reviews] Places returned ${res.status}: ${await res.text()}`);
    return null;
  }

  const data = (await res.json()) as PlacesResponse;

  const reviews: Review[] = (data.reviews ?? [])
    .map((r, i) => ({
      id: r.name ?? `review-${i}`,
      authorName: r.authorAttribution?.displayName?.trim() ?? "",
      rating: r.rating ?? 0,
      text: pickText(r),
      relativeTime: r.publishTime
        ? hebrewRelativeTime(r.publishTime)
        : (r.relativePublishTimeDescription ?? ""),
      publishedAt: r.publishTime ?? "",
      authorUrl: r.authorAttribution?.uri,
    }))
    // A review with no name or no body cannot be shown honestly, so it is
    // dropped rather than padded with placeholder text.
    .filter((r) => r.authorName.length > 0 && r.text.length > 0);

  if (reviews.length === 0) return null;

  return {
    reviews,
    rating: data.rating ?? null,
    totalCount: data.userRatingCount ?? null,
    googleUrl: data.googleMapsUri ?? MIKASA_MAPS_URL,
  };
}

/**
 * The single entry point the site uses. Returns null whenever real reviews
 * are unavailable, which the section treats as "render nothing".
 */
export async function getReviews(): Promise<ReviewsData | null> {
  return fetchFromPlaces();
}
