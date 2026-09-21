/**
 * Thermal Stress Calculation Utility
 * Implements algorithms for:
 * 1. UTCI (Universal Thermal Climate Index)
 * 2. WBGT (Wet Bulb Globe Temperature)
 * 3. EHI-N* (Extended Heat Index for metabolic rates)
 * 4. Composite Risk Score tailored by Personalization Matrix
 */

/**
 * Calculates approximate UTCI in °C given ambient temp (°C), RH (%), wind speed at 10m (m/s), and solar radiation (W/m²)
 */
export function calculateUTCI(tempC, rhPercent, windMs, solarRadiation) {
  // Base approximation formula derived from Fiala / Steadman thermal exchange equation
  const e = (rhPercent / 100) * 6.105 * Math.exp((17.27 * tempC) / (237.7 + tempC)); // vapor pressure in hPa
  const windFactor = Math.max(0.5, windMs);
  
  // Mean Radiant Temperature elevation estimation from solar radiation
  const mrtElevation = (solarRadiation / 1000) * 12.5; 
  const meanRadiantTemp = tempC + mrtElevation;

  // UTCI Regression polynomial approximation
  let utci = tempC 
    + 0.607 * (e - 10) 
    - 0.228 * (windFactor - 1.5) 
    + 0.32 * (meanRadiantTemp - tempC) 
    + 0.004 * Math.pow(tempC - 20, 2) * (rhPercent / 50);

  return Math.round(utci * 10) / 10;
}

/**
 * Calculates Wet Bulb Globe Temp (WBGT) in °C
 */
export function calculateWBGT(tempC, rhPercent, windMs, solarRadiation, isOutdoor = true) {
  // Approximate Wet Bulb Temp (T_nw) using Stull formula
  const rh = rhPercent;
  const t = tempC;
  const t_nw = t * Math.atan(0.151977 * Math.pow(rh + 8.313659, 0.5))
    + Math.atan(t + rh)
    - Math.atan(rh - 1.676331)
    + 0.00391838 * Math.pow(rh, 1.5) * Math.atan(0.023101 * rh)
    - 4.686035;

  // Approximate Globe Temp (T_g)
  const radiationFactor = (solarRadiation / 800) * 6;
  const windCooling = Math.sqrt(Math.max(0.5, windMs)) * 1.5;
  const t_g = t + Math.max(0, radiationFactor - windCooling);

  if (isOutdoor) {
    // WBGT = 0.7 * WetBulb + 0.2 * Globe + 0.1 * DryBulb
    return Math.round((0.7 * t_nw + 0.2 * t_g + 0.1 * t) * 10) / 10;
  } else {
    // Indoor WBGT = 0.7 * WetBulb + 0.3 * Globe
    return Math.round((0.7 * t_nw + 0.3 * t_g) * 10) / 10;
  }
}

/**
 * Calculates EHI-N* (Extended Heat Index for metabolic output)
 */
export function calculateEHIN(tempC, rhPercent, metabolicWatts) {
  const heatDissipationCapacity = 400 - (rhPercent * 2.5);
  const metabolicLoad = metabolicWatts;
  const index = (tempC * 1.2) + (metabolicLoad / heatDissipationCapacity) * 10;
  return Math.round(index * 10) / 10;
}

/**
 * Calculates Personalized Risk Matrix & Composite Thermal Risk Score (0 - 100)
 */
export function calculatePersonalizedRiskScore({
  tempC,
  rhPercent,
  windMs,
  solarRadiation,
  aqi,
  ageGroup, // 'child' | 'adult' | 'elderly'
  occupation, // 'farmer' | 'construction' | 'delivery' | 'student' | 'elderly_resident'
  activityLevel, // 'sedentary' | 'moderate' | 'heavy'
  exposure, // 'indoor_ac' | 'indoor_non_ac' | 'outdoor_shade' | 'outdoor_sun'
  hasComorbidities // boolean
}) {
  const utci = calculateUTCI(tempC, rhPercent, windMs, solarRadiation);
  const wbgt = calculateWBGT(tempC, rhPercent, windMs, solarRadiation, exposure.includes('outdoor'));

  // Base Risk from UTCI & WBGT
  let baseRisk = 0;
  if (utci < 26) baseRisk = 15 + (utci / 26) * 20; // 15 - 35
  else if (utci < 32) baseRisk = 36 + ((utci - 26) / 6) * 24; // 36 - 60
  else if (utci < 38) baseRisk = 61 + ((utci - 32) / 6) * 20; // 61 - 81
  else baseRisk = 82 + Math.min(18, (utci - 38) * 3); // 82 - 100

  // Multipliers matrix
  let ageMultiplier = 1.0;
  if (ageGroup === 'child') ageMultiplier = 1.18;
  if (ageGroup === 'elderly') ageMultiplier = 1.35;

  let occupationMultiplier = 1.0;
  if (occupation === 'construction') occupationMultiplier = 1.35;
  if (occupation === 'farmer') occupationMultiplier = 1.30;
  if (occupation === 'delivery') occupationMultiplier = 1.22;
  if (occupation === 'indoor_non_ac') occupationMultiplier = 1.10;
  if (occupation === 'student') occupationMultiplier = 0.85;

  let activityMultiplier = 1.0;
  if (activityLevel === 'moderate') activityMultiplier = 1.15;
  if (activityLevel === 'heavy') activityMultiplier = 1.35;

  let exposureMultiplier = 1.0;
  if (exposure === 'indoor_ac') exposureMultiplier = 0.55;
  if (exposure === 'indoor_non_ac') exposureMultiplier = 0.90;
  if (exposure === 'outdoor_shade') exposureMultiplier = 1.15;
  if (exposure === 'outdoor_sun') exposureMultiplier = 1.40;

  let comorbidityFactor = hasComorbidities ? 1.25 : 1.0;

  // AQI penalty (high pollution exacerbates thermal stress load)
  let aqiBonus = 0;
  if (aqi > 200) aqiBonus = 8;
  else if (aqi > 100) aqiBonus = 4;

  let compositeScore = Math.min(100, Math.round(baseRisk * ageMultiplier * occupationMultiplier * activityMultiplier * exposureMultiplier * comorbidityFactor + aqiBonus));

  // Risk Classification Category
  let category = 'safe';
  let categoryLabel = 'Safe';
  let color = '#10B981'; // emerald green
  let hexBg = 'rgba(16, 185, 129, 0.15)';
  let levelCode = '🟢 Safe';

  if (compositeScore >= 80) {
    category = 'critical';
    categoryLabel = 'Critical';
    color = '#EF4444'; // glowing red
    hexBg = 'rgba(239, 68, 68, 0.2)';
    levelCode = '🔴 Critical';
  } else if (compositeScore >= 60) {
    category = 'high';
    categoryLabel = 'High Risk';
    color = '#F97316'; // amber orange
    hexBg = 'rgba(249, 115, 22, 0.2)';
    levelCode = '🟠 High';
  } else if (compositeScore >= 35) {
    category = 'moderate';
    categoryLabel = 'Moderate';
    color = '#EAB308'; // yellow
    hexBg = 'rgba(234, 179, 8, 0.2)';
    levelCode = '🟡 Moderate';
  }

  return {
    compositeScore,
    utci,
    wbgt,
    category,
    categoryLabel,
    color,
    hexBg,
    levelCode,
    factors: {
      ageMultiplier,
      occupationMultiplier,
      activityMultiplier,
      exposureMultiplier,
      comorbidityFactor
    }
  };
}
