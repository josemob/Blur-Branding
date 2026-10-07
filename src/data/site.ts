// Datos compartidos del sitio Blur Branding

const IMG = "https://framerusercontent.com/images/";

export const images = {
  heroBillboard: IMG + "nDJGqyoUDNWK5V6RmxNQKQNKlE.png?scale-down-to=1024&width=2860&height=2668",
  capsula: IMG + "Sak63Ty37Y98YzpLA2sRw3DiOM.jpg?scale-down-to=1024&width=1344&height=2048",
  ledMain: IMG + "2R6q9QEVo1QFTMVDXOs8Q3ytUA.png?scale-down-to=1024&width=1306&height=1140",
  ledGallery1: IMG + "UYixxb3mV4MggiMssMCKQbP88w.jpg?width=490&height=366",
  ledGallery2: IMG + "CjmRCYbIOcEgdlVMQoLrfk41Ohc.jpg?width=486&height=574",
  ledGallery3: IMG + "OzjEG1UpKUUd6uDYleNEU5YbeFc.jpg?width=490&height=366",
  ctaBg: IMG + "d6BOeck31fc49gXH2za3NvqAdZA.png?scale-down-to=2048&width=3030&height=918",
  servicesHero: IMG + "sh2Jec3GvsgYD4S2JZWx9LvjkaY.jpg?scale-down-to=2048&width=3368&height=5988",
  aboutHero: IMG + "cZwDPO1ChiZlViAQKuV82lApo.jpg?width=1080&height=1920",
  ledHero: IMG + "gpHv6exPskgKgnfPLzYx8mNBpU.png?width=1344&height=768",
  aboutWordmark: IMG + "rixbTkPthDTHhdmiueIafSndbw.png?scale-down-to=1024&width=2140&height=832",
  team: IMG + "ITRiclRelxIAXtOofQaao8FmmM.png?scale-down-to=1024&width=2208&height=1436",
  ctaBanner: IMG + "cyQJwbC2kv8EXIGoMTJNImBXOU.png?scale-down-to=1024&width=1562&height=1561",
  footerBg: IMG + "mNEMJY8aWCjbz2YVazMAOjYytPo.png?scale-down-to=2048&width=3030&height=736",
  ledPoster: IMG + "LVQUP99kQ8AZGTQKGzBpi7RjrmE.png?scale-down-to=1024&width=1080&height=1439",
  ledPresenter: IMG + "PfHlo3qN7ZShrNyK4K7IBRAorss.png?scale-down-to=1024&width=1749&height=3060",
  ledMap: IMG + "EoJFAwxThICTqSVtjbnIhOUE4c.png?scale-down-to=1024&width=1600&height=1200",
  ledStreet: IMG + "tjfnuagCUlKjmGm411b9xwya3s.png?width=562&height=771",
};

export const videos = {
  ledSquare: "https://framerusercontent.com/assets/69dtvAUXcKo5Ij17BzkQLKLORU.mp4",
  ledCta: "https://framerusercontent.com/assets/OzegYX31f8atEysayWRu3RNaJzo.mp4",
};

/**
 * Reels verticales (720x1280) del carrusel de testimonios del Inicio.
 * `cover`: segundo del video que se usa como portada (medido para evitar el
 * fundido a negro inicial de algunos reels).
 */
export const testimonialVideos = [
  { src: "https://framerusercontent.com/assets/ODO0VyuCymqMj0ivWbCaDF1UXE.mp4", cover: 1.5 },
  { src: "https://framerusercontent.com/assets/Tc9Fdm6jQz7wdi8iCuq7Wfmf7Hk.mp4", cover: 0.5 },
  { src: "https://framerusercontent.com/assets/oXGttKV5ALLcKTKbIJnnxVAI.mp4", cover: 1 },
  { src: "https://framerusercontent.com/assets/67VC2e8OtFcprdqtI0mtJ4FFQw.mp4", cover: 1 },
  { src: "https://framerusercontent.com/assets/GCU1Xuc9H9Pc8q4e0YyUhqLIlo.mp4", cover: 8 },
];

