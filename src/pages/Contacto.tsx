import { WhatsappLogo, EnvelopeSimple, MapPin, InstagramLogo, TiktokLogo } from "@phosphor-icons/react";
import ContactForm from "../components/ContactForm";
import { Img, Reveal } from "../components/ui";
import { contact, images } from "../data/site";

const channels = [
  { icon: WhatsappLogo, label: "WhatsApp", value: contact.phonePlain, href: contact.whatsapp },
  { icon: EnvelopeSimple, label: "Correo", value: contact.email, href: `mailto:${contact.email}` },
  { icon: MapPin, label: "Estudio", value: contact.address, href: contact.maps },
];

export default function Contacto() {
  return (
    <section className="relative overflow-hidden bg-brand-darker">
      <Img src={images.ctaBg} eager transparent className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#0e1719]/90" />

      <div className="container-x relative grid min-h-[100dvh] grid-cols-1 gap-14 pb-20 pt-32 md:pt-40 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <h1 className="text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.05] text-white">
            ¿Listo para el alto impacto? <span className="font-bold">Hablemos de tu marca.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
            BLUR se compromete a brindar soluciones creativas, innovadoras y estratégicas que potencien el valor de
            marca de sus clientes, desde la planificación hasta la ejecución integral.
          </p>

          <ul className="mt-10 space-y-3">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-brand-cyan/50 hover:bg-white/[0.07]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-teal text-white">
                    <Icon size={22} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium text-white/55">{label}</span>
                    <span className="block text-[15px] font-medium text-white">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex gap-3">
            <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand-teal">
              <InstagramLogo size={20} />
            </a>
            <a href={contact.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand-teal">
              <TiktokLogo size={20} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
