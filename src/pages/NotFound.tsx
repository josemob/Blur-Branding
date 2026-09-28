import { Button } from "../components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[80dvh] items-center bg-surface-base pb-20 pt-32">
      <div className="container-x">
        <p className="text-[clamp(5rem,16vw,11rem)] font-bold leading-none tracking-tighter text-brand-ink/10">404</p>
        <h1 className="mt-2 text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium text-brand-ink">Esta página no existe.</h1>
        <p className="mt-3 max-w-md text-base text-black/60">
          Puede que el enlace haya cambiado. Vuelve al inicio o revisa nuestros proyectos.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/">Ir al inicio</Button>
          <Button to="/portafolio" variant="dark">Ver portafolio</Button>
        </div>
      </div>
    </section>
  );
}
