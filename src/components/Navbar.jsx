import React, { useState, useEffect } from "react";
import { Compass, Settings, Moon, Sun, MapPin, Sparkles } from "lucide-react";

export const Navbar = ({ onOpenSettings, onSelectLocation, currentLocation, theme, toggleTheme, onOpenAI }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: scrolled ? "10px 0" : "16px 0",
        background: scrolled
          ? "var(--bg-glass-heavy)"
          : "transparent",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid var(--border-subtle)"
          : "1px solid transparent",
        transition: "all 0.3s ease"
      }}
    >
      {/* Top soothing accent line on scroll */}
      {scrolled && (
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, #10b981 30%, #34d399 70%, transparent 100%)",
          opacity: 0.8
        }} />
      )}

      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>

        {/* ── BRAND ── */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
          style={{ display: "flex", alignItems: "center", gap: "11px", textDecoration: "none", flexShrink: 0 }}
        >
          <div style={{
            width: "42px", height: "42px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #10b981, #059669)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(16, 185, 129, 0.35)",
            flexShrink: 0
          }}>
            <Compass size={22} color="#ffffff" />
          </div>
          <div>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "1.4rem", fontWeight: "900",
              letterSpacing: "-0.04em", lineHeight: 1,
              color: "var(--text-primary)"
            }}>
              Yatra<span style={{
                background: "linear-gradient(90deg, #10b981, #34d399)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>AI</span>
            </span>
            <span style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.56rem", fontWeight: "700",
              color: "var(--text-muted)",
              letterSpacing: "0.14em",
              textTransform: "uppercase", lineHeight: 1.2
            }}>
              TRAVEL COMPANION
            </span>
          </div>
        </a>

        {/* ── NAV LINKS ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {[
            { label: "Home", id: "hero" },
            { label: "Destinations", id: "explorer" },
            { label: "Travel Tools", id: "tools" }
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none", border: "none",
                color: "var(--text-secondary)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem", fontWeight: "600",
                cursor: "pointer", padding: "7px 14px",
                borderRadius: "8px",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(16, 185, 129, 0.1)";
                e.currentTarget.style.color = "var(--accent-emerald)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── RIGHT ACTIONS ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {/* Location */}
          <button
            onClick={onSelectLocation}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid var(--border-subtle)",
              color: currentLocation ? "var(--accent-emerald)" : "var(--text-secondary)",
              padding: "7px 14px", borderRadius: "9999px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem", fontWeight: "600",
              cursor: "pointer", transition: "all 0.2s ease",
              maxWidth: "140px"
            }}
          >
            <MapPin size={13} color={currentLocation ? "var(--accent-emerald)" : "var(--text-secondary)"} />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {currentLocation ? currentLocation.nearestDestination.name : "Set Location"}
            </span>
          </button>

          {/* AI CTA */}
          <button
            onClick={onOpenAI}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "var(--gradient-primary)",
              border: "none",
              color: "#ffffff",
              padding: "8px 18px", borderRadius: "9999px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.82rem", fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 2px 10px rgba(16, 185, 129, 0.3)",
              transition: "all 0.22s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(16, 185, 129, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(16, 185, 129, 0.3)";
            }}
          >
            <Sparkles size={14} color="#ffffff" />
            Ask AI
          </button>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s ease"
            }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            title="Settings"
            style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s ease"
            }}
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};
