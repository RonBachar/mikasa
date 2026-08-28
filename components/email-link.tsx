"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

/**
 * Spam-resistant email link.
 *
 * The address never appears as a plain `mailto:` in the server-rendered HTML,
 * which is what address-harvesting crawlers read. The markup ships the parts
 * separately and only assembles them after mount, so a scraper that does not
 * execute JavaScript gets nothing usable.
 *
 * It still degrades honestly: with JavaScript off the visitor reads
 * "office [at] matara [dot] studio", which a person can retype and a naive
 * regex scraper will not match. No text is hidden from anyone.
 *
 * This is deliberately not a CAPTCHA or a contact form. It costs nothing,
 * breaks nothing, and removes the site from the easy half of harvesting.
 */
export function EmailLink({ className }: { className?: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  const { emailUser, emailDomain } = siteConfig;
  const address = `${emailUser}@${emailDomain}`;

  if (!ready) {
    return (
      <span className={className} dir="ltr">
        {emailUser} [at] {emailDomain.replace(".", " [dot] ")}
      </span>
    );
  }

  return (
    <a
      className={className}
      dir="ltr"
      href={`mailto:${address}`}
      rel="nofollow"
    >
      {address}
    </a>
  );
}
