import PageHero from "../components/PageHero";
import CtaBanner from "../components/CtaBanner";
import { Button, Img, Reveal } from "../components/ui";
import { images, serviceDetails } from "../data/site";

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Services() {
  return (
    <>
      <PageHero
        image={images.servicesHero}
        position="center 30%"
        kicker="Impulsa tu marca al máximo nivel:"
        title="Estrategia, creatividad y resultados."
        text="Ofrecemos soluciones 360, desde la concepción de tu identidad hasta la ejecución de campañas digitales y de alto impacto local."
      />

      <section className="bg-surface-base py-10 md:py-16">
        {/* Ancho máximo para que las tres columnas mantengan proporción en pantallas grandes */}
        <div className="container-x mx-auto max-w-[1400px]">
          {serviceDetails.map((s) => (
            <article
              key={s.n}
              id={slug(s.title)}
              className="grid scroll-mt-24 grid-cols-1 gap-6 border-t border-brand-ink/15 py-12 md:grid-cols-2 md:gap-8 md:py-16 lg:grid-cols-12 lg:gap-12"
            >
              {/* Número arriba del título; columna angosta (3/12) */}
              <Reveal className="md:col-span-2 lg:col-span-3">
                <h2 className="text-brand-ink">
                  <span className="block font-display text-lg font-medium tabular-nums text-brand-tealLight md:text-xl">({s.n})</span>
                  <span className="mt-2 block text-balance text-[clamp(1.9rem,2.8vw,2.6rem)] font-bold leading-[1.05] tracking-tight">
                    {s.title}
                  </span>
                </h2>
              </Reveal>

              {/* Imagen (4/12) */}
              <Reveal delay={0.05} className="lg:col-span-4">
                <div className="overflow-hidden rounded-2xl">
                  <Img
                    src={s.img}
                    alt={s.title}
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              </Reveal>

              {/* Texto (5/12) */}
              <Reveal delay={0.1} className="flex flex-col lg:col-span-5">
                <h3 className="text-balance text-[22px] font-semibold leading-snug text-brand-ink">{s.heading}</h3>
                <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-black/60">{s.desc}</p>
                <div className="mt-6 border-l-2 border-brand-teal pl-4">
                  <p className="text-[17px] font-semibold text-brand-ink">{s.subTitle}</p>
                  <p className="mt-1 text-base text-black/60">{s.subText}</p>
                </div>
                <Button to={s.to ?? "/contacto"} className="mt-8 self-start">
                  {s.cta}
                </Button>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
