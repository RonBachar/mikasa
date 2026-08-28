import Image from "next/image";
import { img } from "@/lib/images";

/**
 * Renders a processed /public/images file with its manifest dimensions + Hebrew ALT.
 * Use `fill` inside a positioned, sized container; otherwise pass explicit width.
 */
export function Img({
  file,
  fill = false,
  sizes,
  preload = false,
  className,
  width,
}: {
  file: string;
  fill?: boolean;
  sizes?: string;
  /**
   * Emits a <link rel="preload"> for this image so the browser starts it from
   * the head instead of waiting to parse it out of the body. Set it on the one
   * image that is the page's LCP element and nothing else.
   *
   * This replaces `priority`, which Next 16 deprecated. The rename is not
   * cosmetic: `priority` had become a no-op here, so every hero on the site
   * was loading at default priority with no preload hint, and PageSpeed
   * measured the home page's LCP at 3.5s on mobile because of it.
   */
  preload?: boolean;
  className?: string;
  width?: number;
}) {
  const m = img(file);
  // Only images whose manifest row carries a baked blur get a placeholder;
  // passing placeholder="blur" without a blurDataURL throws in next/image.
  const blur = m.blurDataURL
    ? ({ placeholder: "blur", blurDataURL: m.blurDataURL } as const)
    : {};
  if (fill) {
    return (
      <Image
        src={m.src}
        alt={m.alt}
        fill
        sizes={sizes ?? "100vw"}
        preload={preload}
        className={className}
        {...blur}
      />
    );
  }
  const w = width ?? m.width;
  const h = Math.round((m.height / m.width) * w);
  return (
    <Image
      src={m.src}
      alt={m.alt}
      width={w}
      height={h}
      sizes={sizes}
      preload={preload}
      className={className}
      {...blur}
    />
  );
}
