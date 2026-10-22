import React, { useState } from "react";
import { Search, Sparkles, Volume2, VolumeX, ArrowRight, Globe, Film } from "lucide-react";

export const Hero = ({ onSearch, onExploreClick, onOpenAI }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const videoChannels = [
    { id: "coastal", label: "Coastal", url: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-the-coast-of-a-tropical-island-41480-large.mp4" },
    { id: "mountains", label: "Mountains", url: "https://assets.mixkit.co/videos/preview/mixkit-mountains-under-clouds-seen-from-above-4932-large.mp4" },
    { id: "city", label: "City", url: "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-time-lapse-1665-large.mp4" },
    { id: "nature", label: "Nature", url: "https://assets.mixkit.co/videos/preview/mixkit-green-trees-in-a-forest-4553-large.mp4" }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) onSearch(searchTerm);
  };

  const handleTagClick = (tag) => { setSearchTerm(tag); onSearch(tag); };

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

      {/* ── VIDEO BACKGROUND ── */}
      <video
        key={videoChannels[activeVideoIndex].url}
        autoPlay loop muted={isMuted} playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        src={videoChannels[activeVideoIndex].url}
      />

      {/* ── SOOTHING GRADIENT OVERLAYS (NO EYE STRAIN) ── */}
      <div style={{ position: "absolute", inset: 0, background: "var(--gradient-dark-overlay)", zIndex: 1 }} />
      {/* Soft forest emerald subtle glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, rgba(99, 102, 241,0.12) 0%, transparent 65%)", zIndex: 1 }} />

      {/* ── HERO CONTENT ── */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "140px 28px 120px", textAlign: "center" }}>

        {/* Main headline */}
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)", fontWeight: "900", lineHeight: 1.08, color: "var(--text-primary)", marginBottom: "20px", letterSpacing: "-0.04em" }}>
          Discover 30+ Extraordinary<br />
          <span style={{ background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 40%, #ec4899 75%, #fbbf24 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Wonders Across India &amp; the World
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 1.8vw, 1.18rem)", color: "var(--text-secondary)", maxWidth: "680px", margin: "0 auto 42px", lineHeight: 1.7, fontWeight: "400" }}>
          Cinematic ambient video backgrounds, live weather, AI travel planning and currency conversion — designed for serene, effortless discovery.
        </p>

        {/* ── SEARCH BAR ── */}
        <form onSubmit={handleSearchSubmit} style={{ maxWidth: "680px", margin: "0 auto 20px" }}>
          <div style={{
            display: "flex", alignItems: "center",
            background: "var(--bg-glass-heavy)",
            backdropFilter: "blur(20px)",
            border: "1.5px solid var(--border-subtle)",
            borderRadius: "9999px",
            padding: "6px 6px 6px 24px",
            boxShadow: "var(--shadow-md)",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease"
          }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent-primary)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(99, 102, 241, 0.25)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
          >
            <Search size={20} color="var(--accent-primary)" style={{ flexShrink: 0, marginRight: "12px" }} />
            <input
              type="text"
              placeholder="Search Jaipur, Taj Mahal, Kerala, Swiss Alps, Paris..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: "500" }}
            />
            <button type="submit" style={{
              background: "var(--gradient-primary)",
              color: "#ffffff",
              fontFamily: "'DM Sans', sans-serif", fontWeight: "700", fontSize: "0.88rem",
              padding: "12px 22px", borderRadius: "9999px", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap",
              boxShadow: "0 2px 10px rgba(99, 102, 241, 0.35)",
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Search <ArrowRight size={15} />
            </button>
          </div>
        </form>

        {/* Quick tags */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px", marginBottom: "48px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "var(--text-muted)", alignSelf: "center", letterSpacing: "0.06em" }}>POPULAR //</span>
          {["Taj Mahal", "Jaipur", "Kerala", "Leh Ladakh", "Swiss Alps", "Maldives", "Paris", "Goa", "Tokyo"].map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              style={{
                padding: "5px 14px", borderRadius: "9999px",
                background: "rgba(99, 102, 241, 0.08)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-secondary)",
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: "600",
                cursor: "pointer", transition: "all 0.18s ease"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99, 102, 241, 0.18)"; e.currentTarget.style.borderColor = "var(--accent-primary)"; e.currentTarget.style.color = "var(--accent-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(99, 102, 241, 0.08)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "64px" }}>
          <button
            onClick={onExploreClick}
            style={{
              background: "var(--gradient-primary)",
              color: "#ffffff",
              fontFamily: "'DM Sans', sans-serif", fontWeight: "800", fontSize: "0.95rem",
              padding: "15px 32px", borderRadius: "9999px", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "8px",
              boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)",
              transition: "all 0.22s ease"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(99, 102, 241, 0.55)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(99, 102, 241, 0.4)"; }}
          >
            <Globe size={18} /> Explore 30+ Destinations
          </button>
          <button
            onClick={onOpenAI}
            style={{
              background: "rgba(99, 102, 241, 0.1)",
              backdropFilter: "blur(14px)",
              color: "var(--accent-primary)",
              fontFamily: "'DM Sans', sans-serif", fontWeight: "700", fontSize: "0.95rem",
              padding: "15px 32px", borderRadius: "9999px",
              border: "1.5px solid var(--border-bright)",
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: "8px",
              transition: "all 0.22s ease"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99, 102, 241, 0.2)"; e.currentTarget.style.borderColor = "var(--accent-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(99, 102, 241, 0.1)"; e.currentTarget.style.borderColor = "var(--border-bright)"; }}
          >
            <Sparkles size={18} color="var(--accent-primary)" /> Ask GoYunetra
          </button>
        </div>

        {/* ── STATS GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", maxWidth: "760px", margin: "0 auto" }}>
          {[
            { number: "15+", label: "Indian Wonders", accent: "#f59e0b" },
            { number: "15+", label: "Global Icons", accent: "#6366f1" },
            { number: "30+", label: "Destinations", accent: "#8b5cf6" },
            { number: "24/7", label: "AI Answers", accent: "#f43f5e" }
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "var(--bg-card)",
                backdropFilter: "blur(20px)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "16px",
                padding: "20px 12px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)` }} />
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.9rem", fontWeight: "900", color: stat.accent, lineHeight: 1, marginBottom: "6px" }}>
                {stat.number}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── VIDEO CHANNEL BAR ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "11px 32px",
        background: "var(--bg-glass-heavy)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid var(--border-subtle)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Film size={14} color="var(--accent-primary)" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.67rem", color: "var(--text-secondary)", letterSpacing: "0.12em", fontWeight: "700" }}>
            ATMOSPHERE //
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            {videoChannels.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => setActiveVideoIndex(idx)}
                style={{
                  padding: "5px 16px", borderRadius: "9999px",
                  background: activeVideoIndex === idx
                    ? "var(--gradient-primary)"
                    : "rgba(99, 102, 241, 0.08)",
                  border: activeVideoIndex === idx ? "none" : "1px solid var(--border-subtle)",
                  color: activeVideoIndex === idx ? "#ffffff" : "var(--text-secondary)",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.76rem", fontWeight: "700",
                  cursor: "pointer", transition: "all 0.2s ease",
                  boxShadow: activeVideoIndex === idx ? "0 2px 10px rgba(99, 102, 241, 0.35)" : "none"
                }}
              >
                {ch.label}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsMuted(!isMuted)}
          style={{
            width: "34px", height: "34px", borderRadius: "8px",
            background: "rgba(99, 102, 241, 0.08)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-secondary)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer"
          }}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>
    </section>
  );
};
