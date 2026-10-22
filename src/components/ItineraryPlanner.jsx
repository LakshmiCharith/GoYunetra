import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Download,
  RefreshCw,
  CheckSquare,
  MapPin,
  Map as MapIcon,
  List,
  Columns2,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  Utensils,
  Trees,
  Landmark,
  Flame,
  ArrowRight,
  Compass
} from "lucide-react";
import confetti from "canvas-confetti";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { generateItineraryWithGemini } from "../services/geminiService";
import { THEME_CATEGORIES } from "../services/itineraryValidator";
import { ItineraryMap } from "./ItineraryMap";

export const ItineraryPlanner = ({ destinationName = "Destination", destination = null }) => {
  // Input parameters
  const [days, setDays] = useState(3);
  const [pace, setPace] = useState("balanced");
  const [budget, setBudget] = useState("comfort");
  const [travelers, setTravelers] = useState(2);
  const [selectedThemes, setSelectedThemes] = useState(["Food", "Nature", "History", "Adventure"]);

  // Itinerary state
  const [itinerary, setItinerary] = useState(null);
  const [originalItinerary, setOriginalItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  // View & Map controls
  const [viewMode, setViewMode] = useState("split"); // "timeline" | "map" | "split"
  const [selectedMapDay, setSelectedMapDay] = useState("all");

  // Manual Editing state
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [addingToDay, setAddingToDay] = useState(null);
  const [newActivityData, setNewActivityData] = useState({
    title: "",
    locationName: "",
    category: "History",
    timeSlot: "Morning",
    cost: "₹250 / $3",
    description: ""
  });

  // Coordinates from destination object or fallback
  const destCoords = destination
    ? { lat: destination.lat || 27.1751, lon: destination.lon || 78.0421 }
    : { lat: 27.1751, lon: 78.0421 };

  // Generate on first mount if not yet loaded
  useEffect(() => {
    let isMounted = true;
    const initialLoad = async () => {
      setLoading(true);
      try {
        const res = await generateItineraryWithGemini(
          destinationName,
          3,
          "balanced",
          "comfort",
          ["Food", "Nature", "History", "Adventure"],
          destCoords,
          travelers
        );
        if (isMounted) {
          setItinerary(res);
          setOriginalItinerary(JSON.parse(JSON.stringify(res)));
        }
      } catch (err) {
        console.error("Initial itinerary load error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initialLoad();
    return () => {
      isMounted = false;
    };
  }, [destinationName]);

  const toggleTheme = (themeKey) => {
    setSelectedThemes((prev) => {
      if (prev.includes(themeKey)) {
        if (prev.length === 1) return prev; // keep at least 1 theme active
        return prev.filter((t) => t !== themeKey);
      } else {
        return [...prev, themeKey];
      }
    });
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateItineraryWithGemini(
        destinationName,
        days,
        pace,
        budget,
        selectedThemes,
        destCoords,
        travelers
      );
      setItinerary(res);
      setOriginalItinerary(JSON.parse(JSON.stringify(res)));
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err) {
      console.error("Itinerary generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Manual Editing Handlers
  const startEditing = (act) => {
    setEditingActivityId(act.id);
    setEditFormData({
      title: act.title,
      locationName: act.locationName,
      category: act.category,
      timeSlot: act.timeSlot,
      cost: act.cost,
      description: act.description
    });
  };

  const cancelEditing = () => {
    setEditingActivityId(null);
    setEditFormData({});
  };

  const saveEditing = (dayNumber, activityId) => {
    if (!itinerary) return;

    const updatedDays = itinerary.days.map((dayObj) => {
      if (dayObj.day === dayNumber) {
        const updatedActivities = dayObj.activities.map((act) => {
          if (act.id === activityId) {
            return {
              ...act,
              title: editFormData.title || act.title,
              locationName: editFormData.locationName || act.locationName,
              category: editFormData.category || act.category,
              timeSlot: editFormData.timeSlot || act.timeSlot,
              cost: editFormData.cost || act.cost,
              description: editFormData.description || act.description
            };
          }
          return act;
        });

        return {
          ...dayObj,
          locations: updatedActivities.map((a) => a.locationName),
          activities: updatedActivities
        };
      }
      return dayObj;
    });

    setItinerary({ ...itinerary, days: updatedDays });
    setEditingActivityId(null);
    setEditFormData({});
  };

  const deleteActivity = (dayNumber, activityId) => {
    if (!itinerary) return;
    const updatedDays = itinerary.days.map((dayObj) => {
      if (dayObj.day === dayNumber) {
        const remainingActs = dayObj.activities.filter((a) => a.id !== activityId);
        return {
          ...dayObj,
          locations: remainingActs.map((a) => a.locationName),
          activities: remainingActs
        };
      }
      return dayObj;
    });

    setItinerary({ ...itinerary, days: updatedDays });
  };

  const handleAddNewActivity = (dayNumber) => {
    if (!itinerary || !newActivityData.title.trim()) return;

    const updatedDays = itinerary.days.map((dayObj) => {
      if (dayObj.day === dayNumber) {
        // slight deterministic offset for map pin
        const angle = dayObj.activities.length * 1.5;
        const newAct = {
          id: `d${dayNumber}-act${Date.now()}`,
          timeSlot: newActivityData.timeSlot || "Morning",
          timeLabel: "Custom Time",
          title: newActivityData.title,
          category: newActivityData.category || "History",
          locationName: newActivityData.locationName || `${destinationName} Stop`,
          description: newActivityData.description || "Custom planned traveler experience.",
          cost: newActivityData.cost || "Free",
          lat: Number((destCoords.lat + Math.sin(angle) * 0.012).toFixed(5)),
          lon: Number((destCoords.lon + Math.cos(angle) * 0.012).toFixed(5)),
          completed: false
        };

        const updatedActivities = [...dayObj.activities, newAct];
        return {
          ...dayObj,
          locations: updatedActivities.map((a) => a.locationName),
          activities: updatedActivities
        };
      }
      return dayObj;
    });

    setItinerary({ ...itinerary, days: updatedDays });
    setAddingToDay(null);
    setNewActivityData({
      title: "",
      locationName: "",
      category: "History",
      timeSlot: "Morning",
      cost: "₹250 / $3",
      description: ""
    });
  };

  const resetToOriginal = () => {
    if (originalItinerary) {
      setItinerary(JSON.parse(JSON.stringify(originalItinerary)));
      setEditingActivityId(null);
      setAddingToDay(null);
    }
  };

  const exportPDF = () => {
    const element = document.getElementById("itinerary-export-area");
    if (!element) return;
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${destinationName}-Itinerary.pdf`);
    });
  };

  const getThemeIcon = (themeKey) => {
    switch (themeKey) {
      case "Food":
        return <Utensils size={15} />;
      case "Nature":
        return <Trees size={15} />;
      case "History":
        return <Landmark size={15} />;
      case "Adventure":
        return <Flame size={15} />;
      default:
        return <Compass size={15} />;
    }
  };

  return (
    <div className="glass-card" style={{ padding: "28px", borderRadius: "var(--radius-lg)" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="tag-badge tag-purple">AI Smart Trip Engine</span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Validated Quality • Themes • Map Routing
            </span>
          </div>

          {originalItinerary && (
            <button
              onClick={resetToOriginal}
              style={{
                background: "transparent",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
                borderRadius: "var(--radius-full)",
                padding: "4px 12px",
                fontSize: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer"
              }}
              title="Reset all manual edits to original AI plan"
            >
              <RotateCcw size={12} />
              <span>Reset Edits</span>
            </button>
          )}
        </div>

        <h3 style={{ fontSize: "1.45rem", fontWeight: "800", color: "var(--text-primary)" }}>
          Day-by-Day Itinerary & Route Planner for {destinationName}
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "4px" }}>
          Customize your journey with authentic Food, Nature, History, and Adventure stops. Edit activities manually, check off visits, and visualize daily routes on the interactive map.
        </p>
      </div>

      {/* TRIP CONTROLS ACCORDION / TOOLBAR */}
      <div
        style={{
          background: "var(--bg-glass-heavy)",
          borderRadius: "var(--radius-md)",
          padding: "20px",
          border: "1px solid var(--border-subtle)",
          marginBottom: "28px"
        }}
      >
        {/* Row 1: Duration, Pace, Budget, Travelers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: "16px",
            marginBottom: "18px"
          }}
        >
          {/* Days */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: "600" }}>
              Trip Duration:
            </label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-input)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                fontSize: "0.88rem",
                outline: "none"
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <option key={d} value={d} style={{ background: "#0f172a", color: "#f8fafc" }}>
                  {d} {d === 1 ? "Day" : "Days"}
                </option>
              ))}
            </select>
          </div>

          {/* Pace */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: "600" }}>
              Travel Pace:
            </label>
            <select
              value={pace}
              onChange={(e) => setPace(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-input)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                fontSize: "0.88rem",
                outline: "none"
              }}
            >
              <option value="relaxed" style={{ background: "#0f172a", color: "#f8fafc" }}>Relaxed & Leisurely</option>
              <option value="balanced" style={{ background: "#0f172a", color: "#f8fafc" }}>Balanced Sightseeing</option>
              <option value="packed" style={{ background: "#0f172a", color: "#f8fafc" }}>Action Packed</option>
            </select>
          </div>

          {/* Budget Tier */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: "600" }}>
              Budget Style:
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-input)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                fontSize: "0.88rem",
                outline: "none"
              }}
            >
              <option value="budget" style={{ background: "#0f172a", color: "#f8fafc" }}>Budget Backpacker</option>
              <option value="comfort" style={{ background: "#0f172a", color: "#f8fafc" }}>Comfort Mid-Range</option>
              <option value="luxury" style={{ background: "#0f172a", color: "#f8fafc" }}>Luxury Experience</option>
            </select>
          </div>

          {/* Travelers */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: "600" }}>
              Travelers (Group Size):
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="number"
                min="1"
                max="25"
                value={travelers}
                onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value, 10) || 1))}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                  fontSize: "0.88rem",
                  outline: "none"
                }}
              />
            </div>
          </div>
        </div>

        {/* Row 2: Vibe & Quality Theme Selectors (Food, Nature, History, Adventure) */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "8px", fontWeight: "600" }}>
            Priority Experience Themes:
          </label>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {Object.keys(THEME_CATEGORIES).map((catKey) => {
              const cat = THEME_CATEGORIES[catKey];
              const isSelected = selectedThemes.includes(catKey);
              return (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => toggleTheme(catKey)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "var(--radius-full)",
                    background: isSelected ? "var(--bg-card)" : "var(--bg-input)",
                    border: isSelected ? `2px solid ${cat.color}` : "1px solid var(--border-subtle)",
                    color: isSelected ? "var(--text-primary)" : "var(--text-muted)",
                    fontSize: "0.84rem",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    boxShadow: isSelected ? `0 0 16px ${cat.color}44` : "none",
                    transition: "all var(--transition-fast)"
                  }}
                >
                  <span style={{ color: cat.color }}>{getThemeIcon(catKey)}</span>
                  <span>{cat.emoji} {cat.label}</span>
                  {isSelected && <span style={{ color: cat.color, fontSize: "0.75rem" }}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="btn-primary"
          style={{ width: "100%", padding: "13px", justifyContent: "center", fontWeight: "700", fontSize: "0.95rem" }}
        >
          {loading ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
          <span>{loading ? "Generating & Validating Smart Itinerary..." : "Generate AI Day-by-Day Plan"}</span>
        </button>
      </div>

      {/* RENDERED ITINERARY & MAP SECTION */}
      {itinerary && (
        <div id="itinerary-export-area" className="animate-fade-in">
          {/* Summary Header & View Switcher */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "16px",
              paddingBottom: "20px",
              marginBottom: "24px",
              borderBottom: "1px solid var(--border-subtle)"
            }}
          >
            <div style={{ maxWidth: "600px" }}>
              <h4 style={{ fontSize: "1.4rem", fontWeight: "800", color: "var(--text-primary)" }}>
                {itinerary.title}
              </h4>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                {itinerary.summary}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              {/* Cost Badge */}
              <div
                style={{
                  background: "rgba(99, 102, 241, 0.15)",
                  color: "var(--accent-primary)",
                  border: "1px solid rgba(99, 102, 241, 0.35)",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.84rem",
                  fontWeight: "700"
                }}
              >
                Est: {itinerary.totalEstimatedCost}
              </div>

              {/* View Mode Toggle: Timeline, Map, Split */}
              <div
                style={{
                  display: "flex",
                  background: "var(--bg-input)",
                  padding: "3px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <button
                  onClick={() => setViewMode("timeline")}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "var(--radius-full)",
                    background: viewMode === "timeline" ? "var(--gradient-primary)" : "transparent",
                    border: "none",
                    color: viewMode === "timeline" ? "#ffffff" : "var(--text-secondary)",
                    fontSize: "0.76rem",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer"
                  }}
                  title="Timeline List View"
                >
                  <List size={14} />
                  <span>Timeline</span>
                </button>

                <button
                  onClick={() => setViewMode("map")}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "var(--radius-full)",
                    background: viewMode === "map" ? "var(--gradient-primary)" : "transparent",
                    border: "none",
                    color: viewMode === "map" ? "#ffffff" : "var(--text-secondary)",
                    fontSize: "0.76rem",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer"
                  }}
                  title="Interactive Map View"
                >
                  <MapIcon size={14} />
                  <span>Map</span>
                </button>

                <button
                  onClick={() => setViewMode("split")}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "var(--radius-full)",
                    background: viewMode === "split" ? "var(--gradient-primary)" : "transparent",
                    border: "none",
                    color: viewMode === "split" ? "#ffffff" : "var(--text-secondary)",
                    fontSize: "0.76rem",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer"
                  }}
                  title="Split View (Timeline + Map)"
                >
                  <Columns2 size={14} />
                  <span>Split</span>
                </button>
              </div>

              {/* Export PDF Button */}
              <button
                onClick={exportPDF}
                className="btn-secondary"
                style={{ padding: "8px 16px", fontSize: "0.82rem" }}
              >
                <Download size={14} />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          {/* MAIN CONTENT AREA: Split View or Full Width View */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: viewMode === "split" ? "repeat(auto-fit, minmax(420px, 1fr))" : "1fr",
              gap: "24px",
              alignItems: "start"
            }}
          >
            {/* TIMELINE COLUMN */}
            {(viewMode === "timeline" || viewMode === "split") && (
              <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                {itinerary.days.map((dayObj) => (
                  <div
                    key={dayObj.day}
                    style={{
                      background: "var(--bg-glass)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                      padding: "22px",
                      position: "relative"
                    }}
                  >
                    {/* Day Header Banner */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginBottom: "12px"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: "var(--gradient-primary)",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "800",
                            fontSize: "0.95rem"
                          }}
                        >
                          D{dayObj.day}
                        </div>
                        <div>
                          <h5 style={{ fontSize: "1.12rem", fontWeight: "800", color: "var(--text-primary)" }}>
                            Day {dayObj.day}: {dayObj.theme}
                          </h5>
                          <span style={{ fontSize: "0.78rem", color: "var(--accent-amber)", fontWeight: "600" }}>
                            Est. {dayObj.budget}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "6px" }}>
                        {/* Add activity to day button */}
                        <button
                          onClick={() => setAddingToDay(addingToDay === dayObj.day ? null : dayObj.day)}
                          style={{
                            background: "var(--bg-input)",
                            border: "1px solid var(--border-subtle)",
                            color: "var(--accent-primary)",
                            borderRadius: "var(--radius-full)",
                            padding: "4px 10px",
                            fontSize: "0.74rem",
                            fontWeight: "700",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            cursor: "pointer"
                          }}
                        >
                          <Plus size={12} />
                          <span>Add Stop</span>
                        </button>
                      </div>
                    </div>

                    {/* ROUTE LOCATION SUMMARY CHAIN */}
                    {dayObj.locations && dayObj.locations.length > 0 && (
                      <div
                        style={{
                          padding: "8px 12px",
                          borderRadius: "var(--radius-sm)",
                          background: "rgba(0, 0, 0, 0.25)",
                          border: "1px solid var(--border-subtle)",
                          marginBottom: "16px",
                          fontSize: "0.78rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          flexWrap: "wrap",
                          color: "var(--text-secondary)"
                        }}
                      >
                        <MapPin size={13} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                        <strong style={{ color: "var(--text-primary)" }}>Daily Route:</strong>
                        {dayObj.locations.map((loc, lIdx) => (
                          <React.Fragment key={lIdx}>
                            <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{loc}</span>
                            {lIdx < dayObj.locations.length - 1 && (
                              <ArrowRight size={11} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {/* ADD NEW ACTIVITY FORM (IF OPEN) */}
                    {addingToDay === dayObj.day && (
                      <div
                        style={{
                          padding: "16px",
                          borderRadius: "var(--radius-sm)",
                          background: "rgba(99, 102, 241, 0.08)",
                          border: "1px dashed var(--accent-primary)",
                          marginBottom: "16px"
                        }}
                      >
                        <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "10px" }}>
                          Add New Custom Activity to Day {dayObj.day}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                          <input
                            type="text"
                            placeholder="Activity Title (e.g. Sunset Boat Tour)"
                            value={newActivityData.title}
                            onChange={(e) => setNewActivityData({ ...newActivityData, title: e.target.value })}
                            style={{
                              padding: "8px 12px",
                              borderRadius: "var(--radius-sm)",
                              background: "var(--bg-input)",
                              border: "1px solid var(--border-subtle)",
                              color: "var(--text-primary)",
                              fontSize: "0.84rem",
                              outline: "none"
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Location / Landmark Name"
                            value={newActivityData.locationName}
                            onChange={(e) => setNewActivityData({ ...newActivityData, locationName: e.target.value })}
                            style={{
                              padding: "8px 12px",
                              borderRadius: "var(--radius-sm)",
                              background: "var(--bg-input)",
                              border: "1px solid var(--border-subtle)",
                              color: "var(--text-primary)",
                              fontSize: "0.84rem",
                              outline: "none"
                            }}
                          />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                          <select
                            value={newActivityData.category}
                            onChange={(e) => setNewActivityData({ ...newActivityData, category: e.target.value })}
                            style={{
                              padding: "8px",
                              borderRadius: "var(--radius-sm)",
                              background: "var(--bg-input)",
                              border: "1px solid var(--border-subtle)",
                              color: "var(--text-primary)",
                              fontSize: "0.84rem"
                            }}
                          >
                            <option value="Food">🍲 Food</option>
                            <option value="Nature">🌲 Nature</option>
                            <option value="History">🏛️ History</option>
                            <option value="Adventure">🧗 Adventure</option>
                          </select>
                          <select
                            value={newActivityData.timeSlot}
                            onChange={(e) => setNewActivityData({ ...newActivityData, timeSlot: e.target.value })}
                            style={{
                              padding: "8px",
                              borderRadius: "var(--radius-sm)",
                              background: "var(--bg-input)",
                              border: "1px solid var(--border-subtle)",
                              color: "var(--text-primary)",
                              fontSize: "0.84rem"
                            }}
                          >
                            <option value="Morning">Morning</option>
                            <option value="Afternoon">Afternoon</option>
                            <option value="Evening">Evening</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Est. Cost"
                            value={newActivityData.cost}
                            onChange={(e) => setNewActivityData({ ...newActivityData, cost: e.target.value })}
                            style={{
                              padding: "8px 12px",
                              borderRadius: "var(--radius-sm)",
                              background: "var(--bg-input)",
                              border: "1px solid var(--border-subtle)",
                              color: "var(--text-primary)",
                              fontSize: "0.84rem"
                            }}
                          />
                        </div>
                        <textarea
                          placeholder="Brief description or tip..."
                          value={newActivityData.description}
                          onChange={(e) => setNewActivityData({ ...newActivityData, description: e.target.value })}
                          rows={2}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: "var(--radius-sm)",
                            background: "var(--bg-input)",
                            border: "1px solid var(--border-subtle)",
                            color: "var(--text-primary)",
                            fontSize: "0.84rem",
                            marginBottom: "10px",
                            outline: "none"
                          }}
                        />
                        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                          <button
                            onClick={() => setAddingToDay(null)}
                            style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", fontSize: "0.78rem", cursor: "pointer" }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleAddNewActivity(dayObj.day)}
                            className="btn-primary"
                            style={{ padding: "6px 14px", fontSize: "0.78rem" }}
                          >
                            Save Stop
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ACTIVITIES LIST */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {dayObj.activities.map((act) => {
                        const isChecked = !!checkedItems[act.id];
                        const isEditingThis = editingActivityId === act.id;
                        const catMeta = THEME_CATEGORIES[act.category] || THEME_CATEGORIES.History;

                        if (isEditingThis) {
                          // Inline Edit Mode
                          return (
                            <div
                              key={act.id}
                              style={{
                                padding: "14px",
                                borderRadius: "var(--radius-sm)",
                                background: "rgba(0, 0, 0, 0.4)",
                                border: "1px solid var(--accent-primary)"
                              }}
                            >
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
                                <input
                                  type="text"
                                  value={editFormData.title}
                                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                                  placeholder="Title"
                                  style={{ padding: "6px 10px", borderRadius: "4px", background: "var(--bg-input)", border: "1px solid var(--border-subtle)", color: "#fff", fontSize: "0.84rem" }}
                                />
                                <input
                                  type="text"
                                  value={editFormData.locationName}
                                  onChange={(e) => setEditFormData({ ...editFormData, locationName: e.target.value })}
                                  placeholder="Location"
                                  style={{ padding: "6px 10px", borderRadius: "4px", background: "var(--bg-input)", border: "1px solid var(--border-subtle)", color: "#fff", fontSize: "0.84rem" }}
                                />
                              </div>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "8px" }}>
                                <select
                                  value={editFormData.category}
                                  onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                                  style={{ padding: "6px", borderRadius: "4px", background: "var(--bg-input)", border: "1px solid var(--border-subtle)", color: "#fff", fontSize: "0.82rem" }}
                                >
                                  <option value="Food">🍲 Food</option>
                                  <option value="Nature">🌲 Nature</option>
                                  <option value="History">🏛️ History</option>
                                  <option value="Adventure">🧗 Adventure</option>
                                </select>
                                <select
                                  value={editFormData.timeSlot}
                                  onChange={(e) => setEditFormData({ ...editFormData, timeSlot: e.target.value })}
                                  style={{ padding: "6px", borderRadius: "4px", background: "var(--bg-input)", border: "1px solid var(--border-subtle)", color: "#fff", fontSize: "0.82rem" }}
                                >
                                  <option value="Morning">Morning</option>
                                  <option value="Afternoon">Afternoon</option>
                                  <option value="Evening">Evening</option>
                                </select>
                                <input
                                  type="text"
                                  value={editFormData.cost}
                                  onChange={(e) => setEditFormData({ ...editFormData, cost: e.target.value })}
                                  placeholder="Cost"
                                  style={{ padding: "6px 10px", borderRadius: "4px", background: "var(--bg-input)", border: "1px solid var(--border-subtle)", color: "#fff", fontSize: "0.82rem" }}
                                />
                              </div>
                              <textarea
                                value={editFormData.description}
                                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                rows={2}
                                style={{ width: "100%", padding: "6px 10px", borderRadius: "4px", background: "var(--bg-input)", border: "1px solid var(--border-subtle)", color: "#fff", fontSize: "0.82rem", marginBottom: "8px" }}
                              />
                              <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                                <button
                                  onClick={cancelEditing}
                                  style={{ padding: "4px 10px", borderRadius: "4px", background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--text-muted)", fontSize: "0.75rem", cursor: "pointer" }}
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => saveEditing(dayObj.day, act.id)}
                                  className="btn-primary"
                                  style={{ padding: "4px 12px", fontSize: "0.75rem" }}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          );
                        }

                        // Normal Activity Display Card
                        return (
                          <div
                            key={act.id}
                            style={{
                              padding: "14px 16px",
                              borderRadius: "var(--radius-sm)",
                              background: isChecked ? "rgba(99, 102, 241, 0.08)" : "var(--bg-input)",
                              border: isChecked ? "1px solid rgba(99, 102, 241, 0.3)" : "1px solid var(--border-subtle)",
                              display: "flex",
                              gap: "12px",
                              alignItems: "flex-start",
                              transition: "all var(--transition-fast)"
                            }}
                          >
                            {/* Checkbox */}
                            <button
                              onClick={() => toggleCheck(act.id)}
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: isChecked ? "var(--accent-primary)" : "var(--text-muted)",
                                marginTop: "2px"
                              }}
                              title={isChecked ? "Mark unvisited" : "Mark as visited"}
                            >
                              <CheckSquare size={18} />
                            </button>

                            {/* Activity Info */}
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                                <span
                                  style={{
                                    fontSize: "0.72rem",
                                    fontWeight: "700",
                                    padding: "2px 8px",
                                    borderRadius: "var(--radius-full)",
                                    background: "rgba(255, 255, 255, 0.08)",
                                    color: "var(--text-secondary)"
                                  }}
                                >
                                  {act.timeSlot}
                                </span>

                                <span
                                  style={{
                                    fontSize: "0.72rem",
                                    fontWeight: "700",
                                    padding: "2px 8px",
                                    borderRadius: "var(--radius-full)",
                                    background: "rgba(255, 255, 255, 0.06)",
                                    color: catMeta.color,
                                    border: `1px solid ${catMeta.color}33`,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px"
                                  }}
                                >
                                  {catMeta.emoji} {catMeta.label}
                                </span>

                                <span style={{ fontSize: "0.76rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                                  <MapPin size={12} color="var(--accent-primary)" />
                                  <span>{act.locationName}</span>
                                </span>
                              </div>

                              <h6
                                style={{
                                  fontSize: "0.95rem",
                                  fontWeight: "700",
                                  color: "var(--text-primary)",
                                  marginBottom: "4px",
                                  textDecoration: isChecked ? "line-through" : "none"
                                }}
                              >
                                {act.title}
                              </h6>

                              <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: "1.4", marginBottom: "6px" }}>
                                {act.description}
                              </p>

                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.76rem" }}>
                                <span style={{ color: "var(--accent-sky)", fontWeight: "600" }}>
                                  Est. Cost: {act.cost}
                                </span>
                              </div>
                            </div>

                            {/* Action Buttons: Edit & Delete */}
                            <div style={{ display: "flex", gap: "4px" }}>
                              <button
                                onClick={() => startEditing(act)}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  color: "var(--text-muted)",
                                  cursor: "pointer",
                                  padding: "4px",
                                  borderRadius: "4px"
                                }}
                                title="Edit this activity"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => deleteActivity(dayObj.day, act.id)}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  color: "var(--accent-rose)",
                                  cursor: "pointer",
                                  padding: "4px",
                                  borderRadius: "4px"
                                }}
                                title="Delete stop"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Culinary / Food Tip Banner */}
                    {dayObj.foodTip && (
                      <div
                        style={{
                          marginTop: "14px",
                          padding: "10px 14px",
                          borderRadius: "var(--radius-sm)",
                          background: "rgba(245, 158, 11, 0.08)",
                          border: "1px solid rgba(245, 158, 11, 0.2)",
                          fontSize: "0.82rem",
                          color: "var(--text-secondary)",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}
                      >
                        <Utensils size={15} color="var(--accent-amber)" style={{ flexShrink: 0 }} />
                        <span>
                          <strong style={{ color: "var(--accent-amber)" }}>Culinary Secret: </strong>
                          {dayObj.foodTip}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* INTERACTIVE MAP COLUMN */}
            {(viewMode === "map" || viewMode === "split") && (
              <div
                style={{
                  position: viewMode === "split" ? "sticky" : "relative",
                  top: viewMode === "split" ? "20px" : "0"
                }}
              >
                <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: "700", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <MapIcon size={16} color="var(--accent-primary)" />
                    <span>Interactive Itinerary Route Map</span>
                  </div>
                  <span style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
                    OpenStreetMap Live View
                  </span>
                </div>

                <ItineraryMap
                  days={itinerary.days}
                  destinationName={destinationName}
                  selectedDayFilter={selectedMapDay}
                  onSelectDayFilter={setSelectedMapDay}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
