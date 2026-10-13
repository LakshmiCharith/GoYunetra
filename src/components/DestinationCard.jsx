import React, { useState, useEffect } from "react";
import { Star, MapPin, Thermometer, ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import { fetchWeather } from "../services/weatherService";

export const DestinationCard = ({ destination, onClick }) => {
  const [weather, setWeather] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetchWeather(destination.lat, destination.lon, destination.name).then((res) => {
      if (isMounted) setWeather(res);
    });
    return () => { isMounted = false; };
  }, [destination]);

  const fallbackImages = {
    "Spiritual & Heritage": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    "Mountain & Hill Stations": "https://images.unsplash.com/photo-1439853949212-36089c04ab8d?auto=format&fit=crop&w=800&q=80",
    "Beaches & Coastal": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "Nature & Adventure": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    "Romantic": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
    "Metropolitan": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",
    "default": "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=800&q=80"
  };

  const imageSrc = imgError
    ? (fallbackImages[destination.category] || fallbackImages["default"])
    : destination.coverImage;

  const locationLine = destination.country === destination.continent
    ? destination.country
    : `${destination.country} • ${destination.continent}`;

  // Nature-inspired calming category accents
  const accentMap = {
    "Spiritual & Heritage": "#f59e0b",
    "Mountain & Hill Stations": "#10b981",
    "Beaches & Coastal": "#0ea5e9",
    "Nature & Adventure": "#34d399",
    "Romantic": "#fb7185",
    "Metropolitan": "#14b8a6"
  };
  const cardAccent = accentMap[destination.category] || "#10b981";

  return (
    <div
      onClick={() => onClick(destination)}
      style={{
        display: "flex", flexDirection: "column", height: "100%",
        background: "var(--bg-card)",
        backdropFilter: "blur(20px)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        boxShadow: "var(--shadow-sm)",
        transition: "transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease"
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        card.style.transform = "translateY(-4px)";
        card.style.borderColor = `${cardAccent}88`;
        card.style.boxShadow = `0 16px 36px rgba(0,0,0,0.35), 0 0 20px ${cardAccent}25`;
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget;
        card.style.transform = "translateY(0)";
        card.style.borderColor = "var(--border-subtle)";
        card.style.boxShadow = "var(--shadow-sm)";
      }}
    >
      {/* Top accent stripe */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${cardAccent}, transparent)`, zIndex: 2, opacity: 0.85 }} />

      {/* ── IMAGE ── */}
      <div style={{ position: "relative", height: "215px", overflow: "hidden", flexShrink: 0 }}>
        <img
          src={imageSrc}
          alt={destination.name}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(11,19,17,0.85) 0%, rgba(11,19,17,0.1) 55%, transparent 100%)` }} />

        {/* Category tag */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          background: "rgba(11, 19, 17, 0.85)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${cardAccent}66`,
          padding: "4px 10px", borderRadius: "9999px",
          display: "flex", alignItems: "center", gap: "6px"
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: cardAccent }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", fontWeight: "700", color: "#f0fdf4", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {destination.category}
          </span>
        </div>

        {/* Star rating */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          background: "rgba(11, 19, 17, 0.85)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(245,158,11,0.4)",
          padding: "4px 10px", borderRadius: "9999px",
          display: "flex", alignItems: "center", gap: "4px",
          fontSize: "0.8rem", fontWeight: "700", color: "#fbbf24",
          fontFamily: "'JetBrains Mono', monospace"
        }}>
          <Star size={12} fill="#fbbf24" color="#fbbf24" />
          {destination.rating}
        </div>

        {/* Weather */}
        {weather && (
          <div style={{
            position: "absolute", bottom: "10px", right: "12px",
            background: "rgba(11, 19, 17, 0.85)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "3px 10px", borderRadius: "9999px",
            display: "flex", alignItems: "center", gap: "5px",
            fontSize: "0.73rem", fontWeight: "600", color: "#f0fdf4",
            fontFamily: "'DM Sans', sans-serif"
          }}>
            <Thermometer size={11} color="#fbbf24" />
            {weather.temp}°C {weather.condition}
          </div>
        )}
      </div>

      {/* ── CARD BODY ── */}
      <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px" }}>
            <MapPin size={12} color={cardAccent} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem", color: "var(--text-muted)", letterSpacing: "0.04em" }}>{locationLine}</span>
          </div>

          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.2rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "8px", lineHeight: 1.2 }}>
            {destination.name}
          </h3>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {destination.tagline}
          </p>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-subtle)", paddingTop: "12px", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem", color: "var(--text-muted)", letterSpacing: "0.04em" }}>
              <Calendar size={11} /> {destination.bestMonths}
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.76rem", fontWeight: "700", color: "var(--accent-emerald)" }}>
              {destination.priceLevel}
            </span>
          </div>

          <button
            style={{
              width: "100%", padding: "10px",
              borderRadius: "10px",
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
              fontFamily: "'DM Sans', sans-serif", fontWeight: "700", fontSize: "0.83rem",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              cursor: "pointer", transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--gradient-primary)";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(16, 185, 129, 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(16, 185, 129, 0.08)";
              e.currentTarget.style.borderColor = "var(--border-subtle)";
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Sparkles size={14} /> Explore Details <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
