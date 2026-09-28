// Descarga las imágenes y videos del CDN de Framer a public/media y genera
// versiones WebP responsivas (640 / 1280 / 1920px, sin agrandar las pequeñas).
// Uso: node scripts/fetch-media.mjs   (idempotente: salta lo ya descargado)
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "media");
const MANIFEST = join(ROOT, "src", "data", "media-manifest.json");
const SOURCES = ["src/data/site.ts", "src/data/projects.ts", "src/pages/Home.tsx"];
const WIDTHS = [640, 1280, 1920];
const CDN = "https://framerusercontent.com";

const exists = (p) => access(p).then(() => true, () => false);

async function collect() {
  const images = new Set();
  const videos = new Set();
  for (const f of SOURCES) {
    const src = await readFile(join(ROOT, f), "utf8");
    for (const m of src.matchAll(/([A-Za-z0-9]{12,}\.(?:png|jpe?g))/g)) images.add(m[1]);
    // Los videos de /assets/ se escriben con esa ruta literal; el resto vive en /images/.
    for (const m of src.matchAll(/([A-Za-z0-9]{12,}\.mp4)/g)) {
      videos.add(src.includes(`assets/${m[1]}`) ? `assets/${m[1]}` : `images/${m[1]}`);
    }
  }
  return { images: [...images], videos: [...videos] };
}

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const { images, videos } = await collect();
  const manifest = { images: {}, videos: [] };
  let bytesIn = 0;
  let bytesOut = 0;

  // Concurrencia limitada para no saturar el CDN.
  const queue = [...images];
  const worker = async () => {
    while (queue.length) {
      const file = queue.shift();
      const stem = file.replace(/\.[a-z]+$/, "");
      try {
        const buf = await download(`${CDN}/images/${file}`);
        bytesIn += buf.length;
        const meta = await sharp(buf).metadata();
        const sizes = WIDTHS.filter((w) => w < meta.width);
        sizes.push(Math.min(meta.width, 2400)); // tamaño máximo (o el original si es menor)
        const uniq = [...new Set(sizes)].sort((a, b) => a - b);
        for (const w of uniq) {
          const out = join(OUT, `${stem}-${w}.webp`);
          if (!(await exists(out))) {
            await sharp(buf).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(out);
          }
          bytesOut += (await readFile(out)).length;
        }
        manifest.images[file] = { w: meta.width, h: meta.height, sizes: uniq };
        process.stdout.write(`img  ${file} ${meta.width}x${meta.height} -> ${uniq.join("/")}\n`);
      } catch (e) {
        process.stdout.write(`FAIL ${file}: ${e.message}\n`);
      }
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));

  for (const v of videos) {
    const name = v.split("/").pop();
    const out = join(OUT, name);
    try {
      if (!(await exists(out))) await writeFile(out, await download(`${CDN}/${v}`));
      manifest.videos.push(name);
      process.stdout.write(`vid  ${name} ${((await readFile(out)).length / 1e6).toFixed(1)} MB\n`);
    } catch (e) {
      process.stdout.write(`FAIL ${v}: ${e.message}\n`);
    }
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 1));
  console.log(
    `\n${Object.keys(manifest.images).length} imágenes, ${manifest.videos.length} videos. ` +
      `Originales ${(bytesIn / 1e6).toFixed(1)} MB -> WebP (todas las variantes) ${(bytesOut / 1e6).toFixed(1)} MB`
  );
}

main();
