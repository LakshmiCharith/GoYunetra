/**
 * Itinerary AI Output Validator & Normalizer
 * Enforces strict schema validation, category normalization (Food, Nature, History, Adventure),
 * coordinate sanity checks, and safe fallback recovery.
 */

export const THEME_CATEGORIES = {
  Food: {
    id: "Food",
    label: "Food & Culinary",
    icon: "Utensils",
    emoji: "🍲",
    color: "var(--accent-amber)",
    badgeClass: "tag-amber"
  },
  Nature: {
    id: "Nature",
    label: "Nature & Outdoors",
    icon: "Trees",
    emoji: "🌲",
    color: "var(--accent-sky)",
    badgeClass: "tag-cyan"
  },
  History: {
    id: "History",
    label: "History & Heritage",
    icon: "Landmark",
    emoji: "🏛️",
    color: "var(--accent-purple)",
    badgeClass: "tag-purple"
  },
  Adventure: {
    id: "Adventure",
    label: "Adventure & Thrills",
    icon: "Flame",
    emoji: "🧗",
    color: "var(--accent-coral)",
    badgeClass: "tag-rose"
  }
};

/**
 * Infer activity theme category from title, description, or location text
 */
export function inferCategory(text = "") {
  const lower = text.toLowerCase();
  if (lower.includes("food") || lower.includes("eat") || lower.includes("dine") || lower.includes("restaurant") || lower.includes("cafe") || lower.includes("culinary") || lower.includes("breakfast") || lower.includes("lunch") || lower.includes("dinner") || lower.includes("thali") || lower.includes("chaat") || lower.includes("bakery") || lower.includes("taste") || lower.includes("snack") || lower.includes("market street")) {
    return "Food";
  }
  if (lower.includes("fort") || lower.includes("palace") || lower.includes("temple") || lower.includes("monument") || lower.includes("museum") || lower.includes("ruin") || lower.includes("heritage") || lower.includes("history") || lower.includes("ancient") || lower.includes("unesco") || lower.includes("church") || lower.includes("cathedral") || lower.includes("tomb")) {
    return "History";
  }
  if (lower.includes("trek") || lower.includes("hike") || lower.includes("raft") || lower.includes("climb") || lower.includes("safari") || lower.includes("cycle") || lower.includes("boat ride") || lower.includes("zipline") || lower.includes("adventure") || lower.includes("dive") || lower.includes("surf") || lower.includes("paraglid")) {
    return "Adventure";
  }
  if (lower.includes("nature") || lower.includes("garden") || lower.includes("lake") || lower.includes("sunset") || lower.includes("sunrise") || lower.includes("viewpoint") || lower.includes("park") || lower.includes("waterfall") || lower.includes("forest") || lower.includes("mountain") || lower.includes("hill") || lower.includes("beach") || lower.includes("river") || lower.includes("scenic")) {
    return "Nature";
  }
  return "History"; // default fallback
}

/**
 * Validates and repairs raw AI JSON string or object
 */
