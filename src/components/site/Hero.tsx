import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "@/content/site";
import { cn } from "@/lib/utils";

const INTERVAL = 6500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

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
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      className="relative h-[92svh] min-h-[560px] w-full overflow-hidden bg-cacao"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1100ms] ease-out",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
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
              i === index ? "scale-105" : "scale-100",
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cacao/85 via-cacao/55 to-cacao/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-cacao/70 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-5 pb-24 sm:px-8 sm:pb-28">
        <div key={index} className="fade-up max-w-xl text-primary-foreground">
          <p className="eyebrow text-blush">{slides[index].eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-6xl">
            {slides[index].title}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-primary-foreground/85">
            {slides[index].text}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={slides[index].cta.href}
              className="inline-flex h-12 items-center rounded-full bg-primary px-7 text-sm tracking-wide text-primary-foreground transition-colors hover:bg-rose-deep"
            >
              {slides[index].cta.label}
            </a>
            {slides[index].secondaryCta && (
              <a
                href={slides[index].secondaryCta.href}
                className="inline-flex h-12 items-center rounded-full border border-primary-foreground/45 px-7 text-sm tracking-wide text-primary-foreground transition-colors hover:bg-primary-foreground/12"
              >
                {slides[index].secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-3">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ir a la escena ${i + 1}: ${slide.title}`}
              aria-current={i === index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === index
                  ? "w-10 bg-primary-foreground"
                  : "w-4 bg-primary-foreground/45 hover:bg-primary-foreground/75",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Escena anterior"
            className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/40 text-primary-foreground transition-colors hover:bg-primary-foreground/15"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Escena siguiente"
            className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/40 text-primary-foreground transition-colors hover:bg-primary-foreground/15"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
