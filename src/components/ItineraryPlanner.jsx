import React, { useState } from "react";
import { Sparkles, Calendar, Clock, DollarSign, Download, CheckCircle, RefreshCw, Layers, CheckSquare } from "lucide-react";
import confetti from "canvas-confetti";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { generateItineraryWithGemini } from "../services/geminiService";

export const ItineraryPlanner = ({ destinationName = "Destination" }) => {
  const [days, setDays] = useState(3);
  const [pace, setPace] = useState("balanced");
  const [budget, setBudget] = useState("mid-range");
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateItineraryWithGemini(destinationName, days, pace, budget);
      setItinerary(res);
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

  const toggleCheck = (key) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
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

  return (
    <div className="glass-card" style={{ padding: "24px", borderRadius: "var(--radius-md)" }}>
      {/* Controls Container */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <Sparkles size={22} color="var(--accent-purple)" />
          <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--text-primary)" }}>
            AI Day-by-Day Itinerary Planner for {destinationName}
          </h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "20px" }}>
          {/* Days Input */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: "600" }}>
              Trip Duration (Days):
            </label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-input)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                outline: "none"
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <option key={d} value={d} style={{ background: "#111827", color: "#fff" }}>
                  {d} {d === 1 ? "Day" : "Days"}
                </option>
              ))}
            </select>
          </div>

          {/* Travel Pace */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: "600" }}>
              Travel Pace:
            </label>
            <select
              value={pace}
              onChange={(e) => setPace(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-input)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                outline: "none"
              }}
            >
              <option value="relaxed" style={{ background: "#111827", color: "#fff" }}>Relaxed & Leisurely</option>
              <option value="balanced" style={{ background: "#111827", color: "#fff" }}>Balanced Sightseeing</option>
              <option value="packed" style={{ background: "#111827", color: "#fff" }}>Action Packed</option>
            </select>
          </div>

          {/* Budget Level */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: "600" }}>
              Budget Style:
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-input)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                outline: "none"
              }}
            >
              <option value="budget" style={{ background: "#111827", color: "#fff" }}>Backpacker / Budget</option>
              <option value="mid-range" style={{ background: "#111827", color: "#fff" }}>Mid-Range Comfort</option>
              <option value="luxury" style={{ background: "#111827", color: "#fff" }}>Luxury Experience</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="btn-primary"
          style={{ width: "100%", padding: "12px", justifyContent: "center" }}
        >
          {loading ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
          <span>{loading ? "Generating Smart Itinerary..." : "Generate Day-by-Day Plan"}</span>
        </button>
      </div>

      {/* Rendered Day-by-Day Itinerary Card */}
      {itinerary && (
        <div id="itinerary-export-area" className="animate-fade-in" style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
            <div>
              <h4 style={{ fontSize: "1.4rem", fontWeight: "800", color: "var(--text-primary)" }}>
                {itinerary.title}
              </h4>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                {itinerary.summary}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ background: "rgba(16, 185, 129, 0.15)", color: "var(--accent-emerald)", padding: "6px 14px", borderRadius: "var(--radius-full)", fontSize: "0.85rem", fontWeight: "700" }}>
                Estimated Cost: {itinerary.totalEstimatedCost}
              </div>
              <button
                onClick={exportPDF}
                className="btn-secondary"
                style={{ padding: "8px 16px", fontSize: "0.8rem" }}
              >
                <Download size={14} />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          {/* Timeline of Days */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {itinerary.days.map((dayObj) => (
              <div
                key={dayObj.day}
                style={{
                  background: "var(--bg-glass)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--gradient-primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "0.9rem" }}>
                      D{dayObj.day}
                    </div>
                    <h5 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>
                      Day {dayObj.day}: {dayObj.theme}
                    </h5>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "var(--accent-amber)", fontWeight: "600" }}>
                    Est. {dayObj.budget}
                  </span>
                </div>

                {/* Day Schedule Slots */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <button
                      onClick={() => toggleCheck(`d${dayObj.day}-m`)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: checkedItems[`d${dayObj.day}-m`] ? "var(--accent-emerald)" : "var(--text-muted)" }}
                    >
                      <CheckSquare size={18} />
                    </button>
                    <div>
                      <strong style={{ color: "var(--accent-emerald)" }}>Morning: </strong>
                      <span style={{ textDecoration: checkedItems[`d${dayObj.day}-m`] ? "line-through" : "none" }}>{dayObj.morning}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <button
                      onClick={() => toggleCheck(`d${dayObj.day}-a`)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: checkedItems[`d${dayObj.day}-a`] ? "var(--accent-emerald)" : "var(--text-muted)" }}
                    >
                      <CheckSquare size={18} />
                    </button>
                    <div>
                      <strong style={{ color: "var(--accent-purple)" }}>Afternoon: </strong>
                      <span style={{ textDecoration: checkedItems[`d${dayObj.day}-a`] ? "line-through" : "none" }}>{dayObj.afternoon}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <button
                      onClick={() => toggleCheck(`d${dayObj.day}-e`)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: checkedItems[`d${dayObj.day}-e`] ? "var(--accent-emerald)" : "var(--text-muted)" }}
                    >
                      <CheckSquare size={18} />
                    </button>
                    <div>
                      <strong style={{ color: "var(--accent-rose)" }}>Evening: </strong>
                      <span style={{ textDecoration: checkedItems[`d${dayObj.day}-e`] ? "line-through" : "none" }}>{dayObj.evening}</span>
                    </div>
                  </div>

                  {dayObj.foodTip && (
                    <div style={{ marginTop: "6px", fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                      🍴 Culinary Tip: {dayObj.foodTip}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
