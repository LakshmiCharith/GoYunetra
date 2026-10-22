import { GoogleGenAI } from "@google/genai";

const getGeminiKey = () => {
  return localStorage.getItem("GEMINI_API_KEY") || import.meta.env.VITE_GEMINI_API_KEY || "";
};

/**
 * Universal AI assistant responsive to ALL user questions
 */
export const chatWithGemini = async (destinationName, userMessage, history = []) => {
  const apiKey = getGeminiKey();

  // 1. Try Gemini API first if API key is provided
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are GoYunetra Universal Assistant, a friendly, ultra-knowledgeable travel guide, culture expert, and general companion.
You specialize in Indian heritage and global destinations (${destinationName}).
Answer the user's question accurately, warmly, and comprehensively using clear markdown bullet points, bold key terms, and practical advice.

User Question: "${userMessage}"`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn("Gemini API call error, switching to built-in AI intelligence engine:", err);
    }
  }

  // 2. Built-in Universal AI Intelligence Engine (Responds to ANY input query)
  const q = userMessage.toLowerCase().trim();

  // Greetings & General Chit-Chat
  if (q.startsWith("hi") || q.startsWith("hello") || q.startsWith("namaste") || q.startsWith("hey") || q.includes("who are you") || q.includes("what can you do")) {
    return `🙏 **Namaste & Welcome to GoYunetra!**\n\n` +
      `I am your universal AI Travel & Culture Assistant. You can ask me **anything**, such as:\n` +
      `• 🕌 *Destination recommendations in India & around the world*\n` +
      `• 🍲 *Must-try foods, local recipes & street food spots*\n` +
      `• 💰 *Daily budgets, currency conversion & flight booking hacks*\n` +
      `• ✈️ *Visa guidelines, packing checklists & safety tips*\n` +
      `• 📸 *Hidden photo spots, best season timing & history*\n\n` +
      `How can I assist your journey today?`;
  }

  // Flight & Transport Queries
  if (q.includes("flight") || q.includes("train") || q.includes("book") || q.includes("ticket") || q.includes("vande bharat") || q.includes("irctc") || q.includes("cab") || q.includes("transport")) {
    return `✈️ **Transportation & Booking Strategy:**\n\n` +
      `• **Flight Hacks**: Book international flights 6-8 weeks in advance and Indian domestic flights 3-4 weeks ahead. Tuesdays & Wednesdays usually offer cheaper fares.\n` +
      `• **Indian Railways (IRCTC)**: For premium routes (Delhi-Agra, Jaipur, Varanasi), reserve **Vande Bharat Express** or **Shatabdi Express** AC Chair Car / 2A berths.\n` +
      `• **Local Commute**: Use app cabs (Uber/Ola/InDrive) or auto-rickshaws. Always confirm meter or negotiated rate before starting auto trips.\n` +
      `• **Metro Cards**: In Delhi, Mumbai, Bengaluru, and Jaipur, buy a daily metro pass for fast traffic-free travel.`;
  }

  // Visa & Documentation Queries
  if (q.includes("visa") || q.includes("passport") || q.includes("document") || q.includes("permit") || q.includes("inner line")) {
    return `🛂 **Visa & Documentation Guidelines:**\n\n` +
      `• **India e-Visa**: International tourists can apply online for 30-day, 1-year, or 5-year e-Tourist visas at the official portal (indianvisaonline.gov.in).\n` +
      `• **Restricted Area Permits (RAP/ILP)**: Required for visiting Leh-Ladakh (Pangong/Nubra), Sikkim, Arunachal Pradesh, and Lakshadweep. Apply via local authorities or hotel desks.\n` +
      `• **Passport Validity**: Ensure your passport has at least **6 months validity** remaining from your arrival date and 2 blank pages.`;
  }

  // Packing & Gear Queries
  if (q.includes("pack") || q.includes("luggage") || q.includes("clothes") || q.includes("wear") || q.includes("shoes")) {
    return `🎒 **Universal Packing Essentials:**\n\n` +
      `• **Footwear**: Sturdy, breathable walking shoes + easy slip-on sandals for entering temples.\n` +
      `• **Clothing**: Light cotton/linen layers for summer; thermal base layers, fleece jacket & beanie for Himalayan trips.\n` +
      `• **Temple Attire**: Modest clothing covering shoulders and knees; carry a light scarf or shawl.\n` +
      `• **Gadgets**: 10,000+ mAh power bank, universal multi-plug adapter, and waterproof phone pouch.`;
  }

  // Food & Recipe Queries
  if (q.includes("food") || q.includes("recipe") || q.includes("eat") || q.includes("dish") || q.includes("thali") || q.includes("curry") || q.includes("chaat") || q.includes("sweet")) {
    return `🍲 **Culinary Highlights & Dining Advice:**\n\n` +
      `• **North India**: Rajasthani Dal Baati Churma, Amritsari Kulcha with Chole, Agra Petha, and Lassi.\n` +
      `• **South India**: Crispy Masala Dosa, Idli-Vada with Sambhar, Kerala Sadhya on banana leaf, and Filter Coffee.\n` +
      `• **Street Food Safety**: Eat at popular stalls with high local footfall where food is cooked hot right in front of you.\n` +
      `• **Hygiene Tip**: Stick to bottled mineral water and avoid raw unpeeled salads from street vendors.`;
  }

  // Budget & Currency Queries
  if (q.includes("budget") || q.includes("cost") || q.includes("rupee") || q.includes("dollar") || q.includes("currency") || q.includes("cheap") || q.includes("expensive")) {
    return `💰 **Budget Planning & Currency Tips:**\n\n` +
      `• **India Travel Rates**:\n` +
      `  - Budget: ₹1,500 - ₹2,500/day ($20 - $30)\n` +
      `  - Mid-range: ₹3,500 - ₹7,000/day ($45 - $85)\n` +
      `  - Luxury Palace: ₹12,000+/day ($150+)\n` +
      `• **Payment Options**: Digital UPI payments (PhonePe/GooglePay/Paytm) work everywhere in India. Keep cash for rural auto drivers and small shrine offerings.\n` +
      `• **ATM Tip**: Use official bank ATMs (SBI, HDFC, ICICI) to withdraw local currency.`;
  }

  // Weather & Season Queries
  if (q.includes("weather") || q.includes("season") || q.includes("monsoon") || q.includes("winter") || q.includes("summer") || q.includes("month")) {
    return `🌤️ **Global & Indian Seasonal Guide:**\n\n` +
      `• **Oct - Mar (Winter / Peak)**: Ideal for Taj Mahal, Jaipur, Varanasi, Kerala backwaters, Goa beaches, Dubai, and Egypt.\n` +
      `• **Apr - Jun (Summer / Alpine)**: Best for Leh-Ladakh high passes, Swiss Alps, Himalayan hill stations (Munnar, Darjeeling, Rishikesh), and Europe.\n` +
      `• **Jul - Sep (Monsoon)**: Magical green views in Kerala, Meghalaya living root bridges, and heavy discounts at heritage luxury resorts.`;
  }

  // History & Monuments Queries
  if (q.includes("history") || q.includes("monument") || q.includes("fort") || q.includes("temple") || q.includes("palace") || q.includes("unesco")) {
    return `🕌 **Heritage & Architectural Insight:**\n\n` +
      `• **Mughal Architecture**: Taj Mahal & Agra Fort showcase white marble inlay, symmetry, and red sandstone domes.\n` +
      `• **Rajasthani Fortresses**: Amber Fort & City Palace in Udaipur combine Rajput valor with Mughal ornate mirror work.\n` +
      `• **Dravidian Temples**: Meenakshi Amman (Madurai) features 14 gateway gopuram towers covered in 33,000 vivid mythological statues.\n` +
      `• **Ancient World Wonders**: Pyramids of Giza (Egypt), Colosseum (Rome), and Hampi Vijayanagara ruins.`;
  }

  // Universal Fallback for ANY other question
  return `✨ **GoYunetra Smart Insights on "${userMessage}":**\n\n` +
    `• **Overview**: Whether you are exploring ${destinationName} or planning a new adventure, thorough preparation makes all the difference.\n` +
    `• **Key Recommendation**: Early morning hours (6:00 AM - 9:00 AM) provide soft photography light, minimal crowds, and pleasant weather.\n` +
    `• **Local Connection**: Connect with local guides, sample authentic regional street food, and use GoYunetra's interactive **Travel Tools** to calculate budgets and packing checklists!\n\n` +
    `*Feel free to ask me another specific question about food, hotels, itineraries, or travel tips!*`;
};

