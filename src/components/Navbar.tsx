import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import Logo from "./Logo";
import { Button } from "./ui";
import { nav } from "../data/site";
import { findProject } from "../data/projects";

// Rutas cuyo primer bloque es una imagen oscura: el navbar arranca transparente.
const DARK_HERO = ["/", "/services", "/about", "/portafolio", "/pantalla-led", "/contacto"];

export default function Navbar() {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Como el original: cambia apenas hay scroll (bajando o subiendo) y vuelve al llegar arriba.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 30));

  useEffect(() => setOpen(false), [pathname]);

  // Bloquea el scroll del body y permite cerrar con Escape cuando el menú está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // El detalle de proyecto abre con cabecera oscura (si el slug existe; si no, es la página 404).
  const darkHero = DARK_HERO.includes(pathname) || (pathname.startsWith("/work-detail/") && !!findProject(pathname.slice(13)));
  const solid = scrolled || !darkHero || open;

  return (
    <header
      // Original: arriba, vidrio casi transparente (blanco 3% + blur 15px); con scroll, blanco sólido.
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        solid ? "bg-white" : "bg-white/[0.03] backdrop-blur-[15px]"
      }`}
    >
      <div
        className={`container-x flex items-center justify-between transition-[height] duration-500 ease-out ${
          solid ? "h-16 md:h-[94px]" : "h-[72px] md:h-[100px]"
        }`}
      >
        <Link to="/" aria-label="BLUR, ir al inicio" className="flex min-h-11 shrink-0 items-center">
          <Logo className="h-6 w-auto transition-colors duration-500 md:h-8" color={solid ? "#3f5b63" : "#ffffff"} />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `relative whitespace-nowrap text-[15px] font-medium transition-colors duration-500 ${
                  solid ? "text-brand-ink/80 hover:text-brand-ink" : "text-white/85 hover:text-white"
                } ${isActive ? (solid ? "!text-brand-ink" : "!text-white") : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full ${solid ? "bg-brand-teal" : "bg-white"}`}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <Button to="/contacto" className="ml-1">Contáctanos</Button>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors lg:hidden ${
            solid ? "bg-brand-ink/5 text-brand-ink" : "bg-white/15 text-white backdrop-blur"
          }`}
        >
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Menú móvil"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="container-x h-[calc(100dvh-64px)] overflow-y-auto pb-8 pt-4 lg:hidden"
          >
            <ul className="flex flex-col">
              {[{ label: "Inicio", href: "/" }, ...nav].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `block border-b border-brand-ink/10 py-4 text-2xl font-medium ${
                        isActive ? "text-brand-teal" : "text-brand-ink"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <Button to="/contacto" className="mt-8">Contáctanos</Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
