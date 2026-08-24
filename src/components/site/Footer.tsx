import { brand, contact, nav } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="font-display text-2xl text-footer-foreground">
            Postres <em className="not-italic text-blush">Mireya</em>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-footer-muted">
            {brand.tagline}. Tortas y postres por encargo, preparados en pequeñas tandas.
          </p>
        </div>

        <nav aria-label="Navegación del pie">
          <h2 className="text-xs uppercase tracking-[0.24em] text-footer-muted">Navegación</h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-blush">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs uppercase tracking-[0.24em] text-footer-muted">Contacto</h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li>
              <a href={`tel:${contact.phone}`} className="transition-colors hover:text-blush">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="transition-colors hover:text-blush">
                {contact.email}
              </a>
            </li>
            {contact.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="transition-colors hover:text-blush">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-footer-muted/25">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-footer-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.</p>
          <p>Sitio de demostración · contenido editable</p>
        </div>
      </div>
    </footer>
  );
}
