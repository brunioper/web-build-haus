"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "motion/react";
import { useLang } from "@/components/LangContext";
import TimeDisplay from "@/components/TimeDisplay";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];
const lineVar: Variants = { hidden:{y:"105%",opacity:0}, show:{y:0,opacity:1,transition:{duration:1,ease:EASE}} };
const container: Variants = { hidden:{}, show:{transition:{staggerChildren:0.13,delayChildren:0.3}} };
const fadeIn: Variants = { hidden:{opacity:0,y:16}, show:{opacity:1,y:0,transition:{duration:0.8}} };

function MagneticCTA({ href, children }: { href:string; children:React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x,{stiffness:300,damping:25}); const sy = useSpring(y,{stiffness:300,damping:25});
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX-(r.left+r.width/2))*0.25); y.set((e.clientY-(r.top+r.height/2))*0.25);
  };
  return (
    <motion.a ref={ref} href={href} style={{ x:sx, y:sy }}
      onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      className="group inline-flex items-center gap-3 text-base font-medium"
    >
      <motion.span className="w-11 h-11 rounded-full flex items-center justify-center text-sm transition-colors duration-300"
        style={{ border:"1px solid var(--border)", color:"var(--text)" }}
        whileHover={{ backgroundColor:"var(--accent)", color:"#fff", borderColor:"var(--accent)" }}>→</motion.span>
      <span style={{ color:"var(--text)", fontFamily:"var(--font-display)" }}>{children}</span>
    </motion.a>
  );
}

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(ellipse, rgba(46,95,232,0.18) 0%, transparent 70%)", filter:"blur(60px)", animation:"pulse-orb 8s ease-in-out infinite" }} />
      <div className="absolute bottom-0 left-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(ellipse, rgba(46,95,232,0.09) 0%, transparent 70%)", filter:"blur(80px)", animation:"pulse-orb 12s ease-in-out infinite reverse" }} />
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize:"72px 72px" }} />

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-12 pt-32 pb-16">
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }} className="flex items-center gap-2 mb-14">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background:"var(--accent)" }} />
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{t.hero.location}</span>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="mb-16">
          {[t.hero.line1, t.hero.line2, t.hero.line3].map((line, i) => (
            <div key={i} style={{ overflow:"hidden" }}>
              <motion.h1 variants={lineVar} style={{
                fontFamily:"var(--font-display)", fontSize:"clamp(52px,9.5vw,120px)",
                fontWeight:600, letterSpacing:"-0.03em", lineHeight:1.02,
                color: i===2 ? "var(--accent)" : "var(--text)",
              }}>{line}</motion.h1>
            </div>
          ))}
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col sm:flex-row sm:items-end gap-10 sm:gap-20">
          <motion.p variants={fadeIn} className="max-w-sm text-base leading-relaxed" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{t.hero.sub}</motion.p>
          <motion.div variants={fadeIn}><MagneticCTA href="#contact">{t.hero.cta}</MagneticCTA></motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4, duration:0.8 }}
        className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-8 pt-6 flex items-center justify-between"
        style={{ borderTop:"1px solid var(--border)" }}>
        <TimeDisplay />
        <div className="flex items-center gap-6">
          <span className="text-xs tracking-widest uppercase hidden md:block" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>EST. 2019</span>
          <div className="flex items-center gap-2" style={{ color:"var(--muted)" }}>
            <span className="text-xs tracking-widest uppercase" style={{ fontFamily:"var(--font-body)" }}>{t.hero.scroll}</span>
            <motion.span animate={{ y:[0,5,0] }} transition={{ repeat:Infinity, duration:1.6, ease:"easeInOut" }} className="text-sm">↓</motion.span>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes pulse-orb { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.1)} }
      `}</style>
    </section>
  );
}
