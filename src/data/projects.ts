// Proyectos del portafolio. El contenido vive en content/proyectos/*.json (un
// archivo por proyecto) y se edita desde el panel /admin (Sveltia CMS); aquí se
// cargan en el build, así cada proyecto sigue saliendo prerenderizado para SEO.

export type ProjectItem = { label: string; text: string };

export type Project = {
  slug: string;
  title: string;
  tag: string;
  date: string; // ISO (AAAA-MM-DD)
  cover: string;
  lead?: string;
  intro: string;
  highlight?: { title: string; text: string };
  listTitle: string;
  items: ProjectItem[];
  closing?: string[];
  gallery?: string[];
  video?: string;
};

/** Forma de cada JSON tal como lo guarda el CMS (los opcionales pueden faltar o venir vacíos). */
type ProjectFile = Partial<Omit<Project, "highlight">> & {
  orden?: number;
  highlight?: { title?: string; text?: string };
};

const files = import.meta.glob<ProjectFile>("/content/proyectos/*.json", { eager: true, import: "default" });

const nonEmpty = (s?: string) => (s && s.trim() ? s.trim() : undefined);

/** Normaliza un archivo del CMS: rellena opcionales y usa el nombre del archivo como URL si no hay slug. */
function toProject(path: string, f: ProjectFile): Project & { orden: number } {
  const fileSlug = path.split("/").pop()!.replace(/\.json$/, "");
  const highlight = nonEmpty(f.highlight?.title) && nonEmpty(f.highlight?.text) ? { title: f.highlight!.title!.trim(), text: f.highlight!.text!.trim() } : undefined;
  const list = <T,>(a?: T[]) => (Array.isArray(a) ? a.filter(Boolean) : []);
  const closing = list(f.closing).filter((c) => typeof c === "string" && c.trim());
  const gallery = list(f.gallery).filter((g) => typeof g === "string" && g.trim());
  return {
    slug: nonEmpty(f.slug) ?? fileSlug,
    title: f.title ?? fileSlug,
    tag: f.tag ?? "Branding",
    date: String(f.date ?? "").slice(0, 10),
    cover: f.cover ?? "",
    lead: nonEmpty(f.lead),
    intro: f.intro ?? "",
    highlight,
    listTitle: f.listTitle ?? "",
    items: list(f.items).filter((it) => it && it.label),
    closing: closing.length ? closing : undefined,
    gallery: gallery.length ? gallery : undefined,
    video: nonEmpty(f.video),
    orden: typeof f.orden === "number" ? f.orden : Number.MAX_SAFE_INTEGER,
  };
}

/** Más recientes primero; con la misma fecha, menor "orden" primero. */
export const projects: Project[] = Object.entries(files)
  .map(([path, f]) => toProject(path, f))
  .sort((a, b) => b.date.localeCompare(a.date) || a.orden - b.orden || a.title.localeCompare(b.title))
  .map(({ orden: _orden, ...p }) => p);


/** Título visible sin guiones largos: "Marca – descripción" -> "Marca: descripción". */
export const displayTitle = (t: string) => t.replace(/\s[–—]\s/g, ": ");

/**
 * Separa el título en kicker (marca o tema) y titular:
 * "Athletics Group – Capturando la energía…" -> { kicker: "Athletics Group", headline: "Capturando la energía…" }.
 * Si no hay separador, el kicker es la categoría del proyecto.
 */
export function splitTitle(p: Project) {
  const t = displayTitle(p.title).replace(/\.$/, "");
  const i = t.indexOf(": ");
  if (i === -1) return { kicker: p.tag, headline: t };
  const rest = t.slice(i + 2);
  return { kicker: t.slice(0, i), headline: rest.charAt(0).toUpperCase() + rest.slice(1) };
}

/** Categoría del proyecto -> servicio relacionado (nombre y enlace). */
const SERVICE_BY_TAG: Record<string, { label: string; to: string }> = {
  Branding: { label: "Identidad visual y branding", to: "/services#identidad-visual-y-branding" },
  "Diseño Web": { label: "Diseño web", to: "/services#diseno-web" },
  "Redes sociales": { label: "Redes sociales", to: "/services#redes-sociales" },
  Audiovisuales: { label: "Audiovisuales", to: "/services#audiovisuales" },
  Audiovisuals: { label: "Audiovisuales", to: "/services#audiovisuales" },
  "Material Impreso": { label: "Material impreso", to: "/services#material-impreso" },
  "Pantalla LED": { label: "Pantalla LED", to: "/pantalla-led" },
  "Sesión fotográfica": { label: "Sesión fotográfica", to: "/services#sesion-fotografica" },
  "Cobertura de eventos": { label: "Cobertura de eventos", to: "/services#cobertura-de-eventos" },
};
export const serviceFor = (tag: string) => SERVICE_BY_TAG[tag] ?? { label: "Servicios", to: "/services" };

// Formato manual (no Intl): idéntico en Node (prerender) y en el navegador.
const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

export const findProject = (slug?: string) =>
  projects.find((p) => p.slug === slug || encodeURIComponent(p.slug) === slug);
