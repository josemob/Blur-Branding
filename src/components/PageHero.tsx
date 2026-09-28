import { motion } from "motion/react";
import { EASE } from "./ui";
import { media } from "../lib/media";

const enter = (d: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: d, ease: EASE },
});

/** Hero fotográfico de páginas internas: título abajo a la izquierda, bajada abajo a la derecha. */
export default function PageHero({
  image,
  kicker,
  title,
  text,
  position = "center",
}: {
  image: string;
  kicker?: string;
  title: string;
  text: string;
  position?: string;
}) {
  const m = media(image);
  return (
    <section className="relative flex min-h-[520px] items-end overflow-hidden bg-brand-darker md:min-h-[600px] lg:h-[72dvh] lg:max-h-[760px]">
      <motion.img
        src={m.src}
        srcSet={m.srcSet}
        sizes="100vw"
        alt=""
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position }}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,5,0.92)] via-[rgba(22,40,46,0.55)] to-[rgba(22,40,46,0.1)]" />

      <div className="container-x relative grid w-full gap-6 pb-10 pt-32 md:pb-14 lg:grid-cols-12 lg:items-end">
        <motion.h1 {...enter(0.1)} className="lg:col-span-7">
          {kicker && (
            <span className="mb-1 block text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium leading-tight text-brand-tealLight">
              {kicker}
            </span>
          )}
          <span className="block text-[clamp(2rem,4.4vw,3.6rem)] font-bold leading-[1.05] tracking-tight text-white">
            {title}
          </span>
        </motion.h1>
        <motion.p
          {...enter(0.25)}
          className="max-w-sm text-[15px] font-medium leading-relaxed text-white/80 lg:col-span-4 lg:col-start-9 lg:justify-self-end"
        >
          {text}
        </motion.p>
      </div>
    </section>
  );
}
