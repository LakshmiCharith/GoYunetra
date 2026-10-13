import React, { useState, useEffect } from "react";
import { X, Key, ShieldCheck, Save, CheckCircle2 } from "lucide-react";

export const SettingsModal = ({ isOpen, onClose }) => {
  const [openWeatherKey, setOpenWeatherKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [unsplashKey, setUnsplashKey] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOpenWeatherKey(localStorage.getItem("OPENWEATHER_API_KEY") || "");
      setGeminiKey(localStorage.getItem("GEMINI_API_KEY") || "");
      setUnsplashKey(localStorage.getItem("UNSPLASH_ACCESS_KEY") || "");
      setSavedSuccess(false);
    }
  }, [isOpen]);

  const handleSave = (e) => {
    e.preventDefault();
    if (openWeatherKey.trim()) {
      localStorage.setItem("OPENWEATHER_API_KEY", openWeatherKey.trim());
    } else {
      localStorage.removeItem("OPENWEATHER_API_KEY");
    }

    if (geminiKey.trim()) {
      localStorage.setItem("GEMINI_API_KEY", geminiKey.trim());
    } else {
      localStorage.removeItem("GEMINI_API_KEY");
    }

    if (unsplashKey.trim()) {
      localStorage.setItem("UNSPLASH_ACCESS_KEY", unsplashKey.trim());
    } else {
      localStorage.removeItem("UNSPLASH_ACCESS_KEY");
    }

    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(11, 15, 25, 0.85)",
        backdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "520px",
          borderRadius: "var(--radius-lg)",
          padding: "28px",
          position: "relative",
          boxShadow: "var(--shadow-lg)"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer"
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <Key size={22} color="var(--accent-primary)" />
          <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--text-primary)" }}>
            API Configuration & Keys
          </h3>
        </div>

        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
          Provide your own API keys to enable live weather feeds, real-time Gemini AI chat, and high-res Unsplash search. (All keys remain local to your browser session).
        </p>

        {savedSuccess && (
          <div
            style={{
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid var(--accent-primary)",
              color: "var(--accent-primary)",
              padding: "10px 14px",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.85rem",
              fontWeight: "600",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <CheckCircle2 size={16} />
            <span>Settings saved successfully! Updating application...</span>
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "var(--text-primary)", marginBottom: "6px" }}>
              OpenWeather API Key
            </label>
            <input
              type="password"
              placeholder="e.g. 5a12b3c4d5..."
              value={openWeatherKey}
              onChange={(e) => setOpenWeatherKey(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-input)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                fontSize: "0.85rem",
                outline: "none"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "var(--text-primary)", marginBottom: "6px" }}>
              Google Gemini API Key
            </label>
            <input
              type="password"
              placeholder="e.g. AIzaSyB..."
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-input)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                fontSize: "0.85rem",
                outline: "none"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "var(--text-primary)", marginBottom: "6px" }}>
              Unsplash Access Key
            </label>
            <input
              type="password"
              placeholder="e.g. client_id_string..."
              value={unsplashKey}
              onChange={(e) => setUnsplashKey(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-input)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                fontSize: "0.85rem",
                outline: "none"
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
            <ShieldCheck size={14} color="var(--accent-primary)" />
            <span>Built-in mock fallbacks ensure full functionality even without keys.</span>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "12px", justifyContent: "center" }}>
            <Save size={16} />
            <span>Save Settings</span>
          </button>
        </form>
      </div>
    </div>
  );
};
