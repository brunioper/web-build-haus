"use client";

import { useLang } from "@/components/LangContext";

const navHrefs = ["#work", "#services", "#about", "#contact"];

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Logo + location */}
          <div className="flex flex-col gap-1">
            <a href="#" className="inline-flex items-baseline">
              <span
                className="text-sm font-bold"
                style={{ color: "var(--text)", fontFamily: "var(--font)" }}
              >
                Build Haus{" "}
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: "var(--accent)", fontFamily: "var(--font)" }}
              >
                Studio
              </span>
            </a>
            <p
              className="text-xs"
              style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
            >
              {t.footer.location} · {t.footer.tagline}
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-6">
            {t.footer.nav.map((label, i) => (
              <a
                key={i}
                href={navHrefs[i]}
                className="text-xs uppercase tracking-widest transition-colors duration-200"
                style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--muted)")
                }
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p
            className="text-xs"
            style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
          >
            © {year} Build Haus Studio. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
