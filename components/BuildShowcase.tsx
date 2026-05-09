"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];

/* ─── SVG Wireframe: hand-drawn looking skeleton ─── */
function WireframeMockup({ visible }: { visible: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Nav bar */}
      <rect x="0" y="0" width="320" height="24" stroke="var(--border)" strokeWidth="1" />
      <rect x="8" y="8" width="40" height="8" rx="2" fill="var(--border)" />
      <rect x="200" y="8" width="20" height="8" rx="2" fill="var(--border)" />
      <rect x="226" y="8" width="20" height="8" rx="2" fill="var(--border)" />
      <rect x="252" y="8" width="20" height="8" rx="2" fill="var(--border)" />
      <rect x="282" y="6" width="30" height="12" rx="6" stroke="var(--border)" strokeWidth="1" />

      {/* Hero text lines */}
      <motion.rect x="16" y="40" width="180" height="14" rx="3" fill="var(--border)"
        initial={{ scaleX: 0 }} animate={{ scaleX: visible ? 1 : 0 }}
        style={{ transformOrigin: "left" }} transition={{ duration: 0.7, delay: 0.1 }} />
      <motion.rect x="16" y="60" width="140" height="14" rx="3" fill="var(--border)"
        initial={{ scaleX: 0 }} animate={{ scaleX: visible ? 1 : 0 }}
        style={{ transformOrigin: "left" }} transition={{ duration: 0.7, delay: 0.2 }} />
      <motion.rect x="16" y="80" width="100" height="14" rx="3" fill="var(--border)"
        initial={{ scaleX: 0 }} animate={{ scaleX: visible ? 1 : 0 }}
        style={{ transformOrigin: "left" }} transition={{ duration: 0.7, delay: 0.3 }} />
      <motion.rect x="16" y="104" width="80" height="8" rx="2" fill="var(--border)"
        initial={{ scaleX: 0 }} animate={{ scaleX: visible ? 1 : 0 }}
        style={{ transformOrigin: "left" }} transition={{ duration: 0.6, delay: 0.35 }} />
      <motion.rect x="16" y="116" width="100" height="8" rx="2" fill="var(--border)"
        initial={{ scaleX: 0 }} animate={{ scaleX: visible ? 1 : 0 }}
        style={{ transformOrigin: "left" }} transition={{ duration: 0.6, delay: 0.4 }} />
      <motion.rect x="16" y="132" width="50" height="18" rx="9" stroke="var(--border)" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.5 }} />

      {/* Stats row */}
      <motion.line x1="0" y1="160" x2="320" y2="160" stroke="var(--border)" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={{ pathLength: visible ? 1 : 0 }} transition={{ duration: 0.8, delay: 0.3 }} />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={16 + i*78} y="166" width="32" height="10" rx="2" fill="var(--border)" />
          <rect x={16 + i*78} y="180" width="50" height="6" rx="2" fill="var(--border)" opacity={0.5} />
        </g>
      ))}

      {/* Project cards */}
      <motion.rect x="16" y="196" width="132" height="18" rx="2" stroke="var(--border)" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.6 }} />
      <motion.rect x="156" y="196" width="148" height="18" rx="2" stroke="var(--border)" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.7 }} />
    </motion.svg>
  );
}

