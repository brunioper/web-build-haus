"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];

export default function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number|null>(null);
  return (
    <section className="py-24 md:py-40" style={{ borderBottom:"1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
          transition={{ duration:0.9, ease:EASE }}
          style={{ height:"1px", background:"var(--border)", transformOrigin:"left", marginBottom:"5rem" }} />
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 md:gap-24">
          <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px" style={{ background:"var(--accent)" }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{t.faq.label}</span>
            </div>
          </motion.div>
          <div style={{ borderTop:"1px solid var(--border)" }}>
            {t.faq.items.map((item, i) => (
              <motion.div key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.06 }}
                style={{ borderBottom:"1px solid var(--border)" }}>
                <button onClick={() => setOpen(open===i?null:i)}
                  className="w-full flex items-center justify-between gap-8 py-6 text-left"
                  style={{ cursor:"pointer" }}>
                  <span className="text-base font-medium" style={{ color:"var(--text)", fontFamily:"var(--font-display)", letterSpacing:"-0.01em" }}>{item.q}</span>
                  <motion.span animate={{ rotate: open===i?45:0 }} transition={{ duration:0.25 }}
                    className="shrink-0 text-xl" style={{ color:"var(--accent)" }}>+</motion.span>
                </button>
                <AnimatePresence>
                  {open===i && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
                      transition={{ duration:0.35, ease:EASE }} className="overflow-hidden">
                      <p className="pb-6 text-sm leading-[1.75]" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
