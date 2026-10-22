/**
 * Comprehensive Travel Budget Calculator Service
 * Calculates separated estimated costs for INDIVIDUAL PLACES:
 * - Transport (flights, trains, intercity transfers)
 * - Accommodations (hotels, hostels, resorts)
 * - Meals (breakfast, lunch, street food, dinner)
 * - Local Travel (metro, cabs, rentals, auto-rickshaws)
 * - Activities (entry tickets, guided tours, adventure sports)
 * - Emergency Expenses (buffer fund, medical, travel insurance)
 * 
 * Supports per-person and whole-group calculations, currency conversions,
 * and comprehensive Budget vs Comfort vs Luxury tier comparisons for each specific place.
 */

import { DESTINATIONS } from "../data/destinations";

export const CURRENCY_RATES = {
  INR: { code: "INR", symbol: "₹", rate: 83.5, name: "Indian Rupee" },
  USD: { code: "USD", symbol: "$", rate: 1.0, name: "US Dollar" },
  EUR: { code: "EUR", symbol: "€", rate: 0.92, name: "Euro" },
  GBP: { code: "GBP", symbol: "£", rate: 0.78, name: "British Pound" },
  JPY: { code: "JPY", symbol: "¥", rate: 155.0, name: "Japanese Yen" },
  AUD: { code: "AUD", symbol: "A$", rate: 1.52, name: "Australian Dollar" },
  CAD: { code: "CAD", symbol: "C$", rate: 1.36, name: "Canadian Dollar" },
  AED: { code: "AED", symbol: "د.إ", rate: 3.67, name: "UAE Dirham" }
};

/**
 * Individual Destination Tailored Base Rates (USD per person/day)
 * Calibrated specifically for each destination's living and tourism cost index.
 */
