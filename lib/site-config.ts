// Single source of truth for business identity, contact, and conversion links.
// Keep every phone/WhatsApp/address reference pointing here.

const PHONE_DISPLAY = "054-586-9818";
// Same number, grouped 4-3-3 — owner's preferred form for the header button,
// where the number stands alone with no words around it.
const PHONE_DISPLAY_COMPACT = "0545-869-818";
const PHONE_E164 = "+972545869818"; // tel: href
const WHATSAPP_NUMBER = "972545869818"; // wa.me path (no + or dashes)

// Default pre-filled WhatsApp message (no long dash characters, per brand rules).
export const WHATSAPP_MESSAGE =
  "היי מיקה, הגעתי דרך האתר של מיקאסה 🌿 אשמח לשמוע על מחירי אירוח ותאריכים פנויים לחופשה זוגית. תודה רבה!";

/**
 * Route path to absolute URL, in one place.
 *
 * The `"/"` case is the whole point. Written inline, it gets forgotten: the
 * breadcrumb schema emitted `https://mikasa-guest.com/` for the home page
 * while the canonical tag and the sitemap emitted `https://mikasa-guest.com`,
 * so a single document showed Google two URLs for one page. Every absolute
 * URL the site emits — canonical, OG, sitemap, JSON-LD, llms.txt — comes
 * through here so that decision is made once.
 */
export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

const SITE_URL = "https://mikasa-guest.com";

export const siteConfig = {
  // Identity
  name: "מיקאסה",
  legalName: "צימר מיקאסה",
  tagline: "Bed & Breakfast",
  shortDescription:
    "מיקאסה - צימר זוגי בוטיק במושב שעל, רמת הגולן. שתי סוויטות מפנקות עם ג'קוזי פרטי, מרפסת ונוף קסום.",

  // Locale
  locale: "he-IL",
  lang: "he",
  dir: "rtl",

  // Canonical site
  url: SITE_URL,
  domain: "mikasa-guest.com",

  // Contact
  phoneDisplay: PHONE_DISPLAY,
  phoneDisplayCompact: PHONE_DISPLAY_COMPACT,
  phoneE164: PHONE_E164,
  telHref: `tel:${PHONE_E164}`,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappHref: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`,
  /**
   * Public contact address, kept split so components/email-link.tsx can
   * assemble it in the browser instead of shipping a harvestable `mailto:`
   * in the server-rendered HTML. Use <EmailLink /> rather than reading
   * `email` directly anywhere it would end up in markup.
   */
  emailUser: "office",
  emailDomain: "matara.studio",
  email: "office@matara.studio",

  // Address (Moshav Sha'al, Golan Heights, Israel).
  // Owner-approved for publication 2026-08-27.
  address: {
    locality: "מושב שעל",
    region: "רמת הגולן",
    country: "IL",
    full: "משק 36, שעל, רמת הגולן",
    street: "משק 36",
    postalCode: "0012420",
  },

  // Geo, confirmed 2026-08-27 from the Google Places record for this profile.
  // The previous values (33.1975, 35.7386) were a guess at the centre of the
  // moshav and sat roughly 9km from the actual property, so anything that
  // navigated by them sent guests to the wrong place.
  geo: {
    lat: 33.1181177,
    lng: 35.7172914,
    confirmed: true,
  },

  // Google Place ID for this business. Public identifier, safe to commit;
  // the API key that reads it is not (see .env.local).
  placeId: "ChIJ_2FYNfSlHhURNG39XOvHCSQ",

  // Hours — reception by phone; TODO owner to confirm
  hours: "בכל יום, מענה טלפוני ובוואטסאפ",

  // Social / external profiles — TODO owner to supply real URLs
  social: {
    facebook: "", // TODO
    instagram: "", // TODO
    // Canonical Maps URL, derived from the CID in the owner's own Maps link.
    googleMaps: "https://maps.google.com/?cid=2596826473847156020",
    googleReviews: "https://maps.google.com/?cid=2596826473847156020",
  },

  /**
   * Turn-by-turn navigation, straight to the door.
   *
   * Both are https universal links rather than the `waze://` and `comgooglemaps://`
   * app schemes on purpose: a universal link opens the installed app on a phone
   * and falls back to the web version when the app is missing, while a custom
   * scheme just dead-ends on an error page for anyone who does not have it.
   */
  navigation: {
    // `navigate=yes` skips Waze's preview screen and starts routing immediately.
    waze: "https://waze.com/ul?ll=33.1181177,35.7172914&navigate=yes",
    // Place ID pins the exact business rather than trusting a text match on a
    // rural address that geocoders handle badly.
    googleMaps:
      "https://www.google.com/maps/dir/?api=1&destination=33.1181177%2C35.7172914&destination_place_id=ChIJ_2FYNfSlHhURNG39XOvHCSQ",
  },

  // Reviews aggregate (from Google) — TODO owner to confirm current numbers
  reviews: {
    // Confirmed 2026-08-27 against the live Google profile via the Places API.
    // The homepage band reads these numbers from Google directly rather than
    // from here, so this is a fallback and a record, not the display source.
    ratingValue: 4.9,
    reviewCount: 56,
    confirmed: true,
  },

  // Owner
  owner: {
    name: "מיקה",
  },

  // Analytics — set NEXT_PUBLIC_GA_ID in the environment to enable GA4.
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
