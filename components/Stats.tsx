"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useLang } from "@/components/LangContext";

function Counter({ value, suffix }: { value:number; suffix:string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once:true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now(); const dur = 2000;
    const tick = (now: number) => {
      const p = Math.min((now-t0)/dur,1);
      setN(Math.floor((1-Math.pow(1-p,3))*value));
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export default function Stats() {
  const { t } = useLang();
  return (
    <section style={{ borderBottom:"1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderLeft:"1px solid var(--border)", borderTop:"1px solid var(--border)" }}>
          {t.stats.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-40px" }}
              transition={{ duration:0.7, delay:i*0.1 }}
              className="flex flex-col gap-2 py-12 px-8 relative overflow-hidden group"
              style={{ borderRight:"1px solid var(--border)", borderBottom:"1px solid var(--border)", cursor:"default" }}>
              {/* Hover accent fill */}
              <motion.div className="absolute inset-0 pointer-events-none"
                initial={{ scaleX:0 }} whileHover={{ scaleX:1 }}
                style={{ background:"var(--surface)", transformOrigin:"left" }}
                transition={{ duration:0.4, ease:[0.22,1,0.36,1] }} />
              <p className="relative z-10"
                style={{ fontFamily:"var(--font-display)", fontSize:"clamp(44px,5.5vw,72px)", fontWeight:700,
                  color:"var(--text)", letterSpacing:"-0.05em", lineHeight:1 }}>
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="relative z-10 text-xs uppercase tracking-[0.18em]"
                style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
