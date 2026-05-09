"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];

type Project = { title:string; category:string; desc:string; year:string; url:string; gradient:string; tag:string };

function WorkCard({ p, i }: { p:Project; i:number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const bx = useMotionValue(0); const by = useMotionValue(0);
  const sbx = useSpring(bx,{stiffness:150,damping:25}); const sby = useSpring(by,{stiffness:150,damping:25});
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current!.getBoundingClientRect();
    bx.set(((e.clientX-r.left)/r.width-0.5)*-24);
    by.set(((e.clientY-r.top)/r.height-0.5)*-24);
  };
  const isLast = i === 6;
  return (
    <motion.a ref={ref} href={p.url} target="_blank" rel="noopener noreferrer"
      initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-80px" }}
      transition={{ duration:0.8, ease:EASE, delay:(i%2)*0.1 }}
      className={`group relative overflow-hidden rounded-sm cursor-pointer block ${isLast ? "md:col-span-2" : ""}`}
      style={{ aspectRatio: isLast ? "16/7" : "4/3" }}
      onMouseMove={onMove} onMouseLeave={() => { bx.set(0); by.set(0); }}>
      <motion.div className="absolute" style={{ inset:"-24px", background:p.gradient, x:sbx, y:sby }} />
      <div className="absolute inset-0" style={{ background:"rgba(0,0,0,0.22)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.8),transparent)" }} />
      <div className="absolute top-5 left-5 z-10">
        <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.8)", backdropFilter:"blur(8px)" }}>{p.tag}</span>
      </div>
      <motion.div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ transform:"translate(6px,-6px)" }}
        whileHover={{ x:0, y:0 }}>
        <span className="text-xl" style={{ color:"rgba(255,255,255,0.9)" }}>↗</span>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 p-7 z-20">
        <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color:"rgba(255,255,255,0.5)", fontFamily:"var(--font-body)" }}>{p.category} · {p.year}</p>
        <h3 className="text-xl md:text-2xl font-semibold leading-tight mb-2" style={{ color:"#fff", fontFamily:"var(--font-display)", letterSpacing:"-0.02em" }}>{p.title}</h3>
        <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-md" style={{ color:"rgba(255,255,255,0.65)", fontFamily:"var(--font-body)" }}>{p.desc}</p>
      </div>
    </motion.a>
  );
}

export default function Work() {
  const { t } = useLang();
  return (
    <section id="work" className="py-24 md:py-40" style={{ borderBottom:"1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ duration:0.9, ease:EASE }}
          style={{ height:"1px", background:"var(--border)", transformOrigin:"left", marginBottom:"5rem" }} />
        <div className="flex items-end justify-between mb-6 gap-8 flex-wrap">
          <div>
            <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px" style={{ background:"var(--accent)" }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{t.work.label}</span>
            </motion.div>
            <div style={{ overflow:"hidden" }}>
              <motion.h2 initial={{ y:"100%",opacity:0 }} whileInView={{ y:0,opacity:1 }} viewport={{ once:true }} transition={{ duration:1,ease:EASE }}
                className="font-bold leading-[1.05]" style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,4vw,54px)", color:"var(--text)", letterSpacing:"-0.03em" }}>
                {t.work.headline}
              </motion.h2>
            </div>
          </div>
          <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}
            className="max-w-xs text-sm leading-relaxed" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{t.work.sub}</motion.p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {t.work.items.map((p, i) => <WorkCard key={i} p={p} i={i} />)}
        </div>
        <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="text-center">
          <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium transition-all duration-200"
            style={{ border:"1px solid var(--border)", color:"var(--text)", fontFamily:"var(--font-body)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="var(--accent)"; (e.currentTarget as HTMLElement).style.borderColor="var(--accent)"; (e.currentTarget as HTMLElement).style.color="#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; (e.currentTarget as HTMLElement).style.borderColor="var(--border)"; (e.currentTarget as HTMLElement).style.color="var(--text)"; }}
          >{t.work.cta} →</a>
        </motion.div>
      </div>
    </section>
  );
}
