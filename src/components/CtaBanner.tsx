import { Button, Reveal } from "./ui";
import Logo from "./Logo";

/**
 * Cierre de página con llamado a cotizar. Como el original: franja a todo el ancho
 * con el degradado radial teal y la marca BLUR en blanco como marca de agua.
 */
export default function CtaBanner() {
  return (
    // Deja una franja clara antes del footer (también oscuro), como el original.
    <div className="bg-surface-base pb-[clamp(3rem,6vw,5.5rem)]">
      <section
        className="relative isolate overflow-hidden py-20 text-white md:py-24 lg:py-28"
        style={{ background: "radial-gradient(85% 167% at 67.6% 80.9%, rgb(90,132,144) 0%, rgb(7,7,5) 100%)" }}
      >
        {/* Marca de agua: el logo BLUR en vector (nítido y completo), a la derecha */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-5 -z-10 hidden items-center md:right-10 md:flex lg:right-[60px]">
          <Logo color="#ffffff" className="h-auto w-[min(36vw,620px)] opacity-[0.16]" />
        </div>
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
