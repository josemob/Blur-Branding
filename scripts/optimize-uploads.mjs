// Optimiza las imágenes subidas desde el panel /admin (public/uploads): genera
// variantes WebP en public/media (640/1280/1920/2400, sin agrandar) y las
// registra en el manifiesto, así media() les da srcSet igual que al resto del sitio.
// Se ejecuta al inicio de `npm run build`; las ya procesadas se omiten.
import { readFile, writeFile, readdir, mkdir, access } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UPLOADS = join(ROOT, "public", "uploads");
const MEDIA = join(ROOT, "public", "media");
const MANIFEST = join(ROOT, "src", "data", "media-manifest.json");
const WIDTHS = [640, 1280, 1920, 2400];
const exists = (p) => access(p).then(() => true, () => false);

const files = (await exists(UPLOADS)) ? await readdir(UPLOADS) : [];
const images = files.filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
await mkdir(MEDIA, { recursive: true });

let done = 0;
for (const file of images) {
  const stem = file.slice(0, -extname(file).length);
  const prev = manifest.images[file];
  // Omitir si ya está en el manifiesto y sus variantes existen
  if (prev && (await Promise.all(prev.sizes.map((w) => exists(join(MEDIA, `${stem}-${w}.webp`))))).every(Boolean)) continue;

  const input = await readFile(join(UPLOADS, file));
  const meta = await sharp(input).rotate().metadata();
  const w = meta.autoOrient?.width ?? meta.width;
  const h = meta.autoOrient?.height ?? meta.height;
  const sizes = WIDTHS.filter((x) => x < w);
  sizes.push(Math.min(w, 2400));
  const unique = [...new Set(sizes)].sort((a, b) => a - b);
  for (const width of unique) {
    await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(join(MEDIA, `${stem}-${width}.webp`));
  }
  manifest.images[file] = { w, h, sizes: unique };
  done++;
  console.log(`✓ uploads/${file} → ${unique.join(", ")}`);
}

if (done) await writeFile(MANIFEST, JSON.stringify(manifest, null, 1) + "\n");
console.log(`Imágenes subidas: ${images.length} (${done} optimizadas ahora).`);
