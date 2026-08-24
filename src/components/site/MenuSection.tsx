import { useMemo, useState } from "react";
import { currency, products, type Product } from "@/content/site";
import { useCart } from "@/lib/cart";
import { QuantityStepper } from "./QuantityStepper";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const categories = ["Todo", "Tortas", "Individuales", "Para llevar"] as const;

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <Reveal delay={(index % 3) * 90}>
      <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card">
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            width={900}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-stone">
            {product.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl">{product.name}</h3>
            <p className="font-display text-lg text-rose-deep">{currency(product.price)}</p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone">por {product.unit}</p>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
            <QuantityStepper value={qty} onChange={setQty} label={product.name} min={1} />
            <button
              type="button"
              onClick={() => add(product, qty)}
              className="inline-flex h-10 items-center rounded-full bg-secondary px-5 text-sm text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Agregar
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
    <section id="menu" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">El menú</p>
              <h2 className="mt-3 max-w-lg font-display text-4xl leading-tight sm:text-5xl">
                Lo que sale del horno cada semana
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Elegí lo que quieras probar, ajustá la cantidad y armá tu pedido. Los precios son de
              demostración y se editan desde el contenido del sitio.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={cn(
                "h-9 rounded-full border px-4 text-sm transition-colors",
                filter === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary hover:text-rose-deep",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
