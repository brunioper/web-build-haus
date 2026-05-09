"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function PageIntro() {
  const [visible, setVisible] = useState(true);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Lock scroll during intro
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setTextVisible(true), 200);
    const t2 = setTimeout(() => {
      document.body.style.overflow = "";
      setVisible(false);
    }, 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col justify-end"
          style={{ background: "#0A0A0F" }}
          exit={{
            clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Top right: EST. label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: textVisible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 right-8 text-xs uppercase tracking-[0.25em]"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}
          >
            Est. 2019
          </motion.div>

          {/* Center: loading bar */}
          <div className="absolute left-6 right-6 lg:left-12 lg:right-12 top-1/2 -translate-y-1/2">
            <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div
                className="h-full"
                style={{ background: "var(--accent)", transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
          </div>

          {/* Bottom: studio name */}
          <div className="px-6 lg:px-12 pb-10">
            <div style={{ overflow: "hidden" }}>
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: textVisible ? "0%" : "100%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-display)" }}
              >
                Build Haus Studio
              </motion.p>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: textVisible ? "0%" : "100%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                className="text-xs uppercase tracking-[0.25em]"
                style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}
              >
                Montevideo, Uruguay
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
