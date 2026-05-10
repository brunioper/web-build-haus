"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChapterLabel } from "@/components/ui";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Chapter = {
  num: string;
  label: string;
  headline: string;
  body: string;
  benefits: string[];
};

/* Each chapter is anchored to a fraction of the video's playback time. */
const CHAPTERS: Chapter[] = [
  {
    num: "01",
    label: "Boot",
    headline: "From a blank canvas, an interface opens.",
    body:
      "Every great website begins the same way: empty. We start with discovery — your business, your audience, the one outcome that matters — long before a single pixel is placed.",
    benefits: ["Discovery workshop", "Audience + funnel mapping", "Outcome-led brief"],
  },
  {
    num: "02",
    label: "Code",
    headline: "Real engineering, not templates.",
    body:
      "What you see is hand-built in Next.js, React, and TypeScript. No bloated page builders, no template scars — just clean, fast, accessible code your team can extend later.",
    benefits: ["Next.js + TypeScript", "Accessible by default", "CMS-ready for your team"],
  },
  {
    num: "03",
    label: "Structure",
    headline: "Hierarchy that earns attention.",
    body:
      "Your most important message gets the most weight. Editorial typography, single-CTA discipline, breathing room where it belongs. We design the journey, then the screen.",
    benefits: ["Editorial typography", "Visual rhythm", "Single-CTA discipline"],
  },
  {
    num: "04",
    label: "Brand",
    headline: "Color and type become recognition.",
    body:
      "Your palette, your voice, your motion language. We pull every visual decision from your brand so the result feels unmistakably you — and only you.",
    benefits: ["Custom palette systems", "Type pairings", "Motion identity"],
  },
  {
    num: "05",
    label: "Conversion",
    headline: "Built for the metric that matters.",
    body:
      "The CTAs, the trust signals, the funnel — tuned to the one outcome you care about. Sub-second LCP, edge-rendered, analytics built-in. Beauty is the cover; conversion is the book.",
    benefits: ["Sub-second performance", "Funnel-led layout", "Analytics built-in"],
  },
];

export default function BuildStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const v = videoRef.current;
    const sec = sectionRef.current;
    if (!v || !sec) return;

    const onTime = () => {
      if (v.duration) setProgress(Math.min(1, v.currentTime / v.duration));
    };
    v.addEventListener("timeupdate", onTime);

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && v.paused) {
            v.play().catch(() => {});
            setHasPlayed(true);
          }
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(sec);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      obs.disconnect();
    };
  }, [reduced]);

  const chapterIndex = Math.min(
    CHAPTERS.length - 1,
    Math.floor(progress * CHAPTERS.length)
  );
  const chapter = CHAPTERS[chapterIndex];
  const pct = Math.round(progress * 100);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      {/* Section intro — generous breathing room */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 md:pt-48 pb-20 md:pb-32">
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
            className="mt-7 text-base md:text-lg leading-[1.75] max-w-xl"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            A laptop opens. Code rains in. A website assembles itself. Five
            chapters of how your project actually comes together.
          </motion.p>
        </div>
      </div>

      {/* The cinematic stage */}
      <div className="relative pb-32 md:pb-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] gap-10 lg:gap-20 items-center">

          {/* LEFT: autoplay 3D MacBook video */}
          <div className="relative order-2 md:order-1">
            <div
              className="relative w-full aspect-[16/9] overflow-hidden"
              style={{
                background: "#0A0A0F",
                border: "1px solid var(--border)",
                boxShadow:
                  "0 30px 80px -20px rgba(46,95,232,0.18), 0 0 0 1px var(--border)",
              }}
            >
              {reduced ? (
                <img
                  src="/macbook-build-poster.jpg"
                  alt="MacBook displaying the built website"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster="/macbook-build-poster.jpg"
                  aria-label="3D animation: MacBook opens, code rains, then a website builds itself"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/macbook-build.webm" type="video/webm" />
                  <source src="/macbook-build.mp4" type="video/mp4" />
                </video>
              )}

              {/* soft vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(10,10,15,0.6) 100%)",
                }}
              />

              {/* status pill */}
              <div
                className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5"
                style={{
                  background: "rgba(10,10,15,0.55)",
                  border: "1px solid var(--border)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent)" }}
                />
                <span
                  className="text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--text)", fontFamily: "var(--font-body)" }}
                >
                  {hasPlayed ? `Now: ${chapter.label}` : "Ready · waiting for you"}
                </span>
              </div>

              {/* chapter dots inside the frame */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5">
                {CHAPTERS.map((_, i) => (
                  <span
                    key={i}
                    className="h-[2px] flex-1 rounded-full"
                    style={{
                      background: i <= chapterIndex ? "var(--accent)" : "rgba(255,255,255,0.12)",
                      transition: "background 0.3s",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* meta row beneath video */}
            <div className="mt-3 flex items-center justify-between">
              <span
                className="text-[10px] uppercase tracking-[0.22em]"
                style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
              >
                ↳ Lid opens · code rains · the site assembles
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.22em] tabular-nums"
                style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
              >
                {pct}% · Rendered in Blender
              </span>
            </div>
          </div>

          {/* RIGHT: chapter copy that swaps with video time */}
          <div className="order-1 md:order-2 relative min-h-[60vh] flex flex-col justify-center">
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

            {/* Chapter strip + percent */}
            <div
              className="mt-12 flex items-center gap-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <div className="flex items-center gap-3">
                {CHAPTERS.map((c, i) => (
                  <span
                    key={c.num}
                    className="text-[10px] uppercase tracking-[0.22em] tabular-nums"
                    style={{
                      color: i === chapterIndex ? "var(--accent)" : "var(--muted)",
                      opacity: i === chapterIndex ? 1 : 0.5,
                      transition: "color 0.3s, opacity 0.3s",
                    }}
                  >
                    {c.num}
                  </span>
                ))}
              </div>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
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
          <span style={{ color: "var(--accent)" }}>
            Now look at what we&rsquo;ve made.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
