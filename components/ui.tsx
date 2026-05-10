"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────────────────────
   PressButton — magnetic + spring squish + shimmer, label slides
───────────────────────────────────────────────────────────── */
export function PressButton({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "accent";
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 320, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 320, damping: 22, mass: 0.4 });
  const [pressed, setPressed] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const r = (ref.current as HTMLElement).getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.28);
    y.set((e.clientY - cy) * 0.28);
  };
  const reset = () => { x.set(0); y.set(0); setPressed(false); };

  const palette =
    variant === "primary"
      ? { bg: "var(--accent)", text: "#fff", border: "var(--accent)" }
      : variant === "accent"
      ? { bg: "var(--text)", text: "var(--bg)", border: "var(--text)" }
      : { bg: "transparent", text: "var(--text)", border: "var(--border)" };

  const Comp: any = href ? motion.a : motion.button;
  const props: any = href ? { href } : { onClick };

  return (
    <Comp
      ref={ref}
      {...props}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      animate={{ scale: pressed ? 0.94 : 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 22 }}
      className={`group relative inline-flex items-center gap-3 px-6 py-3.5 overflow-hidden select-none cursor-pointer ${className}`}
    >
      {/* base background */}
      <span
        className="absolute inset-0"
        style={{
          background: palette.bg,
          border: `1px solid ${palette.border}`,
          transition: "background 0.25s ease",
        }}
      />
      {/* shimmer sweep on hover */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg,transparent 0%,transparent 35%,rgba(255,255,255,0.18) 50%,transparent 65%,transparent 100%)",
          transform: "translateX(-100%)",
          animation: "btn-shimmer 1.4s ease-in-out infinite",
          mixBlendMode: "overlay",
        }}
      />
      {/* label */}
      <span
        className="relative z-10 text-[13px] font-medium tracking-tight"
        style={{ color: palette.text, fontFamily: "var(--font-body)" }}
      >
        {children}
      </span>
      {/* arrow that nudges */}
      <motion.span
        className="relative z-10 text-base leading-none"
        style={{ color: palette.text, fontFamily: "var(--font-body)" }}
        animate={{ x: pressed ? 4 : 0 }}
      >
        →
      </motion.span>

      <style>{`
        @keyframes btn-shimmer {
          0%   { transform: translateX(-110%); }
          60%  { transform: translateX(110%); }
          100% { transform: translateX(110%); }
        }
      `}</style>
    </Comp>
  );
}

/* ─────────────────────────────────────────────────────────────
   ChapterLabel — uppercase, tracked-out, with index counter
───────────────────────────────────────────────────────────── */
export function ChapterLabel({
  index,
  label,
  total,
}: {
  index: number;
  label: string;
  total?: number;
}) {
  const ix = String(index).padStart(2, "0");
  const tot = total ? `/${String(total).padStart(2, "0")}` : "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="flex items-center gap-3"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <span
        className="text-[10px] tabular-nums tracking-[0.25em]"
        style={{ color: "var(--accent)" }}
      >
        {ix}
        <span style={{ color: "var(--muted)" }}>{tot}</span>
      </span>
      <span className="w-6 h-px" style={{ background: "var(--accent)" }} />
      <span
        className="text-[10px] uppercase tracking-[0.32em]"
        style={{ color: "var(--accent)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BigType — editorial reveal with clip-path mask + skew
───────────────────────────────────────────────────────────── */
const lineVar: Variants = {
  hidden: { y: "108%", skewY: 4, opacity: 0 },
  show: {
    y: 0,
    skewY: 0,
    opacity: 1,
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
  },
};
const containerVar: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export function BigType({
  lines,
  size = "clamp(40px,7.5vw,116px)",
  accentLast = false,
  className = "",
}: {
  lines: string[];
  size?: string;
  accentLast?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      variants={containerVar}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
      className={className}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: "hidden" }}>
          <motion.h2
            variants={lineVar}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: size,
              letterSpacing: "-0.045em",
              lineHeight: 0.95,
              color:
                accentLast && i === lines.length - 1
                  ? "var(--accent)"
                  : "var(--text)",
            }}
          >
            {line}
          </motion.h2>
        </div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ScrollCue — small "scroll" pulse with arrow
───────────────────────────────────────────────────────────── */
export function ScrollCue({ label = "Scroll" }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="flex items-center gap-2"
      style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
    >
      <span className="text-[10px] tracking-[0.32em] uppercase">{label}</span>
      <motion.span
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        className="text-base"
      >
        ↓
      </motion.span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FluidCursorBlob — soft, accent-tinted blob that follows cursor
   (subtle dopamine accent, hidden on touch devices)
───────────────────────────────────────────────────────────── */
export function FluidCursorBlob() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;
    setEnabled(true);
    const fn = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed pointer-events-none -z-0"
      style={{
        x: sx,
        y: sy,
        width: 480,
        height: 480,
        marginLeft: -240,
        marginTop: -240,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(46,95,232,0.20) 0%, rgba(46,95,232,0.10) 30%, transparent 65%)",
        filter: "blur(40px)",
        mixBlendMode: "screen",
      }}
    />
  );
}
