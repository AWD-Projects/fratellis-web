export const SITE_CONFIG = {
  name: "Fratelli's Helados",
  description: "Fuente de sodas gourmet para eventos en CDMX: helado, café, postres, bebidas y botanas",
  email: "fratellisheladeria16@gmail.com",
  phone: "+52 56 1811 9658",
  address: "Ciudad de México, México",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100063525325496",
    instagram: "https://www.instagram.com/fratellishelados_mx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  calendly: "https://calendly.com/fratellishelados/30min",
} as const;

export const NAV_ITEMS = [
  { name: "Inicio", href: "hero" },
  { name: "Servicios", href: "catering" },
  { name: "Sabores", href: "flavors" },
  { name: "Clientes", href: "clients" },
  { name: "Nosotros", href: "about" },
  { name: "Galería", href: "gallery" },
  { name: "Contacto", href: "contact" },
] as const;

export const TRUST_POINTS = [
  { title: "Más de una década", description: "sirviendo en eventos." },
  { title: "Equipo propio", description: "capacitado en montaje y servicio." },
] as const;

export const SERVICES = [
  {
    title: "Barra de helado",
    description: "Helado servido al momento, con el menú completo de sabores.",
  },
  {
    title: "Soda fountain y café",
    description: "Sodas italianas, frappés, café y bebidas a tu gusto, con mixología sin alcohol.",
  },
  {
    title: "Postres y botanas",
    description: "Lo que acompaña al helado y a las bebidas para que nada falte en la mesa.",
  },
  {
    title: "Montaje a medida",
    description: "Montaje discreto que respeta la estética de tu evento, con branding sutil y atención durante todo el servicio.",
  },
] as const;

export const EVENT_TYPES = [
  "Bodas boutique y bodas destino",
  "Eventos corporativos y lanzamientos",
  "Eventos escolares e institucionales",
  "Cumpleaños y celebraciones privadas",
  "Activaciones de marca y eventos VIP",
] as const;

export const FLAVOR_HIGHLIGHTS = [
  {
    name: "Chocolate oscuro",
    description: "Cacao intenso con final sedoso.",
    image: "/images/flavors/chocolate.png",
    tint: "#4A3A36",
  },
  {
    name: "Vainilla",
    description: "Aromática y de sabor limpio.",
    image: "/images/flavors/vainilla.png",
    tint: "#817D6E",
  },
  {
    name: "Fresa",
    description: "Fruta fresca, sabor directo.",
    image: "/images/flavors/fresa.png",
    tint: "#7D6D70",
  },
  {
    name: "Café de especialidad",
    description: "Notas tostadas y cuerpo suave.",
    image: "/images/flavors/cafe.png",
    tint: "#736A5B",
  },
  {
    name: "Limón",
    description: "Refrescante y vibrante.",
    image: "/images/flavors/limon.png",
    tint: "#617140",
  },
  {
    name: "Nuez",
    description: "Textura crujiente y cremosa.",
    image: "/images/flavors/nuez.png",
    tint: "#80786E",
  },
] as const;

export const SEASONAL_FLAVORS = [
  "Taro artesanal",
  "Queso con cereza",
  "Menta con chocolate",
  "Rompope",
] as const;

export const CLIENTS = [
  "American School Foundation",
  "Tec de Monterrey, campus CDMX",
  "Colegio Madrid CDMX",
  "KBR",
  "Skusa México",
  "Foro Pegaso",
] as const;
export const GALLERY_IMAGES = [
  { src: "/images/gallery/event-01.jpeg", alt: "Tres bebidas de la soda fountain de Fratelli's frente al logotipo dorado" },
  { src: "/images/gallery/event-02.jpg", alt: "Bola de helado de fresa en vaso Fratelli's con un arcoíris al fondo" },
  { src: "/images/gallery/event-03.jpg", alt: "Equipo de Fratelli's sirviendo durante un evento" },
  { src: "/images/gallery/event-04.jpg", alt: "Helado de menta en vaso Fratelli's durante un evento" },
  { src: "/images/gallery/event-05.jpg", alt: "Logotipo dorado de Fratelli's en el equipo de servicio durante un evento" },
  { src: "/images/gallery/event-06.jpeg", alt: "Cono de helado de fresa frente al logotipo de Fratelli's" },
] as const;

export const ABOUT_HIGHLIGHTS = [
  {
    title: "Recetas propias",
    description:
      "Nacimos con la obsesión por el helado auténtico: cada sabor sale de nuestras propias recetas.",
  },
  {
    title: "Ingredientes reales",
    description:
      "Elegimos ingredientes reales para que lo que se prueba en tu evento sepa igual que en nuestra heladería.",
  },
  {
    title: "Cadena de frío",
    description:
      "Cuidamos la temperatura desde la heladería hasta tu mesa para que el helado llegue firme y en su punto.",
  },
] as const;