export function validateAndNormalizeItinerary(
  rawInput,
  destinationName = "Destination",
  requestedDays = 3,
  budget = "comfort",
  destinationCoords = { lat: 27.1751, lon: 78.0421 }
) {
  let parsed = null;

  if (typeof rawInput === "string") {
    try {
      // 1. Try stripping markdown code fences ```json ... ```
      let cleaned = rawInput.trim();
      const codeFenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (codeFenceMatch) {
        cleaned = codeFenceMatch[1].trim();
      } else {
        const firstBrace = cleaned.indexOf("{");
        const lastBrace = cleaned.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace !== -1) {
          cleaned = cleaned.substring(firstBrace, lastBrace + 1);
        }
      }
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.warn("Failed to parse JSON from AI itinerary output, using curated fallback generator:", err);
      parsed = null;
    }
  } else if (typeof rawInput === "object" && rawInput !== null) {
    parsed = rawInput;
  }

  const baseLat = (destinationCoords && destinationCoords.lat) ? Number(destinationCoords.lat) : 27.1751;
  const baseLon = (destinationCoords && destinationCoords.lon) ? Number(destinationCoords.lon) : 78.0421;

  // If parsed data is completely missing or lacks days array, construct rich curated response
  if (!parsed || !Array.isArray(parsed.days) || parsed.days.length === 0) {
    return generateCuratedFallbackItinerary(destinationName, requestedDays, budget, baseLat, baseLon);
  }

  // Normalize top-level fields
  const title = (typeof parsed.title === "string" && parsed.title.trim())
    ? parsed.title.trim()
    : `${requestedDays}-Day Curated ${destinationName} Experience`;

  const summary = (typeof parsed.summary === "string" && parsed.summary.trim())
    ? parsed.summary.trim()
    : `An immersive ${requestedDays}-day journey across ${destinationName} featuring balanced food, nature, history, and adventure stops.`;

  const totalEstimatedCost = (typeof parsed.totalEstimatedCost === "string" && parsed.totalEstimatedCost.trim())
    ? parsed.totalEstimatedCost.trim()
    : `₹${requestedDays * 3500} - ₹${requestedDays * 6500} ($${requestedDays * 45} - $${requestedDays * 80})`;

  // Normalize each day
  const normalizedDays = parsed.days.map((dayItem, dayIdx) => {
    const dayNumber = Number(dayItem.day) || (dayIdx + 1);
    const dayTheme = (typeof dayItem.theme === "string" && dayItem.theme.trim())
      ? dayItem.theme.trim()
      : `Day ${dayNumber}: Highlights & Culture`;

    const dayBudget = (typeof dayItem.budget === "string" && dayItem.budget.trim())
      ? dayItem.budget.trim()
      : `₹${3200 + dayIdx * 400} ($${40 + dayIdx * 5})`;

    const foodTip = (typeof dayItem.foodTip === "string" && dayItem.foodTip.trim())
      ? dayItem.foodTip.trim()
      : `Sample local authentic street dishes and signature beverages near ${destinationName}.`;

    // Process activities
    let activities = [];

    if (Array.isArray(dayItem.activities) && dayItem.activities.length > 0) {
      activities = dayItem.activities.map((act, actIdx) => {
        const timeSlot = ["Morning", "Afternoon", "Evening"][actIdx % 3] || "Morning";
        const titleText = (typeof act.title === "string" && act.title.trim()) ? act.title.trim() : `Spot ${actIdx + 1}`;
        const locationName = (typeof act.locationName === "string" && act.locationName.trim())
          ? act.locationName.trim()
          : (typeof act.location === "string" && act.location.trim())
            ? act.location.trim()
            : `${destinationName} Landmark ${actIdx + 1}`;

        const rawCat = act.category ? String(act.category).trim() : "";
        const category = ["Food", "Nature", "History", "Adventure"].includes(rawCat)
          ? rawCat
          : inferCategory(`${titleText} ${locationName} ${act.description || ""}`);

        // Validate coordinates: ensure numbers and slight realistic offsets
        let actLat = Number(act.lat);
        let actLon = Number(act.lon);
        if (isNaN(actLat) || isNaN(actLon) || actLat === 0) {
          // generate deterministic pseudo-random offset based on day & activity index
          const angle = (dayIdx * 2.1 + actIdx * 1.5);
          const dist = 0.008 + (actIdx * 0.006);
          actLat = baseLat + Math.sin(angle) * dist;
          actLon = baseLon + Math.cos(angle) * dist;
        }

        return {
          id: act.id || `d${dayNumber}-act${actIdx + 1}`,
          timeSlot: act.timeSlot || timeSlot,
          timeLabel: act.timeLabel || (actIdx === 0 ? "08:30 AM – 11:30 AM" : actIdx === 1 ? "12:30 PM – 04:00 PM" : "05:30 PM – 08:30 PM"),
          title: titleText,
          category,
          locationName,
          description: (typeof act.description === "string" && act.description.trim()) ? act.description.trim() : `Explore ${locationName} and enjoy the regional experience.`,
          cost: act.cost ? String(act.cost) : (actIdx === 1 ? "₹450 / $6 (lunch)" : "₹250 / $3 (entry)"),
          lat: Number(actLat.toFixed(5)),
          lon: Number(actLon.toFixed(5)),
          completed: Boolean(act.completed)
        };
      });
    } else {
      // Legacy structure had morning, afternoon, evening as string fields
      const slots = [
        { key: "morning", slot: "Morning", time: "08:30 AM – 11:30 AM", defaultCat: "History" },
        { key: "afternoon", slot: "Afternoon", time: "12:30 PM – 04:00 PM", defaultCat: "Food" },
        { key: "evening", slot: "Evening", time: "05:30 PM – 08:30 PM", defaultCat: "Nature" }
      ];

      activities = slots.map((s, actIdx) => {
        const textVal = dayItem[s.key] || `Explore ${destinationName} scenic landmark`;
        const category = inferCategory(textVal) || s.defaultCat;
        const angle = (dayIdx * 2.2 + actIdx * 1.6);
        const dist = 0.009 + (actIdx * 0.006);

        return {
          id: `d${dayNumber}-act${actIdx + 1}`,
          timeSlot: s.slot,
          timeLabel: s.time,
          title: textVal.length > 50 ? `${textVal.substring(0, 48)}...` : textVal,
          category,
          locationName: `${destinationName} Stop ${actIdx + 1}`,
          description: textVal,
          cost: s.key === "afternoon" ? "₹500 / $6" : "₹200 / $3",
          lat: Number((baseLat + Math.sin(angle) * dist).toFixed(5)),
          lon: Number((baseLon + Math.cos(angle) * dist).toFixed(5)),
          completed: false
        };
      });
    }

    // Extract unique location names for day display
    const locations = activities.map((a) => a.locationName);

    return {
      day: dayNumber,
      theme: dayTheme,
      budget: dayBudget,
      foodTip,
      locations,
      activities
    };
  });

  return {
    title,
    summary,
    totalEstimatedCost,
    budgetTier: budget,
    themes: ["Food", "Nature", "History", "Adventure"],
    days: normalizedDays
  };
}

