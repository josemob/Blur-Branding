import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { MotionConfig } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { getSeo, ROBOTS_INDEX, SITE_URL } from "./seo";

// Páginas internas en chunks separados: el Inicio carga más liviano.
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Portafolio = lazy(() => import("./pages/Portafolio"));
const PantallaLed = lazy(() => import("./pages/PantallaLed"));
const Contacto = lazy(() => import("./pages/Contacto"));
const WorkDetail = lazy(() => import("./pages/WorkDetail"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Actualiza (o crea) un <meta>/<link> del head. */
function setHead(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/**
 * En cada cambio de ruta: metadatos (título, descripción, canonical, robots),
 * y scroll al tope o al ancla si la URL trae #hash.
 */
function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const seo = getSeo(pathname);
    document.title = seo.title;
    const meta = (name: string) => () => Object.assign(document.createElement("meta"), { name });
    setHead('meta[name="description"]', meta("description"), "content", seo.description);
    setHead('meta[name="robots"]', meta("robots"), "content", seo.noindex ? "noindex" : ROBOTS_INDEX);
    setHead('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }), "href", `${SITE_URL}${encodeURI(seo.path)}`);

    if (hash) {
      const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 250);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function PageFallback() {
  return (
    <div className="min-h-[100dvh] bg-surface-base pt-32" aria-busy="true" aria-label="Cargando">
      <div className="container-x space-y-4">
        <div className="h-10 w-2/3 max-w-xl animate-pulse rounded-xl bg-black/[0.06]" />
        <div className="h-5 w-1/2 max-w-md animate-pulse rounded-lg bg-black/[0.05]" />
        <div className="mt-10 aspect-[16/7] w-full animate-pulse rounded-3xl bg-black/[0.05]" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    // reducedMotion="user": con prefers-reduced-motion se omiten transformaciones (solo fundidos).
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-brand-ink">
        Saltar al contenido
      </a>
      <RouteEffects />
      <Navbar />
      <main id="main">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/portafolio" element={<Portafolio />} />
            <Route path="/pantalla-led" element={<PantallaLed />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/work-detail/:slug" element={<WorkDetail />} />
            <Route path="/legal/:doc" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </MotionConfig>
  );
}
