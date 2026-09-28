import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { SIZES } from "../lib/media";
import PageHero from "../components/PageHero";
import CtaBanner from "../components/CtaBanner";
import { Img, Reveal, EASE } from "../components/ui";
import { images } from "../data/site";
import { projects, displayTitle, formatDate } from "../data/projects";

export default function Portafolio() {
  const tags = useMemo(() => ["Todos", ...Array.from(new Set(projects.map((p) => p.tag)))], []);
  const [filter, setFilter] = useState("Todos");
  const list = filter === "Todos" ? projects : projects.filter((p) => p.tag === filter);

  return (
    <>
      <PageHero
        image={images.aboutHero}
        position="center 35%"
        kicker="Nuestro portafolio:"
        title="Proyectos que generan resultados."
        text="Convertimos la visión de nuestros clientes en marcas de alto impacto y crecimiento sostenido."
      />

      <section className="bg-surface-base py-14 md:py-20">
        <div className="container-x">
          <div role="tablist" aria-label="Filtrar proyectos" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
            {tags.map((t) => {
              const on = t === filter;
              return (
                <button
                  key={t}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(t)}
                  className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition-colors ${
                    on ? "bg-brand-ink text-white" : "bg-white text-brand-ink/70 hover:text-brand-ink"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <motion.ul layout className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.li
                  layout
                  key={p.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <Link to={`/work-detail/${p.slug}`} className="group block">
                    <div className="overflow-hidden rounded-2xl">
                      <Img
                        sizes={SIZES.third}
                        src={p.cover}
                        alt={displayTitle(p.title)}
                        className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <h2 className="mt-4 text-[19px] font-semibold leading-snug text-brand-ink transition-colors group-hover:text-brand-teal">
                      {displayTitle(p.title)}
                    </h2>
                    <p className="mt-2 flex items-center gap-2 text-sm text-black/55">
                      <span>{p.tag}</span>
                      <span aria-hidden className="h-1 w-1 rounded-full bg-black/25" />
                      <time dateTime={p.date}>{formatDate(p.date)}</time>
                    </p>
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {list.length === 0 && (
            <Reveal>
              <p className="py-16 text-center text-black/55">No hay proyectos en esta categoría todavía.</p>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
