"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "motion/react";
import { useLang } from "@/components/LangContext";
import TimeDisplay from "@/components/TimeDisplay";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];
const lineVar: Variants = { hidden:{y:"108%",skewY:4,opacity:0}, show:{y:0,skewY:0,opacity:1,transition:{duration:1.1,ease:EASE}} };
const container: Variants = { hidden:{}, show:{transition:{staggerChildren:0.15,delayChildren:0.2}} };

function MagneticCTA({ href, children }: { href:string; children:React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x,{stiffness:300,damping:25}); const sy = useSpring(y,{stiffness:300,damping:25});
  const onMove = (e: React.MouseEvent) => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX-(r.left+r.width/2))*0.25); y.set((e.clientY-(r.top+r.height/2))*0.25); };
  return (
    <motion.a ref={ref} href={href} style={{ x:sx,y:sy }}
      onMouseMove={onMove} onMouseLeave={() => {x.set(0);y.set(0);}}
      className="group inline-flex items-center gap-3">
      <motion.span className="w-12 h-12 flex items-center justify-center text-sm transition-all duration-300"
        style={{ border:"1px solid var(--border)", color:"var(--text)" }}
        whileHover={{ backgroundColor:"var(--accent)", color:"#fff", borderColor:"var(--accent)" }}>→</motion.span>
      <span className="text-sm font-medium" style={{ color:"var(--text)", fontFamily:"var(--font-body)" }}>{children}</span>
    </motion.a>
  );
}

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(ellipse,rgba(46,95,232,0.15) 0%,transparent 65%)", filter:"blur(80px)", animation:"pulse-orb 10s ease-in-out infinite" }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(ellipse,rgba(46,95,232,0.07) 0%,transparent 65%)", filter:"blur(100px)", animation:"pulse-orb 14s ease-in-out infinite reverse" }} />
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize:"80px 80px" }} />
      {/* Large faint section index */}
      <span className="absolute right-6 top-1/2 -translate-y-1/2 select-none pointer-events-none font-bold"
        style={{ fontSize:"clamp(120px,20vw,280px)", color:"var(--text)", opacity:0.025, fontFamily:"var(--font-display)", letterSpacing:"-0.06em", lineHeight:1 }}>
        00
      </span>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-12 pt-36 pb-12">
        {/* Location badge */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}
          className="flex items-center gap-2 mb-12">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background:"var(--accent)" }} />
          <span className="text-xs uppercase tracking-[0.25em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{t.hero.location}</span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={container} initial="hidden" animate="show" className="mb-16">
          {[t.hero.line1, t.hero.line2, t.hero.line3].map((line, i) => (
            <div key={i} style={{ overflow:"hidden" }}>
              <motion.h1 variants={lineVar}
                style={{ fontFamily:"var(--font-display)", fontSize:"clamp(56px,10.5vw,140px)", fontWeight:700, letterSpacing:"-0.04em", lineHeight:0.97, color:i===2?"var(--accent)":"var(--text)" }}>
                {line}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        {/* Sub + CTA row */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.8 }}
          className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-16">
          <p className="max-w-xs text-sm leading-relaxed" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{t.hero.sub}</p>
          <MagneticCTA href="#contact">{t.hero.cta}</MagneticCTA>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.3, duration:0.8 }}
        className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-8 pt-5 flex items-center justify-between"
        style={{ borderTop:"1px solid var(--border)" }}>
        <TimeDisplay />
        <div className="flex items-center gap-8">
          <span className="text-xs tracking-widest uppercase hidden md:block" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>EST. 2019</span>
          <div className="flex items-center gap-2" style={{ color:"var(--muted)" }}>
            <span className="text-xs tracking-widest uppercase" style={{ fontFamily:"var(--font-body)" }}>{t.hero.scroll}</span>
            <motion.span animate={{ y:[0,5,0] }} transition={{ repeat:Infinity, duration:1.6, ease:"easeInOut" }}>↓</motion.span>
          </div>
        </div>
      </motion.div>
      <style>{`@keyframes pulse-orb{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.65;transform:scale(1.1)}}`}</style>
    </section>
  );
}
