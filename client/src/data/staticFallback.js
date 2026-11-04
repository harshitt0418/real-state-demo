/**
 * Sadu Real Estate Development — Static Fallback Data
 * Exclusive developments & acquisitions across Riyadh, Jeddah, Mecca, Medina, and Dubai
 */

export const fallbackProperties = [
  {
    id: 'riyadh-olaya-apartment',
    title: 'The Olaya Executive Residence',
    subtitle: 'High-Efficiency 2-Bedroom in Riyadh Central Financial District',
    city: 'Riyadh',
    district: 'Al Olaya',
    type: 'Apartment',
    category: 'Residential',
    price: 1250000,
    priceLabel: 'SAR 1,250,000',
    pricePerSqm: 9765,
    beds: 2,
    baths: 2,
    area: 128,
    parkingSpaces: 1,
    completionYear: 2024,
    status: 'Available',
    featured: true,
    image: '/assets/prop-apartment.jpg',
    gallery: [
      '/assets/prop-apartment.jpg',
      '/assets/district.jpg',
      '/assets/hero.jpg'
    ],
    blurb: 'A disciplined, precision-designed two-bedroom residence located in the heart of Riyadh’s premier financial corridor. Created for executive tenancy with optimized thermal acoustic glazing and direct connectivity to King Fahd Road.',
    overview: 'Positioned on the 14th floor of a recently delivered residential tower, this apartment exemplifies the modern Riyadh urban lifestyle with immediate proximity to major corporate headquarters, upscale hospitality, and Metro line stations.',
    architecturalHighlights: [
      'Floor-to-ceiling double-glazed thermal facade maximizing ambient daylight',
      'Engineered European oak millwork with concealed flush door assemblies',
      'En-suite master bath finished in honed travertine and brushed brass hardware',
      'Integrated home automation for climate, security, and smart access',
      'Assigned basement parking with dedicated EV charging infrastructure'
    ],
    financialMetrics: {
      estimatedYield: '7.4% Net Projected Yield',
      capitalAppreciation: '+8.2% 3-Year District Trend',
      occupancyProfile: 'Multinational Corporate & Diplomatic Tenancy',
      serviceCharge: 'SAR 45 / m² per annum'
    },
    location: {
      address: 'King Fahd Road at Al Olaya, Riyadh 12214',
      coordinates: { lat: 24.7136, lng: 46.6753 },
      districtCode: 'RUH-NO-01',
      nearby: [
        { label: 'King Abdullah Financial District (KAFD)', distance: '8 mins' },
        { label: 'Olaya Metro Hub Station', distance: '3 mins' },
        { label: 'Four Seasons Riyadh / Kingdom Centre', distance: '4 mins' },
        { label: 'King Khalid International Airport', distance: '24 mins' }
      ]
    },
    developerTier: 'Sadu Development Prime Channel',
    handoverStatus: 'Immediate Handover',
    zoning: 'High-Density Mixed-Use Residential'
  },
  {
    id: 'riyadh-hittin-villa',
    title: 'The Hittin Sanctuary Villa',
    subtitle: 'Private 4-Bedroom Courtyard Villa in North Riyadh Prestige Quarter',
    city: 'Riyadh',
    district: 'Hittin',
    type: 'Villa',
    category: 'Residential',
    price: 3400000,
    priceLabel: 'SAR 3,400,000',
    pricePerSqm: 8095,
    beds: 4,
    baths: 4.5,
    area: 420,
    parkingSpaces: 2,
    completionYear: 2024,
    status: 'Available',
    featured: true,
    image: '/assets/prop-villa.jpg',
    gallery: [
      '/assets/prop-villa.jpg',
      '/assets/district.jpg',
      '/assets/advisory.jpg'
    ],
    blurb: 'A contemporary courtyard villa in Riyadh’s most coveted northern residential enclave, blending sheltered inward-facing courtyards with expansive light-filled family entertaining spaces.',
    overview: 'The Hittin Sanctuary Villa reinterprets traditional Najdi climate-responsive architecture through a razor-sharp modern lens. High perimeter walls surround landscaped desert gardens and water elements, offering absolute acoustic privacy.',
    architecturalHighlights: [
      'Central interior courtyard patio bringing microclimatic cooling and light',
      'Full-height sliding glass systems seamlessly connecting living to private garden',
      'Separate service annex with driver quarters, chef prep pantry, and utility room',
      'Double-height master reception with monolithic natural limestone fireplace',
      'Private swimming pool with natural stone coping and outdoor dining pavilion'
    ],
    financialMetrics: {
      estimatedYield: '5.9% Net Prime Residential Yield',
      capitalAppreciation: '+12.4% 3-Year District Trend',
      occupancyProfile: 'Ultra-High-Net-Worth Family & Diplomatic Residence',
      serviceCharge: 'Independent Private Title'
    },
    location: {
      address: 'Prince Turki Al Awwal Road, Hittin, Riyadh 13512',
      coordinates: { lat: 24.7742, lng: 46.5982 },
      districtCode: 'RUH-NW-04',
      nearby: [
        { label: 'Boulevard Riyadh City & World', distance: '4 mins' },
        { label: 'King Saud University Campus', distance: '7 mins' },
        { label: 'Diplomatic Quarter (DQ)', distance: '11 mins' },
        { label: 'Diriyah Gate Cultural Heritage Zone', distance: '9 mins' }
      ]
    },
    developerTier: 'Sadu Development Prime Channel',
    handoverStatus: 'Immediate Handover',
    zoning: 'Exclusive Low-Density Residential R-1'
  },
  {
    id: 'jeddah-corniche-apartment',
    title: 'The Red Sea Horizon Residence',
    subtitle: '3-Bedroom Panoramic Waterfront Apartment, Jeddah Corniche',
    city: 'Jeddah',
    district: 'Al Shati',
    type: 'Apartment',
    category: 'Waterfront',
    price: 2150000,
    priceLabel: 'SAR 2,150,000',
    pricePerSqm: 11436,
    beds: 3,
    baths: 3.5,
    area: 188,
    parkingSpaces: 2,
    completionYear: 2024,
    status: 'Available',
    featured: true,
    image: '/assets/prop-jeddah.jpg',
    gallery: [
      '/assets/prop-jeddah.jpg',
      '/assets/hero.jpg',
      '/assets/prop-apartment.jpg'
    ],
    blurb: 'Front-row maritime living along the Al Shati Corniche in Jeddah, featuring floor-to-ceiling glass expanses framing direct western sunset vistas across the Red Sea waters.',
    overview: 'Located in Jeddah’s most distinguished coastal tower, this high-floor unit combines the serenity of waterfront living with instant access to the northern business corridor and coastal fine dining promenade.',
    architecturalHighlights: [
      'Deep cantilevered shaded balcony positioned for year-round coastal breezes',
      'Custom Italian kitchen with integrated Miele appliances and quartz surfaces',
      'Floor-to-ceiling soundproof acoustic curtain wall system facing the sea',
      'Private elevator lobby with biometric access control',
      'Exclusive resident access to 25m infinity pool overlooking the marina'
    ],
    financialMetrics: {
      estimatedYield: '6.8% Net Waterfront Yield',
      capitalAppreciation: '+9.1% 3-Year Coastal Trend',
      occupancyProfile: 'C-Suite Executive & Seasonal Diplomatic Leases',
      serviceCharge: 'SAR 60 / m² per annum'
    },
    location: {
      address: 'Corniche Road, Al Shati District, Jeddah 23414',
      coordinates: { lat: 21.5892, lng: 39.1098 },
      districtCode: 'JED-WF-02',
      nearby: [
        { label: 'Jeddah Yacht Club & Marina', distance: '3 mins' },
        { label: 'Red Sea Mall & Luxury Retail', distance: '5 mins' },
        { label: 'King Abdulaziz International Airport', distance: '16 mins' },
        { label: 'Al Rahma Floating Mosque', distance: '6 mins' }
      ]
    },
    developerTier: 'Sadu Development Prime Channel',
    handoverStatus: 'Immediate Handover',
    zoning: 'Luxury Waterfront Mixed-Use'
  },
  {
    id: 'dubai-marina-penthouse',
    title: 'The Dubai Marina Sky Sanctuary',
    subtitle: 'Panoramic Waterfront Penthouse, Dubai Marina & Palm Horizon',
    city: 'Dubai',
    district: 'Dubai Marina',
    type: 'Penthouse',
    category: 'Waterfront',
    price: 3850000,
    priceLabel: 'AED 3,850,000',
    pricePerSqm: 14259,
    beds: 3,
    baths: 4,
    area: 270,
    parkingSpaces: 2,
    completionYear: 2024,
    status: 'Available',
    featured: true,
    image: '/assets/prop-khobar.jpg',
    gallery: [
      '/assets/prop-khobar.jpg',
      '/assets/prop-penthouse.jpg',
      '/assets/hero.jpg'
    ],
    blurb: 'An ultra-exclusive high-floor sky sanctuary over Dubai Marina with expansive floor-to-ceiling glass capturing yachts, the Palm Jumeirah skyline, and sunset over the Arabian Gulf.',
    overview: 'Curated by Sadu Real Estate Development for high-net-worth investors seeking prime GCC diversification, this residence delivers strong short and long-term rental capitalization with full five-star concierge amenities.',
    architecturalHighlights: [
      'Wraparound terrace with panoramic views of Dubai Marina and the Arabian Gulf',
      'Double-height ceiling volume in the central living and dining salons',
      'Custom European stone finishes with bespoke brass ambient illumination',
      'Private lift vestibule and dedicated valet parking bays',
      'State-of-the-art gym, infinity pool, and private residents lounge'
    ],
    financialMetrics: {
      estimatedYield: '7.8% Net Projected Yield',
      capitalAppreciation: '+11.5% YoY Marina Trend',
      occupancyProfile: 'Global Executives & International Investors',
      serviceCharge: 'AED 18 / sq ft per annum'
    },
    location: {
      address: 'Marina Walk, Dubai Marina, Dubai, UAE',
      coordinates: { lat: 25.0805, lng: 55.1403 },
      districtCode: 'DXB-MRN-01',
      nearby: [
        { label: 'Marina Walk & Promenade', distance: '1 min walking' },
        { label: 'JBR Beach & Dining', distance: '5 mins' },
        { label: 'DIFC Financial District', distance: '18 mins' },
        { label: 'Dubai International Airport (DXB)', distance: '25 mins' }
      ]
    },
    developerTier: 'Sadu Development Prime Channel',
    handoverStatus: 'Immediate Handover',
    zoning: 'Ultra-Luxury Waterfront High-Rise'
  },
  {
    id: 'mecca-abraj-residence',
    title: 'The Mecca Holy Sanctuary Suite',
    subtitle: 'Haram Proximity Landmark Residence, Central Mecca',
    city: 'Mecca',
    district: 'Central Haram District',
    type: 'Apartment',
    category: 'Sanctuary',
    price: 4200000,
    priceLabel: 'SAR 4,200,000',
    pricePerSqm: 24700,
    beds: 2,
    baths: 2.5,
    area: 170,
    parkingSpaces: 1,
    completionYear: 2024,
    status: 'Available',
    featured: false,
    image: '/assets/district.jpg',
    gallery: [
      '/assets/district.jpg',
      '/assets/hero.jpg',
      '/assets/advisory.jpg'
    ],
    blurb: 'Rare, irreplaceable real estate within direct walking distance of the Holy Mosque in Mecca, offering unprecedented spiritual connectivity and enduring multigenerational value.',
    overview: 'An exclusive sanctuary property in the central precinct of Mecca. Engineered to five-star hospitality standards with dedicated audio feeds directly connected to the Grand Mosque prayer calls.',
    architecturalHighlights: [
      'Direct walking connectivity and clear lines of sight to the Holy Haram',
      'Acoustic soundproof glass preserving tranquil interior contemplation',
      'Five-star hotel concierge and round-the-clock private security',
      'Direct elevator access to concourse retail and prayer facilities',
      'Enduring legacy asset with perpetual multigenerational ownership security'
    ],
    financialMetrics: {
      estimatedYield: '8.5% Net Seasonal & Annual Yield',
      capitalAppreciation: '+14.2% Prime Haram Corridor',
      occupancyProfile: 'High-Net-Worth Pilgrims & Institutional Sovereign Tenancy',
      serviceCharge: 'SAR 85 / m² per annum'
    },
    location: {
      address: 'Ibrahim Al Khalil Road, Central District, Mecca',
      coordinates: { lat: 21.4225, lng: 39.8262 },
      districtCode: 'MAK-HRM-01',
      nearby: [
        { label: 'Grand Mosque (Masjid al-Haram)', distance: '4 mins walking' },
        { label: 'Haramain High-Speed Railway Station', distance: '10 mins' },
        { label: 'Abraj Al-Bait Complex', distance: '3 mins' }
      ]
    },
    developerTier: 'Sadu Development Prime Channel',
    handoverStatus: 'Immediate Handover',
    zoning: 'Prime Sacred Core Zone'
  },
  {
    id: 'medina-central-suite',
    title: 'The Medina Central Heritage Residence',
    subtitle: 'Prestige 3-Bedroom Residence, Central Northern Corridor, Medina',
    city: 'Medina',
    district: 'Central Sacred District',
    type: 'Apartment',
    category: 'Sanctuary',
    price: 2950000,
    priceLabel: 'SAR 2,950,000',
    pricePerSqm: 15128,
    beds: 3,
    baths: 3,
    area: 195,
    parkingSpaces: 1,
    completionYear: 2024,
    status: 'Available',
    featured: false,
    image: '/assets/advisory.jpg',
    gallery: [
      '/assets/advisory.jpg',
      '/assets/hero.jpg',
      '/assets/prop-apartment.jpg'
    ],
    blurb: 'Distinguished luxury living in Medina within minutes of the Prophet’s Mosque, providing peaceful sanctuary, classic stone finishes, and perpetual asset stability.',
    overview: 'Constructed to sovereign development specifications, this residence blends peaceful privacy with exceptional accessibility to the sacred heart of Medina and high-speed rail links.',
    architecturalHighlights: [
      'Short walking access to the Prophet’s Mosque piazza',
      'Private family reception with traditional Mashrabiya light shading',
      'High-grade thermal acoustic insulation for total interior peace',
      'Dedicated underground parking with private secure storage',
      'Full facility management and concierge service'
    ],
    financialMetrics: {
      estimatedYield: '7.9% Net Annual Yield',
      capitalAppreciation: '+10.8% Medina Central Zone',
      occupancyProfile: 'Devout Private Families & High-End Seasonal Tenancy',
      serviceCharge: 'SAR 50 / m² per annum'
    },
    location: {
      address: 'King Fahd Road, Central Sacred Area, Medina',
      coordinates: { lat: 24.4686, lng: 39.6142 },
      districtCode: 'MED-CTR-01',
      nearby: [
        { label: 'The Prophet’s Mosque (Al-Masjid an-Nabawi)', distance: '6 mins walking' },
        { label: 'Haramain High-Speed Train Station', distance: '8 mins' },
        { label: 'Prince Mohammad Bin Abdulaziz Airport', distance: '18 mins' }
      ]
    },
    developerTier: 'Sadu Development Prime Channel',
    handoverStatus: 'Immediate Handover',
    zoning: 'Central Sacred Residential'
  },
  {
    id: 'riyadh-malqa-penthouse',
    title: 'The Al Malqa Sky Villa Penthouse',
    subtitle: '4-Bedroom Duplex with Private Sky Terrace in North Riyadh',
    city: 'Riyadh',
    district: 'Al Malqa',
    type: 'Penthouse',
    category: 'Residential',
    price: 4800000,
    priceLabel: 'SAR 4,800,000',
    pricePerSqm: 9876,
    beds: 4,
    baths: 5,
    area: 486,
    parkingSpaces: 3,
    completionYear: 2024,
    status: 'Available',
    featured: true,
    image: '/assets/prop-penthouse.jpg',
    gallery: [
      '/assets/prop-penthouse.jpg',
      '/assets/prop-villa.jpg',
      '/assets/hero.jpg'
    ],
    blurb: 'A statement duplex penthouse spanning the top two floors of an architectural boutique building in Al Malqa, crowned with an expansive 160m² open-sky private terrace.',
    overview: 'The Sky Villa Penthouse provides the volume, privacy, and outdoor flow of a detached suburban villa within the secure, elevated perimeter of a fully managed building in Riyadh’s prime expansion corridor.',
    architecturalHighlights: [
      'Two-story 6.2m ceiling volume in the main formal reception gallery',
      'Private rooftop sky terrace with integrated infinity plunge pool',
      'Chef kitchen equipped with Gaggenau appliances plus separate service kitchen',
      'Four en-suite bedroom chambers with custom walk-in dressing rooms',
      'Three dedicated basement parking spaces with private direct elevator access'
    ],
    financialMetrics: {
      estimatedYield: '6.4% Net Yield',
      capitalAppreciation: '+13.8% 3-Year District Trend',
      occupancyProfile: 'Managing Partners, Senior C-Suite & Family Offices',
      serviceCharge: 'SAR 55 / m² per annum'
    },
    location: {
      address: 'Anas Ibn Malik Road, Al Malqa, Riyadh 13524',
      coordinates: { lat: 24.8118, lng: 46.6195 },
      districtCode: 'RUH-NW-02',
      nearby: [
        { label: 'King Abdullah Financial District (KAFD)', distance: '9 mins' },
        { label: 'Riyadh Golf Club & Equestrian Club', distance: '12 mins' },
        { label: 'King Khalid International Airport', distance: '16 mins' },
        { label: 'Dr. Sulaiman Al Habib Hospital', distance: '6 mins' }
      ]
    },
    developerTier: 'Sadu Development Prime Channel',
    handoverStatus: 'Immediate Handover',
    zoning: 'Prime Boutique High-Density Residential'
  }
];

