export const wards = [
  {
    id: 'ward-7', name: 'Ward 7 - Market Road & Labour Colony', city: 'New Delhi',
    ambientTemp: 42.4, humidity: 58, windSpeed: 2.1, uvIndex: 11, aqi: 245,
    solarRadiation: 940, heatIslandDelta: '+3.2°C (Dense Concrete & Asphalt)',
    coordinates: { lat: 28.6139, lng: 77.2090 }, gridResolution: '150m Grid Resolution',
    vulnerablePop: { elderlyCount: 3420, outdoorWorkers: 8150, childrenCount: 4900, unhousedCount: 890, totalVulnerable: 17360 },
    baseUTCI: 41.5, baseWBGT: 36.2, statusCategory: 'critical',
    coolingShelters: [
      { name: 'Ward 7 Community Hall Cooling Center', dist: '250m', capacity: '400 persons', status: 'Active (Misting Fans)' },
      { name: 'Market Road Primary Health Post', dist: '450m', capacity: '150 beds', status: 'Active (ORS Station)' }
    ],
    hapTriggers: [
      'Auto-issue Red Alert SMS to 8,150 registered outdoor workers in Ward 7',
      'Deploy 3 mobile water tankers to Market Road Labor Stand',
      'Issue mandatory 12 PM - 3 PM work halt directive to site contractors',
      'Activate misting cooling tents at Central Market Bus Terminus'
    ]
  },
  {
    id: 'ward-12', name: 'Ward 12 - Green Park & Residential Sector', city: 'New Delhi',
    ambientTemp: 38.1, humidity: 45, windSpeed: 4.8, uvIndex: 8, aqi: 110,
    solarRadiation: 710, heatIslandDelta: '-1.5°C (High Canopy Cover)',
    coordinates: { lat: 28.5562, lng: 77.2010 }, gridResolution: '200m Grid Resolution',
    vulnerablePop: { elderlyCount: 2800, outdoorWorkers: 950, childrenCount: 3100, unhousedCount: 120, totalVulnerable: 6970 },
    baseUTCI: 33.8, baseWBGT: 29.4, statusCategory: 'moderate',
    coolingShelters: [{ name: 'Green Park Library Cooling Oasis', dist: '180m', capacity: '200 persons', status: 'Active' }],
    hapTriggers: ['Maintain public water fountain operations', 'Issue yellow advisory for senior citizens outdoors after 2 PM']
  },
  {
    id: 'ward-4', name: 'Ward 4 - Industrial Zone & Brick Kilns', city: 'New Delhi',
    ambientTemp: 44.1, humidity: 62, windSpeed: 1.5, uvIndex: 12, aqi: 310,
    solarRadiation: 990, heatIslandDelta: '+4.5°C (Waste Heat & Radiative Steel)',
    coordinates: { lat: 28.6921, lng: 77.1502 }, gridResolution: '100m Grid Resolution',
    vulnerablePop: { elderlyCount: 1200, outdoorWorkers: 14200, childrenCount: 2100, unhousedCount: 1540, totalVulnerable: 19040 },
    baseUTCI: 43.8, baseWBGT: 38.1, statusCategory: 'critical',
    coolingShelters: [
      { name: 'Industrial Estate Emergency Hydration Hub', dist: '100m', capacity: '600 persons', status: 'Active' },
      { name: 'Sub-District Hospital Emergency Ward', dist: '800m', capacity: '80 heatstroke beds', status: 'High Alert' }
    ],
    hapTriggers: [
      'CRITICAL: Suspend heavy factory & kiln shifts between 11:30 AM - 4:00 PM',
      'Dispatch emergency medical response vans with ice-bath cooling units',
      'Auto-trigger IVR audio alerts in Hindi & Punjabi to all factory supervisors'
    ]
  },
  {
    id: 'ward-9', name: 'Ward 9 - Outer Agriculture & Dairy Farms', city: 'New Delhi',
    ambientTemp: 40.5, humidity: 50, windSpeed: 3.2, uvIndex: 10, aqi: 140,
    solarRadiation: 880, heatIslandDelta: '+0.2°C (Open Soil)',
    coordinates: { lat: 28.75, lng: 77.08 }, gridResolution: '500m Grid Resolution',
    vulnerablePop: { elderlyCount: 1900, outdoorWorkers: 6400, childrenCount: 3800, unhousedCount: 300, totalVulnerable: 12400 },
    baseUTCI: 37.9, baseWBGT: 32.5, statusCategory: 'high',
    coolingShelters: [{ name: 'Panchayat Ghar Cooling Center', dist: '600m', capacity: '300 persons', status: 'Active' }],
    hapTriggers: ['Broadcast Kisan Call Center IVR advice: Shift crop spraying to early dawn 5:30 AM - 8:30 AM', 'Ensure shade structures for farm livestock']
  }
];

export const fallbackForecast = [
  { time: 'Today 08:00 AM', temp: 31, utci: 29, wbgt: 26, riskScore: 32, category: 'safe' },
  { time: 'Today 11:00 AM', temp: 37, utci: 35, wbgt: 31, riskScore: 64, category: 'high' },
  { time: 'Today 02:00 PM', temp: 42.4, utci: 41.5, wbgt: 36.2, riskScore: 89, category: 'critical' },
  { time: 'Tomorrow 02:00 PM', temp: 43.5, utci: 43, wbgt: 37.5, riskScore: 94, category: 'critical' },
  { time: 'Day 3 02:00 PM', temp: 37, utci: 35, wbgt: 30, riskScore: 58, category: 'moderate' }
];
