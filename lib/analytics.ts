// GA4 event helper. Conversion events for the two goals: phone + WhatsApp.
export type GaEventName =
  | "phone_click"
  | "whatsapp_click"
  | "cta_click";

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
