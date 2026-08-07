import manifest from "@/public/images/manifest.json";

export type ImgMeta = {
  src: string;
  width: number;
  height: number;
  alt: string;
  file: string;
};

const rows = manifest as { file: string; folder: string; alt: string; w: number; h: number }[];

const byFile = new Map<string, ImgMeta>(
  rows.map((r) => [
    r.file,
    { src: `/images/${r.file}`, width: r.w, height: r.h, alt: r.alt, file: r.file },
  ])
);

/** Look up a processed image by "folder/name.webp". Falls back gracefully. */
export function img(file: string): ImgMeta {
  return (
    byFile.get(file) ?? {
      src: `/images/${file}`,
      width: 1600,
      height: 1067,
      alt: "",
      file,
    }
  );
}

/** All images in a folder (e.g. "forest-suite"), in manifest order. */
export function imagesIn(folder: string, exclude: string[] = []): ImgMeta[] {
  return rows
    .filter((r) => r.folder === folder && !exclude.includes(r.file))
    .map((r) => byFile.get(r.file)!);
}
