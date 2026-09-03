import { DESTINATIONS } from "../data/destinations";

/**
 * Calculates distance between two coordinates in kilometers using Haversine formula
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

/**
 * Gets user current geolocation position
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Find nearest featured destination
        let nearest = DESTINATIONS[0];
        let minDistance = calculateDistance(latitude, longitude, nearest.lat, nearest.lon);

        DESTINATIONS.forEach((dest) => {
          const dist = calculateDistance(latitude, longitude, dest.lat, dest.lon);
          if (dist < minDistance) {
            minDistance = dist;
            nearest = dest;
          }
        });

        resolve({
          lat: latitude,
          lon: longitude,
          nearestDestination: nearest,
          distanceKm: minDistance
        });
      },
      (error) => {
        reject(error);
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  });
};
