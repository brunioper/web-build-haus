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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
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
                fontSize: "clamp(24px, 3vw, 42px)",
                color: "var(--text)",
                letterSpacing: "-0.03em",
              }}
            >
              {t.services.headline}
            </motion.h2>
          </div>
        </div>

        {/* Service rows */}
        <div>
          {t.services.items.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[64px_1fr_2fr_auto] items-center gap-6 py-7 cursor-default transition-colors duration-300"
              style={{
                borderBottom: "1px solid var(--border)",
                background: hovered === i ? "var(--surface)" : "transparent",
              }}
            >
              {/* Number */}
              <span
                className="text-xs font-medium tabular-nums"
                style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <h3
                className="text-xl md:text-2xl font-light"
                style={{
                  fontFamily: "var(--font)",
                  color: "var(--text)",
                  letterSpacing: "-0.02em",
                }}
              >
                {service.title}
              </h3>

              {/* Description — hidden on mobile, shown on md+ */}
              <p
                className="hidden md:block text-sm leading-relaxed"
                style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
              >
                {service.desc}
              </p>

              {/* Arrow */}
              <span
                className="text-base transition-all duration-300"
                style={{
                  color: "var(--accent)",
                  opacity: hovered === i ? 1 : 0,
                  transform: hovered === i ? "translate(0,0)" : "translate(-8px,8px)",
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
