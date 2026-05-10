"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { motion } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number,number,number,number] = [0.22,1,0.36,1];

/* ---------------------------------------------------------------
   BlenderBuildVideo — 3D rendered teaser of a website assembling
   itself, scrubbed by scroll position once in view, otherwise loops.
--------------------------------------------------------------- */
function BlenderBuildVideo() {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [scrub, setScrub] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const v = video.current!;
    const w = wrap.current!;
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = w.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0..1 across element entering/leaving viewport
        const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        if (p > 0.05 && p < 0.95) {
          if (!scrub) setScrub(true);
          v.pause();
          if (v.duration) v.currentTime = Math.min(v.duration - 0.05, p * v.duration);
        } else {
          if (scrub) setScrub(false);
          if (v.paused) v.play().catch(() => {});
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [reduced, scrub]);

  if (reduced) {
    return (
      <div className="relative w-full aspect-[16/9] overflow-hidden"
        style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
        <picture>
          <img src="/build-itself-poster.jpg" alt="Website building itself"
            className="w-full h-full object-cover" />
        </picture>
      </div>
    );
  }

  return (
    <div ref={wrap} className="relative w-full aspect-[16/9] overflow-hidden"
      style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
      <video
        ref={video}
        autoPlay loop muted playsInline preload="metadata"
        poster="/build-itself-poster.jpg"
        aria-label="3D animation of a website building itself"
        className="absolute inset-0 w-full h-full object-cover">
        <source src="/build-itself.webm" type="video/webm" />
        <source src="/build-itself.mp4"  type="video/mp4" />
      </video>
      {/* subtle vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 60%, rgba(10,10,15,0.55) 100%)" }} />
      {/* status pill */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5"
        style={{ background: "rgba(10,10,15,0.55)", border: "1px solid var(--border)", backdropFilter: "blur(8px)" }}>
        <span className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent)" }} />
        <span className="text-[10px] uppercase tracking-[0.18em]"
          style={{ color: "var(--text)", fontFamily: "var(--font-body)" }}>
          {scrub ? "Scrubbing • scroll-driven" : "Build sequence • live"}
        </span>
      </div>
      {/* corner badge */}
      <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.2em]"
        style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
        Rendered in Blender · 24 fps
      </div>
    </div>
  );
}

/* Snap: element is either fully hidden or plays a pop-in animation */
const snap = (prog: number, t: number): React.CSSProperties =>
  prog >= t
    ? { animation:"pop-in 0.42s cubic-bezier(0.22,1,0.36,1) both" }
    : { opacity:0, pointerEvents:"none" };

/* Slide bar that grows from left */
const slideBar = (prog: number, t: number): React.CSSProperties =>
  prog >= t
    ? { animation:"slide-right 0.6s cubic-bezier(0.22,1,0.36,1) both", transformOrigin:"left" }
    : { opacity:0, transform:"scaleX(0)", transformOrigin:"left" };

/* Staged pop with delay offset in ms */
const snapD = (prog: number, t: number, delayMs: number): React.CSSProperties =>
  prog >= t
    ? { animation:`pop-in 0.42s cubic-bezier(0.22,1,0.36,1) ${delayMs}ms both` }
    : { opacity:0, pointerEvents:"none" };

