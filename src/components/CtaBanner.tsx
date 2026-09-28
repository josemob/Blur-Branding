import { Button, Reveal } from "./ui";
import { images } from "../data/site";
import { media } from "../lib/media";

/**
 * Cierre de página con llamado a cotizar. Como el original: franja a todo el ancho
 * con el degradado radial teal y la marca BLUR en blanco como marca de agua.
 */
export default function CtaBanner() {
  const mark = media(images.ctaBanner);
  return (
    // Deja una franja clara antes del footer (también oscuro), como el original.
    <div className="bg-surface-base pb-[clamp(3rem,6vw,5.5rem)]">
      <section
        className="relative isolate overflow-hidden py-20 text-white md:py-24 lg:py-28"
        style={{ background: "radial-gradient(85% 167% at 67.6% 80.9%, rgb(90,132,144) 0%, rgb(7,7,5) 100%)" }}
      >
        {/* Marca de agua (PNG blanco transparente), decorativa */}
        <img
          src={mark.src}
          srcSet={mark.srcSet}
          sizes="(min-width: 1024px) 50vw, 90vw"
          width={mark.width}
          height={mark.height}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute -right-[12%] top-1/2 -z-10 w-[90vw] max-w-none -translate-y-1/2 opacity-[0.07] sm:-right-[6%] lg:right-0 lg:w-[48vw]"
        />
        <div className="gutter-x">
          <Reveal className="max-w-[940px]">
            <h2 className="text-balance text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.08]">
              Comienza tu proyecto de posicionamiento y reconocimiento.
            </h2>
            <p className="mt-5 max-w-[640px] text-[15px] leading-relaxed text-white/75 md:text-base">
              En BLUR, su visión es nuestra prioridad. Agenda una llamada sin compromiso y descubra cómo podemos
              impulsar el reconocimiento y posicionamiento de su negocio.
            </p>
            <Button to="/contacto" className="mt-8">
              Solicitar cotización personalizada
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
