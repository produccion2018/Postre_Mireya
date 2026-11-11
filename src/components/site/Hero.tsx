import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ChefHat, ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "@/content/site";
import { cn } from "@/lib/utils";

const INTERVAL = 6500;
const SEAL_TEXT = "HECHO A MANO · POR ENCARGO · DESDE CASA · ";

/** Sello circular con texto que gira. */
function Seal() {
  return (
    <div className="pm-float relative grid h-36 w-36 place-items-center">
      <svg
        viewBox="0 0 200 200"
        className="pm-spin absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <path id="pm-seal-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-primary-foreground/85" style={{ fontSize: 13, letterSpacing: 3 }}>
          <textPath href="#pm-seal-path" textLength="486" lengthAdjust="spacing">
            {SEAL_TEXT}
          </textPath>
        </text>
      </svg>
      <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-cacao shadow-[0_0_40px_-6px_var(--color-gold)]">
        <ChefHat className="h-7 w-7" aria-hidden="true" />
      </span>
    </div>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const active = slides[index] ?? slides[0]!;
  const words = active.title.split(" ");

  const go = useCallback((next: number) => setIndex((next + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, index]);

  return (
    <section
      id="inicio"
      aria-roledescription="carrusel"
      aria-label="Presentación de Postres Mireya"
      onMouseEnter={() => {
        // En el recorrido automático del portfolio el carrusel no se frena con el mouse
        if (!window.location.search.includes("tour")) setPaused(true);
      }}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-cacao"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-[opacity,clip-path] duration-[1300ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
            i === index
              ? "opacity-100 [clip-path:inset(0_0_0_0)]"
              : "pointer-events-none opacity-0 [clip-path:inset(0_0_0_35%)]",
          )}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            width={1600}
            height={1104}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            className={cn(
              "h-full w-full object-cover transition-transform duration-[9000ms] ease-out",
              i === index ? "scale-110" : "scale-100",
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cacao/95 via-cacao/60 to-cacao/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-cacao/85 via-transparent to-cacao/40" />
        </div>
      ))}

      {/* Marco dorado fino */}
      <div className="pointer-events-none absolute inset-4 z-10 hidden rounded-[2rem] border border-gold/25 sm:block lg:inset-6" />

      {/* Etiqueta vertical */}
      <div className="absolute left-10 top-1/2 z-10 hidden -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] xl:block">
        <p
          className="pm-fade text-[0.6rem] uppercase tracking-[0.5em] text-gold/80"
          style={{ "--d": 600 } as CSSProperties}
        >
          Repostería artesanal · Hecho en casa
        </p>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-5 pb-36 sm:px-8 sm:pb-40">
        <div key={index} className="max-w-2xl text-primary-foreground">
          <p className="pm-fade flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-gold">
            <span className="h-px w-10 bg-gold" />
            {active.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] font-light sm:text-7xl">
            {words.map((w, i) => (
              <span key={i} className="pm-word">
                <span
                  style={{ "--i": i } as CSSProperties}
                  className={i === words.length - 1 ? "italic text-blush" : undefined}
                >
                  {w}
                </span>
                {i < words.length - 1 && " "}
              </span>
            ))}
          </h1>
          <p
            className="pm-fade mt-6 max-w-md text-base leading-relaxed text-primary-foreground/80 sm:text-lg"
            style={{ "--d": 450 } as CSSProperties}
          >
            {active.text}
          </p>
          <div
            className="pm-fade mt-9 flex flex-wrap gap-3"
            style={{ "--d": 600 } as CSSProperties}
          >
            <a
              href={active.cta.href}
              className="pm-shine group inline-flex h-14 items-center gap-3 rounded-full bg-primary pl-7 pr-2 text-sm tracking-wide text-primary-foreground shadow-[0_18px_40px_-14px_var(--color-rose)] transition-colors hover:bg-rose-deep"
            >
              {active.cta.label}
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
            {active.secondaryCta && (
              <a
                href={active.secondaryCta.href}
                className="inline-flex h-14 items-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-7 text-sm tracking-wide text-primary-foreground backdrop-blur-md transition-colors hover:border-gold hover:text-gold"
              >
                {active.secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Sello */}
      <div
        className="pm-fade absolute right-10 top-32 z-10 hidden lg:block xl:right-16"
        style={{ "--d": 800 } as CSSProperties}
      >
        <Seal />
      </div>

      {/* Controles */}
      <div
        className="pm-fade absolute inset-x-0 bottom-10 z-10 mx-auto flex max-w-6xl items-end justify-between gap-6 px-5 sm:px-8"
        style={{ "--d": 750 } as CSSProperties}
      >
        <div className="flex items-end gap-6">
          <p className="font-display text-primary-foreground">
            <span className="text-4xl font-light tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="ml-1 text-sm text-primary-foreground/50">
              / {String(slides.length).padStart(2, "0")}
            </span>
          </p>
          <div className="mb-3 flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir a la escena ${i + 1}: ${slide.title}`}
                aria-current={i === index}
                className="relative h-[3px] w-10 overflow-hidden rounded-full bg-primary-foreground/25 sm:w-16"
              >
                {i < index && <span className="absolute inset-0 bg-primary-foreground/70" />}
                {i === index && (
                  <span
                    key={index}
                    className="pm-progress absolute inset-0 bg-gold"
                    style={{
                      animationDuration: `${INTERVAL}ms`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden flex-col items-center gap-3 md:flex">
          <span className="pm-scroll h-12 w-px bg-primary-foreground/25" />
          <span className="text-[0.6rem] uppercase tracking-[0.4em] text-primary-foreground/60">
            Deslizá
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Escena anterior"
            className="grid h-12 w-12 place-items-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground backdrop-blur-md transition-all hover:border-gold hover:bg-gold hover:text-cacao"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Escena siguiente"
            className="grid h-12 w-12 place-items-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground backdrop-blur-md transition-all hover:border-gold hover:bg-gold hover:text-cacao"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
