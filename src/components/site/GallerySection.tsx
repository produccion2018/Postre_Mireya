import { gallery } from "@/content/site";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function GallerySection() {
  return (
    <section id="galeria" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">Galería</p>
          <h2 className="mt-3 max-w-lg font-display text-4xl leading-tight sm:text-5xl">
            El día a día en la cocina
          </h2>
        </Reveal>

        <div className="mt-12 grid auto-rows-[190px] grid-cols-2 gap-4 sm:auto-rows-[230px] lg:grid-cols-4">
          {gallery.map((item, i) => (
            <Reveal
              key={item.alt}
              delay={(i % 4) * 80}
              className={cn(
                "h-full",
                i === 0 && "col-span-2 row-span-2",
                i === 3 && "lg:row-span-2",
              )}
            >
              <figure className="h-full overflow-hidden rounded-sm bg-muted">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
