import manifest from "../data/media-manifest.json";

type Entry = { w: number; h: number; sizes: number[] };
const images = manifest.images as Record<string, Entry>;
const videos = new Set(manifest.videos as string[]);

const fileOf = (url: string) => url.split("/").pop()!.split("?")[0];

export type Responsive = {
  src: string;
  srcSet?: string;
  width?: number;
  height?: number;
};

/**
 * Convierte una URL de framerusercontent en la versión local optimizada (WebP)
 * con srcSet. Si la imagen no está en el manifiesto, devuelve la URL original.
 */
export function media(url: string): Responsive {
  const file = fileOf(url);
  const e = images[file];
  if (!e) return { src: url };
  const stem = file.replace(/\.[a-z]+$/i, "");
  const at = (w: number) => `/media/${stem}-${w}.webp`;
  // src por defecto: la variante <= 1280 (buen equilibrio para navegadores sin srcset)
  const fallback = [...e.sizes].reverse().find((w) => w <= 1280) ?? e.sizes[0];
  return {
    src: at(fallback),
    srcSet: e.sizes.map((w) => `${at(w)} ${w}w`).join(", "),
    width: e.w,
    height: e.h,
  };
}

/** Video local si fue descargado; si no, la URL original del CDN. */
export function mediaVideo(url: string) {
  const file = fileOf(url);
  return videos.has(file) ? `/media/${file}` : url;
}

/** Ruta absoluta de la variante más grande (para Open Graph / JSON-LD). */
export function mediaLargest(url: string) {
  const file = fileOf(url);
  const e = images[file];
  if (!e) return url;
  return `/media/${file.replace(/\.[a-z]+$/i, "")}-${e.sizes[e.sizes.length - 1]}.webp`;
}

/** Valores `sizes` frecuentes. */
export const SIZES = {
  full: "100vw",
  half: "(min-width: 1024px) 50vw, 100vw",
  third: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  card: "(min-width: 768px) 50vw, 100vw",
  thumb: "(min-width: 1024px) 15vw, 33vw",
  avatar: "44px",
};
