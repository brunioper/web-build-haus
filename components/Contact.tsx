"use client";

import { motion, type Variants } from "motion/react";
import { useLang } from "@/components/LangContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const lineVar: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function Contact() {
  const { t } = useLang();

  return (
    <section
      id="contact"
      className="py-24 md:py-40"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16 pb-6"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <span className="w-5 h-px" style={{ background: "var(--accent)" }} />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)", fontFamily: "var(--font)" }}
          >
            {t.contact.label}
          </span>
        </motion.div>

        <div className="grid md:grid-cols-[3fr_2fr] gap-16 md:gap-24 items-end">
          {/* Large headline */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {t.contact.headline.split(" ").reduce<string[][]>((acc, word) => {
              const lastLine = acc[acc.length - 1];
              if (!lastLine || lastLine.join(" ").length + word.length > 20) {
                acc.push([word]);
              } else {
                lastLine.push(word);
              }
              return acc;
            }, []).map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.h2
                  variants={lineVar}
                  className="font-light leading-[1.05]"
                  style={{
                    fontFamily: "var(--font)",
                    fontSize: "clamp(42px, 6.5vw, 88px)",
                    color: "var(--text)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {line.join(" ")}
                </motion.h2>
              </div>
            ))}
          </motion.div>

          {/* Right: body + email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <p
              className="text-base leading-[1.7]"
              style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
            >
              {t.contact.body}
            </p>

            <motion.a
              href={`mailto:${t.contact.email}`}
              className="group inline-flex items-center gap-3 text-base font-medium"
              style={{ color: "var(--text)", fontFamily: "var(--font)" }}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
            >
              <span
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-[var(--accent)]"
                style={{ border: "1px solid var(--border)" }}
              >
                →
              </span>
              {t.contact.cta}
            </motion.a>

            <a
              href={`mailto:${t.contact.email}`}
              className="text-sm transition-colors duration-200"
              style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--muted)")
              }
            >
              {t.contact.email}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
