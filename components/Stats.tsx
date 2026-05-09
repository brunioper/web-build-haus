"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useLang } from "@/components/LangContext";

function Counter({ value, suffix }: { value:number; suffix:string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once:true });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const start = performance.now(); const duration = 2000;
    const raf = (now: number) => { const p = Math.min((now-start)/duration,1); setDisplay(Math.floor((1-Math.pow(1-p,3))*value)); if(p<1) requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }, [isInView, value]);
  return <span ref={ref}>{display}{suffix}</span>;
}

export default function Stats() {
  const { t } = useLang();
  return (
    <section style={{ borderBottom:"1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderLeft:"1px solid var(--border)", borderTop:"1px solid var(--border)" }}>
          {t.stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }}
              transition={{ duration:0.7, delay:i*0.08 }} className="flex flex-col gap-3 py-12 px-8"
              style={{ borderRight:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
              <p className="text-5xl md:text-6xl leading-none font-bold" style={{ fontFamily:"var(--font-display)", color:"var(--text)", letterSpacing:"-0.04em" }}>
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs uppercase tracking-widest" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
