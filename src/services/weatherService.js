/**
 * OpenWeather API Service with robust fallback engine
 */

const getApiKey = () => {
  return localStorage.getItem("OPENWEATHER_API_KEY") || import.meta.env.VITE_OPENWEATHER_API_KEY || "";
};

export const fetchWeather = async (lat, lon, cityName = "Destination") => {
  const apiKey = getApiKey();

  if (apiKey) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        return {
          isMock: false,
          city: data.name || cityName,
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6), // convert m/s to km/h
          condition: data.weather[0]?.main || "Clear",
          description: data.weather[0]?.description || "clear sky",
          icon: data.weather[0]?.icon || "01d",
          high: Math.round(data.main.temp_max),
          low: Math.round(data.main.temp_min)
        };
      }
    } catch (err) {
      console.warn("OpenWeather API call failed, using mock fallback:", err);
    }
  }

  // Realistic mock weather fallback generator based on location & latitude
  const isTropical = Math.abs(lat) < 20;
  const isCold = Math.abs(lat) > 50;

  const baseTemp = isTropical ? 29 : isCold ? 14 : 22;
  const simulatedTemp = Math.round(baseTemp + (Math.sin(lat + lon) * 4));

  const conditions = isTropical
    ? ["Sunny", "Partly Cloudy", "Tropical Rain"]
    : ["Sunny", "Clear", "Passing Clouds", "Mild Breeze"];
  
  const condition = conditions[Math.abs(Math.floor(lat + lon)) % conditions.length];

  return {
    isMock: true,
    city: cityName,
    temp: simulatedTemp,
    feelsLike: simulatedTemp + 1,
    humidity: isTropical ? 78 : 55,
    windSpeed: 14,
    condition: condition,
    description: condition.toLowerCase(),
    icon: condition.includes("Rain") ? "10d" : condition.includes("Cloud") ? "03d" : "01d",
    high: simulatedTemp + 3,
    low: simulatedTemp - 4
  };
};
