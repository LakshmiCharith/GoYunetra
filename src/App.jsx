import React, { useState, useEffect } from "react";
import "./styles/global.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { LocationBanner } from "./components/LocationBanner";
import { DestinationExplorer } from "./components/DestinationExplorer";
import { DestinationDetailModal } from "./components/DestinationDetailModal";
import { TravelToolsSection } from "./components/TravelToolsSection";
import { SettingsModal } from "./components/SettingsModal";
import { AIChatbot } from "./components/AIChatbot";
import { Footer } from "./components/Footer";
import { Sparkles, X } from "lucide-react";

export function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [initialSearchQuery, setInitialSearchQuery] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("THEME") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("THEME", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleHeroSearch = (query) => {
    setInitialSearchQuery(query);
    const explorerElem = document.getElementById("explorer");
    if (explorerElem) {
      explorerElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToExplorer = () => {
    const explorerElem = document.getElementById("explorer");
    if (explorerElem) {
      explorerElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
      {/* Top Navbar */}
      <Navbar
        onOpenSettings={() => setSettingsOpen(true)}
        onSelectLocation={() => {
          const locBanner = document.getElementById("location-section");
          if (locBanner) locBanner.scrollIntoView({ behavior: "smooth" });
        }}
        currentLocation={currentLocation}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenAI={() => setAiDrawerOpen(true)}
      />

      {/* Cinematic Hero with Ambient Video Switcher */}
      <Hero
        onSearch={handleHeroSearch}
        onExploreClick={handleScrollToExplorer}
        onOpenAI={() => setAiDrawerOpen(true)}
      />

      {/* Geolocation Distance Banner */}
      <div id="location-section">
        <LocationBanner
          currentLocation={currentLocation}
          onLocationDetected={setCurrentLocation}
          onSelectDestination={setSelectedDestination}
        />
      </div>

      {/* 30+ World & India Destination Explorer */}
      <DestinationExplorer
        onSelectDestination={setSelectedDestination}
        initialSearch={initialSearchQuery}
      />

      {/* Interactive Travel Tools Suite */}
      <TravelToolsSection />

      {/* Footer */}
      <Footer />

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <DestinationDetailModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Floating AI Assistant Drawer/Modal */}
      {aiDrawerOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(5,6,15,0.88)",
            backdropFilter: "blur(20px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px"
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setAiDrawerOpen(false); }}
        >
          <div
            className="animate-fade-in"
            style={{
              width: "100%",
              maxWidth: "580px",
              position: "relative"
            }}
          >
            {/* Close Button */}
              <button
              onClick={() => setAiDrawerOpen(false)}
              style={{
                position: "absolute",
                top: "-18px",
                right: "-18px",
                zIndex: 10,
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "var(--gradient-primary)",
                border: "none",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(99, 102, 241,0.4)"
              }}
            >
              <X size={17} />
            </button>

            <AIChatbot destinationName={selectedDestination ? selectedDestination.name : "India & World Wonders"} />
          </div>
        </div>
      )}

      {/* Persistent Floating AI Trigger Button (Bottom-Right) */}
      {!aiDrawerOpen && (
        <button
          onClick={() => setAiDrawerOpen(true)}
          title="Open YatraAI Universal Assistant"
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            zIndex: 150,
            background: "var(--gradient-primary)",
            border: "none",
            color: "#ffffff",
            padding: "13px 26px",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 6px 24px rgba(0,0,0,0.35), 0 0 20px rgba(99, 102, 241,0.4)",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: "800",
            fontSize: "0.9rem",
            transition: "transform 0.22s ease, box-shadow 0.22s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.4), 0 0 28px rgba(99, 102, 241,0.55)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.35), 0 0 20px rgba(99, 102, 241,0.4)";
          }}
        >
          <Sparkles size={18} color="#ffffff" />
          <span>Ask YatraAI</span>
        </button>
      )}
    </div>
  );
}

export default App;
