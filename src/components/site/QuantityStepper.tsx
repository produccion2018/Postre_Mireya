import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
  label,
  min = 0,
}: {
  value: number;
  onChange: (next: number) => void;
  label: string;
  min?: number;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-muted/70">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label={`Quitar una unidad de ${label}`}
        className="grid h-9 w-9 place-items-center rounded-full text-stone transition-colors hover:bg-secondary hover:text-secondary-foreground"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span
        aria-live="polite"
        className="min-w-8 text-center text-sm font-medium tabular-nums text-foreground"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label={`Agregar una unidad de ${label}`}
        className="grid h-9 w-9 place-items-center rounded-full text-stone transition-colors hover:bg-secondary hover:text-secondary-foreground"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
