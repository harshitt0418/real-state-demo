/**
 * MIRĀS Real Estate Advisory — Curated Property Data
 * 
 * NOTE: Listings shown are realistic sample assets designed for this architectural
 * advisory mockup. Financial metrics and specs represent market-aligned baselines
 * and can be seamlessly updated via the MongoDB database or admin endpoints.
 */

export const sampleProperties = [
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
    blurb: 'A disciplined, precision-designed two-bedroom residence located in the heart of Riyadh’s premier financial corridor. Created for executive tenancy with optimized thermal acoustic glazing, minimalist stone finishes, and direct connectivity to King Fahd Road.',
    overview: 'Positioned on the 14th floor of a recently delivered residential tower, this apartment exemplifies the modern Riyadh urban lifestyle. With immediate proximity to major corporate headquarters, upscale hospitality, and Metro line stations, it offers steady capital resilience and consistent rental yields for portfolio allocators.',
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
    developerTier: 'Tier-1 Institutional Developer',
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
    blurb: 'A striking contemporary courtyard villa in Riyadh’s most coveted northern residential enclave, blending sheltered inward-facing courtyards with expansive light-filled family entertaining spaces.',
    overview: 'The Hittin Sanctuary Villa reinterprets traditional Najdi climate-responsive architecture through a razor-sharp modern lens. High perimeter walls surround landscaped desert gardens and water elements, offering absolute acoustic privacy within 5 minutes of Boulevard Riyadh City and the future New Murabba.',
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
      address: 'Prince Turki Al Awwal Corridor, Hittin, Riyadh 13516',
      coordinates: { lat: 24.7738, lng: 46.6022 },
      districtCode: 'RUH-NW-04',
      nearby: [
        { label: 'Boulevard Riyadh City & World', distance: '5 mins' },
        { label: 'King Abdullah Financial District', distance: '7 mins' },
        { label: 'King Saud University Campus', distance: '9 mins' },
        { label: 'Diriyah Heritage UNESCO Quarter', distance: '12 mins' }
      ]
    },
    developerTier: 'Bespoke Master Villa Builder',
    handoverStatus: 'Ready for Immediate Furnishing',
    zoning: 'Low-Density Luxury Residential R1'
  },
  {
    id: 'jeddah-corniche-apartment',
    title: 'The Red Sea Horizon Residence',
    subtitle: 'High-Floor 3-Bedroom Oceanfront Unit on Al Shati Corniche',
    city: 'Jeddah',
    district: 'Al Shati',
    type: 'Apartment',
    category: 'Waterfront',
    price: 2100000,
    priceLabel: 'SAR 2,100,000',
    pricePerSqm: 12727,
    beds: 3,
    baths: 3,
    area: 165,
    parkingSpaces: 2,
    completionYear: 2023,
    status: 'Available',
    featured: true,
    image: '/assets/prop-jeddah.jpg',
    gallery: [
      '/assets/prop-jeddah.jpg',
      '/assets/hero.jpg',
      '/assets/district.jpg'
    ],
    blurb: 'Commanding uninterrupted vistas across the Red Sea and Jeddah Corniche, this high-floor residence marries nautical openness with refined privacy.',
    overview: 'Constructed within one of Jeddah’s landmark waterfront towers, this residence provides floor-to-ceiling glass wrapping around the sea-facing salon. Residents enjoy 24/7 concierge, private health spa, infinity pool overlooking the coastline, and direct access to the redesigned Corniche promenade.',
    architecturalHighlights: [
      '270-degree wraparound panoramic oceanfront balcony with frameless glass balustrades',
      'Custom Italian kitchen with book-matched Calacatta marble island and Miele suite',
      'Dual master suites with deep soaking tubs overlooking the Red Sea sunset',
      'Dedicated private elevator foyer with keycard biometric access',
      'Sub-surface resident parking and temperature-controlled wine/cigar storage'
    ],
    financialMetrics: {
      estimatedYield: '6.8% Prime Coastal Yield',
      capitalAppreciation: '+9.1% 3-Year Trend',
      occupancyProfile: 'Executive Second Home & Premium Holiday Leasing',
      serviceCharge: 'SAR 60 / m² per annum'
    },
    location: {
      address: 'Corniche Road, Al Shati District, Jeddah 23610',
      coordinates: { lat: 21.6033, lng: 39.1093 },
      districtCode: 'JED-WF-02',
      nearby: [
        { label: 'Jeddah Yacht Club & Marina', distance: '4 mins' },
        { label: 'Red Sea Mall & Entertainment Hub', distance: '6 mins' },
        { label: 'King Abdulaziz International Airport', distance: '15 mins' },
        { label: 'Al Rahma Floating Mosque', distance: '5 mins' }
      ]
    },
    developerTier: 'Tier-1 Coastal Waterfront Consortium',
    handoverStatus: 'Fully Completed & Verified Title',
    zoning: 'High-Rise Waterfront Residential W-1'
  },
  {
    id: 'riyadh-kfrd-office',
    title: 'The King Fahd Tower Corporate Floorplate',
    subtitle: 'Grade-A Commercial Office Floor on Riyadh Principal Financial Spine',
    city: 'Riyadh',
    district: 'King Fahd Road',
    type: 'Commercial',
    category: 'Commercial',
    price: 4800000,
    priceLabel: 'SAR 4,800,000',
    pricePerSqm: 8888,
    beds: null,
    baths: 2,
    area: 540,
    parkingSpaces: 8,
    completionYear: 2024,
    status: 'Available',
    featured: true,
    image: '/assets/prop-commercial.jpg',
    gallery: [
      '/assets/prop-commercial.jpg',
      '/assets/advisory.jpg',
      '/assets/district.jpg'
    ],
    blurb: 'A full-floor corporate office shell offering 540 m² of flexible column-free floorplate on Riyadh’s most recognized commercial avenue.',
    overview: 'Engineered to institutional headquarters specifications, this commercial floor offers floor-to-ceiling solar-attenuated glass facades, high raised floor access for IT cabling, dual wet blocks, and generous allocated basement parking. An exceptional acquisition for corporate owner-occupiers or commercial yield investors.',
    architecturalHighlights: [
      'Column-free 540 m² contiguous floorplate allowing optimal modular space planning',
      'High-speed destination-controlled Schindler passenger elevators',
      'Dedicated dual-source fiber optic backbone and redundant emergency backup power',
      'LEED Gold building efficiency rating lowering operating overhead by 22%',
      'Eight allocated secure subterranean parking bays with visitor validation'
    ],
    financialMetrics: {
      estimatedYield: '8.4% Net Commercial Yield',
      capitalAppreciation: '+11.5% Commercial Corridor Expansion',
      occupancyProfile: 'Regional Headquarters & Professional Financial Services',
      serviceCharge: 'SAR 55 / m² per annum'
    },
    location: {
      address: 'King Fahd Road, Al Mohammadiyyah / Olaya, Riyadh 12363',
      coordinates: { lat: 24.7335, lng: 46.6631 },
      districtCode: 'RUH-COR-09',
      nearby: [
        { label: 'KAFD Metro Exchange', distance: '5 mins' },
        { label: 'Saudi Central Bank (SAMA)', distance: '10 mins' },
        { label: 'Ministry of Investment HQ', distance: '12 mins' },
        { label: 'Riyadh Exhibition & Convention Center', distance: '14 mins' }
      ]
    },
    developerTier: 'Institutional Commercial REIT Asset',
    handoverStatus: 'Core & Shell Handover Ready',
    zoning: 'Commercial Mixed High-Rise C-3'
  },
  {
    id: 'khobar-corniche-apartment',
    title: 'The Arabian Gulf Coastal Residence',
    subtitle: '3-Bedroom Panoramic Promenade Apartment, Al Khobar',
    city: 'Al Khobar',
    district: 'Al Corniche',
    type: 'Apartment',
    category: 'Waterfront',
    price: 1600000,
    priceLabel: 'SAR 1,600,000',
    pricePerSqm: 10666,
    beds: 3,
    baths: 3,
    area: 150,
    parkingSpaces: 1,
    completionYear: 2023,
    status: 'Available',
    featured: false,
    image: '/assets/prop-khobar.jpg',
    gallery: [
      '/assets/prop-khobar.jpg',
      '/assets/hero.jpg',
      '/assets/district.jpg'
    ],
    blurb: 'Directly positioned along the lush Corniche walkway in Al Khobar, presenting a balanced coastal lifestyle for executives in the Eastern Province industrial corridor.',
    overview: 'Combining calm gulf waters with rapid road access to Dhahran, Saudi Aramco headquarters, and the King Fahd Causeway to Bahrain, this unit is highly favored by senior energy sector executives. Built with coastal-resistant marine-grade masonry and finished with clean Scandinavian-inspired neutral interiors.',
    architecturalHighlights: [
      'Direct unobstructed maritime views over the Gulf with morning sun exposure',
      'Open-concept kitchen and entertaining terrace with integrated outdoor BBQ station',
      'Marine-grade anodized aluminum window joinery with acoustic soundproofing',
      'Resident wellness suite including heated indoor pool, squash court, and gym',
      'Secure storage lockup and private underground parking'
    ],
    financialMetrics: {
      estimatedYield: '7.1% Net Yield',
      capitalAppreciation: '+7.5% Eastern Province Corridor',
      occupancyProfile: 'Energy Sector Leadership & Regional Families',
      serviceCharge: 'SAR 40 / m² per annum'
    },
    location: {
      address: 'Prince Turki Street, Al Corniche, Al Khobar 34414',
      coordinates: { lat: 26.2917, lng: 50.2185 },
      districtCode: 'EP-KHB-01',
      nearby: [
        { label: 'Corniche Seaside Promenade', distance: '1 min walking' },
        { label: 'Saudi Aramco Core Campus (Dhahran)', distance: '14 mins' },
        { label: 'King Fahd Causeway (Bahrain Access)', distance: '12 mins' },
        { label: 'Al Rashid Mall & Dining District', distance: '8 mins' }
      ]
    },
    developerTier: 'Eastern Province Landmark Developer',
    handoverStatus: 'Immediate Handover',
    zoning: 'Prime Coastal Urban Zone'
  },
  {
    id: 'riyadh-malqa-penthouse',
    title: 'The Al Malqa Sky Villa Penthouse',
    subtitle: '4-Bedroom Duplex with Private Sky Terrace in North Riyadh',
    city: 'Riyadh',
    district: 'Al Malqa',
    type: 'Penthouse',
    category: 'Residential',
    price: 3900000,
    priceLabel: 'SAR 3,900,000',
    pricePerSqm: 12580,
    beds: 4,
    baths: 4.5,
    area: 310,
    parkingSpaces: 2,
    completionYear: 2024,
    status: 'Available',
    featured: true,
    image: '/assets/prop-penthouse.jpg',
    gallery: [
      '/assets/prop-penthouse.jpg',
      '/assets/district.jpg',
      '/assets/advisory.jpg'
    ],
    blurb: 'A duplex penthouse featuring double-height glass walls, an expansive private rooftop garden terrace, and panoramic views across Riyadh’s northern expansion corridor.',
    overview: 'The Sky Villa at Al Malqa represents top-tier vertical living in one of Riyadh’s most affluent northern districts. Offering the privacy and spatial volume of a detached villa alongside the security and low-maintenance convenience of an upscale boutique residence.',
    architecturalHighlights: [
      '6.4-meter double-height great room with motorized solar louvers',
      '95 m² private landscaped sky terrace with outdoor kitchen and pergola lounge',
      'Private internal hydraulic glass elevator connecting both penthouse levels',
      'Primary retreat with dual dressing salons and freestanding marble soaking bath',
      'High-security biometric building entrance and 2 dedicated garage spots'
    ],
    financialMetrics: {
      estimatedYield: '6.2% Net Yield',
      capitalAppreciation: '+13.8% Northern Riyadh Corridor',
      occupancyProfile: 'Private Wealth, Tech Founders & Senior Partners',
      serviceCharge: 'SAR 50 / m² per annum'
    },
    location: {
      address: 'Anas Ibn Malik Road, Al Malqa, Riyadh 13524',
      coordinates: { lat: 24.8123, lng: 46.6198 },
      districtCode: 'RUH-NW-02',
      nearby: [
        { label: 'King Salman Park Access Corridor', distance: '10 mins' },
        { label: 'KAFD Financial Center', distance: '9 mins' },
        { label: 'Riyadh Golf Club & Equestrian', distance: '15 mins' },
        { label: 'King Khalid International Airport', distance: '18 mins' }
      ]
    },
    developerTier: 'Boutique Architectural Atelier',
    handoverStatus: 'Ready for Immediate Occupation',
    zoning: 'Luxury Low-Density Multi-Family'
  },
  {
    id: 'jeddah-salamah-retail',
    title: 'The Al Salamah Avenue Commercial Unit',
    subtitle: 'Street-Fronting Commercial Showroom & Retail Asset in Jeddah',
    city: 'Jeddah',
    district: 'Al Salamah',
    type: 'Retail',
    category: 'Commercial',
    price: 1850000,
    priceLabel: 'SAR 1,850,000',
    pricePerSqm: 19473,
    beds: null,
    baths: 1,
    area: 95,
    parkingSpaces: 3,
    completionYear: 2023,
    status: 'Available',
    featured: false,
    image: '/assets/prop-retail.jpg',
    gallery: [
      '/assets/prop-retail.jpg',
      '/assets/district.jpg',
      '/assets/hero.jpg'
    ],
    blurb: 'A glass-fronted commercial boutique showroom occupying a corner position on a lively commercial boulevard in Al Salamah, Jeddah.',
    overview: 'Positioned to capture both vehicular and pedestrian footfall, this unit features a 12-meter continuous display facade, generous 4.2m clear slab-to-slab ceiling height, dedicated customer parking bays, and pre-installed grease-trap and three-phase power provisions suitable for luxury specialty retail or specialty food & beverage.',
    architecturalHighlights: [
      '12-meter full-height architectural glass frontage providing prime visibility',
      '4.2m ceiling volume facilitating high-end custom interior fit-out',
      'Pre-approved civil defense permits and commercial retail zoning license',
      'Three dedicated curbside customer parking bays directly in front',
      'Three-phase 100A power capacity with auxiliary exhaust shaft'
    ],
    financialMetrics: {
      estimatedYield: '8.9% High-Street Retail Yield',
      capitalAppreciation: '+8.0% Jeddah Urban Regeneration',
      occupancyProfile: 'Luxury Specialty Retail, Clinic or Gourmet Cafe Tenant',
      serviceCharge: 'SAR 35 / m² per annum'
    },
    location: {
      address: 'Prince Sultan Branch Road, Al Salamah, Jeddah 23436',
      coordinates: { lat: 21.5794, lng: 39.1558 },
      districtCode: 'JED-COM-07',
      nearby: [
        { label: 'Prince Sultan Commercial Spine', distance: '1 min' },
        { label: 'Madinah Road Arterial', distance: '4 mins' },
        { label: 'Sari Street Dining Quarter', distance: '5 mins' },
        { label: 'Jeddah Corniche Waterfront', distance: '11 mins' }
      ]
    },
    developerTier: 'Urban Commercial Development Group',
    handoverStatus: 'Core & Shell Ready for Fit-Out',
    zoning: 'Commercial High-Street Retail C-1'
  }
];

