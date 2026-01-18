export const SITE_CONFIG = {
  name: "Fratelli's Helados",
  description: "Catering premium en food truck con helados artesanales y sodas italianas",
  email: "fratellisheladeria16@gmail.com",
  phone: "+52 55 1234 5678",
  address: "Ciudad de México, México",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100063525325496",
    instagram: "https://www.instagram.com/fratellishelados_mx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  calendly: "https://calendly.com/fratellishelados/30min",
} as const;

export const NAV_ITEMS = [
  { name: "Inicio", href: "hero" },
  { name: "Nosotros", href: "about" },
  { name: "Catering", href: "catering" },
  { name: "Sabores", href: "flavors" },
  { name: "Food Truck", href: "truck" },
  { name: "Testimonios", href: "testimonials" },
  { name: "Galería", href: "gallery" },
  { name: "Contacto", href: "contact" },
] as const;

export const TRUST_POINTS = [
  { title: "Más de una década", description: "de experiencia en catering premium." },
  { title: "Equipo propio", description: "capacitado en montaje y servicio." },
  { title: "Menús curados", description: "sabores artesanales y sodas italianas." },
] as const;

export const SERVICES = [
  {
    title: "Barra de helado artesanal",
    description: "Selección curada de sabores clásicos y de temporada, servidos al momento.",
  },
  {
    title: "Soda fountain premium",
    description: "Sodas italianas, frappés y bebidas personalizadas con mixología sin alcohol.",
  },
  {
    title: "Experiencia a medida",
    description: "Montaje elegante, branding discreto y atención que eleva tu evento.",
  },
] as const;

export const EVENT_TYPES = [
  "Bodas boutique y bodas destino",
  "Eventos corporativos y lanzamientos",
  "Cumpleaños y celebraciones privadas",
  "Experiencias VIP y activaciones de marca",
] as const;

export const FLAVOR_HIGHLIGHTS = [
  {
    name: "Chocolate oscuro",
    description: "Cacao intenso con final sedoso.",
    image: "/images/flavors/chocolate.png",
  },
  {
    name: "Vainilla",
    description: "Aromática y elegante.",
    image: "/images/flavors/vainilla.png",
  },
  {
    name: "Fresa",
    description: "Fruta fresca, textura cremosa.",
    image: "/images/flavors/fresa.png",
  },
  {
    name: "Café de especialidad",
    description: "Notas tostadas y cuerpo suave.",
    image: "/images/flavors/cafe.png",
  },
  {
    name: "Limón",
    description: "Refrescante y vibrante.",
    image: "/images/flavors/limon.png",
  },
  {
    name: "Nuez",
    description: "Textura crujiente y cremosa.",
    image: "/images/flavors/nuez.png",
  },
] as const;

export const SEASONAL_FLAVORS = [
  "Taro artesanal",
  "Queso con cereza",
  "Menta con chocolate",
  "Rompope",
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Fratelli’s elevó la experiencia de nuestros invitados con un servicio impecable y sabores artesanales.",
    name: "KBR",
    event: "Evento corporativo",
  },
  {
    quote:
      "Un food truck elegante, puntualidad absoluta y atención cálida en todo momento.",
    name: "Skusa México",
    event: "Evento de marca",
  },
  {
    quote:
      "Nuestros asistentes quedaron encantados. La puesta en escena fue premium y cuidada.",
    name: "Foro Pegaso",
    event: "Experiencia para invitados",
  },
] as const;

export const GALLERY_IMAGES = [
  { src: "/images/gallery/event-01.jpeg", alt: "Servicio en boda elegante" },
  { src: "/images/gallery/event-02.jpg", alt: "Helados artesanales en barra" },
  { src: "/images/gallery/event-03.jpg", alt: "Food truck en evento nocturno" },
  { src: "/images/gallery/event-04.jpg", alt: "Catering premium para invitados" },
  { src: "/images/gallery/event-05.jpg", alt: "Estación de sodas italianas" },
  { src: "/images/gallery/event-06.jpeg", alt: "Experiencia en evento corporativo" },
] as const;

export const ABOUT_HIGHLIGHTS = [
  {
    title: "Origen artesanal",
    description:
      "Nacimos con la obsesión por el helado auténtico: recetas propias, ingredientes reales y un servicio impecable.",
  },
  {
    title: "Catering con carácter",
    description:
      "Nuestro food truck es elegante, móvil y pensado para integrarse con la estética de tu evento.",
  },
  {
    title: "Calidad que se percibe",
    description:
      "Cada sabor se elabora en lotes pequeños para preservar textura, aroma y frescura.",
  },
] as const;
