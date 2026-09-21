/**
 * India States & Cities Temperature Data for Heat Map Visualization
 */

export const INDIA_STATES = [
  { id: 'rajasthan',    name: 'Rajasthan' },
  { id: 'delhi',        name: 'Delhi (NCT)' },
  { id: 'uttar-pradesh', name: 'Uttar Pradesh' },
  { id: 'maharashtra',  name: 'Maharashtra' },
  { id: 'gujarat',      name: 'Gujarat' },
  { id: 'madhya-pradesh', name: 'Madhya Pradesh' },
  { id: 'haryana',      name: 'Haryana' },
  { id: 'punjab',       name: 'Punjab' },
  { id: 'bihar',        name: 'Bihar' },
  { id: 'odisha',       name: 'Odisha' },
  { id: 'telangana',    name: 'Telangana' },
  { id: 'andhra-pradesh', name: 'Andhra Pradesh' },
  { id: 'karnataka',    name: 'Karnataka' },
  { id: 'tamil-nadu',   name: 'Tamil Nadu' },
  { id: 'kerala',       name: 'Kerala' },
  { id: 'west-bengal',  name: 'West Bengal' },
  { id: 'jharkhand',    name: 'Jharkhand' },
  { id: 'chhattisgarh', name: 'Chhattisgarh' },
  { id: 'himachal-pradesh', name: 'Himachal Pradesh' },
  { id: 'uttarakhand',  name: 'Uttarakhand' },
  { id: 'jammu-kashmir', name: 'Jammu and Kashmir' },
];

