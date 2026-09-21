import React, { useEffect, useState } from 'react';
import {
  Building2, Users, MapPin, Truck, CheckCircle2, TrendingUp,
  Database, AlertTriangle, BarChart3, Layers, Shield
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ReferenceLine
} from 'recharts';
import { WARDS_DATA, FORECAST_3DAY_DATA, MODEL_ACCURACY_LOGS } from '../data/wardData';
import { api } from '../services/api';
import HeatMapPanel from './HeatMapPanel';

/* ─── Ward Status Config ─── */
const STATUS_MAP = {
  safe:     { color: '#10B981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.25)',  label: '🟢 Safe' },
  moderate: { color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)',  label: '🟡 Moderate' },
  high:     { color: '#F97316', bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.3)',   label: '🟠 High' },
  critical: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)',    border: 'rgba(239,68,68,0.35)',   label: '🔴 Critical' }
};

/* ─── Custom Tooltip ─── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#0E1626', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 14px', fontSize: 12 }}>
      <p style={{ fontWeight: 700, color: '#F0F4FF', marginBottom: 6 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <strong>{p.value}°C</strong></p>
      ))}
    </div>
  );
}

export default function GovernmentView({ currentLang }) {
  const [selectedWard, setSelectedWard] = useState(WARDS_DATA[0]);
  const [showElderly,  setShowElderly]  = useState(true);
  const [showWorkers,  setShowWorkers]  = useState(true);
  const [showUnhoused, setShowUnhoused] = useState(true);
  const [hapFired,     setHapFired]     = useState(false);
  const [wardList, setWardList] = useState(WARDS_DATA);
  const [forecast, setForecast] = useState(FORECAST_3DAY_DATA);
  const [hapError, setHapError] = useState('');

  const s = STATUS_MAP[selectedWard.statusCategory] || STATUS_MAP.safe;

  useEffect(() => {
    api.wards()
      .then(items => { if (Array.isArray(items) && items.length > 0) { setWardList(items); setSelectedWard(items[0]); } })
      .catch(() => { setWardList(WARDS_DATA); setSelectedWard(WARDS_DATA[0]); });
  }, []);

  useEffect(() => {
    api.forecast(selectedWard.id).then(result => setForecast(result.data)).catch(() => setForecast(FORECAST_3DAY_DATA));
  }, [selectedWard.id]);

  const handleHAP = async () => {
    setHapError('');
    try {
      await api.executeHap(selectedWard.id);
      setHapFired(true);
      setTimeout(() => setHapFired(false), 5000);
    } catch (error) {
      setHapError(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Alert Banner ── */}
      <div style={{
        padding: '12px 18px', borderRadius: 10,
        background: 'rgba(239, 68, 68, 0.07)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        display: 'flex', alignItems: 'center', gap: 12
      }}>
        <AlertTriangle size={16} color="#EF4444" />
        <span style={{ fontSize: 13, color: '#FCA5A5', fontWeight: 600 }}>
          Active Critical Alerts — Ward 4 (Industrial Zone) and Ward 7 (Market Road) exceed WBGT 35°C threshold. Immediate HAP response required.
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#F87171' }}>
          Azure Event Hubs · Live
        </span>
      </div>

      {/* ── India Heat Wave Map ── */}
      <HeatMapPanel />

      {/* ── Row 1: Heatmap + Ward Inspector (2 cols) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>

        {/* Heatmap Panel */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Layers size={15} color="#00B4D8" />
              <span style={{ fontWeight: 700, fontSize: 14, color: '#F0F4FF' }}>Ward Thermal Risk Heatmap</span>
            </div>
            <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#4D6080' }}>100–500m Grid · Azure Maps</span>
          </div>

          {/* Overlay Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14, padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: 11, color: '#4D6080', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>Overlays:</span>
            {[
              { label: '👵 Elderly', state: showElderly, set: setShowElderly },
              { label: '👷 Workers', state: showWorkers, set: setShowWorkers },
              { label: '⛺ Unhoused', state: showUnhoused, set: setShowUnhoused }
            ].map(o => (
              <label key={o.label} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 12, color: '#8A9BC0' }}>
                <input type="checkbox" checked={o.state} onChange={e => o.set(e.target.checked)} />
                {o.label}
              </label>
            ))}
          </div>

          {/* Ward Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {wardList.map(ward => {
              const ws = STATUS_MAP[ward.statusCategory] || STATUS_MAP.safe;
              const isSelected = selectedWard.id === ward.id;
              return (
                <div
                  key={ward.id}
                  onClick={() => setSelectedWard(ward)}
                  style={{
                    padding: '14px 16px', borderRadius: 11, cursor: 'pointer',
                    background: ws.bg,
                    border: `1px solid ${isSelected ? ws.color : ws.border}`,
                    boxShadow: isSelected ? `0 0 0 2px ${ws.color}30, 0 4px 16px ${ws.color}20` : 'none',
                    transition: 'all 0.15s ease',
                    outline: isSelected ? `2px solid ${ws.color}` : 'none',
                    outlineOffset: 2
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: '#F0F4FF' }}>{ward.name.split('–')[0].trim()}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100,
                      background: ws.bg, border: `1px solid ${ws.border}`, color: ws.color,
                      textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace'
                    }}>
                      {ward.statusCategory}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, fontSize: 12, marginBottom: 8 }}>
                    <div>
                      <span style={{ color: '#4D6080' }}>Temp </span>
                      <strong style={{ color: '#F0F4FF' }}>{ward.ambientTemp}°C</strong>
                    </div>
                    <div>
                      <span style={{ color: '#4D6080' }}>UTCI </span>
                      <strong style={{ color: ws.color }}>{ward.baseUTCI}°C</strong>
                    </div>
                    <div>
                      <span style={{ color: '#4D6080' }}>WBGT </span>
                      <strong style={{ color: '#F0F4FF' }}>{ward.baseWBGT}°C</strong>
                    </div>
                    <div style={{ fontSize: 11, color: '#FBBF24', fontFamily: 'JetBrains Mono, monospace' }}>
                      {ward.heatIslandDelta.split(' ')[0]}
                    </div>
                  </div>

                  {/* Population badges */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
                    {showElderly  && <span style={{ fontSize: 10, color: '#8A9BC0' }}>👵 {(ward.vulnerablePop.elderlyCount/1000).toFixed(1)}k</span>}
                    {showWorkers  && <span style={{ fontSize: 10, color: '#8A9BC0' }}>👷 {(ward.vulnerablePop.outdoorWorkers/1000).toFixed(1)}k</span>}
                    {showUnhoused && <span style={{ fontSize: 10, color: '#8A9BC0' }}>⛺ {ward.vulnerablePop.unhousedCount}</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14, padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.05)' }}>
            {Object.entries(STATUS_MAP).map(([k, v]) => (
              <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: v.color }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: v.color, display: 'inline-block' }} />
                {k.charAt(0).toUpperCase() + k.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Ward Inspector Panel */}
        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          <div>
            <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#4D6080', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Selected Ward</span>
            <h3 style={{ fontWeight: 700, fontSize: 15, color: '#F0F4FF', marginTop: 3 }}>{selectedWard.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100,
                background: s.bg, border: `1px solid ${s.border}`, color: s.color
              }}>{s.label}</span>
              <span style={{ fontSize: 11, color: '#4D6080' }}>WBGT {selectedWard.baseWBGT}°C</span>
            </div>
          </div>

          {/* Vulnerable Population */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <Users size={13} color="#FBBF24" />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#C0CDE0' }}>Vulnerable Population</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: '#FBBF24' }}>
                {selectedWard.vulnerablePop.totalVulnerable.toLocaleString()} at risk
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {[
                { label: 'Elderly (60+)', value: selectedWard.vulnerablePop.elderlyCount.toLocaleString(), icon: '👵' },
                { label: 'Outdoor Workers', value: selectedWard.vulnerablePop.outdoorWorkers.toLocaleString(), icon: '👷' },
                { label: 'Children (0–12)', value: selectedWard.vulnerablePop.childrenCount.toLocaleString(), icon: '👶' },
                { label: 'Unhoused', value: selectedWard.vulnerablePop.unhousedCount.toLocaleString(), icon: '⛺' }
              ].map(stat => (
                <div key={stat.label} style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: 14, marginBottom: 2 }}>{stat.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F0F4FF' }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: '#4D6080' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* HAP Triggers */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#8A9BC0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Shield size={12} color="#00B4D8" />
              Automated HAP Triggers
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {selectedWard.hapTriggers.map((trigger, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 10px', borderRadius: 7, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <CheckCircle2 size={13} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 11, color: '#C0CDE0', lineHeight: 1.5 }}>{trigger}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Execute Button */}
          <button onClick={handleHAP} className="btn btn-danger btn-wide">
            <Truck size={14} />
            Execute Heat Action Plan (HAP)
          </button>

          {hapFired && (
            <div style={{ padding: '10px 14px', borderRadius: 9, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.35)', fontSize: 12, color: '#6EE7B7' }}>
              ✓ HAP Executed — Water tankers dispatched, {selectedWard.vulnerablePop.outdoorWorkers.toLocaleString()} SMS alerts sent.
            </div>
          )}
          {hapError && <div style={{ fontSize: 12, color: '#FCA5A5' }}>{hapError}</div>}

          {/* Cooling Shelters */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#8A9BC0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              Active Cooling Centers
            </div>
            {selectedWard.coolingShelters.map((shelter, i) => (
              <div key={i} style={{ marginBottom: 6, padding: '8px 10px', borderRadius: 8, background: 'rgba(0, 120, 212, 0.07)', border: '1px solid rgba(0,120,212,0.2)' }}>
                <div style={{ fontWeight: 600, fontSize: 12, color: '#F0F4FF', marginBottom: 2 }}>{shelter.name}</div>
                <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#8A9BC0' }}>
                  <span>{shelter.dist}</span>
                  <span>•</span>
                  <span>{shelter.capacity}</span>
                  <span style={{ marginLeft: 'auto', color: '#10B981', fontWeight: 600 }}>{shelter.status}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Row 2: Forecast Chart ── */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={15} color="#00B4D8" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F0F4FF' }}>3–5 Day AI Predictive Thermal Forecast</div>
              <div style={{ fontSize: 11, color: '#4D6080', marginTop: 1 }}>Hourly projection — Ambient Temp, UTCI Stress Index, WBGT Wet Bulb</div>
            </div>
          </div>
          <span style={{
            fontSize: 10, fontFamily: 'JetBrains Mono, monospace',
            padding: '4px 10px', borderRadius: 100,
            background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.3)', color: '#00B4D8'
          }}>Azure ML Pipeline</span>
        </div>

        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecast} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0)" tick={{ fontSize: 10, fill: '#4D6080', fontFamily: 'JetBrains Mono, monospace' }} />
              <YAxis domain={[20, 50]} stroke="rgba(255,255,255,0)" tick={{ fontSize: 10, fill: '#4D6080', fontFamily: 'JetBrains Mono, monospace' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#8A9BC0' }} />
              <ReferenceLine y={38} stroke="rgba(239,68,68,0.4)" strokeDasharray="4 4" label={{ value: 'Critical UTCI 38°C', fontSize: 10, fill: '#F87171' }} />
              <Line type="monotone" dataKey="temp" name="Ambient Temp (°C)" stroke="#F97316" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="utci" name="UTCI Index (°C)"   stroke="#EF4444" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="wbgt" name="WBGT (°C)"         stroke="#00B4D8" strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Row 3: ML Accuracy Loop ── */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Database size={15} color="#C084FC" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F0F4FF' }}>Azure ML Historical Learning & Accuracy Loop</div>
              <div style={{ fontSize: 11, color: '#4D6080', marginTop: 1 }}>Monthly retraining validated against state heat-stroke hospitalization admissions</div>
            </div>
          </div>
          <div style={{
            padding: '5px 14px', borderRadius: 8,
            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
            fontSize: 13, fontWeight: 800, color: '#10B981', fontFamily: 'JetBrains Mono, monospace'
          }}>
            94.6% Avg Accuracy
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {MODEL_ACCURACY_LOGS.map((log, i) => (
            <div key={i} style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: '#F0F4FF' }}>{log.month}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 800, color: '#10B981' }}>{log.accuracy}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8A9BC0', marginBottom: 8 }}>
                <span>Predicted: <strong style={{ color: '#F0F4FF' }}>{log.predictedIncidents}</strong></span>
                <span>Actual: <strong style={{ color: '#F0F4FF' }}>{log.actualHospitalizations}</strong></span>
              </div>
              <div style={{ padding: '6px 10px', borderRadius: 7, background: 'rgba(192,84,252,0.08)', border: '1px solid rgba(192,84,252,0.2)', fontSize: 11, color: '#C084FC', fontFamily: 'JetBrains Mono, monospace' }}>
                ↻ {log.retrainAction}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
