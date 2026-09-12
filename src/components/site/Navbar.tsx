import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { brand, nav } from "@/content/site";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-background/92 border-b border-border backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Espacio reservado para el logo definitivo */}
        <a href="#inicio" className="flex flex-col leading-none" aria-label={`${brand.name} — inicio`}>
          {brand.logoSrc ? (
            <img src={brand.logoSrc} alt={brand.name} className="h-9 w-auto" />
          ) : (
            <>
              <span
                className={cn(
                  "font-display text-xl tracking-tight transition-colors sm:text-2xl",
                  scrolled || open ? "text-foreground" : "text-primary-foreground",
                )}
              >
                Postres <em className="not-italic text-primary">Mireya</em>
              </span>
              <span
                className={cn(
                  "mt-1 text-[0.6rem] uppercase tracking-[0.32em] transition-colors",
                  scrolled || open ? "text-muted-foreground" : "text-primary-foreground/80",
                )}
              >
                Repostería artesanal
              </span>
            </>
          )}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                scrolled ? "text-foreground hover:text-primary" : "text-primary-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Abrir pedido, ${count} artículos`}
            className={cn(
              "relative inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm transition-colors",
              scrolled || open
                ? "bg-primary text-primary-foreground hover:bg-rose-deep"
                : "bg-background/85 text-foreground hover:bg-background",
            )}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Pedir en línea</span>
            {count > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-cacao px-1 text-[0.65rem] text-primary-foreground">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full border transition-colors md:hidden",
              scrolled || open
                ? "border-border text-foreground"
                : "border-primary-foreground/50 text-primary-foreground",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="menu-movil"
          aria-label="Navegación móvil"
          className="border-t border-border bg-background px-5 pb-8 pt-4 md:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href} className="rule-soft first:border-t-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${i * 55}ms` }}
                  className="slide-in-left block py-4 font-display text-2xl text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
