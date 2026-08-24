import { createFileRoute } from "@tanstack/react-router";
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

function Presentacion() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[4fr_5fr] lg:items-end">
        <Reveal>
          <div>
            <p className="eyebrow">Postres Mireya</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              Repostería de casa, con tiempo y paciencia
            </h2>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-base leading-relaxed text-muted-foreground">
            Todo se hornea por encargo: batidos a mano, rellenos frescos y decoración cuidada. Un
            menú corto, pensado para que cada postre salga como debe salir.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <CartProvider>
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
