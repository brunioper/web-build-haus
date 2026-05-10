"use client";
import { motion } from "motion/react";
import { ChapterLabel } from "@/components/ui";

/* Premium ease curves: long-tail expo / quart. No springs, no overshoot.
   These are the curves used by award winners (Awwwards, Lightweight, Linear). */
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN_OUT_QUART: [number, number, number, number] = [0.77, 0, 0.175, 1];

const VIEW = { once: true, margin: "-15%" } as const;

/* ─────────────────────────────────────────────────────────────
   Shared chapter shell — left column copy, right column "build"
───────────────────────────────────────────────────────────── */
function ChapterShell({
  num,
  total,
  label,
  headline,
  body,
  visual,
  reverse = false,
}: {
  num: number;
  total: number;
  label: string;
  headline: React.ReactNode;
  body: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section
      className="relative w-full"
      style={{ minHeight: "100vh", padding: "12vh 0", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full">
        <div
          className={
            "grid md:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[76vh] " +
            (reverse ? "md:[&>*:first-child]:order-2" : "")
          }
        >
          {/* LEFT — copy */}
          <div>
            <ChapterLabel index={num} label={label} total={total} />

            <div className="mt-10" style={{ overflow: "hidden" }}>
              <motion.h2
                initial={{ y: "112%" }}
                whileInView={{ y: 0 }}
                viewport={VIEW}
                transition={{ duration: 1.6, ease: EASE_OUT_EXPO }}
                className="font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(34px, 4.6vw, 76px)",
                  letterSpacing: "-0.045em",
                  lineHeight: 0.98,
                  color: "var(--text)",
                }}
              >
                {headline}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEW}
              transition={{ duration: 1.4, delay: 0.45, ease: EASE_OUT_EXPO }}
              className="mt-8 text-base md:text-lg leading-[1.8] max-w-md"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              {body}
            </motion.p>

            {/* fine accent rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEW}
              transition={{ duration: 1.6, delay: 0.7, ease: EASE_IN_OUT_QUART }}
              style={{
                originX: 0,
                marginTop: 36,
                width: 96,
                height: 1,
                background: "var(--accent)",
              }}
            />
          </div>

          {/* RIGHT — "build" canvas */}
          <div className="relative">
            <div
              className="relative w-full aspect-[4/3] overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.012)",
                border: "1px solid var(--border)",
              }}
            >
              {/* faint baseline grid */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.024) 1px,transparent 1px)," +
                    "linear-gradient(90deg,rgba(255,255,255,0.024) 1px,transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
              <div className="absolute inset-0 p-10 lg:p-14 flex items-center justify-center">
                {visual}
              </div>

              {/* corner crops */}
              <Crop pos="tl" />
              <Crop pos="tr" />
              <Crop pos="bl" />
              <Crop pos="br" />
            </div>
            <div
              className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              <span>↳ Building chapter {String(num).padStart(2, "0")}</span>
              <span>0{num} / 0{total}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Crop({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map: Record<string, string> = {
    tl: "top-3 left-3 border-t border-l",
    tr: "top-3 right-3 border-t border-r",
    bl: "bottom-3 left-3 border-b border-l",
    br: "bottom-3 right-3 border-b border-r",
  };
  return (
    <span
      aria-hidden
      className={`absolute w-3 h-3 ${map[pos]}`}
      style={{ borderColor: "rgba(46,95,232,0.5)" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   01 — Boot / The Blank Canvas
───────────────────────────────────────────────────────────── */
function BuildCanvas() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full max-w-md">
      {/* canvas frame draws itself */}
      <motion.rect
        x="20"
        y="20"
        width="280"
        height="200"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1"
        strokeDasharray="960"
        initial={{ strokeDashoffset: 960 }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={VIEW}
        transition={{ duration: 2.4, ease: EASE_IN_OUT_QUART }}
      />
      {/* rule-of-thirds vertical */}
      <motion.line
        x1="113.3"
        y1="20"
        x2="113.3"
        y2="220"
        stroke="rgba(46,95,232,0.45)"
        strokeWidth="1"
        strokeDasharray="200"
        initial={{ strokeDashoffset: 200 }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={VIEW}
        transition={{ duration: 1.4, delay: 1.4, ease: EASE_OUT_EXPO }}
      />
      <motion.line
        x1="206.7"
        y1="20"
        x2="206.7"
        y2="220"
        stroke="rgba(46,95,232,0.45)"
        strokeWidth="1"
        strokeDasharray="200"
        initial={{ strokeDashoffset: 200 }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={VIEW}
        transition={{ duration: 1.4, delay: 1.65, ease: EASE_OUT_EXPO }}
      />
      {/* horizontal */}
      <motion.line
        x1="20"
        y1="86.7"
        x2="300"
        y2="86.7"
        stroke="rgba(46,95,232,0.45)"
        strokeWidth="1"
        strokeDasharray="280"
        initial={{ strokeDashoffset: 280 }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={VIEW}
        transition={{ duration: 1.6, delay: 1.9, ease: EASE_OUT_EXPO }}
      />
      {/* center node */}
      <motion.circle
        cx="160"
        cy="120"
        r="2.5"
        fill="var(--accent)"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 0.9, delay: 2.4, ease: EASE_OUT_EXPO }}
      />
      <motion.text
        x="160"
        y="142"
        textAnchor="middle"
        fontSize="7"
        letterSpacing="3"
        fill="rgba(255,255,255,0.55)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 1.2, delay: 2.6 }}
      >
        FOUNDATION
      </motion.text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   02 — Code / Real engineering
───────────────────────────────────────────────────────────── */
function BuildCode() {
  const lines = [
    [{ c: "rgba(180,130,255,0.92)", t: "import" }, { c: "rgba(255,255,255,0.85)", t: " { Site }" }, { c: "rgba(180,130,255,0.92)", t: " from" }, { c: "rgba(160,210,255,0.9)", t: " '@build-haus/core'" }],
    [],
    [{ c: "rgba(180,130,255,0.92)", t: "export const " }, { c: "rgba(120,210,160,0.95)", t: "site" }, { c: "rgba(255,255,255,0.7)", t: " = " }, { c: "rgba(160,210,255,0.9)", t: "Site.create" }, { c: "rgba(255,255,255,0.7)", t: "({" }],
    [{ c: "rgba(255,255,255,0.55)", t: "  brand: " }, { c: "rgba(255,200,100,0.9)", t: "'your-brand'" }, { c: "rgba(255,255,255,0.55)", t: "," }],
    [{ c: "rgba(255,255,255,0.55)", t: "  goal: " }, { c: "rgba(255,200,100,0.9)", t: "'conversion'" }, { c: "rgba(255,255,255,0.55)", t: "," }],
    [{ c: "rgba(255,255,255,0.55)", t: "  motion: " }, { c: "rgba(120,210,160,0.95)", t: "premium" }, { c: "rgba(255,255,255,0.55)", t: "," }],
    [{ c: "rgba(255,255,255,0.85)", t: "})" }],
    [],
    [{ c: "rgba(140,150,170,0.7)", t: "// Hand-engineered. No templates." }],
  ];

  return (
    <div className="w-full max-w-md font-mono text-[12px] leading-[1.85]">
      {lines.map((segs, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEW}
          transition={{
            duration: 1.0,
            delay: 0.25 + i * 0.18,
            ease: EASE_OUT_EXPO,
          }}
          className="flex"
        >
          <span
            className="inline-block w-6 select-none text-right pr-3 tabular-nums"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span style={{ color: "rgba(255,255,255,0.85)" }}>
            {segs.length === 0 ? "\u00A0" : segs.map((s, j) => (
              <span key={j} style={{ color: s.c }}>{s.t}</span>
            ))}
          </span>
        </motion.div>
      ))}

      {/* subtle blinking caret on last line */}
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[6px] h-[12px] ml-9 mt-1 align-middle"
        style={{ background: "var(--accent)" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   03 — Structure / Hierarchy
───────────────────────────────────────────────────────────── */
function BuildStructure() {
  const blocks = [
    { x: "8%", y: "8%", w: "84%", h: "10%", label: "NAV" },
    { x: "8%", y: "22%", w: "60%", h: "30%", label: "H1" },
    { x: "70%", y: "22%", w: "22%", h: "30%", label: "" },
    { x: "8%", y: "56%", w: "26%", h: "32%", label: "" },
    { x: "37%", y: "56%", w: "26%", h: "32%", label: "" },
    { x: "66%", y: "56%", w: "26%", h: "32%", label: "" },
  ];

  return (
    <div className="relative w-full h-full">
      {blocks.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.94, y: 8 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={VIEW}
          transition={{
            duration: 1.4,
            delay: 0.3 + i * 0.18,
            ease: EASE_OUT_EXPO,
          }}
          className="absolute flex items-end justify-start p-2"
          style={{
            left: b.x,
            top: b.y,
            width: b.w,
            height: b.h,
            background: i === 0 ? "rgba(46,95,232,0.10)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${i === 0 ? "rgba(46,95,232,0.5)" : "rgba(255,255,255,0.18)"}`,
          }}
        >
          {b.label && (
            <span
              className="text-[9px] uppercase tracking-[0.22em]"
              style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)" }}
            >
              {b.label}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   04 — Brand / Color + Type
───────────────────────────────────────────────────────────── */
function BuildBrand() {
  const swatches = [
    { c: "#0A0A0F", name: "Void" },
    { c: "#2E5FE8", name: "Signal" },
    { c: "#F5F4EE", name: "Paper" },
    { c: "#A8B3CC", name: "Mute" },
    { c: "#1A1A22", name: "Coal" },
  ];
  return (
    <div className="w-full max-w-md flex flex-col gap-8">
      <div className="grid grid-cols-5 gap-3">
        {swatches.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEW}
            transition={{ duration: 1.2, delay: 0.2 + i * 0.14, ease: EASE_OUT_EXPO }}
          >
            <div
              className="w-full aspect-square"
              style={{
                background: s.c,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
            <div
              className="mt-2 text-[9px] uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)" }}
            >
              {s.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* type sample reveal */}
      <div style={{ overflow: "hidden" }}>
        <motion.div
          initial={{ y: "108%" }}
          whileInView={{ y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.6, delay: 1.2, ease: EASE_OUT_EXPO }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(36px, 4vw, 64px)",
            letterSpacing: "-0.045em",
            lineHeight: 0.95,
            color: "var(--text)",
          }}
        >
          Aa <span style={{ fontStyle: "italic", fontWeight: 500 }}>Aa</span>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 1.0, delay: 1.6 }}
        className="text-[10px] uppercase tracking-[0.32em]"
        style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
      >
        Display · Editorial · 7 Weights
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   05 — Conversion / The CTA
───────────────────────────────────────────────────────────── */
function BuildCTA() {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      {/* ghost form field */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: 1.4, delay: 0.3, ease: EASE_OUT_EXPO }}
        className="w-full max-w-xs"
      >
        <div
          className="text-[10px] uppercase tracking-[0.32em] mb-2"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          Email
        </div>
        <div
          className="px-4 py-3 text-sm"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--border)",
            color: "rgba(255,255,255,0.55)",
            fontFamily: "var(--font-body)",
          }}
        >
          you@yourbrand.com
        </div>
      </motion.div>

      {/* the button — fades in then a soft halo pulses */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: 1.4, delay: 0.9, ease: EASE_OUT_EXPO }}
        className="relative"
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: "var(--accent)",
            filter: "blur(36px)",
            opacity: 0.45,
          }}
          animate={{ opacity: [0.25, 0.55, 0.25], scale: [0.9, 1.08, 0.9] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="inline-flex items-center gap-3 px-7 py-4 cursor-pointer"
          style={{
            background: "var(--accent)",
            color: "#fff",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            letterSpacing: "0.02em",
            border: "1px solid var(--accent)",
          }}
        >
          <span>Begin your build</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 1.0, delay: 1.6 }}
        className="text-[10px] uppercase tracking-[0.32em]"
        style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
      >
        Avg. response · under 24h
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   The full story
───────────────────────────────────────────────────────────── */
export default function ChapterStory() {
  const total = 5;
  return (
    <div id="story">
      <ChapterShell
        num={1}
        total={total}
        label="Boot"
        headline={
          <>
            From a blank canvas,
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 500 }}>
              an interface opens.
            </span>
          </>
        }
        body="Every great website starts the same way: empty. We begin with discovery — your audience, your offer, the one outcome that actually matters. The grid is drawn before the pixel."
        visual={<BuildCanvas />}
      />

      <ChapterShell
        num={2}
        total={total}
        label="Code"
        headline={
          <>
            Real engineering,
            <br />
            <span style={{ color: "var(--accent)" }}>not templates.</span>
          </>
        }
        body="Hand-built in Next.js, React and TypeScript. No bloated page-builders, no template scars — just clean, fast, accessible code your team can extend a year from now."
        visual={<BuildCode />}
        reverse
      />

      <ChapterShell
        num={3}
        total={total}
        label="Structure"
        headline={
          <>
            Hierarchy that
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 500 }}>
              earns attention.
            </span>
          </>
        }
        body="Your most important message gets the most weight. Editorial typography, single-CTA discipline, breathing room where it belongs. We design the journey first — then the screen."
        visual={<BuildStructure />}
      />

      <ChapterShell
        num={4}
        total={total}
        label="Brand"
        headline={
          <>
            Color and type
            <br />
            <span style={{ color: "var(--accent)" }}>become recognition.</span>
          </>
        }
        body="Your palette, your voice, your motion language — pulled from the brand you already are. The result feels unmistakably yours, never borrowed from someone else's template."
        visual={<BuildBrand />}
        reverse
      />

      <ChapterShell
        num={5}
        total={total}
        label="Conversion"
        headline={
          <>
            Built for the metric
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 500 }}>
              that matters.
            </span>
          </>
        }
        body="The CTAs, the trust signals, the funnel — tuned to the one outcome you care about. Sub-second LCP, edge-rendered, analytics built in. Beauty is the cover; conversion is the book."
        visual={<BuildCTA />}
      />
    </div>
  );
}
