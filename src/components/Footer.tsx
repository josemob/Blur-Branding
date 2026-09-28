import { Link } from "react-router-dom";
import { InstagramLogo, TiktokLogo, WhatsappLogo, EnvelopeSimple, MapPin } from "@phosphor-icons/react";
import Logo from "./Logo";
import { Button, Img } from "./ui";
import { contact, images } from "../data/site";

const menuLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/services" },
  { label: "Pantalla LED", href: "/pantalla-led" },
  { label: "Proyectos", href: "/portafolio" },
  { label: "Estudio BLUR", href: "/about" },
];

const serviceLinks = ["Diseño Web y UX/UI", "Branding y Rebranding", "Gestión de Redes Sociales"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-dark text-white/75">
      <Img src={images.footerBg} transparent className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-darker" />

      <div className="container-x relative grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo className="h-8 w-auto" color="#ffffff" />
          <p className="mt-6 text-lg font-semibold leading-snug text-white">
            BLUR: Marketing y posicionamiento de alto impacto.
          </p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/60">
            BLUR BRANDING STUDIO es un estudio creativo en Ciudad Guayana. Nos especializamos en el
            crecimiento de marcas mediante estrategias digitales y publicidad de Alto Impacto.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram de BLUR" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-teal">
              <InstagramLogo size={20} />
            </a>
            <a href={contact.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok de BLUR" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-teal">
              <TiktokLogo size={20} />
            </a>
          </div>
        </div>

        <nav aria-label="Menú del pie" className="lg:col-span-2 lg:col-start-6">
          <h2 className="text-[17px] font-semibold text-white">Menú</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            {menuLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.href} className="text-white/60 transition-colors hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h2 className="text-[17px] font-semibold text-white">Servicios</h2>
          <ul className="mt-5 space-y-3 text-[15px] text-white/60">
            {serviceLinks.map((s) => (
              <li key={s}>
                <Link to="/services" className="transition-colors hover:text-white">{s}</Link>
              </li>
            ))}
          </ul>
          <Button to="/services" className="mt-6">Ver más</Button>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <h2 className="text-[17px] font-semibold text-white">Contacto</h2>
          <ul className="mt-5 space-y-4 text-[15px]">
            <li>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/75 hover:text-white">
                <WhatsappLogo size={22} className="shrink-0 text-white" /> {contact.phonePlain}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-white/75 hover:text-white">
                <EnvelopeSimple size={22} className="shrink-0 text-white" /> {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/75">
              <MapPin size={22} className="mt-0.5 shrink-0 text-white" />
              <span className="leading-relaxed">{contact.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} BLUR Branding Studio C.A. <span className="font-semibold text-white/75">RIF: J-501827699.</span> Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/legal/privacidad" className="hover:text-white">Política de Privacidad</Link>
            <Link to="/legal/terminos" className="hover:text-white">Términos y Condiciones</Link>
            <Link to="/legal/cookies" className="hover:text-white">Política de Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
