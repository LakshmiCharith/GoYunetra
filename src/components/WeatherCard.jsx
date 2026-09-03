import React, { useState, useEffect } from "react";
import { Cloud, Droplets, Wind, Sun, Thermometer, ShieldAlert, RefreshCw } from "lucide-react";
import { fetchWeather } from "../services/weatherService";

export const WeatherCard = ({ lat, lon, cityName }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadWeather = async () => {
    setLoading(true);
    const data = await fetchWeather(lat, lon, cityName);
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    loadWeather();
  }, [lat, lon, cityName]);

  if (loading) {
    return (
      <div className="glass-card" style={{ padding: "30px", textAlign: "center" }}>
        <RefreshCw size={24} className="animate-spin" color="var(--accent-cyan)" />
        <p style={{ marginTop: "12px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Loading real-time weather data for {cityName}...
        </p>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div
      className="glass-card"
      style={{
        padding: "24px",
        borderRadius: "var(--radius-md)",
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)"
      }}
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "var(--text-primary)" }}>
            Current Weather in {weather.city}
          </h3>
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "capitalize" }}>
            {weather.description}
          </span>
        </div>

        {/* Source Badge */}
        <span
          className={`tag-badge ${weather.isMock ? "tag-amber" : "tag-cyan"}`}
          title={weather.isMock ? "Simulated weather engine. Set OpenWeather API Key in settings for live feed!" : "Live OpenWeather API"}
        >
          {weather.isMock ? "Simulated Weather" : "Live Weather API"}
        </span>
      </div>

      {/* Main Temperature Display */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
          <span style={{ fontSize: "3rem", fontWeight: "800", color: "var(--text-primary)", lineHeight: 1 }}>
            {weather.temp}°
          </span>
          <span style={{ fontSize: "1.2rem", color: "var(--accent-cyan)", fontWeight: "700" }}>C</span>
        </div>

        <div style={{ borderLeft: "1px solid var(--border-subtle)", paddingLeft: "16px" }}>
          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Feels like: <strong style={{ color: "var(--text-primary)" }}>{weather.feelsLike}°C</strong>
          </div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "2px" }}>
            High: <strong style={{ color: "var(--accent-rose)" }}>{weather.high}°C</strong> • Low: <strong style={{ color: "var(--accent-cyan)" }}>{weather.low}°C</strong>
          </div>
        </div>
      </div>

      {/* Grid Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "12px" }}>
        <div style={{ background: "var(--bg-glass)", padding: "12px", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", gap: "10px" }}>
          <Droplets size={20} color="var(--accent-cyan)" />
          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Humidity</div>
            <div style={{ fontSize: "0.95rem", fontWeight: "700" }}>{weather.humidity}%</div>
          </div>
        </div>

        <div style={{ background: "var(--bg-glass)", padding: "12px", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", gap: "10px" }}>
          <Wind size={20} color="var(--accent-purple)" />
          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Wind Speed</div>
            <div style={{ fontSize: "0.95rem", fontWeight: "700" }}>{weather.windSpeed} km/h</div>
          </div>
        </div>

        <div style={{ background: "var(--bg-glass)", padding: "12px", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", gap: "10px" }}>
          <Sun size={20} color="var(--accent-amber)" />
          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>UV Index</div>
            <div style={{ fontSize: "0.95rem", fontWeight: "700" }}>Moderate (5)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
