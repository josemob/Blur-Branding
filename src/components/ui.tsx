import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { media, SIZES } from "../lib/media";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Aparición al entrar en viewport. El estado inicial es el mismo en servidor y
 * cliente (seguro para el prerender); con prefers-reduced-motion, MotionConfig
 * (en App) elimina el desplazamiento y deja solo un fundido breve.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Kicker sobre los títulos de sección (22px en desktop, como el original). */
export function Kicker({ children, tone = "light", className = "" }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p
      className={`font-display text-[clamp(1.125rem,1.6vw,1.375rem)] font-medium leading-snug ${
        tone === "light" ? "text-brand-teal" : "text-brand-tealLight"
      } ${className}`}
    >
      {children}
    </p>
  );
}

type Variant = "teal" | "outline" | "dark";

const variants: Record<Variant, { box: string; icon: string }> = {
  teal: { box: "bg-brand-teal text-white hover:bg-[#4c7480]", icon: "bg-white/20" },
  outline: { box: "border border-white/60 text-white hover:bg-white/10", icon: "border border-white/60" },
  dark: { box: "bg-brand-ink text-white hover:bg-black", icon: "bg-white/15" },
};

/** Botón de marca: etiqueta + flecha en su cajita (patrón del sitio original). */
export function Button({
  to,
  href,
  children,
  className = "",
  variant = "teal",
  type,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: Variant;
  type?: "submit" | "button";
}) {
  const v = variants[variant];
  const cls = `group inline-flex min-h-11 items-center gap-3 whitespace-nowrap rounded-xl py-1.5 pl-5 pr-1.5 text-[15px] font-semibold transition-[background-color,transform] duration-300 active:scale-[0.98] ${v.box} ${className}`;
  const content = (
    <>
      {children}
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${v.icon}`}>
        <ArrowUpRight
          size={16}
          weight="bold"
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </>
  );
  if (to) return <Link to={to} className={cls}>{content}</Link>;
  if (href)
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>
        {content}
      </a>
    );
  return <button type={type ?? "button"} className={cls}>{content}</button>;
}

/**
 * Imagen optimizada: usa la versión WebP local con srcSet, reserva su proporción
 * (width/height reales, evita saltos de layout) y carga diferida salvo `eager`.
 */
export function Img({
  src,
  alt = "",
  className = "",
  eager = false,
  transparent = false,
  sizes = SIZES.full,
}: {
  src: string;
  alt?: string;
  className?: string;
  eager?: boolean;
  /** PNG con transparencia: sin fondo de placeholder detrás. */
  transparent?: boolean;
  sizes?: string;
}) {
  const m = media(src);
  return (
    <img
      src={m.src}
      srcSet={m.srcSet}
      sizes={m.srcSet ? sizes : undefined}
      width={m.width}
      height={m.height}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...(eager ? { fetchPriority: "high" as const } : {})}
      className={`${transparent ? "" : "bg-surface-soft"} ${className}`}
    />
  );
}
