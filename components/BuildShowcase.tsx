"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];

/* Returns 0→1 as progress moves from `from` to `to` */
const lerp01 = (progress: number, from: number, to: number) =>
  Math.max(0, Math.min(1, (progress - from) / (to - from)));

/* Spring-pop style transform driven by scroll */
const popStyle = (v: number, yOffset = 16, scaleFrom = 0.88) => ({
  opacity: v,
  transform: `translateY(${(1 - v) * yOffset}px) scale(${scaleFrom + v * (1 - scaleFrom)})`,
  transition: "none",
});

const slideX = (v: number, xOffset = -24) => ({
  opacity: v,
  transform: `translateX(${(1 - v) * xOffset}px)`,
  transition: "none",
});

const grow = (v: number) => ({
  opacity: Math.min(v * 2, 1),
  transform: `scaleX(${v})`,
  transformOrigin: "left",
  transition: "none",
});

function LiveMockup({ progress }: { progress: number }) {
  const p = progress;
  const s = (from: number, to: number) => lerp01(p, from, to);

  const projects = [
    { title:"GrowIt UY", sub:"E-Commerce · Agriculture", gradient:"linear-gradient(135deg,#081A08,#1A5A1A)" },
    { title:"JUV Activewear", sub:"E-Commerce · Fashion", gradient:"linear-gradient(135deg,#3D0A00,#B83200)" },
    { title:"Operal", sub:"Landing Page · Logistics", gradient:"linear-gradient(135deg,#0A1E2E,#1A5A8A)" },
    { title:"Opertti & Asoc.", sub:"Landing Page · Legal", gradient:"linear-gradient(135deg,#141414,#3A3A3A)" },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background:"var(--bg)", border:"1px solid var(--border)" }}>

      {/* ── Grid overlay ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        opacity: s(0,0.06),
        backgroundImage:"linear-gradient(rgba(46,95,232,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(46,95,232,0.06) 1px,transparent 1px)",
        backgroundSize:"32px 32px",
        transition:"none",
      }}/>

      {/* ── Navigation ── */}
      <div className="absolute top-0 left-0 right-0 border-b" style={{ borderColor:"var(--border)", height:"38px", ...popStyle(s(0.06,0.14),-10,0.95) }}>
        {/* Logo */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-baseline gap-0.5" style={slideX(s(0.10,0.17))}>
          <span style={{ fontFamily:"var(--font-display)", fontSize:"11px", fontWeight:700, color:"var(--text)" }}>Build Haus </span>
          <span style={{ fontFamily:"var(--font-display)", fontSize:"11px", fontWeight:700, color:"var(--accent)" }}>Studio</span>
        </div>
        {/* Nav links */}
        {["Work","Services","About"].map((label, i) => (
          <div key={label} className="absolute top-1/2 -translate-y-1/2"
            style={{ right:`${120 - i*52}px`, ...slideX(s(0.15 + i*0.03, 0.22 + i*0.03), 16) }}>
            <span style={{ fontSize:"8px", color:"var(--muted)", fontFamily:"var(--font-body)" }}>{label}</span>
          </div>
        ))}
        {/* CTA button */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full"
          style={{ background:"var(--accent)", ...popStyle(s(0.22,0.30),-8,0.8) }}>
          <span style={{ fontSize:"8px", color:"#fff", fontFamily:"var(--font-body)", whiteSpace:"nowrap" }}>Book a call</span>
        </div>
      </div>

      {/* ── Hero background gradient ── */}
      <div className="absolute pointer-events-none" style={{
        top:"38px", right:"-40px", width:"280px", height:"280px", borderRadius:"50%",
        background:"radial-gradient(ellipse,rgba(46,95,232,0.22),transparent 70%)",
        filter:"blur(40px)",
        opacity: s(0.28,0.38),
        transition:"none",
      }}/>

      {/* ── Hero section ── */}
      <div className="absolute left-5 right-5" style={{ top:"54px" }}>
        {/* Lines */}
        {[{text:"Websites that",w:"160px"},{text:"turn visits",w:"130px"},{text:"into clients.",w:"150px",accent:true}].map((line,i)=>(
          <div key={i} style={{ overflow:"hidden", marginBottom:"3px" }}>
            <div style={{ ...slideX(s(0.30+i*0.06, 0.38+i*0.06), -20) }}>
              <span style={{ fontFamily:"var(--font-display)", fontSize:i<2?"20px":"22px", fontWeight:700,
                letterSpacing:"-0.03em", lineHeight:1.05, color:line.accent?"var(--accent)":"var(--text)" }}>
                {line.text}
              </span>
            </div>
          </div>
        ))}
        {/* Sub text */}
        <div style={{ marginTop:"8px", ...popStyle(s(0.46,0.52)) }}>
          <div style={{ width:"200px", height:"5px", borderRadius:"3px", background:"var(--muted)", opacity:0.3, marginBottom:"3px" }}/>
          <div style={{ width:"160px", height:"5px", borderRadius:"3px", background:"var(--muted)", opacity:0.2 }}/>
        </div>
        {/* CTA */}
        <div style={{ marginTop:"12px", display:"inline-flex", alignItems:"center", gap:"8px", ...popStyle(s(0.52,0.60),-12,0.75) }}>
          <div style={{ padding:"8px 16px", background:"var(--accent)" }}>
            <span style={{ fontSize:"9px", color:"#fff", fontFamily:"var(--font-body)" }}>Book a call →</span>
          </div>
          <div style={{ padding:"8px 12px", border:"1px solid var(--border)" }}>
            <span style={{ fontSize:"9px", color:"var(--muted)", fontFamily:"var(--font-body)" }}>View work</span>
          </div>
        </div>
      </div>

      {/* ── Stats divider + stats ── */}
      <div className="absolute left-0 right-0" style={{ top:"215px" }}>
        <div style={{ height:"1px", background:"var(--border)", ...grow(s(0.60,0.66)) }}/>
        <div className="grid grid-cols-4" style={{ borderBottom:"1px solid var(--border)" }}>
          {[["5+","Years"],["20+","Clients"],["20+","Projects"],["100%","Satisfaction"]].map(([n,l],i)=>(
            <div key={l} className="flex flex-col items-center py-3"
              style={{ borderRight:i<3?"1px solid var(--border)":"none", ...popStyle(s(0.64+i*0.03,0.70+i*0.03)) }}>
              <span style={{ fontFamily:"var(--font-display)", fontSize:"16px", fontWeight:700, color:"var(--text)" }}>{n}</span>
              <span style={{ fontFamily:"var(--font-body)", fontSize:"6px", color:"var(--muted)", textTransform:"uppercase", letterSpacing:"0.1em" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Project cards ── */}
      <div className="absolute left-0 right-0" style={{ top:"295px" }}>
        <div style={{ padding:"0 12px 4px", opacity: s(0.72,0.76) }}>
          <span style={{ fontSize:"7px", textTransform:"uppercase", letterSpacing:"0.2em", color:"var(--accent)", fontFamily:"var(--font-body)" }}>Selected Work</span>
        </div>
        <div className="grid grid-cols-2" style={{ gap:"2px", padding:"0 12px" }}>
          {projects.map((proj, i)=>(
            <div key={i} className="relative overflow-hidden"
              style={{ aspectRatio:"16/9", background:proj.gradient, ...popStyle(s(0.74+i*0.05, 0.80+i*0.05)) }}>
              <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.2)" }}/>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"8px",
                background:"linear-gradient(to top,rgba(0,0,0,0.7),transparent)" }}>
                <div style={{ fontSize:"6px", color:"rgba(255,255,255,0.5)", fontFamily:"var(--font-body)" }}>{proj.sub}</div>
                <div style={{ fontSize:"8px", fontWeight:700, color:"#fff", fontFamily:"var(--font-display)" }}>{proj.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Services bar ── */}
      <div className="absolute left-0 right-0 border-t" style={{ top:"480px", borderColor:"var(--border)", ...popStyle(s(0.88,0.94)) }}>
        {["01 — Strategy","02 — Design","03 — Build"].map((s2,i)=>(
          <div key={i} className="inline-flex items-center border-r px-5 py-3" style={{ borderColor:"var(--border)" }}>
            <span style={{ fontSize:"8px", color:"var(--muted)", fontFamily:"var(--font-body)", fontWeight:500 }}>{s2}</span>
          </div>
        ))}
      </div>

      {/* ── Live cursor dot ── */}
      <div style={{ position:"absolute", bottom:"20px", right:"20px", ...popStyle(s(0.94,1.0)) }}>
        <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
          <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"var(--accent)",
            animation: p > 0.94 ? "pulse-orb 1.5s ease-in-out infinite" : "none" }}/>
          <div style={{ width:"28px", height:"28px", borderRadius:"50%", border:"1px solid rgba(46,95,232,0.5)" }}/>
        </div>
      </div>

      {/* ── "Finished" glow on completion ── */}
      {p > 0.96 && (
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 60% 30%,rgba(46,95,232,0.08),transparent 60%)", pointerEvents:"none", animation:"pulse-orb 3s ease-in-out infinite" }}/>
      )}
    </div>
  );
}

export default function BuildShowcase() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setProg(v));

  const d = t.buildShowcase;
  const pct = Math.round(prog * 100);

  return (
    <section style={{ borderBottom:"1px solid var(--border)" }}>
      {/* Section intro */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
          transition={{ duration:0.9, ease:EASE }}
          style={{ height:"1px", background:"var(--border)", transformOrigin:"left", marginBottom:"4rem" }} />
        <div className="flex items-center gap-3 mb-8">
          <span className="w-5 h-px" style={{ background:"var(--accent)" }} />
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>Build Process</span>
        </div>
        <div style={{ overflow:"hidden" }}>
          <motion.h2 initial={{ y:"108%", skewY:3 }} whileInView={{ y:0, skewY:0 }}
            viewport={{ once:true }} transition={{ duration:1.1, ease:EASE }}
            className="font-bold" style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,4.5vw,60px)", color:"var(--text)", letterSpacing:"-0.03em", lineHeight:1.05 }}>
            {d.intro}
          </motion.h2>
        </div>
        <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.8, delay:0.2 }}
          className="mt-6 text-base leading-[1.8] max-w-lg" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
          {d.introSub}
        </motion.p>
      </div>

      {/* ─── SCROLL-PINNED BUILD ─── */}
      <div ref={containerRef} style={{ height:"500vh" }}>
        <div style={{ position:"sticky", top:0, height:"100vh", display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <div className="max-w-5xl mx-auto w-full px-6 lg:px-8 flex flex-col" style={{ height:"90vh" }}>
            {/* Top bar: progress + label */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
                  Building your website
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-px" style={{ width:"120px", background:"var(--border)", position:"relative" }}>
                  <div style={{ position:"absolute", inset:0, width:`${pct}%`, background:"var(--accent)", transition:"width 0.1s linear" }}/>
                </div>
                <span className="text-xs tabular-nums font-bold" style={{ color:"var(--accent)", fontFamily:"var(--font-body)", minWidth:"32px" }}>
                  {pct}%
                </span>
              </div>
            </div>

            {/* Mockup — fills remaining space */}
            <div style={{ flex:1, position:"relative" }}>
              <LiveMockup progress={prog} />
              {/* Corner labels */}
              <div style={{ position:"absolute", bottom:"-24px", left:0 }}>
                <span style={{ fontSize:"9px", color:"var(--muted)", fontFamily:"var(--font-body)", textTransform:"uppercase", letterSpacing:"0.15em" }}>
                  {prog < 0.25 ? "↳ Structure" : prog < 0.5 ? "↳ Design" : prog < 0.75 ? "↳ Content" : "↳ Polish"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reveal section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
        <motion.p initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.8 }}
          className="text-xl leading-[1.7] max-w-2xl mx-auto"
          style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
          <span style={{ color:"var(--text)", fontWeight:600 }}>{d.reveal.split(".")[0]}.</span>
          {" "}{d.reveal.split(".").slice(1).join(".")}
        </motion.p>
        <motion.a href="#work" initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}
          className="inline-flex items-center gap-3 mt-10 px-8 py-4 text-sm font-medium"
          style={{ border:"1px solid var(--border)", color:"var(--text)", fontFamily:"var(--font-body)" }}
          onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background="var(--accent)";el.style.borderColor="var(--accent)";el.style.color="#fff";}}
          onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background="transparent";el.style.borderColor="var(--border)";el.style.color="var(--text)";}}>
          See the real work →
        </motion.a>
      </div>
    </section>
  );
}
