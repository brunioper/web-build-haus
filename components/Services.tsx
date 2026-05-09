"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];

export default function Services() {
  const { t } = useLang();
  const [hovered, setHovered] = useState<number|null>(null);
  return (
    <section id="services" className="py-24 md:py-40" style={{ borderBottom:"1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ duration:0.9, ease:EASE }}
          style={{ height:"1px", background:"var(--border)", transformOrigin:"left", marginBottom:"5rem" }} />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="flex items-center gap-3">
            <span className="w-5 h-px" style={{ background:"var(--accent)" }} />
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{t.services.label}</span>
          </motion.div>
          <div style={{ overflow:"hidden" }}>
            <motion.h2 initial={{ y:"100%",opacity:0 }} whileInView={{ y:0,opacity:1 }} viewport={{ once:true }} transition={{ duration:1, ease:EASE }}
              className="font-bold leading-[1.1]" style={{ fontFamily:"var(--font-display)", fontSize:"clamp(22px,3vw,42px)", color:"var(--text)", letterSpacing:"-0.03em" }}>
              {t.services.headline}
            </motion.h2>
          </div>
        </div>
        <div style={{ borderTop:"1px solid var(--border)" }}>
          {t.services.items.map((s, i) => (
            <motion.div key={i} initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-30px" }}
              transition={{ duration:0.55, delay:i*0.06 }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              className="relative flex items-center gap-6 md:gap-12 py-6 md:py-7 cursor-default transition-colors duration-300 px-4 -mx-4"
              style={{ borderBottom:"1px solid var(--border)", background:hovered===i?"var(--surface)":"transparent" }}>
              <motion.div className="absolute left-0 top-0 bottom-0 w-0.5" animate={{ opacity:hovered===i?1:0 }} transition={{ duration:0.2 }} style={{ background:"var(--accent)" }} />
              <span className="text-xs font-medium tabular-nums shrink-0 w-6" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{s.num}</span>
              <h3 className="text-lg md:text-xl font-semibold shrink-0 w-36 md:w-48" style={{ fontFamily:"var(--font-display)", color:"var(--text)", letterSpacing:"-0.02em" }}>{s.title}</h3>
              <p className="hidden md:block text-sm leading-relaxed flex-1" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{s.desc}</p>
              <motion.span animate={{ opacity:hovered===i?1:0, x:hovered===i?0:-8 }} transition={{ duration:0.2 }} className="text-lg shrink-0 ml-auto" style={{ color:"var(--accent)" }}>↗</motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
