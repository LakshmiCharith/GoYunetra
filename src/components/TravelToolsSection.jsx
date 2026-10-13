import React, { useState } from "react";
import { Calculator, Calendar, CheckSquare, DollarSign, Sparkles, Compass, CheckCircle2, Shield, RefreshCw } from "lucide-react";

export const TravelToolsSection = () => {
  const [activeTool, setActiveTool] = useState("budget");

  // Budget Calculator state
  const [region, setRegion] = useState("india");
  const [tier, setTier] = useState("mid");
  const [days, setDays] = useState(5);
  const [currency, setCurrency] = useState("INR");

  // Best Season matrix state
  const [selectedMonth, setSelectedMonth] = useState("October");

  // Packing List state
  const [packType, setPackType] = useState("heritage");
  const [checkedItems, setCheckedItems] = useState({});

  // Currency multipliers relative to USD base
  const exchangeRates = {
    INR: 83.5,
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 155.0
  };

  const currencySymbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥"
  };

  // Base daily USD cost by region & tier
  const baseRates = {
    india: { budget: 35, mid: 70, luxury: 160 },
    asia: { budget: 45, mid: 100, luxury: 250 },
    europe: { budget: 80, mid: 180, luxury: 400 },
    americas: { budget: 90, mid: 220, luxury: 450 },
    me: { budget: 70, mid: 170, luxury: 380 }
  };

  const calculatedDailyUSD = baseRates[region][tier];
  const rate = exchangeRates[currency];
  const sym = currencySymbols[currency];

  const totalCost = Math.round(calculatedDailyUSD * days * rate);
  const dailyCost = Math.round(calculatedDailyUSD * rate);
  const accommodation = Math.round(totalCost * 0.45);
  const food = Math.round(totalCost * 0.3);
  const transport = Math.round(totalCost * 0.25);

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
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: "620px", margin: "10px auto 0 auto" }}>
            Estimate trip budgets across currencies, pick peak seasonal weather windows, and generate custom packing checklists.
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

        {/* TOOL 1: BUDGET & CURRENCY CALCULATOR */}
        {activeTool === "budget" && (
          <div
            className="glass-card animate-fade-in"
            style={{
              padding: "36px",
              borderRadius: "var(--radius-lg)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "36px"
            }}
          >
            {/* Input Controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--text-primary)" }}>
                Trip Parameters
              </h3>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "8px" }}>
                  Destination Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
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
                  <option value="india">🇮🇳 India (Heritage, Backwaters, Mountains)</option>
                  <option value="asia">🌏 Southeast Asia (Bali, Tokyo, Singapore)</option>
                  <option value="europe">🌍 Europe (Paris, Santorini, Swiss Alps)</option>
                  <option value="americas">🌎 Americas (New York, Machu Picchu)</option>
                  <option value="me">🕌 Middle East & Africa (Dubai, Cairo, Cape Town)</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "8px" }}>
                  Travel Style
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[
                    { id: "budget", label: "Backpacker" },
                    { id: "mid", label: "Mid-Range Comfort" },
                    { id: "luxury", label: "Luxury Heritage" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setTier(item.id)}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        borderRadius: "var(--radius-sm)",
                        background: tier === item.id ? "rgba(99, 102, 241, 0.15)" : "var(--bg-input)",
                        border: tier === item.id ? "1px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
                        color: tier === item.id ? "var(--accent-primary)" : "var(--text-secondary)",
                        fontSize: "0.8rem",
                        fontWeight: "700",
                        cursor: "pointer"
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "8px" }}>
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={days}
                    onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
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
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "8px" }}>
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
                    <option value="INR">₹ INR (Indian Rupee)</option>
                    <option value="USD">$ USD (US Dollar)</option>
                    <option value="EUR">€ EUR (Euro)</option>
                    <option value="GBP">£ GBP (British Pound)</option>
                    <option value="JPY">¥ JPY (Japanese Yen)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Calculated Breakdown Display */}
            <div
              style={{
                background: "var(--bg-glass-heavy)",
                borderRadius: "var(--radius-md)",
                padding: "28px",
                border: "1px solid var(--border-subtle)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <span className="tag-badge tag-cyan" style={{ marginBottom: "12px" }}>
                  Estimated Expenses
                </span>
                <div style={{ fontSize: "2.4rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "4px" }}>
                  {sym}{totalCost.toLocaleString()}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
                  Total for {days} Days (~{sym}{dailyCost.toLocaleString()} / day)
                </div>

                {/* Expense Breakdown List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem" }}>
                    <span style={{ color: "var(--text-secondary)" }}>🏨 Stay & Accommodations (45%)</span>
                    <strong style={{ color: "var(--text-primary)" }}>{sym}{accommodation.toLocaleString()}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem" }}>
                    <span style={{ color: "var(--text-secondary)" }}>🍲 Food & Dining (30%)</span>
                    <strong style={{ color: "var(--text-primary)" }}>{sym}{food.toLocaleString()}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem" }}>
                    <span style={{ color: "var(--text-secondary)" }}>🚕 Transit & Entry Tickets (25%)</span>
                    <strong style={{ color: "var(--text-primary)" }}>{sym}{transport.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border-subtle)", fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
                <Shield size={14} color="var(--accent-primary)" />
                <span>Estimates include average mid-season rates and local street dining.</span>
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
    </section>
  );
};