export const sampleInquiries = [
  {
    id: 'inq-101',
    propertyId: 'riyadh-olaya-apartment',
    propertyTitle: 'The Olaya Executive Residence',
    name: 'Faisal Al-Otaibi',
    email: 'faisal.otaibi@domain-example.sa',
    phone: '+966 55 491 8820',
    cityOfInterest: 'Riyadh',
    inquiryType: 'Private Acquisition',
    budgetRange: 'SAR 1M - 2M',
    timeframe: 'Immediate (1-3 months)',
    message: 'We are seeking two executive 2-bedroom units in Al Olaya for a corporate portfolio. Please share lease history and yield schedule.',
    channel: 'Website Form',
    status: 'Under Review',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
  },
  {
    id: 'inq-102',
    propertyId: 'riyadh-kfrd-office',
    propertyTitle: 'The King Fahd Tower Corporate Floorplate',
    name: 'Noura Mansour',
    email: 'n.mansour@investments-sample.com',
    phone: '+966 50 219 7733',
    cityOfInterest: 'Riyadh',
    inquiryType: 'Commercial Investment',
    budgetRange: 'SAR 4M - 6M',
    timeframe: 'Within 6 months',
    message: 'Inquiring on behalf of a regional asset management firm regarding full-floor office acquisitions along King Fahd Road.',
    channel: 'Website Form',
    status: 'Advisory Scheduled',
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString()
  },
  {
    id: 'inq-103',
    propertyId: 'jeddah-corniche-apartment',
    propertyTitle: 'The Red Sea Horizon Residence',
    name: 'Tariq Bin Zaid',
    email: 'tariq.binzaid@familyoffice-demo.sa',
    phone: '+966 54 812 4490',
    cityOfInterest: 'Jeddah',
    inquiryType: 'Family Office Allocation',
    budgetRange: 'SAR 2M - 4M',
    timeframe: 'Immediate (1-3 months)',
    message: 'Requesting private walkthrough of the Red Sea Horizon Residence during our Jeddah delegation visit next Thursday.',
    channel: 'WhatsApp Concierge',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
  }
];

