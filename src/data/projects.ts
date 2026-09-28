// Proyectos del portafolio (contenido del sitio original de Blur Branding)

const IMG = "https://framerusercontent.com/images/";
const img = (id: string, params = "scale-down-to=1024") => `${IMG}${id}?${params}`;

export type ProjectItem = { label: string; text: string };

export type Project = {
  slug: string;
  title: string;
  tag: string;
  date: string; // ISO
  cover: string;
  lead?: string;
  intro: string;
  highlight?: { title: string; text: string };
  listTitle: string;
  items: ProjectItem[];
  closing?: string[];
  gallery?: string[];
  video?: string;
};

export const projects: Project[] = [
  {
    slug: "athletics-group-–-capturando-la-energía-y-el-movimento-por-blur-branding",
    title: "Athletics Group – Capturando la energía y el movimento por Blur Branding",
    tag: "Cobertura de eventos",
    date: "2026-02-10",
    cover: img("JXTx7CDuDEXWSJiTHRfzaM89TJ4.png", "width=573&height=395"),
    intro:
      "En Blur Branding, creemos que la cobertura de un evento deportivo exige más que solo registrar momentos; requiere capturar la adrenalina, la superación y el espíritu de equipo. Para Athletics Group, desarrollamos una narrativa visual que transporta al espectador directamente al centro de la acción.",
    highlight: {
      title: "La Fuerza del Movimiento",
      text: "Nuestro objetivo fue inmortalizar la intensidad de cada entrenamiento y la celebración de cada logro. A través de una cobertura dinámica y ágil, logramos reflejar la identidad vibrante de Athletics Group, enfocándonos no solo en el rendimiento físico, sino en la conexión emocional entre los atletas y la marca.",
    },
    listTitle: "¿Qué entregamos en cada Cobertura Deportiva?",
    items: [
      { label: "Captación de Alta Velocidad", text: "Utilizamos técnicas de filmación y fotografía que congelan el movimiento y resaltan el esfuerzo y la dedicación de cada participante." },
      { label: "Storytelling Motivacional", text: "Creamos videos de resumen (aftermovies) con una edición rítmica y bandas sonoras impactantes, diseñados para inspirar y aumentar el compromiso en las redes sociales." },
      { label: "Presencia de Marca Orgánica", text: "Integramos la identidad visual de Athletics Group de forma natural en todo el contenido, reforzando el posicionamiento de la marca en el sector del fitness y bienestar." },
    ],
    video: `${IMG}oPKCqQE8zI9hzXyy5KUiiM2dTZg.mp4`,
  },
  {
    slug: "fotografía-profesional-–-capturando-la-esencia-de-marca-por-blur-branding",
    title: "Fotografía Profesional – Capturando la esencia de marca por Blur Branding",
    tag: "Sesión fotográfica",
    date: "2026-02-10",
    cover: img("rsk1CzWIgUnbApg8gZkOCVuNa5w.jpg", "scale-down-to=1024&width=5328&height=4000"),
    intro:
      "En el branding moderno, la imagen personal es el activo más valioso. Para Moisés Rojas, en Blur Branding ejecutamos una sesión fotográfica profesional diseñada para transmitir liderazgo, confianza y accesibilidad, elementos clave para su posicionamiento en el mercado.",
    highlight: {
      title: "El Arte detrás de la Imagen",
      text: "No se trata solo de presionar un botón; se trata de composición, psicología del color y dirección. Nuestro objetivo fue crear un banco de imágenes versátil que pudiera utilizarse tanto en plataformas digitales como en materiales impresos de alta gama.",
    },
    listTitle: "Nuestros Pilares Fotográficos:",
    items: [
      { label: "Dirección de Arte y Pose", text: "Guiamos a nuestros clientes para lograr posturas naturales que proyecten la autoridad necesaria en su sector profesional." },
      { label: "Control de Iluminación", text: "Utilizamos esquemas de luz de estudio para resaltar texturas y dar profundidad, asegurando que el sujeto sea siempre el protagonista." },
      { label: "Retoque Digital de Alta Gama", text: "Realizamos una post-producción minuciosa que mantiene la naturalidad mientras optimiza el color y la nitidez para estándares editoriales." },
    ],
    gallery: [img("7nBs23PxJZcTxD36w0u8TFnYxtw.jpg"), img("Scc00oyqhsLTKhJ2iDq0LMVoT1M.jpg")],
  },
  {
    slug: "publicidad-de-alto-impacto-–-nuestra-pantalla-led-en-ciudad-guayana",
    title: "Publicidad de Alto Impacto – Nuestra pantalla LED en Ciudad Guayana",
    tag: "Pantalla LED",
    date: "2026-02-10",
    cover: img("mlsdNeazC2x4EDrzwQUiIV2BYjU.jpg", "width=287&height=232"),
    intro:
      "En Blur Branding, llevamos tu marca al mundo físico con tecnología de vanguardia. Contamos con una ubicación estratégica en Ciudad Guayana, estado Bolívar, ofreciendo una ventana publicitaria premium que garantiza visibilidad y recordación las 24 horas del día, los 7 días de la semana.",
    highlight: {
      title: "Exposición Estratégica 24/7",
      text: "Nuestra pantalla LED de gran formato está diseñada para captar la atención del tráfico vehicular y peatonal de forma inmediata. No es solo un espacio publicitario; es un punto de referencia visual donde marcas como La Empanadería PZO logran conectar con miles de clientes potenciales diariamente.",
    },
    listTitle: "Ventajas de Pautar con Blur Branding:",
    items: [
      { label: "Visibilidad Ininterrumpida", text: "Tu contenido se reproduce de forma continua, asegurando que el mensaje llegue a tu audiencia sin importar la hora." },
      { label: "Contenido Dinámico de Alta Definición", text: "La pantalla ofrece un brillo y contraste excepcionales, ideales para mostrar la calidad de productos gastronómicos y servicios locales con total nitidez." },
      { label: "Producción y Adaptación Incluida", text: "Como expertos en Audiovisuales, no solo te damos el espacio; optimizamos y adaptamos tus piezas para que el impacto visual sea máximo en el formato de la pantalla." },
    ],
    video: `${IMG}RT046GnmiHkMcvHJbFQCMUZrnw.mp4`,
  },
  {
    slug: "soluciones-visuales-de-gran-formato-–-branding-aplicado-por-blur-branding",
    title: "Soluciones visuales de gran formato – Branding aplicado por Blur Branding",
    tag: "Material Impreso",
    date: "2026-02-10",
    cover: img("707a8bSuEGCiDvHl4YXV49iAJ0.png", "scale-down-to=1024&width=1080&height=1080"),
    intro:
      "El Material Impreso sigue siendo una herramienta poderosa para conectar con el público en el punto de venta. En Blur Branding, diseñamos piezas gráficas que no solo informan, sino que elevan la percepción de marca a través de una composición visual limpia y un uso estratégico del color.",
    highlight: {
      title: "Impacto en el Punto de Venta",
      text: "Para nuestros clientes del sector de construcción y remodelación, Ceramikos y Greal Cerámicas, desarrollamos una serie de piezas gráficas para exhibición física (rompetráficos y material POP). El reto consistió en presentar productos de alta gama, como porcelanatos y mármoles, manteniendo una estética minimalista y profesional.",
    },
    listTitle: "Detalles de Diseño y Producción:",
    items: [
      { label: "Jerarquía de Información", text: "Implementamos títulos de alto contraste (\"¡Mes Aniversario!\", \"Ceramikazo\") para garantizar que el mensaje promocional sea legible a gran distancia." },
      { label: "Fidelidad de Producto", text: "Utilizamos fotografía de alta resolución para que las texturas y vetas de las cerámicas se aprecien con total realismo en la impresión, facilitando la decisión de compra del cliente." },
      { label: "Adaptabilidad de Formatos", text: "Diseñamos piezas en diversos diámetros (60cm, 74cm) optimizadas para soportes circulares, asegurando que el diseño se adapte perfectamente al troquelado físico sin perder elementos clave de la marca." },
    ],
    gallery: [
      img("xfYYvFFGPPC2TQF3wnvD7qUeTLY.png"),
      img("40zqO9E5KJ2BjKc35ietnu2lM.png"),
      img("Xyb2FDafpbC14uLpusxmanhEr2Q.png"),
      img("oCwDhSt6ULoRThDSt0ttxIGx4.png"),
      img("E6bMKun8F6NnroNBpOESruEew.png"),
    ],
  },
  {
    slug: "sosa-caraballo-–-narrativa-cinematográfica-para-el-sector-legal-por-blur-branding",
    title: "Sosa Caraballo – Narrativa cinematográfica para el sector legal por Blur Branding",
    tag: "Audiovisuales",
    date: "2026-02-10",
    cover: img("XCGj1wMuVmrpbAjwiGYAyoek.png", "width=571&height=518"),
    intro:
      "En el mundo institucional, la imagen lo es todo. Para la firma Sosa Caraballo, en Blur Branding desarrollamos una pieza audiovisual de alto nivel que trasciende la publicidad convencional, convirtiéndose en un manifiesto de valores y profesionalismo.",
    highlight: {
      title: "Nuestra Visión Audiovisual",
      text: "El objetivo fue capturar la esencia de una profesión que es, ante todo, un compromiso con la justicia. Logramos transmitir la sobriedad y la trayectoria de la firma a través de una dirección de fotografía meticulosa y una narrativa que conecta emocionalmente con la audiencia.",
    },
    listTitle: "Aspectos Destacados de la Producción:",
    items: [
      { label: "Dirección de Fotografía", text: "Utilizamos una iluminación controlada y encuadres simétricos para evocar orden, confianza y la \"responsabilidad sagrada\" que define a la firma." },
      { label: "Narrativa de Marca (Storytelling)", text: "Creamos un guion que posiciona al abogado no como un gestor, sino como un guardián de la integridad social y un heredero de una tradición de honor." },
      { label: "Post-producción de Élite", text: "El montaje fluido y el diseño sonoro fueron pensados para mantener un ritmo solemne pero dinámico, ideal para presentaciones corporativas y plataformas digitales de alto impacto." },
    ],
    video: `${IMG}vbz1XrLVDm0eNeHYzY1bWz1QTUU.mp4`,
  },
  {
    slug: "café-linaje-–-estrategia-de-contenido-y-presencia-digital-por-blur-branding",
    title: "Café Linaje – Estrategia de contenido y presencia digital por Blur Branding",
    tag: "Redes sociales",
    date: "2026-02-10",
    cover: img("qphBHTOFb9lmUiXlV3LfK9VMb0.png", "scale-down-to=1024&width=1630&height=1079"),
    intro:
      "En el entorno digital actual, el contenido estático ya no es suficiente. Para Café Linaje, en Blur Branding desarrollamos una estrategia de Redes Sociales enfocada en resaltar el origen premium y la calidad artesanal del producto a través de formatos visuales de alto impacto.",
    highlight: {
      title: "Nuestra Estrategia Digital",
      text: "El objetivo principal fue humanizar la marca y despertar los sentidos del consumidor. No solo gestionamos perfiles; creamos una experiencia visual que posiciona a Café Linaje como un referente del café de especialidad venezolano.",
    },
    listTitle: "Acciones Clave en Social Media:",
    items: [
      { label: "Contenido \"Product-First\"", text: "Utilizamos técnicas de iluminación y encuadres cinematográficos para resaltar los detalles del empaque y las características del grano (como el Catuaí Amarillo de Caripe), generando deseo de compra inmediato." },
      { label: "Storytelling Visual", text: "A través de videos cortos y dinámicos, narramos la historia detrás de cada bolsa, desde su origen a 1100 metros de altura hasta la mesa del consumidor." },
      { label: "Optimización para Formatos Verticales", text: "Diseñamos y producimos piezas específicamente para Reels y TikTok, maximizando el alcance orgánico y la interacción con la comunidad cafetalera." },
    ],
    video: `${IMG}szG7sWfjGt4GMg7AvEfGSzt3TtA.mp4`,
  },
  {
    slug: "la-llovizna-casino-–-arquitectura-de-una-marca-premium-por-blur-branding",
    title: "La Llovizna Casino – Arquitectura de una marca premium por Blur Branding",
    tag: "Branding",
    date: "2026-02-10",
    cover: img("Z8yNdOFXDMDHcwYhmdBfCvztztg.png", "width=800&height=600"),
    intro:
      "En Blur Branding, entendemos que el branding no es solo un logotipo, sino un sistema estratégico diseñado para conectar. Para el proyecto de La Llovizna Casino, desarrollamos una identidad visual que equilibra la sofisticación del sector del entretenimiento con una estética orgánica y minimalista.",
    highlight: {
      title: "El Reto Estratégico",
      text: "El objetivo era crear una marca que transmitiera exclusividad y confianza. Nos enfocamos en la versatilidad: la identidad debía funcionar con la misma fuerza en una pantalla LED de gran formato que en una tarjeta de presentación o en la cobertura de eventos en vivo.",
    },
    listTitle: "Detalles del Sistema Visual:",
    items: [
      { label: "Isotipo Simbólico", text: "Diseñamos un identificador compuesto por un símbolo que evoca fluidez (una caída de agua) dentro de una estructura geométrica sólida para denotar estabilidad." },
      { label: "Arquitectura de Marca", text: "Definimos una jerarquía clara con una versión vertical (preferente), versiones horizontales y el uso del símbolo en solitario para garantizar la legibilidad en cualquier soporte técnico o de espacio." },
      { label: "Cromatismo de Alto Nivel", text: "La paleta se fundamenta en el Pantone P 132-16 C (verde bosque profundo), complementado con el Pantone P 13-5 C (dorado champaña) para evocar lujo, y el Pantone P 86-1 C como tono de contraste y aire visual." },
    ],
    gallery: [img("UFwya8IBAaKqiz50kRIKH1CKUE.png"), img("spydYAz1DCY0uFbTDFkj8LTbs8I.png"), img("dSKHquVUa7Ip1tGuvVChFCuNA.png")],
  },
  {
    slug: "dando-vida-al-aprendizaje-animación-de-logo-para-ciudad-escolar.",
    title: "Dando vida al aprendizaje: animación de logo para ciudad escolar.",
    tag: "Audiovisuales",
    date: "2026-01-31",
    cover: img("m4dHg7zc6ER3KU7PACkivZ1q4.jpg", "scale-down-to=1024&width=2048&height=1536"),
    lead: "Una marca no solo se ve, se siente. En BLUR, transformamos identidades estáticas en experiencias dinámicas que capturan la atención y comunican con impacto.",
    intro:
      "En el vibrante mundo de la educación, conectar con la audiencia es clave, y nada lo logra como una marca llena de vida. Estamos emocionados de compartir nuestro reciente trabajo de animación de logo para Ciudad Escolar, un proyecto que celebra el movimiento, el crecimiento y la creatividad.",
    highlight: {
      title: "Más Allá del Diseño Estático",
      text: "El logo de Ciudad Escolar ya es un ícono de aprendizaje y comunidad: un libro abierto que se transforma en un horizonte de casas, simbolizando un espacio donde \"todo para aprender y crear\" cobra vida. Nuestro desafío fue llevar esa promesa al siguiente nivel a través de la animación.",
    },
    listTitle: "¿Qué logramos con esta animación?",
    items: [
      { label: "Dinamismo y Atracción", text: "El movimiento inicial que devela el logo no solo es visualmente atractivo, sino que genera expectación y capta la mirada al instante." },
      { label: "Narrativa Visual", text: "La secuencia animada cuenta la historia de la marca de forma concisa y memorable, desde la base del aprendizaje (el libro) hasta la construcción de un futuro (las casas)." },
      { label: "Modernidad y Relevancia", text: "Una animación de logo de alta calidad posiciona a Ciudad Escolar como una marca moderna y adaptada a las nuevas plataformas digitales." },
      { label: "Versatilidad", text: "Este activo animado es perfecto para intros de videos educativos, presentaciones dinámicas, redes sociales y cualquier plataforma digital que busque destacar." },
    ],
    closing: [
      "En BLUR, entendemos que la animación es una herramienta poderosa para reforzar el storytelling de tu marca. No solo movemos píxeles; creamos una experiencia que resuena con tu público y deja una impresión duradera.",
    ],
    video: `${IMG}QDDvr2JmZ6pPYo5k292JsFmi4E.mp4`,
  },
  {
    slug: "diversidad-visual-excelencia-constante-un-recorrido-por-nuestros-proyectos-de-branding",
    title: "Diversidad visual, excelencia constante: un recorrido por nuestros proyectos de branding",
    tag: "Branding",
    date: "2026-01-31",
    cover: img("szMT2IOSebNqgYcDiciaujVb56c.jpg", "scale-down-to=1024&width=2048&height=1536"),
    lead: "No creemos en soluciones genéricas. En BLUR, cada marca tiene un ADN único que merece ser proyectado con precisión y creatividad.",
    intro:
      "El verdadero branding es el arte de hacer que la esencia de un negocio sea visible y memorable. Hoy queremos compartir una muestra de cómo hemos ayudado a diversos aliados a encontrar su voz visual y posicionarse con autoridad en sus respectivos mercados:",
    listTitle: "Algunas marcas que construimos",
    items: [
      { label: "RAGOCA", text: "Un enfoque industrial y sólido. Trabajamos en una identidad geométrica que comunica fuerza y estructura." },
      { label: "CÁPSULA PROFESIONAL", text: "Modernidad y comunicación. Diseñamos un sistema visual dinámico que refleja la agilidad del mundo del podcasting y el aprendizaje." },
      { label: "HOMETIFY", text: "Propiedad y confianza. La síntesis visual de la gestión inmobiliaria profesional, logrando un equilibrio entre tecnología y calidez hogareña." },
      { label: "DR. JUAN MÉNDEZ", text: "Sofisticación médica. Creamos una identidad para ginecología y obstetricia que transmite seguridad, calma y un trato humano de alto nivel." },
      { label: "OPORTO RESTAURANTE", text: "Elegancia clásica. Un diseño que invita a la experiencia gastronómica mediante el uso de heráldica moderna y tipografías que evocan tradición y buen gusto." },
    ],
    closing: [
      "Nuestra Metodología: ya sea en Figma para prototipos funcionales o en el desarrollo de identidades corporativas, nuestro proceso siempre integra el conocimiento técnico en desarrollo y diseño para asegurar que cada marca sea escalable y efectiva.",
      "Tu marca merece una identidad que no solo se vea bien, sino que cuente tu historia. ¿Empezamos a construirla?",
    ],
    gallery: [
      img("MffM838zKUDOhMT5VSgvp9ibD1s.png"),
      img("qwS6R5hntUyCcl5FkmuTCbEI.jpg"),
      img("MuB5vtY2JYF8uJbjwfugly5Cfls.jpg"),
      img("yrtAnNEDupM61bb4t9mdTxI10I.jpg"),
      img("lrTQjQ1gjlEqBzRceX8eIWdU.jpg"),
    ],
  },
  {
    slug: "identidad-que-inspira-confianza-credenciales-corporativas-para-susana-herrera-estética",
    title: "Identidad que Inspira confianza: credenciales corporativas para Susana Herrera Estética",
    tag: "Material Impreso",
    date: "2026-01-31",
    cover: img("eaJaVrW2v04FF82r27nMMH0Rfug.jpg", "scale-down-to=1024&width=2048&height=1536"),
    lead: "En el mundo de la estética, la primera impresión es fundamental. En BLUR, diseñamos herramientas que proyectan el profesionalismo y la elegancia que tu marca merece.",
    intro:
      "Elevar la presencia de marca en el mundo físico requiere atención al detalle y una ejecución impecable. Recientemente, colaboramos con Susana Herrera Estética en el diseño e impresión de su carnetización corporativa, un proyecto donde la sobriedad y la sofisticación fueron nuestras guías.",
    highlight: {
      title: "La Fusión de Estética y Profesionalismo",
      text: "Para Susana Herrera, el reto era trasladar una identidad visual delicada y moderna a un formato funcional. El resultado es una pieza de papelería que comunica autoridad en el sector de la belleza.",
    },
    listTitle: "Claves del diseño",
    items: [
      { label: "Jerarquía Visual Limpia", text: "Utilizamos el isotipo de la marca en gran formato para crear un fondo sutil pero poderoso, permitiendo que la información del personal destaque con total claridad." },
      { label: "Paleta de Colores Sofisticada", text: "Respetamos los tonos rosa empolvado y gris grafito de la marca, logrando un contraste que es visualmente relajante y altamente profesional a la vez." },
      { label: "Acabado de Alta Calidad", text: "No se trata solo de un carnet; es una extensión de la experiencia premium que los clientes encuentran en el estudio de estética." },
    ],
    closing: [
      "Un carnet corporativo bien diseñado no solo identifica al equipo, sino que refuerza la cultura de marca y genera una percepción de orden y confianza inmediata ante el paciente o cliente. En BLUR, cuidamos que cada línea y cada color impreso sea fiel a la esencia original de tu negocio.",
    ],
    gallery: [img("4d2MZcnuGMRRhMDz8Kl3NSimEw.png"), img("xYWCMiE66ZYjZrEXU8KYgyp9t8.png"), img("SDMGzMcT8x3kZHGnlZHKnOevD7A.jpg")],
  },
  {
    slug: "elevando-la-experiencia-del-paciente-con-médico-express.",
    title: "Elevando la experiencia del paciente con médico express.",
    tag: "Material Impreso",
    date: "2026-01-31",
    cover: img("ydP5k9sWzKSfTupIZYEGUeXfijs.jpg", "scale-down-to=1024&width=2048&height=1536"),
    lead: "Cuando la salud y el bienestar se encuentran con un diseño impecable, la confianza se materializa. En BLUR, transformamos conceptos en realidades tangibles y funcionales.",
    intro:
      "En BLUR Branding Studio, cada proyecto es una oportunidad para fusionar la estética con la estrategia. Nos enorgullece presentar nuestro reciente trabajo para Médico Express: el diseño e impresión de su exclusiva línea de Gift Cards.",
    highlight: {
      title: "Un Reto de Diseño, una Solución Estratégica",
      text: "El objetivo era claro: crear una serie de tarjetas que no solo fueran visualmente atractivas, sino que también comunicaran la calidad, el profesionalismo y la exclusividad de los servicios domiciliarios de Médico Express. Concebimos tres niveles de membresía y descuento, cada uno con su propia personalidad.",
    },
    listTitle: "Tres niveles, tres personalidades",
    items: [
      { label: "Membresía VIP (Fondo Magenta)", text: "Diseñada para comunicar lujo y prioridad. Los tonos magenta vibrantes, combinados con tipografía dorada, evocan exclusividad y un servicio premium." },
      { label: "Membresía Platinum (Fondo Negro)", text: "Un diseño sobrio y moderno que resalta el 50% de descuento con una elegancia inigualable. El lazo plateado añade un toque de regalo." },
      { label: "Membresía VIP (Fondo Blanco)", text: "Una alternativa luminosa y limpia que mantiene la sensación premium con acentos dorados sutiles, para quienes prefieren una estética más minimalista." },
    ],
    closing: [
      "Cada tarjeta integra un código QR que facilita el acceso inmediato al teleservicio 24/7 de Médico Express y a su sitio web: un objeto tangible de valor y una herramienta digital eficiente a la vez.",
      "¿Listo para llevar la identidad de tu marca a un nivel superior? Contáctanos para materializar tus ideas.",
    ],
    gallery: [img("diO3UCldaOuA6qIexl3EERsA.jpg"), img("yzHNrMyiD1ecmkAj1oUNeqZ8t8.jpg"), img("Ptu3JeoX90hEW5WZPRUKXiL0hQs.jpg")],
  },
];

