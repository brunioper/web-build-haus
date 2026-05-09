"use client";
import { motion } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];

export default function Technologies() {
  const { t } = useLang();
  return (
    <section id="stack" className="py-24 md:py-40" style={{ borderBottom:"1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ duration:0.9, ease:EASE }}
          style={{ height:"1px", background:"var(--border)", transformOrigin:"left", marginBottom:"5rem" }} />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-20">
          <div>
            <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px" style={{ background:"var(--accent)" }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{t.stack.label}</span>
            </motion.div>
            <div style={{ overflow:"hidden" }}>
              <motion.h2 initial={{ y:"100%",opacity:0 }} whileInView={{ y:0,opacity:1 }} viewport={{ once:true }} transition={{ duration:1, ease:EASE }}
                className="font-bold leading-[1.05]" style={{ fontFamily:"var(--font-display)", fontSize:"clamp(26px,3.5vw,48px)", color:"var(--text)", letterSpacing:"-0.03em" }}>
                {t.stack.headline}
              </motion.h2>
            </div>
          </div>
          <motion.p initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.15 }}
            className="max-w-xs text-sm leading-relaxed md:text-right" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{t.stack.sub}</motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderLeft:"1px solid var(--border)", borderTop:"1px solid var(--border)" }}>
          {t.stack.categories.map((cat, ci) => (
            <motion.div key={ci} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-40px" }}
              transition={{ duration:0.6, delay:ci*0.08 }}
              className="flex flex-col p-7 md:p-8" style={{ borderRight:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
              <span className="text-xs uppercase tracking-widest mb-6 font-medium" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{cat.title}</span>
              <ul className="flex flex-col gap-3">
                {cat.items.map((item, ii) => (
                  <motion.li key={ii} initial={{ opacity:0, x:-8 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                    transition={{ duration:0.4, delay:ci*0.08+ii*0.05 }}
                    className="text-sm" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
