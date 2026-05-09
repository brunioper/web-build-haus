"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Services() {
  const { t } = useLang();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="py-24 md:py-40"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ height: "1px", background: "var(--border)", transformOrigin: "left", marginBottom: "5rem" }}
        />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="w-5 h-px" style={{ background: "var(--accent)" }} />
            <span
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)", fontFamily: "var(--font)" }}
            >
              {t.services.label}
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
                fontSize: "clamp(22px, 2.8vw, 40px)",
                color: "var(--text)",
                letterSpacing: "-0.03em",
              }}
            >
              {t.services.headline}
            </motion.h2>
          </div>
        </div>

        {/* Service rows */}
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {t.services.items.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex items-center justify-between gap-4 py-6 md:py-7 cursor-default transition-colors duration-300"
              style={{
                borderBottom: "1px solid var(--border)",
                background: hovered === i ? "var(--surface)" : "transparent",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                margin: "0 -1rem",
              }}
            >
              {/* Sliding accent line on hover */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                animate={{ opacity: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ background: "var(--accent)" }}
              />

              <div className="flex items-center gap-6 md:gap-12 flex-1 min-w-0">
                {/* Number */}
                <span
                  className="text-xs font-medium tabular-nums shrink-0 w-6"
                  style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <h3
                  className="text-lg md:text-2xl font-light shrink-0"
                  style={{
                    fontFamily: "var(--font)",
                    color: "var(--text)",
                    letterSpacing: "-0.02em",
                    transition: "color 0.2s",
                  }}
                >
                  {service.title}
                </h3>

                {/* Description — desktop only */}
                <p
                  className="hidden md:block text-sm leading-relaxed truncate"
                  style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
                >
                  {service.desc}
                </p>
              </div>

              {/* Arrow */}
              <motion.span
                animate={{
                  opacity: hovered === i ? 1 : 0,
                  x: hovered === i ? 0 : -8,
                }}
                transition={{ duration: 0.2 }}
                className="text-lg shrink-0"
                style={{ color: "var(--accent)" }}
              >
                ↗
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
