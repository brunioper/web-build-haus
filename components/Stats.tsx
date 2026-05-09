"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useLang } from "@/components/LangContext";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const duration = 1800;
    const raf = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useLang();

  return (
    <section className="py-24 md:py-32" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {t.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.1 }}
              className="flex flex-col gap-2"
            >
              <p
                className="text-5xl md:text-6xl font-bold leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text)",
                  letterSpacing: "-0.03em",
                }}
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p
                className="text-sm leading-snug"
                style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