export const DESTINATION_RATES = {
  // 🇮🇳 INDIA - PREMIER HERITAGE & PALACES
  "taj-mahal-agra": {
    budget: { transport: 6, accommodations: 12, meals: 8, localTravel: 4, activities: 5, emergency: 3 }, // $38/day (~₹3,170)
    comfort: { transport: 18, accommodations: 38, meals: 22, localTravel: 10, activities: 12, emergency: 7 }, // $107/day (~₹8,900)
    luxury: { transport: 50, accommodations: 130, meals: 50, localTravel: 25, activities: 30, emergency: 18 } // $303/day (ITC Mughal/Oberoi)
  },
  "jaipur-rajasthan": {
    budget: { transport: 7, accommodations: 14, meals: 9, localTravel: 5, activities: 6, emergency: 4 },
    comfort: { transport: 20, accommodations: 42, meals: 24, localTravel: 12, activities: 14, emergency: 8 },
    luxury: { transport: 55, accommodations: 150, meals: 55, localTravel: 30, activities: 35, emergency: 20 } // Rambagh / Samode Palace
  },
  "udaipur-rajasthan": {
    budget: { transport: 7, accommodations: 15, meals: 9, localTravel: 5, activities: 6, emergency: 4 },
    comfort: { transport: 22, accommodations: 45, meals: 25, localTravel: 12, activities: 15, emergency: 8 },
    luxury: { transport: 60, accommodations: 175, meals: 60, localTravel: 30, activities: 38, emergency: 22 } // Taj Lake Palace / Leela
  },
  "varanasi-india": {
    budget: { transport: 5, accommodations: 10, meals: 7, localTravel: 3, activities: 4, emergency: 3 },
    comfort: { transport: 16, accommodations: 32, meals: 18, localTravel: 8, activities: 10, emergency: 6 },
    luxury: { transport: 45, accommodations: 110, meals: 42, localTravel: 22, activities: 25, emergency: 16 } // BrijRama Palace
  },
  "kerala-backwaters": {
    budget: { transport: 7, accommodations: 14, meals: 9, localTravel: 5, activities: 6, emergency: 4 },
    comfort: { transport: 22, accommodations: 44, meals: 22, localTravel: 12, activities: 16, emergency: 8 },
    luxury: { transport: 55, accommodations: 160, meals: 55, localTravel: 28, activities: 35, emergency: 20 } // Private AC Houseboat / Kumarakom
  },
  "goa-beaches": {
    budget: { transport: 8, accommodations: 16, meals: 12, localTravel: 6, activities: 8, emergency: 4 },
    comfort: { transport: 24, accommodations: 48, meals: 28, localTravel: 14, activities: 18, emergency: 10 },
    luxury: { transport: 60, accommodations: 165, meals: 65, localTravel: 32, activities: 40, emergency: 22 } // Beachfront 5-star resort
  },
  "leh-ladakh": {
    budget: { transport: 9, accommodations: 15, meals: 10, localTravel: 8, activities: 6, emergency: 5 },
    comfort: { transport: 26, accommodations: 45, meals: 24, localTravel: 20, activities: 15, emergency: 12 }, // High cab & permit costs
    luxury: { transport: 65, accommodations: 140, meals: 50, localTravel: 45, activities: 35, emergency: 25 } // Chamba Camp / Grand Dragon
  },
  "rishikesh-uttarakhand": {
    budget: { transport: 5, accommodations: 10, meals: 7, localTravel: 3, activities: 6, emergency: 3 },
    comfort: { transport: 16, accommodations: 34, meals: 18, localTravel: 8, activities: 14, emergency: 6 }, // Rafting & Yoga
    luxury: { transport: 45, accommodations: 130, meals: 45, localTravel: 22, activities: 30, emergency: 18 } // Ananda in Himalayas
  },
  "amritsar-punjab": {
    budget: { transport: 5, accommodations: 10, meals: 7, localTravel: 4, activities: 3, emergency: 3 },
    comfort: { transport: 16, accommodations: 32, meals: 18, localTravel: 8, activities: 8, emergency: 6 },
    luxury: { transport: 45, accommodations: 110, meals: 42, localTravel: 22, activities: 22, emergency: 15 }
  },
  "munnar-kerala": {
    budget: { transport: 6, accommodations: 12, meals: 8, localTravel: 5, activities: 4, emergency: 3 },
    comfort: { transport: 18, accommodations: 36, meals: 20, localTravel: 10, activities: 10, emergency: 7 },
    luxury: { transport: 50, accommodations: 125, meals: 48, localTravel: 25, activities: 25, emergency: 18 }
  },
  "darjeeling-west-bengal": {
    budget: { transport: 6, accommodations: 12, meals: 8, localTravel: 5, activities: 5, emergency: 3 },
    comfort: { transport: 18, accommodations: 38, meals: 20, localTravel: 10, activities: 12, emergency: 7 },
    luxury: { transport: 50, accommodations: 130, meals: 48, localTravel: 25, activities: 28, emergency: 18 } // Glenburn Tea Estate
  },
  "hampi-karnataka": {
    budget: { transport: 5, accommodations: 10, meals: 7, localTravel: 4, activities: 4, emergency: 3 },
    comfort: { transport: 16, accommodations: 32, meals: 18, localTravel: 8, activities: 10, emergency: 6 },
    luxury: { transport: 48, accommodations: 120, meals: 44, localTravel: 24, activities: 26, emergency: 16 } // Evolve Back Kamalapura
  },
  "madurai-tamil-nadu": {
    budget: { transport: 5, accommodations: 10, meals: 7, localTravel: 4, activities: 3, emergency: 3 },
    comfort: { transport: 16, accommodations: 30, meals: 18, localTravel: 8, activities: 8, emergency: 6 },
    luxury: { transport: 45, accommodations: 105, meals: 40, localTravel: 20, activities: 22, emergency: 15 } // Heritage Madurai
  },
  "shillong-meghalaya": {
    budget: { transport: 7, accommodations: 14, meals: 9, localTravel: 6, activities: 5, emergency: 4 },
    comfort: { transport: 22, accommodations: 42, meals: 22, localTravel: 15, activities: 12, emergency: 8 },
    luxury: { transport: 55, accommodations: 135, meals: 50, localTravel: 30, activities: 28, emergency: 20 } // Ri Kynjai Lake Resort
  },
  "andaman-islands": {
    budget: { transport: 10, accommodations: 18, meals: 12, localTravel: 7, activities: 10, emergency: 5 },
    comfort: { transport: 28, accommodations: 52, meals: 30, localTravel: 16, activities: 22, emergency: 12 }, // Ferries & diving
    luxury: { transport: 70, accommodations: 180, meals: 70, localTravel: 35, activities: 45, emergency: 25 } // Taj Exotica Havelock
  },

  // 🌍 INTERNATIONAL DESTINATIONS
  "swiss-alps-switzerland": {
    budget: { transport: 25, accommodations: 55, meals: 30, localTravel: 18, activities: 25, emergency: 12 },
    comfort: { transport: 65, accommodations: 135, meals: 70, localTravel: 32, activities: 45, emergency: 25 }, // Alpine lifts & passes
    luxury: { transport: 160, accommodations: 380, meals: 150, localTravel: 75, activities: 95, emergency: 55 } // 5-star ski chalet
  },
  "paris-france": {
    budget: { transport: 18, accommodations: 42, meals: 24, localTravel: 10, activities: 14, emergency: 8 },
    comfort: { transport: 48, accommodations: 105, meals: 55, localTravel: 24, activities: 32, emergency: 20 },
    luxury: { transport: 125, accommodations: 310, meals: 125, localTravel: 60, activities: 75, emergency: 45 }
  },
  "tokyo-japan": {
    budget: { transport: 16, accommodations: 40, meals: 22, localTravel: 11, activities: 12, emergency: 8 },
    comfort: { transport: 45, accommodations: 98, meals: 52, localTravel: 22, activities: 28, emergency: 18 },
    luxury: { transport: 115, accommodations: 285, meals: 120, localTravel: 55, activities: 70, emergency: 40 }
  },
  "dubai-uae": {
    budget: { transport: 14, accommodations: 36, meals: 20, localTravel: 10, activities: 12, emergency: 7 },
    comfort: { transport: 42, accommodations: 95, meals: 50, localTravel: 22, activities: 30, emergency: 18 },
    luxury: { transport: 115, accommodations: 290, meals: 115, localTravel: 55, activities: 75, emergency: 42 } // Burj Al Arab / Atlantis
  },
  "bali-indonesia": {
    budget: { transport: 8, accommodations: 16, meals: 10, localTravel: 5, activities: 6, emergency: 4 },
    comfort: { transport: 24, accommodations: 48, meals: 26, localTravel: 14, activities: 16, emergency: 10 },
    luxury: { transport: 65, accommodations: 160, meals: 65, localTravel: 32, activities: 38, emergency: 25 } // Private cliffside pool villa
  },
  "santorini-greece": {
    budget: { transport: 18, accommodations: 45, meals: 25, localTravel: 10, activities: 12, emergency: 8 },
    comfort: { transport: 48, accommodations: 115, meals: 58, localTravel: 22, activities: 30, emergency: 20 },
    luxury: { transport: 120, accommodations: 320, meals: 125, localTravel: 60, activities: 75, emergency: 45 } // Caldera cliff villa
  },
  "rome-italy": {
    budget: { transport: 16, accommodations: 38, meals: 22, localTravel: 9, activities: 12, emergency: 8 },
    comfort: { transport: 44, accommodations: 95, meals: 50, localTravel: 20, activities: 28, emergency: 18 },
    luxury: { transport: 110, accommodations: 275, meals: 115, localTravel: 55, activities: 68, emergency: 40 }
  },
  "new-york-city": {
    budget: { transport: 20, accommodations: 55, meals: 28, localTravel: 12, activities: 16, emergency: 10 },
    comfort: { transport: 58, accommodations: 135, meals: 68, localTravel: 26, activities: 38, emergency: 22 },
    luxury: { transport: 140, accommodations: 360, meals: 145, localTravel: 70, activities: 85, emergency: 50 }
  },
  "maldives-islands": {
    budget: { transport: 20, accommodations: 45, meals: 25, localTravel: 15, activities: 15, emergency: 10 }, // Local island guesthouses
    comfort: { transport: 55, accommodations: 125, meals: 60, localTravel: 30, activities: 35, emergency: 22 },
    luxury: { transport: 150, accommodations: 420, meals: 160, localTravel: 80, activities: 95, emergency: 60 } // Overwater private resort villa
  },
  "pyramids-giza-egypt": {
    budget: { transport: 10, accommodations: 22, meals: 12, localTravel: 6, activities: 8, emergency: 5 },
    comfort: { transport: 30, accommodations: 62, meals: 32, localTravel: 15, activities: 20, emergency: 12 },
    luxury: { transport: 80, accommodations: 185, meals: 75, localTravel: 38, activities: 45, emergency: 28 } // Mena House Pyramids view
  },
  "machu-picchu-peru": {
    budget: { transport: 14, accommodations: 25, meals: 14, localTravel: 8, activities: 14, emergency: 6 },
    comfort: { transport: 38, accommodations: 72, meals: 36, localTravel: 18, activities: 28, emergency: 14 }, // Vistadome train & pass
    luxury: { transport: 95, accommodations: 210, meals: 85, localTravel: 42, activities: 55, emergency: 32 } // Belmond Sanctuary Lodge
  },
  "singapore-city": {
    budget: { transport: 14, accommodations: 35, meals: 18, localTravel: 8, activities: 12, emergency: 7 },
    comfort: { transport: 38, accommodations: 90, meals: 46, localTravel: 18, activities: 26, emergency: 16 },
    luxury: { transport: 100, accommodations: 270, meals: 110, localTravel: 50, activities: 65, emergency: 38 } // Marina Bay Sands
  },
  "cape-town-south-africa": {
    budget: { transport: 12, accommodations: 28, meals: 15, localTravel: 7, activities: 10, emergency: 6 },
    comfort: { transport: 34, accommodations: 72, meals: 36, localTravel: 16, activities: 22, emergency: 14 },
    luxury: { transport: 85, accommodations: 205, meals: 80, localTravel: 40, activities: 48, emergency: 30 } // Waterfront Silo Hotel
  },
  "sydney-australia": {
    budget: { transport: 18, accommodations: 44, meals: 24, localTravel: 11, activities: 14, emergency: 8 },
    comfort: { transport: 48, accommodations: 108, meals: 55, localTravel: 24, activities: 32, emergency: 20 },
    luxury: { transport: 120, accommodations: 310, meals: 125, localTravel: 60, activities: 75, emergency: 45 }
  }
};

