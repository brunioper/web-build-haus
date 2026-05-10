"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "@/components/LangContext";
import { ChapterLabel, PressButton } from "@/components/ui";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PortfolioReel() {
  const { t } = useLang();
  const items = t.work.items;
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  // Auto-advance reel every 3.2s when not hovering
  useEffect(() => {
    if (hovering) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % items.length);
    }, 3200);
    return () => clearInterval(id);
  }, [hovering, items.length]);

  const current = items[active];

  return (
    <section
      id="work"
      className="relative pt-16 md:pt-24 pb-32 md:pb-48"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ChapterLabel index={2} label="Portfolio" total={6} />

        <div className="grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-20 mt-10">
          <div>
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={{ y: "108%", skewY: 3 }}
                whileInView={{ y: 0, skewY: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1.0, ease: EASE }}
                className="font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(36px,6vw,88px)",
                  letterSpacing: "-0.045em",
                  lineHeight: 0.97,
                  color: "var(--text)",
                }}
              >
                This is what we build.
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-7 text-base md:text-lg leading-[1.7] max-w-md"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              {t.work.sub} Hover to pause; tap to visit.
            </motion.p>
            <div className="mt-10">
              <PressButton href="#contact" variant="primary">
                {t.work.cta}
              </PressButton>
            </div>
          </div>

          {/* Right side intentionally empty for visual breathing */}
          <div />
        </div>

        {/* THE FRAME — the just-built website now showing real portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.0, ease: EASE }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="relative mt-16 md:mt-24"
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 h-9 px-4"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderBottom: "none",
            }}
          >
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
            </div>
            <div
              className="flex-1 mx-4 h-5 rounded-sm flex items-center px-3"
              style={{ background: "var(--bg)" }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full mr-2"
                style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
              />
              <span
                className="text-[10px] tabular-nums"
                style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
              >
                {current.url.replace(/^https?:\/\//, "")}
              </span>
            </div>
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>

          {/* Frame body */}
          <div
            className="relative aspect-[16/9] md:aspect-[16/8.5] overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            <AnimatePresence mode="wait">
              <motion.a
                key={active}
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.99, filter: "blur(6px)" }}
                transition={{ duration: 0.65, ease: EASE }}
                className="absolute inset-0 block group"
                style={{ background: current.gradient }}
              >
                {/* dark overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
                  }}
                />
                {/* faint grid lines */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)",
                    backgroundSize: "60px 60px",
                  }}
                />

                {/* corner badge */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.85)" }}
                  />
                  <span
                    className="text-[10px] uppercase tracking-[0.32em]"
                    style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-body)" }}
                  >
                    {current.tag}
                  </span>
                </div>

                {/* big metadata */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.32em] mb-3"
                      style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)" }}
                    >
                      {current.industry} · {current.year}
                    </p>
                    <h3
                      className="font-bold text-white"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(28px,5vw,72px)",
                        letterSpacing: "-0.035em",
                        lineHeight: 1,
                      }}
                    >
                      {current.title}
                    </h3>
                    <p
                      className="mt-3 text-sm md:text-base max-w-md"
                      style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}
                    >
                      {current.desc}
                    </p>
                  </div>
                  <span
                    className="hidden md:inline-flex shrink-0 items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-transform group-hover:translate-x-1"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.25)",
                      backdropFilter: "blur(8px)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Visit ↗
                  </span>
                </div>
              </motion.a>
            </AnimatePresence>

            {/* Reel progress bar */}
            {!hovering && (
              <div
                key={active + "-bar"}
                className="absolute bottom-0 left-0 h-[2px]"
                style={{
                  background: "var(--accent)",
                  animation: "reel-bar 3.2s linear forwards",
                }}
              />
            )}
            <style>{`
              @keyframes reel-bar {
                from { width: 0; }
                to   { width: 100%; }
              }
            `}</style>
          </div>

          {/* Project tabs */}
          <div
            className="grid grid-cols-7 gap-px mt-px"
            style={{ background: "var(--border)" }}
          >
            {items.map((it, i) => {
              const isActive = i === active;
              return (
                <button
                  key={it.title}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className="text-left px-3 py-3 transition-colors group"
                  style={{
                    background: isActive ? "var(--surface)" : "var(--bg)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <div
                    className="text-[9px] tabular-nums tracking-[0.2em]"
                    style={{
                      color: isActive ? "var(--accent)" : "var(--muted)",
                      transition: "color 0.2s",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="mt-1 text-[11px] truncate font-medium"
                    style={{
                      color: isActive ? "var(--text)" : "var(--muted)",
                      transition: "color 0.2s",
                    }}
                  >
                    {it.title}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
