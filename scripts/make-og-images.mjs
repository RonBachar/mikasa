/**
 * Builds the Open Graph share cards in public/og/.
 *
 * JPEG, not WebP, and 1200x630 exactly. The site's own images are WebP and
 * arbitrary aspect ratios, which is right for the page and wrong for a share
 * card: WhatsApp — where most of these links get pasted — renders JPEG
 * reliably and WebP inconsistently, and a card that is not 1.91:1 gets
 * cropped by whichever platform is displaying it rather than by us.
 *
 * Re-run after replacing any source photo:
 *   node scripts/make-og-images.mjs
 */
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public", "images");
const OUT = path.join(ROOT, "public", "og");

/** Which photo represents which share context. */
// Keep in step with OgCard in lib/seo.ts — a name there with no card here
// ships a 404 to every social preview, and a card here with no name there is
// dead weight. Each page's card is a crop of that page's own hero, so a link
// pasted into WhatsApp shows what the page is about rather than the patio.
const CARDS = [
  { name: "default", from: "exterior/exterior-patio-01.webp" },
  { name: "forest", from: "forest-suite/forest-suite-hero.webp" },
  { name: "rain", from: "rain-suite/rain-suite-hero.webp" },
  { name: "prices", from: "exterior/exterior-garden-hammock-hero.webp" },
  { name: "area", from: "views/view-waterfall-saar.webp" },
  { name: "journal", from: "exterior/exterior-garden-path-01.webp" },
  {
    name: "journal-couples-weekend-golan",
    from: "exterior/exterior-garden-hammock-hero.webp",
  },
  { name: "journal-hermon-snow-season", from: "views/view-golan-valley.webp" },
  {
    name: "journal-saar-waterfall-water-trails",
    from: "views/view-waterfall-saar.webp",
  },
];

await mkdir(OUT, { recursive: true });

for (const card of CARDS) {
  const out = path.join(OUT, `${card.name}.jpg`);
  await sharp(path.join(SRC, card.from))
    // `cover` + `attention` crops toward the busiest region rather than the
    // geometric centre, which keeps the subject in frame on photos where it
    // sits off-centre.
    .resize(1200, 630, { fit: "cover", position: sharp.strategy.attention })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(out);

  const { size } = await stat(out);
  console.log(`${card.name}.jpg  <-  ${card.from}  (${Math.round(size / 1024)} KB)`);
}

console.log(`\n${CARDS.length} cards written to public/og/`);
