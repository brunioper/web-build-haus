"use client";
import { motion, type Variants } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];
const lineVar: Variants = {
  hidden:{y:"108%",skewY:4,opacity:0},
  show:{y:0,skewY:0,opacity:1,transition:{duration:1.1,ease:EASE}},
};
const stagger: Variants = { hidden:{}, show:{transition:{staggerChildren:0.14,delayChildren:0.1}} };

const copy = {
  en:{
    headline:["Tired of websites","that look like","everyone else's?"],
    body:"Most agencies charge a lot and deliver a template. We start from scratch, listen to your business, and build something your clients will actually remember.",
    note:"Build Haus Studio — Montevideo, Uruguay",
    word1:"Strategy", word2:"Design", word3:"Build",
  },
  es:{
    headline:["¿Cansado de sitios","que parecen todos","iguales?"],
    body:"La mayoría cobra mucho y entrega una plantilla. Nosotros empezamos desde cero, escuchamos tu negocio y construimos algo que tus clientes van a recordar.",
    note:"Build Haus Studio — Montevideo, Uruguay",
    word1:"Estrategia", word2:"Diseño", word3:"Desarrollo",
  },
};

export default function Provocation() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <section className="relative overflow-hidden" style={{ borderBottom:"1px solid rgba(255,255,255,0.07)", background:"#0A0A0F" }}>
      {/* Noise grain */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity:0.045,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      {/* Blue glow */}
      <div className="absolute pointer-events-none" style={{ top:"-20%", right:"-10%", width:"60vw", height:"60vw", maxWidth:"700px", maxHeight:"700px", borderRadius:"50%",
        background:"radial-gradient(ellipse,rgba(46,95,232,0.15),transparent 65%)", filter:"blur(60px)", animation:"pulse-orb 10s ease-in-out infinite" }} />

      {/* 3 floating discipline words */}
      {[{word:c.word1,x:"5%",y:"15%",rot:-8},{word:c.word2,x:"68%",y:"8%",rot:4},{word:c.word3,x:"80%",y:"72%",rot:-5}].map((w,i)=>(
        <motion.div key={w.word}
          initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          transition={{ duration:0.8, delay:0.8+i*0.2 }}
          style={{ position:"absolute", left:w.x, top:w.y, fontSize:"clamp(10px,1.2vw,14px)", fontWeight:700,
            color:"rgba(46,95,232,0.25)", fontFamily:"var(--font-display)", letterSpacing:"0.2em",
            textTransform:"uppercase", transform:`rotate(${w.rot}deg)`, pointerEvents:"none" }}>
          {w.word}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 md:py-52">
        <div className="grid md:grid-cols-[5fr_2fr] gap-16 md:gap-24 items-end">
          {/* Left: big headline */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once:true, margin:"-80px" }}>
            {c.headline.map((line,i)=>(
              <div key={i} style={{ overflow:"hidden" }}>
                <motion.h2 variants={lineVar}
                  style={{ fontFamily:"var(--font-display)", fontSize:"clamp(44px,8vw,104px)", fontWeight:700,
                    letterSpacing:"-0.04em", lineHeight:1.0,
                    color: i===2 ? "var(--accent)" : "#F5F5F0" }}>
                  {line}
                </motion.h2>
              </div>
            ))}
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.8, delay:0.35 }}
            className="flex flex-col gap-8">
            <p className="text-base leading-[1.8]" style={{ color:"rgba(245,245,240,0.55)", fontFamily:"var(--font-body)" }}>{c.body}</p>
            <div className="flex items-center gap-3">
              <span className="w-5 h-px" style={{ background:"var(--accent)" }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"rgba(46,95,232,0.8)", fontFamily:"var(--font-body)" }}>{c.note}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border accent */}
      <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
        transition={{ duration:1.2, ease:EASE }}
        style={{ height:"1px", background:"linear-gradient(to right, var(--accent), transparent)", transformOrigin:"left" }} />
    </section>
  );
}
