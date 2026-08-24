import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contact } from "@/content/site";
import { Reveal } from "./Reveal";

export function ContactSection() {
  return (
    <section id="contacto" className="bg-background py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <div>
            <p className="eyebrow">Contacto</p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Encarguemos tu próximo postre
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Escribinos por WhatsApp o correo y coordinamos sabor, tamaño y fecha de entrega. Los
              datos de esta demo son provisionales y se editan desde el contenido del sitio.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={contact.whatsapp}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm text-primary-foreground transition-colors hover:bg-rose-deep"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Escribir por WhatsApp
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm transition-colors hover:border-primary hover:text-rose-deep"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Enviar un correo
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <dl className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
            {[
              { icon: Phone, label: "Teléfono", value: contact.phone },
              { icon: Mail, label: "Email", value: contact.email },
              { icon: MapPin, label: "Entregas", value: contact.location },
              { icon: Clock, label: "Horario", value: contact.hours },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-card p-6">
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                <dt className="mt-3 text-xs uppercase tracking-[0.2em] text-stone">{label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
