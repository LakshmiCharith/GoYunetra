import React, { useState } from "react";
import { MapPin, Navigation, AlertCircle, Search, Check, RefreshCw } from "lucide-react";
import { getUserLocation } from "../services/locationService";
import { DESTINATIONS } from "../data/destinations";

export const LocationBanner = ({ currentLocation, onLocationDetected, onSelectDestination }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [manualSearchOpen, setManualSearchOpen] = useState(false);

  const handleDetectLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const locationData = await getUserLocation();
      onLocationDetected(locationData);
    } catch (err) {
      console.warn("Geolocation permission error:", err);
      setErrorMsg("Location access denied or unavailable. Choose a location manually below!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ margin: "24px auto" }}>
      <div
        className="glass-card"
        style={{
          padding: "20px 24px",
          borderRadius: "var(--radius-md)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          background: "linear-gradient(90deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)",
          border: "1px solid var(--border-subtle)"
        }}
      >
        {/* Left Side Info */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: "260px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(99, 102, 241, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent-primary)",
              flexShrink: 0
            }}
          >
            <Navigation size={24} />
          </div>

          <div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "4px" }}>
              {currentLocation ? `Nearest Destination: ${currentLocation.nearestDestination.name}` : "Enable Location Awareness"}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              {currentLocation
                ? `Approx. ${currentLocation.distanceKm} km away from your coordinates (${currentLocation.lat.toFixed(2)}°, ${currentLocation.lon.toFixed(2)}°)`
                : "Share your location for customized destination recommendations & live weather forecasts."}
            </p>
            {errorMsg && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-rose)", fontSize: "0.8rem", marginTop: "6px" }}>
                <AlertCircle size={14} />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={handleDetectLocation}
            disabled={loading}
            className="btn-primary"
            style={{ padding: "10px 20px", fontSize: "0.85rem" }}
          >
            {loading ? <RefreshCw size={16} className="animate-spin" /> : <MapPin size={16} />}
            <span>{loading ? "Detecting..." : currentLocation ? "Refresh Location" : "Use My Location"}</span>
          </button>

          <button
            onClick={() => setManualSearchOpen(!manualSearchOpen)}
            className="btn-secondary"
            style={{ padding: "10px 20px", fontSize: "0.85rem" }}
          >
            <Search size={16} />
            <span>Select Manually</span>
          </button>
        </div>
      </div>

      {/* Manual Select Dropdown Drawer */}
      {manualSearchOpen && (
        <div
          className="glass-card animate-fade-in"
          style={{
            marginTop: "12px",
            padding: "20px",
            background: "var(--bg-glass-heavy)"
          }}
        >
          <h4 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "12px", color: "var(--text-primary)" }}>
            Choose Featured City Location:
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px" }}>
            {DESTINATIONS.map((dest) => (
              <button
                key={dest.id}
                onClick={() => {
                  onSelectDestination(dest);
                  setManualSearchOpen(false);
                }}
                style={{
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transition: "all var(--transition-fast)"
                }}
              >
                <span>{dest.name}, {dest.country}</span>
                {currentLocation?.nearestDestination.id === dest.id && <Check size={16} color="var(--accent-cyan)" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
