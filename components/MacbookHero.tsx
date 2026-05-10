"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChapterLabel, ScrollCue } from "@/components/ui";

/* Premium ease curves — long-tail expo / quart for a slow, settled feel.
   No springs, no overshoot — just smooth acceleration -> deceleration. */
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MacbookHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  /* Slow the video for a premium, deliberate hinge motion (6s -> ~11s). */
  useEffect(() => {
    if (reduced) return;
    const v = videoRef.current;
    if (!v) return;
    const apply = () => {
      v.playbackRate = 0.55;
    };
    apply();
    v.addEventListener("loadedmetadata", apply);
    return () => v.removeEventListener("loadedmetadata", apply);
  }, [reduced]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: 720, background: "#08080C" }}
    >
      {/* ─── full-bleed laptop video ─── */}
      {reduced ? (
        <img
          src="/macbook-build-poster.jpg"
          alt="MacBook displaying a built website"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          poster="/macbook-build-poster.jpg"
          aria-label="MacBook opens, code rains, then a website builds itself"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/macbook-build.webm" type="video/webm" />
          <source src="/macbook-build.mp4" type="video/mp4" />
        </video>
      )}

      {/* Soft top + bottom darkening so titles read clearly */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,12,0.55) 0%, rgba(8,8,12,0.0) 22%," +
            " rgba(8,8,12,0.0) 60%, rgba(8,8,12,0.85) 100%)",
        }}
      />

      {/* faint grain for cinematic feel */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          mixBlendMode: "overlay",
        }}
      />

      {/* ─── top: chapter label + brand mark ─── */}
      <div className="absolute top-0 left-0 right-0 z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 md:pt-40 flex items-start justify-between">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: EASE_OUT_EXPO }}
        >
          <ChapterLabel index={0} label="Welcome" total={6} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 1.0 }}
          className="hidden md:flex items-center gap-2"
        >
          <motion.span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.32em]"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}
          >
            Live · Build Haus · Montevideo
          </span>
        </motion.div>
      </div>

      {/* ─── bottom: editorial title overlay ─── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 md:pb-24">
        <div className="grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 md:gap-20 items-end">
          <div>
            <div style={{ overflow: "hidden" }}>
              <motion.h1
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.8, delay: 1.0, ease: EASE_OUT_EXPO }}
                className="font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px, 6.5vw, 104px)",
                  letterSpacing: "-0.05em",
                  lineHeight: 0.95,
                  color: "#FFFFFF",
                }}
              >
                Watch a website
              </motion.h1>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.h1
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.8, delay: 1.18, ease: EASE_OUT_EXPO }}
                className="font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px, 6.5vw, 104px)",
                  letterSpacing: "-0.05em",
                  lineHeight: 0.95,
                  color: "#FFFFFF",
                }}
              >
                <span style={{ fontStyle: "italic", fontWeight: 500 }}>come to </span>
                <span style={{ color: "var(--accent)" }}>life.</span>
              </motion.h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 2.2, ease: EASE_OUT_EXPO }}
            className="md:pb-2"
          >
            <p
              className="text-[15px] md:text-base leading-[1.75] max-w-sm"
              style={{
                color: "rgba(255,255,255,0.62)",
                fontFamily: "var(--font-body)",
              }}
            >
              We design and engineer modern websites for brands that want to look
              sharper, feel faster, and convert more — built with the care of a
              luxury studio, not a template factory.
            </p>
            <div className="mt-7 flex items-center gap-4">
              <span
                className="inline-block w-8 h-px"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.32em]"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}
              >
                Build Haus Studio · est. 2019
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── scroll cue, far bottom centre ─── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 3.4, ease: EASE_OUT_EXPO }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10"
      >
        <ScrollCue label="Scroll · The Build" />
      </motion.div>
    </section>
  );
}