/**
 * Fallback baseline if an unlisted destination is requested
 */
const DEFAULT_INDIA_RATE = {
  budget: { transport: 6, accommodations: 12, meals: 8, localTravel: 4, activities: 4, emergency: 3 },
  comfort: { transport: 18, accommodations: 36, meals: 20, localTravel: 10, activities: 11, emergency: 7 },
  luxury: { transport: 50, accommodations: 130, meals: 48, localTravel: 25, activities: 28, emergency: 18 }
};

const DEFAULT_GLOBAL_RATE = {
  budget: { transport: 16, accommodations: 38, meals: 20, localTravel: 10, activities: 12, emergency: 8 },
  comfort: { transport: 44, accommodations: 95, meals: 48, localTravel: 20, activities: 26, emergency: 16 },
  luxury: { transport: 110, accommodations: 260, meals: 110, localTravel: 55, activities: 65, emergency: 38 }
};

export const TIER_METADATA = {
  budget: {
    id: "budget",
    name: "Budget / Backpacker",
    tagline: "Smart Spending & High Adventure",
    badge: "Smart Saver",
    color: "var(--accent-sky)",
    bgGradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.08) 100%)",
    borderColor: "rgba(56, 189, 248, 0.35)",
    features: [
      "Hostels, homestays, or verified guesthouses (dorms / clean private rooms)",
      "Express trains, AC sleeper buses & shared intercity shuttles",
      "Street food stalls, heritage dhabas, local bakeries & night markets",
      "Public metro, shared autos, bikes & city walking trails",
      "Self-guided monument exploration, free museum days & nature treks",
      "Basic contingency buffer for minor medical & emergency cash"
    ]
  },
  comfort: {
    id: "comfort",
    name: "Comfort / Mid-Range",
    tagline: "Balanced Quality & Modern Ease",
    badge: "Most Popular",
    color: "var(--accent-primary)",
    bgGradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(139, 92, 246, 0.10) 100%)",
    borderColor: "rgba(99, 102, 241, 0.45)",
    features: [
      "3★ - 4★ boutique hotels & charming heritage havelis with breakfast",
      "Economy domestic flights, AC Chair Car / 2nd AC express trains",
      "Popular sit-down restaurants, rooftop cafes & regional culinary tours",
      "App cabs (Uber/Ola), pre-booked private transfers & airport pickups",
      "Skip-the-line monument tickets, licensed English guides & boat rides",
      "Comprehensive medical buffer & travel insurance coverage"
    ]
  },
  luxury: {
    id: "luxury",
    name: "Luxury / Premium",
    tagline: "5-Star Heritage, Royalty & Bespoke Comfort",
    badge: "Royal Indulgence",
    color: "var(--accent-amber)",
    bgGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(244, 63, 94, 0.10) 100%)",
    borderColor: "rgba(245, 158, 11, 0.40)",
    features: [
      "5★ royal heritage palaces, luxury beachfront villas & Taj/Oberoi resorts",
      "Business/flexible flights & first-class private train saloons",
      "Fine dining tasting menus, private chef experiences & wine pairings",
      "Dedicated chauffeur in luxury private SUV / sedan throughout the trip",
      "VIP private curator tours, helicopter/hot air balloon rides & sunset yachts",
      "Generous emergency buffer with round-the-clock concierge support"
    ]
  }
};

