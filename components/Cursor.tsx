"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]"
        style={{ background: "var(--accent)" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9998]"
        style={{ border: "1px solid rgba(46,95,232,0.5)" }}
      />
    </>
  );
}
