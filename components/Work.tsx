"use client";

import { motion } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Work() {
  const { t } = useLang();

  return (
    <section
      id="work"
      className="py-24 md:py-40"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className="flex items-end justify-between mb-16 pb-6 gap-8 flex-wrap"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-5 h-px" style={{ background: "var(--accent)" }} />
              <span
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--accent)", fontFamily: "var(--font)" }}
              >
                {t.work.label}
              </span>
            </motion.div>
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
                className="font-light leading-[1.1]"
                style={{
                  fontFamily: "var(--font)",
                  fontSize: "clamp(24px, 3vw, 42px)",
                  color: "var(--text)",
                  letterSpacing: "-0.03em",
                }}
              >
                {t.work.headline}
              </motion.h2>
            </div>
          </div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group inline-flex items-center gap-3 text-sm"
            style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
            whileHover={{ x: 4 }}
          >
            {t.work.cta}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {t.work.items.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.1 }}
              className="group relative overflow-hidden rounded-sm cursor-pointer"
              style={{ aspectRatio: "4/3" }}
              whileHover={{ scale: 1.01 }}
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ background: project.gradient }}
              />

              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "rgba(0,0,0,0.2)" }}
              />

              {/* Year */}
              <div className="absolute top-6 left-6">
                <span
                  className="text-xs tracking-widest"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font)" }}
                >
                  {project.year}
                </span>
              </div>

              {/* Arrow */}
              <div
                className="absolute top-6 right-6 transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ transform: "translate(8px,-8px)" }}
              >
                <span
                  className="text-xl"
                  style={{ color: "rgba(255,255,255,0.9)", display: "block", transform: "group-hover:translate(0,0)" }}
                >
                  ↗
                </span>
              </div>

              {/* Scrim */}
              <div
                className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72), transparent)" }}
              />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font)" }}
                >
                  {project.category}
                </p>
                <h3
                  className="text-2xl font-light leading-tight"
                  style={{
                    color: "#fff",
                    fontFamily: "var(--font)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