export const companyMetrics = {
  activeCorridors: 3,
  curatedPortfolioValue: 'SAR 840M+',
  tier1DevelopersRepresented: 18,
  averageYieldUnderAdvisory: '7.6%',
  cities: [
    {
      name: 'Riyadh',
      role: 'Capital Metropolitan Spine',
      description: 'The commercial and administrative heart of Vision 2030, anchored by KAFD, Diriyah, and high-density commercial demand.',
      averageAppreciation: '+11.2% YoY',
      primeYield: '7.2% - 8.5%',
      curatedPropertiesCount: 4,
      image: '/assets/hero.jpg'
    },
    {
      name: 'Jeddah',
      role: 'Red Sea Gateway & Waterfront',
      description: 'A cosmopolitan coastal hub undergoing massive waterfront regeneration, lifestyle residential developments, and hospitality growth.',
      averageAppreciation: '+8.7% YoY',
      primeYield: '6.5% - 7.8%',
      curatedPropertiesCount: 2,
      image: '/assets/prop-jeddah.jpg'
    },
    {
      name: 'Al Khobar',
      role: 'Eastern Province Energy Corridor',
      description: 'High-income economic corridor bordering the Gulf with steady executive housing demand and gateway proximity to Bahrain.',
      averageAppreciation: '+7.4% YoY',
      primeYield: '7.0% - 8.1%',
      curatedPropertiesCount: 1,
      image: '/assets/prop-khobar.jpg'
    }
  ]
};
