import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { InstagramLogo, TiktokLogo, Star, CaretLeft, CaretRight, ArrowUpRight } from "@phosphor-icons/react";
import { Reveal, Button, Img, Kicker, EASE } from "../components/ui";
import ContactForm from "../components/ContactForm";
import VideoReels from "../components/VideoReels";
import { images, stats, services, testimonials, testimonialVideos, contact } from "../data/site";
import { projects, displayTitle } from "../data/projects";
import { media, SIZES } from "../lib/media";

const enter = (d: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: d, ease: EASE },
});

/* ----------------------------- HERO ----------------------------- */
function Hero() {
  const bill = media(images.heroBillboard);

  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden"
      // Gradiente radial del original: teal de marca que se funde en casi negro.
      style={{ background: "radial-gradient(93% 245% at 61.4% 66.9%, rgb(90,132,144) 0%, rgb(7,7,5) 100%)" }}
    >
      {/* Decoración: billboard pegado a la derecha, 50vw en desktop, esquina sup-izq 16px */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-full overflow-hidden lg:w-[50vw] lg:rounded-tl-2xl">
        <motion.img
          src={bill.src}
          srcSet={bill.srcSet}
          sizes={SIZES.half}
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover object-[70%_center] lg:object-center"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        {/* Velo solo para legibilidad: fuerte en móvil (texto encima), sutil en desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(7,7,5,0.8)] via-[rgba(7,7,5,0.45)] to-transparent lg:from-[rgba(7,7,5,0.3)] lg:via-transparent" />
      </div>

      <div className="container-x relative flex min-h-[100dvh] flex-col justify-center pb-28 pt-24">
        <div className="max-w-xl lg:max-w-[52vw]">
          <motion.h1 {...enter(0.15)} className="text-[clamp(2.4rem,4vw,3.9rem)] font-medium leading-[1.06] tracking-tight text-white">
            Estrategia, branding y producción audiovisual <span className="font-bold">sin fronteras</span>
          </motion.h1>
          <motion.p {...enter(0.3)} className="mt-6 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
            Estudio Creativo 360 que impulsa marcas desde el branding estratégico hasta la publicidad de alto impacto.
          </motion.p>
          <motion.div {...enter(0.45)} className="mt-9">
            <Button to="/contacto">Contáctanos</Button>
          </motion.div>
        </div>
      </div>

      {/* Barra inferior (medidas del original): 65px, blur 10px, fondo negro 13%,
          ancho según contenido anclada a la derecha, radio 10px solo arriba-izquierda */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/[0.13] backdrop-blur-[10px] lg:left-auto lg:rounded-tl-[10px]">
        <div className="flex min-h-[65px] flex-wrap items-center justify-between gap-x-10 gap-y-2 px-5 py-[15px] text-[15px] font-medium text-white md:px-10 lg:justify-start">
          <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="hover:text-brand-tealLight">
            Consulta Inmediata: {contact.phone}
          </a>
          <span className="hidden sm:inline">Más de 50 Marcas Impulsadas.</span>
          <div className="flex items-center gap-4">
            <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white/80 hover:text-white">
              <InstagramLogo size={20} />
            </a>
            <a href={contact.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="text-white/80 hover:text-white">
              <TiktokLogo size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- STATS ----------------------------- */
function Stats() {
  return (
    <section className="bg-surface-base py-20 md:py-28">
      {/* Mismo ancho máximo que la sección de Servicios (1180px) para alinear columnas */}
      <div className="gutter-x grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <h2 className="text-[clamp(2rem,3.2vw,2.75rem)] font-medium leading-[1.1] text-brand-ink">
            Experiencia, impacto <br className="hidden sm:block" />y crecimiento.
          </h2>
        </Reveal>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:col-span-7">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="flex h-full flex-col justify-between rounded-2xl bg-white p-4 sm:p-6 lg:min-h-[240px] lg:p-8">
                <div className="text-[clamp(2.1rem,6vw,5rem)] font-bold leading-none tracking-tighter text-brand-ink">
                  {s.value}
                </div>
                <div className="mt-6 border-t border-black/10 pt-4 text-xs leading-snug text-black/55 sm:text-sm lg:text-base">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- SERVICES --------------------------- */
function Services() {
  const [active, setActive] = useState(0);
  const cur = services[active];
  const curImg = media(cur.img);

  return (
    <section className="bg-surface-base pb-20 md:pb-28">
      <div className="gutter-x grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr] md:gap-10 lg:grid-cols-[360px_1fr] lg:gap-[60px]">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#1d4ed8] md:aspect-[2/3.5]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={active}
                src={curImg.src}
                srcSet={curImg.srcSet}
                sizes="(min-width: 1024px) 360px, (min-width: 768px) 280px, 100vw"
                alt={cur.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>

        <div role="list">
          {services.map((s, i) => {
            const open = active === i;
            return (
              <div key={s.n} role="listitem">
                {open ? (
                  <motion.div layout className="rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-teal p-6 text-white md:p-7">
                    <h3 className="text-lg font-semibold">
                      {s.n}. {s.title}
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
                    >
                      <p className="mt-5 text-base font-bold">{s.heading}</p>
                      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/90">{s.desc}</p>
                      <Button to="/services" variant="outline" className="mt-6">
                        Ver Servicio
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setActive(i)}
                    aria-expanded={false}
                    className="group flex w-full items-center justify-between border-b border-black/10 py-5 text-left text-lg font-semibold text-brand-ink transition-colors hover:text-brand-teal md:py-6"
                  >
                    <span>
                      {s.n}. {s.title}
                    </span>
                    <ArrowUpRight size={18} className="text-black/25 transition-colors group-hover:text-brand-teal" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ LED ------------------------------ */
function Led() {
  return (
    <section className="overflow-hidden bg-surface-base py-16 md:py-24">
      {/* Como el original: imagen ~43vw pegada a la izquierda y columna de texto más ancha (~693px a 1440) */}
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1fr)] lg:gap-[60px]">
        <Reveal className="px-5 md:px-10 lg:px-0">
          <Img
            transparent
            sizes={SIZES.half}
            src={images.ledMain}
            alt="Valla LED de BLUR en Alta Vista, Ciudad Guayana"
            className="aspect-[1306/1140] w-full rounded-2xl object-cover lg:rounded-l-none"
          />
        </Reveal>
        <Reveal delay={0.1} className="gutter-r pl-5 md:pl-10 lg:pl-0">
          <Kicker>Publicidad de alto impacto:</Kicker>
          <h2 className="mt-2 text-balance text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.06] text-brand-ink">
            Pantalla LED en Ciudad Guayana.
          </h2>
          <p className="mt-5 max-w-[693px] text-[15px] leading-relaxed text-black/60">
            Aprovecha el tráfico lento y el flujo peatonal constante en el corazón de Alta Vista. Con un alcance
            estimado de +1.5 millones de impactos mensuales, tu marca estará presente en el trayecto obligado de todo
            Puerto Ordaz.
          </p>
          <Button to="/pantalla-led" className="mt-7">
            Ver Ubicaciones y Planes LED
          </Button>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[images.ledGallery1, images.ledGallery2, images.ledGallery3].map((g, i) => (
              <Img key={g} src={g} sizes={SIZES.thumb} alt={`Anuncio en la valla LED ${i + 1}`} className="aspect-[4/3] w-full rounded-xl object-cover" />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- PORTFOLIO --------------------------- */
function Portfolio() {
  return (
    <section className="bg-surface-base py-16 md:py-24">
      <div className="gutter-x">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Kicker>Nuestro portafolio.</Kicker>
            <h2 className="mt-2 text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.06] text-brand-ink">
              Proyectos que generan resultados.
            </h2>
          </div>
          <Button to="/portafolio" variant="dark" className="self-start md:self-auto">
            Ver todo el portafolio
          </Button>
        </Reveal>

        {/* Filas sticky que se apilan al hacer scroll (como el original): cada fila
            se fija 40px más abajo que la anterior y deja asomar su borde. Solo desktop. */}
        <div className="mt-12 flex flex-col gap-10 lg:gap-8">
          {[projects.slice(0, 2), projects.slice(2, 4)].map((row, r) => (
            <div
              key={r}
              className="grid grid-cols-1 gap-x-6 gap-y-10 bg-surface-base md:grid-cols-2 lg:sticky lg:gap-x-8 lg:rounded-t-2xl lg:pt-3"
              style={{ top: 110 + r * 40 }}
            >
              {row.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <Link to={`/work-detail/${p.slug}`} className="group block rounded-2xl bg-white p-2 pb-4">
                    <div className="overflow-hidden rounded-xl">
                      <Img
                        src={p.cover}
                        sizes={SIZES.card}
                        alt={displayTitle(p.title)}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-4 px-2">
                      <h3 className="text-[15px] font-semibold leading-snug text-brand-ink">{displayTitle(p.title)}</h3>
                      <span className="shrink-0 rounded-full bg-surface-base px-3 py-1 text-xs font-medium text-black/60">
                        {p.tag}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ))}
          {/* Espaciador: da recorrido para que la última fila también se fije y deje asomar la anterior.
              (El padding del contenedor no sirve: el límite de un sticky es la caja de contenido del padre.) */}
          <div aria-hidden className="hidden h-40 lg:block" />
        </div>
      </div>
    </section>
  );
}

/* -------------------------- TESTIMONIALS -------------------------- */
const AVATARS = [
  "https://framerusercontent.com/images/5cnlPvtKPD7ij344vVh9FnprY.jpg?scale-down-to=512&width=2048&height=2048",
  "https://framerusercontent.com/images/p7a4NfJSJjS42GJkdURvszRGZQ.jpg?scale-down-to=512&width=2048&height=2048",
];

function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (el && card) setIndex(Math.round(el.scrollLeft / (card.offsetWidth + 20)));
  };

  const last = testimonials.length - 1;

  return (
    <section className="bg-surface-base py-16 md:py-24">
      {/* Como el original: reels a la izquierda, tarjeta blanca con reseñas a la derecha */}
      <div className="gutter-x grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.08fr] lg:gap-[60px]">
        <Reveal>
          <VideoReels items={testimonialVideos} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col rounded-[10px] bg-white p-6">
            <h2 className="max-w-md text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.04] text-brand-ink">
              Lo que dicen nuestros clientes.
            </h2>

            <div className="relative mt-8 flex-1">
              <div
                ref={track}
                onScroll={onScroll}
                className="flex h-full snap-x snap-mandatory gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {testimonials.map((t, i) => (
                  <figure
                    key={t.name}
                    data-card
                    className="flex w-[88%] shrink-0 snap-start flex-col rounded-[10px] bg-surface-card sm:w-[calc(50%-10px)]"
                  >
                    {/* Sin logo de Google: la ficha de BLUR en Google Maps aún no tiene reseñas publicadas. */}
                    <div className="flex items-center gap-3 border-b border-black/10 p-5">
                      <Img src={AVATARS[i % 2]} sizes={SIZES.avatar} className="h-10 w-10 rounded-full object-cover" />
                      <div>
                        <p className="text-[15px] font-semibold text-brand-ink">{t.name}</p>
                        <div className="mt-0.5 flex gap-0.5 text-[#f5b301]" aria-label="5 de 5 estrellas">
                          {Array.from({ length: 5 }).map((_, k) => (
                            <Star key={k} size={14} weight="fill" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="p-5 text-sm leading-relaxed text-black/70">“{t.text}”</blockquote>
                  </figure>
                ))}
              </div>

              {index > 0 && (
                <button
                  onClick={() => go(-1)}
                  aria-label="Testimonio anterior"
                  className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur transition-colors hover:bg-brand-teal"
                >
                  <CaretLeft size={18} weight="bold" />
                </button>
              )}
              {index < last - 1 && (
                <button
                  onClick={() => go(1)}
                  aria-label="Siguiente testimonio"
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur transition-colors hover:bg-brand-teal"
                >
                  <CaretRight size={18} weight="bold" />
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- CTA + FORM ----------------------------- */
function CtaForm() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Img src={images.ctaBg} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#0e1719]/88" />
      <div className="gutter-x relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <h2 className="text-[clamp(2rem,3.8vw,3.2rem)] font-medium leading-[1.06] text-white">
            ¿Listo para el alto impacto? Hablemos de tu marca.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
            BLUR se compromete a brindar soluciones creativas, innovadoras y estratégicas que potencien el valor de
            marca de sus clientes, desde la planificación hasta la ejecución integral.
          </p>
          <ul className="mt-8 flex flex-col items-start gap-3">
            {["15+ Años de Experiencia en Branding", "Metodología Integral (360)", "Equipo Liderado por Directora Creativa"].map((b) => (
              <li key={b} className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/90">
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Led />
      <Portfolio />
      <Testimonials />
      <CtaForm />
    </>
  );
}
