"use client";

import { motion } from "motion/react";
import { useLang } from "@/components/LangContext";

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="py-24 md:py-40" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="w-6 h-px" style={{ background: "var(--accent)" }} />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
          >
            {t.about.label}
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="leading-[1.1] font-bold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4vw, 56px)",
                color: "var(--text)",
                letterSpacing: "-0.03em",
              }}
            >
              {t.about.headline}
            </h2>

            {/* Decorative element */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              {[
                { num: "01", label: "Strategy" },
                { num: "02", label: "Design" },
                { num: "03", label: "Build" },
                { num: "04", label: "Launch" },
              ].map((step) => (
                <div
                  key={step.num}
                  className="p-5 rounded-sm flex flex-col gap-2"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <span
                    className="text-xs"
                    style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
                  >
                    {step.num}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: body text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex flex-col gap-6 md:pt-2"
          >
            <p
              className="text-lg leading-relaxed"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              {t.about.body1}
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              {t.about.body2}
            </p>

            <motion.a
              href="#contact"
              className="mt-4 group inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {t.about.cta}
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
