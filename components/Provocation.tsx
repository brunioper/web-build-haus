"use client";
import { motion, type Variants } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];
const lineVar: Variants = { hidden:{y:"108%",skewY:3,opacity:0}, show:{y:0,skewY:0,opacity:1,transition:{duration:1.1,ease:EASE}} };
const stagger: Variants = { hidden:{}, show:{transition:{staggerChildren:0.12,delayChildren:0.1}} };

const copy = {
  en: {
    headline: ["Tired of websites", "that look like", "everyone else's?"],
    body: "Most agencies charge a lot and deliver a template. We don't do templates. We start from scratch, listen to your business, and build something that actually works — something your clients will remember.",
    note: "Build Haus Studio — Montevideo, Uruguay",
  },
  es: {
    headline: ["¿Cansado de sitios", "que parecen todos", "iguales?"],
    body: "La mayoría cobra mucho y entrega una plantilla. Nosotros no hacemos plantillas. Empezamos desde cero, escuchamos tu negocio y construimos algo que funciona de verdad — algo que tus clientes van a recordar.",
    note: "Build Haus Studio — Montevideo, Uruguay",
  },
};

export default function Provocation() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <section className="py-28 md:py-44 relative overflow-hidden" style={{ borderBottom:"1px solid var(--border)" }}>
      {/* Large faint section number */}
      <span className="absolute left-4 top-1/2 -translate-y-1/2 select-none pointer-events-none font-bold"
        style={{ fontSize:"clamp(100px,18vw,240px)", color:"var(--text)", opacity:0.025, fontFamily:"var(--font-display)", letterSpacing:"-0.06em", lineHeight:1 }}>
        01
      </span>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-[3fr_2fr] gap-16 md:gap-24 items-end">
          {/* Left: big headline */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once:true, margin:"-80px" }}>
            {c.headline.map((line, i) => (
              <div key={i} style={{ overflow:"hidden" }}>
                <motion.h2 variants={lineVar}
                  style={{ fontFamily:"var(--font-display)", fontSize:"clamp(40px,7vw,96px)", fontWeight:700,
                    letterSpacing:"-0.04em", lineHeight:1.0,
                    color: i === 2 ? "var(--accent)" : "var(--text)" }}>
                  {line}
                </motion.h2>
              </div>
            ))}
          </motion.div>

          {/* Right: body + label */}
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.8, delay:0.25 }}
            className="flex flex-col gap-8">
            <p className="text-base leading-[1.8]" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
              {c.body}
            </p>
            <div className="flex items-center gap-3">
              <span className="w-5 h-px" style={{ background:"var(--accent)" }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>
                {c.note}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
