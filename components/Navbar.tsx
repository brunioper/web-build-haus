"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";

const navHrefs: Record<string,string> = { work:"#work",services:"#services",stack:"#stack",about:"#about",contact:"#contact" };
const navKeys = ["work","services","stack","about","contact"] as const;

export default function Navbar() {
  const { lang, t, toggle } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ background: scrolled ? "var(--nav-bg)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid var(--border)" : "none" }}
    >
      <motion.div style={{ scaleX, transformOrigin:"left", height:"1px", background:"var(--accent)" }} className="absolute bottom-0 left-0 right-0" />
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="select-none flex items-baseline">
          <span className="text-base font-bold tracking-tight" style={{ fontFamily:"var(--font-display)", color:"var(--text)" }}>Build Haus </span>
          <span className="text-base font-bold tracking-tight" style={{ fontFamily:"var(--font-display)", color:"var(--accent)" }}>Studio</span>
        </a>
        <div className="hidden lg:flex items-center gap-7">
          {navKeys.map(key => (
            <a key={key} href={navHrefs[key]} className="text-sm transition-colors duration-200"
              style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color="var(--text)"}
              onMouseLeave={e => (e.target as HTMLElement).style.color="var(--muted)"}
            >{(t.nav as Record<string,string>)[key]}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <motion.button onClick={toggleTheme} whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ border:"1px solid var(--border)", color:"var(--muted)" }}>
            <AnimatePresence mode="wait">
              <motion.span key={theme} initial={{ rotate:-90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:90,opacity:0 }} transition={{ duration:0.2 }}>
                {theme === "dark" ? "☀" : "◗"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
          <button onClick={toggle} className="text-xs font-medium tracking-widest" style={{ color:"var(--muted)" }}>
            <span style={{ color: lang==="en" ? "var(--text)" : "var(--muted)" }}>EN</span>
            <span style={{ color:"var(--border)", margin:"0 2px" }}>/</span>
            <span style={{ color: lang==="es" ? "var(--text)" : "var(--muted)" }}>ES</span>
          </button>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all duration-200"
            style={{ background:"var(--accent)", color:"#fff", fontFamily:"var(--font-body)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background="var(--accent-light)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background="var(--accent)"}
          >{t.nav.cta}</a>
          <button onClick={() => setMenuOpen(o => !o)} className="lg:hidden flex flex-col gap-1.5 p-1" aria-label="Menu">
            {[0,1,2].map(i => (
              <span key={i} className="block h-px transition-all duration-300" style={{
                width: i===1?"16px":"22px", background:"var(--text)",
                opacity: i===1&&menuOpen ? 0 : 1,
                transform: menuOpen ? (i===0?"rotate(45deg) translate(3px,3px)":i===2?"rotate(-45deg) translate(3px,-3px)":"none") : "none"
              }}/>
            ))}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
            className="lg:hidden overflow-hidden" style={{ background:"var(--bg)", borderBottom:"1px solid var(--border)" }}>
            <div className="px-6 py-6 flex flex-col gap-0">
              {navKeys.map(key => (
                <a key={key} href={navHrefs[key]} className="py-4 text-xl font-medium"
                  style={{ color:"var(--text)", borderBottom:"1px solid var(--border)", fontFamily:"var(--font-display)" }}
                  onClick={() => setMenuOpen(false)}>{(t.nav as Record<string,string>)[key]}</a>
              ))}
              <a href="#contact" className="mt-5 inline-flex px-5 py-2.5 text-sm font-medium rounded-full self-start"
                style={{ background:"var(--accent)", color:"#fff" }} onClick={() => setMenuOpen(false)}>{t.nav.cta}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
