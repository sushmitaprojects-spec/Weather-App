export function calculateUTCI(tempC, rhPercent, windMs, solarRadiation) {
  const e = (rhPercent / 100) * 6.105 * Math.exp((17.27 * tempC) / (237.7 + tempC));
  const windFactor = Math.max(0.5, windMs);
  const meanRadiantTemp = tempC + (solarRadiation / 1000) * 12.5;
  const result = tempC + 0.607 * (e - 10) - 0.228 * (windFactor - 1.5)
    + 0.32 * (meanRadiantTemp - tempC) + 0.004 * ((tempC - 20) ** 2) * (rhPercent / 50);
  return Math.round(result * 10) / 10;
}

export function calculateWBGT(tempC, rhPercent, windMs, solarRadiation, isOutdoor = true) {
  const rh = rhPercent;
  const wetBulb = tempC * Math.atan(0.151977 * Math.sqrt(rh + 8.313659))
    + Math.atan(tempC + rh) - Math.atan(rh - 1.676331)
    + 0.00391838 * (rh ** 1.5) * Math.atan(0.023101 * rh) - 4.686035;
  const globe = tempC + Math.max(0, (solarRadiation / 800) * 6 - Math.sqrt(Math.max(0.5, windMs)) * 1.5);
  const result = isOutdoor
    ? 0.7 * wetBulb + 0.2 * globe + 0.1 * tempC
    : 0.7 * wetBulb + 0.3 * globe;
  return Math.round(result * 10) / 10;
}

export function calculateRisk(input) {
  const { tempC, rhPercent, windMs, solarRadiation, aqi = 0, ageGroup = 'adult',
    occupation = 'student', activityLevel = 'sedentary', exposure = 'indoor_ac', hasComorbidities = false } = input;
  for (const [name, value] of Object.entries({ tempC, rhPercent, windMs, solarRadiation })) {
    if (!Number.isFinite(Number(value))) throw new Error(`${name} must be a number`);
  }
  const utci = calculateUTCI(+tempC, +rhPercent, +windMs, +solarRadiation);
  const wbgt = calculateWBGT(+tempC, +rhPercent, +windMs, +solarRadiation, exposure.startsWith('outdoor'));
  let baseRisk = utci < 26 ? 15 + (utci / 26) * 20
    : utci < 32 ? 36 + ((utci - 26) / 6) * 24
      : utci < 38 ? 61 + ((utci - 32) / 6) * 20 : 82 + Math.min(18, (utci - 38) * 3);
  const age = { child: 1.18, adult: 1, elderly: 1.35 }[ageGroup] ?? 1;
  const job = { construction: 1.35, farmer: 1.3, delivery: 1.22, indoor_non_ac: 1.1, student: 0.85 }[occupation] ?? 1;
  const activity = { sedentary: 1, moderate: 1.15, heavy: 1.35 }[activityLevel] ?? 1;
  const environment = { indoor_ac: 0.55, indoor_non_ac: 0.9, outdoor_shade: 1.15, outdoor_sun: 1.4 }[exposure] ?? 1;
  const score = Math.min(100, Math.round(baseRisk * age * job * activity * environment * (hasComorbidities ? 1.25 : 1) + (+aqi > 200 ? 8 : +aqi > 100 ? 4 : 0)));
  const category = score >= 80 ? 'critical' : score >= 60 ? 'high' : score >= 35 ? 'moderate' : 'safe';
  const presentation = {
    critical: { categoryLabel: 'Critical', color: '#EF4444', hexBg: 'rgba(239, 68, 68, 0.2)', levelCode: '🔴 Critical' },
    high: { categoryLabel: 'High Risk', color: '#F97316', hexBg: 'rgba(249, 115, 22, 0.2)', levelCode: '🟠 High' },
    moderate: { categoryLabel: 'Moderate', color: '#EAB308', hexBg: 'rgba(234, 179, 8, 0.2)', levelCode: '🟡 Moderate' },
    safe: { categoryLabel: 'Safe', color: '#10B981', hexBg: 'rgba(16, 185, 129, 0.15)', levelCode: '🟢 Safe' }
  }[category];
  return { compositeScore: score, utci, wbgt, category, ...presentation,
    factors: { ageMultiplier: age, occupationMultiplier: job, activityMultiplier: activity, exposureMultiplier: environment, comorbidityFactor: hasComorbidities ? 1.25 : 1 } };
}