/**
 * Builds rich, curated fallback itinerary when offline or AI call is unavailable
 */
export function generateCuratedFallbackItinerary(
  destinationName = "Destination",
  days = 3,
  budget = "comfort",
  baseLat = 27.1751,
  baseLon = 78.0421
) {
  const dayTemplates = [
    {
      theme: "Ancient Heritage Foundations & Royal Palaces",
      acts: [
        { slot: "Morning", title: "Sunrise Heritage & Architectural Walking Tour", cat: "History", loc: "Old Fort & Monument Gateway", desc: "Witness golden morning dawn over ancient battlements and ornate arches with minimal crowds.", cost: "₹100 / $2" },
        { slot: "Afternoon", title: "Heritage Market Culinary Tasting Walk", cat: "Food", loc: "Bazaar Spice & Sweets Alley", desc: "Sample authentic regional delicacies, piping hot street fritters, and freshly whipped lassi.", cost: "₹450 / $6" },
        { slot: "Evening", title: "Sunset Riverbank Panoramic Viewpoint", cat: "Nature", loc: "Mehtab Gardens Promenade", desc: "Relax as the twilight sun reflects off monument spires across calm waters.", cost: "₹50 / $1" }
      ],
      tip: "Try the signature local breakfast bread and cardamom tea near the eastern gateway."
    },
    {
      theme: "Nature Wonders, Lake Walks & Local Flavors",
      acts: [
        { slot: "Morning", title: "Botanical Nature Sanctuary & Bird Sanctuary", cat: "Nature", loc: "Valley Lake Reserve", desc: "Crisp mountain/lake walk surrounded by lush greenery, native birds, and walking trails.", cost: "₹150 / $2" },
        { slot: "Afternoon", title: "Traditional Thali Feast & Artisan Craft Guilds", cat: "Food", loc: "Heritage Crafts & Dining Pavilion", desc: "Enjoy a multi-course royal thali served on traditional brass platters.", cost: "₹650 / $8" },
        { slot: "Evening", title: "Thrilling Twilight Boat Cruise or Desert Ride", cat: "Adventure", loc: "Waterway Marina / Dunes", desc: "Glide along the river or dunes with live folk musicians playing soulful acoustic melodies.", cost: "₹800 / $10" }
      ],
      tip: "Ask for locally harvested roasted nuts and regional dried fruit sweets."
    },
    {
      theme: "Adventure Peaks, Cultural Bazaars & Evening Lights",
      acts: [
        { slot: "Morning", title: "High Ridge Trek & Fortress Ramparts", cat: "Adventure", loc: "Cliffside Citadel Trail", desc: "Moderate scenic hike ascending the historic watchtowers for 360-degree panoramic valley views.", cost: "₹200 / $3" },
        { slot: "Afternoon", title: "Artisan Textile & Pottery Workshop", cat: "History", loc: "Historic Artisan Quarter", desc: "Observe master artisans hand-carving wooden block prints and marble stone inlays.", cost: "Free / Tips" },
        { slot: "Evening", title: "Rooftop Starlight Dinner & Cultural Sitar Recital", cat: "Food", loc: "Rooftop Haveli Dining Lounge", desc: "Savor chef-recommended regional curries and freshly baked flatbreads under fairy lights.", cost: "₹950 / $12" }
      ],
      tip: "Order the slow-cooked regional dessert pudding and saffron infused milk."
    },
    {
      theme: "Hidden Sacred Temples, Waterfalls & Eco Trails",
      acts: [
        { slot: "Morning", title: "Sacred Cascading Waterfalls & Pine Grove Trek", cat: "Nature", loc: "Forest Cascades Sanctuary", desc: "Refresh near pristine cascading waterfalls surrounded by dense cedar woods and rocky pools.", cost: "₹50 / $1" },
        { slot: "Afternoon", title: "Rustic Village Farm-to-Table Lunch", cat: "Food", loc: "Eco Organic Country Farmhouse", desc: "Wholesome organic earthen pot lunch prepared using heirloom regional ingredients.", cost: "₹550 / $7" },
        { slot: "Evening", title: "Ancient Temple Bells & River Aarti Ceremony", cat: "History", loc: "Sacred Ghat Steps", desc: "Witness the mesmerizing synchronized lamp rituals and ancient Vedic chants by the waterside.", cost: "Free / Donation" }
      ],
      tip: "Sit quietly near the river ghats 20 minutes before aarti for optimal view."
    },
    {
      theme: "Thrilling Expeditions & Golden Hour Celebrations",
      acts: [
        { slot: "Morning", title: "Whitewater Rapids / Off-Road Safari Quest", cat: "Adventure", loc: "Adventure Base Canyon", desc: "Exhilarating guided adventure through rapids or rocky backcountry trails with certified safety gear.", cost: "₹1,200 / $15" },
        { slot: "Afternoon", title: "Local Spice Farm & Herbal Garden Tour", cat: "Nature", loc: "Highland Spice Estate", desc: "Guided walk among vanilla, black pepper, and cardamom plants with fresh herbal brew tastings.", cost: "₹300 / $4" },
        { slot: "Evening", title: "Grand Farewell Sunset Dinner & Folk Dance", cat: "Food", loc: "Royal Courtyard Amphitheatre", desc: "Celebrate trip memories with traditional fire dancers, sitarists, and chef banquet specials.", cost: "₹1,200 / $15" }
      ],
      tip: "Purchase vacuum-sealed fresh spices directly from the estate store for superior flavor."
    }
  ];

  const generatedDays = [];
  for (let d = 1; d <= days; d++) {
    const template = dayTemplates[(d - 1) % dayTemplates.length];
    const activities = template.acts.map((act, i) => {
      const angle = (d * 1.9 + i * 1.8);
      const dist = 0.007 + (i * 0.005);
      return {
        id: `d${d}-act${i + 1}`,
        timeSlot: act.slot,
        timeLabel: i === 0 ? "08:30 AM – 11:30 AM" : i === 1 ? "12:30 PM – 03:30 PM" : "05:30 PM – 08:30 PM",
        title: `${act.title} (${destinationName})`,
        category: act.cat,
        locationName: `${destinationName} - ${act.loc}`,
        description: act.desc,
        cost: act.cost,
        lat: Number((baseLat + Math.sin(angle) * dist).toFixed(5)),
        lon: Number((baseLon + Math.cos(angle) * dist).toFixed(5)),
        completed: false
      };
    });

    generatedDays.push({
      day: d,
      theme: template.theme,
      budget: `₹${d * 1100 + 2400} ($${d * 15 + 30})`,
      foodTip: template.tip,
      locations: activities.map((a) => a.locationName),
      activities
    });
  }

  return {
    title: `${days}-Day ${destinationName} Curated Experience`,
    summary: `A carefully balanced ${days}-day itinerary blending Food, Nature, History, and Adventure tailored for ${budget} travel in ${destinationName}.`,
    totalEstimatedCost: `₹${days * 3500} - ₹${days * 6500} ($${days * 45} - $${days * 80})`,
    budgetTier: budget,
    themes: ["Food", "Nature", "History", "Adventure"],
    days: generatedDays
  };
}
