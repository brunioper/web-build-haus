"use client";

import { motion } from "motion/react";
import { useLang } from "@/components/LangContext";

export default function Work() {
  const { t } = useLang();

  return (
    <section
      id="work"
      className="py-24 md:py-40"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header row */}
        <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-6 h-px" style={{ background: "var(--accent)" }} />
              <span
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
              >
                {t.work.label}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="leading-[1.1] font-bold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 48px)",
                color: "var(--text)",
                letterSpacing: "-0.03em",
              }}
            >
              {t.work.headline}
            </motion.h2>
          </div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            whileHover={{ color: "var(--text)" }}
          >
            {t.work.cta}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </motion.a>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {t.work.items.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.1 }}
              className="group relative overflow-hidden rounded-sm cursor-pointer"
              style={{ aspectRatio: "4/3" }}
              whileHover={{ scale: 1.01 }}
            >
              {/* Gradient background */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ background: project.gradient }}
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ background: "rgba(0,0,0,0.25)" }}
              />

              {/* Noise texture layer */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />

              {/* Year - top left */}
              <div className="absolute top-6 left-6">
                <span
                  className="text-xs tracking-widest"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}
                >
                  {project.year}
                </span>
              </div>

              {/* Arrow - top right, appears on hover */}
              <div
                className="absolute top-6 right-6 transition-all duration-300"
                style={{
                  opacity: 0,
                  transform: "translate(8px, -8px)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.opacity = "1";
                  el.style.transform = "translate(0,0)";
                }}
              >
                <span
                  className="text-xl"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  ↗
                </span>
              </div>

              {/* Project info - bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)" }}
                >
                  {project.category}
                </p>
                <h3
                  className="text-2xl font-semibold leading-tight"
                  style={{ color: "#fff", fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                >
                  {project.title}
                </h3>
              </div>

              {/* Bottom gradient scrim */}
              <div
                className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
