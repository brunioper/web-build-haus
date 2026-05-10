"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "motion/react";
import { useLang } from "@/components/LangContext";
import TimeDisplay from "@/components/TimeDisplay";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];
const lineVar: Variants = { hidden:{y:"108%",skewY:4,opacity:0}, show:{y:0,skewY:0,opacity:1,transition:{duration:1.1,ease:EASE}} };
const container: Variants = { hidden:{}, show:{transition:{staggerChildren:0.15,delayChildren:0.2}} };

/* 3D Blender hero loop — only loads when WebGL/video is supported and motion is allowed */
function BlenderHeroLoop() {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  if (reduced) {
    return (
      <div className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 55% at 75% 30%, rgba(46,95,232,0.18), transparent 60%)" }} />
    );
  }

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <video
        ref={ref}
        autoPlay loop muted playsInline preload="metadata"
        poster="/hero-loop-poster.jpg"
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-[70vw] max-w-[1200px] object-cover"
        style={{ mixBlendMode: "screen", opacity: 0.85, maskImage: "radial-gradient(ellipse 80% 70% at 70% 45%, black 35%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 70% 45%, black 35%, transparent 75%)" }}>
        <source src="/hero-loop.webm" type="video/webm" />
        <source src="/hero-loop.mp4"  type="video/mp4" />
      </video>
      {/* subtle dark gradient on left for headline contrast */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, var(--bg) 0%, rgba(10,10,15,0.85) 25%, rgba(10,10,15,0.55) 50%, transparent 80%)" }} />
    </div>
  );
}

/* Pre-defined floating particles — deterministic to avoid hydration issues */
const PARTICLES = [
  {x:12,y:22,s:2.5,d:8,del:0},{x:78,y:8,s:1.5,d:11,del:1.2},{x:55,y:35,s:3,d:7,del:0.5},
  {x:88,y:55,s:2,d:9,del:2},{x:25,y:68,s:1.5,d:10,del:0.8},{x:65,y:78,s:2.5,d:12,del:1.5},
  {x:40,y:15,s:2,d:8,del:0.3},{x:92,y:20,s:1.5,d:14,del:1.8},{x:8,y:82,s:3,d:9,del:0.6},
  {x:72,y:92,s:2,d:11,del:2.2},{x:33,y:48,s:1.5,d:7,del:0.9},{x:82,y:38,s:2.5,d:13,del:1.1},
  {x:18,y:55,s:2,d:8,del:0.4},{x:60,y:12,s:3,d:10,del:1.7},{x:48,y:85,s:1.5,d:9,del:2.5},
];

/* Animated SVG accent shape */
function AccentShape() {
  return (
    <svg className="absolute right-0 top-0 w-[55vw] max-w-[700px] h-[55vw] max-h-[700px] pointer-events-none"
      viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grd" cx="60%" cy="30%" r="60%">
          <stop offset="0%" stopColor="rgba(46,95,232,0.18)" />
          <stop offset="100%" stopColor="rgba(46,95,232,0)" />
        </radialGradient>
      </defs>
      {/* Main glow blob */}
      <motion.ellipse cx="380" cy="220" rx="280" ry="240" fill="url(#grd)"
        animate={{ rx:[280,310,280], ry:[240,220,240], cx:[380,360,380] }}
        transition={{ duration:8, repeat:Infinity, ease:"easeInOut" }} />
      {/* Geometric accent lines */}
      <motion.line x1="200" y1="60" x2="480" y2="340" stroke="rgba(46,95,232,0.08)" strokeWidth="1"
        animate={{ x2:[480,460,480] }} transition={{ duration:6, repeat:Infinity, ease:"easeInOut" }} />
      <motion.line x1="350" y1="40" x2="560" y2="280" stroke="rgba(46,95,232,0.05)" strokeWidth="1"
        animate={{ x1:[350,340,350] }} transition={{ duration:9, repeat:Infinity, ease:"easeInOut" }} />
      {/* Dots at intersection */}
      <motion.circle cx="420" cy="180" r="2" fill="rgba(46,95,232,0.5)"
        animate={{ r:[2,3,2], opacity:[0.5,0.9,0.5] }} transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }} />
      <motion.circle cx="500" cy="240" r="1.5" fill="rgba(46,95,232,0.3)"
        animate={{ r:[1.5,2.5,1.5] }} transition={{ duration:5, repeat:Infinity, ease:"easeInOut", delay:1 }} />
    </svg>
  );
}

function MagneticCTA({ href, children }: { href:string; children:React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x,{stiffness:300,damping:25}); const sy = useSpring(y,{stiffness:300,damping:25});
  const onMove = (e: React.MouseEvent) => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX-(r.left+r.width/2))*0.25); y.set((e.clientY-(r.top+r.height/2))*0.25); };
  return (
    <motion.a ref={ref} href={href} style={{ x:sx, y:sy }}
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
      {/* 3D Blender background loop */}
      <BlenderHeroLoop />

      {/* SVG accent shape */}
      <AccentShape />

      {/* CSS grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize:"80px 80px" }} />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ left:`${p.x}%`, top:`${p.y}%`, width:`${p.s}px`, height:`${p.s}px`, background:"var(--accent)", opacity:0.35 }}
          animate={{ y:[0,-p.d*2,0], opacity:[0.35,0.7,0.35] }}
          transition={{ duration:p.d, repeat:Infinity, ease:"easeInOut", delay:p.del }} />
      ))}

      {/* Large faint index number */}
      <span className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none font-bold"
        style={{ fontSize:"clamp(100px,20vw,260px)", color:"var(--text)", opacity:0.025, fontFamily:"var(--font-display)", letterSpacing:"-0.06em", lineHeight:1 }}>
        00
      </span>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-12 pt-36 pb-12">
        {/* Location */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}
          className="flex items-center gap-2 mb-12">
          <motion.span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background:"var(--accent)" }}
            animate={{ scale:[1,1.4,1], opacity:[1,0.6,1] }} transition={{ duration:2, repeat:Infinity }} />
          <span className="text-xs uppercase tracking-[0.25em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>
            {t.hero.location}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={container} initial="hidden" animate="show" className="mb-16">
          {[t.hero.line1, t.hero.line2, t.hero.line3].map((line, i) => (
            <div key={i} style={{ overflow:"hidden" }}>
              <motion.h1 variants={lineVar}
                style={{ fontFamily:"var(--font-display)", fontSize:"clamp(52px,10vw,132px)", fontWeight:700,
                  letterSpacing:"-0.04em", lineHeight:0.97, color:i===2?"var(--accent)":"var(--text)" }}>
                {line}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        {/* Sub + CTA */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.9 }}
          className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-16">
          <p className="max-w-xs text-sm leading-relaxed" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{t.hero.sub}</p>
          <MagneticCTA href="#contact">{t.hero.cta}</MagneticCTA>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4, duration:0.8 }}
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
    </section>
  );
}
