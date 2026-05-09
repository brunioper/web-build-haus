"use client";
import { motion } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];

export default function Process() {
  const { t } = useLang();
  return (
    <section className="py-24 md:py-40" style={{ borderBottom:"1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
          transition={{ duration:0.9, ease:EASE }}
          style={{ height:"1px", background:"var(--border)", transformOrigin:"left", marginBottom:"5rem" }} />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="flex items-center gap-3">
            <span className="w-5 h-px" style={{ background:"var(--accent)" }} />
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{t.process.label}</span>
          </motion.div>
          <div style={{ overflow:"hidden" }}>
            <motion.h2 initial={{ y:"100%",opacity:0 }} whileInView={{ y:0,opacity:1 }} viewport={{ once:true }}
              transition={{ duration:1, ease:EASE }} className="font-bold leading-[1.05]"
              style={{ fontFamily:"var(--font-display)", fontSize:"clamp(22px,3vw,42px)", color:"var(--text)", letterSpacing:"-0.03em" }}>
              {t.process.headline}
            </motion.h2>
          </div>
        </div>
        <div style={{ borderTop:"1px solid var(--border)" }}>
          {t.process.steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-30px" }} transition={{ duration:0.55, delay:i*0.07 }}
              className="grid grid-cols-[48px_1fr] md:grid-cols-[64px_1fr_1fr] gap-4 md:gap-8 py-8 items-start"
              style={{ borderBottom:"1px solid var(--border)" }}>
              <span className="text-xs font-bold tabular-nums pt-0.5" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{step.num}</span>
              <h3 className="text-xl font-bold" style={{ fontFamily:"var(--font-display)", color:"var(--text)", letterSpacing:"-0.02em" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed col-start-2 md:col-start-auto" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