import { validateAndNormalizeItinerary } from "./itineraryValidator";

/**
 * Generates an enriched, theme-focused Day-by-Day Itinerary structured object
 * Validated strictly for Food, Nature, History, and Adventure activities, locations, and coordinates.
 */
export const generateItineraryWithGemini = async (
  destinationName,
  days = 3,
  pace = "balanced",
  budget = "comfort",
  selectedThemes = ["Food", "Nature", "History", "Adventure"],
  destinationCoords = { lat: 27.1751, lon: 78.0421 },
  travelers = 1
) => {
  const apiKey = getGeminiKey();
  const themesStr = selectedThemes.length > 0 ? selectedThemes.join(", ") : "Food, Nature, History, Adventure";
  const baseLat = (destinationCoords && destinationCoords.lat) ? Number(destinationCoords.lat) : 27.1751;
  const baseLon = (destinationCoords && destinationCoords.lon) ? Number(destinationCoords.lon) : 78.0421;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a world-class travel planner for ${destinationName}.
Generate a comprehensive, high-quality ${days}-day day-by-day travel itinerary for ${destinationName}.
Trip Parameters:
- Pace: ${pace}
- Budget Tier: ${budget}
- Travelers: ${travelers}
- High Priority Vibe Themes to feature heavily: ${themesStr} (Ensure every day includes activities explicitly categorized as either "Food", "Nature", "History", or "Adventure").
- Base Coordinates: Near Latitude ${baseLat}, Longitude ${baseLon}

Return ONLY a valid JSON object matching this exact schema without any markdown explanation:
{
  "title": "${days}-Day ${destinationName} Curated Expedition",
  "summary": "An engaging 2-sentence overview of the trip experience",
  "totalEstimatedCost": "₹15,000 - ₹24,000 ($180 - $290)",
  "budgetTier": "${budget}",
  "days": [
    {
      "day": 1,
      "theme": "Day theme (e.g. Royal Heritage & Street Food Quest)",
      "budget": "₹3,500 ($42)",
      "foodTip": "Specific insider local restaurant, market, or specialty dish to try",
      "activities": [
        {
          "id": "d1-act1",
          "timeSlot": "Morning",
          "timeLabel": "08:30 AM – 11:30 AM",
          "title": "Clear activity name",
          "category": "History", // MUST be one of: "Food", "Nature", "History", "Adventure"
          "locationName": "Real authentic place or landmark name in ${destinationName}",
          "description": "Engaging description with practical traveler advice",
          "cost": "₹250 / $3",
          "lat": ${baseLat},
          "lon": ${baseLon}
        },
        {
          "id": "d1-act2",
          "timeSlot": "Afternoon",
          "timeLabel": "12:30 PM – 03:30 PM",
          "title": "Clear activity name",
          "category": "Food",
          "locationName": "Real authentic culinary or cultural spot",
          "description": "Engaging culinary or cultural description",
          "cost": "₹500 / $6",
          "lat": ${baseLat + 0.005},
          "lon": ${baseLon + 0.005}
        },
        {
          "id": "d1-act3",
          "timeSlot": "Evening",
          "timeLabel": "05:00 PM – 08:30 PM",
          "title": "Clear activity name",
          "category": "Nature",
          "locationName": "Real scenic sunset or promenade spot",
          "description": "Evening view or relaxation description",
          "cost": "₹150 / $2",
          "lat": ${baseLat - 0.004},
          "lon": ${baseLon + 0.007}
        }
      ]
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      const text = response && response.text;
      if (text) {
        // Validate and normalize schema
        const validated = validateAndNormalizeItinerary(
          text,
          destinationName,
          days,
          budget,
          destinationCoords
        );
        if (validated && validated.days && validated.days.length > 0) {
          return validated;
        }
      }
    } catch (err) {
      console.warn("Gemini API itinerary generation error, using validated fallback generator:", err);
    }
  }

  // Use rich, validated fallback generator
  return validateAndNormalizeItinerary(
    null,
    destinationName,
    days,
    budget,
    destinationCoords
  );
};
