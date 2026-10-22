import React, { useState, useMemo } from "react";
import {
  Calculator,
  Calendar,
  CheckSquare,
  Sparkles,
  CheckCircle2,
  Shield,
  Users,
  Copy,
  Check,
  Columns3,
  Train,
  Building,
  Utensils,
  Car,
  Compass,
  AlertCircle,
  MapPin
} from "lucide-react";
import {
  calculateTripBudget,
  getGroupedDestinations,
  CURRENCY_RATES,
  CATEGORY_METADATA,
  TIER_METADATA
} from "../services/budgetCalculatorService";
import { BudgetTierComparisonModal } from "./BudgetTierComparisonModal";

export const TravelToolsSection = () => {
  const [activeTool, setActiveTool] = useState("budget");

  // Grouped Individual Destinations
  const groupedDestinations = useMemo(() => getGroupedDestinations(), []);

  // Budget Calculator state: Individual Place selection
  const [destinationId, setDestinationId] = useState("taj-mahal-agra");
  const [tier, setTier] = useState("comfort");
  const [days, setDays] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [currency, setCurrency] = useState("INR");
  const [viewMode, setViewMode] = useState("both"); // "perPerson" | "group" | "both"
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Best Season matrix state
  const [selectedMonth, setSelectedMonth] = useState("October");

  // Packing List state
  const [packType, setPackType] = useState("heritage");
  const [checkedItems, setCheckedItems] = useState({});

  // Compute budget with service for the chosen individual place
  const budgetData = useMemo(() => {
    return calculateTripBudget({
      destinationId,
      tier,
      days,
      travelers,
      currency
    });
  }, [destinationId, tier, days, travelers, currency]);

  const { currentPlan, currencySymbol: sym } = budgetData;

  const getCategoryIcon = (key) => {
    switch (key) {
      case "transport":
        return <Train size={16} color="var(--accent-sky)" />;
      case "accommodations":
        return <Building size={16} color="var(--accent-primary)" />;
      case "meals":
        return <Utensils size={16} color="var(--accent-amber)" />;
      case "localTravel":
        return <Car size={16} color="var(--accent-violet)" />;
      case "activities":
        return <Compass size={16} color="var(--accent-coral)" />;
      case "emergency":
        return <AlertCircle size={16} color="var(--accent-rose)" />;
      default:
        return <Shield size={16} />;
    }
  };

  const copyBudgetSummary = () => {
    const lines = [
      `✈️ Travel Budget Summary for ${budgetData.destinationLabel || budgetData.destinationName}`,
      `📅 Duration: ${days} Days | 👥 Travelers: ${travelers} | 🌟 Plan: ${currentPlan.metadata.name}`,
      `💰 Total Per Person: ${currentPlan.perPerson.formattedTotal} (~${currentPlan.perPerson.formattedDaily}/day)`,
      travelers > 1 ? `👥 Whole Group Total: ${currentPlan.groupTotal.formattedTotal} (~${currentPlan.groupTotal.formattedDaily}/day)` : null,
      `\n📊 Separated Category Breakdown (Per Person):`,
      `• Transport (flights/trains): ${sym}${currentPlan.categories.transport.perPersonTotal.toLocaleString()} (${currentPlan.categories.transport.percentage}%)`,
      `• Accommodations (stays): ${sym}${currentPlan.categories.accommodations.perPersonTotal.toLocaleString()} (${currentPlan.categories.accommodations.percentage}%)`,
      `• Meals & Dining: ${sym}${currentPlan.categories.meals.perPersonTotal.toLocaleString()} (${currentPlan.categories.meals.percentage}%)`,
      `• Local Transit (cabs/metro): ${sym}${currentPlan.categories.localTravel.perPersonTotal.toLocaleString()} (${currentPlan.categories.localTravel.percentage}%)`,
      `• Activities & Tours: ${sym}${currentPlan.categories.activities.perPersonTotal.toLocaleString()} (${currentPlan.categories.activities.percentage}%)`,
      `• Emergency Buffer: ${sym}${currentPlan.categories.emergency.perPersonTotal.toLocaleString()} (${currentPlan.categories.emergency.percentage}%)`,
      `\nGenerated with GoYunetra Smart Budget Calculator`
    ].filter(Boolean).join("\n");

    navigator.clipboard.writeText(lines).then(() => {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    });
  };

  const seasonalDestinations = {
    January: ["Varanasi (India)", "Goa (India)", "Dubai (UAE)", "Rajasthan (India)", "Swiss Alps (Snow)"],
    February: ["Taj Mahal Agra (India)", "Kerala Backwaters", "Amritsar", "Andaman Islands", "Tokyo (Japan)"],
    March: ["Jaipur Pink City", "Rishikesh Yoga", "Darjeeling", "Dubai", "Paris (France)"],
    April: ["Munnar Tea Hills", "Santorini (Greece)", "Bali (Indonesia)", "New York City", "Tokyo Cherry Blossoms"],
    May: ["Leh Ladakh (India)", "Swiss Alps Trekking", "Sikkim & Darjeeling", "Rome (Italy)", "Machu Picchu"],
    June: ["Ladakh High Passes", "Shimla & Manali", "Swiss Alps", "Iceland Midnight Sun", "Cape Town"],
    July: ["Valley of Flowers (India)", "Meghalaya Waterfalls", "Swiss Alps", "Bali Beaches", "Iceland"],
    August: ["Kerala Monsoons", "Udaipur Lake Palace", "Swiss Alps", "Maldives", "Singapore"],
    September: ["Kerala Backwaters", "Darjeeling", "Santorini Sunset", "Rome", "Bali"],
    October: ["Varanasi Ganga Aarti", "Agra Taj Mahal", "Jaipur", "Hampi Ruins", "Pyramids of Giza (Egypt)"],
    November: ["Goa Golden Beaches", "Amritsar Golden Temple", "Andaman Coral Reefs", "Dubai", "Maldives Overwater"],
    December: ["Leh Ladakh Stargazing", "Goa Sunsets", "Kerala Lagoons", "Swiss Alps Skiing", "Dubai Shopping"]
  };

  const packingPresets = {
    heritage: [
      "Passport / Aadhaar / Gov ID & Xerox Copies",
      "Breathable Cotton Clothes & Modest Temple Attire",
      "Comfortable Slip-on Walking Shoes",
      "Sunscreen SPF 50 & Sunglasses",
      "Portable Power Bank & Multi-Plug Adapter",
      "Hand Sanitizer & Wet Wipes",
      "Personal Medical Kit & Hydration Electrolytes",
      "Camera with Extra Memory Card"
    ],
    mountain: [
      "Thermal Base Layers & Down Fleece Jacket",
      "Waterproof Ankle-support Trekking Boots",
      "Woolen Beanie Cap, Gloves & Thermal Socks",
      "High Altitude Diamox / Altitude Medicines",
      "UV Protection Polarized Sunglasses",
      "Refillable Thermos Flask for Hot Water",
      "Lip Balm & Deep Moisturizer Cream",
      "Rain Poncho / Waterproof Backpack Cover"
    ],
    beach: [
      "Lightweight Linen Shirts & Beachwear",
      "Reef-safe Ocean Sunscreen & After-sun Gel",
      "Flip-Flops & Waterproof Beach Bag",
      "Waterproof Phone Pouch for Boat Trips",
      "Quick-dry Microfiber Towel",
      "Snorkeling Mask / Goggles",
      "Sun Hat & Wide-brim Visor",
      "Bioluminescence Torch / Night Light"
    ]
  };

  const toggleCheck = (item) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <section id="tools" style={{ padding: "80px 0", background: "var(--bg-primary)" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <span className="tag-badge tag-purple" style={{ marginBottom: "12px" }}>
            Smart Traveler Toolkit
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "800", color: "var(--text-primary)" }}>
            Interactive Travel Suite
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: "660px", margin: "10px auto 0 auto" }}>
            Plan detailed expenses per person and for your whole group, compare Budget, Comfort & Luxury tiers, discover seasonal peak times, and pack smartly.
          </p>
        </div>

        {/* Tool Navigation Switcher */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "36px",
            flexWrap: "wrap"
          }}
        >
          <button
            onClick={() => setActiveTool("budget")}
            style={{
              padding: "12px 24px",
              borderRadius: "var(--radius-full)",
              background: activeTool === "budget" ? "var(--gradient-primary)" : "var(--bg-card)",
              border: activeTool === "budget" ? "none" : "1px solid var(--border-subtle)",
              color: activeTool === "budget" ? "#ffffff" : "var(--text-primary)",
              fontWeight: "700",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              boxShadow: activeTool === "budget" ? "var(--shadow-neon)" : "none",
              transition: "all var(--transition-fast)"
            }}
          >
            <Calculator size={18} />
            <span>Budget & Currency Estimator</span>
          </button>

          <button
            onClick={() => setActiveTool("season")}
            style={{
              padding: "12px 24px",
              borderRadius: "var(--radius-full)",
              background: activeTool === "season" ? "var(--gradient-primary)" : "var(--bg-card)",
              border: activeTool === "season" ? "none" : "1px solid var(--border-subtle)",
              color: activeTool === "season" ? "#ffffff" : "var(--text-primary)",
              fontWeight: "700",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              boxShadow: activeTool === "season" ? "var(--shadow-neon)" : "none",
              transition: "all var(--transition-fast)"
            }}
          >
            <Calendar size={18} />
            <span>Best Season Matrix</span>
          </button>

          <button
            onClick={() => setActiveTool("packing")}
            style={{
              padding: "12px 24px",
              borderRadius: "var(--radius-full)",
              background: activeTool === "packing" ? "var(--gradient-primary)" : "var(--bg-card)",
              border: activeTool === "packing" ? "none" : "1px solid var(--border-subtle)",
              color: activeTool === "packing" ? "#ffffff" : "var(--text-primary)",
              fontWeight: "700",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              boxShadow: activeTool === "packing" ? "var(--shadow-neon)" : "none",
              transition: "all var(--transition-fast)"
            }}
          >
            <CheckSquare size={18} />
            <span>Smart Packing Checklist</span>
          </button>
        </div>

        {/* TOOL 1: ENHANCED BUDGET & CURRENCY CALCULATOR */}
        {activeTool === "budget" && (
          <div className="glass-card animate-fade-in" style={{ padding: "36px", borderRadius: "var(--radius-lg)" }}>
            {/* Top Toolbar: Action row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "14px",
                marginBottom: "28px",
                paddingBottom: "20px",
                borderBottom: "1px solid var(--border-subtle)"
              }}
            >
              <div>
                <span className="tag-badge tag-cyan" style={{ marginBottom: "6px" }}>
                  Intelligent Group & Per-Person Cost Engine
                </span>
                <h3 style={{ fontSize: "1.45rem", fontWeight: "800", color: "var(--text-primary)" }}>
                  Travel Budget Planner & Tier Comparison
                </h3>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {/* Compare 3 Tiers Button */}
                <button
                  onClick={() => setComparisonModalOpen(true)}
                  className="btn-primary"
                  style={{
                    padding: "9px 18px",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <Columns3 size={16} />
                  <span>Compare 3 Plans Side-by-Side</span>
                </button>

                {/* Copy Summary Button */}
                <button
                  onClick={copyBudgetSummary}
                  className="btn-secondary"
                  style={{
                    padding: "9px 16px",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  {copiedSummary ? <Check size={16} color="var(--accent-sky)" /> : <Copy size={16} />}
                  <span>{copiedSummary ? "Copied!" : "Copy Summary"}</span>
                </button>
              </div>
            </div>

            {/* Main Grid: Parameters on Left, Output & Itemized Breakdown on Right */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "32px",
                alignItems: "start"
              }}
            >
              {/* LEFT COLUMN: Input Controls */}
              <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>1. Trip Parameters & Group Size</span>
                </h4>

                {/* Destination Individual Place Selection */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <label style={{ fontSize: "0.84rem", fontWeight: "600", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <MapPin size={15} color="var(--accent-primary)" />
                      <span>Destination / Individual Place</span>
                    </label>
                    <span style={{ fontSize: "0.78rem", color: "var(--accent-sky)", fontWeight: "700" }}>
                      {budgetData.destinationCountry}
                    </span>
                  </div>
                  <select
                    value={destinationId}
                    onChange={(e) => setDestinationId(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  >
                    <optgroup label="🇮🇳 India (Heritage, Backwaters, Mountains & Beaches)">
                      {groupedDestinations.india.map((d) => (
                        <option key={d.id} value={d.id} style={{ background: "#0f172a", color: "#f8fafc" }}>
                          {d.name} — {d.category} ({d.priceLevel})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="🌍 Global & World Wonders">
                      {groupedDestinations.global.map((d) => (
                        <option key={d.id} value={d.id} style={{ background: "#0f172a", color: "#f8fafc" }}>
                          {d.name}, {d.country} ({d.priceLevel})
                        </option>
                      ))}
                    </optgroup>
                  </select>

                  {/* Selected Place Badge & Tagline */}
                  {budgetData.destination && (
                    <div
                      style={{
                        marginTop: "10px",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(99, 102, 241, 0.08)",
                        border: "1px solid var(--border-subtle)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}
                    >
                      <div style={{ flex: 1, fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
                        <strong style={{ color: "var(--text-primary)" }}>{budgetData.destination.name}</strong> • {budgetData.destination.tagline}
                      </div>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: "700",
                          padding: "2px 8px",
                          borderRadius: "var(--radius-full)",
                          background: "rgba(255, 255, 255, 0.1)",
                          color: "var(--accent-primary)",
                          border: "1px solid var(--border-subtle)",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {budgetData.destination.priceLevel} Tier
                      </span>
                    </div>
                  )}
                </div>

                {/* Travel Style Tiers */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <label style={{ fontSize: "0.84rem", fontWeight: "600", color: "var(--text-secondary)" }}>
                      Travel Style Plan
                    </label>
                    <button
                      onClick={() => setComparisonModalOpen(true)}
                      style={{ background: "none", border: "none", color: "var(--accent-primary)", fontSize: "0.78rem", fontWeight: "700", cursor: "pointer", textDecoration: "underline" }}
                    >
                      Compare all 3
                    </button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                    {Object.keys(TIER_METADATA).map((tierKey) => {
                      const tMeta = TIER_METADATA[tierKey];
                      const isSelected = tier === tierKey;
                      return (
                        <button
                          key={tierKey}
                          onClick={() => setTier(tierKey)}
                          style={{
                            padding: "12px 8px",
                            borderRadius: "var(--radius-sm)",
                            background: isSelected ? tMeta.bgGradient : "var(--bg-input)",
                            border: isSelected ? `2px solid ${tMeta.borderColor}` : "1px solid var(--border-subtle)",
                            color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                            cursor: "pointer",
                            textAlign: "center",
                            transition: "all var(--transition-fast)"
                          }}
                        >
                          <div style={{ fontSize: "0.74rem", fontWeight: "700", color: tMeta.color, marginBottom: "2px" }}>
                            {tMeta.badge}
                          </div>
                          <div style={{ fontSize: "0.85rem", fontWeight: "800" }}>
                            {tMeta.name.split("/")[0]}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Days and Currency */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.84rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "8px" }}>
                      Duration (Days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="90"
                      value={days}
                      onChange={(e) => setDays(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--bg-input)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.84rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "8px" }}>
                      Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--bg-input)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    >
                      {Object.keys(CURRENCY_RATES).map((currCode) => {
                        const currObj = CURRENCY_RATES[currCode];
                        return (
                          <option key={currCode} value={currCode} style={{ background: "#0f172a", color: "#f8fafc" }}>
                            {currObj.symbol} {currObj.code} - {currObj.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Group Size / Number of Travelers */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <label style={{ fontSize: "0.84rem", fontWeight: "600", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Users size={15} color="var(--accent-primary)" />
                      <span>Number of Travelers (Group Size)</span>
                    </label>
                    <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "var(--accent-primary)" }}>
                      {travelers} {travelers === 1 ? "Person (Solo)" : travelers === 2 ? "People (Couple)" : "People (Group)"}
                    </span>
                  </div>

                  {/* Range Slider & Counter */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={travelers}
                      onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      style={{
                        flex: 1,
                        accentColor: "var(--accent-primary)",
                        cursor: "pointer"
                      }}
                    />
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={travelers}
                      onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      style={{
                        width: "60px",
                        padding: "8px",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--bg-input)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        textAlign: "center",
                        outline: "none"
                      }}
                    />
                  </div>

                  {/* Preset quick buttons */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {[
                      { count: 1, label: "Solo" },
                      { count: 2, label: "Couple (Twin Share)" },
                      { count: 4, label: "Family (4)" },
                      { count: 6, label: "Friends (6)" },
                      { count: 10, label: "Group (10)" }
                    ].map((p) => (
                      <button
                        key={p.count}
                        onClick={() => setTravelers(p.count)}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "var(--radius-full)",
                          background: travelers === p.count ? "var(--accent-primary)" : "var(--bg-input)",
                          border: travelers === p.count ? "1px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
                          color: travelers === p.count ? "#ffffff" : "var(--text-secondary)",
                          fontSize: "0.74rem",
                          fontWeight: "600",
                          cursor: "pointer"
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sharing Notice */}
                {travelers > 1 && (
                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: "var(--radius-sm)",
                      background: "rgba(99, 102, 241, 0.08)",
                      border: "1px solid var(--border-subtle)",
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <Sparkles size={16} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                    <span>
                      <strong>Group Savings Applied:</strong> Twin-share room rates & shared cab fares are factored in, reducing individual costs by ~25-30%!
                    </span>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Total Card & Separated Category Breakdown */}
              <div
                style={{
                  background: "var(--bg-glass-heavy)",
                  borderRadius: "var(--radius-md)",
                  padding: "28px",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px"
                }}
              >
                {/* View Switcher: Per Person vs Whole Group */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-primary)" }}>
                    Estimated Grand Total
                  </div>
                  <div style={{ display: "flex", background: "var(--bg-input)", padding: "3px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-subtle)" }}>
                    <button
                      onClick={() => setViewMode("both")}
                      style={{
                        padding: "4px 12px",
                        borderRadius: "var(--radius-full)",
                        background: viewMode === "both" ? "var(--gradient-primary)" : "transparent",
                        border: "none",
                        color: viewMode === "both" ? "#fff" : "var(--text-secondary)",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        cursor: "pointer"
                      }}
                    >
                      Dual View
                    </button>
                    <button
                      onClick={() => setViewMode("perPerson")}
                      style={{
                        padding: "4px 12px",
                        borderRadius: "var(--radius-full)",
                        background: viewMode === "perPerson" ? "var(--gradient-primary)" : "transparent",
                        border: "none",
                        color: viewMode === "perPerson" ? "#fff" : "var(--text-secondary)",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        cursor: "pointer"
                      }}
                    >
                      Per Person
                    </button>
                    {travelers > 1 && (
                      <button
                        onClick={() => setViewMode("group")}
                        style={{
                          padding: "4px 12px",
                          borderRadius: "var(--radius-full)",
                          background: viewMode === "group" ? "var(--gradient-primary)" : "transparent",
                          border: "none",
                          color: viewMode === "group" ? "#fff" : "var(--text-secondary)",
                          fontSize: "0.75rem",
                          fontWeight: "700",
                          cursor: "pointer"
                        }}
                      >
                        Group Total
                      </button>
                    )}
                  </div>
                </div>

                {/* Primary Cost Highlights */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: viewMode === "both" && travelers > 1 ? "1fr 1fr" : "1fr",
                    gap: "16px",
                    background: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "var(--radius-sm)",
                    padding: "20px",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                  {/* Per Person Box */}
                  {(viewMode === "both" || viewMode === "perPerson") && (
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "700" }}>
                        Per Person Total
                      </span>
                      <div style={{ fontSize: "2.1rem", fontWeight: "800", color: "var(--text-primary)", margin: "4px 0" }}>
                        {currentPlan.perPerson.formattedTotal}
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                        ~{currentPlan.perPerson.formattedDaily} / day for {days} days
                      </div>
                    </div>
                  )}

                  {/* Whole Group Box */}
                  {travelers > 1 && (viewMode === "both" || viewMode === "group") && (
                    <div style={{ borderLeft: viewMode === "both" ? "1px solid rgba(255, 255, 255, 0.1)" : "none", paddingLeft: viewMode === "both" ? "16px" : "0" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Users size={12} /> Whole Group ({travelers})
                      </span>
                      <div style={{ fontSize: "2.1rem", fontWeight: "800", color: "var(--accent-primary)", margin: "4px 0" }}>
                        {currentPlan.groupTotal.formattedTotal}
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                        ~{currentPlan.groupTotal.formattedDaily} / day total
                      </div>
                    </div>
                  )}
                </div>

                {/* Visual Ratio Progress Bar */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.76rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                    <span>Budget Allocation Ratio</span>
                    <span>100% Comprehensive</span>
                  </div>
                  <div style={{ height: "10px", width: "100%", borderRadius: "var(--radius-full)", display: "flex", overflow: "hidden", background: "rgba(255, 255, 255, 0.05)" }}>
                    <div style={{ width: `${currentPlan.categories.transport.percentage}%`, background: "var(--accent-sky)" }} title="Transport" />
                    <div style={{ width: `${currentPlan.categories.accommodations.percentage}%`, background: "var(--accent-primary)" }} title="Accommodations" />
                    <div style={{ width: `${currentPlan.categories.meals.percentage}%`, background: "var(--accent-amber)" }} title="Meals" />
                    <div style={{ width: `${currentPlan.categories.localTravel.percentage}%`, background: "var(--accent-violet)" }} title="Local Travel" />
                    <div style={{ width: `${currentPlan.categories.activities.percentage}%`, background: "var(--accent-coral)" }} title="Activities" />
                    <div style={{ width: `${currentPlan.categories.emergency.percentage}%`, background: "var(--accent-rose)" }} title="Emergency" />
                  </div>
                </div>

                {/* Separated 6 Categories Breakdown */}
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "14px" }}>
                    Separated Expense Breakdown by Category
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {Object.keys(CATEGORY_METADATA).map((catKey) => {
                      const catMeta = CATEGORY_METADATA[catKey];
                      const catData = currentPlan.categories[catKey];

                      return (
                        <div
                          key={catKey}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px 14px",
                            borderRadius: "var(--radius-sm)",
                            background: "var(--bg-glass)",
                            border: "1px solid var(--border-subtle)"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "8px",
                                background: "rgba(255, 255, 255, 0.05)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                              }}
                            >
                              {getCategoryIcon(catKey)}
                            </div>
                            <div>
                              <div style={{ fontSize: "0.86rem", fontWeight: "700", color: "var(--text-primary)" }}>
                                {catMeta.name}
                              </div>
                              <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>
                                {catMeta.subtitle}
                              </div>
                            </div>
                          </div>

                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "0.92rem", fontWeight: "800", color: "var(--text-primary)" }}>
                              {sym}{catData.perPersonTotal.toLocaleString()}
                              <span style={{ fontSize: "0.75rem", fontWeight: "500", color: "var(--text-muted)", marginLeft: "4px" }}>
                                / person
                              </span>
                            </div>
                            {travelers > 1 && (
                              <div style={{ fontSize: "0.76rem", color: "var(--accent-primary)", fontWeight: "600" }}>
                                Group Total: {sym}{catData.groupTotal.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Security and Assurance Note */}
                <div style={{ paddingTop: "14px", borderTop: "1px solid var(--border-subtle)", fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Shield size={16} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                  <span>
                    Emergency buffer includes contingency reserves for medical, minor delays, and local travel insurance.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 2: BEST SEASON MATRIX */}
        {activeTool === "season" && (
          <div
            className="glass-card animate-fade-in"
            style={{
              padding: "36px",
              borderRadius: "var(--radius-lg)"
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "16px" }}>
              Select Travel Month
            </h3>

            {/* Months Pills Grid */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
              {Object.keys(seasonalDestinations).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "var(--radius-full)",
                    background: selectedMonth === m ? "var(--gradient-primary)" : "var(--bg-glass)",
                    border: selectedMonth === m ? "none" : "1px solid var(--border-subtle)",
                    color: selectedMonth === m ? "#ffffff" : "var(--text-secondary)",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)"
                  }}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Recommended Spots */}
            <div style={{ background: "var(--bg-glass-heavy)", borderRadius: "var(--radius-md)", padding: "24px", border: "1px solid var(--border-subtle)" }}>
              <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={18} color="var(--accent-amber)" />
                <span>Peak Season Destinations for {selectedMonth}</span>
              </h4>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
                {seasonalDestinations[selectedMonth].map((place, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "var(--bg-input)",
                      padding: "14px 18px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-subtle)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      color: "var(--text-primary)"
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--accent-primary)" />
                    <span>{place}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TOOL 3: SMART PACKING CHECKLIST */}
        {activeTool === "packing" && (
          <div
            className="glass-card animate-fade-in"
            style={{
              padding: "36px",
              borderRadius: "var(--radius-lg)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--text-primary)" }}>
                  Smart Packing Checklist
                </h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Interactive gear guide customized for your trip style
                </span>
              </div>

              {/* Preset Selector */}
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { id: "heritage", label: "🏛️ Heritage & Cultural" },
                  { id: "mountain", label: "⛰️ Mountain Trekking" },
                  { id: "beach", label: "🏖️ Beach & Islands" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPackType(item.id)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "var(--radius-full)",
                      background: packType === item.id ? "var(--gradient-primary)" : "var(--bg-glass)",
                      border: packType === item.id ? "none" : "1px solid var(--border-subtle)",
                      color: packType === item.id ? "#ffffff" : "var(--text-secondary)",
                      fontSize: "0.82rem",
                      fontWeight: "700",
                      cursor: "pointer"
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Checklist Items */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
              {packingPresets[packType].map((item, idx) => {
                const isChecked = !!checkedItems[item];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(item)}
                    style={{
                      padding: "14px 18px",
                      borderRadius: "var(--radius-sm)",
                      background: isChecked ? "rgba(99, 102, 241, 0.15)" : "var(--bg-input)",
                      border: isChecked ? "1px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)"
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      style={{ width: "18px", height: "18px", accentColor: "var(--accent-primary)", cursor: "pointer" }}
                    />
                    <span style={{ fontSize: "0.88rem", fontWeight: "500", color: isChecked ? "var(--accent-primary)" : "var(--text-primary)", textDecoration: isChecked ? "line-through" : "none" }}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Side-by-Side Comparison Modal */}
      <BudgetTierComparisonModal
        isOpen={comparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
        budgetData={budgetData}
        onSelectTier={(selectedTier) => setTier(selectedTier)}
      />
    </section>
  );
};
