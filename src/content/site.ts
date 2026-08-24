/**
 * CONTENIDO EDITABLE — POSTRES MIREYA
 * Todo el texto, precios, imágenes y datos de contacto viven aquí.
 * Para actualizar la web sólo hay que modificar este archivo.
 */
import heroMireya from "@/assets/hero-mireya.jpg";
import heroChocolate from "@/assets/hero-chocolate.jpg";
import heroFrutos from "@/assets/hero-frutos.jpg";
import mireyaRetrato from "@/assets/mireya-retrato.jpg";
import prodTortaAmarga from "@/assets/prod-torta-amarga.jpg";
import prodBrownie from "@/assets/prod-brownie.jpg";
import prodMaracuya from "@/assets/prod-maracuya.jpg";
import prodBombon from "@/assets/prod-bombon.jpg";
import prodBudin from "@/assets/prod-budin.jpg";
import prodLemonPie from "@/assets/prod-lemon-pie.jpg";
import prodZanahoria from "@/assets/prod-zanahoria.jpg";
import prodChocoMerengue from "@/assets/prod-choco-merengue.jpg";

export const brand = {
  name: "Postres Mireya",
  tagline: "Repostería artesanal, hecha en casa",
  /** Reemplazar por el logo definitivo cuando esté disponible (src/assets/logo.svg) */
  logoSrc: null as string | null,
};

export const nav = [
  { label: "Inicio", href: "#inicio" },
  { label: "Menú", href: "#menu" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

export type Slide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export const slides: Slide[] = [
  {
    image: heroMireya,
    alt: "Mireya sosteniendo una torta artesanal en su cocina",
    eyebrow: "Bienvenido",
    title: "Descubre el sabor de nuestros postres",
    text: "Cada torta se prepara a mano, en pequeñas cantidades y con ingredientes de verdad.",
    cta: { label: "Sobre mí", href: "#sobre-mi" },
    secondaryCta: { label: "Ver el menú", href: "#menu" },
  },
  {
    image: heroChocolate,
    alt: "Torta de chocolate con ganache brillante",
    eyebrow: "Clásicos de la casa",
    title: "Chocolate que se siente en la memoria",
    text: "Capas suaves, ganache intenso y el punto justo de dulzor.",
    cta: { label: "Pedir en línea", href: "#menu" },
  },
  {
    image: heroFrutos,
    alt: "Tarta de frutos rojos con frambuesas y frutillas frescas",
    eyebrow: "De temporada",
    title: "Frutos rojos recién elegidos",
    text: "Fruta fresca sobre masa quebrada horneada la misma mañana.",
    cta: { label: "Pedir en línea", href: "#menu" },
  },
];

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: "Tortas" | "Individuales" | "Para llevar";
  image: string;
};

export const products: Product[] = [
  {
    id: "torta-amarga",
    name: "Torta amarga",
    description: "Chocolate amargo 70%, poca azúcar, miga húmeda.",
    price: 18000,
    unit: "porción",
    category: "Tortas",
    image: prodTortaAmarga,
  },
  {
    id: "choco-merengue",
    name: "Chocolate con merengue",
    description: "Bizcocho de cacao coronado con merengue italiano tostado.",
    price: 19500,
    unit: "porción",
    category: "Tortas",
    image: prodChocoMerengue,
  },
  {
    id: "maracuya",
    name: "Maracuyá",
    description: "Mousse suave con glaseado ácido de maracuyá natural.",
    price: 19000,
    unit: "porción",
    category: "Tortas",
    image: prodMaracuya,
  },
  {
    id: "zanahoria",
    name: "Torta de zanahoria",
    description: "Especias suaves, nuez y frosting de queso crema.",
    price: 17500,
    unit: "porción",
    category: "Tortas",
    image: prodZanahoria,
  },
  {
    id: "lemon-pie",
    name: "Lemon pie",
    description: "Crema de limón sobre masa quebrada y merengue tostado.",
    price: 16500,
    unit: "porción",
    category: "Individuales",
    image: prodLemonPie,
  },
  {
    id: "brownie",
    name: "Brownie",
    description: "Denso, con nuez y corazón tibio de chocolate.",
    price: 7500,
    unit: "unidad",
    category: "Individuales",
    image: prodBrownie,
  },
  {
    id: "bombon",
    name: "Bombones",
    description: "Rellenos artesanales, caja de seis unidades.",
    price: 12000,
    unit: "caja",
    category: "Para llevar",
    image: prodBombon,
  },
  {
    id: "budin",
    name: "Budines",
    description: "Budín casero con glaseado de limón, ideal para el café.",
    price: 9500,
    unit: "unidad",
    category: "Para llevar",
    image: prodBudin,
  },
];

export const about = {
  eyebrow: "Sobre mí",
  title: "Mireya",
  /** TEXTO DEMO — reemplazar por la historia real */
  intro:
    "Mireya, madre, cocinera y apasionada por transformar ingredientes simples en momentos especiales.",
  paragraphs: [
    "Contenido de demostración: aquí irá la historia real de Mireya, cómo empezó a hornear y qué la mueve cada mañana.",
    "Este bloque está preparado para reemplazar libremente el texto, las fotografías y la información personal.",
  ],
  image: mireyaRetrato,
  imageAlt: "Retrato de Mireya amasando en su cocina",
  values: [
    { title: "Recetas de casa", text: "Las mismas que se cocinaban en familia, ajustadas con los años." },
    { title: "Ingredientes reales", text: "Manteca, fruta fresca y chocolate de verdad. Nada más." },
    { title: "Pequeñas tandas", text: "Se hornea por encargo, para que llegue recién hecho." },
  ],
};

export const gallery = [
  { src: heroMireya, alt: "Mireya con una torta terminada" },
  { src: prodLemonPie, alt: "Lemon pie con merengue tostado" },
  { src: heroFrutos, alt: "Tarta de frutos rojos" },
  { src: prodBombon, alt: "Bombones artesanales" },
  { src: heroChocolate, alt: "Torta de chocolate con ganache" },
  { src: prodBudin, alt: "Budín casero en rodajas" },
];

export const contact = {
  /** DATOS DEMO — reemplazar por los reales */
  phone: "+00 000 000 000",
  whatsapp: "https://wa.me/00000000000",
  email: "hola@postresmireya.com",
  location: "Pedidos con 48 h de anticipación · Entrega y retiro en la ciudad",
  hours: "Martes a sábado · 10:00 a 19:00",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
  ],
};

export const currency = (value: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(
    value,
  );
