# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Couples researching or ready to book a romantic getaway in the Golan Heights, Israel. They arrive via search/social/word-of-mouth, browse on phone or desktop, and the entire "job" of the site is to convince them to call or WhatsApp the owner directly to check dates and book. There is no self-serve booking flow — every reservation is a personal conversation with Mika.

## Product Purpose

Mikasa (מיקאסה) is a two-suite boutique bed & breakfast in Moshav Sha'al, northern Golan Heights, run personally by owner Mika. This is its marketing website, replacing an old WordPress site. Success = phone calls and WhatsApp messages to Mika; there is no other conversion path (no online booking). Base rates are published on `/prices`, but they are a starting point rather than a quote: real pricing moves with season and demand, so the page is built to send the visitor to the phone for an exact number.

## Positioning

Deliberately small and personal, not a hotel: only two suites, both privately jacuzzi-equipped, and every guest is hosted personally by Mika from first phone call to checkout. The two suites (סוויטת יער / Forest, סוויטת גשם / Rain) share every amenity — the differentiation is atmosphere only (forest: wood, green, natural, quiet-in-nature; rain: warm stone, intimate, enveloping). A neighboring generic "boutique hotel" site could not truthfully copy the owner-hosted, two-suite, no-online-booking model.

## Operating Context

- Hebrew-only, full RTL (`dir="rtl"`) throughout.
- **Prices are published (rule reversed 2026-08-27).** This was previously a hard "no prices anywhere" rule; Mika and Ron decided to publish rates. Base rates live in `content/pricing.ts` and render on `/prices`: ₪700 midweek (Sun-Thu), ₪800 weekend (Fri-Sat), per night for the suite, two guests, VAT included; breakfast ₪120 per couple. Every price is framed as a base rate, because holidays, snow season and busy periods differ and some dates carry a two-night minimum. The page says so plainly and then asks for the call. Package prices in that file are a proposal pending Mika's sign-off, marked as such in the source.
- `/packages` was replaced by `/prices` and now 301-redirects there, so one page answers "how much" for the suite, breakfast and packages together.
- Breakfast is available by prior arrangement and paid separately (identical for both suites).
- All contact happens through one source of truth (`lib/site-config.ts`): phone `054-586-9818`, a pre-filled WhatsApp message, and a fixed on-page phone/WhatsApp rail present on every page.
- Real owner photography exists for both suites, the exterior/garden, and area views (~70 processed images in `public/images/`, organized by folder: `forest-suite/`, `rain-suite/`, `exterior/`, `views/`). No stock photography is used or should be used.

## Capabilities and Constraints

- Next.js App Router + TypeScript, Tailwind v4 (CSS `@theme` tokens, no `tailwind.config.js`), static generation, `next/image`.
- Copy rule (hard, non-negotiable): always "סוויטה" (suite), never "חדר" (room).
- Copy rule (hard, non-negotiable): never use the long em dash character anywhere in UI copy.
- Never invent business facts (prices, distances, review content, amenities). Unconfirmed facts are placeholders, explicitly marked, not fabricated.
- **Known defect to fix in the redesign, not carry forward**: `content/reviews.ts` contains six testimonials explicitly marked `pending: true` with a code comment forbidding their use as real reviews — they are currently live on the homepage carousel as if genuine. The redesign must not present fabricated reviews as real; either omit that trust-signal slot until real reviews exist, or use a different, honest mechanism.
- Open owner TODOs (do not block redesign on these, keep placeholders): exact geo lat/lng, street address, public email, social URLs, confirmed Google rating/review count, Google Maps/reviews URL.
- Target: Lighthouse 100 and WCAG AA.

## Brand Commitments

- Name: מיקאסה (Mikasa), tagline "Bed & Breakfast." Owner: מיקה (Mika), who personally hosts every guest ("אני מלווה כל אורח באופן אישי, מהשיחה הראשונה בטלפון ועד הרגע שאתם עוזבים" — About page copy).
- Property has operated ~17 years per the owner's own About-page draft copy.
- Voice: warm, personal, first-person from Mika where the copy already speaks in her voice (About page, some FAQ answers); otherwise warm and direct marketing copy, never corporate or generic.
- **Current visual system is explicitly NOT a brand commitment.** It is a direct, undisguised port of a template called "Almaris" (Tailwind theme name preserved in the current CSS class/comment names: `.suite-card` "Almaris accommodation card," `.offers` "Almaris Special Offers," etc.) applied over Mikasa's real content. A design-critique pass (2026-08-10, see `.impeccable/critique/`) confirmed this reads as generic/interchangeable, not authored for this property. The owner has approved a full visual redesign that replaces this system while preserving all product truth, copy, and photography above. Treat the current palette (beige/gold "Almaris" tokens), Alef/Heebo font pairing, and component patterns (split hero, foot-gradient photo cards, centered-quote carousel) as evidence/anti-reference only, not as constraints to preserve.

## Evidence on Hand

- Real property photography: ~70 processed `.webp` images across `forest-suite/`, `rain-suite/`, `exterior/`, `views/` in `public/images/`, with a manifest (`public/images/manifest.json`) providing dimensions and Hebrew alt text per file.
- Real, Mika-voiced copy: suite atmosphere paragraphs (`content/suites.ts`), About page draft (`app/about/page.tsx`, marked owner-pending for final approval), FAQ answers (`content/faq.ts`) that were explicitly rewritten in Mika's voice with real drive-time estimates to nearby attractions.
- **Absence to respect**: no real guest reviews exist yet. `content/reviews.ts` is placeholder-only and must not be presented as genuine (see Capabilities and Constraints above).
- No pricing data exists or will be published on the site by design.

## Product Principles

1. Every page ultimately serves one action: get a real human to call or WhatsApp Mika. Anything that doesn't support that action is decoration.
2. Small and personal beats hotel-generic. The design should never accidentally read like a mid-size hotel chain; it is one host, two suites.
3. Never fabricate trust or business facts. Placeholders stay visibly provisional until the owner supplies the real thing.
4. Photography is the strongest asset and should lead, not illustrate. The property sells itself visually more convincingly than any copy can.
5. Hebrew RTL is not a localization afterthought — it is the only language and layout direction the site has ever had; the design must be authored RTL-first, not adapted from an LTR template.

## Accessibility & Inclusion

WCAG AA target (explicit project requirement, not yet fully met — the pre-redesign critique found systemic gold-on-cream text contrast failures at ~2.7:1 against the 4.5:1 requirement). RTL correctness (logical properties, not physical left/right) is a functional requirement, not a visual nicety, since 100% of the audience reads Hebrew.
