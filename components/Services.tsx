"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/components/LangContext";

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
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-6 h-px" style={{ background: "var(--accent)" }} />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
          >
            {t.services.label}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 max-w-xl leading-[1.1] font-bold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            color: "var(--text)",
            letterSpacing: "-0.03em",
          }}
        >
          {t.services.headline}
        </motion.h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
          {t.services.items.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative p-8 flex flex-col gap-4 transition-colors duration-300 cursor-default"
              style={{
                background: hovered === i ? "var(--surface)" : "var(--bg)",
              }}
            >
              {/* Number */}
              <span
                className="text-xs font-medium"
                style={{
                  color: hovered === i ? "var(--accent)" : "var(--muted)",
                  fontFamily: "var(--font-body)",
                  transition: "color 0.3s",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <h3
                className="text-xl font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text)",
                  letterSpacing: "-0.02em",
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
              >
                {service.desc}
              </p>

              {/* Arrow */}
              <span
                className="text-lg transition-all duration-300"
                style={{
                  color: "var(--accent)",
                  opacity: hovered === i ? 1 : 0,
                  transform: hovered === i ? "translate(0,0)" : "translate(-8px, 8px)",
                }}
              >
                ↗
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
