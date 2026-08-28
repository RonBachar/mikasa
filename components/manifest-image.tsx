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
  priority = false,
  className,
  width,
}: {
  file: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
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
        priority={priority}
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
      priority={priority}
      className={className}
      {...blur}
    />
  );
}
