import { about } from "@/content/site";
import { Reveal } from "./Reveal";

export function AboutSection() {
  return (
    <section id="sobre-mi" className="bg-background py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[5fr_6fr] lg:items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -left-4 -top-4 hidden h-full w-full rounded-sm border border-blush sm:block" />
            <img
              src={about.image}
              alt={about.imageAlt}
              width={1104}
              height={1408}
              loading="lazy"
              className="relative aspect-4/5 w-full rounded-sm object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <p className="eyebrow">{about.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">{about.title}</h2>
            <p className="mt-6 font-display text-xl leading-relaxed text-cacao sm:text-2xl">
              {about.intro}
            </p>
            {about.paragraphs.map((p) => (
              <p key={p} className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {about.values.map((v) => (
                <div key={v.title} className="border-t border-border pt-4">
                  <dt className="font-display text-lg">{v.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
