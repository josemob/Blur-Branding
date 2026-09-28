import PageHero from "../components/PageHero";
import CtaBanner from "../components/CtaBanner";
import Marquee from "../components/Marquee";
import { Img, Kicker, Reveal } from "../components/ui";
import { about, clientLogos, images } from "../data/site";

export default function About() {
  const half = Math.ceil(clientLogos.length / 2);

  return (
    <>
      <PageHero
        image={images.aboutHero}
        position="center 35%"
        title="Estudio creativo que impulsa conexión e innovación."
        text="Convertimos la visión de nuestros clientes en marcas de alto impacto y crecimiento sostenido."
      />

      {/* Qué significa ser BLUR */}
      <section className="bg-surface-base py-20 md:py-28">
        <div className="container-x grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Img transparent src={images.aboutWordmark} alt="Marca BLUR" className="w-full max-w-md object-contain" />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <h2 className="text-[clamp(2rem,3.8vw,3.2rem)] font-medium leading-[1.06] text-brand-ink">¿Qué significa ser BLUR?</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-black/60">
              Somos un equipo creativo dedicado a la percepción y reconocimiento de marca, para la generación de alto
              impacto y diferenciación.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Misión / Visión / Valores (bento) */}
      <section className="bg-surface-base pb-20 md:pb-28">
        <div className="container-x grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {about.pillars.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08} className="lg:col-span-4">
              <article className="flex h-full flex-col rounded-3xl bg-white p-8 md:p-10">
                <Kicker>{p.label}:</Kicker>
                <h3 className="mt-3 text-[clamp(1.6rem,2.4vw,2.2rem)] font-medium leading-tight text-brand-ink">{p.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-black/60">{p.text}</p>
              </article>
            </Reveal>
          ))}
          <Reveal delay={0.16} className="md:col-span-2 lg:col-span-4">
            <article className="flex h-full flex-col rounded-3xl bg-gradient-to-br from-brand-teal to-brand-dark p-8 text-white md:p-10">
              <Kicker tone="dark" className="!text-white/85">Valores:</Kicker>
              <h3 className="mt-3 text-[clamp(1.6rem,2.4vw,2.2rem)] font-medium leading-tight">Lo que nos define</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/75">
                Nuestros principios se centran en la experiencia del cliente y la calidad del trabajo:
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {about.values.map((v) => (
                  <li key={v} className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium">
                    {v}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      {/* TEAM BLUR */}
      <section className="overflow-hidden bg-brand-darker py-20 text-white md:py-28">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Kicker tone="dark">Conoce al motor del estudio:</Kicker>
            <h2 className="mt-1 text-[clamp(3rem,7vw,5.5rem)] font-bold leading-none tracking-tighter">TEAM BLUR.</h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70">
              Detrás de cada marca exitosa y cada campaña de alto impacto en BLUR BRANDING STUDIO, hay un equipo de
              profesionales apasionados y comprometidos. Liderados por nuestra Directora Creativa, combinamos la
              experiencia estratégica con la energía innovadora para transformar tu visión en resultados tangibles.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <Img src={images.team} alt="Equipo de BLUR Branding Studio" className="aspect-[552/359] w-full rounded-3xl object-cover" />
          </Reveal>
        </div>
      </section>

      {/* Clientes */}
      <section className="bg-surface-base py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <h2 className="max-w-3xl text-[clamp(2rem,3.8vw,3.2rem)] font-medium leading-[1.06] text-brand-ink">
              Trabajamos con marcas que buscan seguridad y alto impacto.
            </h2>
          </Reveal>
        </div>
        {/* Franja oscura como el original: los logos de clientes son blancos */}
        <div className="mt-12 space-y-2 bg-[#0D2429] py-6">
          <Marquee items={clientLogos.slice(0, half)} />
          <Marquee items={clientLogos.slice(half)} reverse />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
