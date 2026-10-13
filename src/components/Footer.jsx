import React from "react";
import { Compass, Heart, Check, Globe } from "lucide-react";

export const Footer = () => {
  const year = new Date().getFullYear();

  const features = [
    "30+ Indian & Global Destinations",
    "Geolocation & Live Weather API",
    "Universal AI Travel Assistant",
    "Day-by-Day Itinerary Planner",
    "Smart Budget & Currency Tool",
    "Ambient Video Backgrounds"
  ];

  const techStack = ["React 18", "Vite", "Gemini AI", "OpenWeather", "Unsplash", "Eye-Care Theme"];

  return (
    <footer style={{ position: "relative", background: "var(--bg-secondary)", borderTop: "none", marginTop: "0", padding: "0" }}>
      {/* Top soothing accent line */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #6366f1 30%, #8b5cf6 70%, transparent 100%)" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, padding: "56px 28px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "40px", marginBottom: "48px" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg, #6366f1, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)" }}>
                <Compass size={20} color="#ffffff" />
              </div>
              <div>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.3rem", fontWeight: "900", color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                  Yatra<span style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span>
                </span>
                <span style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  TRAVEL COMPANION
                </span>
              </div>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: "280px" }}>
              A peaceful, AI-powered travel discovery platform crafted to explore the wonders of India and the world without visual fatigue.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", fontWeight: "700", color: "var(--accent-primary)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "18px" }}>
              FEATURES //
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
              {features.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                  <Check size={13} color="var(--accent-primary)" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", fontWeight: "700", color: "var(--accent-teal)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "18px" }}>
              BUILT WITH //
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "4px 12px", borderRadius: "9999px",
                    background: "rgba(99, 102, 241, 0.08)",
                    border: "1px solid var(--border-subtle)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.66rem", fontWeight: "700",
                    color: "var(--accent-primary)",
                    letterSpacing: "0.04em"
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--border-subtle)", paddingTop: "22px",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px"
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.67rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
            © {year} YATRAAI // INDIA & WORLD TRAVEL APPLICATION
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.67rem", color: "var(--text-muted)" }}>
            <span>CRAFTED WITH</span>
            <Heart size={12} color="#fb7185" fill="#fb7185" />
            <span>IN REACT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
