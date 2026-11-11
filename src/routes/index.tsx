import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, HandHeart, Leaf } from "lucide-react";
import { products } from "@/content/site";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/lib/cart";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { MenuSection } from "@/components/site/MenuSection";
import { AboutSection } from "@/components/site/AboutSection";
import { GallerySection } from "@/components/site/GallerySection";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Postres Mireya — Repostería artesanal por encargo" },
      {
        name: "description",
        content:
          "Tortas, budines y postres artesanales hechos a mano por Mireya. Mirá el menú, armá tu pedido en línea y coordiná la entrega.",
      },
      { property: "og:title", content: "Postres Mireya — Repostería artesanal por encargo" },
      {
        property: "og:description",
        content:
          "Tortas, budines y postres artesanales hechos a mano por Mireya. Menú, galería y pedidos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/** Intro: cortina crema con la firma de Mireya (solo en la primera carga). */
function Intro() {
  const first = "Postres".split("");
  const second = "Mireya".split("");
  return (
    <div className="pm-intro" aria-hidden="true">
      <div className="flex flex-col items-center text-center">
        <p
          className="pm-intro-char text-[0.65rem] uppercase tracking-[0.5em] text-stone"
          style={{ "--i": 0 } as CSSProperties}
        >
          Repostería artesanal
        </p>
        <p className="mt-4 font-display text-6xl font-light leading-none text-cacao sm:text-8xl">
          {first.map((ch, i) => (
            <span key={`a${i}`} className="pm-intro-char" style={{ "--i": i + 1 } as CSSProperties}>
              {ch}
            </span>
          ))}{" "}
          <em className="italic text-rose-deep">
            {second.map((ch, i) => (
              <span
                key={`b${i}`}
                className="pm-intro-char"
                style={{ "--i": i + 9 } as CSSProperties}
              >
                {ch}
              </span>
            ))}
          </em>
        </p>
        <div className="pm-line mt-6 w-56" />
      </div>
    </div>
  );
}

const pillars = [
  {
    icon: HandHeart,
    title: "Hecho a mano",
    text: "Batidos a mano y decoración cuidada, pieza por pieza.",
  },
  {
    icon: CalendarCheck,
    title: "Por encargo",
    text: "Se hornea cuando lo pedís, nunca queda en vitrina.",
  },
  { icon: Leaf, title: "Ingredientes frescos", text: "Rellenos del día y fruta de estación." },
];

function Presentacion() {
  const names = products.map((p) => p.name);
  const loop = [...names, ...names];

  return (
    <section id="presentacion" className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-32">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" /> Postres Mireya{" "}
              <span className="h-px w-8 bg-gold" />
            </p>
            <h2 className="mt-6 font-display text-4xl font-light leading-[1.1] sm:text-6xl">
              Repostería de casa, con <em className="italic text-rose-deep">tiempo</em> y paciencia
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Todo se hornea por encargo: batidos a mano, rellenos frescos y decoración cuidada. Un
              menú corto, pensado para que cada postre salga como debe salir.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div className="group h-full rounded-[1.75rem] border border-border/70 bg-card p-7 text-center shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-gold/60 hover:shadow-lift">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blush text-rose-deep transition-all duration-500 group-hover:rotate-12 group-hover:bg-rose-deep group-hover:text-primary-foreground">
                  <p.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Cinta infinita con el menú */}
      <div className="-rotate-1 border-y border-gold/40 bg-cacao py-5">
        <div className="pm-marquee">
          {loop.map((n, i) => (
            <span
              key={i}
              className="flex items-center gap-8 pr-8 font-display text-2xl font-light italic text-primary-foreground sm:text-3xl"
            >
              {n}
              <span className="text-base not-italic text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className="h-16" />
    </section>
  );
}

/* ───────── Recorrido automático (?tour=1, lo usa el portfolio) ─────────
   Ejecuta un paso cada `interval` ms. Si el usuario hace clic, scroll o toca la
   pantalla, se pausa y retoma solo después de unos segundos sin actividad. */
function useDemoTour(steps: Array<() => void>, interval = 3600, startDelay = 3200) {
  const [active, setActive] = useState(false);
  const stepsRef = useRef(steps);
  stepsRef.current = steps;

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("tour")) return;
    setActive(true);
    let i = 0;
    let paused = false;
    let idle = 0;
    let timer = 0;
    const onUser = () => {
      paused = true;
      window.clearTimeout(idle);
      idle = window.setTimeout(() => (paused = false), 9000);
    };
    const evs = ["wheel", "touchstart", "mousedown", "keydown"] as const;
    evs.forEach((e) => window.addEventListener(e, onUser, { passive: true }));
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        if (paused) return;
        const list = stepsRef.current;
        list[i % list.length]?.();
        i++;
      }, interval);
    }, startDelay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
      window.clearTimeout(idle);
      evs.forEach((e) => window.removeEventListener(e, onUser));
    };
  }, [interval, startDelay]);

  return active;
}

const goTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 70,
    behavior: "smooth",
  });
};
const top = () => window.scrollTo({ top: 0, behavior: "smooth" });
const menuFilter = (n: number) =>
  document.querySelectorAll<HTMLButtonElement>('#menu [role="group"] button')[n]?.click();

function Index() {
  const touring = useDemoTour([
    () => top(),
    () => {},
    () => goTo("presentacion"),
    () => goTo("menu"),
    () => menuFilter(1),
    () => goTo("menu-cards"),
    () => menuFilter(2),
    () => menuFilter(3),
    () => menuFilter(0),
    () => goTo("sobre-mi"),
    () => goTo("galeria"),
    () => goTo("contacto"),
  ]);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("pm-ready")) return;
    const t = window.setTimeout(() => root.classList.add("pm-ready"), 3000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <CartProvider>
      <Intro />
      {touring && (
        <div className="pointer-events-none fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-gold/50 bg-cacao/85 px-4 py-2 text-xs text-primary-foreground shadow-lift backdrop-blur-md">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-gold align-middle" />
          Recorrido automático · tocá para explorar
        </div>
      )}
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:text-primary-foreground"
      >
        Saltar al menú
      </a>
      <Navbar />
      <main>
        <Hero />
        <Presentacion />
        <MenuSection />
        <AboutSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <CartDrawer />
      <Toaster position="bottom-center" />
    </CartProvider>
  );
}
