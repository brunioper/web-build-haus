"use client";

import { motion, type Variants } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const lineVar: Variants = {
  hidden: { y: "105%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1, ease: EASE } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.3 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-12 pt-32 pb-24">
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 mb-14"
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
          >
            {t.hero.location}
          </span>
        </motion.div>

        {/* Headline — clipped line-by-line reveal */}
        <motion.div variants={container} initial="hidden" animate="show" className="mb-16">
          {[t.hero.line1, t.hero.line2, t.hero.line3].map((line, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <motion.h1
                variants={lineVar}
                style={{
                  fontFamily: "var(--font)",
                  fontSize: "clamp(52px, 9vw, 116px)",
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.03,
                  color: i === 2 ? "var(--accent)" : "var(--text)",
                  fontStyle: i === 2 ? "italic" : "normal",
                }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        {/* Bottom row: sub + CTA */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-20"
        >
          <motion.p
            variants={fadeIn}
            className="max-w-xs text-base leading-relaxed"
            style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
          >
            {t.hero.sub}
          </motion.p>

          <motion.a
            variants={fadeIn}
            href="#contact"
            className="group inline-flex items-center gap-3 text-base font-medium"
            style={{ color: "var(--text)", fontFamily: "var(--font)" }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <span
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-white"
              style={{ border: "1px solid var(--border)", color: "var(--text)" }}
            >
              →
            </span>
            {t.hero.cta}
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="max-w-7xl mx-auto w-full px-6 lg:px-12 pb-8 flex justify-between items-center"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span
          className="text-xs tracking-widest uppercase pt-6"
          style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
        >
          EST. 2019
        </span>
        <div className="flex items-center gap-2 pt-6" style={{ color: "var(--muted)" }}>
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "var(--font)" }}
          >
            {t.hero.scroll}
          </span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="text-sm"
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
