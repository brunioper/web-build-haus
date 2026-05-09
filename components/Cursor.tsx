"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -200, my = -200, rx = -200, ry = -200, rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, [role='button']");
      setHovered(!!el);
    };

    const tick = () => {
      const ease = hovered ? 0.07 : 0.1;
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
      ring.style.transform = `translate(${rx - 22}px, ${ry - 22}px)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, [hovered]);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          width: hovered ? "10px" : "7px",
          height: hovered ? "10px" : "7px",
          background: "var(--accent)",
          transition: "width 0.25s ease, height 0.25s ease",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 rounded-full pointer-events-none z-[9997]"
        style={{
          width: hovered ? "52px" : "44px",
          height: hovered ? "52px" : "44px",
          border: `1px solid ${hovered ? "rgba(46,95,232,0.8)" : "rgba(46,95,232,0.4)"}`,
          background: hovered ? "rgba(46,95,232,0.07)" : "transparent",
          transition: "width 0.35s ease, height 0.35s ease, border-color 0.25s ease, background 0.25s ease",
        }}
      />
    </>
  );
}
