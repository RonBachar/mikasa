// Build numbered contact-sheet montages so images can be reviewed in bulk.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const RAW = path.resolve("_raw-images");
const OUT = path.resolve(process.argv[2] || "scratch-sheets");
fs.mkdirSync(OUT, { recursive: true });

const IMG_RE = /\.(jpe?g|png|webp|avif)$/i;
const CELL_W = 300;
const CELL_H = 220;
const COLS = 5;
const PAD = 8;

function listImages(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && IMG_RE.test(d.name))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

// Recursively collect folders that directly contain images.
function collectFolders(dir, acc = []) {
  const imgs = listImages(dir);
  if (imgs.length) acc.push({ dir, imgs });
  for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
    if (d.isDirectory()) collectFolders(path.join(dir, d.name), acc);
  }
  return acc;
}

function labelSvg(text, w) {
  const safe = text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return Buffer.from(
    `<svg width="${w}" height="22"><rect width="${w}" height="22" fill="black" opacity="0.6"/><text x="4" y="16" font-family="monospace" font-size="14" fill="white">${safe}</text></svg>`
  );
}

async function buildSheet(name, dir, imgs) {
  const rows = Math.ceil(imgs.length / COLS);
  const W = COLS * (CELL_W + PAD) + PAD;
  const H = rows * (CELL_H + PAD) + PAD;
  const composites = [];
  const mapping = [];

  for (let i = 0; i < imgs.length; i++) {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = PAD + col * (CELL_W + PAD);
    const y = PAD + row * (CELL_H + PAD);
    const file = path.join(dir, imgs[i]);
    mapping.push({ idx: i, file: path.relative(RAW, file).replace(/\\/g, "/") });
    try {
      const thumb = await sharp(file)
        .resize(CELL_W, CELL_H - 22, { fit: "cover" })
        .toBuffer();
      composites.push({ input: thumb, left: x, top: y });
      composites.push({ input: labelSvg(`${i}`, CELL_W), left: x, top: y + CELL_H - 22 });
    } catch (e) {
      composites.push({ input: labelSvg(`${i} ERR ${imgs[i]}`, CELL_W), left: x, top: y });
    }
  }

  const outFile = path.join(OUT, `${name}.png`);
  await sharp({
    create: { width: W, height: H, channels: 3, background: "#dddddd" },
  })
    .composite(composites)
    .png({ quality: 70, compressionLevel: 9 })
    .toFile(outFile);

  return { name, dir: path.relative(RAW, dir) || ".", count: imgs.length, outFile, mapping };
}

const folders = collectFolders(RAW);
const report = [];
let sheetNo = 0;
for (const { dir, imgs } of folders) {
  const rel = path.relative(RAW, dir) || "root";
  const ascii = rel.replace(/[\\/]/g, "_").replace(/[^\w\-]/g, "");
  const name = `${String(sheetNo++).padStart(2, "0")}-${ascii || "heb"}`;
  const res = await buildSheet(name, dir, imgs);
  report.push(res);
  console.log(`\n=== ${res.name}  (dir: ${res.dir}, ${res.count} imgs) -> ${path.basename(res.outFile)}`);
  for (const m of res.mapping) console.log(`  [${m.idx}] ${m.file}`);
}
fs.writeFileSync(path.join(OUT, "mapping.json"), JSON.stringify(report, null, 2));
console.log(`\nWrote ${report.length} sheets to ${OUT}`);
