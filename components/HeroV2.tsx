"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/components/LangContext";
import { BigType, ChapterLabel, PressButton, ScrollCue } from "@/components/ui";
import TimeDisplay from "@/components/TimeDisplay";

/* Subtle background — Blender hero loop, masked + screen-blended */
function HeroAccent() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  if (reduced) {
    return (
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 78% 35%, rgba(46,95,232,0.22), transparent 60%)",
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/hero-loop-poster.jpg"
        aria-hidden
        className="absolute right-[-8vw] top-[-4vh] h-[110vh] w-[78vw] max-w-[1400px] object-cover"
        style={{
          mixBlendMode: "screen",
          opacity: 0.9,
          maskImage:
            "radial-gradient(ellipse 75% 70% at 65% 50%, black 35%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 65% 50%, black 35%, transparent 78%)",
        }}
      >
        <source src="/hero-loop.webm" type="video/webm" />
        <source src="/hero-loop.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--bg) 0%, rgba(10,10,15,0.78) 28%, rgba(10,10,15,0.45) 55%, transparent 88%)",
        }}
      />
    </div>
  );
}

export default function HeroV2() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      <HeroAccent />

      {/* faint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      {/* huge faint chapter index */}
      <span
        aria-hidden
        className="absolute right-[3vw] top-[8vh] select-none pointer-events-none font-bold"
        style={{
          fontSize: "clamp(140px,28vw,420px)",
          color: "var(--text)",
          opacity: 0.025,
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.07em",
          lineHeight: 1,
        }}
      >
        00
      </span>

      {/* Top cluster — chapter + location */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-32 md:pt-40">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <ChapterLabel index={0} label="Invitation" total={6} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <motion.span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.32em]"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              {t.hero.location}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Center — editorial big type */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-12 py-16">
        <BigType
          lines={["Watch a website", "come to life", "as you scroll."]}
          accentLast
          className="mb-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="grid md:grid-cols-[minmax(0,1fr)_auto] gap-10 md:gap-16 md:items-end max-w-4xl"
        >
          <p
            className="text-base md:text-lg leading-[1.7] max-w-md"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            We design and build modern websites for brands that want to look
            sharper, feel faster, and convert more. This page is a small
            demonstration — keep scrolling.
          </p>
          <div className="flex items-center gap-5">
            <PressButton href="#story" variant="primary">
              Begin the story
            </PressButton>
            <PressButton href="#contact" variant="ghost">
              {t.hero.cta}
            </PressButton>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-8 pt-5 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <TimeDisplay />
        <div className="flex items-center gap-8">
          <span
            className="text-[10px] tracking-[0.32em] uppercase hidden md:block"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            EST. 2019 · MONTEVIDEO
          </span>
          <ScrollCue />
        </div>
      </motion.div>
    </section>
  );
}