/* ───────────────────────────────────────────────────
   SOLANO — fictional luxury real estate brand mockup
──────────────────────────────────────────────────── */
function SolanoMockup({ progress: p }: { progress: number }) {
  const GOLD = "#C9A96E";
  const DARK = "#0A0906";
  const OFF  = "#F5F0E8";

  const properties = [
    { name:"Casa Almendros", area:"La Floresta, UY", sqm:"320 m²", price:"USD 680,000", gradient:"linear-gradient(145deg,#2C1810,#5C3020)" },
    { name:"Penthouse Soho", area:"Pocitos, Mdeo.", sqm:"180 m²", price:"USD 420,000", gradient:"linear-gradient(145deg,#1A1A2E,#2D2D4A)" },
    { name:"Villa Colonia",  area:"Colonia, UY",   sqm:"480 m²", price:"USD 890,000", gradient:"linear-gradient(145deg,#0D2416,#1A3D28)" },
  ];

  return (
    <div style={{ position:"absolute", inset:0, background:DARK, overflow:"hidden", fontFamily:"var(--font-body)" }}>

      {/* ── Ambient background glow ── */}
      <div style={{ position:"absolute", top:"-30%", right:"-10%", width:"60%", height:"60%", borderRadius:"50%",
        background:`radial-gradient(ellipse, rgba(201,169,110,0.12), transparent 65%)`,
        filter:"blur(40px)", pointerEvents:"none" }} />

      {/* ── Grid ── */}
      <div style={{ position:"absolute", inset:0, opacity: p >= 0.04 ? 0.06 : 0,
        backgroundImage:"linear-gradient(rgba(201,169,110,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.5) 1px,transparent 1px)",
        backgroundSize:"28px 28px", transition:"opacity 0.4s" }} />

      {/* ── NAV ── */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"36px",
        borderBottom:`1px solid rgba(201,169,110,0.15)`, display:"flex", alignItems:"center",
        justifyContent:"space-between", padding:"0 14px", ...snap(p,0.08) }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"baseline", gap:"4px", ...snap(p,0.12) }}>
          <span style={{ fontSize:"12px", fontWeight:700, color:OFF, letterSpacing:"0.12em", fontFamily:"var(--font-display)" }}>SOLANO</span>
          <span style={{ fontSize:"7px", color:GOLD, letterSpacing:"0.2em", textTransform:"uppercase" }}>Real Estate</span>
        </div>
        {/* Links */}
        <div style={{ display:"flex", gap:"14px" }}>
          {["Properties","Services","About"].map((l,i)=>(
            <span key={l} style={{ fontSize:"7.5px", color:"rgba(245,240,232,0.5)", letterSpacing:"0.08em", ...snapD(p,0.15+i*0.02,i*60) }}>{l}</span>
          ))}
        </div>
        {/* CTA */}
        <div style={{ padding:"4px 10px", border:`1px solid ${GOLD}`, ...snap(p,0.21) }}>
          <span style={{ fontSize:"7px", color:GOLD, letterSpacing:"0.1em", textTransform:"uppercase" }}>Book a viewing</span>
        </div>
      </div>

      {/* ── HERO ── */}
      {/* Full-bleed image placeholder */}
      <div style={{ position:"absolute", top:"36px", left:0, right:0, height:"210px", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#1A0E08 0%,#3D2010 40%,#1A1208 100%)",
          opacity: p >= 0.25 ? 1 : 0, transition:"opacity 0.5s" }} />
        {/* Warm property "photo" overlay */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(10,9,6,0.1),rgba(10,9,6,0.7))" }} />
        {/* Horizontal lines texture */}
        {p >= 0.27 && Array.from({length:8},(_,i)=>(
          <div key={i} style={{ position:"absolute", left:0, right:0, height:"1px",
            top:`${12+i*26}px`, background:"rgba(201,169,110,0.06)" }} />
        ))}

        {/* Hero label */}
        <div style={{ position:"absolute", top:"18px", left:"14px", display:"flex", alignItems:"center", gap:"6px", ...snap(p,0.28) }}>
          <div style={{ width:"14px", height:"1px", background:GOLD }} />
          <span style={{ fontSize:"7px", color:GOLD, letterSpacing:"0.2em", textTransform:"uppercase" }}>Luxury Real Estate</span>
        </div>

        {/* Hero headline */}
        <div style={{ position:"absolute", bottom:"48px", left:"14px", right:"14px" }}>
          {[{text:"Your dream",color:OFF},{text:"property,",color:OFF},{text:"found.",color:GOLD}].map((line,i)=>(
            <div key={i} style={{ overflow:"hidden" }}>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"26px", fontWeight:700,
                letterSpacing:"-0.04em", lineHeight:1.0, color:line.color, ...snapD(p,0.30+i*0.04,i*80) }}>
                {line.text}
              </div>
            </div>
          ))}
        </div>

        {/* Hero CTA buttons */}
        <div style={{ position:"absolute", bottom:"10px", left:"14px", display:"flex", gap:"6px" }}>
          <div style={{ padding:"6px 14px", background:GOLD, ...snap(p,0.43) }}>
            <span style={{ fontSize:"7.5px", color:DARK, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>Explore →</span>
          </div>
          <div style={{ padding:"6px 12px", border:`1px solid rgba(201,169,110,0.4)`, ...snap(p,0.46) }}>
            <span style={{ fontSize:"7.5px", color:GOLD, letterSpacing:"0.08em", textTransform:"uppercase" }}>Our services</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:"absolute", bottom:"12px", right:"14px", display:"flex", alignItems:"center", gap:"4px", ...snap(p,0.48) }}>
          <span style={{ fontSize:"6px", color:"rgba(245,240,232,0.4)", letterSpacing:"0.1em", textTransform:"uppercase" }}>Scroll</span>
          <div style={{ width:"1px", height:"14px", background:`linear-gradient(${GOLD},transparent)` }} />
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div style={{ position:"absolute", top:"246px", left:0, right:0,
        borderTop:`1px solid rgba(201,169,110,0.15)`, borderBottom:`1px solid rgba(201,169,110,0.15)` }}>
        {[{n:"12",l:"Years"},{n:"240+",l:"Properties"},{n:"€180M",l:"Volume"}].map((st,i)=>(
          <div key={i} style={{ position:"absolute", top:0, bottom:0, display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", gap:"2px",
            left:`${i*33.33}%`, width:"33.33%",
            borderRight: i<2 ? `1px solid rgba(201,169,110,0.12)` : "none",
            ...snapD(p, 0.53+i*0.035, i*80) }}>
            <span style={{ fontFamily:"var(--font-display)", fontSize:"16px", fontWeight:700, color:OFF, letterSpacing:"-0.03em" }}>{st.n}</span>
            <span style={{ fontSize:"6px", color:"rgba(245,240,232,0.4)", textTransform:"uppercase", letterSpacing:"0.15em" }}>{st.l}</span>
          </div>
        ))}
        <div style={{ height:"34px" }} />
      </div>

      {/* ── PROPERTIES SECTION ── */}
      <div style={{ position:"absolute", top:"284px", left:0, right:0, padding:"0 12px" }}>
        {/* Section label */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"8px",
          paddingBottom:"6px", borderBottom:`1px solid rgba(201,169,110,0.1)`, ...snap(p,0.62) }}>
          <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
            <div style={{ width:"10px", height:"1px", background:GOLD }} />
            <span style={{ fontSize:"6.5px", color:GOLD, textTransform:"uppercase", letterSpacing:"0.2em" }}>Featured Properties</span>
          </div>
          <span style={{ fontSize:"6.5px", color:"rgba(245,240,232,0.35)", letterSpacing:"0.1em" }}>View all →</span>
        </div>

        {/* Property cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"6px" }}>
          {properties.map((prop,i)=>(
            <div key={i} style={{ borderRadius:"1px", overflow:"hidden", ...snapD(p,0.64+i*0.05,i*100) }}>
              {/* Image */}
              <div style={{ height:"70px", background:prop.gradient, position:"relative" }}>
                <div style={{ position:"absolute", inset:0, background:"rgba(10,9,6,0.3)" }} />
                <div style={{ position:"absolute", top:"6px", left:"6px", padding:"2px 5px",
                  background:"rgba(201,169,110,0.2)", border:"1px solid rgba(201,169,110,0.3)", backdropFilter:"blur(4px)" }}>
                  <span style={{ fontSize:"5.5px", color:GOLD, letterSpacing:"0.1em" }}>NEW</span>
                </div>
                <div style={{ position:"absolute", bottom:"6px", right:"6px" }}>
                  <span style={{ fontSize:"7.5px", color:OFF, fontWeight:700, fontFamily:"var(--font-display)" }}>{prop.price}</span>
                </div>
              </div>
              {/* Info */}
              <div style={{ padding:"6px 7px", background:"rgba(245,240,232,0.04)", borderTop:`1px solid rgba(201,169,110,0.1)` }}>
                <div style={{ fontSize:"7.5px", fontWeight:600, color:OFF, marginBottom:"2px", fontFamily:"var(--font-display)" }}>{prop.name}</div>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <span style={{ fontSize:"5.5px", color:"rgba(245,240,232,0.4)" }}>{prop.area}</span>
                  <span style={{ fontSize:"5.5px", color:GOLD }}>{prop.sqm}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA BAR ── */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"10px 14px",
        borderTop:`1px solid rgba(201,169,110,0.15)`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        ...snap(p, 0.90) }}>
        <div>
          <div style={{ fontSize:"8px", fontWeight:700, color:OFF, fontFamily:"var(--font-display)", letterSpacing:"0.04em" }}>
            Ready to find your property?
          </div>
          <div style={{ fontSize:"6px", color:"rgba(245,240,232,0.4)", marginTop:"2px" }}>
            Book a free consultation with our team
          </div>
        </div>
        <div style={{ padding:"6px 12px", background:GOLD, ...snap(p, 0.92) }}>
          <span style={{ fontSize:"7px", color:DARK, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>Let's talk →</span>
        </div>
      </div>

      {/* ── LIVE CURSOR ── */}
      {p >= 0.95 && (
        <div style={{ position:"absolute", bottom:"32px", left:"54%", pointerEvents:"none" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"4px" }}>
            <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:GOLD, animation:"pulse-orb 1.2s ease-in-out infinite" }} />
            <div style={{ width:"22px", height:"22px", borderRadius:"50%", border:`1px solid rgba(201,169,110,0.5)`, animation:"pulse-orb 2s ease-in-out infinite" }} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─── */
export default function BuildShowcase() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", setProg);

  const pct = Math.round(Math.min(prog, 1) * 100);
  const d = t.buildShowcase;

  const phaseLabel = prog < 0.25 ? (t.buildShowcase.steps[0]?.label ?? "Structure")
    : prog < 0.5 ? (t.buildShowcase.steps[1]?.label ?? "Design")
    : prog < 0.75 ? (t.buildShowcase.steps[2]?.label ?? "Experience")
    : (t.buildShowcase.steps[3]?.label ?? "Conversion");

  return (
    <section style={{ borderBottom:"1px solid var(--border)" }}>
      {/* Intro */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
          transition={{ duration:0.9, ease:EASE }}
          style={{ height:"1px", background:"var(--border)", transformOrigin:"left", marginBottom:"4rem" }} />

        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-12 md:gap-16 items-end">
          {/* Left: copy */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px" style={{ background:"var(--accent)" }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>
                Build Process · 3D
              </span>
            </div>
            <div style={{ overflow:"hidden" }}>
              <motion.h2 initial={{ y:"108%",skewY:3 }} whileInView={{ y:0,skewY:0 }}
                viewport={{ once:true }} transition={{ duration:1.1, ease:EASE }}
                className="font-bold" style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,4.5vw,58px)", color:"var(--text)", letterSpacing:"-0.03em", lineHeight:1.05 }}>
                {d.intro}
              </motion.h2>
            </div>
            <motion.p initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.8, delay:0.2 }}
              className="mt-5 text-base leading-[1.8] max-w-lg" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
              {d.introSub}
            </motion.p>
          </div>

          {/* Right: 3D Blender video */}
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.9, ease:EASE }}>
            <BlenderBuildVideo />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.22em]"
                style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
                ↳ Each stage extrudes from the grid
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em]"
                style={{ color:"var(--accent)", fontFamily:"var(--font-body)" }}>
                Scroll to scrub →
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── SCROLL-PINNED BUILD ─── */}
      <div ref={containerRef} style={{ height:"420vh" }}>
        <div style={{ position:"sticky", top:0, height:"100vh", display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", padding:"0 24px" }}>

          {/* Top bar */}
          <div className="w-full max-w-4xl flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.18em]" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
                Building client site
              </span>
              <span className="text-[10px] px-2 py-0.5 uppercase tracking-widest" style={{ background:"var(--surface)", color:"var(--accent)", fontFamily:"var(--font-body)", border:"1px solid var(--border)" }}>
                SOLANO Real Estate
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div style={{ width:"140px", height:"2px", background:"var(--border)", position:"relative", borderRadius:"2px" }}>
                <div style={{ position:"absolute", top:0, left:0, bottom:0, width:`${pct}%`,
                  background:`linear-gradient(to right, var(--accent), rgba(46,95,232,0.6))`,
                  transition:"width 0.08s linear", borderRadius:"2px" }} />
              </div>
              <span className="text-xs font-bold tabular-nums" style={{ color:"var(--accent)", fontFamily:"var(--font-body)", minWidth:"36px" }}>
                {pct}%
              </span>
            </div>
          </div>

          {/* Mockup frame */}
          <div className="w-full max-w-4xl relative" style={{ flex:1, maxHeight:"72vh" }}>
            {/* Browser chrome */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"28px", background:"var(--surface)",
              border:"1px solid var(--border)", borderBottom:"none", display:"flex", alignItems:"center",
              padding:"0 12px", gap:"12px", zIndex:2 }}>
              <div style={{ display:"flex", gap:"5px" }}>
                {["#ff5f57","#febc2e","#28c840"].map(c=>(
                  <div key={c} style={{ width:"8px", height:"8px", borderRadius:"50%", background:c }} />
                ))}
              </div>
              <div style={{ flex:1, background:"var(--bg)", borderRadius:"4px", height:"14px", display:"flex", alignItems:"center", padding:"0 8px" }}>
                <span style={{ fontSize:"7px", color:"var(--muted)", fontFamily:"var(--font-body)" }}>
                  solano.uy{prog > 0.4 ? "/properties" : ""}
                </span>
              </div>
            </div>

            {/* Mockup content */}
            <div style={{ position:"absolute", top:"28px", bottom:0, left:0, right:0,
              border:"1px solid var(--border)", overflow:"hidden" }}>
              <SolanoMockup progress={prog} />
            </div>
          </div>

          {/* Bottom phase label */}
          <div className="w-full max-w-4xl flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              {[0,1,2,3].map(i=>(
                <div key={i} style={{ height:"2px", borderRadius:"2px",
                  transition:"all 0.3s ease",
                  width: Math.floor(prog*4)===i ? "32px" : "8px",
                  background: Math.floor(prog*4)>=i ? "var(--accent)" : "var(--border)" }} />
              ))}
            </div>
            <span className="text-xs uppercase tracking-widest" style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>
              ↳ {phaseLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Reveal CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 text-center">
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
