export type Lang = "en" | "es";

export const dict = {
  en: {
    nav: { work:"Work", services:"Services", stack:"Stack", about:"About", contact:"Contact", cta:"Book a call" },
    hero: {
      location:"Based in Montevideo, Uruguay",
      line1:"Websites that", line2:"turn visits", line3:"into clients.",
      sub:"We design and develop modern websites for businesses that want to look better, build more trust, and create more opportunities.",
      cta:"Book a call", scroll:"Scroll",
    },
    marquee:["Next.js","React","Shopify","WordPress","TypeScript","Webflow","WooCommerce","Tailwind CSS","E-Commerce","Landing Pages","UI / UX","Branding"],
    stats:[
      {value:5,suffix:"+",label:"Years of experience"},
      {value:20,suffix:"+",label:"Clients served"},
      {value:20,suffix:"+",label:"Projects delivered"},
      {value:100,suffix:"%",label:"Client satisfaction"},
    ],
    buildShowcase:{
      intro:"A great website does not appear by accident. It is built.",
      introSub:"As you scroll, watch an idea become a digital experience designed to attract, explain, and convert.",
      steps:[
        { num:"01", label:"Structure", headline:"First, we organize the idea.", body:"We define what your website needs to say, what your visitors need to see, and the clearest path toward conversion." },
        { num:"02", label:"Design", headline:"Then, we give it shape.", body:"We create a clean, modern visual identity that makes your business look professional from the very first second." },
        { num:"03", label:"Experience", headline:"Next, we make it work.", body:"We build a smooth, fast experience where every section naturally guides the user to the next step." },
        { num:"04", label:"Conversion", headline:"Finally, we turn it into a business tool.", body:"Clear calls to action, sharp messaging, and a structure designed to generate inquiries, bookings, or sales." },
      ],
      reveal:"That is what we do at Build Haus Studio. We do not just build websites. We create digital experiences that help businesses grow.",
    },
    work:{
      label:"Selected work", headline:"Real projects. Real results.",
      sub:"From landing pages to full e-commerce platforms — built from scratch, delivered on time.",
      cta:"Book a call",
      items:[
        {title:"Zona Franca Colonia Suiza",category:"Landing Page · Branding",desc:"Full landing page for a Swiss-Uruguayan free trade zone.",year:"2023",url:"https://www.zonafrancacoloniasuiza.com/",gradient:"linear-gradient(135deg,#0D1B4B,#1A3A9E)",tag:"Landing Page",industry:"Industrial / Real Estate"},
        {title:"JUV Activewear",category:"E-Commerce · Dev",desc:"Ongoing development & support for an Israeli activewear brand.",year:"2024",url:"https://juv-activewear.co.il/",gradient:"linear-gradient(135deg,#3D0A00,#B83200)",tag:"E-Commerce",industry:"Fashion / Sport"},
        {title:"Hemistion",category:"Landing Page · Corporate",desc:"Corporate landing page built from scratch for professional services.",year:"2023",url:"https://hemistion.com/web/index.php",gradient:"linear-gradient(135deg,#070E1C,#1A3A6C)",tag:"Landing Page",industry:"Professional Services"},
        {title:"GrowIt UY",category:"E-Commerce · Full Build",desc:"Full e-commerce platform for a home hydroponics brand.",year:"2023",url:"https://growituy.com/",gradient:"linear-gradient(135deg,#081A08,#1A5A1A)",tag:"E-Commerce",industry:"Agriculture / Consumer"},
        {title:"Cockpit UY",category:"E-Commerce · Full Build",desc:"Custom e-commerce store for sim racing cockpits.",year:"2024",url:"https://cockpituy.com/",gradient:"linear-gradient(135deg,#05080F,#0E2040)",tag:"E-Commerce",industry:"Sport / Hobby"},
        {title:"Operal",category:"Landing Page · Logistics",desc:"Conversion-focused landing for a logistics consulting firm.",year:"2022",url:"https://operal.com.uy/",gradient:"linear-gradient(135deg,#0A1E2E,#1A5A8A)",tag:"Landing Page",industry:"Logistics / Consulting"},
        {title:"Opertti & Asociados",category:"Landing Page · Consulting",desc:"Professional site for a trade & logistics consulting firm.",year:"2022",url:"https://operttiasociados.net/",gradient:"linear-gradient(135deg,#141414,#3A3A3A)",tag:"Landing Page",industry:"Consulting / Legal"},
      ],
    },
    services:{
      label:"What we do", headline:"Everything your brand needs online.",
      items:[
        {num:"01",title:"Landing Pages",desc:"Focused pages for a specific offer or campaign, built to capture leads and turn traffic into opportunities."},
        {num:"02",title:"Business Websites",desc:"Professional websites for companies and service businesses that need to explain what they do and build trust."},
        {num:"03",title:"E-Commerce",desc:"Clear digital experiences to showcase products, facilitate purchases, or generate product inquiries."},
        {num:"04",title:"Website Redesigns",desc:"We update existing websites to improve design, speed, clarity, and conversion potential."},
        {num:"05",title:"Web Applications",desc:"Custom tools, dashboards, and platforms built for how your business actually works."},
        {num:"06",title:"Maintenance",desc:"Ongoing updates, monitoring, and support so your site always runs perfectly."},
      ],
    },
    whyItMatters:{
      label:"Why it matters",
      headline:"Your website should work for your business, not just exist.",
      body:"Today, your website is often the first impression people get of your brand. If it does not communicate quickly, build trust, or make the next step obvious, you are losing opportunities.",
      benefits:["Look more professional","Explain your offer more clearly","Generate more inquiries","Turn visitors into clients","Stand out from competitors"],
    },
    process:{
      label:"How we work",
      headline:"From idea to live — in five clear steps.",
      steps:[
        {num:"01",title:"Discover",desc:"We learn about your business, your goals, and what your website needs to achieve."},
        {num:"02",title:"Structure",desc:"We define the sections, messaging, and ideal user journey."},
        {num:"03",title:"Design",desc:"We create a modern visual system aligned with your brand and built to convert."},
        {num:"04",title:"Develop",desc:"We build a fast, responsive website that works seamlessly across all devices."},
        {num:"05",title:"Launch",desc:"We publish, refine, and leave everything ready for your site to start working for you."},
      ],
    },
    whoItIsFor:{
      label:"Who it is for",
      headline:"For businesses that need a website as strong as what they offer.",
      items:["New brands that want to launch with a solid image","Companies that need a more professional online presence","Businesses getting traffic but not enough inquiries","Professionals who want to present their services more clearly","Brands with outdated websites that no longer reflect them"],
    },
    faq:{
      label:"Frequently asked questions",
      items:[
        {q:"How long does a project take?",a:"It depends on the scope, but before starting we clearly define timelines, deliverables, and next steps."},
        {q:"Will the website work on mobile?",a:"Yes. Every website we build is designed to work smoothly on mobile, tablet, and desktop."},
        {q:"Can you help with the copy?",a:"Yes. We can help organize the information and write the content so the website communicates better and converts more."},
        {q:"Can I update the website later?",a:"Yes. We build websites that are meant to grow and evolve with your business."},
        {q:"How much does a website cost?",a:"Every project is priced according to its needs, scope, and level of customization. Share your idea and we will send a clear, detailed proposal."},
      ],
    },
    stack:{
      label:"Stack & tools", headline:"We pick the right tool for each project.",
      sub:"No one-size-fits-all. We match the stack to your budget, timeline, and growth plans.",
      categories:[
        {title:"Frontend",items:["Next.js","React","TypeScript","Tailwind CSS","Webflow","Motion / GSAP"]},
        {title:"E-Commerce",items:["Shopify","WooCommerce","Stripe","MercadoPago","Custom Cart","Inventory"]},
        {title:"CMS & Backend",items:["WordPress","Sanity","Contentful","Node.js","REST APIs","Supabase"]},
        {title:"Deploy & SEO",items:["Vercel","AWS","cPanel","SEO Optimization","Performance","Analytics"]},
      ],
    },
    about:{
      label:"About us", headline:"5 years building what moves brands forward.",
      body1:"We are Build Haus Studio — a web design and development studio based in Montevideo, Uruguay. Since 2019, we have built landing pages, e-commerce stores, and web apps for brands across Latin America, Israel, and beyond.",
      body2:"We care about results, not just aesthetics. Every project starts with understanding your business goals — and ends with a product that converts.",
      cta:"Book a call", location:"Montevideo, Uruguay", founded:"Founded 2019",
    },
    contact:{
      label:"Your next website can start here.",
      headline:"Let\'s team up.",
      body:"Tell us what you need and let us build a website that represents your business better and creates more opportunities.",
      cta:"Book a call",
      whatsapp:"Message on WhatsApp",
      email:"hello@buildhausstudio.com",
      or:"or reach us directly",
    },
    footer:{
      tagline:"Crafting digital products since 2019.", location:"Montevideo, Uruguay",
      rights:"All rights reserved.", nav:["Work","Services","Stack","About","Contact"],
    },
  },
  es: {
    nav:{ work:"Proyectos", services:"Servicios", stack:"Stack", about:"Nosotros", contact:"Contacto", cta:"Agendar llamada" },
    hero:{
      location:"Con base en Montevideo, Uruguay",
      line1:"Sitios web que", line2:"convierten visitas", line3:"en clientes.",
      sub:"Diseñamos y desarrollamos sitios web modernos para negocios que quieren verse mejor, generar más confianza y conseguir más oportunidades.",
      cta:"Agendar llamada", scroll:"Explorar",
    },
    marquee:["Next.js","React","Shopify","WordPress","TypeScript","Webflow","WooCommerce","Tailwind CSS","E-Commerce","Landing Pages","UI / UX","Branding"],
    stats:[
      {value:5,suffix:"+",label:"Años de experiencia"},
      {value:20,suffix:"+",label:"Clientes atendidos"},
      {value:20,suffix:"+",label:"Proyectos entregados"},
      {value:100,suffix:"%",label:"Satisfacción del cliente"},
    ],
    buildShowcase:{
      intro:"Una buena web no aparece por arte de magia. Se construye.",
      introSub:"Mientras bajás, vas a ver cómo una idea se transforma en una experiencia digital pensada para atraer, explicar y convertir.",
      steps:[
        { num:"01", label:"Estructura", headline:"Primero, ordenamos la idea.", body:"Definimos qué tiene que decir tu web, qué necesita ver el usuario y cuál es el camino más claro hacia la conversión." },
        { num:"02", label:"Diseño", headline:"Después, le damos forma.", body:"Creamos una identidad visual clara y moderna para que tu negocio se vea profesional desde el primer segundo." },
        { num:"03", label:"Experiencia", headline:"Luego, hacemos que funcione.", body:"Construimos una experiencia fluida y rápida donde cada sección lleva al usuario al siguiente paso." },
        { num:"04", label:"Conversión", headline:"Y la convertimos en una herramienta comercial.", body:"Botones claros, mensajes precisos y una estructura diseñada para generar consultas, reservas o ventas." },
      ],
      reveal:"Eso es lo que hacemos en Build Haus Studio. No solo hacemos páginas web. Construimos experiencias digitales que ayudan a tu negocio a crecer.",
    },
    work:{
      label:"Trabajo seleccionado", headline:"Proyectos reales. Resultados reales.",
      sub:"Desde landing pages hasta plataformas de e-commerce — construidas desde cero, entregadas a tiempo.",
      cta:"Agendar llamada",
      items:[
        {title:"Zona Franca Colonia Suiza",category:"Landing Page · Branding",desc:"Landing page completa para una zona franca suizo-uruguaya.",year:"2023",url:"https://www.zonafrancacoloniasuiza.com/",gradient:"linear-gradient(135deg,#0D1B4B,#1A3A9E)",tag:"Landing Page",industry:"Industrial / Real Estate"},
        {title:"JUV Activewear",category:"E-Commerce · Desarrollo",desc:"Desarrollo y soporte para una marca israelí de ropa deportiva.",year:"2024",url:"https://juv-activewear.co.il/",gradient:"linear-gradient(135deg,#3D0A00,#B83200)",tag:"E-Commerce",industry:"Fashion / Sport"},
        {title:"Hemistion",category:"Landing Page · Corporativo",desc:"Landing page corporativa desde cero para servicios profesionales.",year:"2023",url:"https://hemistion.com/web/index.php",gradient:"linear-gradient(135deg,#070E1C,#1A3A6C)",tag:"Landing Page",industry:"Professional Services"},
        {title:"GrowIt UY",category:"E-Commerce · Full Build",desc:"Plataforma de e-commerce para una marca de huerta hidropónica.",year:"2023",url:"https://growituy.com/",gradient:"linear-gradient(135deg,#081A08,#1A5A1A)",tag:"E-Commerce",industry:"Agriculture / Consumer"},
        {title:"Cockpit UY",category:"E-Commerce · Full Build",desc:"Tienda online para cockpits de simulación de carreras.",year:"2024",url:"https://cockpituy.com/",gradient:"linear-gradient(135deg,#05080F,#0E2040)",tag:"E-Commerce",industry:"Sport / Hobby"},
        {title:"Operal",category:"Landing Page · Logística",desc:"Landing orientada a conversión para una consultora de logística.",year:"2022",url:"https://operal.com.uy/",gradient:"linear-gradient(135deg,#0A1E2E,#1A5A8A)",tag:"Landing Page",industry:"Logistics / Consulting"},
        {title:"Opertti & Asociados",category:"Landing Page · Consultoría",desc:"Sitio profesional para una consultora de comercio y logística.",year:"2022",url:"https://operttiasociados.net/",gradient:"linear-gradient(135deg,#141414,#3A3A3A)",tag:"Landing Page",industry:"Consulting / Legal"},
      ],
    },
    services:{
      label:"Lo que hacemos", headline:"Todo lo que tu marca necesita online.",
      items:[
        {num:"01",title:"Landing Pages",desc:"Páginas enfocadas para una oferta o campaña específica, diseñadas para captar leads y convertir tráfico en oportunidades."},
        {num:"02",title:"Sitios Institucionales",desc:"Webs profesionales para empresas y negocios que necesitan explicar mejor lo que hacen y transmitir confianza."},
        {num:"03",title:"E-Commerce",desc:"Experiencias claras para mostrar productos, facilitar compras o recibir consultas de forma simple."},
        {num:"04",title:"Rediseño de Sitios",desc:"Actualizamos webs existentes para mejorar diseño, velocidad, claridad y capacidad de conversión."},
        {num:"05",title:"Aplicaciones Web",desc:"Herramientas, dashboards y plataformas a medida para cómo funciona tu negocio."},
        {num:"06",title:"Mantenimiento",desc:"Actualizaciones, monitoreo y soporte continuo para que tu sitio siempre funcione perfecto."},
      ],
    },
    whyItMatters:{
      label:"Por qué importa",
      headline:"Tu web debería trabajar por tu negocio, no solo existir.",
      body:"Hoy, tu sitio suele ser la primera impresión que alguien tiene de tu marca. Si no comunica rápido, no genera confianza o no deja claro qué hacer después, estás perdiendo oportunidades.",
      benefits:["Verte más profesional","Explicar mejor lo que ofrecés","Generar más consultas","Convertir visitas en clientes","Diferenciarte de la competencia"],
    },
    process:{
      label:"Cómo trabajamos",
      headline:"De la idea al lanzamiento — en cinco pasos claros.",
      steps:[
        {num:"01",title:"Entendemos",desc:"Conocemos tu negocio, tus objetivos y qué esperás que haga tu web."},
        {num:"02",title:"Estructuramos",desc:"Definimos secciones, mensajes y el recorrido ideal para tus usuarios."},
        {num:"03",title:"Diseñamos",desc:"Creamos una propuesta visual moderna, alineada con tu marca y pensada para convertir."},
        {num:"04",title:"Desarrollamos",desc:"Construimos una web rápida y responsive, lista para funcionar en todos los dispositivos."},
        {num:"05",title:"Lanzamos",desc:"Publicamos, ajustamos y dejamos todo preparado para que tu sitio empiece a trabajar por vos."},
      ],
    },
    whoItIsFor:{
      label:"Para quién es",
      headline:"Para negocios que necesitan una web a la altura de lo que ofrecen.",
      items:["Marcas que están empezando y quieren lanzar con una imagen sólida","Empresas que necesitan profesionalizar su presencia online","Negocios que reciben tráfico pero no suficientes consultas","Profesionales que quieren mostrar mejor sus servicios","Marcas que ya tienen web, pero sienten que quedó atrás"],
    },
    faq:{
      label:"Preguntas frecuentes",
      items:[
        {q:"¿Cuánto demora un proyecto?",a:"Depende del alcance, pero antes de comenzar definimos claramente tiempos, entregables y próximos pasos."},
        {q:"¿La web queda adaptada a celular?",a:"Sí. Todos nuestros sitios se diseñan para funcionar correctamente en móvil, tablet y desktop."},
        {q:"¿Me ayudan con los textos?",a:"Sí. Podemos ayudarte a ordenar la información y redactar el contenido para que tu web comunique mejor y convierta más."},
        {q:"¿Puedo actualizar la web después?",a:"Sí. Desarrollamos sitios pensados para crecer y poder evolucionar con tu negocio."},
        {q:"¿Cuánto cuesta una web?",a:"Cada proyecto se cotiza según sus necesidades, alcance y nivel de personalización. Contanos tu idea y te enviamos una propuesta clara y detallada."},
      ],
    },
    stack:{
      label:"Stack & herramientas", headline:"Elegimos la herramienta correcta para cada proyecto.",
      sub:"Sin soluciones únicas. Adaptamos el stack a tu presupuesto, tiempo y planes de crecimiento.",
      categories:[
        {title:"Frontend",items:["Next.js","React","TypeScript","Tailwind CSS","Webflow","Motion / GSAP"]},
        {title:"E-Commerce",items:["Shopify","WooCommerce","Stripe","MercadoPago","Carrito Custom","Inventario"]},
        {title:"CMS & Backend",items:["WordPress","Sanity","Contentful","Node.js","REST APIs","Supabase"]},
        {title:"Deploy & SEO",items:["Vercel","AWS","cPanel","SEO","Rendimiento","Analytics"]},
      ],
    },
    about:{
      label:"Quiénes somos", headline:"5 años construyendo lo que impulsa marcas.",
      body1:"Somos Build Haus Studio — un estudio de diseño y desarrollo web con base en Montevideo, Uruguay. Desde 2019 construimos landing pages, tiendas online y apps web para marcas de América Latina, Israel y más.",
      body2:"Nos importan los resultados, no solo la estética. Cada proyecto comienza con entender tus objetivos y termina con un producto que convierte.",
      cta:"Agendar llamada", location:"Montevideo, Uruguay", founded:"Fundado en 2019",
    },
    contact:{
      label:"Tu próxima web puede empezar acá.",
      headline:"Hablemos.",
      body:"Contanos qué necesitás y construimos una web que represente mejor a tu negocio y genere más oportunidades.",
      cta:"Agendar llamada",
      whatsapp:"Escribir por WhatsApp",
      email:"hello@buildhausstudio.com",
      or:"o escríbenos directo",
    },
    footer:{
      tagline:"Creando productos digitales desde 2019.", location:"Montevideo, Uruguay",
      rights:"Todos los derechos reservados.", nav:["Proyectos","Servicios","Stack","Nosotros","Contacto"],
    },
  },
} as const;

export type Dict = (typeof dict)[Lang];
