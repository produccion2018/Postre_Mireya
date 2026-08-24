import { useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { currency } from "@/content/site";
import { useCart } from "@/lib/cart";
import { QuantityStepper } from "./QuantityStepper";
import { toast } from "sonner";

export function CartDrawer() {
  const { lines, total, count, setQty, open, setOpen, clear } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Tu pedido">
      <button
        type="button"
        aria-label="Cerrar pedido"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-cacao/45 backdrop-blur-[2px]"
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-lift">
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <p className="eyebrow">Pedido en línea</p>
            <h2 className="mt-1 font-display text-2xl">Tu selección</h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-stone transition-colors hover:bg-muted"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-8 w-8 text-stone" aria-hidden="true" />
              <p className="mt-4 text-sm text-muted-foreground">
                Todavía no elegiste ningún postre.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {lines.map((line) => (
                <li key={line.product.id} className="flex gap-4 border-b border-border pb-5">
                  <img
                    src={line.product.image}
                    alt={line.product.name}
                    width={900}
                    height={900}
                    loading="lazy"
                    className="h-20 w-20 rounded-sm object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between gap-3">
                      <h3 className="font-display text-lg leading-tight">{line.product.name}</h3>
                      <p className="text-sm tabular-nums text-rose-deep">
                        {currency(line.product.price * line.qty)}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {currency(line.product.price)} / {line.product.unit}
                    </p>
                    <div className="mt-3">
                      <QuantityStepper
                        value={line.qty}
                        onChange={(n) => setQty(line.product.id, n)}
                        label={line.product.name}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-border px-6 py-6">
          <div className="flex items-baseline justify-between">
            <span className="text-sm uppercase tracking-[0.2em] text-stone">Total</span>
            <span className="font-display text-2xl tabular-nums">{currency(total)}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {count} {count === 1 ? "artículo" : "artículos"} · demo sin pago en línea
          </p>
          <button
            type="button"
            disabled={lines.length === 0}
            onClick={() => {
              toast.success("Pedido registrado (demo)", {
                description: "En esta versión no se procesan pagos reales.",
              });
              clear();
              setOpen(false);
            }}
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm tracking-wide text-primary-foreground transition-colors hover:bg-rose-deep disabled:cursor-not-allowed disabled:opacity-45"
          >
            Confirmar pedido
          </button>
        </footer>
      </aside>
    </div>
  );
}
