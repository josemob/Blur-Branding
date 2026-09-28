import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowsOut, CaretLeft, CaretRight, Check, LinkSimple, WhatsappLogo, X } from "@phosphor-icons/react";
import { media, mediaVideo, SIZES } from "../lib/media";
import { Button, EASE, Img, Kicker, Reveal } from "../components/ui";
import NotFound from "./NotFound";
import { SITE_URL } from "../seo";
import { projects, findProject, displayTitle, formatDate, splitTitle, serviceFor, type Project } from "../data/projects";

const HERO_BG = "radial-gradient(93% 245% at 61.4% 66.9%, rgb(90,132,144) 0%, rgb(7,7,5) 100%)";
const WRAP = "mx-auto w-full max-w-[1240px] px-5 md:px-10";

export default function WorkDetail() {
  const { slug } = useParams();
  const p = findProject(slug);
  const [shot, setShot] = useState<number | null>(null);
  if (!p) return <NotFound />;

  const idx = projects.indexOf(p);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const others = projects.filter((x) => x !== p && x !== prev && x !== next);
  const more = [...others.filter((x) => x.tag === p.tag), ...others.filter((x) => x.tag !== p.tag)].slice(0, 3);

  const { kicker, headline } = splitTitle(p);
  const title = displayTitle(p.title);
  const shots = [p.cover, ...(p.gallery ?? [])];

  return (
    <>
      <ReadingProgress />

      <article className="bg-surface-base">
        {/* Cabecera oscura con el mismo degradado del hero del inicio */}
        <header className="relative overflow-hidden pb-[clamp(7rem,15vw,13rem)] pt-32 text-white md:pt-44" style={{ background: HERO_BG }}>
          <div className={WRAP}>
            <Reveal y={12}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <nav aria-label="Ruta de navegación">
                  <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
                    <li><Link to="/" className="inline-flex min-h-11 items-center hover:text-white">Inicio</Link></li>
                    <li aria-hidden>/</li>
                    <li><Link to="/portafolio" className="inline-flex min-h-11 items-center hover:text-white">Portafolio</Link></li>
                    <li aria-hidden>/</li>
                    <li aria-current="page" className="text-white/90">{p.tag}</li>
                  </ol>
                </nav>
                <p className="font-display text-sm tabular-nums text-white/50">
                  Proyecto {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </p>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-8 md:mt-12 lg:grid-cols-12 lg:gap-12">
              <Reveal delay={0.05} className={p.lead ? "lg:col-span-8" : "lg:col-span-10"}>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-medium backdrop-blur">{p.tag}</span>
                  <time dateTime={p.date} className="text-white/60">{formatDate(p.date)}</time>
                </div>
                <h1 className="mt-6">
                  <span className="block font-display text-[clamp(1.25rem,2vw,1.75rem)] font-medium text-brand-tealLight">{kicker}</span>
                  <span className="mt-2 block text-balance text-[clamp(2.1rem,4.6vw,4.1rem)] font-semibold leading-[1.04] tracking-tight">
                    {headline}
                  </span>
                </h1>
              </Reveal>
              {p.lead && (
                <Reveal delay={0.12} className="lg:col-span-4 lg:self-end">
                  <p className="max-w-xl text-lg leading-relaxed text-white/75">{p.lead}</p>
                </Reveal>
              )}
            </div>
          </div>
        </header>

        {/* Portada montada sobre el borde de la cabecera */}
        <div className={`${WRAP} relative z-10 -mt-[clamp(5rem,12vw,11rem)]`}>
          <motion.button
            type="button"
            onClick={() => setShot(0)}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            aria-label="Ampliar imagen de portada"
            className="group relative block w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(7,7,5,0.55)]"
          >
            <Img
              src={p.cover}
              alt={title}
              eager
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] md:aspect-[16/9]"
            />
            <ZoomHint />
          </motion.button>
        </div>

        {/* Cuerpo: contenido + ficha lateral fija */}
        <div className={`${WRAP} grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20`}>
          <div className="min-w-0">
            <Reveal>
              <p className="text-[clamp(1.2rem,1.7vw,1.5rem)] leading-[1.5] text-brand-ink/85">{p.intro}</p>
            </Reveal>

            {p.highlight && (
              <Reveal className="mt-12">
                <section className="rounded-2xl bg-brand-dark p-7 text-white md:p-10">
                  <Kicker tone="dark">Lo destacado</Kicker>
                  <h2 className="mt-2 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight">{p.highlight.title}</h2>
                  <p className="mt-4 text-[17px] leading-[1.7] text-white/75">{p.highlight.text}</p>
                </section>
              </Reveal>
            )}

            <section className="mt-14 md:mt-16">
              <Reveal>
                <Kicker>Cómo lo hicimos</Kicker>
                <h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold leading-[1.1] tracking-tight text-brand-ink">{p.listTitle}</h2>
              </Reveal>
              <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {p.items.map((it, i) => (
                  <Reveal
                    key={it.label}
                    delay={(i % 2) * 0.06}
                    className={p.items.length % 2 === 1 && i === p.items.length - 1 ? "sm:col-span-2" : ""}
                  >
                    <li className="flex h-full flex-col rounded-2xl bg-white p-6 md:p-7">
                      <span className="font-display text-sm font-medium tabular-nums text-brand-teal">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-3 text-lg font-semibold leading-snug text-brand-ink">{it.label}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-black/60">{it.text}</p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </section>

            {p.closing && p.closing.length > 0 && (
              <Reveal className="mt-12 space-y-5 text-[17px] leading-[1.75] text-black/65">
                {p.closing.map((c) => (
                  <p key={c}>{c}</p>
                ))}
              </Reveal>
            )}
          </div>

          <aside className="lg:sticky lg:top-[120px] lg:self-start">
            <FactSheet p={p} kicker={kicker} title={title} />
          </aside>
        </div>

        {/* Video en una franja oscura tipo sala de cine */}
        {p.video && (
          <section className="bg-brand-darker py-16 text-white md:py-24">
            <div className={WRAP}>
              <Reveal>
                <Kicker tone="dark">En movimiento</Kicker>
                <h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold leading-tight tracking-tight">El proyecto en video</h2>
              </Reveal>
              <Reveal delay={0.08} className="mt-10">
                {/* Sin autoplay: algunos videos pesan >10 MB; solo se descargan si el visitante da play. */}
                <video
                  src={mediaVideo(p.video)}
                  poster={media(p.cover).src}
                  controls
                  playsInline
                  preload="none"
                  className="mx-auto block max-h-[80dvh] w-auto max-w-full rounded-2xl bg-black"
                />
              </Reveal>
            </div>
          </section>
        )}

        {/* Galería tipo mosaico con visor a pantalla completa */}
        {p.gallery && p.gallery.length > 0 && (
          <section className="py-16 md:py-24">
            <div className={WRAP}>
              <Reveal className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Kicker>Galería</Kicker>
                  <h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold leading-tight tracking-tight text-brand-ink">Detalles del proyecto</h2>
                </div>
                <p className="font-display text-sm tabular-nums text-black/45">{p.gallery.length} imágenes</p>
              </Reveal>
              <div className="mt-10 columns-1 gap-4 sm:columns-2">
                {p.gallery.map((g, i) => (
                  <Reveal key={g} delay={(i % 2) * 0.06} className="mb-4 break-inside-avoid">
                    <button
                      type="button"
                      onClick={() => setShot(i + 1)}
                      aria-label={`Ampliar imagen ${i + 1} de ${p.gallery!.length}`}
                      className="group relative block w-full overflow-hidden rounded-2xl"
                    >
                      <Img
                        src={g}
                        sizes={SIZES.card}
                        alt={`${title}, imagen ${i + 1}`}
                        className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <ZoomHint />
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Anterior / siguiente */}
        <nav aria-label="Otros proyectos" className={`${WRAP} grid grid-cols-1 gap-4 pb-16 sm:grid-cols-2 md:pb-24 ${p.gallery?.length ? "" : "pt-4"}`}>
          <NeighborCard p={prev} dir="prev" />
          <NeighborCard p={next} dir="next" />
        </nav>
      </article>

      {/* Más proyectos */}
      <section className="bg-surface-base pb-20 md:pb-28">
        <div className={WRAP}>
          <div className="flex flex-col gap-6 border-t border-brand-ink/10 pt-14 md:flex-row md:items-end md:justify-between">
            <div>
              <Kicker>Sigue explorando</Kicker>
              <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-tight text-brand-ink">Más proyectos</h2>
            </div>
            <Button to="/portafolio" variant="dark">Ver todo el portafolio</Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.06} className={i === 2 ? "sm:hidden lg:block" : ""}>
                <Link to={`/work-detail/${m.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl">
                    <Img
                      src={m.cover}
                      sizes={SIZES.third}
                      alt={displayTitle(m.title)}
                      className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-brand-ink backdrop-blur">{m.tag}</span>
                  </div>
                  <p className="mt-4 font-display text-sm text-brand-teal">{splitTitle(m).kicker}</p>
                  <h3 className="mt-1 font-semibold leading-snug text-brand-ink transition-colors group-hover:text-brand-teal">{splitTitle(m).headline}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {shot !== null && (
          <Lightbox
            key="lightbox"
            items={shots}
            index={shot}
            title={title}
            onIndex={setShot}
            onClose={() => setShot(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/** Barra fina de progreso de lectura, sobre el navbar. */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand-cyan" />;
}

function ZoomHint() {
  return (
    <span
      aria-hidden
      className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-xl bg-black/35 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      <ArrowsOut size={18} weight="bold" />
    </span>
  );
}

/** Ficha del proyecto: datos, compartir y llamada a la acción. */
function FactSheet({ p, kicker, title }: { p: Project; kicker: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const service = serviceFor(p.tag);
  const url = `${SITE_URL}/work-detail/${encodeURIComponent(p.slug)}`;
  const wa = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copia el enlace:", url);
    }
  };

  const rows = [
    ...(kicker !== p.tag ? [{ k: "Proyecto", v: <>{kicker}</> }] : []),
    { k: "Categoría", v: <>{p.tag}</> },
    {
      k: "Servicio",
      v: (
        <Link to={service.to} className="inline-flex items-center gap-1 text-brand-teal underline-offset-4 hover:underline">
          {service.label} <ArrowRight size={14} weight="bold" />
        </Link>
      ),
    },
    { k: "Publicado", v: <time dateTime={p.date}>{formatDate(p.date)}</time> },
  ];

  return (
    <Reveal className="space-y-3">
      <div className="rounded-2xl bg-white p-6">
        <dl className="divide-y divide-brand-ink/[0.08]">
          {rows.map((r) => (
            <div key={r.k} className="flex items-baseline justify-between gap-4 py-3 first:pt-0">
              <dt className="text-sm text-black/50">{r.k}</dt>
              <dd className="text-right text-[15px] font-medium text-brand-ink">{r.v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-brand-ink/[0.08] pt-4">
          <p className="text-sm text-black/50">Compartir</p>
          <div className="flex gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              aria-label="Compartir por WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-base text-brand-ink transition-colors hover:bg-brand-teal hover:text-white"
            >
              <WhatsappLogo size={20} />
            </a>
            <button
              type="button"
              onClick={copy}
              aria-label={copied ? "Enlace copiado" : "Copiar enlace"}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-base text-brand-ink transition-colors hover:bg-brand-teal hover:text-white"
            >
              {copied ? <Check size={20} weight="bold" /> : <LinkSimple size={20} />}
            </button>
          </div>
        </div>
        <p aria-live="polite" className="sr-only">{copied ? "Enlace copiado al portapapeles" : ""}</p>
      </div>

      <div className="rounded-2xl p-6 text-white" style={{ background: HERO_BG }}>
        <p className="text-xl font-semibold leading-snug">¿Tienes un proyecto en mente?</p>
        <p className="mt-2 text-[15px] leading-relaxed text-white/70">Cuéntanos tu idea y la convertimos en una marca de alto impacto.</p>
        <Button to="/contacto" className="mt-5 w-full justify-between">Quiero un proyecto así</Button>
      </div>
    </Reveal>
  );
}

function NeighborCard({ p, dir }: { p: Project; dir: "prev" | "next" }) {
  const { kicker, headline } = splitTitle(p);
  const isNext = dir === "next";
  return (
    <Link
      to={`/work-detail/${p.slug}`}
      className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-2xl bg-brand-darker p-6 text-white md:min-h-[300px] md:p-8"
    >
      <Img
        src={p.cover}
        sizes={SIZES.card}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-[transform,opacity] duration-700 group-hover:scale-[1.04] group-hover:opacity-45"
      />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,5,0.92)] via-[rgba(7,7,5,0.35)] to-transparent" />
      <span className={`relative flex items-center gap-2 text-sm font-medium text-white/70 ${isNext ? "justify-end" : ""}`}>
        {!isNext && <ArrowLeft size={16} weight="bold" className="transition-transform group-hover:-translate-x-1" />}
        {isNext ? "Siguiente proyecto" : "Proyecto anterior"}
        {isNext && <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />}
      </span>
      <span className={`relative mt-3 block ${isNext ? "text-right" : ""}`}>
        <span className="block font-display text-sm text-brand-tealLight">{kicker}</span>
        <span className="mt-1 line-clamp-2 block text-[clamp(1.2rem,1.8vw,1.5rem)] font-semibold leading-snug">{headline}</span>
      </span>
    </Link>
  );
}

/** Visor a pantalla completa: flechas, Escape, deslizar en móvil y contador. */
function Lightbox({
  items,
  index,
  title,
  onIndex,
  onClose,
}: {
  items: string[];
  index: number;
  title: string;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [dir, setDir] = useState(0);
  const count = items.length;
  const go = (d: number) => {
    setDir(d);
    onIndex((index + d + count) % count);
  };

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      prevFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && count > 1) go(1);
      else if (e.key === "ArrowLeft" && count > 1) go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const m = media(items[index]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${title}: imagen ${index + 1} de ${count}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] flex flex-col bg-[rgba(7,7,5,0.94)] backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 text-white md:px-8" onClick={(e) => e.stopPropagation()}>
        <p className="font-display text-sm tabular-nums text-white/70">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar visor"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-white/20"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-5 pb-8 md:px-24">
        {/* Cambia de imagen por key: entra con un leve desplazamiento en la dirección del gesto */}
        <motion.img
          key={items[index]}
          src={m.src}
          srcSet={m.srcSet}
          sizes="100vw"
          width={m.width}
          height={m.height}
          alt={`${title}, imagen ${index + 1}`}
          initial={{ opacity: 0, x: dir * 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          drag={count > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1);
            else if (info.offset.x > 60) go(-1);
          }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full cursor-grab touch-pan-y select-none rounded-xl object-contain active:cursor-grabbing"
          draggable={false}
        />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-brand-teal md:left-8 md:flex"
            >
              <CaretLeft size={22} weight="bold" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-brand-teal md:right-8 md:flex"
            >
              <CaretRight size={22} weight="bold" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
