// Metadatos por ruta: los usa el prerender (HTML estático) y la navegación en cliente.
import { contact, images } from "./data/site";
import { projects, findProject, displayTitle } from "./data/projects";

export const SITE_URL = "https://blurbranding.agency";
const BRAND = "BLUR Branding Studio";

/** Descripción oficial del sitio (la misma que publica el sitio en Framer). */
export const SITE_DESCRIPTION =
  "BLUR Branding Studio en Ciudad Guayana, Venezuela. Expertos en creación de identidad de marca, Diseño Web y publicidad de Alto Impacto";

/** Igual que el original: permite vistas previas de imagen grandes en Google. */
export const ROBOTS_INDEX = "index,follow,max-image-preview:large";

export type Seo = {
  path: string;
  title: string;
  description: string;
  /** URL de imagen (Framer o local) que se usa como base para el Open Graph. */
  image: string;
  type: "website" | "article";
  noindex?: boolean;
  jsonLd: object[];
};

const clip = (s: string, n = 158) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)) + "…");

/** Negocio local (Google usa esto para el panel de empresa y búsquedas locales). */
export const localBusiness = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: BRAND,
  legalName: "BLUR Branding Studio C.A.",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  image: `${SITE_URL}/og/home.jpg`,
  telephone: "+58-412-546-5636",
  email: contact.email,
  taxID: "J-501827699",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Torre Empresarial Atlantis, piso 7, oficina 2, Carrera Guri, Alta Vista",
    addressLocality: "Puerto Ordaz",
    addressRegion: "Bolívar",
    postalCode: "8050",
    addressCountry: "VE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 8.295438, longitude: -62.7345072 },
  hasMap: contact.maps,
  areaServed: ["Ciudad Guayana", "Puerto Ordaz", "Bolívar", "Venezuela"],
  sameAs: [contact.instagram, contact.tiktok, "https://www.behance.net/blurbranding"],
};

const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});

const PAGES: Record<string, Omit<Seo, "path" | "jsonLd"> & { crumb?: string }> = {
  "/": {
    title: `${BRAND} | Estrategia, branding y producción audiovisual`,
    description: SITE_DESCRIPTION,
    image: images.heroBillboard,
    type: "website",
  },
  "/services": {
    title: `Servicios de branding, diseño web y audiovisual | ${BRAND}`,
    description:
      "Branding, diseño web UI/UX, redes sociales, audiovisuales, material P.O.P., pantalla LED, asesorías, sesiones fotográficas y cobertura de eventos.",
    image: images.servicesHero,
    type: "website",
    crumb: "Servicios",
  },
  "/about": {
    title: `Quiénes somos | ${BRAND}`,
    description:
      "Conoce a BLUR Branding Studio: equipo creativo liderado por su Directora Creativa, con más de 15 años impulsando marcas en Ciudad Guayana.",
    image: images.aboutHero,
    type: "website",
    crumb: "Quiénes Somos",
  },
  "/portafolio": {
    title: `Portafolio de proyectos | ${BRAND}`,
    description:
      "Proyectos de branding, audiovisuales, redes sociales, material impreso y publicidad LED realizados por BLUR Branding Studio.",
    image: images.aboutHero,
    type: "website",
    crumb: "Portafolio",
  },
  "/pantalla-led": {
    title: `Publicidad en pantalla LED en Puerto Ordaz | ${BRAND}`,
    description:
      "Publicidad en pantalla LED en Alta Vista, Puerto Ordaz. Planes desde 95$ al mes con más de 150 reproducciones diarias por video.",
    image: images.ledHero,
    type: "website",
    crumb: "Valla LED",
  },
  "/contacto": {
    title: `Contáctanos | ${BRAND}`,
    description:
      "Cotiza tu proyecto con BLUR Branding Studio. WhatsApp +58 412 546 5636 o Blurbranding@gmail.com. Torre Empresarial Atlantis, Puerto Ordaz.",
    image: images.ctaBg,
    type: "website",
    crumb: "Contáctanos",
  },
};

const LEGAL: Record<string, string> = {
  privacidad: "Política de Privacidad",
  terminos: "Términos y Condiciones",
  cookies: "Política de Cookies",
};

export function getSeo(rawPath: string): Seo {
  const path = decodeURIComponent(rawPath.split(/[?#]/)[0]).replace(/\/$/, "") || "/";

  const page = PAGES[path];
  if (page) {
    const jsonLd: object[] = [localBusiness];
    if (page.crumb) jsonLd.push(breadcrumb([{ name: "Inicio", path: "/" }, { name: page.crumb, path }]));
    if (path === "/pantalla-led") {
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Publicidad en pantalla LED",
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: "Puerto Ordaz",
        offers: [
          { "@type": "Offer", name: "Plan BÁSICO", price: "95", priceCurrency: "USD" },
          { "@type": "Offer", name: "Plan INTERMEDIO", price: "160", priceCurrency: "USD" },
          { "@type": "Offer", name: "Plan FULL", price: "310", priceCurrency: "USD" },
        ],
      });
    }
    return { path, ...page, jsonLd };
  }

  if (path.startsWith("/work-detail/")) {
    const p = findProject(path.replace("/work-detail/", ""));
    if (p) {
      const title = displayTitle(p.title);
      return {
        path,
        title: `${title} | BLUR`,
        description: clip(p.lead ?? p.intro),
        image: p.cover,
        type: "article",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: title,
            about: p.tag,
            datePublished: p.date,
            description: clip(p.intro, 300),
            creator: { "@id": `${SITE_URL}/#business` },
            url: `${SITE_URL}${encodeURI(path)}`,
          },
          breadcrumb([
            { name: "Inicio", path: "/" },
            { name: "Portafolio", path: "/portafolio" },
            { name: title, path: encodeURI(path) },
          ]),
        ],
      };
    }
  }

  const legal = path.startsWith("/legal/") ? LEGAL[path.replace("/legal/", "")] : undefined;
  return {
    path,
    title: legal ? `${legal} | ${BRAND}` : `Página no encontrada | ${BRAND}`,
    description: SITE_DESCRIPTION,
    image: images.heroBillboard,
    type: "website",
    noindex: true,
    jsonLd: [],
  };
}

/** Rutas que se generan como HTML estático. */
export const ROUTES = [
  ...Object.keys(PAGES),
  ...projects.map((p) => `/work-detail/${p.slug}`),
  ...Object.keys(LEGAL).map((d) => `/legal/${d}`),
];
