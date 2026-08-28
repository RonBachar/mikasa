import manifest from "@/public/images/manifest.json";

export type ImgMeta = {
  src: string;
  width: number;
  height: number;
  alt: string;
  file: string;
  /** Tiny inline preview, where the manifest carries one. See `blur` below. */
  blurDataURL?: string;
};

/**
 * `blur` is a ~100-byte 12px-wide WebP data URI baked into the manifest, so
 * next/image can paint something in the card's slot immediately instead of
 * leaving a hole while the real file downloads. Optional: only images
 * processed since it was introduced carry one, and `Img` simply skips the
 * placeholder for the rest.
 */
const rows = manifest as {
  file: string;
  folder: string;
  alt: string;
  w: number;
  h: number;
  blur?: string;
}[];

const byFile = new Map<string, ImgMeta>(
  rows.map((r) => [
    r.file,
    {
      src: `/images/${r.file}`,
      width: r.w,
      height: r.h,
      alt: r.alt,
      file: r.file,
      blurDataURL: r.blur,
    },
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
