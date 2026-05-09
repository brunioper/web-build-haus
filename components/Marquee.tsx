"use client";

import { useLang } from "@/components/LangContext";

export default function Marquee() {
  const { t } = useLang();
  const items = [...t.marquee, ...t.marquee];

  return (
    <div
      className="relative overflow-hidden py-4 border-y"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee-scroll 30s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-7 px-7 text-xs uppercase tracking-[0.18em] font-medium"
            style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
          >
            {item}
            <span style={{ color: "var(--accent)", fontSize: "8px" }}>●</span>
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
