import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRisk, calculateUTCI, calculateWBGT } from '../src/lib/thermal.js';

test('thermal indices return finite values', () => {
  assert.ok(Number.isFinite(calculateUTCI(42, 58, 2.1, 940)));
  assert.ok(Number.isFinite(calculateWBGT(42, 58, 2.1, 940)));
});

test('high exposure vulnerable profile is critical', () => {
  const result = calculateRisk({ tempC: 42.4, rhPercent: 58, windMs: 2.1, solarRadiation: 940, aqi: 245, ageGroup: 'elderly', occupation: 'construction', activityLevel: 'heavy', exposure: 'outdoor_sun', hasComorbidities: true });
  assert.equal(result.category, 'critical');
  assert.equal(result.compositeScore, 100);
});