export const CATEGORY_METADATA = {
  transport: {
    id: "transport",
    name: "Transport",
    subtitle: "Flights, trains & intercity travel",
    color: "var(--accent-sky)"
  },
  accommodations: {
    id: "accommodations",
    name: "Accommodations",
    subtitle: "Hotels, stays & villas",
    color: "var(--accent-primary)"
  },
  meals: {
    id: "meals",
    name: "Meals & Dining",
    subtitle: "Food, street snacks & dinners",
    color: "var(--accent-amber)"
  },
  localTravel: {
    id: "localTravel",
    name: "Local Transit",
    subtitle: "Metro, cabs, autos & rentals",
    color: "var(--accent-violet)"
  },
  activities: {
    id: "activities",
    name: "Activities & Tours",
    subtitle: "Tickets, guides & experiences",
    color: "var(--accent-coral)"
  },
  emergency: {
    id: "emergency",
    name: "Emergency & Buffer",
    subtitle: "Contingency, medical & buffer",
    color: "var(--accent-rose)"
  }
};

/**
 * Finds destination metadata from DESTINATIONS or creates fallback
 */
export function getDestinationMetadata(destIdOrName = "taj-mahal-agra") {
  // Try matching by id
  let match = DESTINATIONS.find((d) => d.id === destIdOrName);
  if (!match) {
    // Try matching by name
    match = DESTINATIONS.find((d) => d.name.toLowerCase().includes(String(destIdOrName).toLowerCase()));
  }

  if (match) return match;

  // Fallback destination
  return {
    id: "taj-mahal-agra",
    name: "Agra & Taj Mahal",
    country: "India",
    continent: "India",
    tagline: "Eternal monument of undying love, grand Mughal grandeur & Yamuna sunsets",
    priceLevel: "$$",
    avgDailyBudget: "₹2,500 – ₹5,000 ($30 – $60)",
    lat: 27.1751,
    lon: 78.0421
  };
}

