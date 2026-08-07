import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

// Loads GA4 only when NEXT_PUBLIC_GA_ID is configured. Marks phone_click and
// whatsapp_click as conversions on config so they count as goals in GA4.
export function Analytics() {
  const gaId = siteConfig.analytics.gaId;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            'send_page_view': true
          });
        `}
      </Script>
    </>
  );
}
