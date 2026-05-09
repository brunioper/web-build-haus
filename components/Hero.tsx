"use client";

import { motion, type Variants } from "motion/react";
import { useLang } from "@/components/LangContext";

const lineVar: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.4 },
  },
};

const fadeUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7 },
  },
};

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background gradient orb */}
      <div
        className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(46,95,232,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "pulse-orb 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(46,95,232,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "pulse-orb 12s ease-in-out infinite reverse",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 w-full">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-10"
        >
          <span
            className="w-6 h-px"
            style={{ background: "var(--accent)" }}
          />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
          >
            {t.hero.label}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-10"
        >
          {[t.hero.line1, t.hero.line2, t.hero.line3].map((line, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <motion.h1
                variants={lineVar}
                className="leading-[1.05] font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(48px, 7.5vw, 96px)",
                  color: i === 2 ? "var(--accent)" : "var(--text)",
                  letterSpacing: "-0.03em",
                }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        {/* Subtitle + CTA */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
        >
          <motion.p
            variants={fadeUp}
            className="max-w-sm text-base leading-relaxed"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            {t.hero.sub}
          </motion.p>

          <motion.a
            variants={fadeUp}
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              background: "var(--accent)",
              color: "#fff",
              fontFamily: "var(--font-body)",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-10 left-6 right-6 lg:left-12 lg:right-12 flex justify-between items-end"
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            EST. 2019
          </span>
          <div className="flex items-center gap-2" style={{ color: "var(--muted)" }}>
            <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-body)" }}>
              {t.hero.scroll}
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-sm"
            >
              ↓
            </motion.span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse-orb {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
}