/**
 * Groups destinations for dropdown display
 */
export function getGroupedDestinations() {
  const india = DESTINATIONS.filter((d) => d.country === "India" || d.continent === "India");
  const global = DESTINATIONS.filter((d) => d.country !== "India" && d.continent !== "India");

  return {
    india,
    global
  };
}

/**
 * Calculates group accommodation & transport sharing savings.
 */
function getSharingMultipliers(travelers) {
  if (travelers <= 1) {
    return {
      accommodations: 1.0,
      localTravel: 1.0,
      transport: 1.0
    };
  }

  const roomsNeeded = Math.ceil(travelers / 2);
  const accomMultiplierPerPerson = (roomsNeeded * 1.3) / travelers;
  const vehiclesNeeded = Math.ceil(travelers / 3.5);
  const localTravelMultiplierPerPerson = Math.max(0.4, (vehiclesNeeded * 1.1) / travelers);
  const transportMultiplierPerPerson = 0.95;

  return {
    accommodations: Math.min(1.0, accomMultiplierPerPerson),
    localTravel: Math.min(1.0, localTravelMultiplierPerPerson),
    transport: transportMultiplierPerPerson
  };
}

/**
 * Calculates complete trip budget for an INDIVIDUAL PLACE with separated category costs,
 * per-person, whole-group, and tier comparisons.
 */
