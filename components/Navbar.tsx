"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useLang } from "@/components/LangContext";

const navLinks = [
  { href: "#work", en: "Work", es: "Proyectos" },
  { href: "#services", en: "Services", es: "Servicios" },
  { href: "#about", en: "About", es: "Nosotros" },
  { href: "#contact", en: "Contact", es: "Contacto" },
];

export default function Navbar() {
  const { lang, t, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(248,247,244,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "left", height: "1px", background: "var(--accent)" }}
        className="absolute bottom-0 left-0 right-0"
        aria-hidden
      />

      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="select-none flex items-baseline gap-0">
          <span
            className="text-base font-bold tracking-tight"
            style={{ color: "var(--text)", fontFamily: "var(--font)" }}
          >
            Build Haus{" "}
          </span>
          <span
            className="text-base font-bold tracking-tight"
            style={{ color: "var(--accent)", fontFamily: "var(--font)" }}
          >
            Studio
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm transition-colors duration-200"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--muted)")
              }
            >
              {lang === "en" ? link.en : link.es}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <button
            onClick={toggle}
            className="text-xs font-medium tracking-widest transition-colors"
            style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
          >
            <span style={{ color: lang === "en" ? "var(--text)" : "var(--muted)" }}>EN</span>
            <span style={{ color: "var(--border)", margin: "0 2px" }}>/</span>
            <span style={{ color: lang === "es" ? "var(--text)" : "var(--muted)" }}>ES</span>
          </button>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200"
            style={{ background: "var(--text)", color: "var(--bg)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "var(--accent)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "var(--text)")
            }
          >
            {t.nav.cta}
          </a>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Menu"
          >
            <span
              className="w-6 h-px block transition-all duration-300"
              style={{
                background: "var(--text)",
                transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
              }}
            />
            <span
              className="w-4 h-px block transition-all duration-300"
              style={{ background: "var(--text)", opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="w-6 h-px block transition-all duration-300"
              style={{
                background: "var(--text)",
                transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pb-8 pt-2"
          style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-4 text-2xl font-medium"
              style={{ color: "var(--text)", borderBottom: "1px solid var(--border)" }}
              onClick={() => setMenuOpen(false)}
            >
              {lang === "en" ? link.en : link.es}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-6 inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full"
            style={{ background: "var(--text)", color: "var(--bg)" }}
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.cta}
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
