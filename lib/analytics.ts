// GA4 event helper. Conversion events for the two goals: phone + WhatsApp.
export type GaEventName =
  | "phone_click"
  | "whatsapp_click"
  | "cta_click"
  // Waze / Google Maps taps. Not a conversion in itself, but a strong intent
  // signal: someone getting directions has usually already booked.
  | "navigate_click";

type GaParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: GaEventName, params: GaParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
