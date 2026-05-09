"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Project = {
  title: string;
  category: string;
  year: string;
  gradient: string;
};

function WorkCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);
  const springX = useSpring(bgX, { stiffness: 150, damping: 25 });
  const springY = useSpring(bgY, { stiffness: 150, damping: 25 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    bgX.set(relX * -24);
    bgY.set(relY * -24);
  };

  const onLeave = () => {
    bgX.set(0);
    bgY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 2) * 0.1 }}
      className="group relative overflow-hidden rounded-sm cursor-pointer"
      style={{ aspectRatio: "4/3" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Parallax background — slightly oversized to allow movement */}
      <motion.div
        className="absolute"
        style={{
          inset: "-24px",
          background: project.gradient,
          x: springX,
          y: springY,
        }}
      />

      {/* Dim overlay that lightens on hover */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: "rgba(0,0,0,0.25)" }}
        whileHover={{ opacity: 0.12 }}
      />

      {/* Year */}
      <div className="absolute top-6 left-6 z-10">
        <span
          className="text-xs tracking-widest"
          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font)" }}
        >
          {project.year}
        </span>
      </div>

      {/* Arrow — slides in on hover */}
      <motion.div
        className="absolute top-6 right-6 z-10"
        initial={{ opacity: 0, x: 8, y: -8 }}
        whileHover={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <span className="text-xl" style={{ color: "rgba(255,255,255,0.9)" }}>↗</span>
      </motion.div>

      {/* Scrim */}
      <div
        className="absolute bottom-0 left-0 right-0 h-52 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }}
      />

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <motion.p
          className="text-xs uppercase tracking-widest mb-2"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font)" }}
        >
          {project.category}
        </motion.p>
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
  );
}

export default function Work() {
  const { t } = useLang();

  return (
    <section
      id="work"
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
        <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
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
                  fontSize: "clamp(22px, 2.8vw, 40px)",
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
            className="group inline-flex items-center gap-2 text-sm"
            style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
            whileHover={{ x: 4 }}
          >
            {t.work.cta}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </motion.a>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {t.work.items.map((project, i) => (
            <WorkCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
