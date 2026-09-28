import { Button, Reveal } from "./ui";
import Logo from "./Logo";

/**
 * Cierre de página con llamado a cotizar: tarjeta con esquinas redondeadas,
 * separada de los bordes, con el degradado radial teal del original y el logo
 * BLUR en blanco como marca de agua.
 */
export default function CtaBanner() {
  return (
    <section className="bg-surface-base pb-[clamp(3rem,6vw,5.5rem)] pt-6">
      <div className="container-x">
        <Reveal>
          <div
            className="relative isolate overflow-hidden rounded-3xl px-7 py-14 text-white sm:px-10 md:py-20 lg:px-14 lg:py-24"
            style={{ background: "radial-gradient(85% 167% at 67.6% 80.9%, rgb(90,132,144) 0%, rgb(7,7,5) 100%)" }}
          >
            {/* Marca de agua: el logo BLUR en vector (nítido y completo), a la derecha */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-10 -z-10 hidden items-center md:flex lg:right-14">
              <Logo color="#ffffff" className="h-auto w-[min(32vw,540px)] opacity-[0.16]" />
            </div>
            <div className="max-w-[900px]">
              <h2 className="text-balance text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.08]">
                Comienza tu proyecto de posicionamiento y reconocimiento.
              </h2>
              <p className="mt-5 max-w-[640px] text-[15px] leading-relaxed text-white/75 md:text-base">
                En BLUR, su visión es nuestra prioridad. Agenda una llamada sin compromiso y descubra cómo podemos
                impulsar el reconocimiento y posicionamiento de su negocio.
              </p>
              <Button to="/contacto" className="mt-8">
                {/* En móvil el texto completo no cabe dentro de la tarjeta */}
                <span>
                  Solicitar cotización<span className="hidden sm:inline"> personalizada</span>
                </span>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
