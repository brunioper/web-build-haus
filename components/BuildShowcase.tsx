"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];

// Mini mockup that changes with scroll progress
function Mockup({ progress }: { progress: number }) {
  const stage = Math.floor(progress * 4); // 0-3
  const stageProgress = (progress * 4) % 1;

  const wireColor = "var(--border)";
  const accentColor = "var(--accent)";
  const textColor = "var(--text)";
  const mutedColor = "var(--muted)";
  const surfaceColor = "var(--surface)";

  const hasText = progress > 0.25;
  const hasColor = progress > 0.5;
  const isPolished = progress > 0.75;

  return (
    <div className="relative w-full h-full rounded-sm overflow-hidden"
      style={{ background: isPolished ? "var(--bg)" : "transparent", border: `1px solid ${wireColor}`, transition: "background 0.6s ease" }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ borderColor: wireColor, background: isPolished ? "var(--surface)" : "transparent" }}>
        {[0,1,2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full" style={{ background: isPolished ? (i===0?"#ff5f57":i===1?"#febc2e":"#28c840") : wireColor }} />
        ))}
        <div className="flex-1 mx-3 h-4 rounded-full" style={{ background: isPolished ? "var(--surface2)" : wireColor, opacity: 0.5 }} />
      </div>

      {/* Fake nav */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: wireColor }}>
        <div className="h-3 rounded" style={{ width: isPolished ? "auto" : "60px", background: isPolished ? "transparent" : wireColor }}>
          {isPolished && <span className="text-xs font-bold" style={{ color: textColor, fontFamily: "var(--font-display)" }}>Build Haus <span style={{ color: accentColor }}>Studio</span></span>}
        </div>
        <div className="flex gap-2">
          {["Work","Services","Contact"].map(item => (
            <div key={item} className="h-2.5 rounded" style={{ width: isPolished ? "auto" : "30px", background: isPolished ? "transparent" : wireColor }}>
              {isPolished && <span className="text-[9px]" style={{ color: mutedColor, fontFamily: "var(--font-body)" }}>{item}</span>}
            </div>
          ))}
          <div className="h-5 rounded-full px-2 flex items-center" style={{ background: hasColor ? accentColor : wireColor, minWidth: "40px" }}>
            {isPolished && <span className="text-[8px] text-white font-medium" style={{ fontFamily: "var(--font-body)" }}>Book</span>}
          </div>
        </div>
      </div>

      {/* Hero area */}
      <div className="px-4 pt-4 pb-3">
        <div className="mb-1" style={{ height: hasText ? "auto" : "12px", background: hasText ? "transparent" : wireColor, borderRadius: "4px", width: hasText ? "auto" : "80%" }}>
          {hasText && <div style={{ fontSize:"11px", fontWeight:700, color: textColor, letterSpacing:"-0.02em", lineHeight:1.1, fontFamily:"var(--font-display)" }}>
            Websites that<br/>turn visits<br/><span style={{ color: accentColor }}>into clients.</span>
          </div>}
        </div>
        {!hasText && <>
          <div className="mb-1 rounded" style={{ height:"10px", background: wireColor, width:"60%", opacity:0.6 }} />
          <div className="mb-2 rounded" style={{ height:"10px", background: wireColor, width:"40%", opacity:0.4 }} />
        </>}
        {hasText && <p style={{ fontSize:"7px", color: mutedColor, marginTop:"4px", lineHeight:1.4, fontFamily:"var(--font-body)" }}>
          Landing pages, e-commerce & web apps for brands that want real results.
        </p>}
        {!hasText && <div className="rounded" style={{ height:"7px", background: wireColor, width:"90%", marginTop:"4px", opacity:0.3 }} />}
        <div className="mt-2 h-6 rounded-full inline-flex items-center px-3" style={{ background: hasColor ? accentColor : wireColor, minWidth:"60px" }}>
          {isPolished && <span style={{ fontSize:"8px", color:"#fff", fontFamily:"var(--font-body)" }}>Book a call</span>}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 border-t border-b mx-4 my-2" style={{ borderColor: wireColor }}>
        {[["5+","Years"],["20+","Clients"],["100%","Results"]].map(([n,l]) => (
          <div key={l} className="px-2 py-2 text-center border-r last:border-r-0" style={{ borderColor: wireColor }}>
            {hasText ? <>
              <div style={{ fontSize:"10px", fontWeight:700, color: hasColor ? textColor : mutedColor, fontFamily:"var(--font-display)" }}>{n}</div>
              <div style={{ fontSize:"6px", color: mutedColor, fontFamily:"var(--font-body)" }}>{l}</div>
            </> : <>
              <div className="h-2.5 rounded mx-auto mb-1" style={{ background: wireColor, width:"20px" }} />
              <div className="h-1.5 rounded mx-auto" style={{ background: wireColor, width:"28px", opacity:0.5 }} />
            </>}
          </div>
        ))}
      </div>

      {/* Project cards */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {[
            { title:"GrowIt UY", tag:"E-Commerce", gradient:"linear-gradient(135deg,#081A08,#1A5A1A)" },
            { title:"JUV Activewear", tag:"Fashion", gradient:"linear-gradient(135deg,#3D0A00,#B83200)" },
          ].map((p, i) => (
            <div key={i} className="rounded-sm overflow-hidden" style={{ aspectRatio:"4/3", border:`1px solid ${wireColor}` }}>
              <div className="w-full h-full relative" style={{ background: hasColor ? p.gradient : wireColor }}>
                {isPolished && <div className="absolute bottom-0 left-0 right-0 p-1.5" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.7),transparent)" }}>
                  <div style={{ fontSize:"7px", color:"rgba(255,255,255,0.6)", fontFamily:"var(--font-body)" }}>{p.tag}</div>
                  <div style={{ fontSize:"8px", fontWeight:700, color:"#fff", fontFamily:"var(--font-display)" }}>{p.title}</div>
                </div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage label overlay */}
      {!isPolished && (
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider"
          style={{ background: "rgba(46,95,232,0.15)", color: accentColor, border: `1px solid rgba(46,95,232,0.3)`, fontFamily:"var(--font-body)" }}>
          {progress < 0.25 ? "Wireframe" : progress < 0.5 ? "Typography" : "Styling"}
        </div>
      )}
    </div>
  );
}

