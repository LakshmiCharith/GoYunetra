# 🌍 Wanderlust - AI Travel Application & Destination Explorer

A modern, high-performance travel web application built with **React**, **Vite**, **Google Gemini AI**, **OpenWeather API**, **Unsplash API**, and custom glassmorphism design tokens. Developed for the **Designesthetics Front-End Developer Assignment**.

---

## ✨ Features Built

1. **🎬 Landing Experience **:
   - Interactive search bar, quick statistics counter, and animated call-to-action buttons.

2. **🔍 Destination Explorer**:
   - Browse global destinations across Asia, Europe, Americas, and Africa.
   - Live search by keyword/country and multi-dimensional filter pills (Cultural, Romantic, Tropical, Metropolitan, Adventure).
   - Real-time sorting by rating and alphabetical order.

3. **📍 Location Awareness**:
   - HTML5 Geolocation integration detecting visitor coordinates to calculate distance (in km) to the nearest destination.
   - Fallback warning banner and manual city selector for users who deny location permissions.

4. **☀️ Real-Time Weather Integration**:
   - Live weather metrics powered by **OpenWeather API** (Temperature, Feels Like, High/Low, Humidity, Wind Speed, UV index).
   - Built-in realistic simulated weather engine fallback when no API key is set.

5. **🖼️ Dynamic Imagery**:
   - Integration with **Unsplash API** for fetching landscape photos per destination.
   - High-definition fallback image dictionary mapping curated photography.

6. **🤖 Gemini AI Travel Assistant**:
   - Conversational travel assistant powered by `@google/genai` (`gemini-2.5-flash`).
   - Responds to visitor questions on timing, packing, hidden spots, and local etiquette.
   - Quick question prompt chips for instant answers.

7. **📅 Day-by-Day Itinerary Planner**:
   - AI-driven itinerary builder based on duration (1-7 days), travel pace (relaxed/balanced/packed), and budget level.
   - Renders structured timeline cards (Morning, Afternoon, Evening schedule, food tips, and estimated costs).
   - Interactive activity checkboxes and **PDF Export** (`html2canvas` + `jspdf`) with celebration confetti!

8. **⚙️ Settings & Theme Control**:
   - Interactive modal to configure custom OpenWeather, Gemini AI, and Unsplash API keys locally.
   - Light & Dark mode theme switcher.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: React 18 + Vite
- **Styling**: Custom CSS Variables, Glassmorphism design tokens, CSS Animations
- **Icons**: Lucide React
- **AI Integration**: `@google/genai` (Gemini API)
- **PDF Export**: `html2canvas` + `jspdf`
- **Effects**: `canvas-confetti`

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Navigate to project directory**:
   ```bash
   cd D:\travel-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional)**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   VITE_OPENWEATHER_API_KEY=your_openweather_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   ```
   *(Note: The application works out of the box with smart mock fallbacks if keys are not provided!)*

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🌐 Live Deployment Guide

This project can be deployed easily to **Vercel**, **Netlify**, or **GitHub Pages**:

### Deploying on Vercel:
1. Push repository to GitHub.
2. Import project on [Vercel](https://vercel.com).
3. Add Environment Variables (`VITE_OPENWEATHER_API_KEY`, `VITE_GEMINI_API_KEY`, `VITE_UNSPLASH_ACCESS_KEY`) under Project Settings.
4. Click **Deploy**!
