# Design

<!-- impeccable:design-schema 1 -->

## World

**Golan crate-label.** Mikasa is told through the graphic language of the region's own fruit-crate stencils and roadside fruit-stand signs — the actual visual culture a couple drives past on the way up to Sha'al, not a generic "boutique hotel" template. The two suites are presented as two rare, named varieties (סוויטת יער = orchard green, סוויטת גשם = cherry red) rather than interchangeable rooms. Replaces the prior "Almaris" port (a beige/gold Western boutique-hotel theme applied over Mikasa's real content with no product-specific authorship — see `.impeccable/critique/2026-08-10T11-38-48Z__app-page-tsx.md`).

Chosen via `concept-seed.mjs --scope direction --mode persuade` (seed key `76aa8cf5`, assigned index 6 of 7 grounded candidates: Golan apple/cherry orchard-crate branding). Direction contract recorded in `app/layout.tsx` (first child of `<body>`).

## Palette — Committed, not Restrained

Color strategy: **Committed** (two saturated variety colors each carry real page-scale weight — buttons, active nav, card overlays, the icon rail — not just small accents).

| Token | Hex | Role |
|---|---|---|
| `--color-parchment` | `#F2E6CE` | Page background — kraft label paper |
| `--color-kraft` | `#DFC294` | Section-band separation, card panels |
| `--color-timber` | `#7A5230` | Borders, crate-frame lines, decorative dividers |
| `--color-cherry` | `#8B2635` | Committed accent — סוויטת גשם, primary buttons, active nav, icon rail |
| `--color-cherry-deep` | `#6B1B26` | Cherry hover/active |
| `--color-forest` | `#4B6B39` | Committed accent — סוויטת יער |
| `--color-forest-deep` | `#38512A` | Forest hover/active |
| `--color-ink` | `#1C140D` | Headings, primary text |
| `--color-ink-soft` | `#4A3B2C` | Secondary/body text |
| `--color-dark` | `#14100A` | Footer, dark bands |

All text/background pairs verified WCAG AA (4.5:1 normal text, 3:1 large) — see the 2026-08-10 accessibility pass. One near-failure (timber-on-kraft eyebrow text, ~4.0:1) was caught and fixed by switching to the default cherry eyebrow color (5.06:1).

**Known Tailwind v4 + Turbopack issue**: a handful of `@theme`-declared color tokens (`--color-forest`, `--color-forest-deep`, `--color-brown`, `--shadow-stamp`) reproducibly failed to register — confirmed across renames, repositioning, and a full dev-server restart. Worked around by declaring them as plain `:root` custom properties immediately after the `@theme` block instead (`app/globals.css`) — ordinary CSS the browser always reads, at the cost of not getting Tailwind's auto-generated utility classes for those four tokens specifically (not needed; they're only ever consumed via `var()`).

> ### ✓ Naming decision: legacy token names, current values
>
> `app/globals.css` still spells several tokens with their original Almaris-era names — `--color-cream`, `--color-cream-2`, `--color-gold`, `--color-gold-deep` — but every one of them is aliased to a Golan crate-label value (`--color-gold: var(--color-cherry)`, etc.). Every button, card and accent you see on the live site is already the committed cherry/forest palette; only the CSS variable *names* are stale. This is intentional debt, not a bug: renaming them is a pure find-and-replace with no visual effect, and it hasn't been worth the diff yet. Treat `--color-gold` in any class as "the cherry accent," not as an Almaris leftover.

> ### ✍️ House style: copy rules that also constrain design
>
> No long dash (—) anywhere, in copy or in code comments meant for the owner. Always "סוויטה," never "חדר." The two units are always named exactly סוויטת יער and סוויטת גשם. No invented prices or facts; every distance/time is phrased as approximate (`כ-`, `בקירוב`). These aren't just copy rules, they're why the trust band shows verified facts instead of quotes (see *Composition* below) and why every suite card is labeled by its real variety name rather than a generic "Suite A / Suite B."

## Type

- **Display**: **Alef**, weights 400 (Regular) and 700 (Bold), the only two the family ships. Self-hosted locally via `next/font/local` (`app/layout.tsx`) from `public/fonts/Alef/`, no Google Fonts network fetch at build or dev time. Headings render at up to `font-weight: 800`/`900` in `globals.css` for historical reasons (an earlier Rubik-based pass); since Alef tops out at 700, the browser silently substitutes its heaviest available weight (700), which reads slightly lighter than the old Rubik treatment. That's an accepted trade, not an oversight, see *Open Items*.
- **Body**: **Heebo**, weights 300/400/500/600/700, all self-hosted the same way from `public/fonts/Heebo/static/`. Unchanged in spirit from the prior system, already a clean workhorse Hebrew sans.
- **Hero wordmark**: `--text-hero`, `clamp(2.9rem, 2rem + 4.2vw, 5.25rem)`, rendered via `.stencil-heading`.

