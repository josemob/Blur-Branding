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

`vercel.json` y `public/_redirects` ya incluyen la configuración para Vercel y Netlify.

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
