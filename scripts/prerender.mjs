// Genera HTML estático por ruta (SEO) a partir del build de cliente (dist/) y del
// build SSR (dist-ssr/entry-server.js). Además: imágenes Open Graph, sitemap,
// robots.txt, 404.html y app.html (shell SPA sin prerender, para rewrites).
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const ssr = await import(pathToFileURL(join(ROOT, "dist-ssr", "entry-server.js")).href);
const { render, getSeo, ROUTES, SITE_URL, ROBOTS_INDEX, mediaLargest } = ssr;

const template = await readFile(join(DIST, "index.html"), "utf8");
const exists = (p) => access(p).then(() => true, () => false);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// En Windows, las carpetas que terminan en "." (dos slugs del sitio) necesitan el prefijo \\?\.
const fsPath = (p) => (process.platform === "win32" && /\.[\\/]|\.$/.test(p) ? `\\\\?\\${p}` : p);

/** Imagen Open Graph 1200x630 JPG (formato más compatible con WhatsApp/Facebook/LinkedIn). */
const ogCache = new Map();
async function ogImage(src, key) {
  if (ogCache.has(src)) return ogCache.get(src);
  const local = mediaLargest(src); // "/media/xxx-1920.webp" o URL original
  const out = `/og/${key}.jpg`;
  try {
    const input = local.startsWith("/") ? await readFile(join(DIST, local)) : Buffer.from(await (await fetch(local)).arrayBuffer());
    await mkdir(join(DIST, "og"), { recursive: true });
    await sharp(input).resize(1200, 630, { fit: "cover", position: "attention" }).jpeg({ quality: 82, mozjpeg: true }).toFile(join(DIST, out));
  } catch (e) {
    console.warn(`OG falló para ${src}: ${e.message}`);
    ogCache.set(src, null);
    return null;
  }
  ogCache.set(src, out);
  return out;
}

const keyFor = (path) =>
  path === "/"
    ? "home"
    : path.replace(/^\//, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/gi, "-").slice(0, 60).replace(/-$/, "") +
      "-" + createHash("md5").update(path).digest("hex").slice(0, 6);

async function headFor(seo) {
  const url = `${SITE_URL}${encodeURI(seo.path)}`;
  const og = await ogImage(seo.image, keyFor(seo.path));
  const ogUrl = og ? `${SITE_URL}${og}` : null;
  return [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="${seo.noindex ? "noindex" : ROBOTS_INDEX}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    `<meta property="og:site_name" content="BLUR Branding Studio" />`,
    `<meta property="og:locale" content="es_VE" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    ogUrl && `<meta property="og:image" content="${esc(ogUrl)}" />`,
    ogUrl && `<meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    ogUrl && `<meta name="twitter:image" content="${esc(ogUrl)}" />`,
    ...seo.jsonLd.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`),
  ]
    .filter(Boolean)
    .join("\n    ");
}

function fill(head, html, path) {
  return template
    .replace(/<title>[\s\S]*?<\/title>\s*/, "")
    .replace(/<meta name="description"[^>]*>\s*/, "")
    .replace("<!--app-head-->", head)
    // data-path: el cliente solo hidrata si el HTML corresponde a la URL actual.
    .replace('<div id="root">', `<div id="root" data-path="${esc(path)}">`)
    .replace("<!--app-html-->", html);
}

async function writePage(path, content) {
  const dir = join(DIST, ...decodeURIComponent(path).split("/").filter(Boolean));
  await mkdir(fsPath(dir), { recursive: true });
  await writeFile(fsPath(join(dir, "index.html")), content);
}

let ok = 0;
for (const route of ROUTES) {
  const seo = getSeo(route);
  const html = await render(route);
  await writePage(route, fill(await headFor(seo), html, route));
  ok++;
  console.log(`✓ ${route}`);
}

// 404 y shell SPA (sin HTML prerenderizado: el cliente renderiza desde cero)
const nf = getSeo("/404");
await writeFile(join(DIST, "404.html"), fill(await headFor(nf), await render("/404"), "*"));
await writeFile(join(DIST, "app.html"), template.replace("<!--app-head-->", "").replace("<!--app-html-->", ""));

// Sitemap (solo páginas indexables) y robots.txt
const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.map((r) => getSeo(r))
  .filter((s) => !s.noindex)
  .map((s) => {
    const iso = s.jsonLd.find((j) => j["@type"] === "CreativeWork")?.datePublished ?? today;
    const prio = s.path === "/" ? "1.0" : s.path.startsWith("/work-detail/") ? "0.6" : "0.8";
    return `  <url><loc>${esc(SITE_URL + encodeURI(s.path))}</loc><lastmod>${iso}</lastmod><priority>${prio}</priority></url>`;
  });
await writeFile(
  join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
);
await writeFile(join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`\n${ok} páginas prerenderizadas + 404.html + app.html, sitemap con ${urls.length} URLs, ${[...ogCache.values()].filter(Boolean).length} imágenes OG.`);
if (!(await exists(join(DIST, "media")))) console.warn("Aviso: dist/media no existe; corre `npm run media` antes del build.");
