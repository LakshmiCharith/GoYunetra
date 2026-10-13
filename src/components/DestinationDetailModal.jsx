import React, { useState, useEffect } from "react";
import { X, Star, MapPin, Calendar, ShieldCheck, DollarSign, Cloud, Compass, Sparkles, Image as ImageIcon } from "lucide-react";
import { FamousPlacesGrid } from "./FamousPlacesGrid";
import { WeatherCard } from "./WeatherCard";
import { AIChatbot } from "./AIChatbot";
import { ItineraryPlanner } from "./ItineraryPlanner";
import { fetchImagesForDestination } from "../services/imageService";

export const DestinationDetailModal = ({ destination, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (destination) {
      fetchImagesForDestination(destination.name, 4).then(setGalleryImages);
    }
  }, [destination]);

  if (!destination) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(11, 15, 25, 0.85)",
        backdropFilter: "blur(20px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        overflowY: "auto"
      }}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "1080px",
          maxHeight: "90vh",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: "var(--shadow-lg)",
          border: "1px solid var(--border-subtle)"
        }}
      >
        {/* Top Header Banner */}
        <div style={{ position: "relative", height: "300px", flexShrink: 0 }}>
          <img
            src={destination.coverImage}
            alt={destination.name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80";
            }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 80%)" }} />

          {/* Close Button */}
          <button
            onClick={onClose}
            title="Close Modal (ESC)"
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(17, 24, 39, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <X size={20} />
          </button>

          {/* Title Header Info */}
          <div style={{ position: "absolute", bottom: "24px", left: "32px", right: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span className="tag-badge tag-cyan">{destination.category}</span>
              <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", fontWeight: "600" }}>
                {destination.country} • {destination.continent}
              </span>
            </div>

            <h2 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#ffffff", lineHeight: 1.1 }}>
              {destination.name}
            </h2>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "12px 32px",
            background: "var(--bg-secondary)",
            borderBottom: "1px solid var(--border-subtle)",
            overflowX: "auto"
          }}
        >
          {[
            { id: "overview", label: "Overview", icon: Compass },
            { id: "places", label: "Famous Places", icon: MapPin },
            { id: "weather", label: "Live Weather", icon: Cloud },
            { id: "ai", label: "AI Assistant", icon: Sparkles },
            { id: "itinerary", label: "Itinerary Planner", icon: Calendar }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "var(--radius-full)",
                  background: active ? "var(--gradient-primary)" : "transparent",
                  border: active ? "none" : "1px solid transparent",
                  color: active ? "#ffffff" : "var(--text-secondary)",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: "32px", overflowY: "auto", flex: 1 }}>
          {activeTab === "overview" && (
            <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--text-primary)" }}>
                {destination.description}
              </p>

              {/* Key Quick Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                <div className="glass-card" style={{ padding: "16px" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "4px" }}>Average Daily Budget</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--accent-primary)" }}>{destination.avgDailyBudget}</div>
                </div>

                <div className="glass-card" style={{ padding: "16px" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "4px" }}>Best Visiting Season</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--accent-amber)" }}>{destination.bestMonths}</div>
                </div>

                <div className="glass-card" style={{ padding: "16px" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "4px" }}>Safety Score</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--accent-primary)" }}>{destination.safetyScore} / 10</div>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "12px", color: "var(--text-primary)" }}>
                  Destination Highlights:
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "10px" }}>
                  {destination.highlights.map((h, i) => (
                    <div key={i} style={{ background: "var(--bg-glass)", padding: "12px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", fontSize: "0.88rem" }}>
                      ✨ {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Unsplash Image Gallery */}
              {galleryImages.length > 0 && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                    <ImageIcon size={18} color="var(--accent-purple)" />
                    <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>
                      Dynamic Photo Gallery (Unsplash API)
                    </h4>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                    {galleryImages.map((img, i) => (
                      <div key={i} style={{ height: "140px", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                        <img src={img.url} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "places" && (
            <FamousPlacesGrid places={destination.famousPlaces} destinationName={destination.name} />
          )}

          {activeTab === "weather" && (
            <div className="animate-fade-in">
              <WeatherCard lat={destination.lat} lon={destination.lon} cityName={destination.name} />
            </div>
          )}

          {activeTab === "ai" && (
            <div className="animate-fade-in">
              <AIChatbot destinationName={destination.name} />
            </div>
          )}

          {activeTab === "itinerary" && (
            <div className="animate-fade-in">
              <ItineraryPlanner destinationName={destination.name} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
