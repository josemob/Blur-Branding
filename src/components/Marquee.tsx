import { media } from "../lib/media";

/**
 * Fila infinita de logos (CSS puro). Los logos son blancos: van sobre fondo
 * oscuro a opacidad completa. Se pausa al pasar el mouse; con
 * prefers-reduced-motion el CSS global anula la animación.
 */
export default function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <ul
        className={`flex w-max items-center gap-16 py-5 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {loop.map((src, i) => {
          const m = media(src);
          return (
            <li key={i} className="shrink-0" aria-hidden={i >= items.length}>
              <img
                src={m.src}
                srcSet={m.srcSet}
                sizes="160px"
                width={m.width}
                height={m.height}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-14 w-auto object-contain opacity-85 transition-opacity duration-300 hover:opacity-100 md:h-[72px]"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
