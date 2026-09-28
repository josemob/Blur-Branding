import { useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight, Play, Pause, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { mediaVideo } from "../lib/media";

/**
 * Carrusel de reels verticales (como el original: 2 visibles en desktop, flechas teal).
 * Los videos no se reproducen solos: se reproducen con sonido al tocarlos, de a uno
 * por vez, y se pausan al salir de pantalla. Solo se precarga el primer cuadro.
 */
export default function VideoReels({ items }: { items: { src: string; cover: number }[] }) {
  const track = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);
  const [muted, setMuted] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Pausa el video activo cuando el carrusel sale de la pantalla.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) {
        refs.current.forEach((v) => v?.pause());
        setPlaying(null);
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const started = useRef(new Set<number>());

  const toggle = (i: number) => {
    refs.current.forEach((v, k) => k !== i && v?.pause());
    const v = refs.current[i];
    if (!v) return;
    if (v.paused) {
      // La portada usa un segundo intermedio (#t=); la primera vez se reproduce desde el inicio.
      if (!started.current.has(i)) {
        v.currentTime = 0;
        started.current.add(i);
      }
      v.muted = muted;
      v.play().then(() => setPlaying(i)).catch(() => {
        // Si el navegador bloquea el audio, se reproduce en silencio.
        v.muted = true;
        setMuted(true);
        v.play().then(() => setPlaying(i));
      });
    } else {
      v.pause();
      setPlaying(null);
    }
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    refs.current.forEach((v) => v && (v.muted = next));
  };

  const go = (dir: 1 | -1) => {
    const el = track.current;
    const item = el?.querySelector<HTMLElement>("[data-reel]");
    if (el && item) el.scrollBy({ left: dir * (item.offsetWidth + 14), behavior: "smooth" });
  };

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  return (
    <div className="relative">
      <div
        ref={track}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-[14px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map(({ src, cover }, i) => {
          const on = playing === i;
          return (
            <div
              key={src}
              data-reel
              className="relative aspect-[302/567] w-[72%] shrink-0 snap-start overflow-hidden rounded-[10px] bg-brand-darker sm:w-[calc((100%-14px)/2)]"
            >
              <video
                ref={(v) => {
                  refs.current[i] = v;
                }}
                // #t=<segundo> muestra ese cuadro como portada (también en Safari/iOS).
                src={`${mediaVideo(src)}#t=${cover}`}
                preload="metadata"
                playsInline
                loop
                onEnded={() => setPlaying(null)}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => toggle(i)}
                aria-label={`${on ? "Pausar" : "Reproducir"} video ${i + 1} de ${items.length}`}
                className="group absolute inset-0 flex items-center justify-center"
              >
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-brand-ink shadow-lg transition-all duration-300 ${
                    on ? "scale-90 opacity-0 group-hover:opacity-100" : "group-hover:scale-105"
                  }`}
                >
                  {on ? <Pause size={26} weight="fill" /> : <Play size={26} weight="fill" className="translate-x-0.5" />}
                </span>
              </button>
              {on && (
                <button
                  onClick={toggleMute}
                  aria-label={muted ? "Activar sonido" : "Silenciar"}
                  className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur"
                >
                  {muted ? <SpeakerSlash size={18} weight="bold" /> : <SpeakerHigh size={18} weight="bold" />}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Flechas teal como el original */}
      <button
        onClick={() => go(-1)}
        disabled={atStart}
        aria-label="Video anterior"
        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-brand-cyan text-white shadow transition-opacity hover:bg-brand-teal disabled:pointer-events-none disabled:opacity-0"
      >
        <CaretLeft size={18} weight="bold" />
      </button>
      <button
        onClick={() => go(1)}
        disabled={atEnd}
        aria-label="Video siguiente"
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-brand-cyan text-white shadow transition-opacity hover:bg-brand-teal disabled:pointer-events-none disabled:opacity-0"
      >
        <CaretRight size={18} weight="bold" />
      </button>
    </div>
  );
}
