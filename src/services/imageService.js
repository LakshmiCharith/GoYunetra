/**
 * Dynamic Image Fetcher service supporting Unsplash API & high-res fallbacks
 */

const getUnsplashKey = () => {
  return localStorage.getItem("UNSPLASH_ACCESS_KEY") || import.meta.env.VITE_UNSPLASH_ACCESS_KEY || "";
};

export const fetchImagesForDestination = async (query, count = 4) => {
  const accessKey = getUnsplashKey();

  if (accessKey) {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${accessKey}`
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          return data.results.map((item) => ({
            url: item.urls.regular,
            thumb: item.urls.small,
            alt: item.alt_description || query,
            credit: item.user?.name || "Unsplash"
          }));
        }
      }
    } catch (err) {
      console.warn("Unsplash API fetch failed, falling back to curated gallery:", err);
    }
  }

  // Fallback curated imagery bank
  const fallbackBank = [
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=800&q=80"
  ];

  return fallbackBank.slice(0, count).map((url, i) => ({
    url,
    thumb: url,
    alt: `${query} view ${i + 1}`,
    credit: "Unsplash Travel Collection"
  }));
};
