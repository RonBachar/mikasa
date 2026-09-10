/**
 * Bakes a tiny blur placeholder into every row of public/images/manifest.json.
 *
 * Why: next/image only paints a placeholder when it is handed a `blurDataURL`,
 * and components/manifest-image.tsx skips the placeholder for any row that has
 * no `blur` (passing placeholder="blur" without one throws). Four of the 72
 * images carried a blur and 68 did not, so most of the site left a hole in the
 * layout until the real file arrived — most visibly on the journal cards and
 * the /area hero.
 *
 * The placeholder is a 12px-wide WebP, base64'd into the manifest. At that
 * size each one costs a few hundred bytes, which is the point: it ships inside
 * the HTML and paints on first render, with no extra request.
 *
 * Idempotent. Re-run it after scripts/convert-images.mjs adds new photos;
 * rows that already carry a blur are left alone unless --force is passed.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMAGES = path.join(ROOT, "public", "images");
const MANIFEST = path.join(IMAGES, "manifest.json");

const force = process.argv.includes("--force");

const rows = JSON.parse(await readFile(MANIFEST, "utf8"));

let written = 0;
let skipped = 0;
const failed = [];

for (const row of rows) {
  if (row.blur && !force) {
    skipped++;
    continue;
  }

  const file = path.join(IMAGES, row.file);
  try {
    const buf = await sharp(file)
      .resize(12, null, { fit: "inside" })
      // Quality is deliberately low: this image is never seen sharp, it is
      // seen blurred and for a few hundred milliseconds. Bytes matter more
      // than fidelity because every one of them ships in the HTML.
      .webp({ quality: 35 })
      .toBuffer();

    row.blur = `data:image/webp;base64,${buf.toString("base64")}`;
    written++;
  } catch (err) {
    failed.push(`${row.file}: ${err.message}`);
  }
}

await writeFile(MANIFEST, `${JSON.stringify(rows, null, 2)}\n`, "utf8");

const bytes = rows.reduce((n, r) => n + (r.blur?.length ?? 0), 0);
console.log(
  `blur: ${written} written, ${skipped} already had one, ${failed.length} failed`
);
console.log(
  `total placeholder payload: ${(bytes / 1024).toFixed(1)} KB across ${rows.length} images`
);
for (const f of failed) console.error(`  ! ${f}`);