/* ---------- Página Servicios (detalle de cada servicio) ---------- */
export const serviceDetails = [
  { n: "01", title: "Identidad visual y branding", heading: "El alma de tu negocio: identidad visual y branding estratégico", desc: "Convertimos tu visión en una marca memorable de alto impacto, garantizando diferenciación y reconocimiento.", subTitle: "Diseño de logo y manual de marca", subText: "Las reglas para el crecimiento consistente.", cta: "Empezar con mi identidad de marca", img: IMG + "cOgbxeKI1M6wNOYpebRP8uqTkr0.jpg?scale-down-to=1024&width=4501&height=4500" },
  { n: "02", title: "Diseño Web", heading: "Tu activo digital: diseño web estratégico (UI/UX)", desc: "Diseñamos plataformas digitales rápidas y funcionales, enfocadas en la usabilidad (UX) y la conversión de tus visitas en clientes.", subTitle: "Creación de página web (UI/UX)", subText: "El esqueleto y la estética de tu negocio en línea.", cta: "Actualización y optimización web", img: IMG + "4fNVzfWBEnHz0XENzYc4xypZdA8.png?scale-down-to=1024&width=842&height=1120" },
  { n: "03", title: "Redes Sociales", heading: "Conexión y gestión digital: redes sociales que venden", desc: "Vamos más allá de la grilla. Creamos estrategias de contenido para generar comunidades y aumentar tu alcance.", subTitle: "Estrategia y gestión de contenido", subText: "Planificación, diseño y creación de grilla mensual.", cta: "Ver paquetes de redes", img: IMG + "Nj5Hnabb0ZMYg0VdBNn6Fn0DNE.jpg?scale-down-to=1024&width=1920&height=1080" },
  { n: "04", title: "Audiovisuales", heading: "Producción de alto impacto: video y fotografía profesional", desc: "Contenido que detiene el scroll. Elevamos la calidad visual de tu marca con videos y fotografía profesional.", subTitle: "Video profesional y spots", subText: "Desde el guion hasta la post-producción final.", cta: "Cotizar producción", img: IMG + "qQRMwoYSgMoe7VV1IFANoSZ6o.jpg?scale-down-to=1024&width=1080&height=1920" },
  { n: "05", title: "Material Impreso", heading: "Conexión física: diseño e impresión de material P.O.P. y gift cards", desc: "Activamos tu punto de venta. Diseño funcional y acabados premium para brochures, gift cards y todo tu material físico.", subTitle: "Diseño y producción de P.O.P.", subText: "Pendones, cartelería y exhibidores funcionales.", cta: "Ver acabados e impresión", img: IMG + "utI6M0i4SNBOsB8zlgkurxzzm0.png?width=900&height=583" },
  { n: "06", title: "Pantalla LED", heading: "Máxima visibilidad local: publicidad en pantalla LED", desc: "El camino más rápido al reconocimiento masivo en los puntos estratégicos de Ciudad Guayana.", subTitle: "Planes de exposición", subText: "Video de 10, 20 o 30 segundos y formatos estáticos.", cta: "Ver ubicaciones y tarifas", to: "/pantalla-led", img: IMG + "qCvJDYaq5T9onI0oKMdg2lh0hMw.jpg?scale-down-to=1024&width=3337&height=5535" },
  { n: "07", title: "Capacitaciones y asesorías", heading: "Crecimiento y conocimiento: consultoría estratégica BLUR", desc: "Compartimos 15 años de experiencia para impulsar el conocimiento de tu equipo y la estrategia de tu marca.", subTitle: "Capacitación para equipos", subText: "Entrenamiento en branding, RRSS y ventas digitales.", cta: "Reservar asesoría", img: IMG + "MzxcQi1wQ8cyU1TbPzOlLH4U.jpg?width=685&height=1013" },
  { n: "08", title: "Sesión fotográfica", heading: "Proyecta la imagen que tu éxito merece", desc: "Capturamos la esencia de tu marca personal o corporativa con técnica de élite: retratos que comunican autoridad, confianza y profesionalismo.", subTitle: "¿Listo para renovar tu imagen?", subText: "Agenda tu sesión hoy.", cta: "Agendar sesión", img: IMG + "HXWrTcz3Ke9FzjjzGLuKO2qRBg.jpg?width=672&height=672" },
  { n: "09", title: "Cobertura de eventos", heading: "Capturamos la importancia de cada hito", desc: "Transformamos tus eventos en un registro de honor y tradición, cuidando que cada detalle refleje la integridad de tu organización.", subTitle: "Haz que tu evento perdure", subText: "Foto y video para lanzamientos, galas y actos corporativos.", cta: "Cotizar cobertura", img: IMG + "gmCQN5UyI9Q7EvWVuWa12gF1HAM.jpg?width=1344&height=1344" },
];

/* ---------- Quiénes Somos ---------- */
export const about = {
  pillars: [
    { label: "Misión", title: "Nuestro propósito", text: "Crear y potenciar marcas mediante un servicio innovador y creativo, facilitando la conexión con los clientes para elevar la calidad y el valor de sus empresas. Nos enfocamos en el crecimiento tangible y el reconocimiento efectivo de la marca." },
    { label: "Visión", title: "Nuestro alcance futuro", text: "Ser reconocidos como un proveedor de servicios integrales que trasciende el marketing, operando como socio estratégico en el mercado nacional e internacional. Buscamos ser el referente de seguridad y formalidad." },
  ],
  values: ["Creatividad", "Conexión", "Innovación", "Servicio y Calidad", "Crecimiento"],
};