export const fallbackInquiries = [
  {
    id: 'inq-101',
    propertyId: 'riyadh-olaya-apartment',
    propertyTitle: 'The Olaya Executive Residence',
    name: 'Faisal Al-Otaibi',
    mobile: '+966 55 491 8820',
    phone: '+966 55 491 8820',
    lookingFor: 'Seeking two executive units in Al Olaya for corporate allocation. Please arrange walkthrough.',
    message: 'Seeking two executive units in Al Olaya for corporate allocation. Please arrange walkthrough.',
    email: 'faisal.otaibi@sadu-development.sa',
    cityOfInterest: 'Riyadh',
    inquiryType: 'Private Acquisition',
    budgetRange: 'SAR 2M - 4M',
    timeframe: 'Immediate',
    channel: 'Website Form',
    status: 'Under Review',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
  },
  {
    id: 'inq-102',
    propertyId: 'dubai-marina-penthouse',
    propertyTitle: 'The Dubai Marina Sky Sanctuary',
    name: 'Noura Mansour',
    mobile: '+971 50 219 7733',
    phone: '+971 50 219 7733',
    lookingFor: 'Interested in Dubai Marina penthouse and waterfront yield options for GCC portfolio.',
    message: 'Interested in Dubai Marina penthouse and waterfront yield options for GCC portfolio.',
    email: 'n.mansour@sadu-development.sa',
    cityOfInterest: 'Dubai',
    inquiryType: 'Commercial Investment',
    budgetRange: 'SAR 4M - 6M',
    timeframe: 'Within 3 months',
    channel: 'Website Form',
    status: 'Advisory Scheduled',
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString()
  },
  {
    id: 'inq-103',
    propertyId: 'mecca-abraj-residence',
    propertyTitle: 'The Mecca Holy Sanctuary Suite',
    name: 'Tariq Bin Zaid',
    mobile: '+966 54 812 4490',
    phone: '+966 54 812 4490',
    lookingFor: 'Sanctuary residence near Haram in Mecca for private family heritage.',
    message: 'Sanctuary residence near Haram in Mecca for private family heritage.',
    email: 'tariq.binzaid@sadu-development.sa',
    cityOfInterest: 'Mecca',
    inquiryType: 'Family Office Allocation',
    budgetRange: 'SAR 4M+',
    timeframe: 'Immediate',
    channel: 'WhatsApp Concierge',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
  }
];
