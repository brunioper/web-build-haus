"use client";

import { motion } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function About() {
  const { t } = useLang();

  return (
    <section
      id="about"
      className="py-24 md:py-40"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Label row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-20 pb-6"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <span className="w-5 h-px" style={{ background: "var(--accent)" }} />
            <span
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)", fontFamily: "var(--font)" }}
            >
              {t.about.label}
            </span>
          </div>
          <span
            className="text-xs uppercase tracking-widest hidden md:block"
            style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
          >
            {t.about.location}
          </span>
        </motion.div>

        <div className="grid md:grid-cols-[3fr_2fr] gap-16 md:gap-24 items-start">
          {/* Left: large headline */}
          <div>
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, ease: EASE }}
                className="leading-[1.08] font-light"
                style={{
                  fontFamily: "var(--font)",
                  fontSize: "clamp(32px, 4.5vw, 60px)",
                  color: "var(--text)",
                  letterSpacing: "-0.03em",
                }}
              >
                {t.about.headline}
              </motion.h2>
            </div>

            {/* Location pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-widest uppercase"
              style={{
                border: "1px solid var(--border)",
                color: "var(--muted)",
                fontFamily: "var(--font)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              {t.about.location}
            </motion.div>
          </div>

          {/* Right: body + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-6 md:pt-3"
          >
            <p
              className="text-base leading-[1.7]"
              style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
            >
              {t.about.body1}
            </p>
            <p
              className="text-base leading-[1.7]"
              style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
            >
              {t.about.body2}
            </p>
            <motion.a
              href="#contact"
              className="mt-2 group inline-flex items-center gap-3 text-sm font-medium"
              style={{ color: "var(--text)", fontFamily: "var(--font)" }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-[var(--accent)]"
                style={{ border: "1px solid var(--border)", color: "var(--text)", fontSize: "12px" }}
              >
                →
              </span>
              {t.about.cta}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
