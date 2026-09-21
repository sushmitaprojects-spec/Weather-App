import React, { useEffect, useState } from 'react';
import {
  Thermometer, Wind, Droplets, Sun, Activity, Clock, Sparkles,
  Send, MapPin, ChevronDown, AlertTriangle, User, HeartPulse, Zap
} from 'lucide-react';
import { calculatePersonalizedRiskScore } from '../utils/thermalIndices';
import { TRANSLATIONS } from '../utils/languages';
import { WARDS_DATA } from '../data/wardData';
import { api } from '../services/api';

/* ─── Mini reusable stat tile ─── */
function WeatherTile({ icon: Icon, label, value, sub, accent }) {
  return (
    <div style={{
      padding: '12px 14px', borderRadius: 10,
      background: 'rgba(0,0,0,0.25)',
      border: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', flexDirection: 'column', gap: 4
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: '#8A9BC0', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
        <Icon size={14} color={accent} />
      </div>
      <span style={{ fontSize: 20, fontWeight: 700, color: '#F0F4FF', lineHeight: 1.1 }}>{value}</span>
      <span style={{ fontSize: 11, color: '#4D6080' }}>{sub}</span>
    </div>
  );
}

/* ─── Compact Toggle Button Group ─── */
function ToggleGroup({ options, value, onChange, accentClass }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {options.map(o => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`pill-btn ${value === o.id ? accentClass : ''}`}
          style={{ flex: '1 1 auto', minWidth: 80 }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Risk meter (small arc, fixed size) ─── */
function RiskGauge({ score, color }) {
  const R = 38, C = 2 * Math.PI * R;
  const filled = C * score / 100;
  return (
    <div style={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
      <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
        <circle
          cx="50" cy="50" r={R} fill="none"
          stroke={color} strokeWidth="9"
          strokeDasharray={`${filled} ${C}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.7s ease, stroke 0.5s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{ fontSize: 22, fontWeight: 800, color, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: 9, color: '#4D6080', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase' }}>Risk</span>
      </div>
    </div>
  );
}

export default function CitizenView({ currentLang, onTriggerAlertModal }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [selectedWardId, setSelectedWardId] = useState(WARDS_DATA[0].id);
  const [wardList, setWardList] = useState(WARDS_DATA);
  const [liveWeather, setLiveWeather] = useState(null);
  const baseWard = wardList.find(w => w.id === selectedWardId) || wardList[0] || WARDS_DATA[0];
  const ward = liveWeather ? { ...baseWard, ...liveWeather } : baseWard;

  const [ageGroup,        setAgeGroup]        = useState('elderly');
  const [occupation,      setOccupation]      = useState('construction');
  const [activityLevel,   setActivityLevel]   = useState('heavy');
  const [exposure,        setExposure]        = useState('outdoor_sun');
  const [hasComorbidities,setHasComorbidities]= useState(true);

  const localRisk = calculatePersonalizedRiskScore({
    tempC: ward.ambientTemp, rhPercent: ward.humidity,
    windMs: ward.windSpeed, solarRadiation: ward.solarRadiation,
    aqi: ward.aqi, ageGroup, occupation, activityLevel, exposure, hasComorbidities
  });
  const [serverRisk, setServerRisk] = useState(null);
  const risk = serverRisk || localRisk;

  useEffect(() => {
    api.wards()
      .then(data => { if (Array.isArray(data) && data.length > 0) setWardList(data); })
      .catch(() => setWardList(WARDS_DATA));
  }, []);

  useEffect(() => {
    api.weather(selectedWardId).then(setLiveWeather).catch(() => {});
  }, [selectedWardId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      api.risk({ tempC: ward.ambientTemp, rhPercent: ward.humidity, windMs: ward.windSpeed,
        solarRadiation: ward.solarRadiation, aqi: ward.aqi, ageGroup, occupation,
        activityLevel, exposure, hasComorbidities }).then(setServerRisk).catch(() => setServerRisk(null));
    }, 150);
    return () => clearTimeout(timer);
  }, [ward.ambientTemp, ward.humidity, ward.windSpeed, ward.solarRadiation, ward.aqi, ageGroup, occupation, activityLevel, exposure, hasComorbidities]);

  const aiText =
    risk.category === 'safe'     ? (t.rec_safe     || 'Weather is comfortable.') :
    risk.category === 'moderate' ? (t.rec_moderate || 'Moderate risk. Avoid midday sun.')
                                 : (t.rec_heavy_sun || 'Urgent: shift work to 6–9 AM. Drink 250ml water every 30 min.');

  const badgeClass =
    risk.category === 'safe'     ? 'badge badge-safe' :
    risk.category === 'moderate' ? 'badge badge-moderate' :
    risk.category === 'high'     ? 'badge badge-high'     : 'badge badge-critical';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Row 1: Location Bar ── */}
      <div className="card" style={{ padding: '14px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <MapPin size={16} color="#F97316" />
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#F0F4FF' }}>{ward.name}</div>
            <div style={{ fontSize: 11, color: '#4D6080', fontFamily: 'JetBrains Mono, monospace', marginTop: 1 }}>
              {ward.gridResolution} · Urban Heat Island: <span style={{ color: '#FBBF24' }}>{ward.heatIslandDelta}</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#8A9BC0', flexShrink: 0 }}>{t.selectLocation || 'Select location'}:</span>
          <select
            value={selectedWardId}
            onChange={e => setSelectedWardId(e.target.value)}
            className="form-select"
            style={{ width: 280 }}
          >
            {wardList.map(w => (
              <option key={w.id} value={w.id} style={{ background: '#0E1626' }}>{w.name} — {w.ambientTemp}°C</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Row 2: Weather Metrics ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
        <WeatherTile icon={Thermometer} label="Temp"       value={`${ward.ambientTemp}°C`} sub="Ambient" accent="#F97316" />
        <WeatherTile icon={Droplets}    label="Humidity"   value={`${ward.humidity}%`}      sub="Relative" accent="#00B4D8" />
        <WeatherTile icon={Wind}        label="Wind"       value={`${ward.windSpeed} m/s`}  sub="Stagnant" accent="#60A5FA" />
        <WeatherTile icon={Sun}         label="Solar Rad." value={`${ward.solarRadiation}`} sub="W/m²"   accent="#FBBF24" />
        <WeatherTile icon={Activity}    label="AQI"        value={ward.aqi}                  sub="Air Quality" accent="#C084FC" />
        <WeatherTile icon={Sun}         label="UV Index"   value={`UV ${ward.uvIndex}`}      sub="Extreme" accent="#F87171" />
      </div>

      {/* ── Row 3: Main 2-Col Layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 16 }}>

        {/* Left: Personalization Form */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <User size={15} color="#00B4D8" />
              <span style={{ fontWeight: 700, fontSize: 14, color: '#F0F4FF' }}>Personal Risk Profile</span>
            </div>
            <span className="badge badge-azure">Multi-Variable</span>
          </div>

          <p style={{ fontSize: 12, color: '#8A9BC0', marginBottom: 18, lineHeight: 1.6, padding: '8px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: 8, borderLeft: '3px solid rgba(249,115,22,0.5)' }}>
            At <strong style={{ color: '#FBBF24' }}>{ward.ambientTemp}°C</strong>, risk varies drastically by who you are and where you are.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Age */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8A9BC0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>{t.ageGroup || 'Age Group'}</label>
              <ToggleGroup
                value={ageGroup} onChange={setAgeGroup} accentClass="active-amber"
                options={[
                  { id: 'child',   label: '👶 Child (0–12)' },
                  { id: 'adult',   label: '🧑 Adult (13–59)' },
                  { id: 'elderly', label: '👴 Senior (60+)' }
                ]}
              />
            </div>

            {/* Occupation */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8A9BC0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>{t.occupation || 'Occupation'}</label>
              <select value={occupation} onChange={e => setOccupation(e.target.value)} className="form-select">
                <option value="construction" style={{ background: '#0E1626' }}>🏗️ {t.occ_construction || 'Construction Worker'}</option>
                <option value="farmer"       style={{ background: '#0E1626' }}>🌾 {t.occ_farmer       || 'Farmer'}</option>
                <option value="delivery"     style={{ background: '#0E1626' }}>🛵 {t.occ_delivery     || 'Delivery Rider'}</option>
                <option value="indoor_non_ac"style={{ background: '#0E1626' }}>🏭 {t.occ_indoor_non_ac|| 'Factory Worker (non-AC)'}</option>
                <option value="student"      style={{ background: '#0E1626' }}>🎓 {t.occ_student      || 'Student / Indoor'}</option>
                <option value="elderly"      style={{ background: '#0E1626' }}>🏠 {t.occ_elderly      || 'Senior Resident'}</option>
              </select>
            </div>

            {/* Activity */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8A9BC0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>{t.activityLevel || 'Physical Exertion'}</label>
              <ToggleGroup
                value={activityLevel} onChange={setActivityLevel} accentClass="active-orange"
                options={[
                  { id: 'sedentary', label: '💺 Low' },
                  { id: 'moderate',  label: '🚶 Moderate' },
                  { id: 'heavy',     label: '⛏️ Heavy' }
                ]}
              />
            </div>

            {/* Exposure */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8A9BC0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>{t.exposureType || 'Environment'}</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {[
                  { id: 'indoor_ac',     label: '❄️ Indoor (AC)' },
                  { id: 'indoor_non_ac', label: '🪟 Indoor (Fan)' },
                  { id: 'outdoor_shade', label: '🌳 Outdoor Shade' },
                  { id: 'outdoor_sun',   label: '☀️ Direct Sunlight' }
                ].map(o => (
                  <button key={o.id} onClick={() => setExposure(o.id)}
                    className={`pill-btn ${exposure === o.id ? 'active-cyan' : ''}`}
                    style={{ width: '100%' }}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Comorbidities */}
            <div style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' }}>
                <input type="checkbox" checked={hasComorbidities} onChange={e => setHasComorbidities(e.target.checked)} />
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#C0CDE0' }}>
                  <HeartPulse size={13} color="#F87171" />
                  <span>Hypertension / Cardiac / Diabetes (Comorbidities)</span>
                </span>
              </label>
            </div>

          </div>
        </div>

        {/* Right: Risk Score + AI Advice */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Risk Score Card */}
          <div className="card" style={{
            padding: '20px',
            borderColor: risk.color,
            boxShadow: `0 0 0 1px ${risk.color}20, 0 4px 24px ${risk.color}18`
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <RiskGauge score={risk.compositeScore} color={risk.color} />

              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 6 }}>
                  <span className="section-label">Dynamic Thermal Stress Score</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                  <span style={{ fontSize: 26, fontWeight: 800, color: risk.color }}>{risk.categoryLabel}</span>
                  <span className={badgeClass}>{risk.levelCode}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                  <div style={{ padding: '5px 12px', borderRadius: 7, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 12 }}>
                    <span style={{ color: '#8A9BC0' }}>UTCI </span>
                    <strong style={{ color: '#F0F4FF' }}>{risk.utci}°C</strong>
                  </div>
                  <div style={{ padding: '5px 12px', borderRadius: 7, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 12 }}>
                    <span style={{ color: '#8A9BC0' }}>WBGT </span>
                    <strong style={{ color: '#F0F4FF' }}>{risk.wbgt}°C</strong>
                  </div>
                </div>

                {/* Time-to-Critical */}
                {(risk.category === 'critical' || risk.category === 'high') && (
                  <div style={{
                    padding: '10px 14px', borderRadius: 9,
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.3)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <Clock size={13} color="#F87171" />
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#F87171' }}>Time-to-Critical: 1h 45m</span>
                    </div>
                    <p style={{ fontSize: 11, color: '#FCA5A5', lineHeight: 1.5 }}>
                      {t.predictiveNotice || 'Will cross critical threshold (UTCI > 38) between 1:00 PM – 4:00 PM.'}
                    </p>
                  </div>
                )}

                {risk.category === 'safe' && (
                  <div style={{
                    padding: '10px 14px', borderRadius: 9,
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    fontSize: 12, color: '#6EE7B7'
                  }}>
                    ✓ Safe for the next 6 hours under current conditions.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="card" style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <Sparkles size={14} color="#00B4D8" />
                <span style={{ fontWeight: 700, fontSize: 14, color: '#F0F4FF' }}>{t.aiAdviceTitle || 'Azure AI Foundry Safety Guidance'}</span>
              </div>
              <span className="badge badge-azure" style={{ fontSize: 10 }}>AI Generated</span>
            </div>

            <blockquote style={{
              padding: '12px 16px', borderRadius: 9,
              background: 'rgba(0,0,0,0.25)',
              borderLeft: '3px solid var(--azure-cyan)',
              fontSize: 13, color: '#C0CDE0', lineHeight: 1.7,
              fontStyle: 'italic'
            }}>
              "{aiText}"
            </blockquote>

            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => onTriggerAlertModal({ ward, riskResult: risk, adviceText: aiText })}
                className={`btn ${risk.category === 'critical' ? 'btn-danger' : 'btn-primary'}`}
              >
                <Send size={13} />
                {t.dispatchAlertBtn || 'Send SMS / WhatsApp Alert'}
              </button>
            </div>
          </div>

          {/* Comparison: same temp, different profiles */}
          <div className="card" style={{ padding: '18px 20px' }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                <Zap size={14} color="#FBBF24" />
                <span style={{ fontWeight: 700, fontSize: 13, color: '#F0F4FF' }}>Same Temperature · Different Risk</span>
              </div>
              <p style={{ fontSize: 11, color: '#4D6080' }}>How {ward.ambientTemp}°C affects different individuals</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { who: '👷 Construction Worker (Outdoor Sun)', cat: 'critical', score: 91 },
                { who: '🌾 Farmer (Open Fields)',              cat: 'critical', score: 88 },
                { who: '👴 Elderly with Comorbidities',        cat: 'critical', score: 95 },
                { who: '🚶 Delivery Rider',                    cat: 'high',     score: 72 },
                { who: '🎓 Student (Indoor, Fan)',              cat: 'moderate', score: 44 },
                { who: '❄️ Office Worker (AC Indoors)',         cat: 'safe',     score: 21 }
              ].map(r => {
                const w = r.cat === 'safe' ? '#10B981' : r.cat === 'moderate' ? '#F59E0B' : r.cat === 'high' ? '#F97316' : '#EF4444';
                return (
                  <div key={r.who} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 11, color: '#8A9BC0', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.who}</span>
                    <div style={{ width: 120, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.07)', flexShrink: 0 }}>
                      <div style={{ width: `${r.score}%`, height: '100%', borderRadius: 3, background: w, transition: 'width 0.6s ease' }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: w, width: 28, textAlign: 'right', fontFamily: 'JetBrains Mono, monospace' }}>{r.score}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
