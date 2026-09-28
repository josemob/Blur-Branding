import { useState, type FormEvent } from "react";
import { CheckCircle, WarningCircle, CircleNotch } from "@phosphor-icons/react";
import { serviceOptions, contact } from "../data/site";
import { Button } from "./ui";

type Status = "idle" | "sending" | "sent";
type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

const field =
  "w-full rounded-xl border bg-white/[0.06] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/45 focus:border-brand-cyan focus:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-brand-cyan/40";

/**
 * Formulario de contacto (fondo oscuro). Sin backend propio: al enviar valida
 * y abre WhatsApp con el mensaje armado, que es el canal de venta del estudio.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const service = String(data.get("service") || "");
    const message = String(data.get("message") || "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Escribe tu nombre.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Revisa el formato del correo.";
    if (phone && !/^[\d\s+()-]{7,}$/.test(phone)) next.phone = "Revisa el número de teléfono.";
    if (message.length < 10) next.message = "Cuéntanos un poco más (mín. 10 caracteres).";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    const text = `Hola BLUR, soy ${name}.%0AServicio: ${service}%0AEmail: ${email}${
      phone ? `%0ATeléfono: ${phone}` : ""
    }%0A%0A${encodeURIComponent(message)}`;
    window.setTimeout(() => {
      window.open(`${contact.whatsapp}?text=${text}`, "_blank", "noopener");
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    }, 500);
  };

  if (status === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-8">
        <CheckCircle size={44} weight="duotone" className="text-brand-cyan" />
        <h3 className="mt-5 text-2xl font-semibold text-white">¡Mensaje listo!</h3>
        <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-white/70">
          Abrimos WhatsApp con tu consulta. Si no se abrió, escríbenos al {contact.phonePlain}.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-brand-cyan underline-offset-4 hover:underline"
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field id="name" label="Nombre" error={errors.name}>
        <input id="name" name="name" autoComplete="name" placeholder="Tu nombre" className={`${field} ${errors.name ? "border-red-400" : "border-white/15"}`} />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" placeholder="tu@empresa.com" className={`${field} ${errors.email ? "border-red-400" : "border-white/15"}`} />
      </Field>
      <Field id="phone" label="Teléfono" hint="Opcional" error={errors.phone}>
        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+58 412 000 0000" className={`${field} ${errors.phone ? "border-red-400" : "border-white/15"}`} />
      </Field>
      <Field id="service" label="Servicio de interés">
        <select id="service" name="service" className={`${field} appearance-none border-white/15 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10`}>
          {serviceOptions.map((o) => (
            <option key={o} className="text-brand-ink">{o}</option>
          ))}
        </select>
      </Field>
      <Field id="message" label="Mensaje" error={errors.message} className="sm:col-span-2">
        <textarea id="message" name="message" rows={4} placeholder="Cuéntanos sobre tu marca y lo que necesitas" className={`${field} resize-none ${errors.message ? "border-red-400" : "border-white/15"}`} />
      </Field>
      <div className="sm:col-span-2">
        {status === "sending" ? (
          <span className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-teal px-5 text-[15px] font-semibold text-white">
            <CircleNotch size={18} className="animate-spin" /> Enviando
          </span>
        ) : (
          <Button type="submit">Enviar</Button>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-white/85">
        {label}
        {hint && <span className="text-xs font-normal text-white/50">{hint}</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="flex items-center gap-1.5 text-sm text-red-300">
          <WarningCircle size={15} weight="bold" /> {error}
        </p>
      )}
    </div>
  );
}
