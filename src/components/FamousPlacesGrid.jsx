import React from "react";
import { Clock, Tag, Lightbulb, Compass, Sparkles } from "lucide-react";

export const FamousPlacesGrid = ({ places, destinationName }) => {
  if (!places || places.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
        No famous places listed for this destination yet.
      </div>
    );
  }

  return (
    <div style={{ margin: "24px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <Compass size={22} color="var(--accent-cyan)" />
        <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "var(--text-primary)" }}>
          Notable Places & Attractions in {destinationName}
        </h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        {places.map((place) => (
          <div
            key={place.id}
            className="glass-card"
            style={{
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Image Header */}
            <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
              <img
                src={place.image}
                alt={place.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80";
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
              <span
                className="tag-badge tag-purple"
                style={{ position: "absolute", top: "12px", left: "12px" }}
              >
                {place.category}
              </span>
            </div>

            {/* Place Details */}
            <div style={{ padding: "18px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "8px" }}>
                  {place.name}
                </h4>

                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "16px" }}>
                  {place.description}
                </p>
              </div>

              <div>
                {/* Meta Badges */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "var(--accent-primary)", background: "rgba(99, 102, 241,0.1)", padding: "4px 10px", borderRadius: "var(--radius-full)" }}>
                    <Clock size={13} />
                    <span>{place.duration}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "var(--accent-primary)", background: "rgba(99, 102, 241,0.1)", padding: "4px 10px", borderRadius: "var(--radius-full)" }}>
                    <Tag size={13} />
                    <span>{place.fee}</span>
                  </div>
                </div>

                {/* Insider Tip Box */}
                {place.insiderTip && (
                  <div
                    style={{
                      background: "rgba(245, 158, 11, 0.08)",
                      borderLeft: "3px solid var(--accent-amber)",
                      padding: "10px 12px",
                      borderRadius: "0 8px 8px 0",
                      fontSize: "0.78rem",
                      color: "var(--text-primary)",
                      display: "flex",
                      gap: "8px",
                      alignItems: "flex-start"
                    }}
                  >
                    <Lightbulb size={16} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <strong style={{ color: "var(--accent-amber)" }}>Insider Tip: </strong>
                      <span>{place.insiderTip}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