### Type Scale

| Token | Size | Usage |
|---|---|---|
| `--text-xs` | `0.8rem` (~13px) | Fine print, note labels |
| `--text-sm` | `0.9rem` (~14px) | Captions, meta text |
| `--text-base` | `1.0625rem` (~17px) | Body default |
| `--text-lg` | `1.1875rem` (~19px) | Lead paragraphs |
| `--text-xl` | `clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)` | Card titles |
| `--text-2xl` | `clamp(1.5rem, 1.3rem + 0.9vw, 1.9rem)` | Subheadings |
| `--text-3xl` | `clamp(1.85rem, 1.5rem + 1.4vw, 2.4rem)` | H3 |
| `--text-4xl` | `clamp(2.25rem, 1.7rem + 2.4vw, 3.25rem)` | Section H2 |
| `--text-5xl` | `clamp(2.5rem, 1.9rem + 3vw, 3.75rem)` | Page H1 |
| `--text-hero` | `clamp(2.9rem, 2rem + 4.2vw, 5.25rem)` | Hero wordmark only |

All headings (`h1`-`h4`) default to `font-weight: 800`, `letter-spacing: -0.01em`, `line-height: 1.05`, via the base layer in `globals.css` — one rule, not per-component overrides.

## Spacing & Shapes

- **Container**: `--container-content: 80rem` (1280px), centered, `1.5rem` inline padding.
- **Radii — raw crate wood, not rounded hotel corners**: `--radius-control: 0` (buttons: sharp square corners), `--radius-card: 2px` (image frames: plank-edge, barely eased).
- **Shadows — graphic and hard, not soft/blurred**: `--shadow-card` (a 1px hairline + a soft 18px ambient blur, used under most photo cards), `--shadow-lift` (deeper, on hover), `--shadow-stamp: 3px 4px 0 rgba(28,20,13,0.85)` (zero blur, hard offset, reads as a physically stamped rubber print — used only on the trust-seals badges).
- **Motion**: one easing curve, `--ease-out-soft: cubic-bezier(0.22, 0.61, 0.36, 1)`, reused everywhere something moves (nav underline, hover lift, dropdown reveal) so easing feels like one hand, not several.

## Components

**Buttons** (`.btn` + a modifier) — text-only, no icon, slim weight (400), tracked letter-spacing (`0.06em`), sharp corners (`--radius-control: 0`). `.btn-primary` is solid cherry with a white label, the only filled button in the system, reserved for the one action per screen that matters most (call, WhatsApp, reserve). `.btn-outline` is cherry text + cherry hairline on transparent, filling solid cherry on hover, used for secondary actions that still want visual weight (e.g. "הסיפור של מיקאסה"). `.btn-ghost-light` is the white-on-transparent variant for buttons sitting on a photo. `.btn-whatsapp` is the one deliberate brand-color exception in the whole system, WhatsApp's own green (`#25D366`), because a WhatsApp CTA that isn't WhatsApp-green reads as broken, not as on-brand.

**Cards** (`.card`) — white background, a 2px hairline border (`--color-line`), `--radius-card` (2px), `--shadow-card`. The border is load-bearing at this radius: with almost no rounding, a shadow alone reads as a rendering glitch rather than an edge, so every card gets a visible line first and a shadow second.

**Suite card** (`.suite-card`) — the site's signature component. Front face: a warm brown gradient scrim rising from the photo's foot, white caption. On hover/focus, the caption fades and a full-color overlay in that suite's own **variety color** (`--variety-color`, set inline per card to cherry or forest) rises with the suite name, a one-line description and a ghost "book" CTA. The two suite cards are deliberately not two copies of one template in different photos, forest and cherry each carry their own hover identity so a visitor learns to associate a color with a suite before they've read a word.

**Trust seals** (`.trust-seals`, `components/trust-seals.tsx`) — four honest, verifiable facts (years hosting, suite count, host count, "0 online bookings") rendered as stamped grade-seal badges (`.trust-seals__badge`: parchment fill, 3px double `currentColor` border, `--shadow-stamp` hard offset). This exists specifically *instead of* a testimonials carousel, see *Composition* below for why that swap is a content-integrity decision, not just a visual preference.

## Iconography — the official Mikasa icon style

Mikasa runs **two icon systems on purpose**, each with its own job. Mixing them into one set was tried and rejected: a UI chevron and a woodcut waterfall do not belong at the same weight.

