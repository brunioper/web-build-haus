export type Lang = "en" | "es";

export const dict = {
  en: {
    nav: { work:"Work", services:"Services", stack:"Stack", about:"About", contact:"Contact", cta:"Start a project" },
    hero: {
      location:"Based in Montevideo, Uruguay",
      line1:"We build digital", line2:"experiences that", line3:"convert.",
      sub:"Landing pages, e-commerce & web apps for brands that want real results.",
      cta:"Start a project", scroll:"Scroll",
    },
    marquee:["Next.js","React","Shopify","WordPress","TypeScript","Webflow","WooCommerce","Tailwind CSS","E-Commerce","Landing Pages","UI / UX","Branding"],
    stats:[
      {value:5,suffix:"+",label:"Years of experience"},
      {value:20,suffix:"+",label:"Clients served"},
      {value:20,suffix:"+",label:"Projects delivered"},
      {value:100,suffix:"%",label:"Client satisfaction"},
    ],
    work:{
      label:"Selected work", headline:"Real projects. Real results.",
      sub:"From landing pages to full e-commerce platforms — built from scratch, delivered on time.",
      cta:"Start your project",
      items:[
        {title:"Zona Franca Colonia Suiza",category:"Landing Page · Branding",desc:"Full landing page for a Swiss-Uruguayan free trade zone.",year:"2023",url:"https://www.zonafrancacoloniasuiza.com/",gradient:"linear-gradient(135deg,#0D1B4B,#1A3A9E)",tag:"Landing Page"},
        {title:"JUV Activewear",category:"E-Commerce · Dev",desc:"Ongoing development & support for an Israeli activewear brand.",year:"2024",url:"https://juv-activewear.co.il/",gradient:"linear-gradient(135deg,#3D0A00,#B83200)",tag:"E-Commerce"},
        {title:"Hemistion",category:"Landing Page · Corporate",desc:"Corporate landing page built from scratch for professional services.",year:"2023",url:"https://hemistion.com/web/index.php",gradient:"linear-gradient(135deg,#070E1C,#1A3A6C)",tag:"Landing Page"},
        {title:"GrowIt UY",category:"E-Commerce · Full Build",desc:"Full e-commerce platform for a home hydroponics brand.",year:"2023",url:"https://growituy.com/",gradient:"linear-gradient(135deg,#081A08,#1A5A1A)",tag:"E-Commerce"},
        {title:"Cockpit UY",category:"E-Commerce · Full Build",desc:"Custom e-commerce store for sim racing cockpits.",year:"2024",url:"https://cockpituy.com/",gradient:"linear-gradient(135deg,#05080F,#0E2040)",tag:"E-Commerce"},
        {title:"Operal",category:"Landing Page · Logistics",desc:"Conversion-focused landing for a logistics consulting firm.",year:"2022",url:"https://operal.com.uy/",gradient:"linear-gradient(135deg,#0A1E2E,#1A5A8A)",tag:"Landing Page"},
        {title:"Opertti & Asociados",category:"Landing Page · Consulting",desc:"Professional site for a trade & logistics consulting firm.",year:"2022",url:"https://operttiasociados.net/",gradient:"linear-gradient(135deg,#141414,#3A3A3A)",tag:"Landing Page"},
      ],
    },
    services:{
      label:"What we do", headline:"Everything your brand needs online.",
      items:[
        {num:"01",title:"Landing Pages",desc:"High-converting pages that turn visitors into clients. Fast, SEO-ready, built to perform."},
        {num:"02",title:"E-Commerce",desc:"Online stores built to sell — Shopify, WooCommerce, or custom. Payments, cart, everything."},
        {num:"03",title:"Corporate Websites",desc:"Professional sites that establish credibility and communicate your value at first glance."},
        {num:"04",title:"Web Applications",desc:"Custom tools, dashboards, and platforms built for how your business actually works."},
        {num:"05",title:"Branding & UI/UX",desc:"Visual identity and interface design that make your brand recognizable and your product intuitive."},
        {num:"06",title:"Maintenance & Support",desc:"Ongoing updates, monitoring, and support so your site always runs perfectly."},
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
      body1:"We are Build Haus Studio — a web design and development studio based in Montevideo, Uruguay. Since 2019, we\'ve built landing pages, e-commerce stores, and web apps for brands across Latin America, Israel, and beyond.",
      body2:"We care about results, not just aesthetics. Every project starts with understanding your business goals — and ends with a product that converts.",
      cta:"Get in touch", location:"Montevideo, Uruguay", founded:"Founded 2019",
    },
    contact:{
      label:"Let\'s work together", headline:"Ready to build something great?",
      body:"Tell us about your project and we\'ll get back to you within 24 hours.",
      cta:"Get in touch", email:"hello@buildhausstudio.com", or:"or email us directly",
    },
    footer:{
      tagline:"Crafting digital products since 2019.", location:"Montevideo, Uruguay",
      rights:"All rights reserved.", nav:["Work","Services","Stack","About","Contact"],
    },
  },
  es: {
    nav:{ work:"Proyectos", services:"Servicios", stack:"Stack", about:"Nosotros", contact:"Contacto", cta:"Iniciar proyecto" },
    hero:{
      location:"Con base en Montevideo, Uruguay",
      line1:"Construimos experiencias", line2:"digitales que", line3:"convierten.",
      sub:"Landing pages, e-commerce y apps web para marcas que buscan resultados reales.",
      cta:"Iniciar proyecto", scroll:"Explorar",
    },
    marquee:["Next.js","React","Shopify","WordPress","TypeScript","Webflow","WooCommerce","Tailwind CSS","E-Commerce","Landing Pages","UI / UX","Branding"],
    stats:[
      {value:5,suffix:"+",label:"Años de experiencia"},
      {value:20,suffix:"+",label:"Clientes atendidos"},
      {value:20,suffix:"+",label:"Proyectos entregados"},
      {value:100,suffix:"%",label:"Satisfacción del cliente"},
    ],
    work:{
      label:"Trabajo seleccionado", headline:"Proyectos reales. Resultados reales.",
      sub:"Desde landing pages hasta plataformas de e-commerce — construidas desde cero, entregadas a tiempo.",
      cta:"Iniciar tu proyecto",
      items:[
        {title:"Zona Franca Colonia Suiza",category:"Landing Page · Branding",desc:"Landing page completa para una zona franca suizo-uruguaya.",year:"2023",url:"https://www.zonafrancacoloniasuiza.com/",gradient:"linear-gradient(135deg,#0D1B4B,#1A3A9E)",tag:"Landing Page"},
        {title:"JUV Activewear",category:"E-Commerce · Desarrollo",desc:"Desarrollo y soporte para una marca israelí de ropa deportiva.",year:"2024",url:"https://juv-activewear.co.il/",gradient:"linear-gradient(135deg,#3D0A00,#B83200)",tag:"E-Commerce"},
        {title:"Hemistion",category:"Landing Page · Corporativo",desc:"Landing page corporativa desde cero para servicios profesionales.",year:"2023",url:"https://hemistion.com/web/index.php",gradient:"linear-gradient(135deg,#070E1C,#1A3A6C)",tag:"Landing Page"},
        {title:"GrowIt UY",category:"E-Commerce · Full Build",desc:"Plataforma de e-commerce para una marca de huerta hidropónica.",year:"2023",url:"https://growituy.com/",gradient:"linear-gradient(135deg,#081A08,#1A5A1A)",tag:"E-Commerce"},
        {title:"Cockpit UY",category:"E-Commerce · Full Build",desc:"Tienda online para cockpits de simulación de carreras.",year:"2024",url:"https://cockpituy.com/",gradient:"linear-gradient(135deg,#05080F,#0E2040)",tag:"E-Commerce"},
        {title:"Operal",category:"Landing Page · Logística",desc:"Landing orientada a conversión para una consultora de logística.",year:"2022",url:"https://operal.com.uy/",gradient:"linear-gradient(135deg,#0A1E2E,#1A5A8A)",tag:"Landing Page"},
        {title:"Opertti & Asociados",category:"Landing Page · Consultoría",desc:"Sitio profesional para una consultora de comercio y logística.",year:"2022",url:"https://operttiasociados.net/",gradient:"linear-gradient(135deg,#141414,#3A3A3A)",tag:"Landing Page"},
      ],
    },
    services:{
      label:"Lo que hacemos", headline:"Todo lo que tu marca necesita online.",
      items:[
        {num:"01",title:"Landing Pages",desc:"Páginas de alta conversión para transformar visitas en clientes. Rápidas y optimizadas para SEO."},
        {num:"02",title:"E-Commerce",desc:"Tiendas listas para vender — Shopify, WooCommerce o custom. Con pagos, carrito y todo."},
        {num:"03",title:"Sitios Corporativos",desc:"Sitios profesionales que establecen credibilidad y comunican tu valor a primera vista."},
        {num:"04",title:"Aplicaciones Web",desc:"Herramientas, dashboards y plataformas a medida para cómo funciona tu negocio."},
        {num:"05",title:"Branding & UI/UX",desc:"Identidad visual y diseño de interfaz que hacen tu marca reconocible y tu producto intuitivo."},
        {num:"06",title:"Mantenimiento",desc:"Actualizaciones, monitoreo y soporte continuo para que tu sitio funcione perfecto."},
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
      cta:"Hablemos", location:"Montevideo, Uruguay", founded:"Fundado en 2019",
    },
    contact:{
      label:"Trabajemos juntos", headline:"¿Listo para construir algo grande?",
      body:"Cuéntanos sobre tu proyecto y te respondemos en menos de 24 horas.",
      cta:"Contáctanos", email:"hello@buildhausstudio.com", or:"o escríbenos directamente",
    },
    footer:{
      tagline:"Creando productos digitales desde 2019.", location:"Montevideo, Uruguay",
      rights:"Todos los derechos reservados.", nav:["Proyectos","Servicios","Stack","Nosotros","Contacto"],
    },
  },
} as const;

export type Dict = (typeof dict)[Lang];