export const clientLogos = [
  "LSWTBOEYZwS8i9IyCzQu3BVQxV4.png?width=164&height=202",
  "JoIO0Ihjk2lwR6QHCNlN6nW47s.png?width=188&height=190",
  "o0P9JCUJMfymuLVo3veUPFb48.png?width=190&height=178",
  "GlYfgSvyvkqrFV9OUXqNQxDxYrA.png?width=124&height=168",
  "A1rUZvFKty4OdwiAkYTOrrhAAcI.png?width=204&height=166",
  "xTiWGgi2f5yl1imdvfIz4FMAJvk.png?width=148&height=162",
  "rlkiEU4xkQQzLsJ5FC1kQYQtQ0.png?width=196&height=162",
  "gWVj7yVi4MwHsz5rnYRueuQFnBM.png?width=250&height=142",
  "6tk9LfeOIFqXkm919ve4MTbQSM.png?width=132&height=138",
  "fT78tieFi9jzxVLEfc5xrqsCj8s.png?width=270&height=132",
  "zSgNfoYXLNoixs9qNq0n5jSsGr8.png?width=138&height=124",
  "HZgeg1WQGubCknMGKCruzdJojK4.png?width=196&height=122",
  "sPblu63y2Yt1NLApBhedDLt614.png?width=276&height=112",
  "LBNajDn0i33aMDj7S3W9Z8WxJQ.png?width=262&height=110",
  "32iXBL0IMIvkNFrnn5rRZgX2u8A.png?width=264&height=108",
  "FATGWCupdpmW3wIQ6okTISSRbsg.png?width=280&height=104",
  "rrwwoNjt5BqWoL7HnKsFkzmsOU.png?width=264&height=96",
  "NBOLgn0Omh3RYUXniuDd9y98DTw.png?width=282&height=88",
  "5fnt3Kgpdz1U2sngzS4fSjQu8.png?width=266&height=84",
  "ITsODxP6PAe4gNNqo7Ev2AF3bY.png?width=272&height=70",
].map((f) => IMG + f);

/* ---------- Valla LED ---------- */
export const led = {
  benefits: [
    { title: "Ubicación estratégica", text: "En Alta Vista, con tráfico lento y flujo peatonal constante en el corazón de Puerto Ordaz." },
    { title: "Máxima visibilidad 24/7", text: "Tu anuncio en pantalla todos los días, a toda hora, con más de 150 reproducciones diarias por video." },
    { title: "Flexibilidad", text: "Cambia tu anuncio rápido cuando lo necesites: promociones, lanzamientos o fechas especiales." },
  ],
  plans: [
    { name: "FULL", price: 310, featured: false, items: ["4 videos de 10 segundos, con +150 repeticiones diarias por video.", "2 videos de 20 segundos, con +150 repeticiones diarias por video."] },
    { name: "INTERMEDIO", price: 160, featured: true, items: ["2 videos de 10 segundos, con +150 repeticiones diarias por video.", "1 video de 20 segundos, con +150 repeticiones diarias por video."] },
    { name: "BÁSICO", price: 95, featured: false, items: ["1 video de 10 segundos, con +150 repeticiones diarias."] },
  ],
  address: "Alta Vista, Carrera Guri, Torre Empresarial Atlantis, Puerto Ordaz, Edo. Bolívar",
  stats: [
    { value: "+150", label: "Reproducciones diarias" },
    { value: "100%", label: "Deducible del ISLR" },
  ],
};

export const nav = [
  { label: "Servicios", href: "/services" },
  { label: "Quiénes Somos", href: "/about" },
  { label: "Portafolio", href: "/portafolio" },
  { label: "Valla LED", href: "/pantalla-led" },
];

export const contact = {
  phone: "+58 412 546-5636",
  phonePlain: "+58 412 546 5636",
  whatsapp: "https://wa.me/584125465636",
  email: "Blurbranding@gmail.com",
  instagram: "https://www.instagram.com/blurbranding/",
  tiktok: "https://www.tiktok.com/@blurbrandingstudio",
  address:
    "Torre Empresarial Atlantis, piso 7, oficina 2, Carrera Guri. Ciudad Guayana, Bolívar, Venezuela.",
  // Ficha de Google Maps de BLUR Branding Studio
  maps: "https://www.google.com/maps/place/BLUR+Branding+Studio/@8.295438,-62.7345072,17z",
};

export const stats = [
  { value: "+16", label: "Aliados comerciales" },
  { value: "+15k", label: "Pautas audiovisuales" },
  { value: "+26k", label: "Diseños" },
];

