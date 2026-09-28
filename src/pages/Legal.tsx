import { useParams } from "react-router-dom";
import { Button } from "../components/ui";
import { contact } from "../data/site";
import NotFound from "./NotFound";

const titles: Record<string, string> = {
  privacidad: "Política de Privacidad",
  terminos: "Términos y Condiciones",
  cookies: "Política de Cookies",
};

// TODO(contenido): el sitio original enlaza estos documentos pero no los publica.
// Reemplazar este aviso por el texto legal aprobado por BLUR Branding Studio C.A.
export default function Legal() {
  const { doc } = useParams();
  const title = doc ? titles[doc] : undefined;
  if (!title) return <NotFound />;

  return (
    <section className="bg-surface-base pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-[720px] px-5 md:px-10">
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-brand-ink">{title}</h1>
        <p className="mt-6 text-[17px] leading-relaxed text-black/65">
          Estamos actualizando este documento. Si necesitas información sobre el tratamiento de tus datos o las
          condiciones de nuestros servicios, escríbenos a{" "}
          <a href={`mailto:${contact.email}`} className="font-semibold text-brand-teal underline-offset-4 hover:underline">
            {contact.email}
          </a>
          .
        </p>
        <p className="mt-4 text-[15px] text-black/50">BLUR Branding Studio C.A. · RIF: J-501827699</p>
        <Button to="/contacto" className="mt-8">Contáctanos</Button>
      </div>
    </section>
  );
}