export default function BuildShowcase() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const step = useTransform(scrollYProgress, [0, 0.24, 0.26, 0.49, 0.51, 0.74, 0.76, 1], [0,0,1,1,2,2,3,3]);
  const mockupProgress = scrollYProgress;

  const d = t.buildShowcase;

  return (
    <section style={{ borderBottom:"1px solid var(--border)" }}>
      {/* Intro */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32">
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
          transition={{ duration:0.9, ease:EASE }}
          style={{ height:"1px", background:"var(--border)", transformOrigin:"left", marginBottom:"4rem" }} />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.h2 initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.9, ease:EASE }}
            className="font-bold leading-[1.05]"
            style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,4vw,52px)", color:"var(--text)", letterSpacing:"-0.03em" }}>
            {d.intro}
          </motion.h2>
          <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.8, delay:0.15 }}
            className="text-base leading-[1.75]" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
            {d.introSub}
          </motion.p>
        </div>
      </div>

      {/* Scroll-pinned build sequence */}
      <div ref={containerRef} style={{ height:"350vh", position:"relative" }}>
        <div style={{ position:"sticky", top:0, height:"100vh", overflow:"hidden" }}
          className="flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-center">
            {/* Left: changing copy */}
            <div className="relative" style={{ minHeight:"260px" }}>
              {d.steps.map((s, i) => (
                <motion.div key={i}
                  style={{ position:"absolute", top:0, left:0, right:0,
                    opacity: useTransform(step, [i-0.3, i, i+0.7, i+1], [0,1,1,0]),
                    y: useTransform(step, [i-0.3, i, i+0.7, i+1], [24,0,0,-24]) }}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-medium" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>{s.num}</span>
                    <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>{s.label}</span>
                  </div>
                  <h3 className="font-bold mb-4"
                    style={{ fontFamily:"var(--font-display)", fontSize:"clamp(24px,3.5vw,46px)", color:"var(--text)", letterSpacing:"-0.03em", lineHeight:1.05 }}>
                    {s.headline}
                  </h3>
                  <p className="text-base leading-[1.75]" style={{ color:"var(--muted)", fontFamily:"var(--font-body)", maxWidth:"380px" }}>
                    {s.body}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right: live mockup */}
            <div style={{ height:"65vh", maxHeight:"520px" }}>
              <motion.div style={{ height:"100%", opacity: useTransform(scrollYProgress, [0,0.05], [0,1]) }}>
                <Mockup progress={0} />
              </motion.div>
            </div>
          </div>

          {/* Scroll progress dots */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {d.steps.map((_, i) => (
              <motion.div key={i} className="w-1 h-1 rounded-full transition-all duration-300"
                style={{ background: "var(--accent)", opacity: useTransform(step, [i-0.5,i,i+0.5], [0.2,1,0.2]) }} />
            ))}
          </div>
        </div>
      </div>

      {/* Reveal closer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <motion.p initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.8 }}
          className="text-xl leading-[1.6] max-w-2xl mx-auto text-center"
          style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
          <span style={{ color:"var(--text)", fontWeight:600 }}>{d.reveal.split(".")[0]}.</span>
          {" "}{d.reveal.split(".").slice(1).join(".")}
        </motion.p>
      </div>
    </section>
  );
}