/* ─── Stage 1: Typography filled in ─── */
function TypographyMockup({ visible }: { visible: boolean }) {
  return (
    <motion.div className="absolute inset-0 flex flex-col"
      style={{ padding: "0" }}
      initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.6 }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
        <span className="text-xs font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
          Build Haus <span style={{ color: "var(--muted)" }}>Studio</span>
        </span>
        <div className="flex gap-3">
          {["Work","Services","Contact"].map(l => (
            <span key={l} className="text-[9px]" style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>{l}</span>
          ))}
          <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ border: "1px solid var(--border)", color: "var(--muted)" }}>Book a call</span>
        </div>
      </div>
      {/* Hero text */}
      <div className="flex-1 px-4 pt-5">
        {["Websites that","turn visits","into clients."].map((line, i) => (
          <motion.div key={i} initial={{ x: -20, opacity: 0 }}
            animate={{ x: visible ? 0 : -20, opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            style={{ fontFamily: "var(--font-display)", fontSize: i === 2 ? "20px" : "18px",
              fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1,
              color: i === 2 ? "var(--muted)" : "var(--text)" }}>
            {line}
          </motion.div>
        ))}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: visible ? 0.6 : 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-2" style={{ fontSize: "7px", color: "var(--muted)", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>
          Landing pages, e-commerce & web apps for brands<br />that want real results.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-3 inline-flex px-3 py-1.5 text-[8px] font-medium"
          style={{ border: "1px solid var(--muted)", color: "var(--muted)", fontFamily: "var(--font-body)" }}>
          Book a call →
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Stage 2: Colors + brand identity ─── */
function DesignMockup({ visible }: { visible: boolean }) {
  return (
    <motion.div className="absolute inset-0 flex flex-col"
      initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.6 }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
        <span className="text-xs font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
          Build Haus <span style={{ color: "var(--accent)" }}>Studio</span>
        </span>
        <div className="flex gap-3 items-center">
          {["Work","Services","Contact"].map(l => (
            <span key={l} className="text-[9px]" style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>{l}</span>
          ))}
          <motion.span className="text-[9px] px-2 py-0.5 rounded-full text-white"
            style={{ background: "var(--accent)", fontFamily: "var(--font-body)" }}
            animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            Book a call
          </motion.span>
        </div>
      </div>
      {/* Hero */}
      <div className="flex-1 px-4 pt-5 relative overflow-hidden">
        {/* Gradient orb */}
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(46,95,232,0.3),transparent)", filter: "blur(16px)" }} />
        {["Websites that","turn visits","into clients."].map((line, i) => (
          <div key={i} style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 700,
            letterSpacing: "-0.03em", lineHeight: 1.1,
            color: i === 2 ? "var(--accent)" : "var(--text)" }}>
            {line}
          </div>
        ))}
        <p className="mt-2" style={{ fontSize: "7px", color: "var(--muted)", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>
          Landing pages, e-commerce & web apps for brands<br />that want real results.
        </p>
        <motion.div className="mt-3 inline-flex px-3 py-1.5 text-[8px] font-medium rounded-none text-white"
          style={{ background: "var(--accent)", fontFamily: "var(--font-body)" }}
          whileHover={{ scale: 1.05 }}>
          Book a call →
        </motion.div>
        {/* Grid */}
        <div className="mt-4 grid grid-cols-3 border-t pt-3 gap-3" style={{ borderColor: "var(--border)" }}>
          {[["5+","Years"],["20+","Clients"],["100%","Results"]].map(([n,l]) => (
            <div key={l} className="text-center">
              <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text)", fontFamily: "var(--font-display)" }}>{n}</div>
              <div style={{ fontSize: "6px", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Stage 3: Fully polished ─── */
function PolishedMockup({ visible }: { visible: boolean }) {
  return (
    <motion.div className="absolute inset-0 flex flex-col"
      initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.6 }}>
      <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
        <span className="text-xs font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
          Build Haus <span style={{ color: "var(--accent)" }}>Studio</span>
        </span>
        <div className="flex gap-3 items-center">
          {["Work","Services","Contact"].map(l => (
            <span key={l} className="text-[9px]" style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>{l}</span>
          ))}
          <span className="text-[9px] px-2 py-0.5 rounded-full text-white" style={{ background: "var(--accent)", fontFamily: "var(--font-body)" }}>
            Book a call
          </span>
        </div>
      </div>
      <div className="flex-1 px-4 pt-4 relative overflow-hidden">
        <div className="absolute top-0 right-[-20px] w-32 h-32 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(46,95,232,0.2),transparent)", filter: "blur(24px)", animation:"pulse-orb 6s ease-in-out infinite" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize:"20px 20px" }} />
        {["Websites that","turn visits","into clients."].map((line, i) => (
          <div key={i} style={{ fontFamily:"var(--font-display)", fontSize:"18px", fontWeight:700, letterSpacing:"-0.03em", lineHeight:1.05, position:"relative", zIndex:1, color: i===2 ? "var(--accent)" : "var(--text)" }}>{line}</div>
        ))}
        <p className="mt-2" style={{ fontSize:"7px", color:"var(--muted)", fontFamily:"var(--font-body)", lineHeight:1.5, position:"relative", zIndex:1 }}>
          Landing pages, e-commerce & web apps for brands<br />that want real results.
        </p>
        <div className="mt-2 flex items-center gap-2" style={{ position:"relative", zIndex:1 }}>
          <span className="inline-flex px-3 py-1.5 text-[8px] font-medium text-white" style={{ background:"var(--accent)", fontFamily:"var(--font-body)" }}>Book a call →</span>
          <span className="text-[8px]" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>or view work</span>
        </div>
        {/* Stats + cards */}
        <div className="mt-3 grid grid-cols-3 gap-0 border-t border-b py-2" style={{ borderColor:"var(--border)" }}>
          {[["5+","Years"],["20+","Clients"],["100%","Results"]].map(([n,l],i) => (
            <div key={l} className="text-center px-1" style={{ borderRight: i<2 ? "1px solid var(--border)" : "none" }}>
              <div style={{ fontSize:"10px", fontWeight:700, color:"var(--text)", fontFamily:"var(--font-display)" }}>{n}</div>
              <div style={{ fontSize:"6px", color:"var(--muted)", fontFamily:"var(--font-body)" }}>{l}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {[{t:"GrowIt UY",g:"linear-gradient(135deg,#081A08,#1A5A1A)"},{t:"JUV Activewear",g:"linear-gradient(135deg,#3D0A00,#B83200)"}].map((p,i) => (
            <motion.div key={i} className="relative overflow-hidden" style={{ aspectRatio:"3/2", background:p.g }}
              whileHover={{ scale:1.02 }} transition={{ duration:0.3 }}>
              <div className="absolute inset-0" style={{ background:"rgba(0,0,0,0.2)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-1.5">
                <div style={{ fontSize:"6px", color:"rgba(255,255,255,0.6)", fontFamily:"var(--font-body)" }}>E-Commerce</div>
                <div style={{ fontSize:"7px", fontWeight:700, color:"#fff", fontFamily:"var(--font-display)" }}>{p.t}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function BuildShowcase() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [mockProgress, setMockProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setMockProgress(latest);
    setActiveStep(Math.min(3, Math.floor(latest * 4)));
  });

  const d = t.buildShowcase;
  const stepColors = ["rgba(46,95,232,0.08)","rgba(46,95,232,0.12)","rgba(46,95,232,0.16)","rgba(46,95,232,0.2)"];

  return (
    <section style={{ borderBottom: "1px solid var(--border)" }}>
      {/* Intro */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32">
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
          transition={{ duration:0.9, ease:EASE }}
          style={{ height:"1px", background:"var(--border)", transformOrigin:"left", marginBottom:"4rem" }} />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div style={{ overflow:"hidden" }}>
            <motion.h2 initial={{ y:"100%",opacity:0 }} whileInView={{ y:0,opacity:1 }}
              viewport={{ once:true }} transition={{ duration:1, ease:EASE }}
              className="font-bold leading-[1.05]"
              style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,4vw,52px)", color:"var(--text)", letterSpacing:"-0.03em" }}>
              {d.intro}
            </motion.h2>
          </div>
          <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.8, delay:0.15 }}
            className="text-base leading-[1.75]" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
            {d.introSub}
          </motion.p>
        </div>
      </div>

      {/* Scroll-pinned section */}
      <div ref={containerRef} style={{ height:"380vh", position:"relative" }}>
        <div style={{ position:"sticky", top:0, height:"100vh", display:"flex", alignItems:"center", overflow:"hidden" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-center">

              {/* Left: step copy with AnimatePresence */}
              <div style={{ position:"relative", minHeight:"280px" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeStep}
                    initial={{ y:30, opacity:0, filter:"blur(8px)" }}
                    animate={{ y:0, opacity:1, filter:"blur(0px)" }}
                    exit={{ y:-30, opacity:0, filter:"blur(8px)" }}
                    transition={{ duration:0.5, ease:EASE }}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-bold tabular-nums" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>
                        {d.steps[activeStep]?.num}
                      </span>
                      <div className="flex-1 h-px" style={{ background:`linear-gradient(to right, var(--accent), transparent)` }} />
                      <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
                        {d.steps[activeStep]?.label}
                      </span>
                    </div>
                    <h3 className="font-bold mb-5"
                      style={{ fontFamily:"var(--font-display)", fontSize:"clamp(24px,3.5vw,50px)", color:"var(--text)", letterSpacing:"-0.03em", lineHeight:1.05 }}>
                      {d.steps[activeStep]?.headline}
                    </h3>
                    <p className="text-base leading-[1.8]" style={{ color:"var(--muted)", fontFamily:"var(--font-body)", maxWidth:"360px" }}>
                      {d.steps[activeStep]?.body}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Progress steps */}
                <div className="absolute bottom-0 left-0 flex gap-2 mt-8">
                  {d.steps.map((_, i) => (
                    <motion.div key={i}
                      animate={{ width: i===activeStep ? "32px" : "8px", background: i===activeStep ? "var(--accent)" : "var(--border)" }}
                      transition={{ duration:0.4, ease:EASE }}
                      style={{ height:"3px" }} />
                  ))}
                </div>
              </div>

              {/* Right: live animated mockup */}
              <div>
                <motion.div
                  animate={{ background: stepColors[activeStep] || "transparent" }}
                  transition={{ duration:0.6 }}
                  className="relative mx-auto"
                  style={{ maxWidth:"380px" }}>
                  {/* Browser chrome */}
                  <div className="border" style={{ borderColor:"var(--border)", background:"var(--bg)" }}>
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ borderColor:"var(--border)" }}>
                      {[0,1,2].map(i => (
                        <motion.div key={i} className="w-2.5 h-2.5 rounded-full"
                          animate={{ background: activeStep >= 2
                            ? (i===0?"#ff5f57":i===1?"#febc2e":"#28c840")
                            : "var(--border)" }}
                          transition={{ duration:0.4, delay:i*0.1 }} />
                      ))}
                      <motion.div className="flex-1 mx-2 h-4 rounded-full"
                        animate={{ background: activeStep>=1 ? "var(--surface)" : "var(--border)", opacity:0.6 }}
                        transition={{ duration:0.3 }}>
                        {activeStep >= 1 && (
                          <div className="h-full flex items-center px-2">
                            <span style={{ fontSize:"7px", color:"var(--muted)", fontFamily:"var(--font-body)" }}>
                              buildhausstudio.com
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Mockup content — actual stage components */}
                    <div className="relative" style={{ height:"220px" }}>
                      <WireframeMockup visible={activeStep === 0} />
                      <TypographyMockup visible={activeStep === 1} />
                      <DesignMockup visible={activeStep === 2} />
                      <PolishedMockup visible={activeStep === 3} />
                    </div>
                  </div>

                  {/* Stage label */}
                  <motion.div
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-2">
                    <span className="text-xs uppercase tracking-widest" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
                      {["Wireframe","Typography","Design","Polished"][activeStep]}
                    </span>
                    <div className="flex gap-1">
                      {[0,1,2,3].map(i => (
                        <div key={i} className="w-1 h-1 rounded-full" style={{ background: i===activeStep ? "var(--accent)" : "var(--border)" }} />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reveal */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
        <motion.p initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.8 }}
          className="text-xl leading-[1.7] max-w-2xl mx-auto"
          style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
          <span style={{ color:"var(--text)", fontWeight:600 }}>{d.reveal.split(".")[0]}.</span>
          {" "}{d.reveal.split(".").slice(1).join(".")}
        </motion.p>
      </div>
    </section>
  );
}