export const INDIA_CITIES_BY_STATE = {
  'rajasthan': [
    { id: 'jaipur',    name: 'Jaipur',    temp: 44.2, humidity: 28, windSpeed: 12, uvIndex: 11, heatIndex: 47.8, trend: 'rising',  alert: 'Red Alert' },
    { id: 'jodhpur',   name: 'Jodhpur',   temp: 45.8, humidity: 22, windSpeed: 15, uvIndex: 12, heatIndex: 49.3, trend: 'rising',  alert: 'Red Alert' },
    { id: 'bikaner',   name: 'Bikaner',   temp: 47.1, humidity: 18, windSpeed: 18, uvIndex: 13, heatIndex: 50.2, trend: 'stable',  alert: 'Extreme Alert' },
    { id: 'udaipur',   name: 'Udaipur',   temp: 38.6, humidity: 42, windSpeed: 8,  uvIndex: 9,  heatIndex: 41.2, trend: 'falling', alert: 'Orange Alert' },
    { id: 'kota',      name: 'Kota',      temp: 43.5, humidity: 31, windSpeed: 10, uvIndex: 11, heatIndex: 46.9, trend: 'rising',  alert: 'Red Alert' },
    { id: 'ajmer',     name: 'Ajmer',     temp: 41.8, humidity: 35, windSpeed: 9,  uvIndex: 10, heatIndex: 44.5, trend: 'stable',  alert: 'Red Alert' },
    { id: 'jaisalmer', name: 'Jaisalmer', temp: 48.2, humidity: 15, windSpeed: 20, uvIndex: 13, heatIndex: 51.5, trend: 'rising',  alert: 'Extreme Alert' },
    { id: 'pushkar',   name: 'Pushkar',   temp: 42.1, humidity: 30, windSpeed: 10, uvIndex: 11, heatIndex: 45.8, trend: 'stable',  alert: 'Red Alert' },
  ],
  'delhi': [
    { id: 'new-delhi',   name: 'New Delhi',     temp: 42.4, humidity: 58, windSpeed: 2,  uvIndex: 11, heatIndex: 46.1, trend: 'rising',  alert: 'Red Alert' },
    { id: 'noida',       name: 'Noida',         temp: 41.8, humidity: 55, windSpeed: 3,  uvIndex: 10, heatIndex: 45.3, trend: 'rising',  alert: 'Red Alert' },
    { id: 'dwarka',      name: 'Dwarka',        temp: 43.1, humidity: 60, windSpeed: 2,  uvIndex: 11, heatIndex: 47.2, trend: 'stable',  alert: 'Red Alert' },
    { id: 'rohini',      name: 'Rohini',        temp: 42.9, humidity: 57, windSpeed: 3,  uvIndex: 10, heatIndex: 46.8, trend: 'stable',  alert: 'Red Alert' },
    { id: 'lajpat-nagar', name: 'Lajpat Nagar', temp: 41.5, humidity: 54, windSpeed: 4,  uvIndex: 10, heatIndex: 44.8, trend: 'falling', alert: 'Red Alert' },
  ],
  'uttar-pradesh': [
    { id: 'lucknow',    name: 'Lucknow',    temp: 41.3, humidity: 52, windSpeed: 6, uvIndex: 10, heatIndex: 44.6, trend: 'rising',  alert: 'Red Alert' },
    { id: 'agra',       name: 'Agra',       temp: 43.6, humidity: 45, windSpeed: 5, uvIndex: 11, heatIndex: 46.8, trend: 'rising',  alert: 'Red Alert' },
    { id: 'varanasi',   name: 'Varanasi',   temp: 40.8, humidity: 55, windSpeed: 4, uvIndex: 9,  heatIndex: 44.1, trend: 'stable',  alert: 'Red Alert' },
    { id: 'kanpur',     name: 'Kanpur',     temp: 42.1, humidity: 48, windSpeed: 5, uvIndex: 10, heatIndex: 45.4, trend: 'rising',  alert: 'Red Alert' },
    { id: 'prayagraj',  name: 'Prayagraj',  temp: 41.5, humidity: 50, windSpeed: 4, uvIndex: 10, heatIndex: 44.8, trend: 'stable',  alert: 'Red Alert' },
    { id: 'mathura',    name: 'Mathura',    temp: 44.0, humidity: 42, windSpeed: 6, uvIndex: 11, heatIndex: 47.2, trend: 'rising',  alert: 'Red Alert' },
    { id: 'ayodhya',    name: 'Ayodhya',    temp: 40.2, humidity: 54, windSpeed: 5, uvIndex: 10, heatIndex: 43.5, trend: 'stable',  alert: 'Red Alert' },
    { id: 'jhansi',     name: 'Jhansi',     temp: 43.1, humidity: 38, windSpeed: 6, uvIndex: 11, heatIndex: 46.1, trend: 'rising',  alert: 'Red Alert' },
  ],
  'maharashtra': [
    { id: 'mumbai',    name: 'Mumbai',      temp: 33.2, humidity: 82, windSpeed: 18, uvIndex: 8, heatIndex: 40.5, trend: 'stable',  alert: 'Yellow Alert' },
    { id: 'pune',      name: 'Pune',        temp: 34.8, humidity: 65, windSpeed: 12, uvIndex: 9, heatIndex: 38.9, trend: 'rising',  alert: 'Yellow Alert' },
    { id: 'nagpur',    name: 'Nagpur',      temp: 44.5, humidity: 32, windSpeed: 8,  uvIndex: 12, heatIndex: 47.6, trend: 'rising',  alert: 'Extreme Alert' },
    { id: 'nashik',    name: 'Nashik',      temp: 36.4, humidity: 55, windSpeed: 10, uvIndex: 9,  heatIndex: 40.1, trend: 'stable',  alert: 'Orange Alert' },
    { id: 'aurangabad', name: 'Aurangabad', temp: 40.1, humidity: 38, windSpeed: 9,  uvIndex: 10, heatIndex: 43.2, trend: 'rising',  alert: 'Red Alert' },
    { id: 'solapur',   name: 'Solapur',     temp: 41.8, humidity: 35, windSpeed: 7,  uvIndex: 11, heatIndex: 44.6, trend: 'rising',  alert: 'Red Alert' },
    { id: 'kolhapur',  name: 'Kolhapur',    temp: 35.2, humidity: 68, windSpeed: 10, uvIndex: 9,  heatIndex: 39.8, trend: 'stable',  alert: 'Yellow Alert' },
    { id: 'lonavala',  name: 'Lonavala',    temp: 29.5, humidity: 75, windSpeed: 11, uvIndex: 8,  heatIndex: 32.1, trend: 'stable',  alert: 'Green Safe' },
  ],
  'gujarat': [
    { id: 'ahmedabad', name: 'Ahmedabad',   temp: 43.8, humidity: 30, windSpeed: 14, uvIndex: 11, heatIndex: 46.9, trend: 'rising',  alert: 'Red Alert' },
    { id: 'surat',     name: 'Surat',       temp: 36.5, humidity: 72, windSpeed: 20, uvIndex: 8,  heatIndex: 41.8, trend: 'stable',  alert: 'Orange Alert' },
    { id: 'vadodara',  name: 'Vadodara',    temp: 42.1, humidity: 35, windSpeed: 12, uvIndex: 10, heatIndex: 45.3, trend: 'rising',  alert: 'Red Alert' },
    { id: 'rajkot',    name: 'Rajkot',      temp: 41.5, humidity: 32, windSpeed: 16, uvIndex: 10, heatIndex: 44.5, trend: 'stable',  alert: 'Red Alert' },
    { id: 'bhavnagar', name: 'Bhavnagar',   temp: 38.2, humidity: 55, windSpeed: 18, uvIndex: 9,  heatIndex: 42.1, trend: 'falling', alert: 'Orange Alert' },
  ],
  'madhya-pradesh': [
    { id: 'bhopal',    name: 'Bhopal',      temp: 41.2, humidity: 40, windSpeed: 7, uvIndex: 10, heatIndex: 44.3, trend: 'rising',  alert: 'Red Alert' },
    { id: 'indore',    name: 'Indore',      temp: 39.8, humidity: 42, windSpeed: 8, uvIndex: 9,  heatIndex: 42.8, trend: 'stable',  alert: 'Orange Alert' },
    { id: 'jabalpur',  name: 'Jabalpur',    temp: 40.5, humidity: 48, windSpeed: 5, uvIndex: 10, heatIndex: 43.8, trend: 'rising',  alert: 'Red Alert' },
    { id: 'gwalior',   name: 'Gwalior',     temp: 43.2, humidity: 35, windSpeed: 6, uvIndex: 11, heatIndex: 46.3, trend: 'rising',  alert: 'Red Alert' },
    { id: 'ujjain',    name: 'Ujjain',      temp: 42.0, humidity: 38, windSpeed: 6, uvIndex: 10, heatIndex: 45.1, trend: 'stable',  alert: 'Red Alert' },
  ],
  'haryana': [
    { id: 'gurugram',  name: 'Gurugram',    temp: 42.6, humidity: 52, windSpeed: 4, uvIndex: 11, heatIndex: 46.2, trend: 'rising',  alert: 'Red Alert' },
    { id: 'faridabad', name: 'Faridabad',   temp: 41.9, humidity: 54, windSpeed: 3, uvIndex: 10, heatIndex: 45.4, trend: 'rising',  alert: 'Red Alert' },
    { id: 'panipat',   name: 'Panipat',     temp: 43.5, humidity: 45, windSpeed: 5, uvIndex: 11, heatIndex: 46.9, trend: 'stable',  alert: 'Red Alert' },
    { id: 'ambala',    name: 'Ambala',      temp: 40.8, humidity: 50, windSpeed: 6, uvIndex: 10, heatIndex: 44.1, trend: 'falling', alert: 'Red Alert' },
    { id: 'hisar',     name: 'Hisar',       temp: 44.1, humidity: 30, windSpeed: 12, uvIndex: 12, heatIndex: 47.3, trend: 'rising',  alert: 'Red Alert' },
  ],
  'punjab': [
    { id: 'amritsar',  name: 'Amritsar',    temp: 40.5, humidity: 45, windSpeed: 8, uvIndex: 10, heatIndex: 43.8, trend: 'rising',  alert: 'Red Alert' },
    { id: 'ludhiana',  name: 'Ludhiana',    temp: 41.2, humidity: 48, windSpeed: 7, uvIndex: 10, heatIndex: 44.5, trend: 'stable',  alert: 'Red Alert' },
    { id: 'chandigarh', name: 'Chandigarh', temp: 39.8, humidity: 42, windSpeed: 9, uvIndex: 9,  heatIndex: 42.8, trend: 'falling', alert: 'Orange Alert' },
    { id: 'patiala',   name: 'Patiala',     temp: 41.8, humidity: 46, windSpeed: 6, uvIndex: 10, heatIndex: 45.1, trend: 'rising',  alert: 'Red Alert' },
  ],
  'bihar': [
    { id: 'patna',     name: 'Patna',       temp: 39.6, humidity: 62, windSpeed: 4, uvIndex: 9, heatIndex: 43.5, trend: 'rising',  alert: 'Orange Alert' },
    { id: 'gaya',      name: 'Gaya',        temp: 41.2, humidity: 55, windSpeed: 5, uvIndex: 10, heatIndex: 44.8, trend: 'rising',  alert: 'Red Alert' },
    { id: 'muzaffarpur', name: 'Muzaffarpur', temp: 38.8, humidity: 65, windSpeed: 3, uvIndex: 9, heatIndex: 42.6, trend: 'stable', alert: 'Orange Alert' },
    { id: 'bhagalpur', name: 'Bhagalpur',   temp: 37.5, humidity: 68, windSpeed: 4, uvIndex: 8, heatIndex: 41.2, trend: 'stable',  alert: 'Orange Alert' },
  ],
  'odisha': [
    { id: 'bhubaneswar', name: 'Bhubaneswar', temp: 40.2, humidity: 68, windSpeed: 8, uvIndex: 10, heatIndex: 44.8, trend: 'rising',  alert: 'Red Alert' },
    { id: 'cuttack',   name: 'Cuttack',     temp: 39.5, humidity: 72, windSpeed: 6, uvIndex: 9,  heatIndex: 44.1, trend: 'stable',  alert: 'Orange Alert' },
    { id: 'sambalpur', name: 'Sambalpur',   temp: 43.8, humidity: 45, windSpeed: 5, uvIndex: 11, heatIndex: 47.2, trend: 'rising',  alert: 'Red Alert' },
    { id: 'puri',      name: 'Puri',        temp: 36.2, humidity: 82, windSpeed: 15, uvIndex: 8, heatIndex: 42.5, trend: 'stable',  alert: 'Orange Alert' },
  ],
  'telangana': [
    { id: 'hyderabad', name: 'Hyderabad',   temp: 39.4, humidity: 38, windSpeed: 10, uvIndex: 10, heatIndex: 42.6, trend: 'rising',  alert: 'Orange Alert' },
    { id: 'warangal',  name: 'Warangal',    temp: 41.5, humidity: 35, windSpeed: 8,  uvIndex: 11, heatIndex: 44.8, trend: 'rising',  alert: 'Red Alert' },
    { id: 'nizamabad', name: 'Nizamabad',   temp: 40.8, humidity: 40, windSpeed: 7,  uvIndex: 10, heatIndex: 43.9, trend: 'stable',  alert: 'Red Alert' },
    { id: 'karimnagar', name: 'Karimnagar', temp: 42.1, humidity: 36, windSpeed: 6,  uvIndex: 11, heatIndex: 45.3, trend: 'rising',  alert: 'Red Alert' },
  ],
  'andhra-pradesh': [
    { id: 'visakhapatnam', name: 'Visakhapatnam', temp: 34.8, humidity: 78, windSpeed: 18, uvIndex: 8, heatIndex: 40.2, trend: 'stable',  alert: 'Yellow Alert' },
    { id: 'vijayawada',  name: 'Vijayawada',  temp: 40.6, humidity: 52, windSpeed: 8, uvIndex: 10, heatIndex: 44.1, trend: 'rising',  alert: 'Red Alert' },
    { id: 'guntur',      name: 'Guntur',      temp: 41.2, humidity: 48, windSpeed: 7, uvIndex: 10, heatIndex: 44.6, trend: 'rising',  alert: 'Red Alert' },
    { id: 'tirupati',    name: 'Tirupati',    temp: 36.5, humidity: 58, windSpeed: 10, uvIndex: 9, heatIndex: 40.2, trend: 'stable',  alert: 'Orange Alert' },
  ],
  'karnataka': [
    { id: 'bengaluru',  name: 'Bengaluru',   temp: 30.2, humidity: 55, windSpeed: 12, uvIndex: 7, heatIndex: 32.8, trend: 'stable',  alert: 'Green Safe' },
    { id: 'mysuru',     name: 'Mysuru',      temp: 31.5, humidity: 52, windSpeed: 10, uvIndex: 8, heatIndex: 34.1, trend: 'rising',  alert: 'Yellow Alert' },
    { id: 'hubli',      name: 'Hubli',       temp: 36.8, humidity: 42, windSpeed: 8,  uvIndex: 9, heatIndex: 40.3, trend: 'rising',  alert: 'Orange Alert' },
    { id: 'mangaluru',  name: 'Mangaluru',   temp: 32.5, humidity: 82, windSpeed: 16, uvIndex: 7, heatIndex: 39.2, trend: 'stable',  alert: 'Yellow Alert' },
    { id: 'bellary',    name: 'Bellary',     temp: 42.3, humidity: 28, windSpeed: 10, uvIndex: 11, heatIndex: 45.2, trend: 'rising',  alert: 'Red Alert' },
    { id: 'hampi',      name: 'Hampi',       temp: 38.5, humidity: 35, windSpeed: 9,  uvIndex: 10, heatIndex: 41.5, trend: 'stable',  alert: 'Orange Alert' },
  ],
  'tamil-nadu': [
    { id: 'chennai',    name: 'Chennai',     temp: 37.4, humidity: 72, windSpeed: 14, uvIndex: 9,  heatIndex: 43.2, trend: 'rising',  alert: 'Orange Alert' },
    { id: 'coimbatore', name: 'Coimbatore',  temp: 33.8, humidity: 62, windSpeed: 12, uvIndex: 8,  heatIndex: 37.5, trend: 'stable',  alert: 'Yellow Alert' },
    { id: 'madurai',    name: 'Madurai',     temp: 38.2, humidity: 58, windSpeed: 8,  uvIndex: 10, heatIndex: 42.1, trend: 'rising',  alert: 'Orange Alert' },
    { id: 'trichy',     name: 'Trichy',      temp: 39.5, humidity: 55, windSpeed: 7,  uvIndex: 10, heatIndex: 43.2, trend: 'rising',  alert: 'Orange Alert' },
    { id: 'salem',      name: 'Salem',       temp: 37.8, humidity: 50, windSpeed: 9,  uvIndex: 9,  heatIndex: 41.3, trend: 'stable',  alert: 'Orange Alert' },
    { id: 'ooty',       name: 'Ooty',        temp: 18.2, humidity: 65, windSpeed: 15, uvIndex: 6,  heatIndex: 18.2, trend: 'stable',  alert: 'Green Safe' },
    { id: 'kanyakumari',name: 'Kanyakumari', temp: 31.8, humidity: 82, windSpeed: 18, uvIndex: 8,  heatIndex: 38.9, trend: 'stable',  alert: 'Yellow Alert' },
  ],
  'kerala': [
    { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', temp: 31.5, humidity: 88, windSpeed: 16, uvIndex: 7, heatIndex: 39.8, trend: 'stable',  alert: 'Yellow Alert' },
    { id: 'kochi',      name: 'Kochi',       temp: 30.8, humidity: 90, windSpeed: 18, uvIndex: 6,  heatIndex: 39.5, trend: 'stable',  alert: 'Yellow Alert' },
    { id: 'kozhikode',  name: 'Kozhikode',   temp: 32.1, humidity: 85, windSpeed: 14, uvIndex: 7,  heatIndex: 40.2, trend: 'rising',  alert: 'Yellow Alert' },
    { id: 'thrissur',   name: 'Thrissur',    temp: 31.2, humidity: 88, windSpeed: 12, uvIndex: 7,  heatIndex: 39.4, trend: 'stable',  alert: 'Yellow Alert' },
    { id: 'munnar',     name: 'Munnar',      temp: 19.5, humidity: 62, windSpeed: 10, uvIndex: 6,  heatIndex: 19.5, trend: 'stable',  alert: 'Green Safe' },
    { id: 'alappuzha',  name: 'Alappuzha',   temp: 30.9, humidity: 88, windSpeed: 15, uvIndex: 7,  heatIndex: 39.5, trend: 'stable',  alert: 'Yellow Alert' },
  ],
  'west-bengal': [
    { id: 'kolkata',    name: 'Kolkata',     temp: 37.8, humidity: 78, windSpeed: 8,  uvIndex: 9,  heatIndex: 43.5, trend: 'rising',  alert: 'Orange Alert' },
    { id: 'howrah',     name: 'Howrah',      temp: 38.2, humidity: 76, windSpeed: 7,  uvIndex: 9,  heatIndex: 43.9, trend: 'rising',  alert: 'Orange Alert' },
    { id: 'asansol',    name: 'Asansol',     temp: 40.5, humidity: 62, windSpeed: 5,  uvIndex: 10, heatIndex: 44.2, trend: 'rising',  alert: 'Red Alert' },
    { id: 'siliguri',   name: 'Siliguri',    temp: 28.5, humidity: 72, windSpeed: 10, uvIndex: 6,  heatIndex: 30.8, trend: 'stable',  alert: 'Green Safe' },
  ],
  'jharkhand': [
    { id: 'ranchi',     name: 'Ranchi',      temp: 35.8, humidity: 52, windSpeed: 7, uvIndex: 8,  heatIndex: 39.2, trend: 'rising',  alert: 'Yellow Alert' },
    { id: 'jamshedpur', name: 'Jamshedpur',  temp: 38.4, humidity: 60, windSpeed: 5, uvIndex: 9,  heatIndex: 42.8, trend: 'rising',  alert: 'Orange Alert' },
    { id: 'dhanbad',    name: 'Dhanbad',     temp: 39.2, humidity: 58, windSpeed: 4, uvIndex: 9,  heatIndex: 43.4, trend: 'stable',  alert: 'Orange Alert' },
  ],
  'chhattisgarh': [
    { id: 'raipur',     name: 'Raipur',      temp: 41.6, humidity: 42, windSpeed: 6, uvIndex: 10, heatIndex: 44.8, trend: 'rising',  alert: 'Red Alert' },
    { id: 'bilaspur',   name: 'Bilaspur',    temp: 40.8, humidity: 45, windSpeed: 5, uvIndex: 10, heatIndex: 44.0, trend: 'stable',  alert: 'Red Alert' },
    { id: 'durg',       name: 'Durg',        temp: 41.2, humidity: 40, windSpeed: 6, uvIndex: 10, heatIndex: 44.3, trend: 'rising',  alert: 'Red Alert' },
  ],
  'himachal-pradesh': [
    { id: 'shimla',     name: 'Shimla',      temp: 18.5, humidity: 48, windSpeed: 15, uvIndex: 5, heatIndex: 18.5, trend: 'stable',  alert: 'Green Safe' },
    { id: 'manali',     name: 'Manali',      temp: 12.2, humidity: 55, windSpeed: 20, uvIndex: 4, heatIndex: 12.2, trend: 'falling', alert: 'Blue Cold' },
    { id: 'dharamsala', name: 'Dharamsala',  temp: 22.8, humidity: 52, windSpeed: 10, uvIndex: 5, heatIndex: 23.5, trend: 'stable',  alert: 'Green Safe' },
    { id: 'kullu',      name: 'Kullu',       temp: 14.5, humidity: 60, windSpeed: 12, uvIndex: 4, heatIndex: 14.5, trend: 'rising',  alert: 'Blue Cold' },
  ],
  'uttarakhand': [
    { id: 'dehradun',   name: 'Dehradun',    temp: 32.8, humidity: 55, windSpeed: 8,  uvIndex: 8, heatIndex: 36.5, trend: 'rising',  alert: 'Yellow Alert' },
    { id: 'haridwar',   name: 'Haridwar',    temp: 38.5, humidity: 48, windSpeed: 6,  uvIndex: 9, heatIndex: 42.1, trend: 'rising',  alert: 'Orange Alert' },
    { id: 'rishikesh',  name: 'Rishikesh',   temp: 36.2, humidity: 52, windSpeed: 7,  uvIndex: 8, heatIndex: 39.8, trend: 'stable',  alert: 'Orange Alert' },
    { id: 'nainital',   name: 'Nainital',    temp: 16.5, humidity: 62, windSpeed: 12, uvIndex: 4, heatIndex: 16.5, trend: 'stable',  alert: 'Blue Cold' },
  ],
  'jammu-kashmir': [
    { id: 'srinagar',   name: 'Srinagar',    temp: 24.5, humidity: 52, windSpeed: 10, uvIndex: 6, heatIndex: 25.8, trend: 'rising',  alert: 'Green Safe' },
    { id: 'jammu',      name: 'Jammu',       temp: 38.2, humidity: 42, windSpeed: 8,  uvIndex: 9, heatIndex: 41.5, trend: 'rising',  alert: 'Orange Alert' },
    { id: 'leh',        name: 'Leh',         temp: 8.5,  humidity: 25, windSpeed: 18, uvIndex: 6, heatIndex: 8.5,  trend: 'falling', alert: 'Blue Cold' },
    { id: 'kargil',     name: 'Kargil',      temp: -2.4, humidity: 20, windSpeed: 22, uvIndex: 5, heatIndex: -2.4, trend: 'falling', alert: 'White Extreme Cold' },
  ],
};

export function getTempColor(temp) {
  if (temp >= 42)  return { color: '#EF4444', bg: 'rgba(239,68,68,0.18)',   border: 'rgba(239,68,68,0.5)',    label: 'Extreme Heat Wave', glow: 'rgba(239,68,68,0.35)' };
  if (temp >= 35)  return { color: '#F97316', bg: 'rgba(249,115,22,0.15)',  border: 'rgba(249,115,22,0.45)', label: 'Severe Heat Wave',  glow: 'rgba(249,115,22,0.3)'  };
  if (temp >= 28)  return { color: '#EAB308', bg: 'rgba(234,179,8,0.12)',   border: 'rgba(234,179,8,0.4)',   label: 'Moderate Heat',     glow: 'rgba(234,179,8,0.25)'  };
  if (temp >= 10)  return { color: '#10B981', bg: 'rgba(16,185,129,0.1)',   border: 'rgba(16,185,129,0.35)', label: 'Normal / Safe',     glow: 'rgba(16,185,129,0.2)'  };
  if (temp >= 0)   return { color: '#3B82F6', bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.4)',  label: 'Cold',              glow: 'rgba(59,130,246,0.25)' };
  return                  { color: '#F8FAFF', bg: 'rgba(248,250,255,0.08)', border: 'rgba(248,250,255,0.3)', label: 'Extreme Cold',      glow: 'rgba(248,250,255,0.15)'};
}

export function getAlertBadgeColor(alert) {
  if (alert.includes('Extreme')) return '#EF4444';
  if (alert.includes('Red'))     return '#F97316';
  if (alert.includes('Orange'))  return '#F59E0B';
  if (alert.includes('Yellow'))  return '#EAB308';
  if (alert.includes('Blue'))    return '#3B82F6';
  if (alert.includes('White'))   return '#F8FAFF';
  return '#10B981';
}
