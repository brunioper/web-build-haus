"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { ChapterLabel } from "@/components/ui";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Chapter = {
  num: string;
  label: string;
  headline: string;
  body: string;
  benefits: string[];
};

const CHAPTERS: Chapter[] = [
  {
    num: "01",
    label: "Foundation",
    headline: "Every great site starts with structure, not pixels.",
    body:
      "Before any color or animation, we map your message, your funnel, and the path of every visitor. The grid below is the first decision — and the most important one.",
    benefits: [
      "Information architecture",
      "Mobile-first wireframes",
      "Conversion path mapping",
    ],
  },
  {
    num: "02",
    label: "Hierarchy",
    headline: "What matters most earns the most space.",
    body:
      "We give weight to your headline, breathing room to your offer, and a clear next step. No template. No guesswork. Just attention placed exactly where you need it.",
    benefits: [
      "Editorial typography",
      "Visual rhythm",
      "Single-CTA discipline",
    ],
  },
  {
    num: "03",
    label: "Brand",
    headline: "Color and type become recognition.",
    body:
      "Your palette, your voice, your motion language. We pull every visual decision from your brand so the result feels like you — and only you.",
    benefits: [
      "Custom palette systems",
      "Type pairings",
      "Motion identity",
    ],
  },
  {
    num: "04",
    label: "Engineering",
    headline: "Built fast. Built right. Built to last.",
    body:
      "Next.js, edge-rendered, sub-second LCP. Clean component architecture so your site can grow with you without ever needing a rebuild.",
    benefits: [
      "Sub-second performance",
      "Accessible by default",
      "CMS-ready for your team",
    ],
  },
  {
    num: "05",
    label: "Conversion",
    headline: "Designed around the metric that matters.",
    body:
      "The CTAs, the trust signals, the funnel — every detail tuned to the one outcome you actually care about. Beauty is the cover, conversion is the book.",
    benefits: [
      "Funnel-led layout",
      "Form & checkout polish",
      "Analytics built-in",
    ],
  },
];

