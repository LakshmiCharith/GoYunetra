# YatraAI — India & Beyond: AI Travel Companion 🌍✈️

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://travel-app-peach-iota.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/LakshmiCharith/yatra-ai)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev)

---

## 🌐 Live Demo

**[https://travel-app-peach-iota.vercel.app](https://travel-app-peach-iota.vercel.app)**

---

## 📖 Project Overview

**YatraAI** is a full-stack AI-powered travel companion web application designed to help users explore **30+ extraordinary destinations** across India and the world — all in one beautifully designed interface.

### Problem It Solves
Planning a trip is overwhelming. Travellers have to:
- Visit dozens of websites for destination info, weather, budgets, and itineraries
- Struggle with generic travel guides that lack personalization
- Spend hours planning day-by-day itineraries manually

**YatraAI solves this** by providing a single, intelligent travel platform with:
- A curated database of 30+ iconic destinations (15+ Indian wonders, 15+ global icons)
- Live weather at every destination
- **Gemini AI** answering any travel question instantly
- One-click itinerary generation with PDF export
- Real-time budget calculation and currency conversion

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏔️ **30+ Curated Destinations** | Handpicked Indian and global wonders with rich descriptions, photos, highlights, and insider tips |
| 🔍 **Smart Explorer** | Filter by continent, category, price level, and best season. Real-time search and sorting |
| 🌤️ **Live Weather** | Real-time weather fetched from Open-Meteo API for each destination |
| 🤖 **YatraAI Chatbot** | Powered by Google Gemini 2.0 Flash – ask any travel question and get expert answers |
| 📅 **Itinerary Planner** | Day-by-day AI-generated travel plan (1–14 days) with PDF export |
| 💰 **Budget Calculator** | Trip cost estimator with Budget / Comfort / Luxury tiers |
| 💱 **Currency Converter** | Live exchange rates for 12+ currencies |
| 📍 **Geolocation Banner** | Detects user location and shows distance to each destination |
| 🌓 **Dark / Light Mode** | Fully themed with an eye-friendly Emerald & Sage colour system |
| 📱 **Responsive Design** | Mobile-first layout that works on all screen sizes |
| 🎵 **Ambient Audio** | Ambient soundscape channels for immersive travel previewing |
| 🖼️ **Photo Gallery** | Dynamic destination photo grid with Unsplash integration |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 19 | Component-based UI with hooks |
| **Build Tool** | Vite 8 | Lightning-fast HMR dev server & bundler |
| **AI Engine** | Google Gemini 2.0 Flash (`@google/genai`) | AI travel assistant & itinerary generation |
| **Weather API** | Open-Meteo (free, no key required) | Live weather for each destination |
| **Styling** | Vanilla CSS + CSS Variables | Custom design system, dark/light modes |
| **Icons** | Lucide React | Consistent icon library |
| **PDF Export** | jsPDF + html2canvas | Itinerary PDF download |
| **Geolocation** | Browser Navigator API | User location detection |
| **Deployment** | Vercel | Edge network, CI/CD ready |
| **Source Control** | GitHub | Version control & collaboration |

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js** 18+ and **npm**
- A **Gemini API key** — get one free at [aistudio.google.com](https://aistudio.google.com/app/apikey)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/LakshmiCharith/yatra-ai.git
cd yatra-ai

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
```

Open `.env` and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

```bash
# 4. Start the development server
npm run dev
```

Open your browser at **[http://localhost:5173](http://localhost:5173)**

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
yatra-ai/
├── index.html                  # App entry point, meta tags, Google Fonts
├── vite.config.js              # Vite build configuration
├── package.json                # Dependencies and scripts
├── .env.example                # Environment variable template
│
└── src/
    ├── main.jsx                # React DOM root mount
    ├── App.jsx                 # Root component, theme toggle, AI drawer
    ├── App.css                 # Global layout overrides
    ├── index.css               # Base CSS reset
    │
    ├── components/
    │   ├── Hero.jsx            # Landing hero section with ambient video, search bar
    │   ├── Navbar.jsx          # Navigation, theme toggle, settings, Ask AI button
    │   ├── DestinationExplorer.jsx  # Search, filter, sort, and destination grid
    │   ├── DestinationCard.jsx      # Individual destination card component
    │   ├── DestinationDetailModal.jsx  # Full-screen destination detail popup
    │   ├── FamousPlacesGrid.jsx     # Notable places/attractions per destination
    │   ├── WeatherCard.jsx          # Live weather display widget
    │   ├── AIChatbot.jsx            # Gemini AI chat interface
    │   ├── ItineraryPlanner.jsx     # Day-by-day AI itinerary + PDF export
    │   ├── TravelToolsSection.jsx   # Budget calculator, currency converter, timing
    │   ├── LocationBanner.jsx       # Geolocation distance banner
    │   ├── SettingsModal.jsx        # API key & preferences modal
    │   └── Footer.jsx               # Site footer with feature highlights
    │
    ├── services/
    │   ├── geminiService.js    # Google Gemini AI API integration
    │   ├── weatherService.js   # Open-Meteo API weather fetcher
    │   ├── imageService.js     # Unsplash photo gallery fetcher
    │   └── locationService.js  # Browser geolocation & distance math
    │
    ├── data/
    │   └── destinations.js     # 30+ destinations database with photos, tips, coordinates
    │
    └── styles/
        ├── variables.css       # Design tokens (colours, spacing, shadows, radii)
        └── global.css          # Component utility classes, animations
```

---

## 🎨 Design Decisions

### Why Elysian Emerald & Sage Colour Palette?
We replaced electric neon cyans with a nature-inspired **Emerald → Sage → Honey Gold** palette specifically chosen to:
- **Reduce eye strain** during extended travel planning sessions
- Work beautifully in both **dark and light modes** without high contrast fatigue
- Evoke nature, exploration, and calm — emotions aligned with travel

### Why Vanilla CSS Instead of Tailwind?
A **CSS Variables** design token system gives us:
- Instant theme switching (dark ↔ light) with zero JavaScript overhead
- Pixel-perfect component control without purge/JIT limitations
- The entire colour, spacing, and shadow system lives in `variables.css`

### Why Google Gemini 2.0 Flash?
- **Zero latency** for travel queries — responds in under 2 seconds
- Understands complex, multi-part travel planning requests
- Supports streaming responses for a natural conversational feel
- Free tier generous enough for demo purposes

### Why No External Router (React Router)?
The app is **single-page with modal overlays** — a lightweight approach that:
- Keeps the bundle small and load time fast
- Avoids hydration mismatch issues
- Makes the URL shareable as one canonical travel portal

---

## 📸 Screenshots

### Hero — Cinematic Landing
The hero features ambient video backgrounds, a smart search bar with popular destination chips, and key travel stats.

### Destination Explorer
A responsive card grid with real-time search, category/continent filters, and sort options. Each card shows the cover photo, rating, price level, and best season.

### Destination Detail Modal
Clicking a destination opens a full-screen modal with 5 tabs: Overview, Famous Places, Live Weather, AI Assistant, and Itinerary Planner.

### AI Travel Assistant
Powered by Google Gemini — ask anything from "best food in Jaipur" to "7-day Kerala itinerary under ₹15,000".

### Travel Tools
Budget Calculator, Currency Converter, and Best Time planner — all in one section.

---

## 🔗 Links

| Resource | URL |
|---|---|
| **Live Application** | https://travel-app-peach-iota.vercel.app |
| **GitHub Repository** | https://github.com/LakshmiCharith/yatra-ai |
| **Vercel Dashboard** | https://vercel.com/charith6/travel-app |

---

## 👤 Author

**LakshmiCharith** — [github.com/LakshmiCharith](https://github.com/LakshmiCharith)

---

## 📄 License

This project is open-source for educational and portfolio purposes.
