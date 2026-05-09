"use client";

import { useLang } from "@/components/LangContext";

export default function Marquee() {
  const { t } = useLang();
  const items = [...t.marquee, ...t.marquee];

  return (
    <div
      className="relative overflow-hidden py-5 border-y"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{
          animation: "marquee-scroll 28s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-8 px-8 text-sm font-medium uppercase tracking-widest"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            {item}
            <span style={{ color: "var(--accent)" }}>·</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