export default function BuildStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
    const v_ = videoRef.current;
    if (v_ && v_.duration && !reduced) {
      const t = Math.min(v_.duration - 0.02, v * v_.duration);
      try { v_.currentTime = t; } catch {}
    }
  });

  const chapterIndex = Math.min(
    CHAPTERS.length - 1,
    Math.floor(progress * CHAPTERS.length)
  );
  const chapter = CHAPTERS[chapterIndex];
  const pct = Math.round(progress * 100);

  return (
    <section id="story" className="relative" style={{ borderBottom: "1px solid var(--border)" }}>
      {/* Section intro — generous breathing room */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 md:pt-48 pb-24 md:pb-40">
        <ChapterLabel index={1} label="The Build" total={6} />
        <div className="mt-8 max-w-4xl">
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "108%", skewY: 3 }}
              whileInView={{ y: 0, skewY: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.0, ease: EASE }}
              className="font-bold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px,6vw,90px)",
                fontWeight: 700,
                letterSpacing: "-0.045em",
                lineHeight: 0.97,
                color: "var(--text)",
              }}
            >
              Watch one being built.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-base md:text-lg leading-[1.75] max-w-xl"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            Five chapters. One website. Scroll to assemble it piece by piece —
            and read why each step matters.
          </motion.p>
        </div>
      </div>

      {/* Scroll-pinned story — 600vh container */}
      <div ref={containerRef} style={{ height: "600vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-10 lg:gap-20 items-center">
            {/* LEFT: scroll-scrubbed Blender video */}
            <div className="relative order-2 md:order-1">
              {/* Browser chrome */}
              <div
                className="hidden md:flex items-center gap-2 h-7 px-3"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderBottom: "none",
                }}
              >
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
                  <span className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
                  <span className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
                </div>
                <div
                  className="flex-1 mx-3 h-3.5 rounded-sm flex items-center px-2"
                  style={{ background: "var(--bg)" }}
                >
                  <span
                    className="text-[8px]"
                    style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                  >
                    yourbrand.com {progress > 0.4 ? "/launch" : "/draft"}
                  </span>
                </div>
                <span
                  className="text-[8px] tabular-nums"
                  style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
                >
                  {pct}%
                </span>
              </div>

              <div
                className="relative w-full aspect-[16/9] overflow-hidden"
                style={{ border: "1px solid var(--border)", background: "#0A0A0F" }}
              >
                {reduced ? (
                  <img
                    src="/build-itself-poster.jpg"
                    alt="Website building itself"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    poster="/build-itself-poster.jpg"
                    aria-label="Scroll-driven 3D animation of a website being built"
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/build-itself.webm" type="video/webm" />
                    <source src="/build-itself.mp4" type="video/mp4" />
                  </video>
                )}
                {/* vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 50%, rgba(10,10,15,0.65) 100%)",
                  }}
                />
                {/* status pill */}
                <div
                  className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1"
                  style={{
                    background: "rgba(10,10,15,0.55)",
                    border: "1px solid var(--border)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent)" }}
                  />
                  <span
                    className="text-[9px] uppercase tracking-[0.2em]"
                    style={{ color: "var(--text)", fontFamily: "var(--font-body)" }}
                  >
                    {chapter.label}
                  </span>
                </div>
                {/* Chapter dots */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5">
                  {CHAPTERS.map((_, i) => (
                    <span
                      key={i}
                      className="h-[2px] flex-1 rounded-full"
                      style={{
                        background:
                          i <= chapterIndex ? "var(--accent)" : "rgba(255,255,255,0.12)",
                        transition: "background 0.3s",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span
                  className="text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                >
                  ↳ Each chapter extrudes from the grid
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
                >
                  Rendered in Blender · 24 fps
                </span>
              </div>
            </div>

            {/* RIGHT: chapter copy that swaps with progress */}
            <div className="order-1 md:order-2 relative min-h-[55vh] flex flex-col justify-center">
              <ChapterLabel
                index={parseInt(chapter.num)}
                label={chapter.label}
                total={CHAPTERS.length}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={chapter.num}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="mt-7"
                >
                  <h3
                    className="font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(28px,3.6vw,52px)",
                      letterSpacing: "-0.035em",
                      lineHeight: 1.05,
                      color: "var(--text)",
                    }}
                  >
                    {chapter.headline}
                  </h3>
                  <p
                    className="mt-6 text-base md:text-lg leading-[1.7] max-w-xl"
                    style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                  >
                    {chapter.body}
                  </p>
                  <ul className="mt-8 grid gap-3 max-w-md">
                    {chapter.benefits.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                        className="flex items-center gap-3 text-sm"
                        style={{ color: "var(--text)", fontFamily: "var(--font-body)" }}
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--accent)" }}
                        />
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* Progress reel */}
              <div
                className="mt-12 flex items-center gap-6"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <div className="flex items-center gap-2">
                  {CHAPTERS.map((c, i) => (
                    <span
                      key={c.num}
                      className="text-[10px] uppercase tracking-[0.22em] tabular-nums"
                      style={{
                        color: i === chapterIndex ? "var(--accent)" : "var(--muted)",
                        opacity: i === chapterIndex ? 1 : 0.55,
                        transition: "color 0.3s, opacity 0.3s",
                      }}
                    >
                      {c.num}
                    </span>
                  ))}
                </div>
                <div
                  className="flex-1 h-px"
                  style={{ background: "var(--border)" }}
                />
                <span
                  className="text-[10px] uppercase tracking-[0.22em] tabular-nums"
                  style={{ color: "var(--muted)" }}
                >
                  {pct}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reveal closer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 md:py-48 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto max-w-3xl text-2xl md:text-4xl font-bold"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            color: "var(--text)",
          }}
        >
          The site is built.{" "}
          <span style={{ color: "var(--accent)" }}>Now look at what we&rsquo;ve made.</span>
        </motion.p>
      </div>
    </section>
  );
}
