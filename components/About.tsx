"use client";
import { useRef } from "react";
import { motion } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];

export default function About() {
  const { t } = useLang();
  const ctaRef = useRef<HTMLAnchorElement>(null);
  return (
    <section id="about" className="py-24 md:py-40" style={{ borderBottom:"1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ duration:0.9, ease:EASE }}
          style={{ height:"1px", background:"var(--border)", transformOrigin:"left", marginBottom:"5rem" }} />
        <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
          className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <span className="w-5 h-px" style={{ background:"var(--accent)" }} />
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{t.about.label}</span>
          </div>
          <span className="text-xs uppercase tracking-widest hidden md:block" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{t.about.location}</span>
        </motion.div>
        <div className="grid md:grid-cols-[3fr_2fr] gap-16 md:gap-24 items-start">
          <div>
            <div style={{ overflow:"hidden" }}>
              <motion.h2 initial={{ y:"100%",opacity:0 }} whileInView={{ y:0,opacity:1 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:1, ease:EASE }}
                className="leading-[1.08] font-bold" style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,4vw,54px)", color:"var(--text)", letterSpacing:"-0.03em" }}>
                {t.about.headline}
              </motion.h2>
            </div>
            <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.3 }}
              className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-widest uppercase"
              style={{ border:"1px solid var(--border)", color:"var(--muted)", fontFamily:"var(--font-body)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background:"var(--accent)" }} />
              {t.about.location} · {t.about.founded}
            </motion.div>
          </div>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.8, delay:0.15 }}
            className="flex flex-col gap-6 md:pt-2">
            <p className="text-base leading-[1.75]" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{t.about.body1}</p>
            <p className="text-base leading-[1.75]" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{t.about.body2}</p>
            <a ref={ctaRef} href="#contact" className="mt-2 inline-flex items-center gap-3 text-sm font-medium"
              style={{ color:"var(--text)", fontFamily:"var(--font-body)" }}
              onMouseEnter={() => { const r = ctaRef.current?.querySelector(".cta-ring") as HTMLElement; if(r){r.style.background="var(--accent)";r.style.color="#fff";r.style.borderColor="var(--accent)";} }}
              onMouseLeave={() => { const r = ctaRef.current?.querySelector(".cta-ring") as HTMLElement; if(r){r.style.background="transparent";r.style.color="var(--text)";r.style.borderColor="var(--border)";} }}>
              <span className="cta-ring w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300" style={{ border:"1px solid var(--border)", color:"var(--text)" }}>→</span>
              {t.about.cta}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
