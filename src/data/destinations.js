export const DESTINATIONS = [
  // 🇮🇳 INDIAN DESTINATIONS
  {
    id: "taj-mahal-agra",
    name: "Agra & Taj Mahal",
    country: "India",
    continent: "India",
    tagline: "Eternal monument of love, grand Mughal architecture, and Yamuna sunsets",
    category: "Spiritual & Heritage",
    rating: 4.95,
    reviewsCount: 4850,
    priceLevel: "$$",
    avgDailyBudget: "₹2,500 - ₹5,000 ($30 - $60)",
    bestMonths: "Oct - Mar",
    climate: "Subtropical",
    safetyScore: 9.3,
    lat: 27.1751,
    lon: 78.0421,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-sunset-over-a-historic-monument-41524-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    description: "Agra is home to the iconic Taj Mahal, a UNESCO World Heritage site built by Shah Jahan in white ivory marble. Explore majestic red sandstone forts, intricate Mughal gardens, and delicious Agra Petha street sweets.",
    highlights: [
      "Sunrise over Taj Mahal's glowing marble facade",
      "Agra Fort & Jahangiri Mahal Mughal Palaces",
      "Mehtab Bagh sunset view across Yamuna River",
      "Fatehpur Sikri royal abandoned city day trip"
    ],
    famousPlaces: [
      {
        id: "taj-mahal-main",
        name: "Taj Mahal Complex",
        category: "World Heritage Wonder",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
        description: "The crown jewel of Mughal architecture built between 1631 and 1648.",
        duration: "3 - 4 Hours",
        fee: "₹50 (Indians) / ₹1,100 (Foreigners)",
        insiderTip: "Enter via the East Gate at 6:00 AM for golden sunrise light."
      },
      {
        id: "agra-fort",
        name: "Agra Red Fort",
        category: "Mughal Imperial Palace",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        description: "Massive 16th-century red sandstone fortress housing imperial royal halls.",
        duration: "2 - 3 Hours",
        fee: "₹50 (Indians) / ₹650 (Foreigners)",
        insiderTip: "Stand at Musamman Burj where Shah Jahan gazed at the Taj Mahal."
      }
    ]
  },
  {
    id: "jaipur-rajasthan",
    name: "Jaipur (Pink City)",
    country: "India",
    continent: "India",
    tagline: "Royal fortresses, terracotta palaces, and vibrant Rajasthani heritage",
    category: "Spiritual & Heritage",
    rating: 4.9,
    reviewsCount: 3920,
    priceLevel: "$$",
    avgDailyBudget: "₹3,000 - ₹6,000 ($35 - $75)",
    bestMonths: "Oct - Mar",
    climate: "Semi-Arid",
    safetyScore: 9.4,
    lat: 26.9124,
    lon: 75.7873,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-historic-fort-41528-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    description: "Jaipur forms the famous Golden Triangle circuit with Delhi and Agra. Known for its terracotta-pink painted old city, hilltop Amber Fort, honeycombed Hawa Mahal, and royal Rajasthani thali.",
    highlights: [
      "Amber Fort elephant & jeep ascent",
      "Hawa Mahal (Palace of Winds) 953 jharokha windows",
      "City Palace & Royal Peacock Gate",
      "Nahargarh Fort panoramic sunset over Pink City"
    ],
    famousPlaces: [
      {
        id: "amber-fort",
        name: "Amber Palace & Fort",
        category: "Hilltop Citadel",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        description: "A dramatic 16th-century hilltop fort crafted from red sandstone and yellow marble.",
        duration: "3 - 4 Hours",
        fee: "₹100 (Indians) / ₹500 (Foreigners)",
        insiderTip: "Visit Sheesh Mahal (Mirror Palace) where light reflects across thousands of glass mirrors."
      },
      {
        id: "hawa-mahal",
        name: "Hawa Mahal (Palace of Winds)",
        category: "Royal Architecture",
        image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=800&q=80",
        description: "Built in 1799 with 953 lattice windows allowing royal women to observe street festivals.",
        duration: "1 - 2 Hours",
        fee: "₹50",
        insiderTip: "Cross the street to Tattoo Cafe rooftop for the best photo view."
      }
    ]
  },
  {
    id: "varanasi-india",
    name: "Varanasi (Kashi)",
    country: "India",
    continent: "India",
    tagline: "World's oldest living spiritual capital on the sacred banks of Mother Ganga",
    category: "Spiritual & Heritage",
    rating: 4.92,
    reviewsCount: 3410,
    priceLevel: "$",
    avgDailyBudget: "₹1,800 - ₹4,000 ($22 - $50)",
    bestMonths: "Oct - Mar",
    climate: "Humid Subtropical",
    safetyScore: 9.1,
    lat: 25.3176,
    lon: 82.9739,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-floating-lanterns-on-river-water-41527-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    description: "Varanasi is the soul of India, continuous for over 3,000 years. Witness spellbinding evening Ganga Aarti ceremonies, sunrise wooden boat rides past 84 historic ghats, classical music heritage, and silk weaving alleys.",
    highlights: [
      "Grand Evening Ganga Aarti at Dashashwamedh Ghat",
      "Sunrise rowing boat ride on River Ganges",
      "Kashi Vishwanath Corridor & Golden Temple",
      "Sarnath Buddha First Sermon deer park excursion"
    ],
    famousPlaces: [
      {
        id: "dashashwamedh-ghat",
        name: "Dashashwamedh Ghat & Ganga Aarti",
        category: "Spiritual Ceremony",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
        description: "The main ghat where priests perform rhythmic brass lamp rituals every evening at dusk.",
        duration: "2 Hours",
        fee: "Free",
        insiderTip: "Rent a boat on the river by 5:30 PM to view the Aarti from the water."
      }
    ]
  },
  {
    id: "kerala-backwaters",
    name: "Kerala Backwaters (Alleppey)",
    country: "India",
    continent: "India",
    tagline: "God's Own Country: Emerald palm lagoons, luxury houseboats & Ayurveda",
    category: "Nature & Adventure",
    rating: 4.96,
    reviewsCount: 4120,
    priceLevel: "$$",
    avgDailyBudget: "₹3,500 - ₹8,000 ($45 - $100)",
    bestMonths: "Sep - Mar",
    climate: "Tropical Coastal",
    safetyScore: 9.7,
    lat: 9.4981,
    lon: 76.3388,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-tropical-beach-with-turquoise-water-41525-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    description: "Alleppey (Alappuzha) is the Venice of the East, famed for interconnected canals, tranquil lakes, traditional houseboats, spicy Karimeen fish curry, and herbal rejuvenation.",
    highlights: [
      "Overnight luxury Kettuvallam houseboat cruise",
      "Canoeing through quiet village narrow canals",
      "Authentic Kerala Sadhya meal served on banana leaf",
      "Sunset over Marari white sand beach"
    ],
    famousPlaces: [
      {
        id: "alleppey-houseboat",
        name: "Vembanad Lake Houseboat Cruise",
        category: "Experiential Stay",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
        description: "Glide along Vembanad Lake in handcrafted wooden houseboats equipped with private chefs.",
        duration: "Overnight Stay",
        fee: "₹7,000 - ₹15,000 / night",
        insiderTip: "Choose a boat starting from Punnamada Lake."
      }
    ]
  },
  {
    id: "goa-beaches",
    name: "Goa (North & South)",
    country: "India",
    continent: "India",
    tagline: "Sun-drenched golden beaches, Portuguese heritage, seafood & nightlife",
    category: "Beaches & Coastal",
    rating: 4.88,
    reviewsCount: 5200,
    priceLevel: "$$",
    avgDailyBudget: "₹3,000 - ₹7,000 ($40 - $90)",
    bestMonths: "Nov - Feb",
    climate: "Tropical Monsoon",
    safetyScore: 9.2,
    lat: 15.2993,
    lon: 74.124,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-41529-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    description: "Goa blends Indian coastal soul with 450 years of Portuguese influence. From beach shacks in Calangute to white sands in Palolem, spice plantations, and UNESCO churches of Old Goa.",
    highlights: [
      "Palolem & Agonda South Goa tranquil beaches",
      "Fort Aguada 17th-century lighthouse panorama",
      "Basilica of Bom Jesus UNESCO Church",
      "Dudhsagar Waterfalls jungle trek"
    ],
    famousPlaces: [
      {
        id: "palolem-beach",
        name: "Palolem Beach",
        category: "Scenic Bay",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
        description: "Pristine crescent bay lined with colorful bamboo beach huts.",
        duration: "Full Day",
        fee: "Free",
        insiderTip: "Book an early morning dolphin boat trip from shore."
      }
    ]
  },
  {
    id: "leh-ladakh",
    name: "Leh-Ladakh",
    country: "India",
    continent: "India",
    tagline: "The Land of High Passes: Turquoise lakes, monastic chants & cold desert peaks",
    category: "Mountain & Hill Stations",
    rating: 4.97,
    reviewsCount: 2980,
    priceLevel: "$$$",
    avgDailyBudget: "₹4,000 - ₹9,000 ($50 - $115)",
    bestMonths: "May - Sep",
    climate: "Cold Desert",
    safetyScore: 9.6,
    lat: 34.1526,
    lon: 77.5771,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-coastal-mountains-and-ocean-41526-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
    description: "Ladakh is a high-altitude Himalayan paradise situated above 11,000 feet. Experience Pangong Tso's color-changing blue waters, double-humped Bactrian camels in Nubra Valley, and cliffside Buddhist monasteries.",
    highlights: [
      "Pangong Tso Lake camping under Milky Way stars",
      "Khardung La Pass (world's highest motorable pass)",
      "Thiksey Monastery morning chanting",
      "Hunder Sand Dunes Bactrian camel safari"
    ],
    famousPlaces: [
      {
        id: "pangong-lake",
        name: "Pangong Tso Lake",
        category: "High Altitude Lake",
        image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
        description: "An endorheic lake at 14,270 feet extending from India to Tibet.",
        duration: "Overnight",
        fee: "Permit ₹600",
        insiderTip: "Spend the night in wooden cottages at Spangmik."
      }
    ]
  },
  {
    id: "udaipur-rajasthan",
    name: "Udaipur (City of Lakes)",
    country: "India",
    continent: "India",
    tagline: "Venice of the East: Marble water palaces, sunset boat rides & Mewar royalty",
    category: "Romantic",
    rating: 4.93,
    reviewsCount: 3650,
    priceLevel: "$$$",
    avgDailyBudget: "₹3,500 - ₹8,500 ($45 - $105)",
    bestMonths: "Sep - Mar",
    climate: "Subtropical",
    safetyScore: 9.5,
    lat: 24.5854,
    lon: 73.7125,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-drone-shot-of-coastal-town-in-greece-42289-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80",
    description: "Udaipur is India's most romantic city, set around serene Lake Pichola. Marvel at the City Palace complex, floating Lake Palace, and Dharohar folk dances.",
    highlights: [
      "Lake Pichola sunset solar boat cruise",
      "City Palace royal museum complex",
      "Dharohar Folk Cultural Show at Bagore Ki Haveli"
    ],
    famousPlaces: [
      {
        id: "city-palace-udaipur",
        name: "Udaipur City Palace",
        category: "Royal Residence",
        image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80",
        description: "Constructed over 400 years with mirror balconies and peacock mosaic courtyards.",
        duration: "3 Hours",
        fee: "₹300",
        insiderTip: "Visit Mor Chowk to see 5,000 glass mosaic tiles."
      }
    ]
  },
  {
    id: "munnar-kerala",
    name: "Munnar & Wayanad",
    country: "India",
    continent: "India",
    tagline: "Rolling tea garden hills, misty Western Ghats peaks & wild elephant trails",
    category: "Mountain & Hill Stations",
    rating: 4.89,
    reviewsCount: 2840,
    priceLevel: "$$",
    avgDailyBudget: "₹2,800 - ₹6,000 ($35 - $75)",
    bestMonths: "Sep - May",
    climate: "Subtropical Highland",
    safetyScore: 9.6,
    lat: 10.0889,
    lon: 77.0595,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-tropical-beach-with-turquoise-water-41525-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    description: "Munnar is South India's premier hill station located 5,200 feet high in the Western Ghats. Famous for Tata Tea estates, Nilgiri Tahr goats, and spice gardens.",
    highlights: [
      "Eravikulam National Park Nilgiri Tahr safari",
      "Tea Museum & fresh cardamom chai tasting",
      "Top Station Western Ghats cloud view"
    ],
    famousPlaces: [
      {
        id: "eravikulam-park",
        name: "Eravikulam National Park",
        category: "Wildlife Sanctuary",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
        description: "Home to the endangered Nilgiri Tahr and South India's highest peak Anamudi.",
        duration: "3 Hours",
        fee: "₹200",
        insiderTip: "Book shuttle passes online."
      }
    ]
  },
  {
    id: "rishikesh-uttarakhand",
    name: "Rishikesh & Haridwar",
    country: "India",
    continent: "India",
    tagline: "Yoga capital of the world: Ganges river rafting, Beatles ashram & Aarti",
    category: "Spiritual & Heritage",
    rating: 4.91,
    reviewsCount: 3100,
    priceLevel: "$",
    avgDailyBudget: "₹1,800 - ₹4,500 ($22 - $55)",
    bestMonths: "Sep - Jun",
    climate: "Humid Subtropical",
    safetyScore: 9.4,
    lat: 30.0869,
    lon: 78.2676,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-floating-lanterns-on-river-water-41527-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80",
    description: "Nestled where the Ganges enters the northern plains. Renowned for yoga ashrams, white-water river rafting, Laxman Jhula bridge, and Beatles Ashram.",
    highlights: [
      "Ganges white-water rafting",
      "Triveni Ghat evening Ganga Aarti",
      "Beatles Ashram pop-art graffiti walk"
    ],
    famousPlaces: [
      {
        id: "laxman-jhula",
        name: "Laxman Jhula Bridge",
        category: "Iconic Bridge",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
        description: "Iron suspension bridge spanning 450 feet across the Ganges.",
        duration: "1 - 2 Hours",
        fee: "Free",
        insiderTip: "Keep food items tucked away from monkeys."
      }
    ]
  },
  {
    id: "amritsar-punjab",
    name: "Amritsar (Golden Temple)",
    country: "India",
    continent: "India",
    tagline: "Sacred Harmandir Sahib, world's largest community kitchen & Punjabi warmth",
    category: "Spiritual & Heritage",
    rating: 4.96,
    reviewsCount: 3880,
    priceLevel: "$",
    avgDailyBudget: "₹1,500 - ₹4,000 ($20 - $50)",
    bestMonths: "Oct - Mar",
    climate: "Semi-Arid",
    safetyScore: 9.7,
    lat: 31.62,
    lon: 74.8765,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-sunset-over-a-historic-monument-41524-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=1200&q=80",
    description: "Amritsar is the spiritual heart of Sikhism. Experience the resplendent Golden Temple reflecting in holy Amrit Sarovar, join the Langar mega kitchen, and watch Wagah Border ceremony.",
    highlights: [
      "Harmandir Sahib Golden Temple illumination",
      "Langar mega community kitchen volunteer experience",
      "Wagah Border retreat ceremony"
    ],
    famousPlaces: [
      {
        id: "golden-temple-main",
        name: "Harmandir Sahib (Golden Temple)",
        category: "Sacred Shrine",
        image: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=800&q=80",
        description: "Gilded 16th-century Sikh temple surrounded by a holy pool.",
        duration: "3 Hours",
        fee: "Free",
        insiderTip: "Visit around 9:30 PM for the Palki Sahib night procession."
      }
    ]
  },
  {
    id: "darjeeling-west-bengal",
    name: "Darjeeling & Sikkim",
    country: "India",
    continent: "India",
    tagline: "Queen of the Hills: Kanchenjunga sunrise views, UNESCO Toy Train & tea",
    category: "Mountain & Hill Stations",
    rating: 4.88,
    reviewsCount: 2650,
    priceLevel: "$$",
    avgDailyBudget: "₹2,500 - ₹5,500 ($32 - $70)",
    bestMonths: "Mar - May, Oct - Dec",
    climate: "Subtropical Highland",
    safetyScore: 9.5,
    lat: 27.041,
    lon: 88.2663,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-coastal-mountains-and-ocean-41526-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    description: "Darjeeling is situated at 6,700 feet in West Bengal overlooking Mt. Kanchenjunga. Ride the steam Toy Train and taste delicate champagne tea.",
    highlights: [
      "Tiger Hill 4:30 AM sunrise over Mt. Kanchenjunga",
      "UNESCO Toy Train joyride",
      "Happy Valley Tea Estate walk"
    ],
    famousPlaces: [
      {
        id: "tiger-hill",
        name: "Tiger Hill Sunrise",
        category: "Panorama View",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        description: "Hilltop offering views of sun rays turning Kanchenjunga to gold.",
        duration: "2 Hours",
        fee: "₹100",
        insiderTip: "Leave hotel by 3:45 AM."
      }
    ]
  },
  {
    id: "hampi-karnataka",
    name: "Hampi (Vijayanagara)",
    country: "India",
    continent: "India",
    tagline: "Surreal boulder landscapes, stone chariot & ruined Vijayanagara empire",
    category: "Spiritual & Heritage",
    rating: 4.94,
    reviewsCount: 2750,
    priceLevel: "$",
    avgDailyBudget: "₹1,800 - ₹4,500 ($22 - $55)",
    bestMonths: "Oct - Mar",
    climate: "Semi-Arid",
    safetyScore: 9.5,
    lat: 15.335,
    lon: 76.46,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-historic-fort-41528-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    description: "Hampi is an open-air museum of granite boulders and 14th-century Vijayanagara Empire ruins with stone chariots.",
    highlights: [
      "Vittala Temple Stone Chariot & musical pillars",
      "Virupaksha Temple ancient shrine",
      "Coracle boat ride on Tungabhadra River"
    ],
    famousPlaces: [
      {
        id: "vittala-temple",
        name: "Vittala Temple Stone Chariot",
        category: "Architectural Marvel",
        image: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=800&q=80",
        description: "Carved from granite blocks with 56 musical pillars.",
        duration: "2 Hours",
        fee: "₹40",
        insiderTip: "Rent a bicycle to explore."
      }
    ]
  },
  {
    id: "madurai-tamil-nadu",
    name: "Madurai & Rameswaram",
    country: "India",
    continent: "India",
    tagline: "Temple city of Tamil Nadu: Towers of Meenakshi Amman & Pamban bridge",
    category: "Spiritual & Heritage",
    rating: 4.9,
    reviewsCount: 2400,
    priceLevel: "$",
    avgDailyBudget: "₹1,800 - ₹4,500 ($22 - $55)",
    bestMonths: "Oct - Mar",
    climate: "Tropical",
    safetyScore: 9.4,
    lat: 9.9252,
    lon: 78.1198,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-sunset-over-a-historic-monument-41524-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    description: "Madurai is world-renowned for the magnificent Meenakshi Amman Temple featuring 14 gateway towers with 33,000 statues.",
    highlights: [
      "Meenakshi Amman Temple 14 gopuram towers",
      "Thirumalai Nayakkar Palace 82-foot pillars",
      "Pamban Bridge sea train journey to Rameswaram"
    ],
    famousPlaces: [
      {
        id: "meenakshi-amman",
        name: "Meenakshi Sundareswarar Temple",
        category: "Dravidian Architecture",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        description: "Dravidian architectural masterpiece spanning 45 acres.",
        duration: "3 Hours",
        fee: "Free",
        insiderTip: "Attend night silver palanquin procession."
      }
    ]
  },
  {
    id: "shillong-meghalaya",
    name: "Meghalaya (Shillong & Cherrapunji)",
    country: "India",
    continent: "India",
    tagline: "Abode of Clouds: Double Decker Living Root Bridges & Nohkalikai Falls",
    category: "Nature & Adventure",
    rating: 4.95,
    reviewsCount: 2310,
    priceLevel: "$$",
    avgDailyBudget: "₹2,800 - ₹6,000 ($35 - $75)",
    bestMonths: "Sep - May",
    climate: "Subtropical Highland",
    safetyScore: 9.7,
    lat: 25.5788,
    lon: 91.8933,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-coastal-mountains-and-ocean-41526-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    description: "Meghalaya translates to 'Abode of Clouds'. Home to living rubber tree root bridges, crystal clear Umngot River in Dawki, and plunging waterfalls.",
    highlights: [
      "Nongriat Double Decker Living Root Bridge trek",
      "Dawki Umngot River crystal boat ride",
      "Nohkalikai Falls (1,115 ft plunge)"
    ],
    famousPlaces: [
      {
        id: "living-root-bridge",
        name: "Double Decker Living Root Bridge",
        category: "Bio-Engineering Wonder",
        image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80",
        description: "250-year-old living bridge grown across rivers in Nongriat village.",
        duration: "Full Day Trek",
        fee: "₹50",
        insiderTip: "Requires descending 3,000 stone steps."
      }
    ]
  },
  {
    id: "andaman-islands",
    name: "Andaman & Nicobar Islands",
    country: "India",
    continent: "India",
    tagline: "Tropical island turquoise waters, Radhanagar beach & coral scuba diving",
    category: "Beaches & Coastal",
    rating: 4.94,
    reviewsCount: 3150,
    priceLevel: "$$$",
    avgDailyBudget: "₹4,500 - ₹10,000 ($60 - $125)",
    bestMonths: "Oct - May",
    climate: "Tropical Island",
    safetyScore: 9.6,
    lat: 11.6234,
    lon: 92.7265,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-41529-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    description: "An archipelago of 572 emerald islands in the Bay of Bengal. Home to Radhanagar Beach on Havelock, Cellular Jail in Port Blair, and coral scuba diving.",
    highlights: [
      "Radhanagar Beach Sunset on Havelock Island",
      "Scuba Diving at Elephant Beach coral reefs",
      "Cellular Jail Light & Sound Show"
    ],
    famousPlaces: [
      {
        id: "radhanagar-beach",
        name: "Radhanagar Beach",
        category: "Asia's Top Beach",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
        description: "Ranked among Asia's top beaches with turquoise waters.",
        duration: "Half Day",
        fee: "Free",
        insiderTip: "Stay until violet sunset hours."
      }
    ]
  },

  // 🌍 INTERNATIONAL DESTINATIONS & WORLD WONDERS
  {
    id: "dubai-uae",
    name: "Dubai",
    country: "United Arab Emirates",
    continent: "Middle East",
    tagline: "Futuristic skyscrapers, desert dunes, gold suqs & luxury shopping",
    category: "Metropolitan",
    rating: 4.89,
    reviewsCount: 4200,
    priceLevel: "$$$$",
    avgDailyBudget: "$180 - $350",
    bestMonths: "Nov - Mar",
    climate: "Desert",
    safetyScore: 9.8,
    lat: 25.2048,
    lon: 55.2708,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-tokyo-street-at-night-with-neon-lights-40092-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    description: "Dubai is a dazzling desert metropolis home to Burj Khalifa (world's tallest building), Palm Jumeirah luxury island, futuristic Museum of the Future, and gold bazaars.",
    highlights: [
      "Burj Khalifa 124th floor observation deck panorama",
      "Desert 4x4 dune bashing safari & bedouin camp dinner",
      "Dubai Mall Fountain Show at sunset",
      "Museum of the Future torus architecture"
    ],
    famousPlaces: [
      {
        id: "burj-khalifa",
        name: "Burj Khalifa",
        category: "Global Architectural Icon",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
        description: "The world's tallest building standing at 828 meters.",
        duration: "2 - 3 Hours",
        fee: "$45 - $140",
        insiderTip: "Book sunset slot 17:00 to see day turn to night lights."
      }
    ]
  },
  {
    id: "swiss-alps-switzerland",
    name: "Swiss Alps & Zermatt",
    country: "Switzerland",
    continent: "Europe",
    tagline: "Snowy Matterhorn peaks, alpine glacier trains & chalet romance",
    category: "Mountain & Hill Stations",
    rating: 4.98,
    reviewsCount: 3600,
    priceLevel: "$$$$",
    avgDailyBudget: "$250 - $450",
    bestMonths: "Dec - Apr, Jun - Sep",
    climate: "Alpine",
    safetyScore: 9.9,
    lat: 45.9765,
    lon: 7.7491,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-coastal-mountains-and-ocean-41526-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    description: "The Swiss Alps offer world-famous mountain vistas dominated by the pyramid-shaped Matterhorn peak in car-free Zermatt village, Glacier Express trains, and fondue dining.",
    highlights: [
      "Gornergrat Railway Matterhorn reflection view",
      "Glacier Express scenic panoramic train journey",
      "Jungfraujoch Top of Europe ice palace station",
      "Authentic Swiss cheese fondue chalet experience"
    ],
    famousPlaces: [
      {
        id: "gornergrat-zermatt",
        name: "Gornergrat Railway & Matterhorn View",
        category: "Alpine Railway",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
        description: "Europe's highest open-air cogwheel railway rising to 3,089 meters.",
        duration: "3 - 5 Hours",
        fee: "CHF 110",
        insiderTip: "Sit on the right side of the train going up for Matterhorn views."
      }
    ]
  },
  {
    id: "maldives-islands",
    name: "Maldives Islands",
    country: "Maldives",
    continent: "Asia",
    tagline: "Overwater luxury bungalows, bioluminescent shores & coral lagoons",
    category: "Beaches & Coastal",
    rating: 4.97,
    reviewsCount: 2900,
    priceLevel: "$$$$",
    avgDailyBudget: "$300 - $700",
    bestMonths: "Nov - Apr",
    climate: "Tropical Island",
    safetyScore: 9.8,
    lat: 3.2028,
    lon: 73.2207,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-tropical-beach-with-turquoise-water-41525-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    description: "The Maldives is an idyllic paradise composed of 26 natural ring-shaped atolls in the Indian Ocean, famous for private overwater villas, whale shark diving, and crystal coral reefs.",
    highlights: [
      "Overwater villa stay with private infinity plunge pool",
      "Snorkeling alongside gentle Whale Sharks & Manta Rays",
      "Sunset catamaran cruise with dolphin sightings",
      "Undersea glass dining experience"
    ],
    famousPlaces: [
      {
        id: "ari-atoll",
        name: "South Ari Atoll Marine Reserve",
        category: "Ocean Life",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
        description: "Protected marine sanctuary renowned year-round for whale shark swimming encounters.",
        duration: "Full Day",
        fee: "$120",
        insiderTip: "Bring underwater GoPro camera with dome port."
      }
    ]
  },
  {
    id: "pyramids-giza-egypt",
    name: "Cairo & Pyramids of Giza",
    country: "Egypt",
    continent: "Africa",
    tagline: "Ancient pharaoh tombs, Great Sphinx & Nile River felucca cruises",
    category: "Spiritual & Heritage",
    rating: 4.91,
    reviewsCount: 3800,
    priceLevel: "$$",
    avgDailyBudget: "$45 - $110",
    bestMonths: "Oct - Apr",
    climate: "Arid Desert",
    safetyScore: 8.8,
    lat: 29.9792,
    lon: 31.1342,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-sunset-over-a-historic-monument-41524-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
    description: "Giza is home to the last surviving Seven Wonders of the Ancient World. Marvel at the Great Pyramid of Khufu, monumental Great Sphinx, Khan el-Khalili bazaar, and Tutankhamun golden treasures.",
    highlights: [
      "Great Pyramid of Khufu interior tomb chamber climb",
      "Great Sphinx face-to-face photo point",
      "Grand Egyptian Museum King Tutankhamun treasures",
      "Sunset felucca sailboat ride on the River Nile"
    ],
    famousPlaces: [
      {
        id: "giza-pyramid-complex",
        name: "Great Pyramids of Giza & Sphinx",
        category: "Ancient World Wonder",
        image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80",
        description: "Ancient tombs built over 4,500 years ago during Egypt's Old Kingdom.",
        duration: "3 - 4 Hours",
        fee: "EGP 540 (~$11)",
        insiderTip: "Take a camel ride out to Panorama Point for 9 pyramids in one frame."
      }
    ]
  },
  {
    id: "tokyo-japan",
    name: "Tokyo",
    country: "Japan",
    continent: "Asia",
    tagline: "Where ancient tradition harmonizes with futuristic neon dreams",
    category: "Metropolitan",
    rating: 4.9,
    reviewsCount: 1420,
    priceLevel: "$$$",
    avgDailyBudget: "$140 - $220",
    bestMonths: "Mar - May, Sep - Nov",
    climate: "Subtropical",
    safetyScore: 9.8,
    lat: 35.6762,
    lon: 139.6503,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-tokyo-street-at-night-with-neon-lights-40092-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    description: "Tokyo blends centuries-old temples with ultra-modern skyscrapers, Michelin gastronomy, serene Japanese gardens, and pop culture districts.",
    highlights: [
      "Sensō-ji Temple in historic Asakusa",
      "Shibuya Crossing & Tokyo Skytree",
      "Traditional Tea Ceremony & Tsukiji Outer Market"
    ],
    famousPlaces: [
      {
        id: "sensoji",
        name: "Sensō-ji Temple",
        category: "Historical & Spiritual",
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
        description: "Tokyo's oldest Buddhist temple founded in 645 AD.",
        duration: "2 Hours",
        fee: "Free",
        insiderTip: "Visit around dusk when lanterns light up."
      }
    ]
  },
  {
    id: "paris-france",
    name: "Paris",
    country: "France",
    continent: "Europe",
    tagline: "The timeless City of Light, romance, and artistic heritage",
    category: "Romantic",
    rating: 4.8,
    reviewsCount: 1890,
    priceLevel: "$$$",
    avgDailyBudget: "$160 - $260",
    bestMonths: "Apr - Jun, Sep - Oct",
    climate: "Temperate Oceanic",
    safetyScore: 8.9,
    lat: 48.8566,
    lon: 2.3522,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-eiffel-tower-in-paris-at-sunset-41444-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    description: "Paris enchants with grand boulevards, cafe culture, world-leading art galleries, patisseries, and sparkling views of the Eiffel Tower.",
    highlights: [
      "Louvre Museum & Mona Lisa",
      "Eiffel Tower sparkle at sunset",
      "Montmartre & Sacré-Cœur panorama"
    ],
    famousPlaces: [
      {
        id: "eiffel-tower",
        name: "Eiffel Tower",
        category: "Global Icon",
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80",
        description: "Gustave Eiffel's 330-meter iron lattice masterpiece.",
        duration: "3 Hours",
        fee: "€18 - €29",
        insiderTip: "Book summit tickets 2 months ahead."
      }
    ]
  },
  {
    id: "bali-indonesia",
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    tagline: "Island of the Gods, emerald rice terraces, and ocean sunsets",
    category: "Beaches & Coastal",
    rating: 4.9,
    reviewsCount: 2150,
    priceLevel: "$$",
    avgDailyBudget: "$50 - $110",
    bestMonths: "Apr - Oct",
    climate: "Tropical Monsoonal",
    safetyScore: 9.1,
    lat: -8.4095,
    lon: 115.1889,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-tropical-beach-with-turquoise-water-41525-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    description: "Bali captivates travelers with lush jungle valleys in Ubud, cliffside sea temples, surf breaks, and serene wellness retreats.",
    highlights: [
      "Tegallalang Rice Terraces Ubud",
      "Uluwatu Temple Kecak Fire Dance",
      "Nusa Penida Kelingking Beach"
    ],
    famousPlaces: [
      {
        id: "tegallalang",
        name: "Tegallalang Rice Terraces",
        category: "Nature & Landscape",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
        description: "Cascading green valley terraces.",
        duration: "2 Hours",
        fee: "IDR 50,000",
        insiderTip: "Arrive at 7:00 AM."
      }
    ]
  },
  {
    id: "santorini-greece",
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    tagline: "Whitewashed cliff villages floating over Aegean volcanic caldera",
    category: "Romantic",
    rating: 4.9,
    reviewsCount: 1640,
    priceLevel: "$$$$",
    avgDailyBudget: "$200 - $350",
    bestMonths: "May - Oct",
    climate: "Mediterranean",
    safetyScore: 9.6,
    lat: 36.3932,
    lon: 25.4615,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-drone-shot-of-coastal-town-in-greece-42289-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    description: "Santorini features cobalt blue domes, volcanic red beaches, cliffside infinity pools, and legendary sunsets over Oia village.",
    highlights: [
      "Sunset over Oia Castle",
      "Fira to Oia Caldera Hike",
      "Red Beach & Akrotiri Ancient Ruins"
    ],
    famousPlaces: [
      {
        id: "oia-village",
        name: "Oia Village Blue Domes",
        category: "Scenic Village",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
        description: "Picturesque cliffside village with blue-domed churches.",
        duration: "3 Hours",
        fee: "Free",
        insiderTip: "Explore early morning between 7-9 AM."
      }
    ]
  },
  {
    id: "new-york-usa",
    name: "New York City",
    country: "United States",
    continent: "Americas",
    tagline: "The concrete jungle where world cultures, arts, and energy collide",
    category: "Metropolitan",
    rating: 4.7,
    reviewsCount: 3100,
    priceLevel: "$$$$",
    avgDailyBudget: "$220 - $400",
    bestMonths: "Apr - Jun, Sep - Nov",
    climate: "Humid Continental",
    safetyScore: 8.7,
    lat: 40.7128,
    lon: -74.006,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-tokyo-street-at-night-with-neon-lights-40092-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
    description: "New York City is a global powerhouse of fashion, theater, art, financial innovation, and culinary diversity.",
    highlights: [
      "Central Park & Bow Bridge walk",
      "Broadway show & Times Square lights",
      "SUMMIT One Vanderbilt observatory"
    ],
    famousPlaces: [
      {
        id: "central-park",
        name: "Central Park",
        category: "Urban Oasis",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
        description: "An 843-acre green sanctuary.",
        duration: "3 Hours",
        fee: "Free",
        insiderTip: "Rent a rowboat at Loeb Boathouse."
      }
    ]
  },
  {
    id: "cape-town-south-africa",
    name: "Cape Town",
    country: "South Africa",
    continent: "Africa",
    tagline: "Where dramatic mountain peaks meet two oceans and wild beauty",
    category: "Nature & Adventure",
    rating: 4.9,
    reviewsCount: 1120,
    priceLevel: "$$",
    avgDailyBudget: "$70 - $140",
    bestMonths: "Nov - Mar",
    climate: "Mediterranean",
    safetyScore: 8.2,
    lat: -33.9249,
    lon: 18.4241,
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-coastal-mountains-and-ocean-41526-large.mp4",
    coverImage: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=1200&q=80",
    description: "Cape Town boasts one of the most stunning coastal landscapes on Earth, guarded by flat-topped Table Mountain and penguin beaches.",
    highlights: [
      "Table Mountain Cableway sunset",
      "Boulders Beach African Penguin Colony",
      "Cape Point nature reserve"
    ],
    famousPlaces: [
      {
        id: "table-mountain",
        name: "Table Mountain",
        category: "Natural Wonder",
        image: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=800&q=80",
        description: "One of the New7Wonders of Nature.",
        duration: "3 Hours",
        fee: "$25",
        insiderTip: "Check weather status online for cablecar."
      }
    ]
  }
];

export const CATEGORIES = [
  { id: "all", label: "🌟 All 30+ World Wonders" },
  { id: "India", label: "🇮🇳 India Wonders" },
  { id: "Spiritual & Heritage", label: "🕌 Spiritual & Ancient" },
  { id: "Mountain & Hill Stations", label: "⛰️ Mountains & Alps" },
  { id: "Beaches & Coastal", label: "🏖️ Beaches & Islands" },
  { id: "Romantic", label: "💖 Romantic Escapes" },
  { id: "Metropolitan", label: "🌆 Metropolitan Capitals" }
];
