"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];

export default function Work() {
  const { t } = useLang();
  const [hovered, setHovered] = useState<number | null>(null);
  const preview = t.work.items[hovered ?? 0];

  return (
    <section id="work" className="py-24 md:py-40" style={{ borderBottom:"1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Animated divider */}
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
          transition={{ duration:0.9, ease:EASE }}
          style={{ height:"1px", background:"var(--border)", transformOrigin:"left", marginBottom:"5rem" }} />

        {/* Header */}
        <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
          <div>
            <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.6 }} className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px" style={{ background:"var(--accent)" }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{t.work.label}</span>
            </motion.div>
            <div style={{ overflow:"hidden" }}>
              <motion.h2 initial={{ y:"100%",opacity:0 }} whileInView={{ y:0,opacity:1 }} viewport={{ once:true }}
                transition={{ duration:1, ease:EASE }} className="font-bold leading-[1.05]"
                style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,4vw,54px)", color:"var(--text)", letterSpacing:"-0.03em" }}>
                {t.work.headline}
              </motion.h2>
            </div>
          </div>
          <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.2 }} className="max-w-xs text-sm leading-relaxed"
            style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{t.work.sub}</motion.p>
        </div>

        {/* List + Preview panel */}
        <div className="flex gap-0" style={{ borderTop:"1px solid var(--border)" }}>
          {/* Left: numbered list */}
          <div className="flex-1 min-w-0">
            {t.work.items.map((p, i) => (
              <motion.a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:"-30px" }} transition={{ duration:0.55, delay:i*0.05 }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                className="group relative flex items-center gap-5 py-6 md:py-8 overflow-hidden block"
                style={{ borderBottom:"1px solid var(--border)" }}>
                {/* Hover fill */}
                <motion.div animate={{ scaleX: hovered===i?1:0 }} transition={{ duration:0.4, ease:EASE }}
                  className="absolute inset-0 origin-left pointer-events-none" style={{ background:"var(--surface)" }} />

                {/* Number */}
                <span className="relative z-10 shrink-0 text-xs font-medium tabular-nums w-8"
                  style={{ color: hovered===i ? "var(--accent)" : "var(--muted)", fontFamily:"var(--font-body)", transition:"color 0.2s" }}>
                  {String(i+1).padStart(2,"0")}
                </span>

                {/* Tag pills */}
                <span className="relative z-10 hidden sm:inline-flex shrink-0 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border"
                  style={{ borderColor:"var(--border)", color:"var(--muted)", fontFamily:"var(--font-body)" }}>{p.tag}</span>
                {"industry" in p && (
                  <span className="relative z-10 hidden lg:inline-flex shrink-0 text-[10px] uppercase tracking-widest px-2 py-0.5"
                    style={{ color:"var(--muted)", fontFamily:"var(--font-body)", borderLeft:"1px solid var(--border)", paddingLeft:"0.75rem", marginLeft:"-0.25rem" }}>{(p as typeof p & {industry:string}).industry}</span>
                )}

                {/* Title */}
                <div className="relative z-10 flex-1 min-w-0">
                  <h3 className="font-bold truncate transition-colors duration-200"
                    style={{ fontFamily:"var(--font-display)", fontSize:"clamp(16px,2.5vw,28px)",
                      color: hovered===i ? "var(--accent)" : "var(--text)", letterSpacing:"-0.02em" }}>
                    {p.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest mt-0.5 hidden md:block"
                    style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{p.category}</p>
                </div>

                {/* Year + arrow */}
                <div className="relative z-10 flex items-center gap-4 shrink-0">
                  <span className="text-xs hidden md:block" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{p.year}</span>
                  <motion.span animate={{ opacity:hovered===i?1:0, x:hovered===i?0:-8 }}
                    transition={{ duration:0.2 }} className="text-lg" style={{ color:"var(--accent)" }}>↗</motion.span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Right: sticky preview — desktop only */}
          <div className="hidden lg:block w-[38%] shrink-0" style={{ borderLeft:"1px solid var(--border)" }}>
            <div className="sticky top-24 p-6">
              <AnimatePresence mode="wait">
                <motion.div key={hovered ?? "default"} initial={{ opacity:0, scale:0.97 }}
                  animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.97 }}
                  transition={{ duration:0.3, ease:EASE }}
                  className="relative overflow-hidden" style={{ aspectRatio:"4/3" }}>
                  <div className="absolute inset-0" style={{ background:preview.gradient }} />
                  <div className="absolute inset-0" style={{ background:"rgba(0,0,0,0.25)" }} />
                  <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                    style={{ background:"linear-gradient(to top,rgba(0,0,0,0.7),transparent)" }} />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color:"rgba(255,255,255,0.5)", fontFamily:"var(--font-body)" }}>{preview.category}</p>
                    <p className="text-lg font-bold text-white" style={{ fontFamily:"var(--font-display)", letterSpacing:"-0.02em" }}>{preview.title}</p>
                  </div>
                  {hovered !== null && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full"
                        style={{ background:"rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.8)", backdropFilter:"blur(8px)", fontFamily:"var(--font-body)" }}>
                        Visit site ↗
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6 }} className="text-center mt-12">
          <a href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium transition-all duration-200"
            style={{ border:"1px solid var(--border)", color:"var(--text)", fontFamily:"var(--font-body)" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background="var(--accent)"; el.style.borderColor="var(--accent)"; el.style.color="#fff"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.borderColor="var(--border)"; el.style.color="var(--text)"; }}>
            {t.work.cta} →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
