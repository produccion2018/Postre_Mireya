import { useEffect, useMemo, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { currency, products, type Product } from "@/content/site";
import { useCart } from "@/lib/cart";
import { QuantityStepper } from "./QuantityStepper";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const categories = ["Todo", "Tortas", "Individuales", "Para llevar"] as const;

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1400);
    return () => window.clearTimeout(t);
  }, [added]);

  return (
    <Reveal delay={(index % 3) * 110}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-2 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-gold/60 hover:shadow-lift">
        <div className="relative aspect-4/3 overflow-hidden rounded-[1.35rem] bg-muted">
          <img
            src={product.image}
            alt={product.name}
            width={900}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cacao/60 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
          <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-cacao/55 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-white backdrop-blur-md">
            {product.category}
          </span>
          <span className="absolute bottom-4 right-4 rounded-full bg-background/95 px-4 py-1.5 font-display text-lg text-rose-deep shadow-soft">
            {currency(product.price)}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
          <h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-rose-deep">
            {product.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <p className="mt-3 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-stone">
            <span className="h-px w-6 bg-gold" />
            por {product.unit}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-6">
            <QuantityStepper value={qty} onChange={setQty} label={product.name} min={1} />
            <button
              type="button"
              onClick={() => {
                add(product, qty);
                setAdded(true);
              }}
              className={cn(
                "pm-shine inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm transition-all duration-300 hover:-translate-y-0.5",
                added
                  ? "bg-gold text-cacao"
                  : "bg-cacao text-primary-foreground shadow-[0_12px_28px_-14px_var(--color-cacao)] hover:bg-rose-deep",
              )}
            >
              {added ? (
                <>
                  <Check className="pm-pop h-4 w-4" aria-hidden="true" /> Agregado
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" /> Agregar
                </>
              )}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function MenuSection() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("Todo");
  const visible = useMemo(
    () => (filter === "Todo" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="menu" className="pm-dots relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-blush blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-gold/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">El menú</p>
              <h2 className="mt-3 max-w-lg font-display text-4xl font-light leading-tight sm:text-6xl">
                Lo que sale del <em className="italic text-rose-deep">horno</em> cada semana
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Elegí lo que quieras probar, ajustá la cantidad y armá tu pedido. Los precios son de
              demostración y se editan desde el contenido del sitio.
            </p>
          </div>
        </Reveal>

        <div
          className="mt-10 inline-flex flex-wrap gap-1 rounded-full border border-border/70 bg-background/80 p-1.5 shadow-soft backdrop-blur"
          role="group"
          aria-label="Filtrar por categoría"
        >
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={cn(
                "h-10 rounded-full px-5 text-sm transition-all duration-300",
                filter === c
                  ? "bg-cacao text-primary-foreground shadow-[0_8px_20px_-10px_var(--color-cacao)]"
                  : "text-muted-foreground hover:bg-blush hover:text-rose-deep",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div id="menu-cards" className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