/** Título visible sin guiones largos: "Marca – descripción" -> "Marca: descripción". */
export const displayTitle = (t: string) => t.replace(/\s[–—]\s/g, ": ");

/**
 * Separa el título en kicker (marca o tema) y titular:
 * "Athletics Group – Capturando la energía…" -> { kicker: "Athletics Group", headline: "Capturando la energía…" }.
 * Si no hay separador, el kicker es la categoría del proyecto.
 */
export function splitTitle(p: Project) {
  const t = displayTitle(p.title).replace(/\.$/, "");
  const i = t.indexOf(": ");
  if (i === -1) return { kicker: p.tag, headline: t };
  const rest = t.slice(i + 2);
  return { kicker: t.slice(0, i), headline: rest.charAt(0).toUpperCase() + rest.slice(1) };
}

/** Categoría del proyecto -> servicio relacionado (nombre y enlace). */
const SERVICE_BY_TAG: Record<string, { label: string; to: string }> = {
  Branding: { label: "Identidad visual y branding", to: "/services#identidad-visual-y-branding" },
  "Redes sociales": { label: "Redes sociales", to: "/services#redes-sociales" },
  Audiovisuales: { label: "Audiovisuales", to: "/services#audiovisuales" },
  Audiovisuals: { label: "Audiovisuales", to: "/services#audiovisuales" },
  "Material Impreso": { label: "Material impreso", to: "/services#material-impreso" },
  "Pantalla LED": { label: "Pantalla LED", to: "/pantalla-led" },
  "Sesión fotográfica": { label: "Sesión fotográfica", to: "/services#sesion-fotografica" },
  "Cobertura de eventos": { label: "Cobertura de eventos", to: "/services#cobertura-de-eventos" },
};
export const serviceFor = (tag: string) => SERVICE_BY_TAG[tag] ?? { label: "Servicios", to: "/services" };

// Formato manual (no Intl): idéntico en Node (prerender) y en el navegador.
const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

export const findProject = (slug?: string) =>
  projects.find((p) => p.slug === slug || encodeURIComponent(p.slug) === slug);
