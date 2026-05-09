"use client";

import { useLang } from "@/components/LangContext";

const navHrefs = ["#work", "#services", "#about", "#contact"];

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-12 md:py-16"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-1">
            <a href="#" className="inline-flex" aria-label="Build Haus Studio">
              <span
                className="text-base font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
              >
                Build Haus{" "}
              </span>
              <span
                className="text-base font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
              >
                Studio
              </span>
            </a>
            <p
              className="text-xs"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              {t.footer.tagline}
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6">
            {t.footer.nav.map((label, i) => (
              <a
                key={i}
                href={navHrefs[i]}
                className="text-sm transition-colors duration-200"
                style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
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
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            © {year} Build Haus Studio. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
