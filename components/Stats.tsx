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
    const duration = 2000;
    const raf = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
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
    <section
      className="py-20 md:py-28"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {t.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="flex flex-col gap-3 py-8 md:py-0"
              style={{
                borderRight: i < 3 ? "1px solid var(--border)" : "none",
                paddingLeft: i === 0 ? 0 : "2rem",
                paddingRight: "2rem",
              }}
            >
              <p
                className="text-5xl md:text-6xl font-light leading-none"
                style={{
                  fontFamily: "var(--font)",
                  color: "var(--text)",
                  letterSpacing: "-0.04em",
                }}
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
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
