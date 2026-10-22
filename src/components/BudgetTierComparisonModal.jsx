import React from "react";
import { X, Check, Sparkles, Users, Calendar, ArrowRight, Shield, Utensils, Building, Train, Car, Compass, AlertCircle } from "lucide-react";
import { CATEGORY_METADATA } from "../services/budgetCalculatorService";

export const BudgetTierComparisonModal = ({
  isOpen,
  onClose,
  budgetData,
  onSelectTier
}) => {
  if (!isOpen || !budgetData) return null;

  const { comparison, currencySymbol: sym, days, travelers, tier: activeTier } = budgetData;

  const getCategoryIcon = (key) => {
    switch (key) {
      case "transport":
        return <Train size={14} color="var(--accent-sky)" />;
      case "accommodations":
        return <Building size={14} color="var(--accent-primary)" />;
      case "meals":
        return <Utensils size={14} color="var(--accent-amber)" />;
      case "localTravel":
        return <Car size={14} color="var(--accent-violet)" />;
      case "activities":
        return <Compass size={14} color="var(--accent-coral)" />;
      case "emergency":
        return <AlertCircle size={14} color="var(--accent-rose)" />;
      default:
        return <Shield size={14} />;
    }
  };

  const tiersList = [
    comparison.budget,
    comparison.comfort,
    comparison.luxury
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        overflowY: "auto"
      }}
      onClick={onClose}
    >
      <div
        className="glass-card animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "1150px",
          maxHeight: "92vh",
          overflowY: "auto",
          background: "var(--bg-card)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-bright)",
          padding: "32px",
          position: "relative",
          boxShadow: "var(--shadow-lg), 0 0 50px rgba(99, 102, 241, 0.25)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "var(--bg-input)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-secondary)",
            cursor: "pointer",
            transition: "all var(--transition-fast)"
          }}
          aria-label="Close Comparison"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span className="tag-badge tag-purple">Side-by-Side Comparison</span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={14} /> {days} Days • <Users size={14} /> {travelers} {travelers === 1 ? "Traveler" : "Travelers"}
            </span>
          </div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--text-primary)" }}>
            Compare Travel Plans for {budgetData.destinationName || "Destination"}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "4px" }}>
            Review itemized category costs per person & for the whole group in {budgetData.destinationLabel || "this destination"} to choose the ideal experience for your journey.
          </p>
        </div>

        {/* 3 Tier Columns Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginBottom: "32px"
          }}
        >
          {tiersList.map((tierObj) => {
            const isSelected = activeTier === tierObj.tier;
            const meta = tierObj.metadata;

            return (
              <div
                key={tierObj.tier}
                style={{
                  background: isSelected ? meta.bgGradient : "var(--bg-glass)",
                  border: isSelected ? `2px solid ${meta.borderColor}` : "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: isSelected ? "var(--shadow-md)" : "none",
                  transition: "all var(--transition-normal)"
                }}
              >
                {/* Active / Badge indicator */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      background: "rgba(255, 255, 255, 0.1)",
                      color: meta.color,
                      border: `1px solid ${meta.borderColor}`
                    }}
                  >
                    {meta.badge}
                  </span>
                  {isSelected && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        color: "var(--accent-primary)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <Check size={14} /> Currently Selected
                    </span>
                  )}
                </div>

                {/* Tier Title */}
                <h3 style={{ fontSize: "1.35rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "4px" }}>
                  {meta.name}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
                  {meta.tagline}
                </p>

                {/* Pricing Box */}
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.25)",
                    borderRadius: "var(--radius-sm)",
                    padding: "16px",
                    marginBottom: "20px",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "700" }}>
                    Total Per Person
                  </div>
                  <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--text-primary)", margin: "4px 0" }}>
                    {tierObj.perPerson.formattedTotal}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                    ~{tierObj.perPerson.formattedDaily} / day per person
                  </div>

                  {travelers > 1 && (
                    <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Users size={13} /> Group Total ({travelers}):
                      </span>
                      <strong style={{ fontSize: "0.95rem", color: meta.color }}>
                        {tierObj.groupTotal.formattedTotal}
                      </strong>
                    </div>
                  )}
                </div>

                {/* Separated Category Itemization */}
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Separated Expense Breakdown
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {Object.keys(CATEGORY_METADATA).map((catKey) => {
                      const catMeta = CATEGORY_METADATA[catKey];
                      const catData = tierObj.categories[catKey];
                      return (
                        <div
                          key={catKey}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "0.82rem",
                            padding: "6px 8px",
                            borderRadius: "var(--radius-sm)",
                            background: "rgba(255, 255, 255, 0.02)"
                          }}
                        >
                          <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-secondary)" }}>
                            {getCategoryIcon(catKey)}
                            <span>{catMeta.name}</span>
                          </span>
                          <div style={{ textAlign: "right" }}>
                            <strong style={{ color: "var(--text-primary)" }}>
                              {sym}{catData.perPersonTotal.toLocaleString()}
                            </strong>
                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: "4px" }}>
                              ({catData.percentage}%)
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Features & Inclusions List */}
                <div style={{ flex: 1, marginBottom: "24px" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    What's Included
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                    {meta.features.map((feat, idx) => (
                      <li key={idx} style={{ display: "flex", gap: "8px", alignItems: "flex-start", lineHeight: "1.4" }}>
                        <span style={{ color: meta.color, marginTop: "2px" }}>✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Tier Button */}
                <button
                  onClick={() => {
                    onSelectTier(tierObj.tier);
                    onClose();
                  }}
                  className={isSelected ? "btn-primary" : "btn-secondary"}
                  style={{
                    width: "100%",
                    padding: "12px",
                    justifyContent: "center",
                    fontWeight: "700",
                    fontSize: "0.88rem"
                  }}
                >
                  {isSelected ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Check size={16} /> Selected Plan
                    </span>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      Select {meta.name.split("/")[0].trim()} Plan <ArrowRight size={16} />
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div
          style={{
            padding: "14px 18px",
            borderRadius: "var(--radius-sm)",
            background: "rgba(99, 102, 241, 0.08)",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "0.82rem",
            color: "var(--text-secondary)"
          }}
        >
          <Sparkles size={16} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
          <span>
            <strong>Smart Dynamic Calculation:</strong> Accommodations and local transit adjust automatically with group size sharing discounts (twin sharing rooms & shared taxis). Emergency buffer ensures peace of mind for unforeseen changes.
          </span>
        </div>
      </div>
    </div>
  );
};
