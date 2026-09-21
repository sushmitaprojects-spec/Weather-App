import { calculateUTCI, calculateWBGT } from './thermal.js';
import { fallbackForecast } from '../data/wards.js';

function categoryFor(utci) {
  return utci >= 38 ? 'critical' : utci >= 32 ? 'high' : utci >= 26 ? 'moderate' : 'safe';
}

export async function getLiveWeather(ward) {
  const { lat, lng } = ward.coordinates;
  const weatherUrl = new URL('https://api.open-meteo.com/v1/forecast');
  weatherUrl.search = new URLSearchParams({ latitude: lat, longitude: lng, current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,shortwave_radiation', hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m,shortwave_radiation,uv_index', forecast_days: '5', timezone: 'Asia/Kolkata', wind_speed_unit: 'ms' });
  const airUrl = new URL('https://air-quality-api.open-meteo.com/v1/air-quality');
  airUrl.search = new URLSearchParams({ latitude: lat, longitude: lng, current: 'us_aqi', timezone: 'Asia/Kolkata' });
  const [weatherResponse, airResponse] = await Promise.all([fetch(weatherUrl), fetch(airUrl)]);
  if (!weatherResponse.ok) throw new Error(`Weather provider returned ${weatherResponse.status}`);
  const weather = await weatherResponse.json();
  const air = airResponse.ok ? await airResponse.json() : null;
  const current = weather.current;
  const ambientTemp = current.temperature_2m;
  const humidity = current.relative_humidity_2m;
  const windSpeed = current.wind_speed_10m;
  const solarRadiation = current.shortwave_radiation;
  return {
    source: 'Open-Meteo live', observedAt: current.time, ambientTemp, humidity, windSpeed, solarRadiation,
    aqi: air?.current?.us_aqi ?? ward.aqi,
    uvIndex: weather.hourly?.uv_index?.[0] ?? ward.uvIndex,
    baseUTCI: calculateUTCI(ambientTemp, humidity, windSpeed, solarRadiation),
    baseWBGT: calculateWBGT(ambientTemp, humidity, windSpeed, solarRadiation),
    hourly: weather.hourly
  };
}

export async function getForecast(ward) {
  try {
    const live = await getLiveWeather(ward);
    const hourly = live.hourly;
    const points = [];
    for (let index = 0; index < hourly.time.length; index += 3) {
      const temp = hourly.temperature_2m[index];
      const rh = hourly.relative_humidity_2m[index];
      const wind = hourly.wind_speed_10m[index];
      const solar = hourly.shortwave_radiation[index];
      const utci = calculateUTCI(temp, rh, wind, solar);
      const wbgt = calculateWBGT(temp, rh, wind, solar);
      points.push({ time: new Date(hourly.time[index]).toLocaleString('en-IN', { weekday: 'short', hour: '2-digit', minute: '2-digit' }), temp, utci, wbgt, riskScore: Math.min(100, Math.max(0, Math.round((utci - 18) * 4.5))), category: categoryFor(utci) });
      if (points.length >= 40) break;
    }
    return { source: live.source, data: points };
  } catch (error) {
    return { source: 'fallback', warning: error.message, data: fallbackForecast };
  }
}
