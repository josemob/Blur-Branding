import { useEffect, useRef } from "react";
import { Crosshair, Eye, ArrowsClockwise, Check, WhatsappLogo, EnvelopeSimple, MapPin, MapTrifold } from "@phosphor-icons/react";
import PageHero from "../components/PageHero";
import { Button, Img, Reveal } from "../components/ui";
import { contact, images, led, videos } from "../data/site";
import { media, mediaVideo, SIZES } from "../lib/media";

const benefitIcons = [Crosshair, Eye, ArrowsClockwise];
const MAPS = contact.maps;

/** Video decorativo en loop. Mismo HTML en servidor y cliente; se pausa si el usuario prefiere menos movimiento. */
function BgVideo({ src, poster, className = "" }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.pause();
  }, []);
  return (
    <video
      ref={ref}
      src={mediaVideo(src)}
      poster={poster ? media(poster).src : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      className={className}
    />
  );
}

export default function PantallaLed() {
  return (
    <>
      <PageHero
        image={images.ledHero}
        kicker="Impulsa tu marca al máximo nivel:"
        title="Publicidad LED en Ciudad Guayana."
        text="Ofrecemos soluciones 360, desde la concepción de tu identidad hasta la ejecución de campañas digitales y de alto impacto local."
      />

      {/* Por qué elegir LED */}
      <section className="bg-surface-base py-20 md:py-28">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 className="text-[clamp(2rem,3.8vw,3.2rem)] font-medium leading-[1.06] text-brand-ink">
              ¿Por qué elegir la publicidad LED en Ciudad Guayana?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-black/60">
              Llega a miles de clientes potenciales diariamente en los puntos más concurridos de Ciudad Guayana. La
              solución más rápida para el reconocimiento masivo de tu negocio.
            </p>
            <ul className="mt-10 space-y-3">
              {led.benefits.map((b, i) => {
                const Icon = benefitIcons[i];
                return (
                  <li
                    key={b.title}
                    className="flex items-start gap-4 rounded-2xl bg-white p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(27,42,46,0.45)] md:p-6"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-teal text-white">
                      <Icon size={24} weight="bold" />
                    </span>
                    <span>
                      <span className="block text-lg font-semibold leading-snug text-brand-ink">{b.title}</span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-black/60">{b.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <div className="overflow-hidden rounded-3xl bg-white">
              <BgVideo src={videos.ledSquare} poster={images.ledPoster} className="aspect-square w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Planes */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="container-x relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal className="hidden lg:col-span-3 lg:block">
            <Img transparent sizes="25vw" src={images.ledPresenter} alt="Asesora de BLUR presentando los planes LED" className="-mb-28 w-full object-contain" />
          </Reveal>

          <div className="lg:col-span-9">
            <Reveal>
              <h2 className="text-[clamp(2rem,3.8vw,3.2rem)] font-medium leading-[1.06] text-brand-ink">Conoce nuestros planes</h2>
              <p className="mt-3 text-base text-black/60">Precios mensuales en USD. Incluye adaptación de tus piezas al formato de la pantalla.</p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch">
              {led.plans.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.08} className={p.featured ? "md:-mt-6" : ""}>
                  <article
                    className={`flex h-full flex-col rounded-3xl p-7 ${
                      p.featured
                        ? "bg-gradient-to-b from-brand-cyan to-brand-teal text-white shadow-[0_24px_60px_-20px_rgba(46,156,180,0.55)]"
                        : "bg-brand-ink text-white"
                    }`}
                  >
                    {p.featured && (
                      <span className="mb-4 self-start rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">Más elegido</span>
                    )}
                    <p className="text-[clamp(2.6rem,4vw,3.4rem)] font-extrabold leading-none tracking-tight">
                      {p.price}
                      <span className="text-[0.55em]">$</span>
                    </p>
                    <p className="mt-4 text-sm text-white/70">Consigue más impresiones</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-wide">{p.name}</h3>
                    <ul className="mt-6 flex-1 space-y-3 border-t border-white/15 pt-6">
                      {p.items.map((it) => (
                        <li key={it} className="flex gap-2.5 text-[15px] leading-snug text-white/85">
                          <Check size={18} weight="bold" className="mt-0.5 shrink-0" />
                          {it}
                        </li>
                      ))}
                    </ul>
                    <Button
                      href={`${contact.whatsapp}?text=${encodeURIComponent(`Hola BLUR, me interesa el plan LED ${p.name} (${p.price}$).`)}`}
                      variant={p.featured ? "outline" : "teal"}
                      className="mt-8 self-start"
                    >
                      Contáctanos
                    </Button>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section className="relative overflow-hidden bg-brand-darker py-20 text-white md:py-28">
        <Img src={images.ledHero} transparent className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-darker via-brand-darker/90 to-brand-darker/60" />
        <div className="container-x relative grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="text-[clamp(2rem,3.8vw,3.2rem)] font-medium leading-[1.06]">
              Nuestra ubicación estratégica en Puerto Ordaz, Edo. Bolívar.
            </h2>
            <ul className="mt-8 space-y-4 text-[15px]">
              <li>
                <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/85 hover:text-white">
                  <WhatsappLogo size={22} /> {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-white/85 hover:text-white">
                  <EnvelopeSimple size={22} /> {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 font-semibold text-white">
                <MapPin size={22} className="mt-0.5 shrink-0" /> {led.address}
              </li>
            </ul>
            <dl className="mt-10 grid grid-cols-2 gap-4">
              {led.stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <dt className="order-2 mt-1 text-sm text-white/65">{s.label}</dt>
                  <dd className="text-[clamp(2rem,3.4vw,2.8rem)] font-bold leading-none tracking-tight">{s.value}</dd>
                </div>
              ))}
            </dl>
            <Button href={MAPS} variant="outline" className="mt-8">
              Abrir en Google Maps
            </Button>
          </Reveal>

          <Reveal delay={0.1} className="grid grid-cols-5 gap-4 lg:col-span-6 lg:col-start-7">
            <a href={MAPS} target="_blank" rel="noreferrer" className="group relative col-span-3 overflow-hidden rounded-2xl" aria-label="Ver ubicación en el mapa">
              <Img src={images.ledMap} sizes={SIZES.third} alt="Mapa de la ubicación de la valla en Alta Vista" className="h-full min-h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-ink">
                <MapTrifold size={14} weight="bold" /> Alta Vista, Carrera Guri
              </span>
            </a>
            <Img src={images.ledStreet} sizes={SIZES.thumb} alt="Valla LED vista desde la calle" className="col-span-2 h-full min-h-[260px] w-full rounded-2xl object-cover" />
          </Reveal>
        </div>
      </section>

      {/* CTA con video */}
      <section className="bg-surface-base px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-3xl">
            <BgVideo src={videos.ledCta} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-brand-darker/75" />
            <div className="relative px-6 py-16 text-center md:px-16 md:py-24">
              <h2 className="mx-auto max-w-3xl text-[clamp(2rem,3.8vw,3.2rem)] font-medium leading-[1.06] text-white">
                ¿Necesita una solución de posicionamiento inmediato?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75">
                Contacte directamente a nuestro equipo de ventas para discutir las mejores estrategias de video y
                ubicación para su marca en la valla LED.
              </p>
              <Button
                href={`${contact.whatsapp}?text=${encodeURIComponent("Hola BLUR, quiero asesoría para pautar en la valla LED.")}`}
                className="mt-9"
              >
                Contactar a un asesor LED
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