| | **UI marks** | **Subject glyphs** |
|---|---|---|
| File | `components/icons.tsx` | `components/area-icons.tsx` |
| Source | hand-cut for Mikasa | [game-icons.net](https://game-icons.net), CC BY 3.0 |
| Form | open line strokes, `fill: none` | filled woodcut silhouettes |
| Grid | `0 0 24 24` | `0 0 512 512` |
| Used for | nav, chevrons, phone, WhatsApp, mail, gallery, suite variety marks | area categories, any future content taxonomy |

**Why not one general-purpose library for everything.** Lucide, Phosphor and Tabler were checked against the actual vocabulary this site needs and **none of them has grapes, a waterfall, or a horseshoe** — those sets are built for product dashboards. Forcing the categories into what they do carry (a wine glass for יקבים, a generic "activity" pictogram for ספורט אתגרי) is exactly how a site ends up looking templated. game-icons is a 4,000+ glyph illustrative set in a hand-drawn woodcut style: it covers the whole vocabulary, and its density reads as a printed crate stamp rather than as UI chrome.

**Attribution is not optional.** CC BY 3.0 requires visible credit. It lives in the footer bottom bar (`components/site-footer.tsx`) as "אייקונים: game-icons.net (CC BY 3.0)". Do not remove that line while these glyphs are in use.

**No icon package is installed.** The chosen paths are inlined into `area-icons.tsx` by hand, so the site ships zero icon dependency, nothing is tree-shaken wrong, and the glyph set stays under our own version control. Adding a seventh category means inlining a seventh path, not `npm install`.

### The UI mark spec (`components/icons.tsx`, the `base` object)

| Property | Value | Why |
|---|---|---|
| `viewBox` | `0 0 24 24` | One grid for the whole set, so marks stay optically equal at any size |
| `width` / `height` | `22` default | Overridden per call site (24 in area cards, 26 in nav) |
| `fill` | `none` | Line marks only, never filled silhouettes |
| `stroke` | `currentColor` | The icon takes its color from context; never hard-code a hex inside a glyph |
| `strokeWidth` | `2.2` | Deliberately heavier than any icon-library default; this is what makes it read as a stencil cut rather than a UI affordance |
| `strokeLinecap` / `strokeLinejoin` | `round` | Blunt, physically-cut ends, not razor points |
| `aria-hidden` | `true` | Icons are decorative; the adjacent Hebrew label carries the meaning |

**Rules for drawing a new UI mark**

1. **Single-stroke construction.** Open paths and plain circles. No filled shapes, no gradients, no two-tone. `WhatsAppIcon` is the one sanctioned exception, it uses `fill="currentColor"` and WhatsApp's own official path because a redrawn WhatsApp mark reads as broken, exactly like the `.btn-whatsapp` green exception.
2. **Three to six strokes.** More than that is too detailed for `strokeWidth: 2.2`; the strokes will collide at 22px. If a subject genuinely needs that much detail, it is a subject glyph, not a UI mark.
3. **Secondary detail may drop to `1.7`–`1.8`.** Only for small ornamental marks inside a glyph, never for the main silhouette.
4. **Export one named component per glyph**, with a one-line comment naming the Hebrew concept it serves.

### Choosing a subject glyph (`components/area-icons.tsx`)

1. **Draw the thing, not the category.** יקבים is a grape cluster, not a wine glass. ספורט אתגרי is a horseshoe, not a generic "activity" pictogram. The concrete object is what keeps the set from feeling like clip art.
2. **Local subject matter first.** Prefer something a visitor actually meets in the northern Golan (waterfall, snow-capped summits, grapes, spring water, horseshoe) over an abstract symbol.
3. **Stay inside game-icons.** A second illustrative source would break the drawing hand mid-grid. If game-icons genuinely lacks a subject, that is a design conversation, not a quiet substitution.
4. **Check it at 24px inside the stamp before committing.** Several game-icons glyphs carry an enclosing circle or heavy background detail that turns to mud at stamp size, which is why חרמון uses `summits` and not `mountains`.
5. **Normalize on inlining**: strip nothing but the color, keep `fill="currentColor"`, keep the native `512` viewBox, and name the export after the Hebrew concept, not after the game-icons filename.

### The stamp square — standard placement, two variants

Wherever an icon labels a content item, it sits centered in a square filled with a **variety color**, `--radius-card`, `--shadow-stamp`, glyph in white. This is a shared component, `components/icon-stamp.tsx` (`<IconStamp variant size>`), not a copy-pasted `style` block.

| Variant | Fill | Used by |
|---|---|---|
| `cherry` (default) | `--color-cherry` | Amenities grid, "מה מחכה לכם בסוויטה" |
| `forest` | `--color-forest` | Area categories, "מה תוכלו לעשות סביב מיקאסה" |

The two variants are the point, not decoration: the same treatment in the two suite variety colors lets consecutive sections read as distinct without inventing a second carrier shape. Icons used as pure UI (nav, chevrons, phone/WhatsApp rail) skip the square entirely and inherit `currentColor`.

**The set today**: `PhoneIcon`, `WhatsAppIcon`, `MenuIcon`, `CloseIcon`, `ChevronDownIcon`, `GalleryIcon`, `MailIcon`, plus `LeafIcon` and `DropletIcon` (suite variety marks, forest and rain) in `icons.tsx`; `TrailIcon` (waterfall), `VineIcon` (grapes), `SnowPeakIcon` (summits), `SpringIcon` (water-drop), `HorseshoeIcon`, `MassageIcon` (lotus-flower) in `area-icons.tsx`. Subject glyphs are bound to content through the `AreaCategoryIcon` key in `content/area.ts`, so a seventh category means picking a seventh glyph, never falling back to a default.

**Motifs** (reusable, cross-component):
- **`.stamp-badge`** — circular rubber-stamp badge, 2px `currentColor` border, slight rotation, inset parchment ring. Used for suite "variety" glyphs (hero, suite cards) and inside the trust-seals badges. Always given an explicit `background` (parchment) so its text/icon color has a guaranteed-AA surface, independent of whatever section background it sits on.
- **`.variety-tag`** — a physical luggage/crate-tag shape (notched point + punched hole via `clip-path`), icon + text inline. The point is fixed to the physical left edge regardless of RTL, because a tag has one real-world hinge side; this is one of the few places in the codebase that intentionally uses physical (not logical) CSS properties, and the comment in `globals.css` explains why.
- **`.corner-ribbon`** — a diagonal produce/quality-seal banner draped across a photo's top corner, replacing an earlier circular badge that read as a game-achievement icon rather than a crate mark.
- **`.crate-frame`** — a ruled double-line border (inner `border` + offset `outline`, both timber-colored) for photo frames and panels.
- **`.kraft-grain`** — a subtle diagonal repeating-gradient wood-grain texture for section bands, used sparingly so it stays texture, not noise.

## Composition

- **Hero**: full-bleed real photography (not split), a tilted kraft label card pinned over it like a tag stapled to a crate corner, giant stencil wordmark, harvest-seal badge row linking to both suites, CTA.
- **Suite cards**: each suite's own variety color drives its hover-overlay fill and corner stamp badge — the two cards are visually distinct, not two copies of one template in different photos.
- **Trust band**: replaced a testimonials carousel that displayed six placeholder reviews (`content/reviews.ts`, explicitly marked `pending: true`, never approved for real use) as if genuine — a P0 finding in the pre-redesign critique. Replaced with `TrustSeals` (`components/trust-seals.tsx`): four verified facts (17 years hosting, 2 suites, 1 host, 0 online bookings) as stamped grade seals. Zero invented quotes or reviewers.
- **Nav**: bold tracked links with a cherry underline tick (transform-based, not width-animated — a real performance finding from the design detector, fixed), kraft ticket-style dropdown panel instead of a soft white rounded box.
- **Icon rail**: cherry background (was near-black), white-on-hover invert preserved.
- **Logo**: gained a graphic mark — a rope-bordered circular seal with a leaf and droplet meeting at a shared stem ("two crops, one place"), paired with the bold wordmark. Previously text-only.

## What Was Preserved

Every product fact from `PRODUCT.md`: two suites, no online booking, no prices, real owner photography only (no stock), Hebrew RTL, the phone/WhatsApp conversion rail's functionality, all existing copy. The redesign replaced the visual system; it did not touch content, routes, or business logic.

## Open Items for a Future Pass

- `components/testimonials-carousel.tsx` and `content/reviews.ts` are unused but not deleted (kept in case real reviews arrive and a carousel is wanted again with genuine content).
- Legacy Almaris token *names* (`--color-cream`, `--color-gold`, etc., see the naming-decision callout above) could be renamed to their crate-label equivalents for clarity; purely cosmetic, zero visual effect either way.
- Gallery strip (`components/gallery-strip.tsx`) was left largely as-is — its neutral dark-overlay treatment already reads coherently in the new world and didn't carry an Almaris-specific look worth replacing.
- Headings still request `font-weight: 800`/`900` (see *Type*) even though Alef only ships 400/700; either accept 700 as the ceiling everywhere (drop the 800/900 rules) or reconsider a display face with a true heavy weight for the hero wordmark specifically.
