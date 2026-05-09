"use client";

import { motion } from "motion/react";
import { useLang } from "@/components/LangContext";

export default function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" className="py-24 md:py-40 relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(46,95,232,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <span className="w-6 h-px" style={{ background: "var(--accent)" }} />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
          >
            {t.contact.label}
          </span>
          <span className="w-6 h-px" style={{ background: "var(--accent)" }} />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 font-bold leading-[1.05]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 80px)",
            color: "var(--text)",
            letterSpacing: "-0.04em",
          }}
        >
          {t.contact.headline}
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-md mx-auto mb-14 text-base leading-relaxed"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          {t.contact.body}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href={`mailto:${t.contact.email}`}
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-full text-base font-medium transition-all duration-300"
            style={{
              background: "var(--accent)",
              color: "#fff",
              fontFamily: "var(--font-body)",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.contact.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>

          <motion.a
            href={`mailto:${t.contact.email}`}
            className="text-sm"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            whileHover={{ color: "var(--text)" }}
          >
            {t.contact.email}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
