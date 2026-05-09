"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];
const lineVar: Variants = { hidden:{y:"110%",opacity:0}, show:{y:0,opacity:1,transition:{duration:1,ease:EASE}} };
const stagger: Variants = { hidden:{}, show:{transition:{staggerChildren:0.12,delayChildren:0.05}} };

function MagneticBtn({ href, children }: { href:string; children:React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x,{stiffness:300,damping:25}); const sy = useSpring(y,{stiffness:300,damping:25});
  const onMove = (e: React.MouseEvent) => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX-(r.left+r.width/2))*0.3); y.set((e.clientY-(r.top+r.height/2))*0.3); };
  return (
    <motion.a ref={ref} href={href} style={{ x:sx, y:sy, fontFamily:"var(--font-body)" }}
      onMouseMove={onMove} onMouseLeave={() => {x.set(0);y.set(0);}}
      className="group inline-flex items-center gap-3 text-sm font-medium">
      <motion.span className="w-12 h-12 rounded-full flex items-center justify-center text-sm transition-colors duration-300"
        style={{ border:"1px solid var(--border)", color:"var(--text)" }}
        whileHover={{ backgroundColor:"var(--accent)", color:"#fff", borderColor:"var(--accent)" }}>→</motion.span>
      <span style={{ color:"var(--text)" }}>{children}</span>
    </motion.a>
  );
}

export default function Contact() {
  const { t } = useLang();
  const words = t.contact.headline.split(" ");
  const mid = Math.ceil(words.length/2);
  const lines = [words.slice(0,mid).join(" "), words.slice(mid).join(" ")];
  return (
    <section id="contact" className="py-24 md:py-40" style={{ borderBottom:"1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ duration:0.9, ease:EASE }}
          style={{ height:"1px", background:"var(--border)", transformOrigin:"left", marginBottom:"5rem" }} />
        <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="flex items-center gap-3 mb-16">
          <span className="w-5 h-px" style={{ background:"var(--accent)" }} />
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{t.contact.label}</span>
        </motion.div>
        <div className="grid md:grid-cols-[3fr_2fr] gap-16 md:gap-24 items-end">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once:true }}>
            {lines.map((line, i) => (
              <div key={i} style={{ overflow:"hidden" }}>
                <motion.h2 variants={lineVar} className="font-bold leading-[1.05]"
                  style={{ fontFamily:"var(--font-display)", fontSize:"clamp(36px,6vw,84px)", color:"var(--text)", letterSpacing:"-0.04em" }}>{line}</motion.h2>
              </div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.25 }} className="flex flex-col gap-8">
            <p className="text-base leading-[1.75]" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{t.contact.body}</p>
            <MagneticBtn href={`mailto:${t.contact.email}`}>{t.contact.cta}</MagneticBtn>
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{t.contact.or}</p>
              <a href={`mailto:${t.contact.email}`} className="text-sm transition-colors duration-200" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color="var(--text)"}
                onMouseLeave={e => (e.target as HTMLElement).style.color="var(--muted)"}>{t.contact.email}</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
