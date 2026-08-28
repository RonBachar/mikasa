// Phase 1: cull + convert the raw image folder into optimized WebP under /public/images,
// renamed to English kebab-case, with Hebrew ALT text. next/image serves AVIF/WebP
// responsive variants at runtime, so we output a single high-quality WebP per image.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const RAW = path.resolve("_raw-images");
const OUT = path.resolve("public/images");
const IMG_RE = /\.(jpe?g|png|webp|avif)$/i;
const MAX_W = 1920;
const Q = 82;

function sortedList(dir) {
  return fs
    .readdirSync(path.join(RAW, dir), { withFileTypes: true })
    .filter((d) => d.isFile() && IMG_RE.test(d.name))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

// Resolve a source: either {dir, idx} (sorted index) or {file: "Folder/name.jpg"}.
function srcPath(e) {
  if (e.file) return path.join(RAW, e.file);
  const list = sortedList(e.dir);
  return path.join(RAW, e.dir, list[e.idx]);
}

// ---- MANIFEST (source of truth) ----------------------------------------
// folder = output subfolder under /public/images ; name = new kebab-case basename
const M = [];
const add = (folder, name, alt, src, extra = {}) =>
  M.push({ folder, name, alt, src, ...extra });

// FOREST SUITE (dir "יער", sorted idx)
const forest = [
  ["forest-suite-jacuzzi-01", "ג'קוזי זוגי פרטי עם תאורה רומנטית וקיר לבנים בסוויטת יער, צימר מיקאסה בשעל שברמת הגולן"],
  ["forest-suite-jacuzzi-02", "ג'קוזי מבעבע במים בתאורה כחולה עם זר ורדים אדומים בסוויטת יער במיקאסה"],
  ["forest-suite-bedroom-01", "מיטה זוגית ופינת ישיבה עם תקרת עץ בסוויטת יער, צימר זוגי במיקאסה שעל"],
  ["forest-suite-seating-01", "מיטה זוגית ופינת ישיבה עם כורסאות ראטן בסוויטת יער במיקאסה"],
  ["forest-suite-kitchenette-01", "מטבחון מאובזר עם קומקום ומיקרוגל בסוויטת יער, צימר מיקאסה ברמת הגולן"],
  ["forest-suite-jacuzzi-03", "ג'קוזי זוגי בתאורה כחולה מול קיר לבנים חשוף בסוויטת יער במיקאסה"],
  ["forest-suite-lounge-01", "פינת ישיבה עם כורסאות ראטן ושולחן בסוויטת יער, אירוח זוגי במיקאסה שעל"],
  ["forest-suite-living-01", "פינת מגורים עם טלוויזיה וישיבה נוחה בסוויטת יער במיקאסה"],
  ["forest-suite-bedroom-02", "מיטה זוגית מול טלוויזיה בסוויטת יער, צימר בוטיק במיקאסה שעל"],
  ["forest-suite-bathroom-01", "חדר רחצה עם ג'קוזי ומקלחון בסוויטת יער, צימר עם ג'קוזי בגולן"],
  ["forest-suite-bedroom-03", "מיטה זוגית מוצעת בלבן עם מנורת לילה חמה בסוויטת יער במיקאסה"],
  ["forest-suite-bedroom-04", "מיטה זוגית ופינת ישיבה מוארת בסוויטת יער, צימר רומנטי בגולן"],
  ["forest-suite-coffee-01", "מכונת קפה וצלחת עוגיות לאורחים בסוויטת יער, אירוח אישי במיקאסה"],
  ["forest-suite-jacuzzi-04", "פינת ג'קוזי עם כיור ומראה בסוויטת יער, צימר מיקאסה בשעל"],
  ["forest-suite-jacuzzi-05", "פינת ג'קוזי ומקלחון בסוויטת יער במיקאסה שברמת הגולן"],
  ["forest-suite-interior-01", "מבט רחב על המיטה ופינת המגורים בסוויטת יער, צימר זוגי במיקאסה"],
  ["forest-suite-interior-02", "מבט רחב על המיטה ופינת הישיבה בסוויטת יער במיקאסה שעל"],
  ["forest-suite-jacuzzi-romantic", "ג'קוזי זוגי עם מים כחולים וזר ורדים אדומים, פינוק רומנטי בסוויטת יער במיקאסה"],
  ["forest-suite-balcony-01", "מרפסת פרטית עם פינת ישיבה ונוף ירוק בסוויטת יער, צימר בגולן"],
  ["forest-suite-balcony-02", "מרפסת עם כיסאות ונוף פתוח אל הגולן בסוויטת יער במיקאסה"],
];
forest.forEach(([name, alt], idx) => add("forest-suite", name, alt, { dir: "יער", idx }));

// RAIN SUITE (dir "גשם", sorted idx)
const rain = [
  ["rain-suite-living-01", "פינת מגורים עם ספה אדומה ומיטה זוגית בסוויטת גשם, צימר מיקאסה ברמת הגולן"],
  ["rain-suite-interior-01", "מבט רחב על המיטה, פינת הישיבה והמטבחון בסוויטת גשם במיקאסה"],
  ["rain-suite-jacuzzi-01", "ג'קוזי זוגי בתאורה כחולה מול קיר אבן בסוויטת גשם, צימר עם ג'קוזי בגולן"],
  ["rain-suite-jacuzzi-02", "ג'קוזי זוגי לבן עם מים כחולים וחיפוי אבן בסוויטת גשם במיקאסה"],
  ["rain-suite-bedroom-01", "מיטה זוגית עם מטבחון ברקע בסוויטת גשם, צימר זוגי במיקאסה שעל"],
  ["rain-suite-seating-01", "פינת ישיבה עם כריות אדומות וטלוויזיה בסוויטת גשם במיקאסה"],
  ["rain-suite-kitchenette-01", "מטבחון מאובזר עם כיור ומיקרוגל בסוויטת גשם, אירוח כפרי בגולן"],
  ["rain-suite-bedroom-02", "מיטה זוגית מוצעת בלבן עם תאורה חמה בסוויטת גשם במיקאסה"],
  ["rain-suite-bathroom-01", "חדר רחצה עם כיור, מראה וחיפוי אבן בסוויטת גשם, צימר מיקאסה בשעל"],
  ["rain-suite-stone-sink", "כיור אבן מעוצב עם מגבות ופרחים בסוויטת גשם במיקאסה"],
  ["rain-suite-bathroom-02", "מקלחת ושירותים בחדר הרחצה של סוויטת גשם, צימר בצפון הגולן"],
  ["rain-suite-bed-01", "ראש מיטה זוגית מעוצב עם שתי מנורות לילה בסוויטת גשם במיקאסה"],
  ["rain-suite-bed-02", "מיטה זוגית רכה בתאורת לילה חמה בסוויטת גשם, צימר רומנטי לזוג בגולן"],
  ["rain-suite-jacuzzi-03", "פינת ג'קוזי זוגי עם צמח ירוק בסוויטת גשם במיקאסה"],
  ["rain-suite-interior-02", "מיטה זוגית וג'קוזי באותו חלל בסוויטת גשם, צימר זוגי במיקאסה שעל"],
  ["rain-suite-balcony-01", "מרפסת עם שולחן וכיסאות ונוף אל הגולן בסוויטת גשם במיקאסה"],
  ["rain-suite-balcony-02", "מרפסת עם ארוחת בוקר ונוף פתוח בסוויטת גשם, אירוח כפרי ברמת הגולן"],
];
rain.forEach(([name, alt], idx) => add("rain-suite", name, alt, { dir: "גשם", idx }));

// SUITE TEASERS (root loose files)
add("forest-suite", "forest-suite-hero", "מבט אל המיטה ופינת המגורים בסוויטת יער, צימר זוגי כפרי במיקאסה שעל", { dir: ".", idx: 4 });
add("rain-suite", "rain-suite-hero", "מבט אל פינת המגורים והמיטה בסוויטת גשם, צימר זוגי מפנק במיקאסה", { dir: ".", idx: 2 });

// EXTERIOR / GARDEN
add("exterior", "exterior-building-01", "מבנה צימר מיקאסה עם גינה פורחת במושב שעל שברמת הגולן", { dir: ".", idx: 0 });
add("exterior", "exterior-garden-path-01", "שביל אבן ומדרגות בגינה הפורחת של צימר מיקאסה בשעל", { dir: ".", idx: 1 });
add("exterior", "exterior-patio-01", "פינת ישיבה עם כיסא נדנדה תלוי במרפסת העץ בגינת מיקאסה", { dir: ".", idx: 3 });
add("exterior", "exterior-entrance-01", "פינת כניסה עם כיסאות ראטן ופרחים בצימר מיקאסה", { dir: ".", idx: 5 });
add("exterior", "exterior-garden-hero", "גינה ירוקה עם שביל אבן, פרחים וצמחייה עשירה בצימר מיקאסה ברמת הגולן", { file: "Hero/Hero-01.jpg" });
add("exterior", "exterior-sign-mikasa", "שלט צימר מיקאסה בין פרחים אדומים וצמחיית טיפוס, מושב שעל", { file: "About/About-01.jpg" });
add("exterior", "exterior-garden-lawn-01", "מדשאה ירוקה ופינות ישיבה בגינת צימר מיקאסה בשעל", { file: "Gallery/gallery-01.jpg" });
add("exterior", "exterior-garden-hammock-hero", "ערסל לבן על רקע מדשאה וגינה פורחת בצימר מיקאסה", { file: "Gallery/gallery-02.jpg" });
add("exterior", "exterior-garden-path-03", "שביל אבן בין צמחייה עשירה וכדי חרס בגינת מיקאסה בשעל", { file: "Gallery/gallery-03.jpg" });
add("exterior", "amenity-breakfast-01", "ארוחת בוקר עשירה עם ביצים, לחם, סלט ומיץ תפוזים בצימר מיקאסה", { file: "Breakfast/breakfast-01.jpg" });

// GARDEN (dir "Garden", numeric; keep curated idx)
const garden = {
  2: ["exterior-garden-building", "מבנה הצימר משקיף על גינה מטופחת עם פרחים בצימר מיקאסה"],
  3: ["exterior-garden-lawn-02", "מדשאה ירוקה ועצים בגינת צימר מיקאסה בשעל"],
  4: ["exterior-garden-hammock-01", "ערסל תלוי בין עצים בגינה הפורחת של מיקאסה ברמת הגולן"],
  6: ["exterior-garden-path-02", "שביל אבן בין ערוגות פרחים וכדי חרס בגינת מיקאסה"],
  7: ["exterior-sign-mikasa-ivy", "שלט צימר מיקאסה משובץ בקיר צמחייה ופרחים אדומים"],
  10: ["exterior-garden-egg-chair-01", "כיסא ביצה תלוי על דק עץ בגינת צימר מיקאסה"],
  12: ["exterior-garden-hammock-02", "ערסל ושולחן פיקניק בגינה ירוקה בצימר מיקאסה בשעל"],
  15: ["exterior-garden-deck-lounge", "דק עץ עם פינת ישיבה נינוחה בגינת מיקאסה, אירוח כפרי בגולן"],
  18: ["exterior-sign-rural", "שלט כפרי חם בגינת צימר מיקאסה שעל"],
  19: ["exterior-garden-flowers-01", "פריחה סגולה עשירה בגינת צימר מיקאסה ברמת הגולן"],
  21: ["exterior-garden-bench", "ספסל עץ בפינה מוצלת בגינת צימר מיקאסה"],
  22: ["exterior-garden-hammock-03", "ערסל פרוש על רקע גינה ירוקה בצימר מיקאסה"],
  23: ["exterior-garden-flowers-02", "עציץ פרחים תלוי בגינת צימר מיקאסה בשעל"],
  29: ["exterior-garden-dining", "פינת אוכל מוצלת עם שמשייה בגינת צימר מיקאסה"],
  32: ["exterior-garden-flower-path", "שביל בין ערוגות פרחים צבעוניות בגינת מיקאסה"],
  33: ["exterior-garden-path-building", "שביל אבן מוביל אל מבנה הצימר בגינת מיקאסה ברמת הגולן"],
};
for (const [idx, [name, alt]] of Object.entries(garden))
  add("exterior", name, alt, { dir: "Garden", idx: Number(idx) });

// VIEWS
add("views", "view-golan-valley", "נוף מרחבי הגולן הירוקים סביב מושב שעל, אזור צימר מיקאסה", { file: "About/About-02.jpg" });
add("views", "view-waterfall-saar", "מפל ובריכה טבעית בנחל סמוך למיקאסה ברמת הגולן", { dir: ".", idx: 6 });

// AREA / ATTRACTIONS (dir "אטרקציות") — LICENSE TBD (likely stock, owner must confirm rights)
const area = {
  0: ["area-ancient-synagogue", "בית כנסת עתיק ברמת הגולן, אתר מורשת סמוך למיקאסה"],
  5: ["area-mount-hermon", "הר החרמון המושלג משקיף על רמת הגולן"],
  6: ["area-horse-riding", "רכיבת סוסים בנחל באזור רמת הגולן"],
  11: ["area-cherry-orchard", "מטע דובדבנים ותפוחים בפריחה ורודה ברמת הגולן"],
  12: ["area-saar-waterfall", "מפל סער הזורם בין סלעי בזלת ברמת הגולן"],
  13: ["area-nimrod-fortress", "מצודת נמרוד על רכס בצפון רמת הגולן"],
  16: ["area-natural-pool", "בריכה טבעית ומפל מים באזור נחל סער"],
  17: ["area-mount-bental", "תצפית הר בנטל אל מרחבי רמת הגולן"],
  20: ["area-gamla", "שמורת גמלא והקניון הירוק ברמת הגולן"],
  21: ["area-hexagon-pool", "בריכת המשושים ועמודי הבזלת ברמת הגולן"],
};
for (const [idx, [name, alt]] of Object.entries(area))
  add("area", name, alt, { dir: "אטרקציות", idx: Number(idx) }, { license: "TBD" });

// PACKAGES — the four add-on cards on the homepage strip and /prices.
// Owner-supplied 2026-08-28. Named after the package slug in
// content/pricing.ts so the mapping in components/special-offers.tsx is
// obvious rather than a lookup you have to trust.
//
// NOTE: these are stock/licensed photos, not shot at Mikasa (the ALT text is
// written accordingly — it describes what is in the frame and does not claim
// the photo was taken at the guesthouse).
const packages = [
  [
    "Packages/breakfast.jpg",
    "package-breakfast",
    "ארוחת בוקר כפרית עשירה עם ביצי עין, לחם כפרי אפוי וקפה, מוגשת לזוג",
  ],
  [
    "Packages/birthday.jpg",
    "package-birthday",
    "עוגת יום הולדת עם נרות דולקים ובלונים צבעוניים, חבילת יום הולדת לזוגות",
  ],
  [
    "Packages/anniversary.jpg",
    "package-anniversary",
    "זוג מרים כוסות יין לבן לחיים לצד זר טוליפים ורודים, חבילת יום נישואין ורומנטיקה",
  ],
  [
    "Packages/massage.jpg",
    "package-massage",
    "מטפלת מעסה גב בעיסוי מרגיע באור טבעי, חבילת עיסוי זוגי בסוויטה",
  ],
];
packages.forEach(([file, name, alt]) =>
  add("packages", name, alt, { file }, { license: "stock" })
);

// ---- CONVERT -----------------------------------------------------------
const rows = [];
let ok = 0,
  fail = 0;
for (const e of M) {
  const src = srcPath(e.src);
  const outDir = path.join(OUT, e.folder);
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${e.name}.webp`);
  try {
    const meta = await sharp(src).metadata();
    const img = sharp(src).rotate();
    if (meta.width > MAX_W) img.resize({ width: MAX_W });
    const info = await img.webp({ quality: Q, effort: 5 }).toFile(outFile);
    rows.push({
      file: `${e.folder}/${e.name}.webp`,
      folder: e.folder,
      alt: e.alt,
      w: info.width,
      h: info.height,
      kb: Math.round(info.size / 1024),
      src: path.relative(RAW, src).replace(/\\/g, "/"),
      license: e.license || "own",
    });
    ok++;
  } catch (err) {
    console.error("FAIL", e.name, err.message);
    fail++;
  }
}

// image-alts.ts (keyed by "folder/name.webp")
const altLines = rows
  .map((r) => `  ${JSON.stringify(r.file)}: ${JSON.stringify(r.alt)},`)
  .join("\n");
const altTs = `// AUTO-GENERATED by scripts/convert-images.mjs. Hebrew ALT text keyed by image path.
export const imageAlts: Record<string, string> = {
${altLines}
};

export function altFor(file: string): string {
  return imageAlts[file] ?? "";
}
`;
fs.mkdirSync(path.resolve("content"), { recursive: true });
fs.writeFileSync(path.resolve("content/image-alts.ts"), altTs);

fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(rows, null, 2));
console.log(`\nConverted ${ok} images (${fail} failed) across ${new Set(rows.map((r) => r.folder)).size} folders.`);
const byFolder = {};
for (const r of rows) byFolder[r.folder] = (byFolder[r.folder] || 0) + 1;
console.log(byFolder);
const totalKb = rows.reduce((a, r) => a + r.kb, 0);
console.log(`Total output size: ${(totalKb / 1024).toFixed(1)} MB`);
