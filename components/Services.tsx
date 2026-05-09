"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];

const pillars = {
  en: [
    {
      num:"01", name:"Strategy",
      manifesto:"We start with why before we touch a pixel.",
      items:["Brand Positioning","UX Architecture","Conversion Strategy","Content Planning","Market Research"],
    },
    {
      num:"02", name:"Design",
      manifesto:"Every pixel earns its place.",
      items:["UI / UX Design","Visual Identity","Motion & Animation","Design Systems","Art Direction"],
    },
    {
      num:"03", name:"Build",
      manifesto:"Clean code. Fast sites. Zero compromises.",
      items:["Web Development","E-Commerce","Web Applications","Maintenance","Performance & SEO"],
    },
  ],
  es: [
    {
      num:"01", name:"Estrategia",
      manifesto:"Empezamos con el porqué antes de tocar un píxel.",
      items:["Posicionamiento de marca","Arquitectura UX","Estrategia de conversión","Planificación de contenido","Investigación de mercado"],
    },
    {
      num:"02", name:"Diseño",
      manifesto:"Cada píxel tiene un propósito.",
      items:["UI / UX","Identidad visual","Motion & Animación","Sistemas de diseño","Dirección de arte"],
    },
    {
      num:"03", name:"Desarrollo",
      manifesto:"Código limpio. Sitios rápidos. Sin compromesos.",
      items:["Desarrollo web","E-Commerce","Aplicaciones web","Mantenimiento","Rendimiento & SEO"],
    },
  ],
};

export default function Services() {
  const { lang, t } = useLang();
  const [hovered, setHovered] = useState<number|null>(null);
  const data = pillars[lang];

  return (
    <section id="services" className="py-24 md:py-40" style={{ borderBottom:"1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Animated divider */}
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
          transition={{ duration:0.9, ease:EASE }}
          style={{ height:"1px", background:"var(--border)", transformOrigin:"left", marginBottom:"5rem" }} />

        {/* Large faint section number */}
        <div className="relative">
          <span className="absolute right-0 top-0 select-none pointer-events-none font-bold"
            style={{ fontSize:"clamp(80px,14vw,180px)", color:"var(--text)", opacity:0.025, fontFamily:"var(--font-display)", letterSpacing:"-0.06em", lineHeight:1 }}>
            02
          </span>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 relative z-10">
            <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
              className="flex items-center gap-3">
              <span className="w-5 h-px" style={{ background:"var(--accent)" }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{t.services.label}</span>
            </motion.div>
            <div style={{ overflow:"hidden" }}>
              <motion.h2 initial={{ y:"100%",opacity:0 }} whileInView={{ y:0,opacity:1 }} viewport={{ once:true }}
                transition={{ duration:1, ease:EASE }}
                className="font-bold" style={{ fontFamily:"var(--font-display)", fontSize:"clamp(22px,3vw,42px)", color:"var(--text)", letterSpacing:"-0.03em" }}>
                {t.services.headline}
              </motion.h2>
            </div>
          </div>

          {/* 3-pillar grid */}
          <div className="grid md:grid-cols-3 relative z-10"
            style={{ borderLeft:"1px solid var(--border)", borderTop:"1px solid var(--border)" }}>
            {data.map((pillar, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.6, delay:i*0.1 }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                className="flex flex-col p-8 md:p-10 transition-colors duration-300 cursor-default"
                style={{ borderRight:"1px solid var(--border)", borderBottom:"1px solid var(--border)",
                  background: hovered===i ? "var(--surface)" : "transparent" }}>
                {/* Number + name */}
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-xs font-medium" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{pillar.num}</span>
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily:"var(--font-display)", color:"var(--text)", letterSpacing:"-0.03em" }}>
                    {pillar.name}
                  </h3>
                </div>

                {/* Manifesto */}
                <p className="text-xs italic mb-8" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
                  "{pillar.manifesto}"
                </p>

                {/* Sub-services */}
                <ul className="flex flex-col gap-3 mt-auto">
                  {pillar.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm"
                      style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background:"var(--accent)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
