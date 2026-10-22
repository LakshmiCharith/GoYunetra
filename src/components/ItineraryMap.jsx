import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation, Layers, Maximize2 } from "lucide-react";
import { THEME_CATEGORIES } from "../services/itineraryValidator";

// Distinct day colors
const DAY_COLORS = [
  "#6366f1", // Day 1 Indigo
  "#a855f7", // Day 2 Purple
  "#38bdf8", // Day 3 Sky
  "#f59e0b", // Day 4 Amber
  "#f43f5e", // Day 5 Rose
  "#0ea5e9", // Day 6 Cyan
  "#ec4899"  // Day 7 Pink
];

export const ItineraryMap = ({
  days = [],
  selectedDayFilter = "all",
  onSelectDayFilter
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);
  const [internalDayFilter, setInternalDayFilter] = useState("all");

  const activeFilter = onSelectDayFilter ? selectedDayFilter : internalDayFilter;
  const setFilter = onSelectDayFilter || setInternalDayFilter;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Find default center from days activities if available
      let centerLat = 27.1751;
      let centerLon = 78.0421;

      for (const d of days) {
        if (d.activities && d.activities.length > 0) {
          const firstAct = d.activities[0];
          if (firstAct.lat && firstAct.lon) {
            centerLat = firstAct.lat;
            centerLon = firstAct.lon;
            break;
          }
        }
      }

      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLon],
        zoom: 13,
        zoomControl: false,
        attributionControl: false
      });

      // Add high-aesthetic dark/sleek map tiles (CartoDB Dark Matter or Voyager)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap contributors',
        subdomains: "abcd",
        maxZoom: 19
      }).addTo(map);

      // Add zoom control top right
      L.control.zoom({ position: "topright" }).addTo(map);

      const layerGroup = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
      layerGroupRef.current = layerGroup;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        layerGroupRef.current = null;
      }
    };
  }, []);

  // Update Markers & Polylines whenever days or activeFilter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    const allMarkers = [];
    const daysToRender = activeFilter === "all"
      ? days
      : days.filter((d) => String(d.day) === String(activeFilter));

    daysToRender.forEach((dayObj) => {
      const dayColor = DAY_COLORS[(dayObj.day - 1) % DAY_COLORS.length];
      const routeCoords = [];

      (dayObj.activities || []).forEach((act) => {
        if (!act.lat || !act.lon) return;

        const catMeta = THEME_CATEGORIES[act.category] || THEME_CATEGORIES.History;
        routeCoords.push([act.lat, act.lon]);

        // Create Custom HTML Pin Icon
        const iconHtml = `
          <div style="
            position: relative;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(15, 23, 42, 0.95);
            border: 2px solid ${dayColor};
            border-radius: 50%;
            box-shadow: 0 0 14px ${dayColor}88, 0 4px 10px rgba(0,0,0,0.5);
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <span style="font-size: 15px;">${catMeta.emoji}</span>
            <div style="
              position: absolute;
              bottom: -4px;
              right: -4px;
              background: ${dayColor};
              color: #ffffff;
              font-size: 10px;
              font-weight: 800;
              width: 17px;
              height: 17px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid #ffffff;
            ">
              D${dayObj.day}
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          className: "custom-leaflet-pin",
          html: iconHtml,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -20]
        });

        const popupContent = `
          <div style="font-family: system-ui, sans-serif; min-width: 210px; padding: 4px; color: #0f172a;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="
                background: ${dayColor};
                color: #ffffff;
                font-size: 11px;
                font-weight: 700;
                padding: 2px 8px;
                border-radius: 9999px;
              ">
                Day ${dayObj.day} • ${act.timeSlot || "Stop"}
              </span>
              <span style="font-size: 11px; font-weight: 700; color: #475569;">
                ${catMeta.emoji} ${act.category}
              </span>
            </div>
            <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 800; color: #0f172a;">
              ${act.title || act.locationName}
            </h4>
            <div style="font-size: 12px; color: #475569; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
              📍 <strong>${act.locationName}</strong>
            </div>
            <p style="margin: 0 0 6px 0; font-size: 11.5px; color: #334155; line-height: 1.35;">
              ${act.description || ""}
            </p>
            <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; color: #0f172a; border-top: 1px solid #e2e8f0; padding-top: 4px;">
              <span>Estimated Cost:</span>
              <span style="color: #4f46e5;">${act.cost || "Free"}</span>
            </div>
          </div>
        `;

        const marker = L.marker([act.lat, act.lon], { icon: customIcon })
          .bindPopup(popupContent, { maxWidth: 280, closeButton: false });

        marker.addTo(layerGroup);
        allMarkers.push(marker);
      });

      // Connect day route with smooth styled polyline
      if (routeCoords.length > 1) {
        L.polyline(routeCoords, {
          color: dayColor,
          weight: 4,
          opacity: 0.85,
          dashArray: "6, 8",
          lineCap: "round",
          lineJoin: "round"
        }).addTo(layerGroup);
      }
    });

    // Fit map bounds to view all markers
    if (allMarkers.length > 0) {
      const group = L.featureGroup(allMarkers);
      map.fitBounds(group.getBounds().pad(0.18), { maxZoom: 15, animate: true });
    }

    // Force redraw
    setTimeout(() => {
      if (map) map.invalidateSize();
    }, 150);
  }, [days, activeFilter]);

  const fitAllStops = () => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    const layers = layerGroup.getLayers().filter((l) => l instanceof L.Marker);
    if (layers.length > 0) {
      const group = L.featureGroup(layers);
      map.fitBounds(group.getBounds().pad(0.2), { maxZoom: 15, animate: true });
    }
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "1px solid var(--border-bright)",
        background: "var(--bg-secondary)",
        boxShadow: "var(--shadow-md)"
      }}
    >
      {/* Top Map Floating Toolbar */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          right: "12px",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
          pointerEvents: "none"
        }}
      >
        {/* Day Filters */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(15, 23, 42, 0.90)",
            backdropFilter: "blur(10px)",
            padding: "5px 8px",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--border-subtle)",
            pointerEvents: "auto",
            boxShadow: "0 4px 14px rgba(0,0,0,0.4)"
          }}
        >
          <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--text-secondary)", padding: "0 4px", display: "flex", alignItems: "center", gap: "4px" }}>
            <Layers size={13} color="var(--accent-primary)" />
            <span>Filter:</span>
          </span>

          <button
            onClick={() => setFilter("all")}
            style={{
              padding: "4px 10px",
              borderRadius: "var(--radius-full)",
              background: activeFilter === "all" ? "var(--gradient-primary)" : "transparent",
              border: "none",
              color: activeFilter === "all" ? "#ffffff" : "var(--text-secondary)",
              fontSize: "0.74rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all var(--transition-fast)"
            }}
          >
            All Days ({days.length})
          </button>

          {days.map((d) => {
            const isDayActive = String(activeFilter) === String(d.day);
            const dayColor = DAY_COLORS[(d.day - 1) % DAY_COLORS.length];
            return (
              <button
                key={d.day}
                onClick={() => setFilter(d.day)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                  background: isDayActive ? dayColor : "transparent",
                  border: isDayActive ? "none" : "1px solid rgba(255, 255, 255, 0.12)",
                  color: isDayActive ? "#ffffff" : "var(--text-secondary)",
                  fontSize: "0.74rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)"
                }}
              >
                Day {d.day}
              </button>
            );
          })}
        </div>

        {/* Fit Bounds Button */}
        <button
          onClick={fitAllStops}
          style={{
            background: "rgba(15, 23, 42, 0.90)",
            backdropFilter: "blur(10px)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-primary)",
            borderRadius: "var(--radius-full)",
            padding: "6px 14px",
            fontSize: "0.75rem",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            pointerEvents: "auto",
            boxShadow: "0 4px 14px rgba(0,0,0,0.4)"
          }}
          title="Zoom to fit all stops"
        >
          <Maximize2 size={13} color="var(--accent-primary)" />
          <span>Fit All Stops</span>
        </button>
      </div>

      {/* Map DOM Container */}
      <div
        ref={mapContainerRef}
        style={{
          width: "100%",
          height: "440px",
          background: "#1e293b"
        }}
      />

      {/* Bottom Category Legend Bar */}
      <div
        style={{
          padding: "10px 16px",
          background: "var(--bg-glass-heavy)",
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          fontSize: "0.78rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <span style={{ fontWeight: "700", color: "var(--text-secondary)" }}>Stops Legend:</span>
          {Object.keys(THEME_CATEGORIES).map((catKey) => {
            const cat = THEME_CATEGORIES[catKey];
            return (
              <span key={catKey} style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "var(--text-primary)" }}>
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </span>
            );
          })}
        </div>

        <div style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
          <Navigation size={13} color="var(--accent-primary)" />
          <span>Click any pin to inspect spot details & budget</span>
        </div>
      </div>
    </div>
  );
};
