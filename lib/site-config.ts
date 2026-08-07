// Single source of truth for business identity, contact, and conversion links.
// Keep every phone/WhatsApp/address reference pointing here.

const PHONE_DISPLAY = "054-586-9818";
const PHONE_E164 = "+972545869818"; // tel: href
const WHATSAPP_NUMBER = "972545869818"; // wa.me path (no + or dashes)

// Default pre-filled WhatsApp message (no long dash characters, per brand rules).
export const WHATSAPP_MESSAGE =
  "היי מיקה, הגעתי דרך האתר של מיקאסה 🌿 אשמח לשמוע על מחירים ותאריכים פנויים לחופשה זוגית. תודה!";

export const siteConfig = {
  // Identity
  name: "מיקאסה",
  legalName: "צימר מיקאסה",
  tagline: "Bed & Breakfast",
  shortDescription:
    "צימר זוגי בוטיק במושב שעל שברמת הגולן, עם שתי סוויטות הכוללות ג'קוזי פרטי, מרפסת ונוף.",

  // Locale
  locale: "he-IL",
  lang: "he",
  dir: "rtl",

  // Canonical site
  url: "https://mikasa-guest.com",
  domain: "mikasa-guest.com",

  // Contact
  phoneDisplay: PHONE_DISPLAY,
  phoneE164: PHONE_E164,
  telHref: `tel:${PHONE_E164}`,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappHref: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`,
  email: "", // TODO: owner to confirm a public contact email (optional)

  // Address (Moshav Sha'al, Golan Heights, Israel)
  address: {
    locality: "מושב שעל",
    region: "רמת הגולן",
    country: "IL",
    full: "מושב שעל, רמת הגולן",
    // TODO: owner to confirm exact street/house + postal code
    street: "",
    postalCode: "",
  },

  // Geo — TODO: owner to confirm exact lat/lng. Approximate center of Moshav Sha'al.
  geo: {
    lat: 33.1975, // APPROX — confirm
    lng: 35.7386, // APPROX — confirm
    confirmed: false,
  },

  // Hours — reception by phone; TODO owner to confirm
  hours: "בכל יום, מענה טלפוני ובוואטסאפ",

  // Social / external profiles — TODO owner to supply real URLs
  social: {
    facebook: "", // TODO
    instagram: "", // TODO
    googleMaps: "", // TODO: Google Business profile / reviews URL
    googleReviews: "", // TODO: link to full reviews
  },

  // Reviews aggregate (from Google) — TODO owner to confirm current numbers
  reviews: {
    ratingValue: 4.9, // TODO confirm
    reviewCount: 200, // TODO confirm ("200+")
    confirmed: false,
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
