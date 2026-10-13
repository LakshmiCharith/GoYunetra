import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, AlertCircle, RefreshCw, Grid3X3 } from "lucide-react";
import { DESTINATIONS, CATEGORIES } from "../data/destinations";
import { DestinationCard } from "./DestinationCard";

export const DestinationExplorer = ({ onSelectDestination, initialSearch = "" }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedContinent, setSelectedContinent] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const continents = ["all", "India", "Asia", "Europe", "Americas", "Africa"];

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        dest.name.toLowerCase().includes(q) ||
        dest.country.toLowerCase().includes(q) ||
        dest.description?.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "all" ? true
        : selectedCategory === "India" ? dest.country === "India" || dest.continent === "India"
        : dest.category === selectedCategory;

      const matchesContinent = selectedContinent === "all" || dest.continent === selectedContinent;

      return matchesSearch && matchesCategory && matchesContinent;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedContinent, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedContinent("all");
    setSortBy("rating");
  };

  const pillBase = {
    padding: "6px 16px", borderRadius: "9999px",
    fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: "600",
    cursor: "pointer", transition: "all 0.18s ease", border: "1px solid transparent"
  };

  return (
    <section id="explorer" style={{ padding: "80px 0", position: "relative" }}>
      {/* Soothing top divider */}
      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(99, 102, 241,0.35), rgba(52,211,153,0.25), transparent)", marginBottom: "80px" }} />

      <div className="container">
        {/* ── SECTION HEADER ── */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="section-chip" style={{ marginBottom: "18px" }}>
            <Grid3X3 size={13} />
            CURATED DIRECTORY // 30+ DESTINATIONS
          </div>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: "900",
            color: "var(--text-primary)",
            letterSpacing: "-0.035em",
            marginBottom: "14px"
          }}>
            Explore Exceptional<br />
            <span style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Destinations Across Continents
            </span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto" }}>
            Filter by travel style and region, track live local weather, and plan unforgettable journeys.
          </p>
        </div>

        {/* ── FILTER PANEL ── */}
        <div style={{
          background: "var(--bg-card)",
          backdropFilter: "blur(20px)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "18px",
          padding: "24px",
          marginBottom: "40px",
          display: "flex", flexDirection: "column", gap: "18px",
          position: "relative", overflow: "hidden",
          boxShadow: "var(--shadow-sm)"
        }}>
          {/* Subtle top accent */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #6366f1, #8b5cf6, #f59e0b)" }} />

          {/* Search + Sort row */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: "260px", position: "relative" }}>
              <Search size={16} color="var(--accent-primary)" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search by city, country, or interest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 16px 11px 44px",
                  borderRadius: "9999px",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  outline: "none",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent-primary)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(99, 102, 241, 0.2)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <SlidersHorizontal size={15} color="var(--accent-primary)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "11px 18px", borderRadius: "9999px",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
                  outline: "none", cursor: "pointer"
                }}
              >
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical (A – Z)</option>
              </select>
            </div>
          </div>

          {/* Category pills */}
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.64rem", color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "10px", textTransform: "uppercase" }}>
              Experience //
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      ...pillBase,
                      background: active ? "var(--gradient-primary)" : "rgba(99, 102, 241, 0.07)",
                      borderColor: active ? "transparent" : "var(--border-subtle)",
                      color: active ? "#ffffff" : "var(--text-secondary)",
                      boxShadow: active ? "0 2px 10px rgba(99, 102, 241, 0.35)" : "none"
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Continent pills */}
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.64rem", color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "10px", textTransform: "uppercase" }}>
              Region //
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {continents.map((cont) => {
                const active = selectedContinent === cont;
                return (
                  <button
                    key={cont}
                    onClick={() => setSelectedContinent(cont)}
                    style={{
                      ...pillBase,
                      background: active ? "rgba(99, 102, 241, 0.16)" : "transparent",
                      borderColor: active ? "var(--accent-primary)" : "var(--border-subtle)",
                      color: active ? "var(--accent-primary)" : "var(--text-muted)"
                    }}
                  >
                    {cont === "all" ? "All Regions" : cont}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
              SHOWING // <span style={{ color: "var(--accent-primary)", fontWeight: "700" }}>{filteredDestinations.length}</span> DESTINATIONS
            </span>
            {(searchQuery || selectedCategory !== "all" || selectedContinent !== "all") && (
              <button
                onClick={handleResetFilters}
                style={{ ...pillBase, background: "rgba(245, 158, 11, 0.1)", borderColor: "rgba(245, 158, 11, 0.3)", color: "var(--accent-gold)", padding: "4px 14px" }}
              >
                <RefreshCw size={12} style={{ marginRight: "4px" }} />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* ── DESTINATION GRID ── */}
        {filteredDestinations.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "26px", alignItems: "stretch" }}>
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} onClick={onSelectDestination} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center", padding: "70px 20px",
            background: "var(--bg-card)", backdropFilter: "blur(20px)",
            border: "1px solid var(--border-subtle)", borderRadius: "18px",
            maxWidth: "520px", margin: "0 auto"
          }}>
            <AlertCircle size={44} color="var(--accent-gold)" style={{ marginBottom: "16px" }} />
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.2rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "10px" }}>
              No Destinations Found
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.87rem", color: "var(--text-secondary)", marginBottom: "22px" }}>
              Try loosening your search terms or clearing region filters.
            </p>
            <button onClick={handleResetFilters} style={{ ...pillBase, background: "var(--gradient-primary)", color: "#fff", border: "none", padding: "10px 24px", boxShadow: "0 2px 12px rgba(99, 102, 241, 0.35)" }}>
              <RefreshCw size={14} style={{ marginRight: "6px" }} />
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
