"use client";

import Script from "next/script";

/**
 * Smartlook session recording.
 *
 * The vendor ships a raw <script> tag. It is loaded through next/script with
 * `afterInteractive` instead, so the recorder never blocks first paint. The
 * page is a marketing page whose whole job is a phone call, and a third-party
 * recorder is not worth a slower hero.
 *
 * The project key is a public client-side identifier, the same as the GA4
 * measurement ID: it identifies the property to Smartlook and is visible to
 * anyone who views source. It is not a secret and does not belong in
 * .env.local.
 *
 * Only runs in production. In development it would fill the session list with
 * recordings of this dev server.
 */
const SMARTLOOK_KEY = "c5b28692a94485d17171249a65dee80b11b01908";

export function Smartlook() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script id="smartlook" strategy="afterInteractive">
      {`
        window.smartlook||(function(d) {
          var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
          var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
          c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
        })(document);
        smartlook('init', '${SMARTLOOK_KEY}', { region: 'eu' });
      `}
    </Script>
  );
}