export function calculateTripBudget({
  destinationId = "taj-mahal-agra",
  region, // for backward compatibility
  tier = "comfort",
  days = 5,
  travelers = 1,
  currency = "INR"
}) {
  const effectiveDestId = destinationId || (region === "india" ? "taj-mahal-agra" : region === "europe" ? "paris-france" : region === "asia" ? "bali-indonesia" : "taj-mahal-agra");
  const destination = getDestinationMetadata(effectiveDestId);
  const safeDays = Math.max(1, parseInt(days, 10) || 1);
  const safeTravelers = Math.max(1, parseInt(travelers, 10) || 1);
  const curr = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
  const rate = curr.rate;
  const sym = curr.symbol;

  const sharing = getSharingMultipliers(safeTravelers);

  // Look up destination base rates
  const placeRates = DESTINATION_RATES[destination.id] || (destination.country === "India" ? DEFAULT_INDIA_RATE : DEFAULT_GLOBAL_RATE);

  const buildTierData = (targetTier) => {
    const dailyUSD = placeRates[targetTier] || (destination.country === "India" ? DEFAULT_INDIA_RATE[targetTier] : DEFAULT_GLOBAL_RATE[targetTier]);
    const categories = {};
    let totalPerPerson = 0;
    let totalGroup = 0;

    const catKeys = ["transport", "accommodations", "meals", "localTravel", "activities", "emergency"];

    catKeys.forEach((key) => {
      const baseDaily = dailyUSD[key] || 10;
      let perPersonDailyUSD = baseDaily;

      if (key === "accommodations") {
        perPersonDailyUSD = baseDaily * sharing.accommodations;
      } else if (key === "localTravel") {
        perPersonDailyUSD = baseDaily * sharing.localTravel;
      } else if (key === "transport") {
        perPersonDailyUSD = baseDaily * sharing.transport;
      }

      const perPersonDailyCurr = Math.round(perPersonDailyUSD * rate);
      const perPersonTotalCurr = Math.round(perPersonDailyCurr * safeDays);
      const groupTotalCurr = Math.round(perPersonTotalCurr * safeTravelers);

      categories[key] = {
        perPersonDaily: perPersonDailyCurr,
        perPersonTotal: perPersonTotalCurr,
        groupTotal: groupTotalCurr,
        dailyUSD: baseDaily,
        perPersonDailyUSD
      };

      totalPerPerson += perPersonTotalCurr;
      totalGroup += groupTotalCurr;
    });

    catKeys.forEach((key) => {
      categories[key].percentage = Math.round((categories[key].perPersonTotal / (totalPerPerson || 1)) * 100);
    });

    return {
      tier: targetTier,
      metadata: TIER_METADATA[targetTier],
      perPerson: {
        total: totalPerPerson,
        daily: Math.round(totalPerPerson / safeDays),
        formattedTotal: `${sym}${totalPerPerson.toLocaleString()}`,
        formattedDaily: `${sym}${Math.round(totalPerPerson / safeDays).toLocaleString()}`
      },
      groupTotal: {
        total: totalGroup,
        daily: Math.round(totalGroup / safeDays),
        formattedTotal: `${sym}${totalGroup.toLocaleString()}`,
        formattedDaily: `${sym}${Math.round(totalGroup / safeDays).toLocaleString()}`
      },
      categories
    };
  };

  const currentPlan = buildTierData(tier);
  const comparison = {
    budget: buildTierData("budget"),
    comfort: buildTierData("comfort"),
    luxury: buildTierData("luxury")
  };

  return {
    destination,
    destinationId: destination.id,
    destinationName: destination.name,
    destinationCountry: destination.country,
    destinationLabel: `${destination.name} (${destination.country})`,
    tier,
    days: safeDays,
    travelers: safeTravelers,
    currency: curr.code,
    currencySymbol: sym,
    currencyName: curr.name,
    currentPlan,
    comparison
  };
}
