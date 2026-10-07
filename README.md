# BLUR Branding Studio

Sitio web de [BLUR Branding Studio](https://blurbranding.agency) (Ciudad Guayana, Venezuela), migrado de Framer a React.

**Stack:** Vite + React 19 + TypeScript + Tailwind CSS + Motion + React Router, con HTML prerenderizado por ruta para SEO.

## Desarrollo

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
```

Genera `dist/` con:

- HTML estático por ruta (inicio, servicios, quiénes somos, portafolio, pantalla LED, contacto, 11 proyectos y páginas legales), con título, descripción, canonical, Open Graph, Twitter y JSON-LD (negocio local, breadcrumbs, servicios y proyectos).
- Imágenes Open Graph 1200x630, `sitemap.xml`, `robots.txt`, `404.html` y `app.html` (shell SPA para rutas no prerenderizadas).

## Panel de contenido (/admin)

Los proyectos del portafolio viven en `content/proyectos/*.json` (uno por proyecto) y se editan desde `https://blurbranding.agency/admin` con [Sveltia CMS](https://github.com/sveltia/sveltia-cms):

1. Entra a `/admin` y elige **Iniciar sesión con un token de acceso**.
2. El token se crea en GitHub → Settings → Developer settings → *Fine-grained tokens*, con acceso solo al repo `josemob/Blur-Branding` y permiso **Contents: Read and write**.
3. Crea o edita un proyecto, sube imágenes y pulsa **Publicar**: el CMS hace un commit en `main` y Cloudflare recompila el sitio (1–2 min).

Las imágenes subidas quedan en `public/uploads` y en cada build `scripts/optimize-uploads.mjs` genera sus versiones WebP (640–2400 px). Cada proyecto nuevo sale prerenderizado, con imagen Open Graph y en el sitemap.

## Despliegue

- **Cloudflare Workers** (`wrangler.jsonc`): comando de compilación `npm run build`, comando de despliegue `npx wrangler deploy`. Publica `dist/` como sitio estático; las rutas inexistentes devuelven `404.html`. Caché de medios en `public/_headers`.
- **Vercel**: `vercel.json`.
- Node 22 (`.node-version`).

## Medios

Las imágenes y videos del sitio original están en `public/media` (WebP en varios tamaños) y el manifiesto en `src/data/media-manifest.json`. Para volver a descargarlos desde Framer:

```bash
npm run media
```

## Estructura

- `src/pages`: páginas (una por ruta).
- `src/components`: navbar, footer, formulario, carrusel de videos, etc.
- `src/data`: contenido (servicios, proyectos, planes LED, contacto).
- `src/seo.ts`: metadatos por ruta.
- `scripts/prerender.mjs`: generación del HTML estático, OG y sitemap.