export const services = [
  {
    n: "01",
    title: "Branding & estrategia",
    heading: "Identidad visual estratégica",
    desc: "Creamos el alma de tu marca: logo, identidad y estrategia para diferenciarte y generar alto impacto.",
    img: images.capsula,
  },
  {
    n: "02",
    title: "Diseño web",
    heading: "Tu activo digital: diseño web estratégico (UI/UX)",
    desc: "Diseñamos plataformas digitales rápidas y funcionales, enfocadas en la usabilidad (UX) y la conversión de tus visitas en clientes.",
    img: IMG + "4fNVzfWBEnHz0XENzYc4xypZdA8.png?scale-down-to=1024&width=842&height=1120",
  },
  {
    n: "03",
    title: "Redes sociales",
    heading: "Conexión y gestión digital: redes sociales que venden",
    desc: "Vamos más allá de la grilla. Creamos estrategias de contenido para generar comunidades y aumentar tu alcance.",
    img: IMG + "Nj5Hnabb0ZMYg0VdBNn6Fn0DNE.jpg?scale-down-to=1024&width=1920&height=1080",
  },
  {
    n: "04",
    title: "Audiovisuales",
    heading: "Producción de alto impacto: Video y Fotografía Profesional",
    desc: "Contenido que detiene el scroll. Elevamos la calidad visual de tu marca con videos y fotografía profesional.",
    img: IMG + "qQRMwoYSgMoe7VV1IFANoSZ6o.jpg?width=1080&height=1920",
  },
  {
    n: "05",
    title: "Material impreso",
    heading: "Conexión física: diseño e impresión de material P.O.P. y gift cards",
    desc: "Activamos tu punto de venta. Diseño funcional y acabados premium para brochures, gift cards, y todo tu material físico.",
    img: IMG + "utI6M0i4SNBOsB8zlgkurxzzm0.png?width=900&height=583",
  },
  {
    n: "06",
    title: "Pantalla LED",
    heading: "Máxima visibilidad local: publicidad en pantalla LED",
    desc: "El camino más rápido al reconocimiento masivo en los puntos estratégicos de Ciudad Guayana.",
    img: IMG + "qCvJDYaq5T9onI0oKMdg2lh0hMw.jpg?scale-down-to=1024&width=3337&height=5535",
  },
  {
    n: "07",
    title: "Asesorías",
    heading: "Crecimiento y conocimiento: consultoría estratégica BLUR",
    desc: "Compartimos 15 años de experiencia para impulsar el conocimiento de tu equipo y la estrategia de tu marca.",
    img: IMG + "MzxcQi1wQ8cyU1TbPzOlLH4U.jpg?width=685&height=1013",
  },
  {
    n: "08",
    title: "Sesión fotográfica",
    heading: "Proyecta la imagen que tu éxito merece",
    desc: "En Blur Branding capturamos la esencia de tu marca personal o corporativa con técnica de élite. No solo tomamos fotos: creamos retratos potentes que comunican autoridad, confianza y profesionalismo en cada toma.",
    img: IMG + "HXWrTcz3Ke9FzjjzGLuKO2qRBg.jpg?width=672&height=672",
  },
  {
    n: "09",
    title: "Cobertura de eventos",
    heading: "Capturamos la importancia de cada hito",
    desc: "Transformamos tus eventos en un registro de honor y tradición. Documentamos compromisos que trascienden el tiempo, asegurando que cada detalle refleje la integridad y responsabilidad de tu organización.",
    img: IMG + "gmCQN5UyI9Q7EvWVuWa12gF1HAM.jpg?width=1344&height=1344",
  },
];

export const testimonials = [
  {
    name: "Carlos M.",
    text: "La transformación de nuestra imagen fue total. Captaron la esencia de nuestra consultora y nos entregaron un manual de marca tan sólido que ahora proyectamos una seguridad absoluta ante clientes internacionales. La formalidad en el proceso es impecable.",
  },
  {
    name: "Elena R.",
    text: "Necesitábamos un prototipo funcional para una ronda de inversión y el resultado superó nuestras expectativas. La fluidez de las interacciones y el cuidado en la experiencia de usuario (UI/UX) fueron clave para validar nuestra idea en tiempo récord.",
  },
  {
    name: "Ricardo V.",
    text: "Buscábamos un sitio que no pareciera una plantilla genérica. El desarrollo es impecable: rápido, responsivo y visualmente impactante. Lograron el equilibrio perfecto entre estética de vanguardia y una navegación intuitiva que ha mejorado nuestra conversión.",
  },
  {
    name: "Mariana C.",
    text: "Migrar nuestra tienda a una plataforma personalizada era un reto técnico enorme. La configuración de dominios y la optimización del checkout nos ahorró semanas de errores. Es un equipo que entiende tanto el diseño como la arquitectura del negocio digital.",
  },
];

export const serviceOptions = [
  "Branding & Identidad",
  "Diseño Web",
  "Alto Impacto Local",
  "Marketing Digital",
  "Producción",
  "Asesoría y Formación",
];
