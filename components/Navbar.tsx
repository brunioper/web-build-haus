"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(10,10,15,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-0 select-none">
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Build Haus{" "}
          </span>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
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
              className="text-sm transition-colors duration-200 hover:opacity-100"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
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

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <button
            onClick={toggle}
            className="text-xs font-medium tracking-widest transition-colors"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            <span style={{ color: lang === "en" ? "var(--text)" : "var(--muted)" }}>EN</span>
            <span style={{ color: "var(--border)" }}> / </span>
            <span style={{ color: lang === "es" ? "var(--text)" : "var(--muted)" }}>ES</span>
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200"
            style={{
              background: "var(--accent)",
              color: "#fff",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "var(--accent-light)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "var(--accent)")
            }
          >
            {t.nav.cta}
          </a>

          {/* Mobile burger */}
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
              style={{
                background: "var(--text)",
                opacity: menuOpen ? 0 : 1,
              }}
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

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="md:hidden px-6 pb-8 pt-2"
          style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-4 text-2xl font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)", borderBottom: "1px solid var(--border)" }}
              onClick={() => setMenuOpen(false)}
            >
              {lang === "en" ? link.en : link.es}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full"
            style={{ background: "var(--accent)", color: "#fff" }}
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.cta}
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
